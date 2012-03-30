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
        "IntelliFactory.WebSharper.Mobile.Android.Bluetooth.BluetoothCallbacksManager.callbacks().get_Item(" + string cbc + ")"

module Bluetooth =
    
    [<RequireQualifiedAccess>]
    type Data =
        | Int of int
        /// (2 byte) Unicode array
        | String of string
        | Array of Data list
        | RawData of int []
       
        [<JavaScript>]
        static member ToString data = 
            let rec ts = function
                | Data.Int d -> d.ToString()
                | Data.String d -> "\""+d+"\""
                | Data.RawData d -> "{" + d.ToString() + "}"
                | Data.Array d -> "["+ ((List.map (fun x -> ts x) d) |> String.concat " ; ") + "]"
            ts data

        [<JavaScript>]
        /// It uses 2 bytes for chars, we assume it fits a unicode character
        /// It uses 4 bytes for an integer
        /// It treats rawData ints as they were bytes (will count the last byte of it)
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
                        |> Array.map (int >> intToByteArray >> Seq.skip 3)
                        |> Seq.concat
                |]
        
        [<JavaScript>]
        static member Deserialize data =
            let rec trySkipTake n acc : int list -> (int list * int list) option = function
                | t when n = 0 -> Some (List.rev acc, t)
                | [] -> 
                    None
                | h::t -> trySkipTake (n - 1) (h::acc) t 

            let rec partialDeserialization = function          
                /// integer          
                | 0::b3::b2::b1::b0::leftovers ->                                     
                    (Int (b3 * (pown 256 3) + b2 * (pown 256 2) + b1 * (pown 256 1) + b0),
                        leftovers)
                    |> Some
                /// string
                | 1::lh::ll::data ->                                             
                    let length = lh * 256 + ll                                                            
                    // trySkipTake (2 * length) [] data // length refers to the length of the 2-byte representation array
                    trySkipTake (length) [] data
                    |> Option.map (fun (stringBytes, leftovers) ->
                    let stringChars =
                        String.init (length/2) (fun i ->
                            stringBytes.[i * 2] * 256 + stringBytes.[i * 2 + 1]
                            |> char |> string)
                    Data.String stringChars, leftovers)
                /// data list array
                | 2::lh::ll::data ->    
                    let length = lh * 256 + ll
                    let rec op n acc data =
                        if n = 0 then Some (Array (List.rev acc), data)
                        else
                            partialDeserialization data
                            |> Option.bind (fun (d, data) ->
                                op (n - 1) (d::acc) data)
                    op length [] data
                /// raw data (2 bytes int[])
                | 3::lh::ll::data ->                    
                    let length = lh * 256 + ll
                     // trySkipTake (2 * length) [] data // length refers to the length of the 2-byte representation array
                    trySkipTake (length) [] data
                    |> Option.map (fun (bytes, leftovers) ->
                        RawData (Array.ofList bytes), leftovers)
                | _ -> 
                    None
            
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
            MacAddress : string
            Name : string
        }

    [<Inline "websharperBridge.initBlueTooth($uuid)">]
    /// Must be called in order to set UUID which is a strong requirement of establishing a BlueTooth connection.
    /// UUID must be unique, and specific to your Application, but both the server and the client must use the same.
    /// "Using the same UUID is simply a matter of hard-coding the UUID string into your application and then referencing it from both the server and client code."
    /// (...) "you can use one of the many random UUID generators on the web"
    /// source: http://developer.android.com/guide/topics/wireless/bluetooth.html    
    let initBlueTooth (uuid : string) = X    

    [<JavaScript>]
    let private asyncForF f =
        Async.FromContinuations (fun (success, _, _) ->
            let cb = BluetoothCallbacksManager.registerFunction success
            f cb)
    
    [<Inline "websharperBridge.activateBluetooth($f)">]
    let private activate (f : string) = ()    
    /// This will check if Bluetooth is turned on. If yes, it does nothing.
    /// If no, asks the user whether turn it on or not.
    /// It returns "true" if BT was already switched on, or just have been switched on
    /// It returns "flase" if device not supports BT or user has choosen not to turn it on   
    [<JavaScript>]
    let Activate () : Async<bool> = asyncForF activate

    [<Inline "websharperBridge.getPairedDevices($f)">]
    let private getPairedDevices (f : string) = ()
    /// This will return the already paired devices as an array (MAC Adress as UniqueId, Name as name).
    /// When a device is paired, the basic information about that device (such as the device name, class, and MAC address) is saved
    /// To be paired means that two devices are aware of each other's existence, have a shared link-key that can be used for authentication,
    /// and are capable of establishing an encrypted connection with each other.
    /// (So, it doesnt mean the device is connected, or even in range!)
    [<JavaScript>]
    let GetPairedDevices () : Async<Device array> = asyncForF getPairedDevices
    
    [<Inline "websharperBridge.startDeviceDiscovery($f, $action)">]
    let private startDeviceDiscovery (action : string) (f : string) = ()
    /// This process is asynhronous, will immediately return with a boolean indicating whether
    /// discovery has successfully started. The discovery process usually involves an inquiry scan of about 12 seconds,
    /// followed by a page scan of each found device to retrieve its Bluetooth name.
    /// You must define an action (callback), i.e. what to do when a device is discovered.
    [<JavaScript>]
    let StartDeviceDiscovery (action : Device -> unit) : Async<bool> =
        let action = BluetoothCallbacksManager.registerFunction action
        asyncForF (startDeviceDiscovery action)

    [<Inline "websharperBridge.stopDeviceDiscovery($f)">]
    let private stopDeviceDiscovery (f : string) = ()
    /// Manually stop device discovery
    [<JavaScript>]
    let StopDeviceDiscovery () : Async<unit> = asyncForF stopDeviceDiscovery
            
    [<Inline "websharperBridge.connectToDevice($f, $macAddress, false)">]    
    let private connectToDevice (macAddress : string) (f : string) = ()    
    /// Connect to a Device as client. To be connected means that the devices currently share an RFCOMM channel and are able to transmit
    /// data with each other. If the two devices have not been previously paired, then the Android framework will automatically show a pairing request
    /// notification or dialog to the user during the connection procedure    
    [<JavaScript>]
    let ConnectToDevice (d: Device) : Async<Token option> =        
        asyncForF (connectToDevice d.MacAddress)

    [<Inline "websharperBridge.connectToDevice($f, $macAddress, true)">]
    let private rawConnectToDevice (macAddress : string) (f : string) = ()
    /// Connect to a Device as client. (more about UUID: http://developer.android.com/guide/topics/wireless/bluetooth.html search for UUID)
    /// To be connected means that the devices currently share an RFCOMM channel and are able to transmit data with each other.
    /// If the two devices have not been previously paired, then the Android framework will automatically show a pairing request
    /// notification or dialog to the user during the connection procedure
    [<JavaScript>]
    let RawConnectToDevice (d: Device) : Async<RawToken option> =
        asyncForF (rawConnectToDevice d.MacAddress)

    [<Inline "websharperBridge.makeDiscoverable($f, $d)">]
    let private makeDiscoverable (d : int) (f : string) = ()
    /// By default, phones are not discoverable. This function sets up a dialog to the user,
    /// to be able to allow the phone to be discoverable by default 120 sec or any other duration up to 3600 sec.
    [<JavaScript>]
    let MakeDiscoverable duration : Async<bool> = asyncForF (makeDiscoverable duration)
    
    [<Inline "websharperBridge.startServer($f, $action, false)">] 
    let private startServer (action : string) (f : string) = ()
    /// Start Bluetooth server, and execute action    
    [<JavaScript>]
    let StartServer (action : Token -> unit) : Async<bool> =
        let actionString = BluetoothCallbacksManager.registerFunction (action)
        asyncForF (startServer actionString)

    [<Inline "websharperBridge.startServer($f, $action, true)">]
    let private rawStartServer (action : string) (f : string) = ()
    /// Start Bluetooth server, and execute action    
    [<JavaScript>]
    let RawStartServer (action : RawToken -> unit) : Async<bool> =
        let actionString = BluetoothCallbacksManager.registerFunction (action)
        asyncForF (rawStartServer actionString)

    [<Inline "websharperBridge.stopServer($f)">]
    /// Stop Bluetooth server, and execute action  
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

    [<Inline "websharperBridge.exitApplication()">]
    let exitApplication() = X
    

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

[<JavaScript>]
let uuid = "a1ce0569-c68f-4f6a-b0a0-f60747c6faaa"

module Client =         
    [<JavaScript>]
    let converseOnce input token =
        Mobile.Log("bt_test: (client) input: " + input)
        BTcomm token {
            let! success = Write (Bluetooth.Data.String input)
            if not success then
                Mobile.Log("bt_test (client) input: write failure")
                return None
            else
                let! dataOpt = Read
                match dataOpt with
                | Some (Bluetooth.Data.String result) ->
                    Mobile.Log("bt_test: (client) result: " + result)
                    return Some result                
                | _ ->  
                    Mobile.Log("bt_test: (client) result: None")
                    return None
        }

    [<JavaScript>]
    let converseManyTwice inputs (token : Bluetooth.Token)=
        BTcomm token {     
            let s = ""       
            for input in inputs do
                do! converseOnce input token
                    |> Async.Ignore
            for input in inputs do
                do! converseOnce input token
                    |> Async.Ignore
        }
        
    [<JavaScript>]
    let withDevice (device : Bluetooth.Device) action =
        async {
            // Mobile.Alert ("Connecting to " + device.Name)
            let! tokenOpt = Bluetooth.ConnectToDevice device
            match tokenOpt with
            | Some token ->
                do! action token
                do! Bluetooth.CloseConnection token
            | _ ->
                Mobile.Alert "Could not connect to the device."
        }

    [<JavaScript>]
    let findPhoneAndConverseManyTwice (phoneName) =
        Bluetooth.initBlueTooth uuid
        async {
            let! hasBluetooth = Bluetooth.Activate()
            if not hasBluetooth then
                Mobile.Alert "This device does not support Bluetooth."
            else
                let! pairedDevices = Bluetooth.GetPairedDevices()
                let isBobsPhone { Bluetooth.Device.Name = name } = name = phoneName
                let inputs = ["Ramon"; "Maciej"; "Bob"]
                let input = Bluetooth.Data.RawData [|1;2;3;4;5|];
                match pairedDevices |> Array.tryFind isBobsPhone with
                | Some device ->
                    do! withDevice device (converseManyTwice inputs)
                | None ->
                    let! started = Bluetooth.StartDeviceDiscovery (fun device ->
                        async {
                            if isBobsPhone device then
                                do! Bluetooth.StopDeviceDiscovery()
                                do! withDevice device (converseManyTwice inputs)
                        }
                        |> Async.Start)
                    if not started then
                        Mobile.Alert ("Something happened during starting device discovery")
        }
        |> Async.Start


    [<JavaScript>]
    let writeReadLogResult input token =          
        Mobile.Log("bt_test: (client) input: " + Bluetooth.Data.ToString input )                            
        BTcomm token {
            let! success = Write input
            if not success then
                Mobile.Log("bt_test (client) write failure")                
            else
                let! dataOpt = Read
                match dataOpt with
                | Some d -> 
                    Mobile.Log("bt_test: (client) result: " + Bluetooth.Data.ToString d)
                | _ ->  
                    Mobile.Log("bt_test: (client) result: None")                    
        }

    [<JavaScript>]
    let getPairedPhoneAndWriteRead (phoneName) =
        Mobile.Log "good morning"
        Bluetooth.initBlueTooth uuid
        Mobile.Log "sansine"
        async {
            let! hasBluetooth = Bluetooth.Activate()
            if not hasBluetooth then
                Mobile.Alert "bt_test: (client) This device does not support Bluetooth."
            else
                let! pairedDevices = Bluetooth.GetPairedDevices()
                let isBobsPhone { Bluetooth.Device.Name = name } = name = phoneName
                let s = Bluetooth.Data.String "StringMessage"
                let i = Bluetooth.Data.Int 24
                let ss = Bluetooth.Data.String "stringMessage2"
                let a = Bluetooth.Data.Array [s;i;ss]
                let r = Bluetooth.Data.RawData [|1;2;3;4;5|]
                let sss = Bluetooth.Data.String "last test"
                let input = Bluetooth.Data.Array [a;r;sss]
                match pairedDevices |> Array.tryFind isBobsPhone with
                | Some device ->
                    do! withDevice device (writeReadLogResult input)
                | None ->
                    Mobile.Alert "bt_test: (client) The device we looking for was is paired."
        }            
        |> Async.Start

module Server =

    [<JavaScript>]
    let converseOnce token =
        BTcomm token {
            let! dataOpt = Read
            match dataOpt with
            | Some (Bluetooth.Data.String input) ->
                Mobile.Log("bt_test (server): String recieved: " + input)
                let! _ = Write (Bluetooth.Data.String ("Hello, " + input + "!"))
                if input = "John" then
                    // the order of these two lines is irrelevant
                    do! Bluetooth.StopServer()
                    do! Bluetooth.CloseConnection token
            | Some d ->
                Mobile.Log("bt_test (server): data recieved: " + Bluetooth.Data.ToString d)
                let! _ = Write (Bluetooth.Data.String ("Thx for the data."))
                ()
            | _ -> 
                Mobile.Log("bt_test (server): converseOnce: no recognizable message recieved")
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
    let startBluetoothConversationServer() =
        Bluetooth.initBlueTooth uuid
        async {
            let! hasBluetooth = Bluetooth.Activate()
            if hasBluetooth then
                let! isDiscoverable = Bluetooth.MakeDiscoverable 0
                if isDiscoverable then                    
                    do! Bluetooth.StartServer converseMany
                        |> Async.Ignore
        }
#endif