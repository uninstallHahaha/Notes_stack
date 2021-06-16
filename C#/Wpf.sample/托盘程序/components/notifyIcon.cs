using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace WpfDemo.components
{
    public partial class notifyIcon : Component
    {

        //新建主页面实例
        private testWindowWithNotify win = new testWindowWithNotify();
        public notifyIcon()
        {
            InitializeComponent();
            //给右键菜单项添加点击事件
            this.open.Click += Open_Click;
            this.exit.Click += Exit_Click;
            //显示主页面
            win.Show();
        }

        private void Exit_Click(object sender, EventArgs e)
        {
            //关闭窗口
            System.Windows.Application.Current.Shutdown();
        }

        private void Open_Click(object sender, EventArgs e)
        {
            win.WindowState = WindowState.Normal;
            win.ShowInTaskbar = true;
        }

        public notifyIcon(IContainer container)
        {
            container.Add(this);

            InitializeComponent();
        }
    }
}
