using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
    /// ctlAniDemo.xaml 的交互逻辑
    /// </summary>
    public partial class ctlAniDemo : Window
    {
        public ctlAniDemo()
        {
            InitializeComponent();
        }

        //更新动画进度条
        private void stb_CurrentTimeInvalidated(object sender, EventArgs e)
        {
            Clock clk = (Clock)sender;
            if (clk.CurrentProgress == null)
                this.pb.Value = 0;
            else
                this.pb.Value = (double)clk.CurrentProgress;
        }
    }
}
