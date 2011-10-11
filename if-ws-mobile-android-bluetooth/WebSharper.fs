// $begin{copyright}
//
// This file is confidential and proprietary.
//
// Copyright (c) IntelliFactory, 2004-2011.
//
// All rights reserved.  Reproduction or use in whole or in part is
// prohibited without the written consent of the copyright holder.
//-----------------------------------------------------------------
// $end{copyright}

module IntelliFactory.WebSharper.Mobile.Android.Bluetooth

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json
open IntelliFactory.WebSharper.Mobile

module private BluetoothCallbacksManager =

    [<JavaScript>]
    let private callbacks = new System.Collections.Generic.Dictionary<int,obj>()

    [<JavaScript>]
    let mutable private callbackCounter = 0

    [<JavaScript>]
    let registerFunction success =
        let cbc = callbackCounter
        callbackCounter <- callbackCounter + 1
        callbacks.[cbc] <- success
        "IntelliFactory.WebSharper.Mobile.Android.Bluetooth.BluetoothCallbacksManager.callbacks.get_Item(" + string cbc + ")"

module Bluetooth =
    
    [<RequireQualifiedAccess>]
    type Data =
        | Int of int
        /// Unicode array
        | String of string
        | Array of Data list
        | RawData of int []
       
        [<JavaScript>]
        static member Serialize data =
            let intToByteArray i =
                let b3 = i / (pown 256 3)
                let b2 = (i - b3 * (pown 256 3)) / (pown 256 2)
                let b1 = (i - b3 * (pown 256 3) - b2 * (pown 256 2)) / 256
                let b0 = i -  b3 * (pown 256 3) - b2 * (pown 256 2) - b1 * 256
                [| b3; b2; b1; b0 |]
            match data with
            | Int i ->
                Array.append [|0|]  (intToByteArray i)
            | String s ->
                let data =
                    s.ToCharArray()
                    |> Array.map (int >> intToByteArray >> Seq.skip 2)
                    |> Seq.concat
                [|
                    yield 1
                    yield!
                        data
                        |> Seq.length
                        |> intToByteArray
                        |> Seq.skip 2
                    yield! data
                |]
            | Array ds ->
                [|
                    yield 2
                    yield!
                        ds
                        |> Seq.length
                        |> intToByteArray
                        |> Seq.skip 2
                    for data in ds do
                        yield! Data.Serialize data
                |]
            | RawData data ->
                [|
                    yield 3
                    yield!
                        data.Length
                        |> intToByteArray
                        |> Seq.skip 2
                    yield! data
                |]
        
        [<JavaScript>]
        static member Deserialize data =
            let rec trySkipTake n acc : int list -> (int list * int list) option = function
                | t when n = 0 -> Some (List.rev acc, t)
                | [] -> None
                | h::t -> trySkipTake (n - 1) (h::acc) t

            let rec partialDeserialization = function
                | 0::b3::b2::b1::b0::leftovers ->
                    (Int (b3 * (pown 256 3) + b2 * (pown 256 2) + b1 * (pown 256 1) + b0),
                        leftovers)
                    |> Some
                | 1::lh::ll::data ->
                    let length = lh * 256 + ll
                    trySkipTake (2 * length) [] data
                    |> Option.map (fun (stringBytes, leftovers) ->
                    let stringChars =
                        String.init length (fun i ->
                            stringBytes.[i * 2] * 256 + stringBytes.[i * 2 + 1]
                            |> char |> string)
                    Data.String stringChars, leftovers)
                | 2::lh::ll::data ->
                    let length = lh * 256 + ll
                    let rec op n acc data =
                        if n = 0 then Some (Array (List.rev acc), data)
                        else
                            partialDeserialization data
                            |> Option.bind (fun (d, data) ->
                                op (n - 1) (d::acc) data)
                    op length [] data
                | 3::lh::ll::data ->
                    let length = lh * 256 + ll
                    trySkipTake (2 * length) [] data
                    |> Option.map (fun (bytes, leftovers) ->
                        RawData (Array.ofList bytes), leftovers)
                | _ -> None
            
            partialDeserialization (List.ofArray data)
            |> Option.bind (function
                | data, [] -> Some data
                | _ -> None)
    
    type Token =
        {
            Token : string
            mutable IsConnected : bool
        }
    type RawToken =
        {
            Token : string
            mutable IsConnected : bool
        }

    type Device =
        {
            UniqueId : string
            Name : string
        }

    [<JavaScript>]
    let private asyncForF f =
        Async.FromContinuations (fun (success, _, _) ->
            let cb = BluetoothCallbacksManager.registerFunction success
            f cb)
    
    [<Inline "websharperBridge.activateBluetooth($f)">]
    let private activate (f : string) = ()
    [<JavaScript>]
    let Activate () : Async<bool> = asyncForF activate

    [<Inline "websharperBridge.getPairedDevices($f)">]
    let private getPairedDevices (f : string) = ()
    [<JavaScript>]
    let GetPairedDevices () : Async<Device list> = asyncForF getPairedDevices
    
    [<Inline "websharperBridge.startDeviceDiscovery($f, $action)">]
    let private startDeviceDiscovery (action : string) (f : string) = ()
    [<JavaScript>]
    let StartDeviceDiscovery (action : Device -> unit) : Async<unit> =
        let action = BluetoothCallbacksManager.registerFunction action
        asyncForF (startDeviceDiscovery action)

    [<Inline "websharperBridge.stopDeviceDiscovery($f)">]
    let private stopDeviceDiscovery (f : string) = ()
    [<JavaScript>]
    let StopDeviceDiscovery () : Async<unit> = asyncForF stopDeviceDiscovery
            
    [<Inline "websharperBridge.connectToDevice($f, $device, $uuid, false)">]
    let private connectToDevice (device : string) (uuid : string) (f : string) = ()
    [<JavaScript>]
    let ConnectToDevice { UniqueId = uid } uuid : Async<Token option> =
        let uuid =
            match uuid with
            | Some uuid -> uuid
            | _ -> null
        asyncForF (connectToDevice uid uuid)

    [<Inline "websharperBridge.connectToDevice($f, $device, $uuid, true)">]
    let private rawConnectToDevice (device : string) (uuid : string) (f : string) = ()
    [<JavaScript>]
    let RawConnectToDevice { UniqueId = uid } uuid : Async<RawToken option> =
        let uuid =
            match uuid with
            | Some uuid -> uuid
            | _ -> null
        asyncForF (rawConnectToDevice uid uuid)

    [<Inline "websharperBridge.makeDiscoverable($f, $d)">]
    let private makeDiscoverable (d : int) (f : string) = ()
    [<JavaScript>]
    let MakeDiscoverable duration : Async<bool> = asyncForF (makeDiscoverable duration)
    
    [<Inline "websharperBridge.startServer($f, $action, false)">]
    let private startServer (action : string) (f : string) = ()
    [<JavaScript>]
    let StartServer (action : Token -> unit) : Async<bool> =
        let action = BluetoothCallbacksManager.registerFunction
                        (action << fun token ->
                            {
                                Token = token
                                IsConnected = true
                            })
        asyncForF (startServer action)

    [<Inline "websharperBridge.startServer($f, $action, true)">]
    let private rawStartServer (action : string) (f : string) = ()
    [<JavaScript>]
    let RawStartServer (action : RawToken -> unit) : Async<bool> =
        let action = BluetoothCallbacksManager.registerFunction
                        (action << fun token ->
                            {
                                Token = token
                                IsConnected = true
                            })
        asyncForF (rawStartServer action)

    [<Inline "websharperBridge.stopServer($f)">]
    let private stopServer (f : string) = ()
    [<JavaScript>]
    let StopServer () : Async<unit> = asyncForF stopServer
    
    [<Inline "websharperBridge.closeConnection($f, $token, false)">]
    let private closeConnection (token : string) (f : string) = ()
    [<JavaScript>]
    let CloseConnection (token : Token) : Async<unit> =
        token.IsConnected <- false
        asyncForF (closeConnection token.Token)

    [<Inline "websharperBridge.readFromConnection($f, $token, false, 0)">]
    let private readMessageFromConnection (token : string) (f : string) = ()
    [<JavaScript>]
    let ReadMessageFromConnection (token : Token) : Async<int [] option> =
        async {
            let! value = asyncForF (readMessageFromConnection token.Token)
            token.IsConnected <- Option.isSome value
            return value
        }

    [<Inline "websharperBridge.writeToConnection($f, $token, $data, false)">]
    let private writeMessageToConnection (token : string) (data : int []) (f : string) = ()
    [<JavaScript>]
    let WriteMessageToConnection (token : Token) data : Async<bool> =
        async {
            let! value = asyncForF (writeMessageToConnection token.Token data)
            token.IsConnected <- value
            return value
        }

    [<Inline "websharperBridge.closeConnection($f, $token, true)">]
    let private rawCloseConnection (token : string) (f : string) = ()
    [<JavaScript>]
    let RawCloseConnection (token : RawToken) : Async<unit> =
        token.IsConnected <- false
        asyncForF (rawCloseConnection token.Token)

    [<Inline "websharperBridge.readFromConnection($f, $token, true, $n)">]
    let private rawReadFromConnection (token : string) (n : int) (f : string) = ()
    [<JavaScript>]
    let RawReadFromConnection (token : RawToken) n : Async<int [] option> =
        async {
            let! value = asyncForF (rawReadFromConnection token.Token n)
            token.IsConnected <- Option.isSome value
            return value
        }

    [<Inline "websharperBridge.writeToConnection($f, $token, $data, true)">]
    let private rawWriteToConnection (token : string) (data : int []) (f : string) = ()
    [<JavaScript>]
    let RawWriteToConnection (token : RawToken) data : Async<bool> =
        async {
            let! value = asyncForF (rawWriteToConnection token.Token data)
            token.IsConnected <- value
            return value
        }

// BTcomm actions
type Write = Write of Bluetooth.Data
type WriteRawData = WriteRawData of int []
type Read = Read
type ReadRawData = ReadRawData

type BTcomm [<JavaScript>] (token) =
    [<JavaScript>]
    member this.Bind(WriteRawData data : WriteRawData, cont) =
        async {
            let! success = Bluetooth.WriteMessageToConnection token data
            return! cont success
        }
    [<JavaScript>]
    member this.Bind(Write data : Write, cont) =
        this.Bind(WriteRawData (Bluetooth.Data.Serialize data), cont)
    [<JavaScript>]
    member this.Bind(_ : ReadRawData, cont) =
        async.Bind(Bluetooth.ReadMessageFromConnection token, cont)
    [<JavaScript>]
    member this.Bind(_ : Read, cont) =
        this.Bind(ReadRawData, Option.bind Bluetooth.Data.Deserialize >> cont)
    [<JavaScript>]
    member this.Bind(x : Async<_>, f) = async.Bind(x, f)
    [<JavaScript>]
    member this.Combine(a, b) = async.Combine(a, b)
    [<JavaScript>]
    member this.Delay f = async.Delay f
    [<JavaScript>]
    member this.For(seq, f) =
        List.foldBack (fun x cont () ->
            async.Bind(f x, cont))
                (List.ofSeq seq)
                async.Zero
                ()
    [<JavaScript>]
    member this.Return f = async.Return f
    [<JavaScript>]
    member this.ReturnFrom f = async.ReturnFrom f
    [<JavaScript>]
    member this.TryFinally(f, w) = async.TryFinally(f, w)
    [<JavaScript>]
    member this.TryWith(f, w) = async.TryWith(f, w)
    [<JavaScript>]
    member this.Using(x : System.IDisposable, f) =
        async {
            let! result = f x
            x.Dispose()
            return result
        }
    [<JavaScript>]
    member this.While(p, f) =
        let rec build () =
            async {
                if p() then
                    do! f
                    do! build()
            }
        build()
    [<JavaScript>]
    member this.Zero () = async.Zero ()

#if DEBUG
module Client =
    [<JavaScript>]
    let converseOnce input token =
        BTcomm token {
            let! success = Write (Bluetooth.Data.String input)
            if not success then
                return None
            else
                let! dataOpt = Read
                match dataOpt with
                | Some (Bluetooth.Data.String result) ->
                    return Some result
                | _ ->  
                    return None
        }

    [<JavaScript>]
    let converseManyTwice inputs token =
        BTcomm token {
            for input in inputs do
                do! converseOnce input token
                    |> Async.Ignore
            for input in inputs do
                do! converseOnce input token
                    |> Async.Ignore
        }
        
    [<JavaScript>]
    let withDevice device action =
        async {
            let! tokenOpt = Bluetooth.ConnectToDevice device None
            match tokenOpt with
            | Some token ->
                do! action token
                do! Bluetooth.CloseConnection token
            | _ ->
                Mobile.Alert "Could not connect to the device."
        }

    [<JavaScript>]
    let findBobsPhoneAndConverseManyTwice() =
        async {
            let! hasBluetooth = Bluetooth.Activate()
            if not hasBluetooth then
                Mobile.Alert "This device does not support Bluetooth."
            else
                let! pairedDevices = Bluetooth.GetPairedDevices()
                let isBobsPhone { Bluetooth.Device.Name = name } = name = "Bob's Phone"
                let inputs = ["Ramon"; "Maciej"; "Bob"]
                match pairedDevices |> List.tryFind isBobsPhone with
                | Some device ->
                    do! withDevice device (converseManyTwice inputs)
                | None ->
                    do! Bluetooth.StartDeviceDiscovery (fun device ->
                        async {
                            if isBobsPhone device then
                                do! Bluetooth.StopDeviceDiscovery()
                                do! withDevice device (converseManyTwice inputs)
                        }
                        |> Async.Start)
        }
        |> Async.Start

module Server =
    [<JavaScript>]
    let converseOnce token =
        BTcomm token {
            let! dataOpt = Read
            match dataOpt with
            | Some (Bluetooth.Data.String input) ->
                let! _ = Write (Bluetooth.Data.String ("Hello, " + input + "!"))
                if input = "John" then
                    // the order of these two lines is irrelevant
                    do! Bluetooth.StopServer()
                    do! Bluetooth.CloseConnection token
            | _ -> ()
        }

    [<JavaScript>]
    let converseMany (token : Bluetooth.Token) =
        BTcomm token {
            // will automatically stop if connection was closed by client
            while token.IsConnected do
                do! converseOnce token
        }
        |> Async.Start

    [<JavaScript>]
    let bobsPhoneBluetoothConversationServer() =
        async {
            let! hasBluetooth = Bluetooth.Activate()
            if hasBluetooth then
                let! isDiscoverable = Bluetooth.MakeDiscoverable 0
                if isDiscoverable then
                    do! Bluetooth.StartServer converseMany
                        |> Async.Ignore
        }
#endif