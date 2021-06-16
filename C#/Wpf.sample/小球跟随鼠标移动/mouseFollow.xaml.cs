using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WpfDemo
{
    /// <summary>
    /// mouseFollow.xaml 的交互逻辑
    /// </summary>
    public partial class mouseFollow : Window
    {
        public mouseFollow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            //300秒刷新一次小球运动方向
            Timer timer = new Timer();
            timer.Interval = 300;
            timer.Elapsed += refreshBallOrient;
            timer.Start();
        }

        private void refreshBallOrient(object sender, ElapsedEventArgs e)
        {
            //使用invoke刷新UI
            Dispatcher.Invoke(new Action(() =>
            {
                //获取鼠标位置并转换为vector
                Point mousePoint = Mouse.GetPosition(this.mc);
                if (mousePoint.X < 0 || mousePoint.Y < 0)
                    mousePoint = new Point(0, 0);
                //获取小球左边并转换为vector, 然后与鼠标向量相减得到更新后的移动方向
                Vector mouseVector = Vector.Parse(mousePoint.ToString());
                Vector ballVector = Vector.Parse(this.ball.Center.ToString());
                Vector resVector = mouseVector - ballVector;
                if (resVector.Length < 10) return;
                resVector.Normalize();
                //新建point动画设置为无限移动, 步长为结果向量
                PointAnimation ani = new PointAnimation()
                {
                    Duration = TimeSpan.FromMilliseconds(300),
                    By = new Point(resVector.X * 20, resVector.Y * 20)
                };
                //执行动画
                this.ball.BeginAnimation(EllipseGeometry.CenterProperty, ani);
            }));

        }
    }
}
