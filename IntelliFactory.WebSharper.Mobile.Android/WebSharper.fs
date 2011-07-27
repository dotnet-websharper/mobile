namespace IntelliFactory.WebSharper.Mobile.Android

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json

[<RequireQualifiedAccess>]
module Mobile =

    type Location =
        {
            Lat : float
            Long : float
        }
    
    type Acceleration =
        {
            X : float
            Y : float
            Z : float
        }

    [<Inline "eval('' + $s)">]
    let private eval (s : string) = unbox null

    [<Inline "websharperBridge.alert($s)">]
    /// Displays a message to the client, --without-- waiting for confirmation to continue.
    let Alert (s : string) = ()

    [<Inline "websharperBridge.log($s)">]
    /// Logs a message to the debug console.
    let Log (s : string) = ()

    [<Inline "websharperBridge.location()">]
    let private bLocation () = ""

    [<JavaScript>]
    /// Returns the current location of the device.
    let GetLocation : unit -> Location = bLocation >> eval

    [<Inline "websharperBridge.acceleration()">]
    let private bAcceleration () = ""

    [<JavaScript>] // scale not verified. Suspected to be 1=1<m/s^2>
    /// Returns the current acceleration of the device.
    let GetAcceleration : unit -> Acceleration = bAcceleration >> eval

    type Storage =
        [<JavaScript>]
        /// Loads from the local storage dictionary.
        static member Load k =
            try
                Window.Self.LocalStorage.GetItem k
                |> function
                    | x when x = null -> ""
                    | x -> x
            with _ -> ""

        [<JavaScript>]
        /// Saves to the local storage dictionary.
        static member Store k v = Window.Self.LocalStorage.SetItem (k, v)

    type JsonStorage =
        [<JavaScript>]
        /// Loads from the local storage dictionary.
        static member Load k =
            Storage.Load k
            |> function
                | "" -> "[]"
                | x -> x
            |> Json.Parse
            |> unbox

        [<JavaScript>]
        /// Saves to the local storage dictionary.
        static member Store k v = Storage.Store k (Json.Stringify v)

module Testing =

    [<RequireQualifiedAccess>]
    module Mobile =
        
        [<Inline "alert($s)">]
        /// Displays a message to the client, waiting for confirmation to continue.
        let Alert (s : string) = ()

        [<Inline "console.log($s)">]
        /// Logs a message to the debug console.
        let Log (s : string) = ()

        [<JavaScript>]
        /// Returns the current acceleration of the device.
        let GetLocation () : Mobile.Location =
            { Lat = 0.; Long = 0. }

        [<JavaScript>]
        /// Returns the current acceleration of the device.
        let GetAcceleration () : Mobile.Acceleration =
            { X = 0.; Y = 0.; Z = -9.8 }

        type Storage = Mobile.Storage
        type JsonStorage = Mobile.JsonStorage