# Installation

Building mobile applications with WebSharper.Mobile requires:

* [Visaul Studio Express 2012 for Web][vsx] with [F# tools][fsharp] or
  [Visual Studio 2012][vs]

* [WebSharper 2.5][ws]

* [NuGet 2.7][nuget]

**Important**: Note that Visual Studio 2012 may ship with an outdated
version of the NuGet Package Manager. Please go to "Tools > Extensions
and Updates" and make sure that the latest version is installed (at
least NuGet 2.7).  This step has to be repeted for every Visual Studio
product you are planning to use with WebSharper.Mobile.

When your environment is ready, obtain and install the
[WebSharper.Mobile Visual Studio extension][downloads] by downloading
and clicking on the relevant `.vsix` file.

`WebSharper.Mobile` binaries are distributed via [NuGet][nuget]. The
`vsix` file provides a Visual Studio extension that bundles the NuGet
package and Visual Studio templates.

Next steps -- platform-specific installation:

* [Android](Android.md)
* [Windows Phone](WindowsPhone.md)

[downloads]: https://bitbucket.org/IntelliFactory/websharper.mobile/downloads
[fsharp]: http://www.microsoft.com/web/gallery/install.aspx?appid=FSharpVWD11
[nuget]: http://nuget.org
[vs]: http://www.microsoft.com/visualstudio/eng/downloads
[vsp]: http://www.microsoft.com/visualstudio/eng/products/visual-studio-express-for-windows-phone
[vsx]: http://www.microsoft.com/visualstudio/eng/downloads#d-2012-express
[ws]: http://bitbucket.org/IntelliFactory/websharper

