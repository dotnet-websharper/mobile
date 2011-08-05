using System;
using System.Collections.Generic;
using System.Device.Location;
using System.Diagnostics;
using System.IO.IsolatedStorage;
using System.Linq;
using System.Windows;
using Microsoft.Devices.Sensors;
using Microsoft.Phone.Controls;
using System.IO;
using System.Net;
using System.Windows.Threading;
using System.Threading;
using Microsoft.Phone.Tasks;
using System.Windows.Media.Imaging;

namespace WebSharperMobileWP7EmptyApp
{
    public static class MyExtensions
    {
        public static string safeSubstring(this string str, int from, int to = -1)
        {
            try
            {
                if (to > -1)
                    return str.Substring(from, to);
                else
                    return str.Substring(from);
            }
            catch (Exception e)
            {
                MessageBox.Show(string.Format("Failed to substring: {0} from {1} to {2}", str, from, to));
                throw e;
            }
        }
    }

    struct KeyValueTuple
    {
        public string key;
        public string value;
    }

    public partial class MainPage : PhoneApplicationPage
    {
        Accelerometer accelerometer;
        double aX = 0, aY = 0, aZ = -9.8;
        GeoCoordinateWatcher geoWatcher;
        Dictionary<string, string> localStorage = new Dictionary<string, string>();
        Dispatcher ui = null;

        public MainPage()
        {
            InitializeComponent();
            geoWatcher = new GeoCoordinateWatcher();
            geoWatcher.Start();
            accelerometer = new Accelerometer();
            accelerometer.ReadingChanged += new EventHandler<AccelerometerReadingEventArgs>(accelerometer_ReadingChanged);
            try
            {
                accelerometer.Start();
            }
            catch { }
            ui = Deployment.Current.Dispatcher;
        }

        void accelerometer_ReadingChanged(object sender, AccelerometerReadingEventArgs e)
        {
            aX = e.X;
            aY = e.Y;
            aZ = e.Z;
        }

        private HttpWebRequest CallAjax(string methodArg, Action<string, string> callback)
        {
            var args = methodArg.Split('.');
            var uri = args[0].Replace('@', '.');
            var headers = ParseHeadersArray(args[1]);
            var content = args[2].Replace('@', '.');
            var callbackF = args[3];
            HttpWebRequest wr = HttpWebRequest.CreateHttp(uri);
            foreach (var p in headers)
                try
                {
                    wr.Headers[p.key] = p.value;
                }
                catch { }
            wr.ContentType = "application/x-www-form-urlencoded";
            wr.Method = "POST";
            wr.BeginGetRequestStream(ac1 =>
            {
                using (var sw = new StreamWriter(wr.EndGetRequestStream(ac1)))
                    sw.Write(content);
                var wr2 = (HttpWebRequest)ac1.AsyncState;
                wr2.BeginGetResponse(new AsyncCallback(ac2 =>
                {
                    var request = (HttpWebRequest)ac1.AsyncState;
                    if (request.HaveResponse)
                    {
                        var response = request.EndGetResponse(ac2);
                        using (var sr = new StreamReader(response.GetResponseStream()))
                        {
                            var result = sr.ReadToEnd();
                            callback(callbackF, result);
                        }
                    }
                    else
                        throw new Exception("No response to AJAX call.");
                }), wr2);
            }, wr);
            return wr;
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
                if (command == "serverLocation")
                {
                    using (var storage = IsolatedStorageFile.GetUserStoreForApplication())
                        if (storage.FileExists("www\\serverLocation.txt"))
                            using (var sr = new StreamReader(storage.OpenFile("www\\serverLocation.txt", FileMode.Open)))
                                WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = ({{ $ : 1, $0 : \"{0}\" }});", sr.ReadLine()));
                        else
                            WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = ({{ $ : 0 }});"));
                }
                else if (command == "ajax")
                {
                    dotIndex = arg.IndexOf('.');
                    try
                    {
                        CallAjax(arg, (callback, result) =>
                          {
                              var evalArg = string.Format("{0}.call(null,JSON.stringify({1}))", callback.Replace('@', '.'), result);
                              ui.BeginInvoke(() => WB.InvokeScript("eval", evalArg));
                          });
                    }
                    catch (Exception err)
                    {
                        var args = arg.Split('.');
                        ui.BeginInvoke(() => WB.InvokeScript("eval", string.Format("{0}.call(null,\"{1}\")", args[4].Replace('@', '.'), err.ToString().Replace("\r", "").Replace("\n", ""))));
                    }
                }
                else if (command == "alert")
                    MessageBox.Show(arg);
                else if (command == "log")
                    Debug.WriteLine(arg);
                else if (command == "location")
                    WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = ({{ Lat : {0}, Long : {1} }});", geoWatcher.Position.Location.Latitude, geoWatcher.Position.Location.Longitude));
                else if (command == "acceleration")
                    WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = ({{ X : {0}, Y : {1}, Z : {2} }});", aX * 9.81, aY * 9.81, aZ * 9.81));
                else if (command == "camera")
                {
                    try
                    {
                        var args = arg.Split('.');
                        var maxWidth = int.Parse(args[0]);
                        var maxHeight = int.Parse(args[1]);
                        var callback = args[2];
                        var fail = args[3];
                        var photoTask = new PhotoChooserTask { ShowCamera = true };
                        photoTask.Completed += new EventHandler<PhotoResult>((psender, pr) =>
                        {
                            try
                            {
                                if (pr.TaskResult == TaskResult.OK)
                                {
                                    var bytes = new byte[(int)pr.ChosenPhoto.Length];
                                    pr.ChosenPhoto.Read(bytes, 0, (int)pr.ChosenPhoto.Length);
                                    /*// to bitmap // WritableBitMapExWindowsPhone
                                    BitmapImage imageSource;
                                    using (MemoryStream stream = new MemoryStream(bytes))
                                    {
                                        stream.Seek(0, SeekOrigin.Begin);
                                        BitmapImage b = new BitmapImage();
                                        b.SetSource(stream);
                                        imageSource = b;
                                    }
                                    // resize
                                    WriteableBitmap bitmap = new WriteableBitmap(imageSource);
                                    var maxRatio = (double)maxHeight / (double)maxWidth;
                                    var imageRatio = (double)bitmap.PixelHeight / (double)bitmap.PixelWidth;
                                    if (maxRatio > imageRatio)
                                    {
                                        if (maxWidth < bitmap.PixelWidth)
                                            bitmap.Resize(maxWidth, (int)(maxWidth * imageRatio), WriteableBitmapExtensions.Interpolation.Bilinear);
                                    }
                                    else
                                        if (maxHeight < bitmap.PixelHeight)
                                            bitmap.Resize((int)(maxHeight / imageRatio), maxHeight, WriteableBitmapExtensions.Interpolation.Bilinear);
                                    // to bytes
                                    bytes = bitmap.ToByteArray();*/
                                    // return
                                    var result = String.Join("", bytes.Select(x => x.ToString("X2")).ToArray());
                                    var evalArg = string.Format("{0}.call(null,\"{1}\")", callback.Replace('@', '.'), result);
                                    ui.BeginInvoke(() => WB.InvokeScript("eval", evalArg));
                                }
                                else throw new Exception("Could not access camera.");
                            }
                            catch (Exception err)
                            {
                                var evalArg = string.Format("{0}.call(null,\"{1}\")", arg.Split('.')[1].Replace('@', '.'), err.Message);
                                ui.BeginInvoke(() => WB.InvokeScript("eval", evalArg));
                            }
                        });
                        photoTask.Show();
                    }
                    catch (Exception err)
                    {
                        var evalArg = string.Format("{0}.call(null,\"{1}\")", arg.Split('.')[1].Replace('@', '.'), err.ToString().Replace("\r", "").Replace("\n", ""));
                        ui.BeginInvoke(() => WB.InvokeScript("eval", evalArg));
                    }
                }
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
                        WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = \"{0}\";", result));
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
                MessageBox.Show(string.Format("Failed to parse command '{0}': {2}.", command, arg, err)); // ({1})
            }
        }

        private IEnumerable<KeyValueTuple> ParseHeadersArray(string input)
        {
            if (input == "")
                yield break;
            var scIndex = input.IndexOf(';');
            var commaIndex = input.IndexOf(',');
            if (commaIndex > -1)
            {
                var tuple = new KeyValueTuple();
                tuple.key = input.safeSubstring(0, scIndex);
                tuple.value = input.safeSubstring(scIndex + 1, commaIndex - scIndex - 1).Replace('#', ',');
                yield return tuple;
                foreach (var k in ParseHeadersArray(input.safeSubstring(commaIndex + 1)))
                    yield return k;
            }
            else
            {
                var tuple = new KeyValueTuple();
                tuple.key = input.safeSubstring(0, scIndex);
                tuple.value = input.safeSubstring(scIndex + 1).Replace('@', '.').Replace('#', ',');
                yield return tuple;
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

                using (var sr = new StreamReader(Application.GetResourceStream(new Uri("fileListing.txt", UriKind.Relative)).Stream))
                {
                    var list = sr.ReadToEnd();

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
            using (var sw = new StreamWriter(storage.OpenFile(file, System.IO.FileMode.OpenOrCreate)))
            using (var sr = new StreamReader(Application.GetResourceStream(new Uri(file, UriKind.Relative)).Stream))
                sw.Write(sr.ReadToEnd());
        }
    }
}