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

    /// Allows subscribing to acceleration updates.
    member AccelerationChange : IEvent<Acceleration>

    /// Retrievs the geolocator service, if available.
    member GetGeolocator : unit -> Async<option<IGeolocator>>

    /// Gets or sets the state of acceleration subscription.
    member IsMeasuringAcceleration : unit -> Async<bool>

    /// The logging facility.
    member Log : ILog

    /// Starts measuring acceleration.
    member StartAccelerometer : unit -> unit

    /// Stops measuring acceleration.
    member StopAccelerometer : unit -> unit

    /// Takes a picture using the camera or image store.
    member TakePicture : unit -> Async<Jpeg>

    /// Attempts to get the Context object.
    /// Returns None in environments other than Windows Phone.
    static member Get : unit -> option<Context>
