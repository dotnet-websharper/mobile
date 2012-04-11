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
    [<Stub>] abstract member alert : string -> unit
    [<Stub>] abstract member canLocate : unit -> bool
    [<Stub>] abstract member getLocation : uid: int -> unit
    [<Stub>] abstract member hasCamera : unit -> bool
    [<Stub>] abstract member log : string -> unit
    [<Stub>] abstract member takePicture : uid: int * width: int * height: int -> unit

[<Sealed>]
type Camera [<JavaScript>] (bridge: Bridge) =
    interface ICamera with
        [<JavaScript>]
        member this.TakePicture(width, height) : Async<Jpeg> =
            if bridge.hasCamera() then
                Receiver.MakeAsync
                    (fun uid -> bridge.takePicture(uid, width, height))
                    (fun msg -> msg?jpeg)
            else
                async {
                    return raise (exn "No camera found on the device.")
                }

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

[<Sealed>]
type Context

    [<JavaScript>]
    (bridge: Bridge) =

    let accelerationChange : IEvent<Acceleration> =
        Receiver.GetEvent "onAccelerationChange" <| fun msg ->
            {
                X = msg?x
                Y = msg?y
                Z = msg?z
            }

    [<JavaScript>]
    member this.AccelerationChange = accelerationChange

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
    member this.Alert(message) = bridge.alert(message)

    [<JavaScript>]
    member this.Log(message) = bridge.log(message)

    [<JavaScript>]
    member this.Camera =
        if bridge.hasCamera() then
            Some (Camera bridge :> ICamera)
        else
            None

    [<JavaScript>]
    member this.Geolocator =
        if bridge.canLocate() then
            Some (Geolocator bridge :> IGeolocator)
        else
            None

    interface IContext with
        member this.Alert(message) = this.Alert(message)
        member this.Log(message) = this.Log(message)

    [<JavaScript>]
    member this.Load(key: string) : option<string> =
        let value = Html5.Window.Self.LocalStorage.GetItem(key)
        if JavaScript.TypeOf(value) ==. JavaScript.Kind.Undefined
        then None
        else Some value

    [<JavaScript>]
    member this.Save(key: string, value: string) =
        Html5.Window.Self.LocalStorage.SetItem(key, value)

    interface IStorage with
        member this.Load(key) = this.Load(key)
        member this.Save(key, value) = this.Save(key, value)

    [<JavaScript>]
    static member Get() =
        let b = JavaScript.Global?AndroidWebSharperBridge
        if As b then
            Some (Context b)
        else
            None
