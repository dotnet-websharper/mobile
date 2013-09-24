// WebSharper.Mobile - support for building mobile WebSharper apps
// Copyright (c) 2013 IntelliFactory
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

namespace IntelliFactory.WebSharper.WinPhone

open System
open System.Collections.Generic
open System.Runtime.CompilerServices
open System.Web
open System.Web.UI
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Mobile

[<Sealed>]
type RuntimeResource() =
    inherit Core.Resources.BaseResource("Runtime.js")

[<assembly: Require(typeof<RuntimeResource>)>]
[<assembly: WebResource("Runtime.js", "text/javascript")>]
do ()

module Bridge =

    [<MethodImpl(MethodImplOptions.NoInlining)>]
    [<Inline "notifySilverlight($msg)">]
    let private notifySilverlight (msg: obj) = X<unit>

    [<JavaScript>]
    [<MethodImpl(MethodImplOptions.NoInlining)>]
    let private ping (name: string) =
        let m = obj ()
        m?MessageType <- name
        m

    [<JavaScript>]
    [<MethodImpl(MethodImplOptions.NoInlining)>]
    let private message (name: string) (uid: int) =
        let m = ping name
        m?UniqueId <- uid
        m

    [<JavaScript>]
    let StartAccelerometer () =
        ping "StartAccelerometer"
        |> notifySilverlight

    [<JavaScript>]
    let StopAccelerometer () =
        ping "StopAccelerometer"
        |> notifySilverlight

    [<JavaScript>]
    let HasGeolocator () =
        Receiver.MakeAsync (fun uid ->
            message "HasGeolocator" uid
            |> notifySilverlight)
            (fun resp -> resp?Ok : bool)

    [<JavaScript>]
    let GetLocation () =
        async {
            let! loc =
                Receiver.MakeAsync (fun uid ->
                    message "GetLocation" uid
                    |> notifySilverlight)
                    (fun resp ->
                        if resp?IsKnown then
                            Some {
                                Latitude = resp?Latitude
                                Longitude = resp?Longitude
                            }
                        else
                            None)
            match loc with
            | Some x ->
                return x
            | None ->
                return raise (exn "Failed to get the geo location")
        }

    [<JavaScript>]
    let TakePicture () : Async<Jpeg> =
        Receiver.MakeAsync (fun uid ->
            message "TakePicture" uid
            |> notifySilverlight)
            (fun resp -> resp?Jpeg)

    [<Inline "JSON.parse($json)">]
    [<MethodImpl(MethodImplOptions.NoInlining)>]
    let private jsonParse (json: string) : obj = null

    [<JavaScript>]
    let OnWinPhoneAccelerationChange =
        Receiver.GetEvent "OnWinPhoneAccelerationChange" <| fun json ->
        let msg = jsonParse(json)
        {
            X = msg?X
            Y = msg?Y
            Z = msg?Z
        }

    [<Direct "hasSilverlight()">]
    [<MethodImpl(MethodImplOptions.NoInlining)>]
    let HasSilverlight () = false

    [<JavaScript>]
    let Trace (priority: Priority) (category: string) (message: string) =
        let msg = ping "Trace"
        msg?Priority <-
            match priority with
            | Debug -> "Debug"
            | Info -> "Info"
            | Warn -> "Warn"
            | Error -> "Error"
        msg?Category <- category
        msg?Text <- message
        msg
        |> notifySilverlight

    [<Sealed>]
    type Geolocator [<JavaScript>] () =
        interface IGeolocator with
            [<JavaScript>]
            member this.GetLocation() = GetLocation()

    [<JavaScript>]
    let Locator = Geolocator()

[<Sealed>]
type Context [<JavaScript>] () =
    let mutable accelerometer = false

    [<JavaScript>]
    member this.GetGeolocator() =
        async {
            let! ok = Bridge.HasGeolocator()
            if ok then
                return Some (Bridge.Locator :> IGeolocator)
            else
                return None
        }

    [<JavaScript>]
    member this.TakePicture() =
        Bridge.TakePicture()

    interface ICamera with
        member this.TakePicture() = this.TakePicture()

    [<JavaScript>]
    member this.Trace(priority, category, message) =
        Bridge.Trace priority category message

    interface ILog with
        member this.Trace(p, c, m) = this.Trace(p, c, m)

    [<JavaScript>]
    member this.AccelerationChange =
        Bridge.OnWinPhoneAccelerationChange

    member this.IsMeasuringAcceleration
        with [<JavaScript>] get () = accelerometer
        and set x =
            accelerometer <- x
            if x
            then Bridge.StartAccelerometer()
            else Bridge.StopAccelerometer()

    interface IAccelerometer with
        member this.AccelerationChange = this.AccelerationChange
        member this.IsMeasuringAcceleration
            with get () = this.IsMeasuringAcceleration
            and set x = this.IsMeasuringAcceleration <- x

    [<JavaScript>]
    static member Get() =
        if Bridge.HasSilverlight()
        then Some (Context())
        else None
