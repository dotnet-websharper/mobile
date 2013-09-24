namespace $safeprojectname$

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Sitelets

module Client =
    open IntelliFactory.WebSharper.Html

//    /// Uncomment this code if you plan to call
//    /// a public website via Remote / RPC methods.
//    [<JavaScript>]
//    let EndPoint =
//        let endPoint = "http://example.com"
//        Remoting.EndPoint <- endPoint
//        endPoint

    [<JavaScript>]
    let Main (canvas: Html.Element) =
        match Android.Context.Get() with
        | None -> canvas.Text <- "No Android context"
        | Some ctx ->
            ctx.Trace(Mobile.Priority.Info, "Website", "Starting the mobile app..")
            canvas.Text <- "Android started"

module Controls =
    open IntelliFactory.WebSharper.Html

    [<Sealed>]
    type MainControl() =
        inherit Web.Control()

        [<JavaScript>]
        override this.Body =
            Div []
            |>! OnAfterRender Client.Main
            :> _

module Actions =
    type Action =
        | Index
        | Page1
        | Page2

module Skin =
    open System.IO

    type Page =
        {
            Title : string
            Body : list<Content.HtmlElement>
        }

    let MainTemplate =
        let path = Path.Combine(__SOURCE_DIRECTORY__, "Main.html")
        Content.Template<Page>(path)
            .With("title", fun x -> x.Title)
            .With("body", fun x -> x.Body)

    let WithTemplate title body : Content<Actions.Action> =
        Content.WithTemplate MainTemplate <| fun context ->
            {
                Title = title
                Body = body context
            }

module Pages =
    open IntelliFactory.Html

    let Index =
        Skin.WithTemplate "Index page" <| fun ctx ->
            [
                H1 [Text "Pages"]
                UL [
                    LI [A [HRef (ctx.Link Actions.Page1)] -< [Text "Page 1"]]
                    LI [A [HRef (ctx.Link Actions.Page2)] -< [Text "Page 2"]]
                ]
                Div [new Controls.MainControl()]
            ]

    let Page1 =
        Skin.WithTemplate "Title of Page1" <| fun ctx ->
            let url =  ctx.Link Actions.Page2
            [
                H1 [Text "Page 1"]
                A [HRef url] -< [Text "Page 2"]
            ]

    let Page2 =
        Skin.WithTemplate "Title of Page2" <| fun ctx ->
            [
                H1 [Text "Page 2"]
                A [HRef <| ctx.Link Actions.Page1] -< [Text "Page 1"]
                Div [new Controls.MainControl()]
            ]

type Website() =
    interface IWebsite<Actions.Action> with
        member this.Sitelet =
            Sitelet.Sum [
                Sitelet.Content "/index" Actions.Index Pages.Index
                Sitelet.Folder "/pages" [
                    Sitelet.Content "/page1" Actions.Page1 Pages.Page1
                    Sitelet.Content "/page2" Actions.Page2 Pages.Page2
                ]
            ]

        member this.Actions =
            [
                Actions.Index
                Actions.Page1
                Actions.Page2
            ]

[<assembly: WebsiteAttribute(typeof<Website>)>]
do ()
