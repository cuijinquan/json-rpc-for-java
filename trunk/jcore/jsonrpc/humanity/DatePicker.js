{
    dpIpt: null, /* 输入对象 */
    XuiDatePicker: null,  /* 显示日期的图层 */
    xuiDPRows: null, /* body */
    xuiCurYear:null, xuiSlctMY:null,
    slctM: 0, slctY: 0,
    year:0, month:0,day:0,
    dpMax: null, dpMin: null, /* 允许的最大年月日和最小的年月日 */
    pkData: [], /* 初始化一年的数据 */
    initPkData:function(nY, m, d)
    {
       var o = new Date(this.year = parseInt(nY, 10), (this.month = parseInt(m, 10)) - 1, 
           this.day = parseInt(d, 10));
       this.pkData = [31,(this.isLeapYear(nY) ? 29 : 28),31,30,31,30,31,31,30,31,30,31];
       return this;
    }, /* 设置当前的日期，并将上次的日期焦点去除 */
	setDate:function()
	{
	    var a = this.A(),b;
	    if(3 == a.length)a[3] = true;
	    /* 把上一个位置的css进行改变为普通的 */
	    if(this.year)
	       b = [this.year, this.month, this.day, false], 
	       this.year = this.month = this.day = 0,
	       this.setDate.apply(this, b);
	    
	    if(a[3])this.year = parseInt(a[0], 10),this.month = parseInt(a[1], 10),this.day = parseInt(a[2], 10);
	    
	    this.initPkData(this.year, this.month, this.day);
	},showXuiSlctMY: function(y)
	{
	   var o = this.xuiSlctMY, oTb = this.getByTagName("TABLE", o)[0], i, 
	       j, r, k = 4, p, oldY = this.year, yy = y || this.slctY || oldY,
	       y1 = this.slctY || oldY, m = this.slctM || this.month;
	   this.year = y || oldY;
	   this.oldYear = this.year; 
	   for(i = 0; i < oTb.rows.length; i++)
	   {
	      r = oTb.rows[i];
	      for(j = 0; j < r.cells.length; j++)
	      {
	         if(2 > j)
	         {
	            if(m == (i * 2 + (j + 1)))
	              this.addClass("x-date-mp-sel", r.cells[j]);
	            else this.delClass("x-date-mp-sel", r.cells[j]);
	         }
	         else if(0 < i && 1 < j)
	         {
	            this.getByTagName("A", r.cells[j])[0].innerHTML = p = (yy - k) + (j - 2) * 5;
	            if((r.cells[j].textContent || r.cells[j].innerText) == y1)this.addClass("x-date-mp-sel", r.cells[j]);
	            else this.delClass("x-date-mp-sel", r.cells[j]);
	         }
	      }
	      k--;
	   }	   
	   this.year = oldY;
	   o.style.display = "block";
	   this.dpIpt.focus();
	},slctOk:function() /* 选择Ok */
	{
	   this.year = this.slctY || this.year;
	   this.month = this.slctM || this.month;
	   this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
	   if(this.pkData[this.month - 1] < this.day)
	     this.day = this.pkData[this.month - 1];
	   this.addDate(0);
	   this.hiddenXuiSlctMY();
	}, slctMY: function(e, o) /* 选择年月 */
	{
	   var n = parseInt((o.textContent || o.innerText).replace(/\s/g, ""), 10);
	   o = this.p(o, "TD");
	   if(1 < o.cellIndex)
	     this.slctY = n;
	   else this.slctM = n;
	   
	   this.showXuiSlctMY(false);
	},hiddenXuiSlctMY: function() /* 隐藏选择年月图层 */
	{
	   this.xuiSlctMY.style.display = "none";
	   this.dpIpt.focus();
	}, /* 初始化要显示的日期div */
	initDivHtml:function()
	{
	    var i, j, a = ["<ul class=\"x-menu-list\"><li class=\"x-menu-list-item x-menu-date-item\"><div style=\"-moz-user-select: none; width: 175px;\" class=\"x-date-picker x-unselectable\"><table style=\"width: 175px;\" cellspacing=\"0\"><tbody>", "<tr><td class=\"x-date-left\"><a onclick=\"DatePicker.month--,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"javascript:void(0)\" title=\"\u4e0a\u6708(Ctrl+Left)\">&nbsp;</a></td><td class=\"x-date-middle\" align=\"center\"><table style=\"width: auto;\" class=\"x-btn-wrap x-btn\" border=\"0\" cellpadding=\"0\"cellspacing=\"0\"><tbody><tr class=\"x-btn-with-menu\"><td class=\"x-btn-left\"><i>&nbsp;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\" onclick=\"DatePicker.showXuiSlctMY()\"><button class=\"x-btn-text\" type=\"button\" id=\"xuiCurYear\"></button></em></td><td class=\"x-btn-right\"><i>&nbsp;</i></td></tr></tbody></table></td><td class=\"x-date-right\"><a onclick=\"DatePicker.month++,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"javascript:void(0)\" title=\"\u4e0b\u6708(Ctrl+Right)\">&nbsp;</a></td></tr>"];
		/* 中间 start */
		a.push("<tr><td colspan=\"3\"><table class=\"x-date-inner\" cellspacing=\"0\"><thead><tr><th title=\"\u661f\u671f\u5929\"><span>\u65e5</span></th><th title=\"\u661f\u671f\u4e00\"><span>\u4e00</span></th><th title=\"\u661f\u671f\u4e8c\"><span>\u4e8c</span></th><th title=\"\u661f\u671f\u4e09\"><span>\u4e09</span></th><th title=\"\u661f\u671f\u56db\"><span>\u56db</span></th><th title=\"\u661f\u671f\u4e94\"><span>\u4e94</span></th><th title=\"\u661f\u671f\u516d\"><span>\u516d</span></th></tr></thead><tbody id=\"xuiDatePicker\">");
		for (j = 0; j < 6; j++) {
			a.push("<tr>");
			for (i = 0; i < 7; i++) {
				a.push("<td onclick=\"DatePicker.click(this)\"><a href=\"javascript:void(0)\" hidefocus=\"on\"><em><span></span></em></a></td>");
			}
			a.push("</tr>");
		}
		/* 中间 end */
		/* 尾部 */
		a.push("</tbody></table></td></tr><tr><td colspan=\"3\" class=\"x-date-bottom\" align=\"center\"><table onclick=\"DatePicker.selectToday()\" style=\"width: auto;\" class=\"x-btn-wrap x-btn\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td class=\"x-btn-left\"><i>&nbsp;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\"><button class=\"x-btn-text\" type=\"button\">\u4eca\u5929</button></em></td><td class=\"x-btn-right\"><i>&nbsp;</i></td></tr></tbody></table></td></tr></tbody></table><div id=\"xuiSlctMY\" class=\"x-date-mp\" style=\"display: none; width: 175px; height: 193px; position: absolute; left: 0px; top: 0px; z-index: auto;\"><table cellspacing=\"0\" border=\"0\" style=\"width: 175px; height: 193px;\"><tbody><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">1</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">2</a></td><td align=\"center\" class=\"x-date-mp-ybtn\"><a class=\"x-date-mp-prev\" onclick=\"DatePicker.showXuiSlctMY(DatePicker.oldYear -= 10)\"></a></td><td align=\"center\" class=\"x-date-mp-ybtn\"><a class=\"x-date-mp-next\" onclick=\"DatePicker.showXuiSlctMY(DatePicker.oldYear += 10)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">3</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">4</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">5</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">6</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">7</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">8</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">9</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">10</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">11</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">12</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr class=\"x-date-mp-btns\"><td colspan=\"4\"><button class=\"x-date-mp-ok\" type=\"button\" onclick=\"DatePicker.slctOk()\">\u786e\u5b9a</button><button class=\"x-date-mp-cancel\" type=\"button\" onclick=\"DatePicker.hiddenXuiSlctMY()\">\u53d6\u6d88</button></td></tr></tbody></table></div></div></li></ul>");

	    return a.join("");
	}, isInvalid: function(y, m, d)
	{
	      var dpMax = null, dpMin = null, nCurTm, bRst = true;
	      if(this.dpMax)
	      {
	         dpMax = this.dpMax.split("-");
	         if(3 == dpMax.length)
	            dpMax = new Date(parseInt(dpMax[0], 10), parseInt(dpMax[1], 10) - 1, parseInt(dpMax[2], 10)).getTime();
	         else dpMax = null;
	      }
	      if(this.dpMin)
	      {
	         dpMin = this.dpMin.split("-");
	         if(3 == dpMin.length)
	           dpMin = new Date(parseInt(dpMin[0], 10), parseInt(dpMin[1], 10) - 1, parseInt(dpMin[2], 10)).getTime();
	         else dpMin = null;
	      }
	      if(dpMax || dpMin)
	      {
	         nCurTm = new Date(y, m - 1, d).getTime();
	         if(dpMax && dpMin)bRst = nCurTm < dpMax && nCurTm > dpMin;
	         else if(dpMax && !dpMin)bRst = nCurTm < dpMax;
	         else if(dpMin && !dpMax)bRst = nCurTm > dpMin;
	      }
	      return !bRst;
	},
	pushData: function()
	{
	  /* y,m,d,n,className */
	  var a = this.A(), r = a[5] || [], i, bEq = (this.year == a[0] && this.month == a[1]), c,
	      d = new Date(), bTd = (d.getFullYear() == a[0] && (d.getMonth() + 1) == a[1]),
	      nTdDay = d.getDate(); /* 最大、最小两月的处理 */
	  delete d;
	  for(i = 0; i < a[3]; i++)
	  {
	     c = [a[4]];
	     if(bEq && a[2] == this.day)c.push("x-date-selected");
	     if(bTd && nTdDay == a[2])c.push("x-date-today");
	     if(this.isInvalid(a[0], a[1], nCur = a[2]++))c.push("x-date-disabled");
	     r.push([a[0], a[1], nCur, c.join(" ")]);
	  }
	  return r;
	},setValue: function(e)
	{
	   this.month = parseInt(this.month, 10);
	   this.day = parseInt(this.day, 10);
	   this.year = parseInt(this.year, 10);
	   if(!this.isInvalid(this.year, this.month, this.day))
	   {
		   if(!e)
		   this.dpIpt.value = [this.year, 9 < this.month ? this.month : "0" + this.month, 
		     9 < this.day ? this.day : (0 < this.day ? "0" + this.day : 0)].join("-");
		   else this.dpIpt.value = [this.year, 9 < this.month ? this.month : "0" + this.month, this.day].join("-");
	   }
	},
	updataTBody: function(e)
	{
	   /* 上一个月 */
	   var m = this.month - 1, n = this.getWeek(this.year, this.month, 1),
	       r = this.xuiDPRows.rows, d, y = this.year, _t = this;
	   if(0 >= m)m = 12, y--;
	   /* 上一个月 */
	   d = this.pushData(y, m, this.pkData[m - 1] - n + 1, n, "x-date-prevday");
	   /* 当前月 */
	   d = this.pushData(this.year, this.month, 1, this.pkData[this.month - 1], "x-date-active", d);
	   /* 下一个月 */
       y = this.year, m = this.month + 1; if(12 < m)m = 1, y += 1;
       d = this.pushData(y, m, 1, 42 - n - this.pkData[this.month - 1], "x-date-nextday", d);
       y = -1, n = 0;
       for(i = 0; i < d.length; i++)
       {
         if(0 == i % 7)y++, n = 0;
         if(6 <= y)break;
         this.getByTagName("A", r[y].cells[n])[0].className = r[y].cells[n].className = d[i][3];
         this.getByTagName("SPAN", r[y].cells[n])[0].innerHTML = d[i][2];
         r[y].cells[n].title = [d[i][0], d[i][1], d[i][2]].join("-");
         n++;
       }
       this.xuiCurYear.innerHTML = this.year + "\u5e74" + this.month + "\u6708";
       this.setValue(e);
       this.dpIpt.focus();
	},addDate: function(n)
	{
	   /* 新的日期 */
	   n = parseInt(this.day, 10) + n;
	   var y = this.year, m = this.month, d = this.pkData[m - 1];
	   if(0 == n)
	   {
	      m--;
          if(1 > m)y--, m = 12;
	      n = this.pkData[m - 1];
	   }
	   else if(0 < n && n < d)this.day = n;
	   else if(0 >= n)
	   {
	      m--;
	      if(1 > m)y--, m = 12;
	      n += this.pkData[m - 1];
	   }
	   else if(n > d)
	   {
	      m++;
	      if(12 < m)y++, m = 1;
	      n -= d;
	   }
	   this.pkData[1] = this.isLeapYear(y) ? 29 : 28;
	   
	   return this.day = n, this.month = m, this.year = y, this.updataTBody(), this;
	}, /* 键盘事件处理 */
    onkeydown:function(e, oIpt)
   {
     e = e || window.event;
     var n = e.which || e.keyCode;
     if("none" == this.XuiDatePicker.style.display)
     {
        if(40 == n && e.ctrlKey)this.showSelectDiv(e, oIpt);
        return true;
     }
     switch(n)
     {
        case 46:
        case 35:
        case 36:
        case 109:
        case 116:
        case 8:
           return true;
        /* Ctrl + s */
        case 83:
           if(e.ctrlKey)
           {
             this.stopPropagation(e),this.preventDefault(e);
             return this.showXuiSlctMY(),false;
           }
           break;       
        /*Esc 关闭图层*/
        case 27:
           if("block" == this.xuiSlctMY.style.display)
                this.hiddenXuiSlctMY();
           else this.hidden();
           break;
        /* 回车选择 */
        case 13:
           if(e.ctrlKey)
           {
              this.selectToday();
              return true;
           }
           if("block" == this.xuiSlctMY.style.display)
           {
              this.slctOk();
              return true;
           }
           this.hidden();
           this.bIE ? (e.keyCode = 9) : '';
           this.setValue();
           break;
        case 38: /* 上 */
           n = -7;
           var bSMy = "block" == this.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
	          {
	              this.slctY = (this.slctY || this.year) - 1;
	              this.showXuiSlctMY(false);
	              return true;
	          }
              else n = 0,this.year--,this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
           }
           if(!bSMy)this.addDate(n);
           break;
        case 40: /* 下 */
           n = 7;
           var bSMy = "block" == this.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
	          {
	              this.slctY = (this.slctY || this.year) + 1;
	              this.showXuiSlctMY(false);
	              return true;
	          }
              else n = 0,this.year++,this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
           }
           if(!bSMy)this.addDate(n);
           break;
        case 37: /* 左 */
           n = -1;
           var bSMy = "block" == this.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
	          {
	              this.slctM = (this.slctM || this.month) - 1;
	              if(1 > this.slctM)this.slctM = 12;
	              this.showXuiSlctMY(false);
	              return true;
	          }
	          else
	          {
	              this.month--;
	              if(1 > this.month)this.month = 12, this.year--,this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
	              var nTmp = this.pkData[this.month - 1];
	              if(2 == this.month && nTmp < this.day)
	                 this.day = nTmp;
	              n = 0;
              }
           }
           if(!bSMy)this.addDate(n);
           break;
        case 39: /* 右 */
           n = 1;
           var bSMy = "block" == this.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
	          {
	              this.slctM = (this.slctM || this.month) + 1;
	              if(12 < this.slctM)this.slctM = 1;
	              this.showXuiSlctMY(false);
	              return true;
	          }
	          else
	          {
	              this.month++;
	              var nTmp = this.pkData[this.month - 1];
	              if(12 < this.month)this.month = 1, this.year++,this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
	              if(2 == this.month && nTmp < this.day)
	                 this.day = nTmp;
	              n = 0;
              }
           }
           if(!bSMy)this.addDate(n);
           break;
        default:
           n = String.fromCharCode(n);
           if('0' <= n && n <= '9' || n == '-')
             return true;
           this.stopPropagation(e),this.preventDefault(e);
           return false;
     }
  },onInput: function(e, o)
   {
     this.event = e = e || window.event;
     return this.RunOne(function(){
        this.stopPropagation(e),this.preventDefault(e);
        if(!o["_oldVl"])o["_oldVl"] = o.value;
        var s = this.trim(o.value), s2 = s.replace(/(^\-*)|(\-*^)|([^\d\-])/g, "").replace(/\-\-/g, "-"), a = s2.split("-");
        if(s)
        {
           switch(a.length)
           {
              case 1:
                 if(10000 < a[0])a[0] = a[0].substr(0, 4);
                 break;
              case 2:
                 var n = parseInt(a[1], 10);
                 if(12 < n)a[1] = "12";
                 else if(1 > n && 2 == a[1].length)a[1] = "0" + 1;
                 if(0 == a[1].length)
                    a.pop();
                 break;
              case 3:
                 var n = parseInt(a[1], 10);
                 if(12 < n)a[1] = "12";
                 else if(1 > n)a[1] = "0" + 1;
                 
                 if(0 == a[2].length)
                 {
                    a.pop();
                    break;
                 }                 
                 var a1 = (this.pkData = [31,this.isLeapYear(a[0]) ? 29 : 28,31,30,31,30,31,31,30,31,30,31]),
                     m = a1[n];
                 n = parseInt(a[2], 10);
                 if(1 > n && 2 == a[2].length)a[2] = 1;else if(m < n)a[2] = m;
                 a[0] && (this.year = a[0]), a[1] && (this.month = a[1]), a[2] && (this.day = a[2]);
                 this.updataTBody(e);
                 break;
              default:;
           }
           s2 = a.join("-");
           if(s != s2)
           {
               if((s2.length > o["_oldVl"].length || /\-$/g.test(s)) && (7 == s2.length || 4 == s2.length))
                 s2 += "-";
               o.value = s2;
           }
           else if((s2.length > o["_oldVl"].length || /\-$/g.test(s)) && (7 == s2.length || 4 == s2.length))
              s2 += "-", o.value = s2;
        }
        o["_oldVl"] = o.value;
     });
   },click:function(o)
	{
	   if(-1 < o.className.indexOf("x-date-disabled"))return this;
	   var a = o.title.split("-");
	   this.year = a[0],this.month = a[1],this.day = a[2];
	   this.setValue();
	   this.hidden();
	   return this;
	}, selectToday:function()
	{
	   var d = new Date();
	   this.year = d.getFullYear(), this.month = d.getMonth() + 1, this.day = d.getDate();
	   this.setValue();
	   this.hidden();
	},
	hidden: function()
	{
	   this.hiddenShadow(this.XuiDatePicker);
	}, /*显示图层*/
	showSelectDiv: function(e,o)
	{
	    this.event = e = e || window.event;
	    this.stopPropagation(e),this.preventDefault(e);
	    return this.RunOne(function(){
	      o = this.dpIpt = (o || this.FromEventObj(e));
		  var bFirst = !this.XuiDatePicker, s = this.trim(o.value),
		      oDiv = this.XuiDatePicker || (this.XuiDatePicker = this.createDiv({className: "x-layer x-menu x-menu-plain x-date-menu",id:"_Xui_DatePicker"}));
		  /* 第一次需要做初始化处理 */
		  if(bFirst)
		  {
		    oDiv.innerHTML = this.initDivHtml();
		    this.xuiDPRows = this.getDom("xuiDatePicker");
		    this.xuiCurYear = this.getDom("xuiCurYear");
		    this.xuiSlctMY = this.getDom("xuiSlctMY");
		  }
		  this.dpMax = o.getAttribute("max");
		  this.dpMin = o.getAttribute("min");
		  this.clearTimer(oDiv["tmer"]);
		  s = s.split("-");
		  if(3 == s.length)
		     this.setDate.apply(this, s);
		  else s = new Date(), this.setDate(s.getFullYear(), s.getMonth() + 1, s.getDate());
		  this.updataTBody();
		  
		  this.showDiv(this.p(o, "TABLE"), oDiv, this.bIE ? 173: 175, this.bIE ? 201 : (this.isOpera ? 180: 194));/* IE8: 173 * 201 */
	    });
	},onblur: function(e, oIpt)
	{
	    var _t = DatePicker, o = _t.XuiDatePicker;
	    o["tmer"] = _t.regTimer(function(e)
	    {
		    return _t.hidden(), true;
	    }, 333);
	}
}