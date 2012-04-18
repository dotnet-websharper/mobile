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
        printfn "cp %s %s" file tgt
        File.Copy(file, tgt, true)
    for p in projects do
        deploy (dll p)
    deploy (dir ++ "build" ++ "IntelliFactory.WebSharper.Android.targets")
    deploy (dir ++ "build" ++ "IntelliFactory.WebSharper.WinPhone.targets")

let check () =
    for p in projects do
        Assembly.LoadFile(dll p).GetName()
        |> printfn "%O"
