using System;
using System.Windows;
using System.IO;
using System.IO.IsolatedStorage;
using Microsoft.Phone.Controls;
using IntelliFactory.WebSharper.WinPhone.Runtime;

namespace $safeprojectname$
{
    public partial class MainPage : PhoneApplicationPage
    {
        public MainPage()
        {
            InitializeComponent();
            MobileApplication.Initialize(typeof(MainPage).Assembly, WebView);
            Log.MessageSent += (sender, msg) =>
            {
                System.Diagnostics.Debug.WriteLine(msg.ToString());
            };
        }
    }
}
