module IntelliFactory.WebSharper.Mobile

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json

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

type Image = string

type MobileProvider =
    
    /// Displays an alert.
    abstract member Alert : string -> unit
    
    /// Logs a message.
    abstract member Log : string -> unit
    
    /// Returns the current location of the device.
    abstract member GetLocation : unit -> Location
    
    /// Returns the current acceleration of the device.
    abstract member GetAcceleration : unit -> Acceleration
    
    /// <summary>Returns a photo from the camera.</summary>
    // / <param name="maxWidth">The maximum width of the image.</param>
    // / <param name="maxHeight">The maximum height of the image.</param>
    //abstract member GetPhotoFromCamera : maxWidth : int * maxHeight : int -> Async<Image>
    abstract member GetPhotoFromCamera : unit -> Async<Image>
    
    /// Loads a value from local storage.
    abstract member StorageLoad : string -> string
    
    /// Stores a value to local storage.
    abstract member StorageStore : string -> string -> unit
    
    /// Loads a value from local storage.
    abstract member JsonStorageLoad<'a> : string -> 'a
    
    /// Stores a value to local storage.
    abstract member JsonStorageStore<'a> : string -> 'a -> unit

type private DefaultMobileProvider [<JavaScript>] () =

    [<Inline "alert($s)">]
    let bAlert (s : string) = ()

    [<Inline "console.log($s)">]
    let bLog (s : string) = ()

    interface MobileProvider with

        [<JavaScript>]
        override __.Alert s = bAlert s

        [<JavaScript>]
        override __.Log s = bLog s

        [<JavaScript>]
        override __.GetLocation () : Location =
            { Lat = 0.; Long = 0. }

        [<JavaScript>]
        override __.GetAcceleration () : Acceleration =
            { X = 0.; Y = 0.; Z = -9.81 }

        [<JavaScript>]
        override __.GetPhotoFromCamera () = async { return "" } //(_, _)

        [<JavaScript>]
        override __.StorageLoad k =
            try
                Window.Self.LocalStorage.GetItem k
                |> function
                    | x when x = null -> ""
                    | x -> x
            with _ -> ""

        [<JavaScript>]
        override __.StorageStore k v = Window.Self.LocalStorage.SetItem (k, v)

        [<JavaScript>]
        override this.JsonStorageLoad k =
            (this :> MobileProvider).StorageLoad k
            |> function
                | "" -> "[]"
                | x -> x
            |> Json.Parse
            |> unbox

        [<JavaScript>]
        override this.JsonStorageStore k v = (this :> MobileProvider).StorageStore k (Json.Stringify v)

[<JavaScript>]
let mutable Mobile : MobileProvider = DefaultMobileProvider() :> _
