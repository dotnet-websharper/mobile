namespace SampleWebsite

open System
open System.IO
open System.Web
open IntelliFactory.WebSharper.Sitelets

/// Defines a sample HTML site with nested pages
module SampleSite =
    open IntelliFactory.WebSharper
    open IntelliFactory.Html
    
    // Action type
    type Action = | Index

    // Module containing client-side controls
    module Client =
        open IntelliFactory.WebSharper.Mobile
        open IntelliFactory.WebSharper.Html

        [<JavaScript>]
        let support =
            WP7.EnableWP7Support() // remove if you are not intending to build for WP7 (recommended)
            Android.EnableAndroidSupport() // remove if you are not intending to build for Android (recommended)

    let Template title body : Content<Action> =
        PageContent <| fun context ->
            { Page.Default with 
                Title = Some title
                Body = body context
            }

    let Index =
        Template "Index page" <| fun ctx ->
            [
                Div [ Text "Hello world!" ]
            ]

    let MySitelet =
        Sitelet.Content "/index" Action.Index Index
    
    // Actions to generate pages from
    let MyActions = 
        [
            Action.Index
        ]

/// The class that contains the website
type MySampleWebsite() =
    interface IWebsite<SampleSite.Action> with
        member this.Sitelet =
            SampleSite.MySitelet
        member this.Actions =
            SampleSite.MyActions

[<assembly: Website(typeof<MySampleWebsite>)>]
do ()
