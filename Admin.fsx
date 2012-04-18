open System
open System.IO

let deploy () =
    let ( ++ ) a b = Path.Combine(a, b)
    let dir = __SOURCE_DIRECTORY__
    let wsHome = Environment.GetEnvironmentVariable("WEBSHARPER_HOME")
    let dll x = dir ++ x ++ "bin" ++ "Release" ++ (x + ".dll")
    let deploy file =
        let tgt = wsHome ++ Path.GetFileName(file)
        File.Copy(file, tgt, true)
        printfn "cp %s %s" file tgt
    deploy (dll "IntelliFactory.WebSharper.Mobile")
    deploy (dll "IntelliFactory.WebSharper.Android")
    deploy (dll "IntelliFactory.WebSharper.WinPhone")
    deploy (dll "IntelliFactory.WebSharper.WinPhone.Runtime")
    deploy (dll "IntelliFactory.WebSharper.WinPhone.Tasks")
