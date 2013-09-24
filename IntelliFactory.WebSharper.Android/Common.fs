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

module IntelliFactory.WebSharper.Android.Common

open IntelliFactory.WebSharper

/// java.lang.String
type JString = JString

[<Inline "String($x)">]
let toString (x: JString) = X<string>

/// java.util.List<T>
[<AbstractClass>]
type JList<'T> =
    [<Stub>] abstract member get : int -> 'T
    [<Stub>] abstract member size : unit -> int

/// com.intellifactory.android.Task.Status<T>
[<AbstractClass>]
type JStatus<'T> =
    [<Stub>] abstract member getErrorMessage : unit -> JString
    [<Stub>] abstract member getValue : unit -> 'T
    [<Stub>] abstract member isDone : unit -> bool
    [<Stub>] abstract member isError : unit -> bool

[<JavaScript>]
let asyncThrow (e: exn) : Async<'T> =
    Async.FromContinuations(fun (_, fail, _) -> fail e)

[<JavaScript>]
let toArray (list: JList<'T>) : 'T [] =
    Array.init (list.size()) (fun i -> list.get(i))

[<JavaScript>]
let toAsync (start: unit -> JStatus<'T>) : Async<'T> =
    let rec loop (x: JStatus<'T>) =
        async {
            if x.isDone() then
                if x.isError() then
                    return! asyncThrow (exn (toString (x.getErrorMessage())))
                else
                    return x.getValue()
            else
                do! Async.Sleep(500)
                return! loop x
        }
    async {
        let status = start ()
        return! loop status
    }
