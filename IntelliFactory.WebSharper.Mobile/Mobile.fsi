// $begin{copyright}
//
// This file is confidential and proprietary.
//
// Copyright (c) IntelliFactory, 2004-2012.
//
// All rights reserved.  Reproduction or use in whole or in part is
// prohibited without the written consent of the copyright holder.
//-----------------------------------------------------------------
// $end{copyright}

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

/// An interface for persistent storage functionality.
type IStorage =

    /// Loads data by a given key.
    abstract member Load : string -> option<string>

    /// Saves data.
    abstract member Save : key: string * value: string -> unit

/// Represents JPEG image data encoded as a string, each character
/// representing a single unsigned byte of the dat.
type Jpeg = string

/// An interface for the phone camera.
type ICamera =

    /// Takes a picture with the specified dimensions.
    abstract member TakePicture : width: int * height: int -> Async<Jpeg>

/// An interface for basic common mobile platform functionality.
type IContext =

    /// Displays an alert on the phone.
    abstract member Alert : string -> unit

    /// Logs a message to the system log on the phone.
    abstract member Log : string -> unit
