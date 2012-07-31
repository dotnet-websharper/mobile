// $begin{copyright}
//
// This file is confidential and proprietary.
//
// Copyright (c) IntelliFactory, 2004-2012.
//
// All rights reserved.  Reproduction or use in whole or in part is
// prohibited without the written consent of the copyright holder.
//-----------------------------------------------------------------
// $end{copyright}

module IntelliFactory.WebSharper.Android.Common

open IntelliFactory.WebSharper

/// java.lang.String
type JString = JString

[<Inline "String($x)">]
let toString (x: JString) = X<string>

/// java.util.List<T>
[<AbstractClass>]
type JList<'T> =
    [<Stub>] abstract member get : int -> 'T
    [<Stub>] abstract member size : unit -> int

/// com.intellifactory.android.Task.Status<T>
[<AbstractClass>]
type JStatus<'T> =
    [<Stub>] abstract member getErrorMessage : unit -> JString
    [<Stub>] abstract member getValue : unit -> 'T
    [<Stub>] abstract member isDone : unit -> bool
    [<Stub>] abstract member isError : unit -> bool

[<JavaScript>]
let asyncThrow (e: exn) : Async<'T> =
    Async.FromContinuations(fun (_, fail, _) -> fail e)

[<JavaScript>]
let toArray (list: JList<'T>) : 'T [] =
    Array.init (list.size()) (fun i -> list.get(i))

[<JavaScript>]
let toAsync (start: unit -> JStatus<'T>) : Async<'T> =
    let rec loop (x: JStatus<'T>) =
        async {
            if x.isDone() then
                if x.isError() then
                    return! asyncThrow (exn (toString (x.getErrorMessage())))
                else
                    return x.getValue()
            else
                do! Async.Sleep(500)
                return! loop x
        }
    async {
        let status = start ()
        return! loop status
    }
