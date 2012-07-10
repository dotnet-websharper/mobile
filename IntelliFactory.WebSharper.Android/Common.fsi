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

module IntelliFactory.WebSharper.Android.Common

open IntelliFactory.WebSharper

/// java.lang.String
[<Sealed>]
type JString

/// java.util.List<T>
[<AbstractClass>]
type JList<'T> =
    [<Stub>] abstract member get : int -> 'T
    [<Stub>] abstract member size : unit -> int

/// com.intellifactory.android.Task.Status<T>
[<AbstractClass>]
type JStatus<'T> =
    [<Stub>] abstract member getErrorMessage : unit -> JString
    [<Stub>] abstract member getValue : unit -> 'T
    [<Stub>] abstract member isDone : unit -> bool
    [<Stub>] abstract member isError : unit -> bool

/// Converts a JStatus computation to an Async.
val toAsync : start: (unit -> JStatus<'T>) -> Async<'T>

/// Converts a list to an array.
val toArray : JList<'T> -> 'T []

/// Converts to a string.
val toString : JString -> string
