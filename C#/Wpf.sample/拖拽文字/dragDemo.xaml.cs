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
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WpfDemo
{
    /// <summary>
    /// dragDemo.xaml 的交互逻辑
    /// </summary>
    public partial class dragDemo : Window
    {
        public dragDemo()
        {
            InitializeComponent();
        }

        //拖放源控件的鼠标按下事件
        private void Label_MouseDown(object sender, MouseButtonEventArgs e)
        {
            Label lb = (Label)sender;
            //进入拖放状态, 设置拖放内容为当前label的content属性值, 设置拖放模式为将content复制过去
            DragDrop.DoDragDrop(lb, lb.Content, DragDropEffects.Copy);
        }

        //接收拖放内容
        private void Label_Drop(object sender, DragEventArgs e)
        {
            //接收拖放内容, 直接替换本控件的content值
            ((Label)sender).Content = e.Data.GetData(DataFormats.Text);
        }
    }
}
