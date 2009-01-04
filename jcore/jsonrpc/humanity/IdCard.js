{
    check : function(input, sex, birthday, empty){
      if(false == empty){
        if(Utils.isStrEmpty(input.value)){
          alert("身份证号码录入的数据不能为空" );
          input.select();
	      return false;
        }
      }
      input.value = Utils.trim(input.value).replace(/[^\dX]/g,"");
      if(true == empty && Utils.isStrEmpty(input.value))return true;
      if (15 == Utils.trim(input.value).length)
        IdCard.check15(input, sex, birthday);
      else if (18 == Utils.trim(input.value).length){
        IdCard.check18(input, sex, birthday);
      } else {
        alert("身份证号码长度错误！");
        input.select();
        return false;
      } 
      return true;
    },
    
    check18 : function(input, sex, birthday){
      var year,month,day,date; 
      year = input.value.substr(6,4);
	  month= input.value.substr(10,2);
	  day  = input.value.substr(12,2);
      if(!Utils.isDateNumberFormat(month,day,year)){
        alert("身份证号码日期部分错误！"+year+"-"+month+"-"+day);
        input.select();
        return false;
      }
      var tmp = input.value.replace(/\d/gmi,"");
      if (!("" == tmp || "X" == tmp)){
        alert("输入的身份证中有不合法的字符!");
	    input.select();
	    return false;
      }
      if (!IdCard.upgrade(input.value)){
        alert("输入的身份证校验位不合法!!!");
	    input.select();
	    return false;        
      }
      date = year+"-"+month+"-"+day;
      if(Utils.isNotNull(birthday)) birthday.value = date;
      if(Utils.isNotNull(sex)){ 
        if (input.value.substr(16,1)%2==1)
	      sex.value="1";
	    if (input.value.substr(16,1)%2==0)
	      sex.value="2";
      } 
      return true;
    },
    
    check15 : function(input, sex, birthday){
      var year,month,day,date; 
      year = "19" + input.value.substr(6,2);
	  month = input.value.substr(8,2);
	  day  = input.value.substr(10,2);
      if(!Utils.isDateNumberFormat(month,day,year)){
        alert("身份证号码日期部分错误！"+year+"-"+month+"-"+day);
        input.select();
        return false;
      }
      date = year+"-"+month+"-"+day;
      if(Utils.isNotNull(birthday)) birthday.value = date;
      if(Utils.isNotNull(sex)){ 
        if (input.value.substr(14,1)%2==1)
	      sex.value="1";
	    if (input.value.substr(14,1)%2==0)
	      sex.value="2";
      } 
      input.value = IdCard.upgrade(input.value);    
      return true;
    },
    
    upgrade : function(szStr){
      var s = szStr, b15 = false;
	  s = Utils.trim(s);
	  if(15 == s.length)
	    b15=true,s = s.substr(0,6) + '19' + s.substr(6);
	  var wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
	  var m  = ['1','0','X','9','8','7','6','5','4','3','2'];
	  var nSum = 0;
	  for(var i = 0; i < 17; i++)
	    nSum += wi[i] * s.substr(i,1);
	  if(b15)
	    return s + m[nSum % 11];
	  else
	    return s.substr(17,1) == m[nSum % 11];
    }  
  }