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

module IntelliFactory.WebSharper.Android.Receiver

open System.Collections.Generic
open IntelliFactory.WebSharper

[<JavaScript>]
let receiver =
    let receiver = obj ()
    JavaScript.Global?AndroidWebSharperReceiver <- receiver
    receiver

[<JavaScript>]
let handlers =
    let handlers = Dictionary<int,obj->unit>()
    receiver?onAsync <- fun msg -> handlers.[msg?uid] msg
    handlers

[<JavaScript>]
let uid = ref 0

[<JavaScript>]
let fresh () =
    incr uid
    !uid

[<JavaScript>]
let events = Dictionary<string,IEvent<obj>>()

[<JavaScript>]
let GetEvent<'T> (name: string) (recognize: obj -> 'T) =
    if events.ContainsKey(name) then
        As<IEvent<'T>> events.[name]
    else
        let e = new Event<'T>()
        (?<-) receiver name (fun msg -> e.Trigger (recognize msg))
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
            if As msg?error then
                error (exn msg?error)
            else
                ok (recognize msg)
        start uid)
