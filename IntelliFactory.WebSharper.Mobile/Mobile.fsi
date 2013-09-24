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

/// Provides types common across all mobile platforms.
namespace IntelliFactory.WebSharper.Mobile

/// Represents a geographic location.
type Location =
    {
        Latitude : float
        Longitude : float
    }

/// Represents phone acceleration data in SI units (m/s^2).
type Acceleration =
    {
        X : float
        Y : float
        Z : float
    }

/// Represents log message priority.
type Priority =
    | Debug
    | Info
    | Warn
    | Error

/// Represents a trace facility.
type ILog =

    /// Traces a message with a given priority and category.
    abstract Trace : priority: Priority * category: string * text: string -> unit

/// An interface for subscribing to acceleration updates.
type IAccelerometer =

    /// Allows subscribing to acceleration updates.
    abstract AccelerationChange : IEvent<Acceleration>

    /// Gets or sets the state of acceleration subscription.
    abstract IsMeasuringAcceleration : bool with get, set

/// An interface for determining geographical location.
type IGeolocator =

    /// Returns the current location of the device.
    abstract member GetLocation : unit -> Async<Location>

/// Represents JPEG image data encoded as a string, each character
/// representing a single unsigned byte of the dat.
type Jpeg = string

/// An interface for the phone camera.
type ICamera =

    /// Takes a picture with the specified dimensions.
    abstract member TakePicture : unit -> Async<Jpeg>
