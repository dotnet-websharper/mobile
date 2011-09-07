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

module IntelliFactory.WebSharper.Mobile.Android

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json
open IntelliFactory.WebSharper.Mobile

[<assembly: System.Web.UI.WebResource("android.websharperBridge.serverLocation.js", "text/javascript", PerformSubstitution = true)>]
do ()
type private AndroidServerLocationResource() =
    inherit Resources.BaseResource("android.websharperBridge.serverLocation.js")

[<Require(typeof<AndroidServerLocationResource>)>]
module private Ajax =

    [<JavaScript>]
    let private callbacks = new System.Collections.Generic.Dictionary<int,obj>()

    [<JavaScript>]
    let private failureCallbacks = new System.Collections.Generic.Dictionary<int,obj>()

    [<JavaScript>]
    let mutable private callbackCounter = 0

    [<JavaScript>]
    let setCallbacks success failure =
        let cbc = callbackCounter
        callbackCounter <- callbackCounter + 1
        callbacks.[cbc] <- success
        failureCallbacks.[cbc] <- failure
        "IntelliFactory.WebSharper.Mobile.Android.Ajax.callbacks.get_Item(" + cbc.ToString() + ")",
            "IntelliFactory.WebSharper.Mobile.Android.Ajax.failureCallbacks.get_Item(" + cbc.ToString() + ")"

[<Require(typeof<AndroidServerLocationResource>)>]
type private AndroidMobileProvider [<JavaScript>] () =
    
    [<Inline "websharperBridge.alert($s)">]
    let bAlert (s : string) : unit = X

    [<Inline "websharperBridge.log($s)">]
    let bLog (s : string) : unit = X

    [<Inline "eval('' + $s)">]
    let eval (s : string) = X
    
    [<Inline "websharperBridge.location()">]
    let bLocation () : string = X

    [<Inline "websharperBridge.acceleration()">]
    let bAcceleration () : string = X

    [<Inline "websharperBridge.camera($width, $height, $success, $fail)">]
    let bPhotoFromCamera (width : int) (height : int) (success : string) (fail : string) : unit = X

    [<JavaScript>]
    let photoFromCamera (width, height) (success, fail, _) =
        let success, fail = Ajax.setCallbacks (success << fun s -> "" + s) fail
        bPhotoFromCamera width height success fail

    interface IMobileProvider with

        [<JavaScript>]
        override this.Alert s = bAlert s

        [<JavaScript>]
        override this.Log s = bLog s

        [<JavaScript>]
        override this.GetLocation () = bLocation() |> eval

        [<JavaScript>]
        override this.GetAcceleration () = bAcceleration() |> eval
        
        [<JavaScript>]
        override this.GetPhotoFromCamera () = //(width, height)
            Async.FromContinuations (photoFromCamera (0, 0))

        [<JavaScript>]
        override this.StorageLoad k =
            try
                Window.Self.LocalStorage.GetItem k
                |> function
                    | x when x = null -> ""
                    | x -> x
            with _ -> ""

        [<JavaScript>]
        override this.StorageStore k v = Window.Self.LocalStorage.SetItem (k, v)

        [<JavaScript>]
        override this.JsonStorageLoad k =
            (this :> IMobileProvider).StorageLoad k
            |> function
                | "" -> "[]"
                | x -> x
            |> Json.Parse
            |> unbox

        [<JavaScript>]
        override this.JsonStorageStore k v = (this :> IMobileProvider).StorageStore k (Json.Stringify v)

module private ProviderHolder =
    [<JavaScript>]
    let provider = AndroidMobileProvider()

[<Inline "android_init()">]
let private androidInit () : unit = X

[<JavaScript>]
let EnableAndroidSupport () =
    ignore Mobile
    ignore IntelliFactory.WebSharper.Remoting.Config.EndPoint
    androidInit()
