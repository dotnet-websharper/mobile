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

type IMobileProvider =

    /// Displays an alert.
    abstract member Alert : string -> unit

    /// Logs a message.
    abstract member Log : string -> unit

    /// Returns the current location of the device.
    abstract member GetLocation : unit -> Location

    /// Returns the current acceleration of the device.
    abstract member GetAcceleration : unit -> Acceleration

    /// <summary>Returns a photo from the camera.</summary>
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
    let bAlert (s : string) : unit = X

    [<Inline "console.log($s)">]
    let bLog (s : string) : unit = X

    interface IMobileProvider with

        [<JavaScript>]
        override this.Alert s = bAlert s

        [<JavaScript>]
        override this.Log s = bLog s

        [<JavaScript>]
        override this.GetLocation() : Location =
            { Lat = 0.; Long = 0. }

        [<JavaScript>]
        override this.GetAcceleration() : Acceleration =
            { X = 0.; Y = 0.; Z = -9.81 }

        [<JavaScript>]
        override this.GetPhotoFromCamera() =
            async { return "" }

        [<JavaScript>]
        override this.StorageLoad k =
            try
                Window.Self.LocalStorage.GetItem k
                |> function
                    | x when x = null -> ""
                    | x -> x
            with _ -> ""

        [<JavaScript>]
        override this.StorageStore k v =
            Window.Self.LocalStorage.SetItem (k, v)

        [<JavaScript>]
        override this.JsonStorageLoad k =
            let x =
                match (this :> IMobileProvider).StorageLoad k with
                | "" -> "[]"
                | x -> x
            unbox (Json.Parse x)

        [<JavaScript>]
        override this.JsonStorageStore k v =
            (this :> IMobileProvider).StorageStore k (Json.Stringify v)

[<JavaScript>]
let mutable Mobile : IMobileProvider =
    DefaultMobileProvider() :> _
