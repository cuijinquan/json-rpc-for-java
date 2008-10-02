{
    dpIpt: null, /* 输入对象 */
    XuiDatePicker: null,  /* 显示日期的图层 */
    xuiDPRows: null, /* body */
    xuiCurYear:null, xuiSlctMY:null,
    slctM: 0, slctY: 0,
    year:0, month:0,day:0, pkweek: 0,
    dpMax: null, dpMin: null, /* 允许的最大年月日和最小的年月日 */
    pkData: [], /* 初始化一年的数据 */
    initPkData:function(nY, m, d)
    {
       var o = new Date(this.year = parseInt(nY, 10), (this.month = parseInt(m, 10)) - 1, 
           this.day = parseInt(d, 10));
       this.pkData = [31,(this.isLeapYear(nY) ? 29 : 28),31,30,31,30,31,31,30,31,30,31];
       return this.pkweek = this.getWeek(o)
    },
	init:function()
	{
	  XUI(this);
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
	       j, r, k = 4, p, oldY = this.year,
	       y1 = y || this.slctY || oldY, m = this.slctM || this.month;
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
	            this.getByTagName("A", r.cells[j])[0].innerHTML = p = (y1 - k) + (j - 2) * 5;
	            if((r.cells[j].textContent || r.cells[j].innerText) == y1)this.addClass("x-date-mp-sel", r.cells[j]);
	            else this.delClass("x-date-mp-sel", r.cells[j]);
	         }
	      }
	      k--;
	   }	   
	   this.year = oldY;
	   o.style.display = "block";
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
	}, /* 初始化要显示的日期div */
	initDivHtml:function()
	{
	   var i,j, a = [
	     "<ul class=\"x-menu-list\"><li class=\"x-menu-list-item x-menu-date-item\"><div style=\"-moz-user-select: none; width: 175px;\" class=\"x-date-picker x-unselectable\"><table style=\"width: 175px;\" cellspacing=\"0\"><tbody>"
	     /* 头部 */
	     ,"<tr><td class=\"x-date-left\"><a onclic=\"DatePicker.this.month--,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"#\" title=\"上月(Ctrl+Left)\">&nbsp;</a></td><td class=\"x-date-middle\" align=\"center\"><table style=\"width: auto;\" class=\"x-btn-wrap x-btn\" border=\"0\" cellpadding=\"0\"cellspacing=\"0\"><tbody><tr class=\"x-btn-with-menu\"><td class=\"x-btn-left\"><i>&nbsp;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\" onclick=\"DatePicker.showXuiSlctMY()\"><button class=\"x-btn-text\" type=\"button\" id=\"xuiCurYear\"></button></em></td><td class=\"x-btn-right\"><i>&nbsp;</i></td></tr></tbody></table></td><td class=\"x-date-right\"><a onclic=\"DatePicker.this.month++,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"#\" title=\"下月(Ctrl+Right)\">&nbsp;</a></td></tr>"
	   ];
	   /* 中间 start */
	   a.push("<tr><td colspan=\"3\"><table class=\"x-date-inner\" cellspacing=\"0\"><thead><tr><th title=\"星期天\"><span>日</span></th><th title=\"星期一\"><span>一</span></th><th title=\"星期二\"><span>二</span></th><th title=\"星期三\"><span>三</span></th><th title=\"星期四\"><span>四</span></th><th title=\"星期五\"><span>五</span></th><th title=\"星期六\"><span>六</span></th></tr></thead><tbody id=\"xuiDatePicker\">");
	   
	   for(j = 0; j < 6; j++)
	   {
	       a.push("<tr>");
		   for(i = 0; i < 7; i++)
		   {
		     a.push("<td onclick=\"DatePicker.click(this)\"><a href=\"#\" hidefocus=\"on\"><em><span></span></em></a></td>");
		   }
		   a.push("</tr>");
	   }
	   /* 中间 end */
	   /* 尾部 */
	   a.push("</tbody></table></td></tr><tr><td colspan=\"3\" class=\"x-date-bottom\" align=\"center\"><table onclick=\"DatePicker.selectToday()\" style=\"width: auto;\" class=\"x-btn-wrap x-btn\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td class=\"x-btn-left\"><i>&nbsp;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\"><button class=\"x-btn-text\" type=\"button\">今天</button></em></td><td class=\"x-btn-right\"><i>&nbsp;</i></td></tr></tbody></table></td></tr></tbody></table><div id=\"xuiSlctMY\" class=\"x-date-mp\" style=\"display: none; width: 175px; height: 193px; position: absolute; left: 0px; top: 0px; z-index: auto;\"><table cellspacing=\"0\" border=\"0\" style=\"width: 175px; height: 193px;\"><tbody><tr><td class=\"x-date-mp-month\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">1</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">2</a></td><td align=\"center\" class=\"x-date-mp-ybtn\"><a class=\"x-date-mp-prev\" onclick=\"DatePicker.showXuiSlctMY(DatePicker.oldYear -= 10)\"></a></td><td align=\"center\" class=\"x-date-mp-ybtn\"><a class=\"x-date-mp-next\" onclick=\"DatePicker.showXuiSlctMY(DatePicker.oldYear += 10)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">3</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">4</a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">5</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">6</a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">7</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">8</a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">9</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">10</a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">11</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\">12</a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"#\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr class=\"x-date-mp-btns\"><td colspan=\"4\"><button class=\"x-date-mp-ok\" type=\"button\" onclick=\"DatePicker.slctOk()\">确定</button><button class=\"x-date-mp-cancel\" type=\"button\" onclick=\"DatePicker.hiddenXuiSlctMY()\">取消</button></td></tr></tbody></table></div></div></li></ul>");
	   return a.join("");
	},
	pushData: function()
	{
	  /* y,m,d,n,className */
	  var a = this.A(), r = a[5] || [], i, bEq = (this.year == a[0] && this.month == a[1]), c,
	      d = new Date(), bTd = (d.getFullYear() == a[0] && (d.getMonth() + 1) == a[1]),
	      nTdDay = d.getDate(), /* 最大、最小两月的处理 */
	      dpMax = null,dpMin = null, bMax = false, bMin = false;
	      
	      if(this.dpMax)
	      {
	         dpMax = this.dpMax.split("-");
	         if(3 == dpMax.length)
	         {
	            dpMax = new Date(dpMax[0], dpMax[1] - 1, dpMax[2]);
	            bMax = a[0] > dpMax[0] || (a[0] == dpMax[0] && a[1] > dpMax[1]);
	         }
	         else dpMax = null;
	      }
	      if(this.dpMin)
	      {
	         dpMin = this.dpMin.split("-");
	         if(3 == dpMin.length)
	         {
	           dpMin = new Date(dpMin[0], dpMin[1] - 1, dpMin[2]);
	           bMin = a[0] < dpMin[0] || (a[0] == dpMax[0] && a[1] < dpMax[1]);
	         }
	         else dpMin = null;
	      }
	  delete d;
	  for(i = 0; i < a[3]; i++)
	  {
	     c = [a[4]];
	     if(bEq && a[2] == this.day)c.push("x-date-selected");
	     if(bTd && nTdDay == a[2])c.push("x-date-today");
	     if( (dpMax && bMax && a[2] > dpMax.getDate()) || 
	         (dpMin && bMin && a[2] < dpMin.getDate()))c.push("x-date-disabled");
	     r.push([a[0], a[1], a[2]++, c.join(" ")]);
	  }
	  return r;
	},setValue: function()
	{
	   this.dpIpt.value = [this.year, this.month, this.day].join("-");
	},
	updataTBody: function()
	{
	   /* 上一个月 */
	   document.title = [this.month, this.getWeek(this.year, this.month, 1)];
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
       this.xuiCurYear.innerHTML = this.year + "年" + this.month + "月";
       this.setValue();
       window.setTimeout(function()
       {
         _t.dpIpt.focus();
       }, 13);
	},addDate: function(n)
	{
	   /* 新的日期 */
	   n = this.day + n;
	   var y = this.year, m = this.month, d = this.pkData[m - 1];
	   if(0 < n && n < d)return this.day = n, this.updataTBody(), this;
	   else if(0 >= n)m--, n += this.pkData[m - 1];
	   else if(n > d)m++, n -= d;
	   if(1 > m)y--, m = 12, this.pkData[1] = this.isLeapYear(y) ? 29 : 28;
	   else if(12 < m)y++, m = 1, this.pkData[1] = this.isLeapYear(y) ? 29 : 28;
	   
	   return this.day = n, this.month = m, this.year = y, this.updataTBody(), this;
	}, /* 键盘事件处理 */
    onkeydown:function(e, oIpt)
   {
     e = e || window.event;
     var n = e.which || e.keyCode;
     switch(n)
     {
        /* 接受连续退格键 e.repeat, 8 */
        case 8:return true;
        /*Esc 关闭图层*/
        case 27:this.hidden();break;
        /* 回车选择 */
        case 13:
           this.hidden();
           this.bIE ? (e.keyCode = 9) : '';
           this.setValue();
           break;
        case 38: /* 上 */
           n = -7;
           if(e.ctrlKey)n = 0,this.year--,this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
           this.addDate(n);
           break;
        case 40: /* 下 */
           n = 7;
           if(e.ctrlKey)n = 0,this.year++,this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
           this.addDate(n);
           break;
        case 37: /* 左 */
           n = -1;
           if(e.ctrlKey)
           {
              this.month--;
              if(1 > this.month)this.month = 12, this.year--,this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
              var nTmp = this.pkData[this.month - 1];
              if(2 == this.month && nTmp < this.day)
                 this.day = nTmp;
              n = 0;
           }
           this.addDate(n);
           break;
        case 39: /* 右 */
           n = 1;
           if(e.ctrlKey)
           {
              this.month++;
              var nTmp = this.pkData[this.month - 1];
              if(12 < this.month)this.month = 1, this.year++,this.pkData[1] = this.isLeapYear(this.year) ? 29 : 28;
              if(2 == this.month && nTmp < this.day)
                 this.day = nTmp;
              n = 0;
           }
           this.addDate(n);
           break;
        default:
           n = String.fromCharCode(n);
           if('0' <= n && n <= '9' || n == '-')
             return true;
           this.stopPropagation(e),this.preventDefault(e);
           return false;
     }
     
     return true;
  },onInput: function(e, oIpt)
   {
     this.event = e = e || window.event;
     return this.RunOne(function(){
        ;
        this.stopPropagation(e),this.preventDefault(e);
     });
   },click:function(o)
	{
	   if(-1 < o.className.indexOf("x-date-disabled"))return this;
	   this.dpIpt.value = o.title;
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
		  s = s.split("-");
		  if(3 == s.length)
		     this.setDate.apply(this, s);
		  else s = new Date(), this.setDate(s.getFullYear(), s.getMonth() + 1, s.getDate());
		  this.updataTBody();
		  
		  this.showDiv(this.p(o, "TABLE"), oDiv, this.bIE ? 173: 175, this.bIE ? 201 : (this.isOpera ? 180: 194));/* IE8: 173 * 201 */
	    });
	}
}