open System
open System.IO
open System.Reflection

let ( ++ ) a b = Path.Combine(a, b)
let dir = __SOURCE_DIRECTORY__

let projects =
    [
        "IntelliFactory.WebSharper.Mobile"
        "IntelliFactory.WebSharper.Android"
        "IntelliFactory.WebSharper.WinPhone"
        "IntelliFactory.WebSharper.WinPhone.Runtime"
        "IntelliFactory.WebSharper.WinPhone.Tasks"
    ]

let dll x =
    dir ++ x ++ "bin" ++ "Release" ++ (x + ".dll")

let deploy () =
    let wsHome = Environment.GetEnvironmentVariable("WEBSHARPER_HOME")
    let deploy file =
        let tgt = wsHome ++ Path.GetFileName(file)
        File.Copy(file, tgt, true)
        printfn "cp %s %s" file tgt
    for p in projects do
        deploy p

let check () =
    for p in projects do
        Assembly.LoadFile(dll p).GetName()
        |> printfn "%O"
