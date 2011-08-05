module IntelliFactory.WebSharper.Mobile.Android

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json
open IntelliFactory.WebSharper.Mobile

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
        "IntelliFactory.WebSharper.Mobile.Android.Mobile.callbacks.get_Item(" + cbc.ToString() + ")",
            "IntelliFactory.WebSharper.Mobile.Android.Mobile.failureCallbacks.get_Item(" + cbc.ToString() + ")"

    (*[<Inline "websharperBridge.ajax($url, $headers, $content, $callback, $fail)">]
    let private ajax (url : string) (headers : string) (content : string) (callback : string) (fail : string) = ()

    type private AjaxProvider =
    | AjaxProvider

        interface Remoting.Config.IAjaxProvider with
            [<JavaScript>]
            member this.Async url headers data cb fail =
                let escape =
                    String.map (function
                                | '.' -> '@'
                                | ',' -> '#'
                                | c -> c)
                let headers =
                    headers
                    |> List.map (fun (k, v) -> escape k + ";" + escape v)
                    |> List.reduce (fun a b -> a + "," + b)
                let ok, no = setCallbacks cb fail
                ajax url headers data ok no

            [<JavaScript>]
            member this.Call url headers data = raise (System.NotSupportedException "Support for synchronous RPC calls was dropped.")

    [<JavaScript>]
    let private updateAjaxProvider() =
        Remoting.Config.AjaxProvider <- AjaxProvider :> Remoting.Config.IAjaxProvider*)

[<Require(typeof<AndroidServerLocationResource>)>]
type private AndroidMobileProvider [<JavaScript>] () =
    
    [<Inline "websharperBridge.alert($s)">]
    let bAlert (s : string) = ()

    [<Inline "websharperBridge.log($s)">]
    let bLog (s : string) = ()

    [<Inline "eval('' + $s)">]
    let eval (s : string) = unbox null
    
    [<Inline "websharperBridge.location()">]
    let bLocation () = ""

    [<Inline "websharperBridge.acceleration()">]
    let bAcceleration () = ""

    [<Inline "websharperBridge.camera($width, $height, $success, $fail)">]
    let bPhotoFromCamera (width : int) (height : int) (success : string) (fail : string) = ()

    [<JavaScript>]
    let photoFromCamera (width, height) (success, fail, _) =
        let success, fail = Ajax.setCallbacks (success << fun s -> "" + s) fail
        bPhotoFromCamera width height success fail

    interface MobileProvider with

        [<JavaScript>]
        override __.Alert s = bAlert s

        [<JavaScript>]
        override __.Log s = bLog s

        [<JavaScript>]
        override __.GetLocation () = bLocation() |> eval

        [<JavaScript>]
        override __.GetAcceleration () = bAcceleration() |> eval
        
        [<JavaScript>]
        override __.GetPhotoFromCamera (width, height) =
            Async.FromContinuations (photoFromCamera (width, height))

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

module private ProviderHolder =
    [<JavaScript>]
    let provider = AndroidMobileProvider()

[<Inline "android_init()">]
let private androidInit () = ()

[<JavaScript>]
let EnableAndroidSupport () =
    ignore Mobile
    ignore IntelliFactory.WebSharper.Remoting.Config.EndPoint
    androidInit()