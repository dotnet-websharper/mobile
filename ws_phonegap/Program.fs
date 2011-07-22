// zipalign -f 4 _.apk _.apk ?

open System.Diagnostics
open System.IO
open System.Text
open System.Xml.Linq
open Ionic.Zip

(*let createForSymbian dir name =
    let output = sprintf "%s\\%s.wgz" dir name

    let directStream input output =
        use readStream : Stream = input
        use writeStream : Stream = output
        let length = 256
        let buffer = Array.create length 0uy
        let mutable bytesRead = readStream.Read(buffer, 0, length)
        while bytesRead > 0 do
            writeStream.Write(buffer, 0, bytesRead)
            bytesRead <- readStream.Read(buffer, 0, length)

    let streamToString input =
        use readStream : Stream = input
        let length = 256
        let buffer = Array.create length 0uy
        let bytesRead = ref <| readStream.Read(buffer, 0, length)
        [|
            while !bytesRead > 0 do
                yield! buffer.[ 0 .. !bytesRead - 1 ]
                bytesRead := readStream.Read(buffer, 0, length)
        |]
        |> Array.map char
        |> fun x -> System.String x

    let read = System.Reflection.Assembly.GetExecutingAssembly().GetManifestResourceStream("sym-app.wgz.zip")
    let write = File.Create output

    directStream read write

    let zip = new ZipFile(output)
    
    zip.AddDirectory(dir, "www") |> ignore

    let read = System.Reflection.Assembly.GetExecutingAssembly().GetManifestResourceStream("Info.plist")
    let plist = (streamToString read).Replace("$APPNAME$", name)
    zip.AddEntry("www/Info.plist", plist) |> ignore

    zip.Save output*)

let createForAndroid (template : string) dir name =
    let zip = new ZipFile(template)
    
    let sourceFiles =
        zip.Entries
        |> Seq.filter (fun e -> e.FileName.StartsWith "assets/www")
        |> fun e -> zip.RemoveEntries (ResizeArray e)

    zip.AddDirectory(dir, "assets/www") |> ignore

    //if symbian then
    //    zip.RemoveEntry (sprintf "%s\\%s.wgz" dir name)

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

    try File.Delete (sprintf "%s\\%s.wgz" dir name)
    with _ -> ()

    Directory.GetFiles(dir)
    |> Seq.filter (fun e -> e.EndsWith(".apk"))
    |> Seq.iter (fun name -> File.Delete name)

    let doc = XDocument.Load (pdir + "\\mobile.config")
    
    let androidBuilds =
        doc .Element(XName.Get "configuration")
            .Element(XName.Get "androidBuilds")
            .Elements(XName.Get "build")
        |> List.ofSeq

    //let symbian = doc.Element(XName.Get "configuration").Elements(XName.Get "symbian") |> Seq.isEmpty |> not
    //if symbian then
    //    createForSymbian dir name

    let androids =
        
        let androids =
            androidBuilds
            |> List.map (fun b ->
                        let template = b.Element(XName.Get "templateApk").Value
                        b, template, createForAndroid (sprintf "%s\\%s" pdir template) dir name)
        
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