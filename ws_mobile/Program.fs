open System.Diagnostics
open System.IO
open System.Reflection
open System.Runtime.InteropServices
open System.Text
open System.Xml.Linq
open Ionic.Zip

let tfDelete file =
    if File.Exists file then File.Delete file

let runProc proc (args : string []) (input : seq<string>) =
    use p = new Process()
    let si = ProcessStartInfo()
    si.Arguments <- System.String.Join(" ", args)
    si.CreateNoWindow <- true
    si.UseShellExecute <- false
    si.FileName <- proc
    si.RedirectStandardInput <- true
    si.RedirectStandardOutput <- true
    si.RedirectStandardError <- true
    p.StartInfo <- si
    eprintfn "%s %s" proc si.Arguments
    p.Start() |> ignore
    for line in input do
        p.StandardInput.WriteLine line
    p.StandardOutput.ReadToEnd() |> ignore
    p.WaitForExit()

type AssemblyInfo =
    {
        title : string
        filename : string
        guid : string
        version : string
        isGame : bool
        author : string
        publisher : string
        description : string
        icon : string option
        background : string option
        splashscreen : string option
    }
    member this.Genre =
        if this.isGame then
            "app.game"
        else
            "app.normal"

let collectFiles dir =
    let rec collectFilesUtil dir =
        [
            yield!
                Directory.GetFiles(dir)
                |> Array.map Choice1Of2

            let dirs = Directory.GetDirectories(dir)

            yield! dirs |> Array.map Choice2Of2

            for d in dirs do
                yield! collectFilesUtil d
        ]
    collectFilesUtil dir
    |> List.map (function
                    | Choice1Of2 s -> Choice1Of2 s.[ dir.Length .. ]
                    | Choice2Of2 s -> Choice2Of2 s.[ dir.Length .. ])
    |> List.partition (function Choice1Of2 _ -> true | _ -> false)
    |> fun (a, b) ->
        let f = List.map (fun (Choice1Of2 s | Choice2Of2 s) -> s)
        f a, f b

let createForWP7 (template : string) pdir dir (info : AssemblyInfo) =

    let disposeList = System.Collections.Generic.List<string>()

    let zip = new ZipFile(template)

    do
        zip.Entries
        |> Seq.filter (fun e -> e.FileName.StartsWith "www")
        |> fun e -> zip.RemoveEntries (ResizeArray e)

    match info.icon with
    | Some icon ->
        zip.RemoveEntry "ApplicationIcon.png"
        zip.AddFile (Path.Combine (pdir, icon), "/") |> ignore
    | _ -> ()

    match info.background with
    | Some background ->
        zip.RemoveEntry "Background.png"
        zip.AddFile (Path.Combine (pdir, background), "/") |> ignore
    | _ -> ()

    match info.splashscreen with
    | Some splashscreen ->
        zip.RemoveEntry "SplashScreenImage.jpg"
        zip.AddFile (Path.Combine (pdir, splashscreen), "/") |> ignore
    | _ -> ()

    do
        let man = Path.Combine (pdir, "WMAppManifest.xml")
        tfDelete man
        zip.["WMAppManifest.xml"].Extract pdir
        zip.RemoveEntry "WMAppManifest.xml"
        let wmam = File.ReadAllText man
        let wmam =
            wmam.Replace("$(TITLE)", info.title)
                .Replace("$(GUID)", info.guid)
                .Replace("$(VERSION)", info.version)
                .Replace("$(GENRE)", info.Genre)
                .Replace("$(AUTHOR)", info.author)
                .Replace("$(PUBLISHER)", info.publisher)
                .Replace("$(DESCRIPTION", info.description)
        File.WriteAllText (man, wmam)
        zip.AddFile (man, "/") |> ignore
        disposeList.Add man

    zip.AddDirectory(dir, "www") |> ignore

    let fileListing = dir + @"\fileListing.txt"

    let list = File.CreateText fileListing
    using list (fun list ->

        let files, dirs = collectFiles dir
    
        for d in dirs do
            list.WriteLine d

        list.WriteLine()

        for f in files do
            if f <> "\\fileListing.txt" then
                list.WriteLine f

        list.WriteLine())

    try zip.RemoveEntry "fileListing.txt" with _ -> ()
    zip.AddFile (fileListing, "/") |> ignore

    zip.Save(sprintf @"%s\%s.xap" dir info.filename)

    for f in disposeList do
        tfDelete f
    
    fileListing

let createForAndroid wp7 (template : string) dir name =
    let zip = new ZipFile(template)
    
    let sourceFiles =
        zip.Entries
        |> Seq.filter (fun e -> e.FileName.StartsWith "assets/www")
        |> fun e -> zip.RemoveEntries (ResizeArray e)

    zip.AddDirectory(dir, "assets/www") |> ignore

    try
        zip.RemoveEntry (sprintf @"assets\www\%s.xap" name)
    with _ -> ()

    zip

[<EntryPoint>]
let main [| pdir; dir; asmpath |] =
    let stripDot (this : string) =
        if this.[this.Length - 1] = '.' then
            this.[0 .. this.Length - 2]
        else this
    let [ pdir; dir; asmpath ] = [ pdir; dir; asmpath ] |> List.map stripDot
    let asm = Assembly.LoadFile asmpath
    let doc = XDocument.Load (pdir + @"\mobile.config")
    let info =
        let company =
            try
                (asm.GetCustomAttributes(typeof<AssemblyCompanyAttribute>, true).[0] :?> AssemblyCompanyAttribute).Company
            with _ -> ""
        {
            title =
                try
                    (asm.GetCustomAttributes(typeof<AssemblyProductAttribute>, true).[0] :?> AssemblyProductAttribute).Product
                with _ -> Path.GetFileNameWithoutExtension asmpath
            filename = Path.GetFileNameWithoutExtension asmpath
            guid =  
                try
                    (asm.GetCustomAttributes(typeof<GuidAttribute>, true).[0] :?> GuidAttribute).Value
                with _ -> ""
            version =
                try
                    (asm.GetCustomAttributes(typeof<AssemblyFileVersionAttribute>, true).[0] :?> AssemblyFileVersionAttribute).Version
                with _ -> "0.0.0.0"
            isGame =
                try
                    Seq.isEmpty <| doc . Element(XName.Get "configuration")
                                        .Element(XName.Get "wp7")
                                        .Elements(XName.Get "isgame")
                with _ -> false
            author = company
            publisher = company
            description =
                try
                    (asm.GetCustomAttributes(typeof<AssemblyDescriptionAttribute>, true).[0] :?> AssemblyDescriptionAttribute).Description
                with _ -> ""
            icon =
                try
                    doc .Element(XName.Get "configuration")
                        .Element(XName.Get "wp7")
                        .Element(XName.Get "icon")
                        .Value
                    |> Some
                with _ -> None
            background =
                try
                    doc .Element(XName.Get "configuration")
                        .Element(XName.Get "wp7")
                        .Element(XName.Get "background")
                        .Value
                    |> Some
                with _ -> None
            splashscreen =
                try
                    doc .Element(XName.Get "configuration")
                        .Element(XName.Get "wp7")
                        .Element(XName.Get "splashscreen")
                        .Value
                    |> Some
                with _ -> None
        }
    let name = info.filename

    tfDelete (sprintf @"%s\%s.xap" dir name)

    Directory.GetFiles(dir, "*.apk")
    |> Array.iter (fun name -> tfDelete name)
    
    let androidBuilds =
        try
            doc .Element(XName.Get "configuration")
                .Element(XName.Get "androidBuilds")
                .Elements(XName.Get "build")
            |> List.ofSeq
        with _ -> []

    let serverLocationDispose =
        try
            let elem = doc.Element(XName.Get "configuration").Element(XName.Get "serverLocation")
            let serverLocation = dir + @"\serverLocation.txt"
            File.WriteAllText(serverLocation, elem.Value)
            fun _ -> tfDelete serverLocation
        with _ ->
            ignore

    let wp7Elems = doc.Element(XName.Get "configuration").Elements(XName.Get "wp7")
    let wp7 = Seq.length wp7Elems = 1
    if wp7 then
        createForWP7 @"mobileWP7.xap" pdir dir info
        |> File.Delete

    let androids =
        
        let androids =
            androidBuilds
            |> List.map (fun b ->
                        let template = b.Element(XName.Get "templateApk").Value
                        b, template, createForAndroid wp7 (sprintf "%s\\%s" pdir template) dir name)
        
        androids
        |> List.choose (fun (b, n, z) ->
                        use z = z
                        z.Save (Path.Combine (dir, n))
                        if b.Elements(XName.Get "signAndroid") |> Seq.isEmpty |> not then
                            Some (b, n)
                        else
                            None)

    (*
    do // create build env in html
        let args =
            [|
            "mobileBuildAndroid"
            Path.Combine(dir, "mobileBuildAndroid")
            "/E /C /I /Q /Y"
            |]
        runProc "xcopy.exe" args []

    for b, n in androids do
        let env = Path.Combine(dir, "mobileBuildAndroid")
        do // clean target
            if Directory.Exists(Path.Combine(env, "target")) then
                Directory.Delete(Path.Combine(env, "target"), true)
        do
            let man = Path.Combine(env, "AndroidManifest.xml")
            File.Copy(man, Path.Combine(env, "AndroidManifest.xml_bu"))
            let wmam =
                File.ReadAllText(man)
                    .Replace("$(TITLE)", info.title)
                    .Replace("$(VERSION)", info.version)
                    .Replace("$(AUTHOR)", info.author)
                    .Replace("$(PUBLISHER)", info.publisher)
                    .Replace("$(DESCRIPTION", info.description)
            File.WriteAllText (man, wmam)
        do // aapt package -m -J src -M AndroidManifest.xml -S res -I android.jar
            let args =
                [|
                "package -m -J"
                sprintf @"%s\src -M %s\AndroidManifest.xml -S %s\res -I android.jar" env env env
                |]
            runProc "aapt.exe" args []
        do // mkdir target/main-classes
            Directory.CreateDirectory (Path.Combine(env, @"target\main-classes")) |> ignore
        do // javac -encoding ascii -target 1.5 -sourcepath src -d target\main-classes -bootclasspath android.jar
            let args =
                [|
                "-encoding ascii -target 1.5 -sourcepath"
                sprintf @"%s\target\src -d %s\target\main-classes -bootclasspath android.jar" env env
                |]
            runProc "javac.exe" args []
        do // dx --dex --output=target/classes.dex target/main-classes
            let args =
                [| sprintf @"--dex --output=%s\target\classes.dex %s\target\main-classes" env env |]
            runProc "dx.bat" args []
        do // aapt package -f -M AndroidManifest.xml -S res -I android.jar -F target/notepad.ap_
            let args =
                [|
                "package -f -M"
                sprintf @"%s\AndroidManifest.xml -S %s\res -I android.jar -F %s\target\notepad.ap_" env env env
                |]
            runProc "aapt.exe" args []
        do // apkbuilder target/notepad.apk -z target/notepad.ap_ -f target/classes.dex -rf src -rj lib
            let args =
                [| sprintf @"%s\target\notepad.apk -z %s\target\notepad.ap_ -f %s\target\classes.dex -rf %s\src -rj lib" env env env env |]
            runProc "apkbuilder.bat" args []
        do // copy from html\bin to html
            File.Copy (Path.Combine(dir, "mobileAndroidBuild\\bin\\" + n), Path.Combine(dir, n))
        do // *jarsigner*
            let key = b.Element(XName.Get "key").Value
            let alias = b.Element(XName.Get "alias").Value
            let passphrase = b.Element(XName.Get "passphrase").Value
            let args =
                [|
                "-verbose"
                "-keystore"
                Path.Combine (pdir, key)
                Path.Combine (dir, n)
                alias
                |]
            runProc "jarsigner.exe" args [passphrase]
        do // zipalign -f 4 _.apk _.apk
           runProc "zipalign.exe" [| "-f 4"; n; n |] []
        do // restore AndroidManifest.xml
            File.Delete "AndroidManifest.xml"
            File.Move("AndroidManifest.xml_bu", "AndroidManifest.xml")

    do // delete building env from html
        Directory.Delete(Path.Combine(dir, "mobileBuildAndroid"))
    *)
    serverLocationDispose()

    0
