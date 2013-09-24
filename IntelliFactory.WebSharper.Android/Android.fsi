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

/// Implements facilities for Android apps.
namespace IntelliFactory.WebSharper.Android

open IntelliFactory.WebSharper.Mobile

/// Represents an Android context: API available for applications running
/// on Android-powered devices.
[<Sealed>]
type Context =
    interface IAccelerometer
    interface ICamera
    interface ILog

    /// Uses the device camera, if available.
    member TakePicture : unit -> Async<Jpeg>

    /// Traces a message to the system log.
    member Trace : priority: Priority * category: string * message: string -> unit

    /// Allows subscribing to acceleration updates.
    member AccelerationChange : IEvent<Acceleration>

    /// The geolocator service, if available.
    member Geolocator : option<IGeolocator>

    /// Gets or sets the state of acceleration subscription.
    member IsMeasuringAcceleration : bool with get, set

    /// Attempts to get the Android Context object.
    /// Returns None in non-Android environments.
    static member Get : unit -> option<Context>
