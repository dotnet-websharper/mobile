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

module IntelliFactory.WebSharper.Android.Bluetooth

open System
open System.Collections.Generic
open IntelliFactory.WebSharper

type Binary = string

/// Represents a stub for the Java-implemented backend.
[<AbstractClass>]
type Bridge =

    [<Stub>] abstract member connectToDevice : deviceId: int * uuid: string * uid: int -> unit

    [<Stub>] abstract member makeServer : name: string * uuid: string -> int
    [<Stub>] abstract member startServer : serverId: int -> unit
    [<Stub>] abstract member disposeServer : serverId: int -> unit

    [<Stub>] abstract member getBondedDevices : unit -> int []

    [<Stub>] abstract member isDiscovering : unit -> bool
    [<Stub>] abstract member cancelDiscovery : unit -> unit
    [<Stub>] abstract member startDiscovery : unit -> unit

    [<Stub>] abstract member isDiscoverable : unit -> bool
    [<Stub>] abstract member makeDiscoverable : seconds: int * uid: int -> unit

    [<Stub>] abstract member enable : uid: int -> unit
    [<Stub>] abstract member isEnabled : unit -> bool

    [<Stub>] abstract member deviceAddress : deviceId: int -> string
    [<Stub>] abstract member deviceName : deviceId: int -> string
    [<Stub>] abstract member disposeDevice : deviceId: int -> unit

    [<Stub>] abstract member socketRead : socketId: int * uid: int -> unit
    [<Stub>] abstract member socketWrite : socketId: int * uid: int * data: Binary -> unit
    [<Stub>] abstract member disposeSocket : socketId: int -> unit

[<Sealed>]
type Device [<JavaScript>] (id: int, bridge: Bridge) =
    let name = bridge.deviceName(id)
    let address = bridge.deviceAddress(id)
    [<JavaScript>] member this.Dispose() = bridge.disposeDevice(id)
    [<JavaScript>] member this.Address = address
    [<JavaScript>] member this.Name = name
    [<JavaScript>] member this.Id = id

    interface IDisposable with
        member this.Dispose() = this.Dispose()

[<Sealed>]
type Socket [<JavaScript>] (id: int, bridge: Bridge) =

    [<JavaScript>]
    member this.Dispose() = bridge.disposeSocket(id)

    [<JavaScript>]
    member this.Read() =
        Receiver.MakeAsync
            (fun uid -> bridge.socketRead(id, uid))
            (fun msg -> As<Binary> msg?data)

    [<JavaScript>]
    member this.Write(data: Binary) =
        Receiver.MakeAsync
            (fun uid -> bridge.socketWrite(id, uid, data))
            (fun msg -> ())

    interface IDisposable with
        member this.Dispose() = this.Dispose()

[<Sealed>]
type Connection [<JavaScript>] (serverId: int, device: Device, socket: Socket) =
    [<JavaScript>] member this.Dispose() = device.Dispose(); socket.Dispose()
    [<JavaScript>] member this.Device = device
    [<JavaScript>] member this.Socket = socket
    [<JavaScript>] member this.ServerId = serverId

    interface IDisposable with
        member this.Dispose() = this.Dispose()

[<Sealed>]
type Server
    [<JavaScript>]
    (
        id: int,
        bridge: Bridge,
        handle: Connection -> Async<unit>,
        dispose: unit -> unit
    ) =
    [<JavaScript>] member this.Dispose() = dispose (); bridge.disposeServer(id)
    [<JavaScript>] member this.Handle(c) = handle c
    interface IDisposable with
        member this.Dispose() = this.Dispose()

[<Sealed>]
type Context [<JavaScript>] (bridge: Bridge)=

    let servers = Dictionary<int,Server>()

    let onDiscover =
        Receiver.GetEvent "onDiscover" <| fun msg ->
            new Device(msg?device, bridge)

    let onAccept =
        Receiver.GetEvent "onAccept" <| fun msg ->
            new Connection(msg?server,
                new Device(msg?device, bridge),
                new Socket(msg?socket, bridge))

    do  onAccept
        |> Event.add (fun conn ->
            if servers.ContainsKey(conn.ServerId) then
                let server = servers.[conn.ServerId]
                async.TryFinally(server.Handle conn, fun () -> conn.Dispose())
                |> Async.Start)

    [<JavaScript>]
    member this.GetBondedDevices() =
        let devices = bridge.getBondedDevices()
        let r = Array.init devices.Length (fun i -> new Device(devices.[i], bridge))
        r :> seq<_>

    [<JavaScript>]
    member this.ConnectToDevice(device: Device, uuid: string) =
        Receiver.MakeAsync
            (fun uid -> bridge.connectToDevice(device.Id, uuid, uid))
            (fun msg -> new Socket(msg?socket, bridge))

    [<JavaScript>]
    member this.Serve(name: string, uuid: string, handle: Connection -> Async<unit>) =
        let serverId = bridge.makeServer(name, uuid)
        let server =
            new Server(serverId, bridge, handle, fun () ->
                servers.Remove(serverId) |> ignore)
        servers.[serverId] <- server
        bridge.startServer(serverId)
        server

    [<JavaScript>] member this.CancelDiscovery() = bridge.cancelDiscovery()
    [<JavaScript>] member this.Discovery = onDiscover
    [<JavaScript>] member this.IsDiscovering = bridge.isDiscovering()
    [<JavaScript>] member this.StartDiscovery() = bridge.startDiscovery()
    [<JavaScript>] member this.IsDiscoverable = bridge.isDiscoverable()

    [<JavaScript>]
    member this.MakeDiscoverable(durationSeconds: int) =
        Receiver.MakeAsync
            (fun uid -> bridge.makeDiscoverable(durationSeconds, uid))
            ignore

    [<JavaScript>] member this.Enable() = Receiver.MakeAsync bridge.enable ignore
    [<JavaScript>] member this.IsEnabled = bridge.isEnabled()

    [<JavaScript>]
    static member Get() =
        let b = JavaScript.Global?AndroidWebSharperBluetoothBridge
        if As b then
            Some (Context b)
        else
            None
