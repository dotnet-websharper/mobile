using System.Windows;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;

namespace $safeprojectname$
{
    public partial class App : Application
    {
        public PhoneApplicationFrame RootFrame { get; private set; }

        public App()
        {
            InitializeComponent();
            RootFrame = new PhoneApplicationFrame();
            RootFrame.Navigated += (sender, args) =>
            {
                if (RootVisual != RootFrame)
                {
                    RootVisual = RootFrame;
                }
            };
        }
    }
}
