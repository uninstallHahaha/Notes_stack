using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
    /// showList.xaml 的交互逻辑
    /// </summary>
    public partial class showListByData : Window
    {
        public showListByData()
        {
            InitializeComponent();
        }

        //使用 ObservableCollection 类型列表, 在列表数据更新时, 与其绑定的 UI元素 内容随之改变
        ObservableCollection<Product> ps;

        //假装该方法在Dao层的类中
        public ObservableCollection<Product> GetProducts()
        {
            ps = new ObservableCollection<Product>();
            //假装此处访问数据库加载数据
            ps.Add(new Product(1, "weapon", 99.99));
            ps.Add(new Product(2, "apple", 9.09));
            ps.Add(new Product(3, "iphone", 9999.9));
            ps.Add(new Product(4, "ipad", 1399.99));
            ps.Add(new Product(5, "benz", 13599.9));
            return ps;
        }

        //按钮点击加载数据到 ItemsSource
        private void waveButton_Click(object sender, RoutedEventArgs e)
        {
            var ps = GetProducts();
            this.nameList.ItemsSource = ps;
        }

        //删除选中项
        private void btn_del(object sender, RoutedEventArgs e)
        {
            //删除选中项, 同时 ui会自动更新
            ps.Remove(this.nameList.SelectedItem as Product);
        }


    }

    public class Product
    {
        public int id { get; set; }
        public string name { get; set; }
        public double price { get; set; }
        public Product(int id, string name, double price)
        {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }
}
