open System.Diagnostics
open System.IO
open System.Reflection
open System.Runtime.InteropServices
open System.Text
open System.Xml.Linq
open Ionic.Zip

let tfDelete file =
    if File.Exists file then File.Delete file

let runProc proc (args : seq<string>) (input : seq<string>) =
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
    p.Start() |> ignore
    for line in input do
        p.StandardInput.WriteLine line
    p.StandardOutput.ReadToEnd() |> ignore
    stderr.WriteLine(p.StandardError.ReadToEnd())
    p.WaitForExit()

let quote = sprintf @"""%s"""

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
            "apps.game"
        else
            "apps.normal"

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
        zip.RemoveEntry "WMAppManifest.xml"
        let wmam = File.ReadAllText "WMAppManifest.xml"
        let wmam =
            wmam.Replace("$(TITLE)", info.title)
                .Replace("$(SAFETITLE)", info.title.Replace(" ", ""))
                .Replace("$(GUID)", info.guid)
                .Replace("$(VERSION)", info.version)
                .Replace("$(GENRE)", info.Genre)
                .Replace("$(AUTHOR)", info.author)
                .Replace("$(PUBLISHER)", info.publisher)
                .Replace("$(DESCRIPTION)", info.description)
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

let createForAndroid (template : string) dir name =
    use zip = new ZipFile(template)
    
    let sourceFiles =
        zip.Entries
        |> Seq.filter (fun e -> e.FileName.StartsWith "assets/www")
        |> fun e -> zip.RemoveEntries (ResizeArray e)

    zip.AddDirectory(dir, "assets/www") |> ignore

    try
        zip.RemoveEntry (sprintf @"assets\www\%s.xap" name)
    with _ -> ()

    for e in List.ofSeq zip.EntryFileNames do
        let startsWith' (this : string) (prefix : string) = this.Length >= prefix.Length && this.Replace('\\', '/').[ 0 .. prefix.Length - 1 ] = prefix
        let onlyTwo = lazy (
            e
            |> String.collect (function
                            | '\\'
                            | '/' -> " "
                            | _ -> "")
            |> String.length
            |> (=) 2
            )
        if startsWith' e "assets/www/mobileBuildAndroid" || (e.EndsWith ".apk" && startsWith' e "assets/www" && onlyTwo.Value) then
            zip.RemoveEntry e

    zip.Save()

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
            with _ -> "Company"
        {
            title =
                try
                    (asm.GetCustomAttributes(typeof<AssemblyProductAttribute>, true).[0] :?> AssemblyProductAttribute).Product
                with _ -> Path.GetFileNameWithoutExtension asmpath
            filename = Path.GetFileNameWithoutExtension asmpath
            guid =  
                try
                    (asm.GetCustomAttributes(typeof<GuidAttribute>, true).[0] :?> GuidAttribute).Value
                with _ -> System.Guid.NewGuid().ToString()
            version =
                try
                    (asm.GetCustomAttributes(typeof<AssemblyFileVersionAttribute>, true).[0] :?> AssemblyFileVersionAttribute).Version
                with _ -> "0.0.0.0"
            isGame =
                try
                    Seq.isEmpty <| doc . Element(XName.Get "configuration")
                                        .Element(XName.Get "wp7")
                                        .Elements(XName.Get "isgame")
                    |> not
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
                        let output = b.Element(XName.Get "outputPackage").Value
                        b, output)
        
        androids
        |> List.choose (fun (b, n) ->
                        if b.Elements(XName.Get "signAndroid") |> Seq.isEmpty |> not then
                            Some (b, n, b.Element(XName.Get "sdkVersion").Value)
                        else
                            None)

    // solves error when build folder already exists
    if Directory.Exists(Path.Combine(dir, "mobileBuildAndroid")) then
        Directory.Delete(Path.Combine(dir, "mobileBuildAndroid"), true)

    do // create build env in html
        let args =
            [
            "mobileBuildAndroid"
            Path.Combine(dir, "mobileBuildAndroid") |> quote
            "/E /C /I /Q /Y"
            ]
        runProc "xcopy.exe" args []

    for b, n, sdkV in androids do
        let env = Path.Combine(dir, "mobileBuildAndroid")
        let android =
            System.Environment.GetEnvironmentVariable("ANDROID_HOME")
            |> function
                | null -> sprintf @"""%s\..\platforms\android-%s\android.jar""" (System.Environment.GetEnvironmentVariable("ANDROID_SDK")) sdkV
                | sdk -> sprintf @"""%s\..\platforms\android-%s\android.jar""" sdk sdkV
        do // clean target
            if Directory.Exists(Path.Combine(env, "target")) then
                Directory.Delete(Path.Combine(env, "target"), true)
        do // manifest
            let man = Path.Combine(env, "AndroidManifest.xml")
            let wmam =
                File.ReadAllText(man)
                    .Replace("$(TITLE)", info.title)
                    .Replace("$(SAFETITLE)", info.title.Replace(" ", ""))
                    .Replace("$(VERSION)", info.version)
                    .Replace("$(AUTHOR)", info.author)
                    .Replace("$(PUBLISHER)", info.publisher)
                    .Replace("$(DESCRIPTION)", info.description)
                    .Replace("$(SDKVERSION)", sdkV)
            File.WriteAllText (man, wmam)
        do // activity source, change package name
            let file = Path.Combine(env, "src\WebSharperMobileActivity.java")
            let wfile =
                File.ReadAllText(file)
                    .Replace("$(SAFETITLE)", info.title.Replace(" ", ""))
                    .Replace("$(AUTHOR)", info.author)
                    .Replace("$(PUBLISHER)", info.publisher)
            File.WriteAllText (file, wfile)
        do // aapt package -m -J src -M AndroidManifest.xml -S res -I android.jar
            let args =
                [
                "package -m -J"
                sprintf @"""%s\src"" -M ""%s\AndroidManifest.xml"" -S ""%s\res"" -I" env env env
                android
                ]
            runProc "aapt.exe" args []
        do // mkdir target/main-classes
            Directory.CreateDirectory (Path.Combine(env, @"target\main-classes")) |> ignore
        do // ? javac -encoding ascii -target 1.5 -sourcepath src -d target\main-classes -bootclasspath android.jar
            let args =
                [
                "-encoding ascii -target 1.5 -sourcepath"
                sprintf @"""%s\target"" -d ""%s\target\main-classes"" -bootclasspath" env env
                android
                sprintf @"""%s\src\WebSharperMobileActivity.java""" env
                ]
            runProc "javac.exe" args []
        do // dx --dex --output=target/classes.dex target/main-classes
            let args =
                [ sprintf @"--dex --output=%s\target\classes.dex %s\target\main-classes" env env ]
            runProc "dx.bat" args []
        do // aapt package -f -M AndroidManifest.xml -S res -I android.jar -F target/app.ap_
            let args =
                [
                "package -f -M"
                sprintf @"""%s\AndroidManifest.xml"" -S ""%s\res"" -I" env env
                android
                sprintf @"-F ""%s\target\app.ap_""" env
                ]
            runProc "aapt.exe" args []
        do // apkbuilder target/___.apk -z target/app.ap_ -f target/classes.dex -rf src // -rj lib
            let args =
                [ sprintf @"""%s\target\__%s"" -u -z ""%s\target\app.ap_"" -f ""%s\target\classes.dex"" -rf ""%s\src""" env n env env env ]
            runProc "apkbuilder.bat" args []
        do // copy from html\bin to html
            File.Copy (Path.Combine(dir, "mobileBuildAndroid\\target\\__" + n), Path.Combine(dir, "__" + n))
        do // actually fill contents (those are the www things)
            //System.Threading.Thread.Sleep 15000
            createForAndroid (Path.Combine (dir, "__" + n)) dir name
        do // *jarsigner*
            let key = b.Element(XName.Get "key").Value
            let alias = b.Element(XName.Get "alias").Value
            let passphrase = b.Element(XName.Get "passphrase").Value
            let args =
                [
                "-verbose"
                "-keystore"
                Path.Combine (pdir, key) |> quote
                Path.Combine (dir, "__" + n) |> quote
                alias
                ]
            runProc "jarsigner.exe" args [passphrase]
        do // zipalign -f 4 ___.apk _.apk
            runProc "zipalign.exe" [ "-f 4"; Path.Combine (dir, "__" + n) |> quote; Path.Combine (dir, n) |> quote ] []
        do // remove unaligned file
            File.Delete (Path.Combine (dir, "__" + n))

    do // delete building env from html
        Directory.Delete(Path.Combine(dir, "mobileBuildAndroid"), true)

    serverLocationDispose()

    0
