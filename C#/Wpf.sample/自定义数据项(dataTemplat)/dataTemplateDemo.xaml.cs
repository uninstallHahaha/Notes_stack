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
    /// dataTemplateDemo.xaml 的交互逻辑
    /// </summary>
    public partial class dataTemplateDemo : Window
    {
        public dataTemplateDemo()
        {
            InitializeComponent();

            List<Student> stus = new List<Student>();
            stus.Add(new Student("alice", 18));
            stus.Add(new Student("elcen", 20));
            stus.Add(new Student("vlice", 22));
            this.dg.ItemsSource = stus;

            List<Coolr> clrs = new List<Coolr>();
            clrs.Add(new Coolr("#ff0324"));
            clrs.Add(new Coolr("#dde244"));
            clrs.Add(new Coolr("#fe03f4"));
            this.cbx.ItemsSource = clrs;
        }
    }

    class Coolr
    {
        public Coolr(string code)
        {
            this.code = code;
        }
        public string code { get; set; }
    }

    class Student
    {

        public Student(string name, int age)
        {
            this.name = name;
            this.age = age;
        }
        public string name { get; set; }
        public int age { get; set; }
    }
}
