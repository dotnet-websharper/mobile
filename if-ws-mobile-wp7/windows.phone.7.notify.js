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

function callNotify(arg) {
    window.external.notify(arg);
}

function wp7_init() {
    try {
        callNotify("serverLocation.");
        if (IntelliFactory.WebSharper.Mobile.WP7.result.$ == 1)
            IntelliFactory.WebSharper.Remoting.Config.EndPoint = IntelliFactory.WebSharper.Mobile.WP7.result.$0;

        IntelliFactory.WebSharper.Mobile.WP7.Ajax.updateAjaxProvider();

        IntelliFactory.WebSharper.Mobile.Mobile = IntelliFactory.WebSharper.Mobile.WP7.ProviderHolder.provider;
    } catch (e) {}
}