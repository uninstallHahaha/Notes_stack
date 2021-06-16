using System;
using System.Collections.Generic;
using System.Configuration.Assemblies;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WpfDemo
{
    /// <summary>
    /// driver.xaml 的交互逻辑
    /// </summary>
    public partial class driver : Window
    {
        //加载实例时设置第一帧时间点为0
        private TimeSpan lastTime = TimeSpan.Zero;
        public driver()
        {
            InitializeComponent();
            //每刷新一帧事件
            CompositionTarget.Rendering += frameRendering;

        }

        private void frameRendering(object sender, EventArgs e)
        {
            //从程序启动起到当前帧渲染的时间
            TimeSpan curFrameTime = ((RenderingEventArgs)e).RenderingTime;
            //渲染当前帧所用时间
            var deltaTime = (curFrameTime - lastTime);
            this.count.Text = "fps: " + (1d / deltaTime.TotalSeconds).ToString();
            //更新当前帧时间为lastTime值
            lastTime = curFrameTime;


            //方向变量
            var up = new Vector(0, 0);
            var left = new Vector(0, 0);

            //获取键盘输入
            if (Keyboard.IsKeyDown(Key.W))
                up.Y = -1;
            if (Keyboard.IsKeyDown(Key.S))
                up.Y = 1;
            if (Keyboard.IsKeyDown(Key.A))
                left.X = -1;
            if (Keyboard.IsKeyDown(Key.D))
                left.X = 1;
            var resOrient = up + left;
            if (resOrient.X == 0 && resOrient.Y == 0) return;
            resOrient.Normalize();
            this.oritent.Text = "orient: " + resOrient.X.ToString() + " , " + resOrient.Y.ToString();

            //转向
            var angle = Vector.AngleBetween(resOrient, new Vector(0, -1));
            this.rotateAngle.Angle = -angle;

            //移动
            var speed = 200;
            if (Keyboard.IsKeyDown(Key.J))
                speed = 400;

            var move = speed * deltaTime.TotalSeconds * resOrient;

            //限制边缘进行移动
            if (Canvas.GetTop(this.rect) + this.rect.ActualHeight + move.Y <= this.mc.ActualHeight &&
                Canvas.GetTop(this.rect) + move.Y >= 0)
                Canvas.SetTop(this.rect, Canvas.GetTop(this.rect) + move.Y);
            if (Canvas.GetLeft(this.rect) + this.rect.ActualWidth + move.X <= this.mc.ActualWidth &&
                Canvas.GetLeft(this.rect) + move.X >= 0)
                Canvas.SetLeft(this.rect, Canvas.GetLeft(this.rect) + move.X);

        }
    }
}
