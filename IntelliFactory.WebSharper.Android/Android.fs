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

namespace IntelliFactory.WebSharper.Android

open System
open System.Collections.Generic
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Mobile

[<AbstractClass>]
type Bridge =
    [<Stub>] abstract member accelerometerStarted : unit -> bool
    [<Stub>] abstract member accelerometerStart : unit -> unit
    [<Stub>] abstract member accelerometerStop : unit -> unit
    [<Stub>] abstract member canLocate : unit -> bool
    [<Stub>] abstract member getLocation : uid: int -> unit
    [<Stub>] abstract member takePicture : uid: int -> unit
    [<Stub>] abstract member trace : priority: string * category: string * text: string -> unit

[<Sealed>]
type Geolocator [<JavaScript>] (bridge: Bridge) =
    interface IGeolocator with
        [<JavaScript>]
        member this.GetLocation() =
            Receiver.MakeAsync
                (fun uid -> bridge.getLocation(uid))
                (fun msg ->
                    {
                        Latitude = msg?lat
                        Longitude = msg?lng
                    })

module Util =

    [<JavaScript>]
    let AccelerationChange : IEvent<Acceleration> =
        Receiver.GetEvent "onAccelerationChange" <| fun msg ->
            {
                X = msg?x
                Y = msg?y
                Z = msg?z
            }

[<Sealed>]
type Context [<JavaScript>] (bridge: Bridge) =

    [<JavaScript>]
    member this.TakePicture() : Async<Jpeg> =
        Receiver.MakeAsync
            (fun uid -> bridge.takePicture(uid))
            (fun msg -> msg?jpeg)

    interface ICamera with
        member this.TakePicture() = this.TakePicture()

    [<JavaScript>]
    member this.Trace(priority: Priority, category: string, message: string) =
         let pr =
            match priority with
            | Debug -> "debug"
            | Info -> "info"
            | Warn -> "warn"
            | Error -> "error"
         bridge.trace(pr, category, message)

    interface ILog with
        member this.Trace(p, c, m) = this.Trace(p, c, m)

    [<JavaScript>]
    member this.AccelerationChange =
        Util.AccelerationChange

    member this.IsMeasuringAcceleration
        with [<JavaScript>] get () =
            bridge.accelerometerStarted()
        and [<JavaScript>] set on =
            if on
            then bridge.accelerometerStart()
            else bridge.accelerometerStop()

    interface IAccelerometer with
        member this.AccelerationChange = this.AccelerationChange
        member this.IsMeasuringAcceleration
            with get () = this.IsMeasuringAcceleration
            and set x = this.IsMeasuringAcceleration <- x

    [<JavaScript>]
    member this.Geolocator =
        if bridge.canLocate() then
            Some (Geolocator bridge :> IGeolocator)
        else
            None

    [<JavaScript>]
    static member Get() =
        let b = JavaScript.Global?AndroidWebSharperBridge
        if As b then
            Some (Context b)
        else
            None
