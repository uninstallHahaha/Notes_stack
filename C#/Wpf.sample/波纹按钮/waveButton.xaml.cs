using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Automation.Peers;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfControlLibrary
{
    /// <summary>
    /// waveButton.xaml 的交互逻辑
    /// </summary>
    public partial class waveButton : Button
    {
        public waveButton()
        {
            InitializeComponent();
        }

        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            Point mousepoint = Mouse.GetPosition(this);
            DoubleAnimation rAni = new DoubleAnimation()
            {
                From = 0,
                To = Math.Sqrt(this.ActualHeight * this.ActualHeight + this.ActualWidth * this.ActualWidth),
                Duration = TimeSpan.FromSeconds(0.3)
            };
            EllipseGeometry ball = Template.FindName("ball", this) as EllipseGeometry;
            Path ballPath = Template.FindName("ballPath", this) as Path;

            ball.Center = mousepoint;
            ball.BeginAnimation(EllipseGeometry.RadiusXProperty, rAni);

            DoubleAnimation oAni = new DoubleAnimation()
            {
                From = 0.3,
                To = 0,
                Duration = TimeSpan.FromSeconds(0.3)
            };
            ballPath.BeginAnimation(Path.OpacityProperty, oAni);
        }
    }
}
