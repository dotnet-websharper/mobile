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

/// Implements facilities for Android apps.
namespace IntelliFactory.WebSharper.Android

open IntelliFactory.WebSharper.Mobile

/// Represents an Android context: API available for applications running
/// on Android-powered devices.
[<Sealed>]
type Context =

    /// Allows subscribing to acceleration updates.
    member AccelerationChange : IEvent<Acceleration>

    /// Displays an alert on the phone.
    member Alert : string -> unit

    /// The device camera, if available.
    member Camera : option<ICamera>

    /// The geolocator service, if available.
    member Geolocator : option<IGeolocator>

    /// Gets or sets the state of acceleration subscription.
    member IsMeasuringAcceleration : bool with get, set

    /// Loads data by a given key.
    member Load : string -> option<string>

    /// Logs a message to the system log on the phone.
    member Log : string -> unit

    /// Saves data.
    member Save : key: string * value: string -> unit

    interface IAccelerometer
    interface IContext
    interface IStorage

    /// Attempts to get the Android Context object.
    /// Returns None in non-Android environments.
    static member Get : unit -> option<Context>
