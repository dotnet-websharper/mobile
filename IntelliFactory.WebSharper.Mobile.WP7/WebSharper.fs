namespace IntelliFactory.WebSharper.Mobile.WP7

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json

type private WP7NotifyResource() =
    inherit Resources.BaseResource("windows.phone.7.notify.js")

[<RequireQualifiedAccess>]
[<Require(typeof<WP7NotifyResource>)>]
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

    [<JavaScript>]
    let mutable private result : obj = box ""

    [<Inline "callNotify('alert.' + $s)">]
    /// Displays a message to the client, waiting for confirmation to continue.
    let Alert (s : string) = ()

    [<Inline "callNotify('log.' + $s)">]
    /// Logs a message to the debug console.
    let Log (s : string) = ()

    [<Inline "callNotify('location.')">]
    let private bLocation () = ()

    [<JavaScript>]
    /// Returns the current location of the device.
    let GetLocation () : Location =
        bLocation()
        unbox result

    [<Inline "callNotify('acceleration.')">]
    let private bAcceleration () = ()

    [<JavaScript>] //! it seems that the scale is 1 = 9.81<m/s^2>
    /// Returns the current acceleration of the device.
    let GetAcceleration () : Acceleration =
        bAcceleration()
        unbox result

    [<Inline "callNotify('localStorage.load.' + $k)">]
    let private storageLoad k = ()

    type Storage =
        [<JavaScript>]
        /// Loads from the local storage dictionary.
        static member Load k : string =
            storageLoad k
            unbox result

        [<Inline "callNotify('localStorage.store.' + $k + '.' + $v)">]
        /// Saves to the local storage dictionary.
        static member Store (k : string) (v : string) = ()

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
        /// Returns the current location of the device.
        let GetLocation () : Mobile.Location =
            { Lat = 0.; Long = 0. }

        [<JavaScript>]
        /// Returns the current acceleration of the device.
        let GetAcceleration () : Mobile.Acceleration =
            { X = 0.; Y = 0.; Z = -9.8 }

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