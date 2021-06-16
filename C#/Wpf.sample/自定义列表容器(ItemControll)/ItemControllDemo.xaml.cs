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
    /// ItemControllDemo.xaml 的交互逻辑
    /// </summary>
    public partial class ItemControllDemo : Window
    {
        public ItemControllDemo()
        {
            InitializeComponent();

            List<Txt> ts = new List<Txt>();
            ts.Add(new Txt("alice"));
            ts.Add(new Txt("alisf"));
            ts.Add(new Txt("avsue"));
            //指定自定义itemControll的数据源
            this.mic.ItemsSource = ts;
        }
    }

    class Txt
    {
        public Txt(string t)
        {
            this.txt = t;
        }
        public string txt { get; set; }
    }
}
