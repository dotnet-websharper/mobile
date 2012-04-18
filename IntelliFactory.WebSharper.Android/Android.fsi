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
