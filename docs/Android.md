# Developing Android Applications

## Prerequisites

Building [Android][android] applications with WebSharper.Mobile
requires:

* [Visaul Studio Express 2012 for Web][vsx] with [F# tools][fsharp] or
  [Visual Studio 2012][vs]
* [WebSharper 2.5][ws]
* [Java Development Kit (JDK)][jdk]
* [Android Development Tools (ADT) bundle][adt]

For best results, it is recommended to install:

* [Apache Ant][ant]

[ant]: http://ant.apache.org
[android]: http://developer.android.com
[adt]: http://developer.android.com/sdk/index.html
[jdk]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[ws]: http://bitbucket.org/IntelliFactory/websharper
[vs]: http://www.microsoft.com/visualstudio/eng/downloads
[vsx]: http://www.microsoft.com/visualstudio/eng/downloads#d-2012-express
[fsharp]: http://www.microsoft.com/web/gallery/install.aspx?appid=FSharpVWD11

## Installation

**Step 1**: set the following environment variables:

| Name        | Value                            |
+-------------+----------------------------------+
| ANDROID_SDK | Path to the Android `sdk` folder |
| ANT_HOME    | Path to ANT installation         |
| JAVA_HOME   | Path to the JDK                  |

Here is a quick way to permanently set these variables for the current
user from F# (do adjust your paths before evaluating the example from
F# interactive):

    let set name value =
        System.Environment.SetEnvironmentVariable(name, value,
        System.EnvironmentVariableTarget.User)
 
    set "ANDROID_SDK" @"C:\Users\me\programs\android\sdk"
    set "ANT_HOME" @"C:\Users\me\programs\ant"
    set "JAVA_HOME" @"C:\Program Files\Java\jdk1.7.0_40"

**Step 2**: run `SDK Manager.exe` and install Android 2.2 (API 8).

**Step 3**: obtain and install the
[WebSharper.Mobile Visual Studio extension][downloads] by clicking on
the relevant `.vsix` file.

[downloads]: https://bitbucket.org/IntelliFactory/websharper.mobile/downloads

## Usage

To create a new application, open Visual Studio and create a new
project using the "F# > WebSharper > Android Application" template.
This creates an Android variant of the standard WebSharper HTML site.
It also generates a new Android application under the `android`
folder.

Building the application compiles your WebSharper code and places it
under `android\assets`. If Apache Ant has been installed, it also
bundles an Android package.

### Using Eclipse ADT

To test the application, open Eclipse, import the `your-app\android`
project from the file system. Using Eclipse allows you to easily test
the application in a virtual Android device, and tweak the Java code
for the app backend.

### Using Command-Line Tools

If Apache Ant has been set up, builds from Visual Studio automatically
produce Android packages and place them under the `android\bin`
folder.  Please refer to Android documentation for information on how
to use command-line tools to work with packagse.

## Distributing Apps

Note that release packages should be signed before distribution.  To
enable signing with command-line builds, generate a keystore with the
`keytool.exe` tool that comes with the JDK and configure
`android\ant.properties`.
