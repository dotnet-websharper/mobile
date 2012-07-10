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
module C = Common

/// com.intellifactory.android.WebSharperBridge.Acceleration
[<AbstractClass>]
type JAcceleration =
    [<Stub>] abstract member x : unit -> double
    [<Stub>] abstract member y : unit -> double
    [<Stub>] abstract member z : unit -> double

/// android.location.Location
[<AbstractClass>]
type JLocation =
    [<Stub>] abstract member getLatitude : unit -> double
    [<Stub>] abstract member getLongitude : unit -> double

/// com.intellifactory.android.WebSharperBridge
[<AbstractClass>]
type Bridge =
    [<Stub>] abstract member accelerometerStart : unit -> unit
    [<Stub>] abstract member accelerometerStarted : unit -> bool
    [<Stub>] abstract member accelerometerStop : unit -> unit
    [<Stub>] abstract member canLocate : unit -> bool
    [<Stub>] abstract member getAcceleration : unit -> JAcceleration
    [<Stub>] abstract member getLocation : unit -> C.JStatus<JLocation>
    [<Stub>] abstract member finish : unit -> unit
    [<Stub>] abstract member hasCamera: unit -> bool
    [<Stub>] abstract member takePicture : unit -> C.JStatus<C.JString>
    [<Stub>] abstract member trace : priority: string * category: string * text: string -> unit

[<Sealed>]
type Geolocator [<JavaScript>] (bridge: Bridge) =
    interface IGeolocator with
        [<JavaScript>]
        member this.GetLocation() =
            async {
                let! loc = C.toAsync (fun () -> bridge.getLocation())
                return {
                    Latitude = loc.getLatitude()
                    Longitude = loc.getLongitude()
                }
            }

[<Sealed>]
type Context [<JavaScript>] (bridge: Bridge) =
    let accelEvent = new Event<Acceleration>()
    let onAccel = accelEvent.Publish
    let mutable isLooping = false

    [<JavaScript>]
    let getAcceleration () =
        let a = bridge.getAcceleration()
        { X = a.x(); Y = a.y(); Z = a.z() }

    [<JavaScript>]
    let rec loop (accel: Acceleration) =
        async {
            if bridge.accelerometerStarted() then
                let a = getAcceleration()
                if a = accel then
                    do! Async.Sleep(250)
                    return! loop accel
                else
                    do accelEvent.Trigger(a)
                    return! loop a
            else
                return isLooping <- false
        }

    [<JavaScript>]
    let startLooping () =
        if not isLooping then
            isLooping <- true
            loop (getAcceleration())
            |> Async.Start

    [<JavaScript>]
    member this.TakePicture() : Async<Jpeg> =
        async {
            let! s = C.toAsync (fun () -> bridge.takePicture())
            return C.toString s
        }

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
    member this.AccelerationChange = onAccel

    member this.IsMeasuringAcceleration
        with [<JavaScript>] get () =
            bridge.accelerometerStarted()
        and [<JavaScript>] set on =
            if on then
                bridge.accelerometerStart()
                startLooping ()
            else
                bridge.accelerometerStop()

    interface IAccelerometer with
        member this.AccelerationChange = this.AccelerationChange
        member this.IsMeasuringAcceleration
            with get () = this.IsMeasuringAcceleration
            and set x = this.IsMeasuringAcceleration <- x

    [<JavaScript>]
    member this.Geolocator =
        if bridge.canLocate()
            then Some (Geolocator bridge :> IGeolocator)
            else None

    [<JavaScript>]
    static member Get() =
        let b = JavaScript.Global?AndroidWebSharperBridge
        if As b then Some (Context b) else None
