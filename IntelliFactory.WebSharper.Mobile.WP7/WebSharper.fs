module IntelliFactory.WebSharper.Mobile.WP7

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json
open IntelliFactory.WebSharper.Mobile

[<assembly: System.Web.UI.WebResource("windows.phone.7.notify.js", "text/javascript", PerformSubstitution = true)>]
do ()
type private WP7NotifyResource() =
    inherit Resources.BaseResource("windows.phone.7.notify.js")

[<Require(typeof<WP7NotifyResource>)>]
module private Ajax =

    [<Inline("$0.split($1)")>]
    let Split (str : string) (delim : char) : string[] = [||]
    
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
    let private ajax (url : string) (headers : string) (cookies : string) (content : string) (callback : string) (fail : string) = ()

    [<Inline "document.cookie">]
    let private cookieString() = ""

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
    let bAlert (s : string) = ()

    [<Inline "callNotify('log.' + $s)">]
    let bLog (s : string) = ()

    [<Inline "callNotify('location.')">]
    let bLocation () = ()

    [<Inline "callNotify('acceleration.')">]
    let bAcceleration () = ()

    [<Inline "callNotify('camera.' + $width + '.' + $height + '.' + $callback + '.' + $fail)">]
    let bPhotoFromCamera (width : string) (height : string) (callback : string) (fail : string) = ()

    [<JavaScript>]
    let photoFromCamera (width, height) (callback, fail, _) =
        let escape (s : string) = s.Replace('.', '@').Replace(',', '#')
        let callback, fail = Ajax.setCallbacks callback fail
        bPhotoFromCamera (string width) (string height) (escape callback) (escape fail)

    [<Inline "callNotify('localStorage.load.' + $k)">]
    let storageLoad k = ()

    [<Inline "callNotify('localStorage.store.' + $k + '.' + $v)">]
    let bStorageStore (k : string) (v : string) = ()

    interface IMobileProvider with

        [<JavaScript>]
        override __.Alert s = bAlert s

        [<JavaScript>]
        override __.Log s = bLog s

        [<JavaScript>]
        override __.GetLocation () : Location =
            bLocation()
            unbox result

        [<JavaScript>]
        override __.GetAcceleration () : Acceleration =
            bAcceleration()
            unbox result

        [<JavaScript>]
        override __.GetPhotoFromCamera () = //(width, height)
            Async.FromContinuations (photoFromCamera (0, 0))

        [<JavaScript>]
        override __.StorageLoad k : string =
            storageLoad k
            unbox result

        [<JavaScript>]
        override __.StorageStore k v = bStorageStore k v

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
let private wp7Init () = ()

[<JavaScript>]
let EnableWP7Support () =
    ignore Provider
    ignore IntelliFactory.WebSharper.Remoting.Config.EndPoint
    ignore IntelliFactory.WebSharper.Remoting.Config.AjaxProvider
    wp7Init()
