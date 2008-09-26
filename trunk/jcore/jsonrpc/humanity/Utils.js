{
  //去除字符串左边的空格
  ltrim : function(s){
    for(var i=0;i<s.length;i++)
      if(s.charAt(i)!= " ")
        return s.substring(i,s.length);
    return "";
  },
  //去除字符串右边的空格
  rtrim : function(s){
    for(var i=s.length-1;i>=0;i--)
      if(s.charAt(i) != " ")
        return s.substring(0,i+1);
    return "";    
  },
  //去除字符串左边和右边的空格
  trim : function(s){
    return Utils.rtrim(Utils.ltrim(s));
  },
  //检查字符串是否为空
  isStrEmpty : function(s){
    return s == "" || s.length == 0;
  },
  //判断组件是否是非空,如果是非空则返回true
  isNotNull : function(o){
    return null != o && "object" == typeof o;
  },
  //录入的数据为月 日 年
  isDateNumberFormat : function(M, D, Y){
    Months= [31,28,31,30,31,30,31,31,30,31,30,31];
    Leap = false;
    if((Y % 4 == 0) && ((Y % 100 != 0) || (Y %400 == 0)))
        Leap = true;
    if((D < 1) || (D > 31) || (M < 1) || (M > 12) || (Y < 0))
        return(false);
    if((D > Months[M-1]) && !((M == 2) && (D > 28)))
        return(false);
    if(!(Leap) && (M == 2) && (D > 28))
        return(false);
    if((Leap) && (M == 2) && (D > 29))
        return(false);
    return true;
  }
}