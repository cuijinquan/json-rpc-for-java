{
    dpIpt: null, /* 输入对象 */
    XuiDatePicker: null,  /* 显示日期的图层 */
    xuiDPRows: null, /* body */
    xuiCurYear:null, xuiSlctMY:null,
    slctM: 0, slctY: 0,
    szSfmVal:"",/* 时分秒值 */
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
	    var a = this.A(arguments),b;
	    if(3 == a.length)a[3] = true;
	    /* 把上一个位置的css进行改变为普通的 */
	    if(this.year)
	       b = [this.year, this.month, this.day, false], 
	       this.year = this.month = this.day = 0,
	       this.setDate.apply(this, b);
	    if(a[3])this.year = parseInt(a[0], 10),this.month = parseInt(a[1], 10),this.day = parseInt(a[2], 10);
	    this.initPkData(this.year, this.month, this.day);
	},/* 显示下拉图层 */
	showXuiSlctMY: function(y)
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
	    var i, j, a = ["<ul class=\"x-menu-list\"><li class=\"x-menu-list-item x-menu-date-item\"><div style=\"-moz-user-select: none; width: 176.5px;\" class=\"x-date-picker x-unselectable\"><table style=\"width: 175px;\" cellspacing=\"0\"><tbody>", "<tr><td class=\"x-date-left\"><a onclick=\"DatePicker.month--,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"javascript:void(0)\" title=\"\u4e0a\u6708(Ctrl+Left)\">&nbsp;</a></td><td class=\"x-date-middle\" align=\"center\"><table style=\"width: auto;\" class=\"x-btn-wrap x-btn\" border=\"0\" cellpadding=\"0\"cellspacing=\"0\"><tbody><tr class=\"x-btn-with-menu\"><td class=\"x-btn-left\"><i>&nbsp;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\" onclick=\"DatePicker.showXuiSlctMY()\"><button class=\"x-btn-text\" type=\"button\" id=\"xuiCurYear\"></button></em></td><td class=\"x-btn-right\"><i>&nbsp;</i></td></tr></tbody></table></td><td class=\"x-date-right\"><a onclick=\"DatePicker.month++,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"javascript:void(0)\" title=\"\u4e0b\u6708(Ctrl+Right)\">&nbsp;</a></td></tr>"];
		/* 中间 start */
		a.push("<tr><td colspan=\"3\"><table class=\"x-date-inner\" cellspacing=\"0\"><thead><tr><th title=\"\u661f\u671f\u5929\"><span>\u65e5</span></th><th title=\"\u661f\u671f\u4e00\"><span>\u4e00</span></th><th title=\"\u661f\u671f\u4e8c\"><span>\u4e8c</span></th><th title=\"\u661f\u671f\u4e09\"><span>\u4e09</span></th><th title=\"\u661f\u671f\u56db\"><span>\u56db</span></th><th title=\"\u661f\u671f\u4e94\"><span>\u4e94</span></th><th title=\"\u661f\u671f\u516d\"><span>\u516d</span></th></tr></thead><tbody id=\"xuiDatePicker\">");
		for (j = 0; j < 6; j++) {
			a.push("<tr>");
			for (i = 0; i < 7; i++) {
				a.push("<td onclick=\"return DatePicker.click(event,this)\"><a href=\"javascript:void(0)\" hidefocus=\"on\"><em><span></span></em></a></td>");
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
	  var a = this.A(arguments), r = a[5] || [], i, bEq = (this.year == a[0] && this.month == a[1]), c,
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
	},/* 设置value值 */
	setValueD: function(e)
	{
	   var _t = this, s;
	   if(_t.dpIpt.readOnly || _t.dpIpt.disabled)return false;
	   _t.month = parseInt(_t.month, 10);
	   _t.day = parseInt(_t.day, 10);
	   _t.year = parseInt(_t.year, 10);
	   if(!_t.isInvalid(_t.year, _t.month, _t.day))
	   {
	       if(!_t.szSfmVal)_t.szSfmVal = _t.dpIpt.value.substr(10);
		   if(!e)
		   s = [_t.year, 9 < _t.month ? _t.month : "0" + _t.month, 
		     9 < _t.day ? _t.day : (0 < _t.day ? "0" + _t.day : 0)].join("-");
		   else s = [_t.year, 9 < _t.month ? _t.month : "0" + _t.month, _t.day].join("-");
		   if(10 == s.length) s += _t.szSfmVal;
		   _t.dpIpt.value = s.substr(0, _t.dpIpt.maxLength || 10);
	   }
	},
	updataTBody: function(e)
	{
	   /* 上一个月 */
	   var m = this.month - 1, n = this.getWeek(this.year, this.month, 1),
	       r = this.xuiDPRows.childNodes, d, y = this.year, _t = this;
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
         this.getByTagName("A", r[y].childNodes[n])[0].className = r[y].childNodes[n].className = d[i][3];
         this.getByTagName("SPAN", r[y].childNodes[n])[0].innerHTML = d[i][2];
         r[y].childNodes[n].title = [d[i][0], d[i][1], d[i][2]].join("-");
         n++;
       }
       this.xuiCurYear.innerHTML = this.year + "\u5e74" + this.month + "\u6708";
       this.setValueD(e);
       /* ie 下collection编辑列中发生焦点无法移动在不可见位置错误修正 */
	   !this.dpIpt["xuiBlur"] && this.dpIpt.focus();
	},addDate: function(n)
	{
	   /* 新的日期 */
	   n = parseInt(this.day, 10) + n;
	   var y = this.year, m = this.month, d = this.pkData[m - 1];
	   if(1 > m) m = this.month = 12;
	   else if(12 < m) m = this.month = 1;
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
	},/* 自动补全，修正闰年日期 */
	fnBq:function()
	{
	    var o = this.dpIpt, n = o.value.length, a = o.value.split(/[-\\s:\.]/);
	   if(3 <= a.length)
	    {
	       this.initPkData(a[0], a[1], a[2]);
	       if(2 == this.month && this.day > this.pkData[this.month - 1])
	         o.value = this.year + "-" + a[1] + "-"
	                     + this.pkData[this.month - 1]
	                     + o.value.substr(10,  o.value.length - 10); 
	    }
	    if(4 == n || 7 == n)o.value += "-";
	    if(10 < o.maxLength)
	    {
	        if(10 == n)o.value += " ";
	        else if(13 == n || 16 == n)o.value += ":";
	    }
	    this.fnMvIstPoint(o, o.value.length, o.value.length, null);
	},/* 使得中心fn的过程中不触发oninput */
	fnNoInput:function(fn){
	  var _t = this;
	   _t.bBoBq = true;fn();setTimeout(function(){_t.bBoBq = false},13);
	}, /* 键盘事件处理 */
    onkeydown:function(e, oIpt)
   {
     e = e || window.event;
     var n = e.which || e.keyCode, _t = this, x, k;
     if("none" == _t.XuiDatePicker.style.display)
     {
        if(40 == n && e.ctrlKey)_t.showSelectDiv(e, oIpt);
        return true;
     }
      switch(n)
     {
        case 46: /* del */
                 return true; 
        case 8: /* 退格键盘 */
               _t.fnNoInput(function(){
                  if(document.selection)document.selection.clear();
                  _t.fnMvIstPoint(oIpt, oIpt.value.length, oIpt.value.length, null);
               });
               return true;
        case 35:
        case 36:
        case 109:
        case 116:
        case 9:
               return true;
        case 83: /* ctrl + s */
           if(e.ctrlKey)
           {
             _t.stopPropagation(e),_t.preventDefault(e);
             return _t.showXuiSlctMY(),false;
           }
           return false;
           break;       
        /*Esc 关闭图层*/
        case 27:
           if("block" == _t.xuiSlctMY.style.display)
                _t.hiddenXuiSlctMY();
           else _t.hidden();
           break;
        /* 回车选择 */
        case 13:
           if(e.ctrlKey)
           {
              _t.selectToday();
              return true;
           }
           if("block" == _t.xuiSlctMY.style.display)
           {
              _t.slctOk();
              return true;
           }
           _t.hidden();
           _t.bIE ? (e.keyCode = 9) : '';
           _t.setValueD();
           break;
        case 38: /* 上 */
           n = -7;
           var bSMy = "block" == _t.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
	          {
	              _t.slctY = (_t.slctY || _t.year) - 1;
	              _t.showXuiSlctMY(false);
	              return true;
	          }
              else n = 0,_t.year--,_t.pkData[1] = _t.isLeapYear(_t.year) ? 29 : 28;
           }
           if(!bSMy)_t.addDate(n);
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
        case 40: /* 下 */
           n = 7;
           var bSMy = "block" == _t.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
	          {
	              _t.slctY = (_t.slctY || _t.year) + 1;
	              _t.showXuiSlctMY(false);
	              return true;
	          }
              else n = 0,_t.year++,_t.pkData[1] = _t.isLeapYear(_t.year) ? 29 : 28;
           }
           if(!bSMy)_t.addDate(n);
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
        case 37: /* 左 */
           n = -1;
           var bSMy = "block" == _t.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
	          {
	              _t.slctM = (_t.slctM || _t.month) - 1;
	              if(1 > _t.slctM)_t.slctM = 12;
	              _t.showXuiSlctMY(false);
	              return true;
	          }
	          else
	          {
	              _t.month--;
	              if(1 > _t.month)_t.month = 12, _t.year--,_t.pkData[1] = _t.isLeapYear(_t.year) ? 29 : 28;
	              var nTmp = _t.pkData[_t.month - 1];
	              if(2 == _t.month && nTmp < _t.day)
	                 _t.day = nTmp;
	              n = 0;
              }
           }
           if(!bSMy)_t.addDate(n);
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
        case 39: /* 右 */
           n = 1;
           var bSMy = "block" == _t.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
	          {
	              _t.slctM = (_t.slctM || _t.month) + 1;
	              if(12 < _t.slctM)_t.slctM = 1;
	              _t.showXuiSlctMY(false);
	              return true;
	          }
	          else
	          {
	              _t.month++;
	              var nTmp = _t.pkData[_t.month - 1];
	              if(12 < _t.month)_t.month = 1, _t.year++,_t.pkData[1] = _t.isLeapYear(_t.year) ? 29 : 28;
	              if(2 == _t.month && nTmp < _t.day)
	                 _t.day = nTmp;
	              n = 0;
              }
           }
           if(!bSMy)_t.addDate(n);
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
        default:
           x = oIpt.value.length;k = "";
           if(0 < x)k = oIpt.value.substr(x - 1, 1);
           if(     ((4 > x || 15 == x || 18 == x) && 48 <= n && n <= 57)           /* 年4位 0-9 */
                || ((4 == x || 7 == x) && n == 189)        /* 5、8位 -符号 */
                || ((12 == x || 15 == x) && n == 186)     /* 13、16位 :符号 */
                || (10 == x && n == 32)                         /* 10位 空格 */
                || (5 == x && 48 <= n && n <= 49)          /* 月第一位, 0 -1 */
                /* 月第二位：0[1 - 9], 1[0-2] */
                || (6 == x && ((0 == k && 49 <= n && n <= 57) || (1 == k && 48 <= n && n <= 50)))
                || (8 == x && 48 <= n && n <= 51)        /* 日第一位 0 - 2 */
                /* 日第二位，[0-2][0-9],[3][0-1] */
                || (9 == x && 48 <= n && (2 >= k && 48 <= n && n <= 57 || 3 == k && 48 <= n && n <= 49))
                /* 小时第一位 */ 
                || (11 == x && 48 <= n && n <= 50)
                /* 小时第二位 */ 
                || (12 == x && ((1 >= k && 48 <= n && n <= 57) || (2 == k && 48 <= n && n <= 51)))
                /* 分、秒第一位 */
                || ((14 == x || 17 == x) && 48 <= n && n <= 53)
              )
             return true;
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
     }
  },onInput: function(e, o)
   {
     if(o.readOnly || o.disabled ||  this.bBoBq)return false;
     this.bBoBq = true;
     this.event = e = e || window.event;
     return this.RunOne(function(){
        this.stopPropagation(e),this.preventDefault(e);
        /* 记录时分秒值 */
        var _t = this,d =  o.value.length;
        if(o.value && 18 <= d)
           _t.szSfmVal =  o.value.substr(10, d - 10);
        else if(18 <= (o.maxLength || 0))
        {
           d = new Date(); _t.szSfmVal =  " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();delete d;
        }else _t.szSfmVal = "";
        if(_t.isIE)
        {
         _t.detachEvent(o, "propertychange", _t[o.id] && _t[o.id].onpropertychange || o["onpropertychange"] || function(){});
         o["onpropertychange"] = null;
        }
        _t.fnBq();
        o["_oldVl"] = o.value;
        if(_t.isIE)
	    {
	       _t.addEvent(o, "propertychange",  (_t[o.id] || (_t[o.id] = {})).onpropertychange = function(e)
	       {
	          _t.onInput.call(_t, e, o);
	       });
	    }
     });
     this.bBoBq = false;
   },click:function(e, o)
	{
	   if(-1 < o.className.indexOf("x-date-disabled"))return this;
	   var a = o.title.split("-");
	   this.year = a[0],this.month = a[1],this.day = a[2];
	   e && (this.stopPropagation(e),this.preventDefault(e));
	   this.setValueD();
	   this.hidden();
	   return false;
	}, selectToday:function()
	{
	   var d = new Date();
	   this.year = d.getFullYear(), this.month = d.getMonth() + 1, this.day = d.getDate();
	   this.setValueD();
	   this.hidden();
	},
	hidden: function()
	{
	   this.hiddenShadow(this.XuiDatePicker);
	   this.dpIpt["xuiBlur"] && this.dpIpt["xuiBlur"]();
	}, /*显示图层*/
	showSelectDiv: function(e,o)
	{
	    this.event = e = e || window.event;
	    e && (this.stopPropagation(e),this.preventDefault(e));
	    var _t = this;
	      o = _t.dpIpt = (o || _t.FromEventObj(e));
		  var bFirst = !_t.XuiDatePicker, s = (o['value'] || "").trim(),
		      oDiv = _t.XuiDatePicker || (_t.XuiDatePicker = _t.createDiv({className: "x-menu x-menu-plain x-date-menu",id:"_Xui_DatePicker"}));
		  /* 第一次需要做初始化处理 */
		  if(bFirst)
		  {
		    oDiv.innerHTML = _t.initDivHtml();
		    _t.xuiDPRows = _t.getDom("xuiDatePicker");
		    _t.xuiCurYear = _t.getDom("xuiCurYear");
		    _t.xuiSlctMY = _t.getDom("xuiSlctMY");
		  }
		  _t.dpMax = o.getAttribute("max");
		  _t.dpMin = o.getAttribute("min");
		  _t.clearTimer(oDiv["tmer"]);
		  s = s.split("-");
		  if(3 == s.length)
		     _t.setDate.apply(_t, s);
		  else s = new Date(), _t.setDate(s.getFullYear(), s.getMonth() + 1, s.getDate());
		  _t.updataTBody();
		  if(!(o.readOnly || o.disabled))
		     _t.showDiv(o, oDiv, _t.bIE ? 170: 175, 0, 0);/* IE8: 173 * 201 */
		  (oDiv = $(oDiv)).height(oDiv.height());
	},onblur: function(e, oIpt)
	{
	    var _t = DatePicker, o = _t.XuiDatePicker;
	    o["tmer"] = _t.regTimer(function(e)
	    {
		    return _t.hidden(), true;
	    }, 333);
	}
}