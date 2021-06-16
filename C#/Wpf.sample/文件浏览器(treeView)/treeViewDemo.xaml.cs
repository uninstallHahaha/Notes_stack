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
using System.IO;

namespace WpfDemo
{
    /// <summary>
    /// treeViewDemo.xaml 的交互逻辑
    /// </summary>
    public partial class treeViewDemo : Window
    {
        public treeViewDemo()
        {
            InitializeComponent();
        }

        //节点被展开事件, 动态加载子节点
        private void tree_Expanded(object sender, RoutedEventArgs e)
        {
            TreeViewItem item = (TreeViewItem)e.OriginalSource;
            item.Items.Clear();
            //用来接收当前的目录路径
            DirectoryInfo dire;
            if (item.Tag is DriveInfo)
            {
                //如果当前被展开的节点是驱动器节点, 就转换为目录路径信息
                DriveInfo d = (DriveInfo)item.Tag;
                dire = d.RootDirectory;

            }
            else
            {
                //如果被点击的节点就是文件夹节点
                dire = (DirectoryInfo)item.Tag;
            }
            //添加子文件夹为子节点, 且还可以继续展开
            foreach (DirectoryInfo subDire in dire.GetDirectories())
            {
                TreeViewItem i = new TreeViewItem()
                {
                    Tag = subDire,
                    Header = subDire.ToString()
                };
                //添加一个节点使得显示下拉箭头
                i.Items.Add(new TreeViewItem() { Header = "*" });
                //添加到被点击的节点中作为子节点
                item.Items.Add(i);
            }
            //添加文件为子节点, 不可继续展开
            foreach (FileInfo f in dire.GetFiles())
            {
                TreeViewItem i = new TreeViewItem()
                {
                    Tag = f,
                    Header = f.ToString()
                };
                //添加到被点击的节点中作为子节点
                item.Items.Add(f);
            }
        }

        //页面加载后加载treeview的根节点
        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            //DriveInfo为驱动器对象, 先获取驱动器列表加到tree中做为根节点
            foreach (DriveInfo d in DriveInfo.GetDrives())
            {
                TreeViewItem item = new TreeViewItem();
                item.Tag = d;
                item.Header = d.ToString();
                //给根节点添加一个子节点是为了使其有子项, 因而显示下拉箭头, 具体的子项在tree_Expanded事件中动态加载
                item.Items.Add(new TreeViewItem() { Header = "*" });
                this.tree.Items.Add(item);
            }
        }


    }
}
