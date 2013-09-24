// WebSharper.Mobile - support for building mobile WebSharper apps
// Copyright (c) 2013 IntelliFactory
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

#load "../tools/includes.fsx"

open System
open System.IO
open System.Text.RegularExpressions

module X = IntelliFactory.Core.XmlTools
module NG = IntelliFactory.Core.VisualStudioTools.NuGet
module VST = IntelliFactory.Core.VisualStudioTools.Templates
module VX = IntelliFactory.Core.VisualStudioTools.Extensions
type Content = IntelliFactory.Core.VisualStudioTools.Utils.Content

type ExtId =
    {
        Desc : string
        Name : string
        Guid : Guid
    }

    member ext.GetIdentity() =
        VST.ExtensionIdentity.Create(ext.Name, ext.Guid)

let defExt name guid desc =
    {
        Desc = desc
        Name = name
        Guid = Guid.Parse(guid)
    }

let mobileExt =
    defExt "WebSharper.Mobile" "3fe21285-1497-4ad9-92c5-25ad9eff689d"
        "WebSharper support for building mobile applications"

let pattern = Regex(@"(\d+(\.\d+)*)(\-(\w+))?$")

type VersionInfo =
    {
        FullVersion : string
        NumericVersion : Version
        PackageId : string
        VersionSuffix : option<string>
    }

    static member FromFileName(package: string) =
        let fn = Path.GetFileNameWithoutExtension(package)
        let m = pattern.Match(fn)
        if m.Success then
            Some {
                FullVersion = m.Groups.[0].Value
                NumericVersion = Version(m.Groups.[1].Value)
                PackageId = fn.Substring(0, m.Groups.[1].Index - 1)
                VersionSuffix =
                    match m.Groups.[4].Value with
                    | "" -> None
                    | v -> Some v
            }
        else None

type Config =
    {
        MobileNuPkgPath : string
        RootPath : string
        VsixPath : string
        WebSharperNuPkgPath : string
    }

let ( +/ ) a b =
    Path.Combine(a, b)

type Common =
    {
        Config : Config
        Icon : VST.Icon
        VersionInfo : VersionInfo
    }

    static member Create(cfg) =
        let iconPath = cfg.RootPath +/ "WebSharper.png"
        let icon = VST.Icon.FromFile(iconPath)
        {
            Config = cfg
            Icon = icon
            VersionInfo = VersionInfo.FromFileName(cfg.MobileNuPkgPath).Value
        }

let loadNuPkg (path: string) =
    let c = Content.ReadBinaryFile(path)
    let vn = VersionInfo.FromFileName(path).Value
    NG.Package.Create(vn.PackageId, vn.FullVersion, c)

let buildNuGetPackagesElement (ext: ExtId) (paths: seq<string>) =
    VST.NuGetPackages.Create(ext.GetIdentity(),
        [for p in paths -> loadNuPkg p])

type PackagesToInstall =
    | MobileAndWebSharper
    | MobileOnly

let makeProjectTemplate kind ext com meta project =
    let p = VST.ProjectTemplate.Create(meta, project)
    let paths =
        match kind with
        | MobileAndWebSharper ->
            [
                com.Config.MobileNuPkgPath
                com.Config.WebSharperNuPkgPath
            ]
        | MobileOnly ->
            [ com.Config.MobileNuPkgPath ]
    p.WithNuGetPackages(buildNuGetPackagesElement ext paths)

let makeTemplateMetadata pt com name dpn desc =
    VST.TemplateData.Create(pt,
        name = name,
        description = desc,
        icon = com.Icon)
        .WithDefaultProjectName(dpn)

let folder name xs =
    VST.Folder.Create(name, xs)
    |> VST.FolderElement.Folder

let textFile dir path =
    VST.ProjectItem.FromTextFile(dir +/ path).ReplaceParameters()
    |> VST.FolderElement.Nested

let binFile dir path =
    VST.ProjectItem.FromBinaryFile(dir +/ path)
    |> VST.FolderElement.Nested

let getWinPhoneApp com =
    let dir = com.Config.RootPath +/ "templates" +/ "wp-app"
    let meta =
        "Defines an application for Windows Phone"
        |> makeTemplateMetadata VST.ProjectType.FSharp com
            "Windows Phone App" "WinPhoneApp"
    let textFile path = textFile dir path
    let binFile path = binFile dir path
    let project =
        VST.Project.FromFile(dir +/ "WpApp.fsproj",
            [
                textFile "extra.files"
                textFile "Main.html"
                textFile "Site.fs"
            ])
            .ReplaceParameters()
    makeProjectTemplate MobileAndWebSharper mobileExt com meta project

let getWinPhoneWrapper com =
    let dir = com.Config.RootPath +/ "templates" +/ "wp-wrapper"
    let meta =
        "Wraps WebSharper apps as Windows Phone packages"
        |> makeTemplateMetadata VST.ProjectType.CSharp com
            "Windows Phone Wrapper" "WinPhoneWrapper"
    let textFile path = textFile dir path
    let binFile path = binFile dir path
    let project =
        VST.Project.FromFile(dir +/ "WinPhone.csproj",
            [
                textFile "App.xaml"
                textFile "App.xaml.cs"
                textFile "MainPage.xaml"
                textFile "MainPage.xaml.cs"
                folder "Images" [
                    binFile "Images/ApplicationIcon.png"
                    binFile "Images/Background.png"
                    binFile "Images/SplashScreenImage.jpg"
                ]
                folder "Properties" [
                    textFile "Properties/AppManifest.xml"
                    textFile "Properties/WMAppManifest.xml"
                ]
            ])
            .ReplaceParameters()
    makeProjectTemplate MobileOnly mobileExt com meta project

let rec binDir path =
    let parentName = Path.GetDirectoryName(path)
    let localName = Path.GetFileName(path)
    folder localName [
        for p in Directory.EnumerateDirectories(path) do
            yield binDir p
        for p in Directory.EnumerateFiles(path) do
            yield binFile path (Path.GetFileName(p))
    ]

let getAndroidApp com =
    let dir = com.Config.RootPath +/ "templates" +/ "android-app"
    let meta =
        "Creates an Android WebSharper application"
        |> makeTemplateMetadata VST.ProjectType.FSharp com
            "Android Application" "AndroidApp"
    let textFile path = textFile dir path
    let binFile path = binFile dir path
    let project =
        VST.Project.FromFile(dir +/ "AndroidApp.fsproj",
            [
                textFile "extra.files"
                textFile "Main.fs"
                textFile "Main.html"
                binDir (dir +/ "android")
            ])
            .ReplaceParameters()
    makeProjectTemplate MobileAndWebSharper mobileExt com meta project

let getMobileExt com =
    let desc = mobileExt.Desc
    let id = mobileExt.GetIdentity()
    let editions =
        [
            VX.VSEdition.Premium
            VX.VSEdition.Pro
            VX.VSEdition.Ultimate
            VX.VSEdition.VPDExpress
            VX.VSEdition.VWDExpress
        ]
    let products =
        [
            for v in ["11.0"] do
                yield VX.VSProduct.Create(v, editions).AsSupportedProduct()
        ]
    let identifier =
        VX.Identifier.Create("IntelliFactory", id, com.VersionInfo.PackageId, desc)
            .WithVersion(com.VersionInfo.NumericVersion)
            .WithProducts(products)
    let category = ["WebSharper"]
    let proj x = VX.VsixContent.ProjectTemplate(category, x)
    let vsix =
        VX.Vsix.Create(identifier,
            [
                proj (getWinPhoneWrapper com)
                proj (getWinPhoneApp com)
                proj (getAndroidApp com)
            ])
    VX.VsixFile.Create(Path.GetFileName(com.Config.VsixPath), vsix)

let BuildVsix cfg =
    let com = Common.Create(cfg)
    let ext = getMobileExt com
    ext.WriteToDirectory(Path.GetDirectoryName(cfg.VsixPath))
