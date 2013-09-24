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

module IntelliFactory.WebSharper.WinPhone.Receiver

open System.Collections.Generic
open System.Runtime.CompilerServices
open IntelliFactory.WebSharper

[<Inline "JSON.parse($json)">]
[<MethodImpl(MethodImplOptions.NoInlining)>]
let jsonParse (json: string) : obj = null

[<JavaScript>]
let handlers =
    let handlers = Dictionary<int,obj->unit>()
    JavaScript.Global?OnWinPhoneMessage <- fun json ->
        let msg = jsonParse json
        handlers.[msg?UniqueId] msg
    handlers

[<JavaScript>]
let uid = ref 0

[<JavaScript>]
[<MethodImpl(MethodImplOptions.NoInlining)>]
let fresh () =
    incr uid
    !uid

[<JavaScript>]
let events = Dictionary<string,IEvent<obj>>()

[<JavaScript>]
let GetEvent<'T> (name: string) (recognize: string -> 'T) =
    if events.ContainsKey(name) then
        As<IEvent<'T>> events.[name]
    else
        let e = new Event<'T>()
        (?<-) JavaScript.Global name (fun msg -> e.Trigger (recognize msg))
        let ev = e.Publish
        events.[name] <- As<IEvent<obj>> ev
        ev

[<JavaScript>]
let MakeAsync<'T> (start: int -> unit) (recognize: obj -> 'T) =
    Async.FromContinuations(fun (ok, error, _) ->
        let uid = fresh ()
        handlers.[uid] <- fun msg ->
            handlers.Remove(uid)
            |> ignore
            let e = msg?Error
            if As e
            then error (exn e)
            else ok (recognize msg)
        start uid)
