{
  /* 去除字符串左边的空格 */
  ltrim : function(s){
    return (s || "").replace(/^\s*/g, "");
  },
  //去除字符串右边的空格
  rtrim : function(s){
    return (s || "").replace(/\s*$/g, "");
  },
  //去除字符串左边和右边的空格
  trim : function(s){
    return (s || "").replace(/(^\s*)|(\s*$)/g, "");
  },
  //检查字符串是否为空
  isStrEmpty : function(s){
    return !!s;
  },
  //判断组件是否是非空,如果是非空则返回true
  isNotNull : function(o){
    return !!o;
  },
  //录入的数据为月 日 年
  isDateNumberFormat : function(M, D, Y){
    var Months= [0,31,28,31,30,31,30,31,31,30,31,30,31],
        Leap = false, b2;
    if(this.isLeapYear(Y))
        Leap = true;
    if((D < 1) || (D > 31) || (M < 1) || (M > 12) || (Y < 0))
        return false;
    b2 = (M == 2) && (D > 28);
    if((D > Months[M]) && !(b2))
        return false;
    if(!Leap && b2)
        return false;
    if(Leap && (M == 2) && (D > 29))
        return false;
    return true
  }
}