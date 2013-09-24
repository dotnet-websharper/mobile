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

/// Implements facilities for Windows Phone applications.
namespace IntelliFactory.WebSharper.WinPhone

open IntelliFactory.WebSharper.Mobile

/// Represents a Windows Phone context: API available for applications running
/// on Windows Phone devices.
[<Sealed>]
type Context =
    interface IAccelerometer
    interface ICamera
    interface ILog

    /// Retrieves the geolocator service, if available.
    member GetGeolocator : unit -> Async<option<IGeolocator>>

    /// Uses the device camera, if available.
    member TakePicture : unit -> Async<Jpeg>

    /// Traces a message to the system log.
    member Trace : priority: Priority * category: string * message: string -> unit

    /// Allows subscribing to acceleration updates.
    member AccelerationChange : IEvent<Acceleration>

    /// Gets or sets the state of acceleration subscription.
    member IsMeasuringAcceleration : bool with get, set

    /// Attempts to get the Context object.
    /// Returns None in non-Windows-Phone environments.
    static member Get : unit -> option<Context>
