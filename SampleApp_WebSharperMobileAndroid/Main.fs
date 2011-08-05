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
        open IntelliFactory.WebSharper.Mobile.Android//.Testing // the .Testing module will allow you to test your application on a desktop browser (but then it would not run on a
                                                                // mobile device).

        [<Rpc>]
        let f x = async { return x + 3 }
        
        [<Rpc>]
        let g (x : int) =
            async {
                return
                    [ 1I .. bigint x ]
                    |> List.reduce (*)
                    |> string
                }

        type IndexControl() =
            inherit IntelliFactory.WebSharper.Web.Control ()

            [<JavaScript>]
            override this.Body =
                if Mobile.Storage.Load "message" <> "Hello from page 2!" then
                    Mobile.Storage.Store "message" "Go to page 2."
                Div [] :> _

        type Page2Control() =
            inherit IntelliFactory.WebSharper.Web.Control ()

            [<JavaScript>]
            override this.Body =
                Mobile.Storage.Store "message" "Hello from page 2!"
                try
                    Div [
                        P [Text "Click me!"]
                        |>! OnClick (fun this _ ->
                                        async {
                                            let! content = g 10
                                            this.Text <- content
                                            }
                                        |> Async.Start)
                        I [Text ("Client control page ")]
                        |>! OnAfterRender (fun this ->
                                            async {
                                                let! f = f -1
                                                this.Text <- this.Text + (string f)
                                                }
                                            |> Async.Start)
                    ] :> _
                with e ->
                    Div [ Text ("Error: " + string e.Message) ] :> _

        type Page1Control() =
            inherit IntelliFactory.WebSharper.Web.Control ()

            [<JavaScript>]
            override this.Body =
                Mobile.Alert "Hello!"
                let loc = Mobile.GetLocation()
                let locT = "Lat: " + loc.Lat.ToString() + "; Long: " + loc.Long.ToString()
                let acc = Mobile.GetAcceleration()
                let accT = "X: " + acc.X.ToString() + "; Y: " + acc.Y.ToString() + "; Z: " + acc.Z.ToString()
                P [ Text locT; Br [] :> _; Text accT; Br [] :> _; Text ("The message is: " + Mobile.Storage.Load "message") ] :> _
    
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
                Div [new Client.IndexControl()]
            ]

    let Page1 =
        Template "Title of Page1" <| fun ctx ->
            let url =  ctx.Link Action.Page2
            [
                H1 [Text "Page 1"]
                A [HRef url] -< [Text "Page 2"]
                Div [new Client.Page1Control()]
            ]

    let Page2 =
        Template "Title of Page2" <| fun ctx ->
            [
                H1 [Text "Page 2"]
                A [HRef <| ctx.Link Action.Page1] -< [Text "Page 1"]
                Div [new Client.Page2Control ()]
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

[<assembly: Website(typeof<MySampleWebsite>)>]
do ()
