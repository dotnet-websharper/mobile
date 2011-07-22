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
    type Action =
        | Index
        | Page1
        | Page2

    // Module containing client-side controls
    module Client =
        open IntelliFactory.WebSharper.Html

        type MyControl() =
            inherit IntelliFactory.WebSharper.Web.Control ()

            [<JavaScript>]
            override this.Body =
                I [Text "Client control"] :> IPagelet

    
    let Template title body : Content<Action> =
        PageContent <| fun context ->
            { Page.Default with 
                Doctype =   Some "<!DOCTYPE HTML PUBLIC \"- \/\/W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">"
                Title = Some title
                Body = body context
            }

    let Index =
        Template "Index page" <| fun ctx ->
            [
                H1 [Text "Pages"]
                UL [
                    LI [A [HRef (ctx.Link Action.Page1)] -< [Text "Page 1"]]
                    LI [A [HRef (ctx.Link Action.Page2)] -< [Text "Page 2"]]
                ]
            ]

    let Page1 =
        Template "Title of Page1" <| fun ctx ->
            let url =  ctx.Link Action.Page2
            [
                H1 [Text "Page 1"]
                A [HRef url] -< [Text "Page 2"]
                    
            ]

    let Page2 =
        Template "Title of Page2" <| fun ctx ->
            [
                H1 [Text "Page 2"]
                A [HRef <| ctx.Link Action.Page1] -< [Text "Page 1"]
                Div [new Client.MyControl ()]
            ]
        
    let MySitelet =
        [
            Sitelet.Content "/index" Action.Index Index
            Sitelet.Folder "/pages" [
                Sitelet.Content "/page1" Action.Page1 Page1
                Sitelet.Content "/page2" Action.Page2 Page2
            ]
        ]
        |> Sitelet.Sum
    
    // Actions to generate pages from
    let MyActions = 
        [
            Action.Index
            Action.Page1
            Action.Page2
        ]

/// The class that contains the website
type MySampleWebsite() =
    interface IWebsite<SampleSite.Action> with
        member this.Sitelet =
            SampleSite.MySitelet
        member this.Actions =
            SampleSite.MyActions

[<assembly: WebsiteAttribute(typeof<MySampleWebsite>)>]
do ()
