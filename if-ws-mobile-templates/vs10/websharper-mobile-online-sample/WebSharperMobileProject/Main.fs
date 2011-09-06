namespace SampleWebsite

open System
open System.IO
open System.Web
open IntelliFactory.WebSharper.Sitelets

/// Defines a sample HTML site with nested pages
module SampleSite =
    open IntelliFactory.Html
    open IntelliFactory.WebSharper
    
    // Action type
    type Action =
        | Index
        | Page1
        | Page2

    // Module containing server-side functions
    module Server =
        
        [<Rpc>]
        let f x = async { return x + 3 }
        
        [<Rpc>]
        let g (x : int) =
            async {
                return
                    [ 1I .. bigint x ]
                    |> List.reduce ( * )
                    |> string
                }

        [<Rpc>]
        let saveImage (content : string) =
            try
                let context = System.Web.HttpContext.Current
                async {
                    try
                        let path =
                            sprintf "img%d.bmp" (DateTime.Now.ToBinary())
                            |> context.Server.MapPath
                        do
                            use sr = new System.IO.StringReader(content)
                            use fs = File.Create(path)
                            let mutable read = 1
                            let chars = Array.create 10000 ' '
                            let bytes = Array.create 5000 0uy
                            while read <> 0 do
                                read <- sr.Read(chars, 0, 10000)
                                for i in 0 .. 2 .. (read - 1) do
                                    bytes.[i / 2] <- Convert.ToByte(sprintf "%c%c" chars.[i] chars.[i + 1], 16)
                                fs.Write(bytes, 0, read / 2)
                        return (sprintf "http://%s" (path.Substring(path.IndexOf("test.intellifactory.com")).Replace('\\', '/')))
                    with e -> return e.Message
                    }
            with e -> async { return (sprintf "Context saving error: %s" e.Message) }

    // Module containing client-side controls
    module Client =
        open IntelliFactory.WebSharper.Mobile
        open IntelliFactory.WebSharper.Html
        open Server

        [<JavaScript>]
        let support =
            WP7.EnableWP7Support()
            Android.EnableAndroidSupport()

        type IndexControl() =
            inherit Web.Control ()

            [<JavaScript>]
            override this.Body =
                if Mobile.StorageLoad "message" <> "Hello from page 2!" then
                    Mobile.StorageStore "message" "Go to page 2."
                Div [] :> _

        type Page1Control() =
            inherit Web.Control ()

            [<JavaScript>]
            override this.Body =
                Mobile.Alert "Hello!"
                let loc = Mobile.GetLocation()
                let locT = "Lat: " + loc.Lat.ToString() + "; Long: " + loc.Long.ToString()
                let acc = Mobile.GetAcceleration()
                let accT = "X: " + acc.X.ToString() + "; Y: " + acc.Y.ToString() + "; Z: " + acc.Z.ToString()
                P [ Text locT; Br [] :> _; Text accT; Br [] :> _; Text ("The message is: " + Mobile.StorageLoad "message") ] :> _
    
        type Page2Control() =
            inherit Web.Control ()

            [<JavaScript>]
            override this.Body =
                try
                    Mobile.StorageStore "message" "Hello from page 2!"
                    Div [
                        P [Text "Click me!"]
                        |>! OnClick (fun this _ ->
                                        try
                                            async {
                                                let! content = g 12
                                                this.Text <- "12! = " + content
                                                }
                                            |> Async.Start
                                        with e -> Mobile.Alert ("Error: " + e.Message))
                        I [Text ("Client control page")]
                        |>! OnAfterRender (fun this ->
                                            try
                                                async {
                                                    let! f = f -1
                                                    this.Text <- this.Text + ": (-1) + 3 = " + (string f)
                                                    }
                                                |> Async.Start
                                            with e -> Mobile.Alert ("Error: " + e.Message))
                        Img []
                        |>! OnAfterRender (fun this ->
                                            async {
                                                try
                                                    let! content = Mobile.GetPhotoFromCamera () //(800, 600)
                                                    let! src = saveImage content
                                                    this.SetAttribute ("src", src)
                                                    return ()
                                                with e -> Mobile.Alert e.Message
                                            }
                                            |> Async.Start)
                    ] :> _
                with e ->
                    Div [ Text ("Error: " + e.Message) ] :> _

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
