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

namespace IntelliFactory.WebSharper.Mobile

type Location =
    {
        Latitude : float
        Longitude : float
    }

type Acceleration =
    {
        X : float
        Y : float
        Z : float
    }

type Priority =
    | Debug
    | Info
    | Warn
    | Error

type ILog =
    abstract Trace : priority: Priority * category: string * text: string -> unit

type IAccelerometer =
    abstract AccelerationChange : IEvent<Acceleration>
    abstract IsMeasuringAcceleration : bool with get, set

type IGeolocator =
    abstract member GetLocation : unit -> Async<Location>

type Jpeg = string

type ICamera =
    abstract member TakePicture : unit -> Async<Jpeg>
