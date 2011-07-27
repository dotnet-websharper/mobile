using System;
using System.Collections.Generic;
using System.Device.Location;
using System.Diagnostics;
using System.IO.IsolatedStorage;
using System.Linq;
using System.Windows;
using Microsoft.Devices.Sensors;
using Microsoft.Phone.Controls;

namespace WebSharperMobileWP7EmptyApp
{
    public partial class MainPage : PhoneApplicationPage
    {
        Accelerometer accelerometer;
        double aX = 0, aY = 0, aZ = -9.8;
        GeoCoordinateWatcher geoWatcher;
        Dictionary<string, string> localStorage = new Dictionary<string, string>();

        public MainPage()
        {
            InitializeComponent();
            geoWatcher = new GeoCoordinateWatcher();
            accelerometer = new Accelerometer();
            accelerometer.ReadingChanged += new EventHandler<AccelerometerReadingEventArgs>(accelerometer_ReadingChanged);
            try
            {
                accelerometer.Start();
            }
            catch { }
        }

        void accelerometer_ReadingChanged(object sender, AccelerometerReadingEventArgs e)
        {
            aX = e.X;
            aY = e.Y;
            aZ = e.Z;
        }

        private void WebBrowser_ScriptNotify(object sender, NotifyEventArgs e)
        {
            var dotIndex = e.Value.IndexOf('.');
            string command = "", arg = "";
            try
            {
                command = e.Value.Substring(0, dotIndex);
                arg = e.Value.Substring(dotIndex + 1);
            }
            catch (Exception err)
            {
                MessageBox.Show(string.Format("Illegal command format in '{0}': {1}", e.Value, err));
            }
            try
            {
                if (command == "alert")
                    MessageBox.Show(arg);
                else if (command == "log")
                    Debug.WriteLine(arg);
                else if (command == "location")
                    WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.Mobile.result = ({{ Lat : {0}, Long : {1} }});", geoWatcher.Position.Location.Latitude, geoWatcher.Position.Location.Longitude));
                else if (command == "acceleration")
                    WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.Mobile.result = ({{ X : {0}, Y : {1}, Z : {2} }});", aX, aY, aZ));
                else if (command == "localStorage")
                {
                    dotIndex = arg.IndexOf('.');
                    var method = arg.Substring(0, dotIndex);
                    var methodArg = arg.Substring(dotIndex + 1);
                    if (method == "load")
                    {
                        string result;
                        if (localStorage.ContainsKey(methodArg))
                            result = localStorage[methodArg];
                        else
                            result = "";
                        WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.Mobile.result = \"{0}\";", result));
                    }
                    else if (method == "store")
                    {
                        dotIndex = methodArg.IndexOf('.');
                        var k = methodArg.Substring(0, dotIndex);
                        var v = methodArg.Substring(dotIndex + 1);
                        localStorage[k] = v;
                    }
                    else
                        throw new Exception("Unknown method at localStorage.");
                }
                else
                    MessageBox.Show(string.Format("Failed to parse command '{0} ({1})'.", command, arg));
            }
            catch (Exception err)
            {
                MessageBox.Show(string.Format("Failed to parse command '{0} ({1})': {2}.", command, arg, err));
            }
        }

        private void PhoneApplicationPage_Loaded(object sender, RoutedEventArgs e)
        {
            LoadAllFiles();
            WB.Navigate(new Uri("index.html", UriKind.Relative));
        }

        private void LoadAllFiles()
        {
            using (var storage = IsolatedStorageFile.GetUserStoreForApplication())
            {
                try { storage.DeleteDirectory("www"); }
                catch { }
                storage.CreateDirectory("www");

                var dirs = new List<string>();
                var files = new List<string>();

                using (var sr = Application.GetResourceStream(new Uri("fileListing.txt", UriKind.Relative)).Stream)
                {
                    var bytes = new byte[sr.Length];
                    sr.Read(bytes, 0, (int)sr.Length);
                    var list = new String(bytes.Select(x => (char)x).ToArray());

                    while (true)
                    {
                        var index = list.IndexOf('\r');
                        if (index == 0)
                        {
                            list = list.Substring(2);
                            break;
                        }
                        dirs.Add(list.Substring(0, index));
                        list = list.Substring(index + 2);
                    }

                    while (true)
                    {
                        var index = list.IndexOf('\r');
                        if (index == 0)
                        {
                            list = list.Substring(2);
                            break;
                        }
                        files.Add(list.Substring(0, index));
                        list = list.Substring(index + 2);
                    }

                    foreach (var d in dirs)
                        storage.CreateDirectory("www" + d);

                    foreach (var f in files)
                        try
                        {
                            LoadFile(storage, "www" + f);
                        }
                        catch { }
                }
            }
        }

        private void LoadFile(IsolatedStorageFile storage, string file)
        {
            using (var sw = storage.OpenFile(file, System.IO.FileMode.OpenOrCreate))
            using (var sr = Application.GetResourceStream(new Uri(file, UriKind.Relative)).Stream)
            {
                var bytes = new byte[100];
                var noBytes = 0;
                noBytes = sr.Read(bytes, 0, 100);
                while (noBytes > 0)
                {
                    sw.Write(bytes, 0, noBytes);
                    noBytes = sr.Read(bytes, 0, 100);
                }
            }
        }
    }
}