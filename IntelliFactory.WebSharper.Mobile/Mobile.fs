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
