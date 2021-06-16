using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Converters;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfControlLibrary
{
    /// <summary>
    /// colorPicker.xaml 的交互逻辑
    /// </summary>
    public partial class colorPicker : UserControl
    {
        public colorPicker()
        {
            InitializeComponent();
        }



        //color值
        public Color colValue
        {
            get { return (Color)GetValue(colValueProperty); }
            set { SetValue(colValueProperty, value); }
        }

        // Using a DependencyProperty as the backing store for colValue.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty colValueProperty =
            DependencyProperty.Register("colValue", typeof(Color), typeof(colorPicker), new PropertyMetadata(Color.FromArgb(255, 0, 0, 0),
                new PropertyChangedCallback(onColorChanged)));

        //color属性发生变化时
        private static void onColorChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var cp = d as colorPicker;
            Color oldValue = (Color)e.OldValue;
            Color newColor = (Color)e.NewValue;

            cp.redValue = newColor.R;
            cp.greenValue = newColor.G;
            cp.blueValue = newColor.B;
            //手动调用用户设置的事件函数
            cp.OnColorChangedRun(oldValue, newColor);
        }

        //单个颜色通道值变化时
        private static void onValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var cp = d as colorPicker;
            Color old = cp.colValue;
            if (e.Property == redValueProperty)
                old.R = (byte)e.NewValue;
            if (e.Property == greenValueProperty)
                old.G = (byte)e.NewValue;
            if (e.Property == blueValueProperty)
                old.B = (byte)e.NewValue;

            //更新colValue的值
            cp.colValue = old;
        }


        //red
        public byte redValue
        {
            get { return (byte)GetValue(redValueProperty); }
            set { SetValue(redValueProperty, value); }
        }
        public static readonly DependencyProperty redValueProperty =
            DependencyProperty.Register("redValue", typeof(byte), typeof(colorPicker),
                new PropertyMetadata((byte)0, new PropertyChangedCallback(onValueChanged)));

        //green
        public byte greenValue
        {
            get { return (byte)GetValue(greenValueProperty); }
            set { SetValue(greenValueProperty, value); }
        }
        public static readonly DependencyProperty greenValueProperty =
            DependencyProperty.Register("greenValue", typeof(byte), typeof(colorPicker),
                new PropertyMetadata((byte)0, new PropertyChangedCallback(onValueChanged)));


        //blue
        public byte blueValue
        {
            get { return (byte)GetValue(blueValueProperty); }
            set { SetValue(blueValueProperty, value); }
        }
        public static readonly DependencyProperty blueValueProperty =
            DependencyProperty.Register("blurValue", typeof(byte), typeof(colorPicker),
                new PropertyMetadata((byte)0, new PropertyChangedCallback(onValueChanged)));




        //自定义事件属性
        public static readonly RoutedEvent colorChangedEvent = EventManager.RegisterRoutedEvent(
                "ColorChanged",
                RoutingStrategy.Bubble,
                typeof(RoutedPropertyChangedEventHandler<Color>),
                typeof(colorPicker));
        //自定义事件.net属性
        public event RoutedPropertyChangedEventHandler<Color> ColorChanged
        {
            add { AddHandler(colorChangedEvent, value); }
            remove { RemoveHandler(colorChangedEvent, value); }
        }
        //调用用户定义的事件函数并传入参数
        public void OnColorChangedRun(Color oldValue, Color newValue)
        {
            RoutedPropertyChangedEventArgs<Color> args = new RoutedPropertyChangedEventArgs<Color>(oldValue, newValue);
            args.RoutedEvent = colorPicker.colorChangedEvent;
            RaiseEvent(args);
        }

    }
}
