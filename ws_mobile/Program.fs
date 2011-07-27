// zipalign -f 4 _.apk _.apk ?

open System.Diagnostics
open System.IO
open System.Text
open System.Xml.Linq
open Ionic.Zip

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

let createForWP7 (template : string) dir name =
    let zip = new ZipFile(template)
    
    do
        zip.Entries
        |> Seq.filter (fun e -> e.FileName.StartsWith "www")
        |> fun e -> zip.RemoveEntries (ResizeArray e)

    zip.AddDirectory(dir, "www") |> ignore

    let fileListing = sprintf "%s\\fileListing.txt" dir

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

    zip.AddFile (fileListing, "/") |> ignore

    zip.Save(sprintf "%s\\%s.xap" dir name)

    fileListing

let createForAndroid wp7 (template : string) dir name =
    let zip = new ZipFile(template)
    
    let sourceFiles =
        zip.Entries
        |> Seq.filter (fun e -> e.FileName.StartsWith "assets/www")
        |> fun e -> zip.RemoveEntries (ResizeArray e)

    zip.AddDirectory(dir, "assets/www") |> ignore

    if wp7 then
        zip.RemoveEntry (sprintf "%s\\%s.xap" dir name)

    zip

[<EntryPoint>]
let main [| pdir; dir; name |] =
    let pdir =
        if pdir.[pdir.Length - 1] = '.' then
            pdir.[0 .. pdir.Length - 2]
        else pdir
    let dir =
        if dir.[dir.Length - 1] = '.' then
            dir.[0 .. dir.Length - 2]
        else dir
    let name = name.[0 .. name.Length - 5]

    try File.Delete (sprintf "%s\\%s.xap" dir name)
    with _ -> ()

    Directory.GetFiles(dir)
    |> Seq.filter (fun e -> e.EndsWith(".apk"))
    |> Seq.iter (fun name -> File.Delete name)

    let doc = XDocument.Load (pdir + "\\mobile.config")
    
    let androidBuilds =
        try
            doc .Element(XName.Get "configuration")
                .Element(XName.Get "androidBuilds")
                .Elements(XName.Get "build")
            |> List.ofSeq
        with _ -> []

    let wp7Elems = doc.Element(XName.Get "configuration").Elements(XName.Get "wp7")
    let wp7 = Seq.length wp7Elems = 1
    if wp7 then
        let template = (Seq.head wp7Elems).Attribute(XName.Get "template").Value
        createForWP7 (sprintf "%s\\%s" pdir template) dir name
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
                        z.Save(sprintf "%s\\%s" dir n)
                        if b.Elements(XName.Get "signAndroid") |> Seq.isEmpty |> not then
                            Some (b, n)
                        else
                            None)

    for b, n in androids do
        let key = b.Element(XName.Get "key").Value
        let alias = b.Element(XName.Get "alias").Value
        let passphrase = b.Element(XName.Get "passphrase").Value
        use p = new Process()
        let si = ProcessStartInfo()
        si.Arguments <- sprintf "-verbose -keystore \"%s\\%s\" \"%s\\%s\" %s" pdir key dir n alias
        si.CreateNoWindow <- true
        si.UseShellExecute <- false
        si.FileName <- "jarsigner.exe"
        si.RedirectStandardInput <- true
        si.RedirectStandardOutput <- true
        si.RedirectStandardError <- true
        p.StartInfo <- si
        p.Start() |> ignore
        p.StandardInput.WriteLine(passphrase)
        p.StandardOutput.ReadToEnd() |> ignore

    0