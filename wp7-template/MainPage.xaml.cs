﻿using System;
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

    public partial class MainPage : PhoneApplicationPage
    {
        Accelerometer accelerometer;
        double aX = 0, aY = 0, aZ = -9.8;
        GeoCoordinateWatcher geoWatcher;
        Dictionary<string, string> localStorage = new Dictionary<string, string>();
        Dispatcher ui = null;
        CookieContainer cookieContainer = new CookieContainer();

        public MainPage()
        {
            InitializeComponent();
            geoWatcher = new GeoCoordinateWatcher();
            try
            {
                geoWatcher.Start();
            }
            catch (AccelerometerFailedException e)
            {
                Debug.WriteLine("Exception in native layer: Could not start geolocation tracking: " + e.ToString());
            }
            accelerometer = new Accelerometer();
            accelerometer.ReadingChanged += new EventHandler<AccelerometerReadingEventArgs>(accelerometer_ReadingChanged);
            try
            {
                accelerometer.Start();
            }
            catch (AccelerometerFailedException e)
            {
                Debug.WriteLine("Exception in native layer: Could not start accelerometer: " + e.ToString());
            }
            ui = Deployment.Current.Dispatcher;
        }

        void accelerometer_ReadingChanged(object sender, AccelerometerReadingEventArgs e)
        {
            aX = e.X;
            aY = e.Y;
            aZ = e.Z;
        }

        private void ReturnException(string callback, Exception e)
        {
            ui.BeginInvoke(delegate
            {
                WB.InvokeScript("eval",
                    string.Format("{0}.call(null,IntelliFactory.WebSharper.Runtime.NewError(\"Exception\",\"{1}\"))",
                        callback.Replace('@', '.'), Uri.EscapeDataString(e.Message)));
            });
        }

        private HttpWebRequest CallAjax(string methodArg, Action<CookieCollection, string, string> callback)
        {
            try
            {
                var args = methodArg.Split('.');
                var uri = args[0].Replace('#', ',').Replace('@', '.');
                var headers = ParsePairsArray(args[1]);
                var cookies = ParsePairsArray(args[2]);
                var content = args[3].Replace('#', ',').Replace('@', '.');
                var callbackF = args[4];
                HttpWebRequest wr = HttpWebRequest.CreateHttp(uri);
                foreach (var p in headers)
                    try
                    {
                        wr.Headers[p[0]] = p[1];
                    }
                    catch (System.ArgumentException) { }
                var uriHost = new Uri(uri);
                foreach (var c in cookies)
                    try
                    {
                        var cookie = new Cookie(c[0], c[2]);
                        cookie.Expires = DateTime.Parse(c[1]);
                        cookieContainer.Add(uriHost, cookie);
                    }
                    catch (FormatException) { }
                wr.CookieContainer = cookieContainer;
                wr.ContentType = "application/x-www-form-urlencoded";
                wr.Method = "POST";
                wr.BeginGetRequestStream(ac1 =>
                {
                    try
                    {
                        using (var sw = new StreamWriter(wr.EndGetRequestStream(ac1)))
                            sw.Write(content);
                        var wr2 = (HttpWebRequest)ac1.AsyncState;
                        wr2.BeginGetResponse(new AsyncCallback(ac2 =>
                        {
                            try
                            {
                                var request = (HttpWebRequest)ac1.AsyncState;
                                if (request.HaveResponse)
                                {
                                    var response = request.EndGetResponse(ac2);
                                    using (var sr = new StreamReader(response.GetResponseStream()))
                                    {
                                        var result = sr.ReadToEnd();
                                        var httpresponse = (HttpWebResponse)response;
                                        callback(cookieContainer.GetCookies(httpresponse.ResponseUri), callbackF, result);
                                    }
                                }
                                else
                                    throw new Exception("No response to AJAX call.");
                            }
                            catch (Exception err)
                            {
                                ReturnException(methodArg.Split('.')[4], err);
                                throw err;
                            }
                        }), wr2);
                    }
                    catch (Exception err)
                    {
                        ReturnException(methodArg.Split('.')[4], err);
                        throw err;
                    }
                }, wr);
                return wr;
            }
            catch (Exception err)
            {
                ReturnException(methodArg.Split('.')[4], err);
                throw err;
            }
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
                                WB.InvokeScript("eval",
                                    string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = ({{ $ : 1, $0 : \"{0}\" }});", sr.ReadLine()));
                        else
                            WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = ({{ $ : 0 }});"));
                }
                else if (command == "ajax")
                {
                    dotIndex = arg.IndexOf('.');
                    try
                    {
                        CallAjax(arg, (cookies, callback, result) =>
                          {
                              ui.BeginInvoke(() =>
                              {
                                  if (cookies != null)
                                  {
                                      foreach (var i in cookies)
                                      {
                                          var c = (Cookie)i;
                                          var code =
                                              string.Format("document.cookie = \"{0}={1}; expires=\" + new Date({2}).toGMTString();", c.Name, c.Value,
                                                c.Expires.ToString("yyyy, MM, dd HH, mm, ss, 0"));
                                          WB.InvokeScript("eval", code);
                                      }
                                  }
                                  else
                                      MessageBox.Show("No cookies.");
                                  var evalArg = string.Format("{0}.call(null,JSON.stringify({1}))", callback.Replace('@', '.'), result);
                                  WB.InvokeScript("eval", evalArg);
                              });
                          });
                    }
                    catch (Exception err)
                    {
                        ReturnException(arg.Split('.')[4], err);
                    }
                }
                else if (command == "alert")
                    MessageBox.Show(arg);
                else if (command == "log")
                    Debug.WriteLine(arg);
                else if (command == "location")
                    WB.InvokeScript("eval",
                        string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = ({{ Lat : {0}, Long : {1} }});",
                            geoWatcher.Position.Location.Latitude, geoWatcher.Position.Location.Longitude));
                else if (command == "acceleration")
                    WB.InvokeScript("eval", string.Format("IntelliFactory.WebSharper.Mobile.WP7.result = ({{ X : {0},   Y : {1},   Z : {2} }});",
                                                                                                            aX * 9.81, aY * 9.81, aZ * 9.81));
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
                                    var result = String.Join("", bytes.Select(x => x.ToString("X2")).ToArray());
                                    var evalArg = string.Format("{0}.call(null,\"{1}\")", callback.Replace('@', '.'), result);
                                    ui.BeginInvoke(() => WB.InvokeScript("eval", evalArg));
                                }
                                else throw new Exception("Could not access camera.");
                            }
                            catch (Exception err)
                            {
                                ReturnException(arg.Split('.')[1], err);
                            }
                        });
                        photoTask.Show();
                    }
                    catch (Exception err)
                    {
                        ReturnException(arg.Split('.')[1], err);
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
                MessageBox.Show(string.Format("Failed to parse command '{0}': {1}.", command, err));
            }
        }

        private IEnumerable<string[]> ParsePairsArray(string input)
        {
            foreach (var i in input.Split(','))
                yield return i.Split(';').Select(s => s.Replace('#', ',').Replace('@', '.')).ToArray();
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
                if (storage.DirectoryExists("www"))
                    storage.DeleteDirectory("www");

                storage.CreateDirectory("www");

                var dirs = new List<string>();
                var files = new List<string>();

                using (var sr = new StreamReader(Application.GetResourceStream(new Uri("fileListing.txt", UriKind.Relative)).Stream))
                {
                    while (true)
                    {
                        var line = sr.ReadLine();
                        if (line == "") break;
                        dirs.Add(line);
                    }

                    while (true)
                    {
                        if (sr.EndOfStream) break;
                        var line = sr.ReadLine();
                        if (line == "") break;
                        files.Add(line);
                    }

                    foreach (var d in dirs)
                        storage.CreateDirectory("www" + d);

                    foreach (var f in files)
                        try
                        {
                            LoadFile(storage, "www" + f);
                        }
                        catch { } // please check
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