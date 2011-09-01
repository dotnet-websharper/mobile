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