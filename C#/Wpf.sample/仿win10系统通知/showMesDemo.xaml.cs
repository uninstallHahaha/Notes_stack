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
    /// showMesDemo.xaml 的交互逻辑
    /// </summary>
    public partial class showMesDemo : Window
    {
        public showMesDemo()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var mesWin = new messageDemo()
            {
                message = this.mesBox.Text
            };
            mesWin.Show();
        }
    }
}
