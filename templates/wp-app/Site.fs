namespace $safeprojectname$

open System.IO
open System.Web
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Sitelets

type Action =
    | Home
    | About

module Skin =

    type Page =
        {
            Title : string
            Body : list<Content.HtmlElement>
        }

    let MainTemplate =
        Content.Template<Page>(Path.Combine(__SOURCE_DIRECTORY__, "Main.html"))
            .With("title", fun x -> x.Title)
            .With("body", fun x -> x.Body)

    let WithTemplate title body : Content<Action> =
        Content.WithTemplate MainTemplate <| fun context ->
            {
                Title = title
                Body = body context
            }

module Client =
    open IntelliFactory.WebSharper.Html

//    /// Uncomment this code if you plan to
//    /// deploy a public website and call
//    /// the server via Remote (RPC) methods.
//    [<JavaScript>]
//    let EndPoint =
//        let endPoint = "http://example.com"
//        Remoting.EndPoint <- endPoint
//        endPoint

    [<JavaScript>]
    let Main (canvas: Element) =
        match WinPhone.Context.Get() with
        | None -> canvas.Text <- "Not running on a Windows Phone device"
        | Some ctx ->
            ctx.Trace(Mobile.Priority.Info, "Website", "Windows Phone runtime initialized")
            canvas.Text <- "Windows Phone runtime initialized"

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

module Site =
    open IntelliFactory.Html

    let ( => ) text url =
        A [HRef url] -< [Text text]

    let Links (ctx: Context<Action>) =
        UL [
            LI ["Home" => ctx.Link Home]
            LI ["About" => ctx.Link About]
        ]

    let HomePage =
        Skin.WithTemplate "HomePage" <| fun ctx ->
            [
                Div [Text "HOME"]
                Div [new Controls.MainControl()]
                Links ctx
            ]

    let AboutPage =
        Skin.WithTemplate "AboutPage" <| fun ctx ->
            [
                Div [Text "ABOUT"]
                Links ctx
            ]

    let Main =
        Sitelet.Sum [
            Sitelet.Content "/" Home HomePage
            Sitelet.Content "/About" About AboutPage
        ]

type Website() =
    interface IWebsite<Action> with
        member this.Sitelet = Site.Main
        member this.Actions = [Home; About]

[<assembly: WebsiteAttribute(typeof<Website>)>]
do ()
