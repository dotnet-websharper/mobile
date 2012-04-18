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
