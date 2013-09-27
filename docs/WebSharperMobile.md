# WebSharper.Mobile

This package supports building mobile applications with WebSharper for
the Android and Windows Phone 7.1 platforms.  The strategy is to
pre-generate HTML, JavaScript and CSS files, and then package them as
a native application for the target platform.  To give WebSharper
access to some of the native API of the mobile devices, we provide a
common interface and implement it natively for every platform.

In addition, WebSharper supports deploying server-side code to to a
public server, and making the mobile devices communicate with it using
the standard Remoting/RPC mechanism.

* [Common Installation Requirements](Install.md)
* [Developing Android Applications](Android.md)
* [Developing Windows Phone Applications](WindowsPhone.md)
* [License](../LICENSE.md)
* [Contact](Contact.md)
