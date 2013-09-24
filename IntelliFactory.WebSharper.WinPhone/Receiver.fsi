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


/// Provides a simple asynchronous message receiver facility to
/// communicate with the Windows Phone backend.
module internal IntelliFactory.WebSharper.WinPhone.Receiver

/// Gets a named event triggered by the backend.
val GetEvent<'T> : name: string -> recognize: (string -> 'T) -> IEvent<'T>

/// Constructs a new Async<'T> that waits for a message from the backend.
val MakeAsync<'T> : start: (int -> unit) -> recognize: (obj -> 'T) -> Async<'T>
