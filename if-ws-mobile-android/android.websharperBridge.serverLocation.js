// $begin{copyright}
//
// This file is confidential and proprietary.
//
// Copyright (c) IntelliFactory, 2004-2011.
//
// All rights reserved.  Reproduction or use in whole or in part is
// prohibited without the written consent of the copyright holder.
//-----------------------------------------------------------------
// $end{copyright}

function android_init() {
    try {
        var result = eval('' + websharperBridge.serverLocation());
        if (result.$ == 1)
            IntelliFactory.WebSharper.Remoting.Config.EndPoint = result.$0;

        IntelliFactory.WebSharper.Mobile.Mobile = IntelliFactory.WebSharper.Mobile.Android.ProviderHolder.provider;
    } catch (e) { }
}