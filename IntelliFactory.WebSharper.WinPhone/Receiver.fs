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

module IntelliFactory.WebSharper.WinPhone.Receiver

open System.Collections.Generic
open System.Runtime.CompilerServices
open IntelliFactory.WebSharper

[<Inline "JSON.parse($json)">]
[<MethodImpl(MethodImplOptions.NoInlining)>]
let jsonParse (json: string) : obj = null

[<JavaScript>]
let handlers =
    let handlers = Dictionary<int,obj->unit>()
    JavaScript.Global?OnWinPhoneMessage <- fun json ->
        let msg = jsonParse json
        handlers.[msg?UniqueId] msg
    handlers

[<JavaScript>]
let uid = ref 0

[<JavaScript>]
[<MethodImpl(MethodImplOptions.NoInlining)>]
let fresh () =
    incr uid
    !uid

[<JavaScript>]
let events = Dictionary<string,IEvent<obj>>()

[<JavaScript>]
let GetEvent<'T> (name: string) (recognize: string -> 'T) =
    if events.ContainsKey(name) then
        As<IEvent<'T>> events.[name]
    else
        let e = new Event<'T>()
        (?<-) JavaScript.Global name (fun msg -> e.Trigger (recognize msg))
        let ev = e.Publish
        events.[name] <- As<IEvent<obj>> ev
        ev

[<JavaScript>]
let MakeAsync<'T> (start: int -> unit) (recognize: obj -> 'T) =
    Async.FromContinuations(fun (ok, error, _) ->
        let uid = fresh ()
        handlers.[uid] <- fun msg ->
            handlers.Remove(uid)
            |> ignore
            let e = msg?Error
            if As e
            then error (exn e)
            else ok (recognize msg)
        start uid)
