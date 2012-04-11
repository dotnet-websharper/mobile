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

/// Provides a simple asynchronous message receiver facility to
/// communicate with the Android backend.
module internal IntelliFactory.WebSharper.Android.Receiver

/// Gets a named event triggered by the backend.
val GetEvent<'T> : name: string -> recognize: (obj -> 'T) -> IEvent<'T>

/// Constructs a new Async<'T> that waits for a message from the backend.
val MakeAsync<'T> : start: (int -> unit) -> recognize: (obj -> 'T) -> Async<'T>

