using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using WpfDemo.components;

namespace WpfDemo
{
    /// <summary>
    /// App.xaml 的交互逻辑
    /// </summary>
    public partial class App : Application
    {
        protected override void OnSessionEnding(SessionEndingCancelEventArgs e)
        {
            base.OnSessionEnding(e);
            //设置取消注销系统
            e.Cancel = true;
            MessageBox.Show("拒绝注销");
        }

        private void Application_NavigationFailed(object sender, System.Windows.Navigation.NavigationFailedEventArgs e)
        {

        }

        //前提得先删除 Application 中 startupUri 设置
        //创建自定义的 notifyIcon 字段
        private notifyIcon nf;
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            //启动时初始化 notifyIcon 实例
            this.ShutdownMode = ShutdownMode.OnExplicitShutdown;
            nf = new notifyIcon();
        }
        protected override void OnExit(ExitEventArgs e)
        {
            base.OnExit(e);
            //退出程序时回收 notifyIcon 实例
            this.nf.Dispose();
        }
    }
}
