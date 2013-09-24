// WebSharper.Mobile - support for building mobile WebSharper apps
// Copyright (c) 2013 IntelliFactory
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

module IntelliFactory.WebSharper.Android.Bluetooth

open System
open System.Collections.Generic
open System.Runtime.CompilerServices
open IntelliFactory.WebSharper
type C = IntelliFactory.WebSharper.Android.Context
type Pr = Mobile.Priority
type Binary = string
module U = Common

/// android.bluetooth.BluetoothDevice
[<AbstractClass>]
type JDevice =
    [<Stub>] abstract member getAddress : unit -> U.JString
    [<Stub>] abstract member getName : unit -> U.JString

/// com.intellifactory.android.BluetoothAsyncSocket
[<AbstractClass>]
type JSocket =
    [<Stub>] abstract member close : unit -> unit
    [<Stub>] abstract member getRemoteDevice : unit -> JDevice

/// com.intellifactory.android.BluetoothBridge.Server
[<AbstractClass>]
type JServer =
    [<Stub>] abstract member getClients : unit -> U.JList<JSocket>
    [<Stub>] abstract member isRunning : unit -> bool
    [<Stub>] abstract member stop : unit -> unit

/// com.intellifactory.android.BluetoothBridge
[<AbstractClass>]
type Bridge =
    [<Stub>] abstract member cancelDiscovery : unit -> unit
    [<Stub>] abstract member connectToDevice : dev: JDevice * uuid: string -> U.JStatus<JSocket>
    [<Stub>] abstract member createServer : name: string * uuid: string -> JServer
    [<Stub>] abstract member enable : unit -> U.JStatus<unit>
    [<Stub>] abstract member getBondedDevices : unit -> U.JList<JDevice>
    [<Stub>] abstract member getDiscoveredDevices : unit -> U.JList<JDevice>
    [<Stub>] abstract member isDiscoverable : unit -> bool
    [<Stub>] abstract member isDiscovering : unit -> bool
    [<Stub>] abstract member isEnabled : unit -> bool
    [<Stub>] abstract member makeDiscoverable : seconds: int -> U.JStatus<unit>
    [<Stub>] abstract member socketRead : socket: JSocket -> U.JStatus<U.JString>
    [<Stub>] abstract member socketWrite : socket: JSocket * data: string -> U.JStatus<unit>
    [<Stub>] abstract member startDiscovery : unit -> bool

[<Sealed>]
type Device [<JavaScript>] (dev: JDevice) =
    let name = dev.getName() |> U.toString
    let address = dev.getAddress() |> U.toString
    [<JavaScript>] member this.Dispose() = ()
    [<JavaScript>] member this.Address = address
    [<JavaScript>] member this.Device = dev
    [<JavaScript>] member this.Name = name

    interface IDisposable with
        member this.Dispose() = ()

type Base64Resource() =
    inherit Resources.BaseResource("base64_support.js")

[<Inline "base64_decode($s)">]
[<MethodImpl(MethodImplOptions.NoInlining)>]
let base64_decode (s: string) : string = failwith "client-side"

[<Inline "base64_encode($s)">]
[<MethodImpl(MethodImplOptions.NoInlining)>]
let base64_encode (s: string) : string = failwith "client-side"

[<Sealed>]
[<Require(typeof<Base64Resource>)>]
type Socket [<JavaScript>] (bridge: Bridge, sock: JSocket) =
    let device = new Device(sock.getRemoteDevice())

    [<JavaScript>]
    member this.Dispose() = sock.close()

    [<JavaScript>]
    member this.Read() =
        async {
            let! x = U.toAsync (fun () -> bridge.socketRead(sock))
            return base64_decode (U.toString x)
        }

    [<JavaScript>]
    member this.Write(data: Binary) =
        U.toAsync (fun () -> bridge.socketWrite(sock, base64_encode data))

    [<JavaScript>]
    member this.Device = device

    interface IDisposable with
        member this.Dispose() = this.Dispose()

[<Sealed>]
type Connection [<JavaScript>] (socket: Socket) =
    [<JavaScript>] member this.Dispose() = socket.Dispose()
    [<JavaScript>] member this.Device = socket.Device
    [<JavaScript>] member this.Socket = socket

    interface IDisposable with
        member this.Dispose() = this.Dispose()

[<Sealed>]
type Server [<JavaScript>] (bridge: Bridge, handle: Connection -> Async<unit>, server: JServer) =

    [<JavaScript>]
    let rec loop () =
        async {
            if server.isRunning() then
                do
                    U.toArray (server.getClients())
                    |> Array.iter (fun c ->
                        handle (new Connection(new Socket(bridge, c)))
                        |> Async.Start)
                do! Async.Sleep(500)
                return! loop ()
            else
                return ()
        }
    do Async.Start(loop ())

    [<JavaScript>]
    member this.Dispose() = server.stop()

    interface IDisposable with
        member this.Dispose() = this.Dispose()

[<Sealed>]
type Context [<JavaScript>] (bridge: Bridge, android: C) =

    let discoveryEvent = Event<Device>()
    let onDiscover = discoveryEvent.Publish
    let mutable isLooping = false

    [<JavaScript>]
    let rec discoveryLoop () =
        async {
            if bridge.isDiscovering() then
                do
                    bridge.getDiscoveredDevices()
                    |> U.toArray
                    |> Array.iter (fun dev ->
                        discoveryEvent.Trigger(new Device(dev)))
                do! Async.Sleep(500)
                return! discoveryLoop ()
            else
                return isLooping <- false
        }

    [<JavaScript>]
    let startDiscoveryLoop () =
        if not isLooping then
            isLooping <- true
            discoveryLoop ()
            |> Async.Start

    [<JavaScript>]
    member this.Android = android

    [<JavaScript>]
    member this.GetBondedDevices() =
        bridge.getBondedDevices()
        |> U.toArray
        |> Seq.map (fun dev -> new Device(dev))

    [<JavaScript>]
    member this.ConnectToDevice(device: Device, uuid: string) =
        async {
            let! s = U.toAsync (fun () -> bridge.connectToDevice(device.Device, uuid))
            return new Socket(bridge, s)
        }

    [<JavaScript>]
    member this.Serve(name: string, uuid: string, handle: Connection -> Async<unit>) =
        new Server(bridge, handle, bridge.createServer(name, uuid))

    [<JavaScript>]
    member this.CancelDiscovery() = bridge.cancelDiscovery()

    [<JavaScript>]
    member this.Discovery = onDiscover

    [<JavaScript>]
    member this.IsDiscovering = bridge.isDiscovering()

    [<JavaScript>]
    member this.StartDiscovery() =
        if not isLooping && bridge.startDiscovery() then
            startDiscoveryLoop ()

    [<JavaScript>]
    member this.IsDiscoverable = bridge.isDiscoverable()

    [<JavaScript>]
    member this.MakeDiscoverable(durationSeconds: int) =
        U.toAsync (fun () -> bridge.makeDiscoverable(durationSeconds))

    [<JavaScript>]
    member this.Enable() =
        U.toAsync (fun () -> bridge.enable())

    [<JavaScript>]
    member this.IsEnabled = bridge.isEnabled()

    [<JavaScript>]
    static member Get() =
        let b = JavaScript.Global?AndroidWebSharperBluetoothBridge
        let c = IntelliFactory.WebSharper.Android.Context.Get()
        if As b then
            match c with
            | Some android -> Some (Context(b, android))
            | _ -> None
        else None

[<assembly: System.Web.UI.WebResource("base64_support.js", "text/javascript")>]
do ()