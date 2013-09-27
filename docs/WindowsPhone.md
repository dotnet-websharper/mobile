# Developing Windows Phone Applications

## Prerequisites

In addition to general requirements specified in
[Install](Install.md), building [Windows Phone][wp] applications with
WebSharper.Mobile requires:

* If using Visual Studio Express, the [Windows Phone][vsp] edition.
  Users of other editions of Visual Studio can skip this step.

* [Windows Phone SDK][wp-sdk], we currently test with "SDK Update for
  Windows Phone 7.8" on Windows 8.1.

[vsx]: http://www.microsoft.com/visualstudio/eng/downloads#d-2012-express
[vsp]: http://www.microsoft.com/visualstudio/eng/products/visual-studio-express-for-windows-phone
[wp]: http://www.windowsphone.com
[wp-sdk]: http://dev.windowsphone.com/en-us/downloadsdk
[ws]: http://bitbucket.org/IntelliFactory/websharper

## Usage

To create a new application, you will need to use two project
templates to create two projects, one to define and generate the
WebSharper application, and another one to bundle it into a Windows
Phone package.  When done, your solution tree will look similar to
this:

    MySolution\
      build\
        html\
      MyWinPhoneApp\
      MyWinPhoneWrapper\
      MySolution.sln

**Step 1:** create the "MyWinPhoneApp" project with "Visual F# >
WebSharper > Windows Phone App". This project is a variant of athe
WebSharper HTML application complete with references to
mobile-specific functionality.  Building this project produces HTML,
JavaScript and HTML files under `build\html`.

**Step 2:** create the "MyWinPhoneWrapper" project with "Visual C# >
WebSharper > Windows Phone Wrapper". If using Visual Studio Express,
you will need to use a different edition (Visual Studio Express for
Windows Phone) to create this project.

**Step 3:** build the solution.

The default build of the "MyWinPhoneWrappr" project starts a Windows
Phone Emulator and connects the debugger to it, enabling you to see
log messages from WebSharper in the Visual Studio Output console
(Debug).

Consider tweaking the mobile project template to customize your
application metadata and enable signing.
