function android_init() {
    try {
        var result = eval('' + websharperBridge.serverLocation());
        if (result.$ == 1)
            IntelliFactory.WebSharper.Remoting.Config.EndPoint = result.$0;

        IntelliFactory.WebSharper.Mobile.Mobile = IntelliFactory.WebSharper.Mobile.Android.ProviderHolder.provider;
    } catch (e) { }
}