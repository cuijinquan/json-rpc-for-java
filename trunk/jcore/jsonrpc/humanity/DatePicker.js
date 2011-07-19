{
    dpIpt: null, /* 输入对象*/
    XuiDatePicker: null,  /* 显示日期的图层 */
    xuiDPRows: null, /* body */
    xuiCurYear:null, xuiSlctMY:null,
    slctM: 0, slctY: 0,
    szSfmVal:"",/* 时分秒值 */
    year:0, month:0,day:0,
    dpMax: null, dpMin: null, /* 允许的最大年月日和最小的年月日 */
    pkData: [], /* 初始化一年的数据 */
    upi4ajx:function(){
     if(DatePicker.dpIpt && DatePicker.dpIpt.name)DatePicker.dpIpt = document.getElementsByName(DatePicker.dpIpt.name)[0];
     if(this.dpIpt && this.dpIpt.name)this.dpIpt = document.getElementsByName(this.dpIpt.name)[0];
  },
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
	   window.bBoBq=false;
	}, /* 初始化要显示的日期div */
	initDivHtml:function()
	{
	    var i, j, a = ["<ul class=\"x-menu-list\"><li class=\"x-menu-list-item x-menu-date-item\"><div style=\"-moz-user-select: none; width: 176.5px;\" class=\"x-date-picker x-unselectable\"><table style=\"width:175px;height:186px;\" cellspacing=\"0\"><tbody>", "<tr><td class=\"x-date-left\"><a onclick=\"DatePicker.month--,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"javascript:void(0)\" title=\"\u4e0a\u6708(Ctrl+Left)\">&nbsp;</a></td><td class=\"x-date-middle\" align=\"center\"><table style=\"width: auto;\" class=\"x-btn-wrap x-btn\" border=\"0\" cellpadding=\"0\"cellspacing=\"0\"><tbody><tr class=\"x-btn-with-menu\"><td class=\"x-btn-left\"><i>&nbsp;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\" onclick=\"DatePicker.showXuiSlctMY()\"><button class=\"x-btn-text\" type=\"button\" id=\"xuiCurYear\"></button></em></td><td class=\"x-btn-right\"><i>&nbsp;</i></td></tr></tbody></table></td><td class=\"x-date-right\"><a onclick=\"DatePicker.month++,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"javascript:void(0)\" title=\"\u4e0b\u6708(Ctrl+Right)\">&nbsp;</a></td></tr>"];
		/* 中间 start */
		a.push("<tr><td colspan=\"3\"><table class=\"x-date-inner\" cellspacing=\"0\" style=\"height:139px;\"><thead><tr><th title=\"\u661f\u671f\u5929\"><span>\u65e5</span></th><th title=\"\u661f\u671f\u4e00\"><span>\u4e00</span></th><th title=\"\u661f\u671f\u4e8c\"><span>\u4e8c</span></th><th title=\"\u661f\u671f\u4e09\"><span>\u4e09</span></th><th title=\"\u661f\u671f\u56db\"><span>\u56db</span></th><th title=\"\u661f\u671f\u4e94\"><span>\u4e94</span></th><th title=\"\u661f\u671f\u516d\"><span>\u516d</span></th></tr></thead><tbody id=\"xuiDatePicker\">");
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
	},/* 判断是否在有效的时间段访问内*/ 
	isInvalid: function(y, m, d)
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
	         if(dpMax && dpMin)bRst = nCurTm <= dpMax && nCurTm >= dpMin;
	         else if(dpMax && !dpMin)bRst = nCurTm <= dpMax;
	         else if(dpMin && !dpMax)bRst = nCurTm >= dpMin;
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
	   DatePicker.upi4ajx();
	   if("undefined" == typeof this.dpIpt.value || this.dpIpt.readOnly || this.dpIpt.disabled || "focus" == (window.event || {}).type)return false;
	   var _t = this, s,o = _t.dpIpt, d =  o.value.length, nTmp;
	   _t.fnNoInput(function(){
        if(!o.maxLength || 23 < o.maxLength)
            o.maxLength = 10;
        if(o.value && 10 <= d)
           _t.szSfmVal =  o.value.substr(10, d - 10);
        if(19 <= o.maxLength)
        {
           d = new Date(); _t.szSfmVal =  " " + (10 > (nTmp = d.getHours()) ? "0" + nTmp: nTmp)
                + ":" + (10 > (nTmp = d.getMinutes()) ? "0" + nTmp: nTmp) + ":" + 
                (10 > (nTmp = d.getSeconds()) ? "0" + nTmp: nTmp);delete d;
        }else _t.szSfmVal = "";
        
	   _t.month = parseInt(_t.month, 10);
	   _t.day = parseInt(_t.day, 10);
	   _t.year = parseInt(_t.year, 10);
	   if(!_t.isInvalid(_t.year, _t.month, _t.day))
	   {
	       if(!_t.szSfmVal && 10 < o.maxLength)_t.szSfmVal = o.value.substr(10);
		   if(!e)
		   s = [_t.year, 9 < _t.month ? _t.month : "0" + _t.month, 
		     9 < _t.day ? _t.day : (0 < _t.day ? "0" + _t.day : 0)].join("-");
		   else s = [_t.year, 9 < _t.month ? _t.month : "0" + _t.month, _t.day].join("-");
		   if(10 == s.length && 10 < o.maxLength) s += _t.szSfmVal;
		   o.value = s.substr(0, o.maxLength || 10);
		   if(o.onchange)o.onchange();
	   }
	   });
	   Base.delInvalid(o);HidTip();
	},
	updataTBody: function(e,bNSv)
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
       /*this.setValueD(e); 防止获取焦点的时候自动填写值，但是会导致无法选择新的年月*/
       if(!bNSv)this.setValueD(e);
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
	    if(null == this.dpIpt)return;
	    DatePicker.upi4ajx();
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
	   window.bBoBq = true;fn();setTimeout(function(){window.bBoBq = false},13);
	}/* 数据有效检查 */
	,onkeyup:function(e, oIpt){
	    var s = oIpt.value;
	    s = s.replace(/[^\d]/g, '');
	    if(8 == s.length){DatePicker.convertIptDate(oIpt);
	    if(oIpt.onchange)oIpt.onchange(oIpt);}
	}, /* 键盘事件处理 */
    onkeydown:function(e, oIpt)
   {
    e = e || window.event;
     var n = e.which || e.keyCode, _t = this, x, k;
     if(!_t.XuiDatePicker)return false;
     DatePicker.upi4ajx();
     if("none" == _t.XuiDatePicker.style.display)
     {
        window.bBoBq = false;
        _t.showSelectDiv(e, oIpt);
        if(40 == n && e.ctrlKey)_t.showSelectDiv(e, oIpt);
        return true;
     }
      switch(n)
     {
        case 46: /* del */
                 return true; 
        case 8: /* 退格键盘 */
              /* _t.fnNoInput(function(){
                  if(document.selection)document.selection.clear();
                  _t.fnMvIstPoint(oIpt, oIpt.value.length, oIpt.value.length, null);
               });*/
               return true;
        case 35:
        case 36:
        case 109:
        case 116:
        case 9:
               return true;
        case 83: /* ctrl + s */
           _t.stopPropagation(e),_t.preventDefault(e);
           if(e.ctrlKey)
             return _t.showXuiSlctMY(),false;
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
           $(oIpt).blur();
           if(window[oIpt.id+"_validate"]){this.stopPropagation(e),this.preventDefault(e);oIpt.focus();return false;}
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
          /* _t.setValueD();*/
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
           if(!e.shiftKey){
           		if((n > 47 && n < 58) || (n > 95 && n < 106))
           			return true;
           		if((n > 188 && n<192) || (n > 108 && n < 112) || n == 32)
           		{
           			var _d = oIpt.value,l = _d.length;
           			_d = _d.replace(new RegExp("[\/|\.|\-|\ \:]","gm"),"-");
           			if(l != 0 &&  _d.lastIndexOf("-") != l-1) 
           			return true;
           		}
           }else{
           		var _d = oIpt.value,l = _d.length;
           		if(n == 186 && 1!=l && _d.lastIndexOf(":") != l-1) return true;
           }
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
     }
  },onInput: function(e, o)
   {
   },click:function(e, o)
	{
	   if(-1 < o.className.indexOf("x-date-disabled"))return this;
	   DatePicker.upi4ajx();
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
		  /*if(window.bBoBq)return;// window.bBoBq = true;*/
	    this.event = e = e || window.event;
	    var _t = this;
	      o = _t.dpIpt = (o || _t.FromEventObj(e))
	    if(o.readOnly || o.disabled || "undefined" == typeof o.value)return false;
	    e && (this.stopPropagation(e),this.preventDefault(e));
	    $(o).selection(0, o.value.length);
		  var bFirst = !_t.XuiDatePicker, s = (o['value'] || "").trim(),
		      oDiv = _t.XuiDatePicker || (_t.XuiDatePicker = _t.createDiv({className: "x-menu x-menu-plain x-date-menu",id:"_Xui_DatePicker"}));
		 _t.fnNoInput(function(){
		 window.hdAll.start();
		 if(!o.onkeyup)$(o).keyup(function(){_t.onkeyup(e, o)});
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
		     _t.showDiv(o, oDiv, 173,185, 0);
		   _t.validateIptDateTime(o);
		  });
		  window.bBoBq = false;
	},onblur: function(e, oIpt)
	{	
		if(window.bBoBq)return true;
		var _t = DatePicker, o = _t.XuiDatePicker, bRsr = true;
		_t.fnNoInput(function(){
		if(o)o["tmer"] = _t.regTimer(function(e)
	    {
		    return _t.hidden(), true;
	    }, 333);
	    if(oIpt.value != "" && oIpt.readOnly != true){_t.convertIptDate(oIpt);bRsr = _t.validateIptDateTime(oIpt)}else{ Base.delInvalid(oIpt);HidTip();}
	    });
	    try{if(!bRsr)oIpt.focus();}catch(e){}
	    return bRsr;
	},
	convertIptDate:function(oIpt){
			var _t = oIpt,s = oIpt.value,l = s.length,_m,_d,
		    _s = s.replace(new RegExp("[\/|\.|\-]","gm"),"-"),
		    __s = s.replace(new RegExp("[\/|\.|\-]","gm"),""),
		    dArr = _s.split(" ")[0].split("-");
		    if(null != dArr[0] && ""!= dArr[0]){
		    	var _y = parseInt(dArr[0],10);
		    	 if(_y <= 30 && _y > 9) _y = "20" + _y;
		    	 else if(_y < 10) _y = "200"+_y;
		    	 else if(_y >= 30 && _y < 100) _y = "19" + _y;
		    	 else if(_y >= 100 && _y < 1000) _y = _y + "0";
		    	 dArr[0] = _y;
		    }else{dArr[0] = "1900"}
		    if(null != dArr[1] && "" != dArr[1]){
		    	_m = parseInt(dArr[1],10);
		    	if(_m < 10)_m = "0" + _m;
		    	dArr[1] = _m;
		    	if(_m == 0)  _m="01";
		    }else{dArr[1]="01"}
		    if(null != dArr[2] && ""!= dArr[2]){
		    	_d = parseInt(dArr[2],10);
		    	if(_d < 10)_d = "0" + _d;
		    	dArr[2] = _d;
		    }
		    else{dArr[2] = "01"};
		    if(__s.length == 8){
		    	dArr[0] = __s.substr(0,4);
		    	dArr[1] = __s.substr(4,2);
		    	dArr[2] = __s.substr(6,2);
		    }
		    dArr.splice(3, dArr.length-3);
		    _d = dArr.join("-");
		    //处理时分秒
		    t = _s.split(" ")[1];
		    if(t){
		    	tArr = t.split(":");
		    	if(tArr[0] != null && ""!= tArr[0]){
		    		var _h = parseInt(tArr[0],10);
		    		if(_h < 10)tArr[0] = "0"+_h;
		    	}
		    	if(tArr[1] != null && ""!= tArr[1]){
		    		var _mm = parseInt(tArr[1],10);
		    		if(_mm < 10)tArr[1] = "0"+_mm;
		    	}else tArr[1]="00";
		    	if(tArr[2] != null && ""!= tArr[2]){
		    		var _s ,_ss,sArr = tArr[2].split("-");
		    		if(sArr.length == 1){
		    			_s = parseInt(sArr[0],10);
		    			if(_s < 10)tArr[2] = "0"+_s;
		    			}
		    		else{
		    			if(null != sArr[0] && ""!= sArr[0]){
		    			_s = parseInt(sArr[0],10);
		    			if(_s < 10)_s = "0"+_s;
		    			}
		    			else _s="00";
		    			if(null != sArr[1] && ""!= sArr[1]){
		    			_ss = parseInt(sArr[1],10);
		    			tArr[2] = _s+"."+_ss;
		    			}
		    			else tArr[2] = _s+".0";
		    		}
		    	}else tArr[2]="00.0";
		    	tArr.splice(3, tArr.length-3);
		    	t =" "+tArr.join(":");
		    }else
		    {
		    	t = " 00:00:00.0";	
		    }
		    oIpt.value = (_d + t).substr(0,oIpt.maxLength);
	},
	validateIptDateTime :function(oIpt){
		var _t=oIpt,maxL = _t.maxLength,val = _t.value,date,time,msg;
		if(maxL > 10){
			date = val.split(" ")[0];
			time = val.split(" ")[1];
		}else{
			date = val;
		}
		window.validateDate = function(){
		    var noArr = date.split("-"),year = eval(noArr[0]),month = eval(noArr[1]),day = eval(noArr[2]);
		    if (month > 12 ) {msg = "输入的[月份]值无效，超出最大范围。";return false;}
		    else if (year > 9999 ) {msg = "输入的[年份]值无效，超出最大范围。";return false;}
		    else if (day > 31 ) {msg = "输入的[日期]值无效，超出最大范围。";return false;}
		    if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30){
		    	msg = "输入的["+month+"月]为小月，日最大为30。";
		    	return false;
		    }
		    if (month == 2){
			    if (year % 4 == 0){
     			if(year % 100 == 0 && year % 400 != 0 && day > 28){msg = "输入的["+year+"]年不是闰年，2月不能大于28天。" ;return false;}
     			if(year % 400 == 0 && day > 29){msg = "输入的["+year+"]年是闰年，2月不能大于29天。" ;return false;}
     			if(year % 100 != 0 && day > 29){msg = "输入的["+year+"]年是闰年，2月不能大于29天。" ;return false;}
    			}else if (year % 4 != 0 && day > 28){msg = "输入的["+year+"]不是闰年，2月不能大于28天。" ; return false;}
 			 }
   			 return true;
    	};
    	window.validateTime = function(){
    	if(time != "" && time != null){
	    		var noArr=time.split(":"),hour=eval(noArr[0] ||"0" ),min=eval(noArr[1] || "0"),sec=noArr[2]||"0",ss=eval(sec.split(".")[1] || "0"),sec = eval(sec.split(".")[0] || "0"); 
	    		if(hour >23){{msg = "输入的[小时]值无效，超出最大范围。";return false;}}
	    		if(min > 59){{msg = "输入的[分钟]值无效，超出最大范围。";return false;}}
	    		if(sec > 59){{msg = "输入的[秒钟]值无效，超出最大范围。";return false;}}
	    		if(ss > 999){{msg = "输入的[毫秒]值无效，超出最大范围。";return false;}}
	    		return true;
    		}
    		return true;
    	};
    	if(!validateDate() || !validateTime()){
    		window[oIpt.id+"_validate"] = true;
    		return this.setErrMsg(msg,oIpt);
    	}
    	else{
    		 Base.delInvalid(oIpt);HidTip();
    		 window[oIpt.id+"_validate"] = false;
    		 return true;
    	}
	},
	setErrMsg :function(msg,oIpt){
		msg = msg.replace(new RegExp("[\\[]","gm"),"[<b>");
		msg = msg.replace(new RegExp("[\\]]","gm"),"</b>]");
		$(oIpt).focus().tip(msg);
		Base.addInvalid(oIpt);
		var e = window.event;
		this.stopPropagation(e),this.preventDefault(e)
		return false;
	}
}