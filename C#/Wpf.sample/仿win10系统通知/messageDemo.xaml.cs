using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Forms;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WpfDemo
{
    /// <summary>
    /// messageDemo.xaml 的交互逻辑
    /// </summary>
    public partial class messageDemo : Window
    {

        public string message { get; set; }

        public messageDemo()
        {
            InitializeComponent();
            //设置窗口出现位置
            this.Left = Screen.PrimaryScreen.WorkingArea.Width - this.Width;
            this.Top = Screen.PrimaryScreen.WorkingArea.Height - this.Height - 20;
        }

        //loaded
        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            //设置传递的文本
            this.tb.Text = message;
            BeginStoryboard(FindResource("start") as Storyboard);
        }

        //弹出后停留几秒
        private async void Storyboard_Completed(object sender, EventArgs e)
        {
            await Task.Delay(3000);
            BeginStoryboard(FindResource("end") as Storyboard);
        }

        //缩回后关闭窗口
        private void Storyboard_Completed_1(object sender, EventArgs e)
        {
            Close();
        }
    }
}
