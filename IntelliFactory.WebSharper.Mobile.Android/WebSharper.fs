namespace IntelliFactory.WebSharper.Mobile.Android

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.Json

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
    let Alert (s : string) = ()

    [<Inline "websharperBridge.location()">]
    let private bLocation () = ""

    [<JavaScript>]
    let GetLocation : unit -> Location = bLocation >> eval

    [<Inline "websharperBridge.log($s)">]
    let Log (s : string) = ()

    [<Inline "websharperBridge.acceleration()">]
    let private bAcceleration () = ""

    [<JavaScript>]
    let GetAcceleration : unit -> Acceleration = bAcceleration >> eval

    type IStorage [<JavaScript>] internal () =
        //[<JavaScript>]
        member __.Item
            with [<JavaScript>] get (v) = Window.Self.LocalStorage.GetItem v
            and [<JavaScript>] set k v = Window.Self.LocalStorage.SetItem (k, v)

    [<JavaScript>]
    let Storage = IStorage()

    type IGenericStorage [<JavaScript>] internal () =
        //[<JavaScript>]
        member __.Item
            with [<JavaScript>] get (v) = Window.Self.LocalStorage.GetItem v |> Json.Parse |> unbox
            and [<JavaScript>] set k v = Window.Self.LocalStorage.SetItem (k, Json.Stringify v)

    [<JavaScript>]
    let GenericStorage = IGenericStorage()