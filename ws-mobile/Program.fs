// $begin{copyright}
//
// This file is confidential and proprietary.
//
// Copyright (c) IntelliFactory, 2004-2011.
//
// All rights reserved.  Reproduction or use in whole or in part is
// prohibited without the written consent of the copyright holder.
//-----------------------------------------------------------------
// $end{copyright}

open System
open System.Diagnostics
open System.IO
open System.Reflection
open System.Runtime.InteropServices
open System.Text
open System.Xml.Linq
open Ionic.Zip

#nowarn "25"

let imageTypes =
    [
        ".bmp"
        ".gif"
        ".ico"
        ".icns"
        ".jng"
        ".jfif"
        ".jpeg"
        ".jpg"
        ".mng"
        ".pgm"
        ".png"
        ".pnm"
        ".tif"
        ".tiff"
    ]

let isImage ``override`` (file : string) =
    (``override`` || file.StartsWith "www") &&
        imageTypes
        |> List.exists (fun suffix -> file.EndsWith suffix)

exception Handled

let stripStartingBackSlashes (s : string) =
    String(s.ToCharArray() |> Seq.skipWhile ((=) '\\') |> Array.ofSeq)

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
    try
        p.Start() |> ignore
    with _ ->
        eprintfn "ws_mobile : error 0000 : Could not start process \"%s\"." proc
        raise Handled
    for line in input do
        p.StandardInput.WriteLine line
    p.StandardOutput.ReadToEnd() |> ignore
    
    match p.StandardError.ReadToEnd().Trim() with
    | "THIS TOOL IS DEPRECATED. See --help for more information."
    | "Enter Passphrase for keystore:"
    | "" -> ()
    | s ->
        let lines = s.Split([| '\r'; '\n' |], StringSplitOptions.RemoveEmptyEntries)
        if lines.Length = 0 then ()
        elif lines.Length = 1 then
            eprintfn "%s : error 0000 : %s" proc lines.[0]
        else
            eprintfn "%s : error 0000 : %s" proc lines.[0]
            for line in Seq.skip 1 lines do eprintfn "%s" line
        
        if lines.Length > 1 then raise Handled

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

    let zip = new ZipFile(template)

    do
        zip.Entries
        |> Seq.filter (fun e -> e.FileName.StartsWith "www")
        |> List.ofSeq
        |> fun e -> zip.RemoveEntries (ResizeArray e)

    let addFile (relPath : string) =
        let path = Path.Combine(pdir, stripStartingBackSlashes relPath)
        if File.Exists path then
            zip.AddFile (path, "/") |> ignore
        else
            eprintfn "ws_mobile : error 0000 : Could not find file \"%s\"." path
            raise Handled

    match info.icon with
    | Some icon ->
        zip.RemoveEntry "ApplicationIcon.png"
        addFile icon
    | _ -> ()

    match info.background with
    | Some background ->
        zip.RemoveEntry "Background.png"
        addFile background
    | _ -> ()

    match info.splashscreen with
    | Some splashscreen ->
        zip.RemoveEntry "SplashScreenImage.jpg"
        addFile splashscreen
    | _ -> ()

    let man = Path.Combine (pdir, "WMAppManifest.xml")
    do
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

    zip.AddDirectory(dir, "www") |> ignore

    do // add to images the .wsm.img.js suffix
        zip.Entries
        |> List.ofSeq
        |> List.filter (fun e -> isImage false e.FileName)
        |> List.iter (fun e -> e.FileName <- e.FileName + ".wsm.img.js")

    let fileListing = Path.Combine(dir, @"fileListing.txt")

    let list = File.CreateText fileListing
    using list (fun list ->

        let files, dirs = collectFiles dir
    
        for d in dirs do
            list.WriteLine d

        list.WriteLine()

        for f in files do
            if f = "\\fileListing.txt" then ()
            elif isImage true f then
                list.WriteLine (f + ".wsm.img.js")
            else
                list.WriteLine f

        list.WriteLine())

    try zip.RemoveEntry "fileListing.txt" with _ -> ()
    zip.AddFile (fileListing, "/") |> ignore

    try
        zip.Save(sprintf @"%s\%s.xap" dir info.filename)
    with _ ->
        eprintfn "ws_mobile : error 0000 : Could not save \"%s.xap\". Please make sure it isn't being used by any other process." info.filename
        raise Handled

    tfDelete man
    
    fileListing

let createForAndroid (template : string) dir name =
    use zip = new ZipFile(template)
    
    let sourceFiles =
        zip.Entries
        |> Seq.filter (fun e -> e.FileName.StartsWith "assets/www")
        |> fun e -> zip.RemoveEntries (ResizeArray e)

    zip.AddDirectory(dir, "assets/www") |> ignore

    try zip.RemoveEntry (sprintf @"assets\www\%s.xap" name)
    with _ -> ()

    // removed mobileBuildAndroid folder and .apk files that were added by mistake
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

    try zip.Save()
    with _ ->
        eprintfn "ws_mobile : error 0000 : Could not save \"%s\". Please make sure it isn't being used by any other process." template
        raise Handled

let wsMobile (pdir, dir, asmpath) =
    try
        let stripDot (this : string) =
            if this.[this.Length - 1] = '.' then
                this.[0 .. this.Length - 2]
            else this
        let [ pdir; dir; asmpath ] = [ pdir; dir; asmpath ] |> List.map stripDot
        let asm = Assembly.LoadFile asmpath
        let doc =
            try XDocument.Load (Path.Combine(pdir, @"mobile.config"))
            with _ ->
                eprintfn "ws_mobile : error 0000 : Could not find file \"%s\"." (Path.Combine(pdir, @"mobile.config"))
                raise Handled
        let info =
            let title =
                try (asm.GetCustomAttributes(typeof<AssemblyProductAttribute>, true).[0] :?> AssemblyProductAttribute).Product
                with _ -> Path.GetFileNameWithoutExtension asmpath
            let company =
                try (asm.GetCustomAttributes(typeof<AssemblyCompanyAttribute>, true).[0] :?> AssemblyCompanyAttribute).Company
                with _ -> "Company"
            {
                title = title
                filename = title.Replace(" ", "")
                guid =  
                    try (asm.GetCustomAttributes(typeof<GuidAttribute>, true).[0] :?> GuidAttribute).Value
                    with _ -> System.Guid.NewGuid().ToString()
                version =
                    try (asm.GetCustomAttributes(typeof<AssemblyFileVersionAttribute>, true).[0] :?> AssemblyFileVersionAttribute).Version
                    with _ -> "0.0.0.0"
                isGame =
                    try Seq.isEmpty <| doc . Element(XName.Get "configuration")
                                            .Element(XName.Get "wp7")
                                            .Elements(XName.Get "isgame")
                        |> not
                    with _ -> false
                author = company
                publisher = company
                description =
                    try (asm.GetCustomAttributes(typeof<AssemblyDescriptionAttribute>, true).[0] :?> AssemblyDescriptionAttribute).Description
                    with _ -> ""
                icon =
                    try doc .Element(XName.Get "configuration")
                            .Element(XName.Get "wp7")
                            .Element(XName.Get "icon")
                            .Value
                        |> Some
                    with _ -> None
                background =
                    try doc .Element(XName.Get "configuration")
                            .Element(XName.Get "wp7")
                            .Element(XName.Get "background")
                            .Value
                        |> Some
                    with _ -> None
                splashscreen =
                    try doc .Element(XName.Get "configuration")
                            .Element(XName.Get "wp7")
                            .Element(XName.Get "splashscreen")
                            .Value
                        |> Some
                    with _ -> None
            }
        let name = info.filename

        tfDelete (Path.Combine (dir, sprintf @"%s.xap" name))

        Directory.GetFiles(dir, "*.apk")
        |> Array.iter (fun name -> tfDelete name)
    
        let androidBuilds =
            try doc .Element(XName.Get "configuration")
                    .Element(XName.Get "androidBuilds")
                    .Elements(XName.Get "build")
                |> List.ofSeq
            with _ -> []

        try
            let elem = doc.Element(XName.Get "configuration").Element(XName.Get "serverLocation")
            let serverLocation = Path.Combine(dir, @"serverLocation.txt")
            File.WriteAllText(serverLocation, elem.Value)
        with :? NullReferenceException -> () // no serverLocation specified

        let wp7Elems = doc.Element(XName.Get "configuration").Elements(XName.Get "wp7")
        let wp7 = Seq.length wp7Elems = 1
        if wp7 then
            createForWP7 @"mobileWP7.xap" pdir dir info
            |> File.Delete

        let androids =
            androidBuilds
            |> List.map (fun b ->
                        let output = b.Element(XName.Get "outputPackage").Value
                        b, output, b.Element(XName.Get "sdkVersion").Value)

        if List.length androids > 0 then

            let sdk =
                System.Environment.GetEnvironmentVariable("ANDROID_HOME")
                |> function
                    | null -> System.Environment.GetEnvironmentVariable("ANDROID_SDK")
                    | sdk -> sdk

            if sdk = null then
                eprintfn "ws_mobile: error 0000: Android SDK is not installed."
                -1
            else

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
                        let rec getFor sdkV =
                            let android =
                                sprintf @"%s\..\platforms\android-%s\android.jar" sdk sdkV
                            if File.Exists android then
                                android
                            else
                                match int sdkV with
                                | 0 ->
                                    eprintfn "ws_mobile : error 0000 : android.jar was not found!"
                                    raise Handled
                                | sdkV -> getFor (string (sdkV - 1))
                        sprintf @"""%s""" (getFor sdkV)
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
                    do // ? javac -encoding ascii -target 1.5 -source 1.5 -sourcepath src -d target\main-classes -bootclasspath android.jar
                        let args =
                            [
                            "-encoding ascii -target 1.5 -source 1.5 -sourcepath"
                            sprintf @"""%s\target"" -d ""%s\target\main-classes"" -bootclasspath" env env
                            android
                            sprintf @"""%s\src\WebSharperMobileActivity.java""" env
                            ]
                        runProc "javac.exe" args []
                    do // java -jar path\to\lib\dx.jar --dex "--output=path with spaces.dex" // dx --dex --output=target/classes.dex target/main-classes
                        let dxJar = sdk + @"\..\platform-tools\lib\dx.jar"
                        let args =
                            [ sprintf @"-jar %s --dex ""--output=%s\target\classes.dex"" ""%s\target\main-classes""" dxJar env env ]
                        runProc "java" args []
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
                        File.Copy (Path.Combine(dir, @"mobileBuildAndroid\target\__" + n), Path.Combine(dir, "__" + n))
                    do // actually fill contents (those are the www things)
                        //System.Threading.Thread.Sleep 15000
                        createForAndroid (Path.Combine (dir, "__" + n)) dir name
                    if b.Elements(XName.Get "signAndroid") |> Seq.isEmpty |> not then
                        do // *jarsigner*
                            let key = b.Element(XName.Get "key").Value
                            let alias = b.Element(XName.Get "alias").Value
                            let passphrase = b.Element(XName.Get "passphrase").Value
                            let args =
                                [
                                "-digestalg SHA1 -sigalg MD5withRSA"
                                "-keystore"
                                Path.Combine (pdir, stripStartingBackSlashes key) |> quote
                                Path.Combine (dir, "__" + n) |> quote
                                alias
                                ]
                            runProc "jarsigner.exe" args [passphrase]
                        do // zipalign -f 4 ___.apk _.apk
                            runProc "zipalign.exe" [ "-f 4"; Path.Combine (dir, "__" + n) |> quote; Path.Combine (dir, n) |> quote ] []
                        do // remove unaligned file
                            File.Delete (Path.Combine (dir, "__" + n))
                    else
                        try
                            File.Move(Path.Combine (dir, "__" + n), Path.Combine (dir, n))
                        with _ ->
                            eprintfn "ws_mobile : error 0000 : Could not save \"%s\". Please make sure it isn't being used by any other process." n
                            raise Handled

                0
        else
            0
    with
        | Handled -> -1
        | e ->
            eprintfn "ws_mobile : error 0000 : %s: %s %s" (e.GetType().FullName) e.Message (e.StackTrace.Replace("\r", "").Replace("\n", ""))
            -1

[<EntryPoint>]
let main args =

    if args.Length < 3 then
        eprintfn "ws_mobile : error 0000 : Insufficient number arguments."
        -1
    else
        if args.Length > 3 then
            eprintfn "ws_mobile : warning 0000 : More arguments than expected were supplied."

        try
            wsMobile (args.[0], args.[1], args.[2])
        finally
            try
                if Directory.Exists (Path.Combine(args.[1], "mobileBuildAndroid")) then
                    Directory.Delete(Path.Combine(args.[1], "mobileBuildAndroid"), true)
            with _ ->
                eprintfn "ws_mobile : warning 0000 : Could not delete mobileBuildAndroid from the target folder."
            try
                tfDelete (Path.Combine(args.[1], "serverLocation.txt"))
            with _ ->
                eprintfn "ws_mobile : warning 0000 : Could not delete serverLocation.txt from the target folder."