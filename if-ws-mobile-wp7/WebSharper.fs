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

module IntelliFactory.WebSharper.Mobile.WP7

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json
open IntelliFactory.WebSharper.Mobile

[<assembly: System.Web.UI.WebResource("windows.phone.7.notify.min.js", "text/javascript", PerformSubstitution = true)>]
do ()
type private WP7NotifyResource() =
    inherit Resources.BaseResource("windows.phone.7.notify.min.js")

[<Require(typeof<WP7NotifyResource>)>]
module private Ajax =

    [<Inline("$0.split($1)")>]
    let Split (str : string) (delim : char) : string[] = X
    
    // AJAX area

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
        "IntelliFactory.WebSharper.Mobile.WP7.Ajax.callbacks.get_Item(" + cbc.ToString() + ")",
            "IntelliFactory.WebSharper.Mobile.WP7.Ajax.failureCallbacks.get_Item(" + cbc.ToString() + ")"

    [<Inline "callNotify('ajax.' + $url + '.' + $headers + '.' + $cookies + '.' + $content + '.' + $callback + '.' + $fail)">]
    let private ajax (url : string) (headers : string) (cookies : string) (content : string) (callback : string) (fail : string) = X

    [<Inline "document.cookie">]
    let private cookieString() = X

    [<JavaScript>]
    let cookies () =
        if cookieString() = "" then [||]
        else
            Split (cookieString()) ';'
            |> Array.map (fun s -> let parts = (Split s '=') in parts.[0], parts.[1])

    type private AjaxProvider =
        | AjaxProvider

        interface Remoting.Config.IAjaxProvider with
            [<JavaScript>]
            member this.Async url headers data cb fail =
                let escape (s : string) = s.Replace('.', '@').Replace(',', '#')
                let headers =
                    if headers = [] then ""
                    else
                        headers
                        |> List.map (fun (k, v) -> escape k + ";" + escape v)
                        |> List.reduce (fun a b -> a + "," + b)
                let cookies =
                    let cookies = cookies()
                    if cookies = [||] then ""
                    else
                        cookies
                        |> Array.map (fun (k, v) -> escape k + ";" + escape v)
                        |> Array.reduce (fun a b -> a + "," + b)
                let ok, no = setCallbacks cb fail
                let data =
                    if data.IndexOf '.' > -1 then escape data
                    else data
                ajax (escape url) headers cookies (escape data) (escape ok) (escape no)

            [<JavaScript>]
            member this.Call url headers data = raise (System.NotSupportedException "Support for synchronous RPC calls was dropped.")

    [<JavaScript>]
    let private updateAjaxProvider() =
        Remoting.Config.AjaxProvider <- AjaxProvider :> Remoting.Config.IAjaxProvider

[<JavaScript>]
let mutable private result : obj = box ""

[<Require(typeof<WP7NotifyResource>)>]
type private WP7MobileProvider [<JavaScript>] () =

    [<Inline "callNotify('alert.' + $s)">]
    let bAlert (s : string) : unit = X

    [<Inline "callNotify('log.' + $s)">]
    let bLog (s : string) : unit = X

    [<Inline "callNotify('location.')">]
    let bLocation () : unit = X

    [<Inline "callNotify('acceleration.')">]
    let bAcceleration () : unit = X

    [<Inline "callNotify('camera.' + $width + '.' + $height + '.' + $callback + '.' + $fail)">]
    let bPhotoFromCamera (width : string) (height : string) (callback : string) (fail : string) : unit = X

    [<JavaScript>]
    let photoFromCamera (width, height) (callback, fail, _) =
        let escape (s : string) = s.Replace('.', '@').Replace(',', '#')
        let callback, fail = Ajax.setCallbacks callback fail
        bPhotoFromCamera (string width) (string height) (escape callback) (escape fail)

    [<Inline "callNotify('localStorage.load.' + $k)">]
    let storageLoad (k : string) : unit = X

    [<Inline "callNotify('localStorage.store.' + $k + '.' + $v)">]
    let bStorageStore (k : string) (v : string) : unit = X

    interface IMobileProvider with

        [<JavaScript>]
        override this.Alert s = bAlert s

        [<JavaScript>]
        override this.Log s = bLog s

        [<JavaScript>]
        override this.GetLocation () : Location =
            bLocation()
            unbox result

        [<JavaScript>]
        override this.GetAcceleration () : Acceleration =
            bAcceleration()
            unbox result

        [<JavaScript>]
        override this.GetPhotoFromCamera () = //(width, height)
            Async.FromContinuations (photoFromCamera (0, 0))

        [<JavaScript>]
        override this.StorageLoad k =
            storageLoad k
            unbox result

        [<JavaScript>]
        override this.StorageStore k v = bStorageStore k v

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
    let provider = WP7MobileProvider()

[<Inline "wp7_init()">]
let private wp7Init () : unit = X

[<JavaScript>]
let EnableWP7Support () =
    ignore Mobile
    ignore IntelliFactory.WebSharper.Remoting.Config.EndPoint
    ignore IntelliFactory.WebSharper.Remoting.Config.AjaxProvider
    wp7Init()
