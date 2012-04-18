using System;
using System.Collections.Generic;
using System.Device.Location;
using System.IO;
using System.IO.IsolatedStorage;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using Microsoft.Devices.Sensors;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Tasks;

namespace IntelliFactory.WebSharper.WinPhone.Runtime
{
    /// <summary>
    /// Runtime support class for WebSharper mobile apps.
    /// </summary>
    public sealed class MobileApplication
    {
        private static String TAG = "MobileApplication";
        private WebBrowser browser;

        private MobileApplication(WebBrowser browser)
        {
            this.browser = browser;
        }

        /// <summary>
        /// Performs application initialization.
        /// </summary>
        public static void Initialize(Assembly assembly, WebBrowser browser)
        {
            try
            {
                var app = new MobileApplication(browser);
                Initialize(assembly);
                browser.ScriptNotify += (sender, args) =>
                {
                    app.OnUiThread(() =>
                    {
                        try
                        {
                            app.Notify(args.Value);
                        }
                        catch (Exception e)
                        {
                            Trace(e);
                            throw;
                        }
                    });
                };
                browser.IsGeolocationEnabled = true;
                browser.IsScriptEnabled = true;
                browser.Navigate(new Uri("index.html", UriKind.Relative));
            }
            catch (Exception e)
            {
                Trace(e);
                throw;
            }
        }

        #region COMMUNICATIONS

        private static void Trace(string text)
        {
            Log.TraceInfo(TAG, text);
        }

        private static void Trace(Exception e)
        {
            Log.TraceException(TAG, e);
        }

        private static void Trace(Notification n)
        {
            Log.Priority priority = Log.Priority.Debug;
            switch (n.Priority)
            {
                case "Error":
                    priority = Log.Priority.Error;
                    break;
                case "Warn":
                    priority = Log.Priority.Warn;
                    break;
                case "Info":
                    priority = Log.Priority.Info;
                    break;
            }
            Log.Trace(priority, n.Category, n.Text);
        }

        /// <summary>
        /// Represents JSON messages sent from WebSharper via
        /// window.external.notify.
        /// </summary>
        [DataContractAttribute]
        public class Notification
        {
            /// <summary>
            /// The category of a trace message (only applies to trace messages).
            /// </summary>
            [DataMember]
            public string Category { get; set; }

            /// <summary>
            /// The message type corresponding to a method call.
            /// </summary>
            [DataMember]
            public string MessageType { get; set; }

            /// <summary>
            /// The message type corresponding to a method call.
            /// </summary>
            [DataMember]
            public string Priority { get; set; }

            /// <summary>
            /// The text of the message.
            /// </summary>
            [DataMember]
            public string Text { get; set; }

            /// <summary>
            /// Unique identifier.
            /// </summary>
            [DataMember]
            public int UniqueId { get; set; }
        }

        /// <summary>
        /// Represents simple yes/no JSON messages sent to WebSharper.
        /// </summary>
        [DataContractAttribute]
        public class BooleanMessage
        {
            /// <summary>
            /// The boolean status.
            /// </summary>
            [DataMember]
            public bool Ok { get; set; }

            /// <summary>
            /// The unique identifier.
            /// </summary>
            [DataMember]
            public int UniqueId { get; set; }
        }

        /// <summary>
        /// Represents JSON error messages sent back to WebSharper.
        /// </summary>
        [DataContractAttribute]
        public class ErrorMessage
        {
            /// <summary>
            /// Unique identifier.
            /// </summary>
            [DataMember]
            public int UniqueId { get; set; }

            /// <summary>
            /// Error message.
            /// </summary>
            [DataMember]
            public string Error { get; set; }
        }

        /// <summary>
        /// Runs the specified action on UI thread.
        /// </summary>
        void OnUiThread(Action action)
        {
            if (browser.Dispatcher.CheckAccess())
            {
                action.Invoke();
            }
            else
            {
                browser.Dispatcher.BeginInvoke(action);
            }
        }

        /// <summary>
        /// Safe wrapper around browser.InvokeScript that does
        /// not crash if the current function is not available.
        /// </summary>
        private bool InvokeScript(string function, string message)
        {
            try
            {
                browser.InvokeScript(function, message);
                return true;
            }
            catch (Exception e)
            {
                Trace(e);
                return false;
            }
        }

        /// <summary>
        /// Serializes a message to JSON and sends it to the client.
        /// </summary>
        private void SendJson<T>(T message)
        {
            InvokeScript("OnWinPhoneMessage", Serialize(message));
        }

        /// <summary>
        /// Serializes an object to JSON.
        /// </summary>
        private string Serialize<T>(T message)
        {
            var s = new DataContractJsonSerializer(typeof(T));
            byte[] bytes;
            using (var outStream = new MemoryStream())
            {
                s.WriteObject(outStream, message);
                bytes = outStream.ToArray();
            }
            using (var reader = new StreamReader(new MemoryStream(bytes.ToArray(), false)))
            {
                return reader.ReadToEnd();
            }
        }

        /// <summary>
        /// Handles window.external.notify messages.
        /// </summary>
        public void Notify(string message)
        {
            try
            {
                if (message != "ping")
                {
                    var ser = new DataContractJsonSerializer(typeof(Notification));
                    using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(message)))
                    {
                        var notification = (Notification)ser.ReadObject(stream);
                        switch (notification.MessageType)
                        {
                            case "Trace":
                                Trace(notification);
                                break;
                            case "StartAccelerometer":
                                StartAccelerometer();
                                break;
                            case "StopAccelerometer":
                                StopAccelerometer();
                                break;
                            case "TakePicture":
                                TakePicture(notification.UniqueId);
                                break;
                            case "HasGeolocator":
                                HasGeolocator(notification.UniqueId);
                                break;
                            case "GetLocation":
                                GetLocation(notification.UniqueId);
                                break;
                            default:
                                Log.TraceWarning(TAG, "Unknown message type: {0}", notification.MessageType);
                                break;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Trace(e);
            }
        }

        #endregion

        #region ACCELEROMETER

        private Accelerometer accelerometer;

        /// <summary>
        /// Represents JSON messages sent back to the client
        /// when an acceleration change is detected.
        /// </summary>
        [DataContractAttribute]
        public class AccelerationChangedMessage
        {

            /// <summary>
            /// The X coordinate.
            /// </summary>
            [DataMember]
            public double X { get; set; }

            /// <summary>
            /// The Y coordinate.
            /// </summary>
            [DataMember]
            public double Y { get; set; }

            /// <summary>
            /// The Z coordinate.
            /// </summary>
            [DataMember]
            public double Z { get; set; }
        }

        /// <summary>
        /// Starts measuring acceleration.
        /// </summary>
        private void StartAccelerometer()
        {
            if (accelerometer == null)
            {
                try
                {
                    accelerometer = new Accelerometer();
                }
                catch (SensorFailedException e)
                {
                    Trace(e);
                }
                if (accelerometer != null)
                {
                    accelerometer.CurrentValueChanged += (sender, reading) =>
                    {
                        OnUiThread(() =>
                        {
                            var a = reading.SensorReading.Acceleration;
                            var msg = new AccelerationChangedMessage { X = a.X, Y = a.Y, Z = a.Z };
                            if (!InvokeScript("OnWinPhoneAccelerationChange", Serialize(msg)))
                            {
                                StopAccelerometer();
                            };
                        });
                    };
                    accelerometer.Start();
                }
            }
        }

        /// <summary>
        /// Stops measuring acceleration, frees resources.
        /// </summary>
        private void StopAccelerometer()
        {
            if (accelerometer != null)
            {
                accelerometer.Dispose();
                accelerometer = null;
            }
        }

        #endregion

        #region GEOLOCATOR

        /// <summary>
        /// Tests if geolocation is supported.
        /// </summary>
        private void HasGeolocator(int uid)
        {
            using (var geo = new GeoCoordinateWatcher())
            {
                SendJson(new BooleanMessage
                {
                    UniqueId = uid,
                    Ok = geo.Status != GeoPositionStatus.Disabled
                });
            }
        }

        /// <summary>
        /// Determines the current geographical location.
        /// </summary>
        private void GetLocation(int uid)
        {
            var geo = new GeoCoordinateWatcher();
            geo.StatusChanged += (sender, args) =>
            {
                OnUiThread(() =>
                {
                    if (geo.Status == GeoPositionStatus.Ready)
                    {
                        var coord = geo.Position.Location;
                        var msg =
                            coord.IsUnknown
                            ? new GeoLocationMessage
                            {
                                UniqueId = uid,
                                IsKnown = false
                            }
                            : new GeoLocationMessage
                            {
                                UniqueId = uid,
                                Latitude = coord.Latitude,
                                Longitude = coord.Longitude,
                                IsKnown = true
                            };
                        SendJson(msg);
                        geo.Dispose();
                    }
                });
            };
            geo.Start(false);
        }

        /// <summary>
        /// Represents JSON messages sent back to the client
        /// responding with the current geographical location.
        /// </summary>
        [DataContractAttribute]
        public class GeoLocationMessage
        {
            /// <summary>
            /// Unique identifier.
            /// </summary>
            [DataMember]
            public int UniqueId { get; set; }

            /// <summary>
            /// Indicates whether the location is known. Otherwise coordinates are 0.0.
            /// </summary>
            [DataMember]
            public bool IsKnown { get; set; }

            /// <summary>
            /// Geographical latitude, or 0.0.
            /// </summary>
            [DataMember]
            public double Latitude { get; set; }

            /// <summary>
            /// Geographical longitude, or 0.0.
            /// </summary>
            [DataMember]
            public double Longitude { get; set; }
        }

        #endregion

        #region CAMERA

        /// <summary>
        /// Represents JSON messages sent back to the client
        /// upon taking a photo.
        /// </summary>
        [DataContractAttribute]
        public class PhotoMessage
        {
            /// <summary>
            /// Unique identifier.
            /// </summary>
            [DataMember]
            public int UniqueId { get; set; }

            /// <summary>
            /// Encoded JPEG data.
            /// </summary>
            [DataMember]
            public string Jpeg { get; set; }
        }

        private void TakePicture(int uid)
        {
            var photoTask = new PhotoChooserTask { ShowCamera = true };
            photoTask.Completed += (sender, args) =>
            {
                OnUiThread(() =>
                {
                    if (args.TaskResult == TaskResult.OK)
                    {
                        var size = (int)args.ChosenPhoto.Length;
                        var bytes = new byte[size];
                        args.ChosenPhoto.Read(bytes, 0, size);
                        SendJson(new PhotoMessage
                        {
                            UniqueId = uid,
                            Jpeg = ExtendedAsciiEncoding.GetString(bytes)
                        });
                    }
                    else
                    {
                        Log.TraceWarning(TAG, "Failed to take a picture");
                        SendJson(new ErrorMessage
                        {
                            UniqueId = uid,
                            Error = "Failed to take a picture"
                        });
                    }
                });
            };
            photoTask.Show();
        }

        #endregion

        #region FILES

        /// <summary>
        /// Reads Mobile.pkg embedded resource and populates the isolated storage.
        /// </summary>
        private static void Initialize(Assembly assembly)
        {
            var resourceName =
                assembly.GetManifestResourceNames()
                    .First(x => x.Contains("Mobile.pkg"));
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                using (var storage = IsolatedStorageFile.GetUserStoreForApplication())
                {
                    FilePackage
                        .ReadBinary(stream)
                        .WriteToIsolatedStorage(storage, "");
                }
            }
        }

        #endregion
    }
}
