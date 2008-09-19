{base: (window.Base = rpc.LoadJsObj("Base")),data:null,SelectDiv:false,
  getObj:function(szId)
  {
    return slctIptData[szId]||{};
  },
  getData:function(szId)/*获取下拉列表数据*/
  {
    return this.data || this.getObj(szId)["collection"]
  },/*高亮显示指定的行*/
  lightRow:function(n)
  {
    var o = this.SelectDiv, b = 0 < o.childNodes.length, r = b ? o.childNodes[0].rows : {};
    if(!b)return false;
    r[o["_lstNum"] || 0].className='slcthand';
    if(-1 == n)n = r.length - 1;
    if(r.length <= n || 0 > n)
       return r[0].className='slcthand slctOver', r[0].scrollIntoView(true), o["_lstNum"] = 0;
    else if(0 <= n)
       return r[n].className='slcthand slctOver', r[n].scrollIntoView(true), o["_lstNum"] = n;
    return o["_lstNum"] = 0;
  },
  /*获取要显示的内容*/ 
  getSelectDataStr:function(oE, w, dt)
  {
   	var _t = this, a = dt || this.getData(oE.id), a1 = ["<table cellPadding=\"0\" border=\"0\" cellSpacing=\"0\" style=\"border:0px;width:" + w + ";margin:0px;padding:0px;\">"], i, j, o, k,
             b = this.getObj(oE.id)["displayFields"], bDisp = !b;
    !bDisp && (b = b.split(/[,;\|\/]/)); 
    
   	for(i = 0; i < a.length; i++)
    {
      o = a[i];
      a1.push("<tr onclick=\"Select.onSelect(event, this)\" class=\"slcthand\" onmouseover=\"this.title=this.innerText||this.textContent;Select.lightRow(this.rowIndex)\"\">");
      if(bDisp)
      {
          for(k in o)
     	  if("_id_" != k) 
             a1.push("<td><nobr>"), a1.push(o[k]), a1.push("</nobr></td>");
      }
      else
      {
        for(j = 0; j < b.length; j++)
        {
          a1.push("<td><nobr>"), a1.push(o[b[j]]), a1.push("</nobr></td>");
        }
      }
      a1.push("</tr>");
    }
    a1.push("</table>");
    return a1.join("")
  },/*给对象设置value*/
  setValue:function(szId,s)
  {
     var o = Base.id(szId), i;
     if(o)
     {
     	o.value = s;/*checkbox 的处理*/
     	"checkbox" == (o.type || "") && (o.checked=true);
     	Base.fireEvent(o, "change");
     	szId = o.id;
     }
     i = o;
     o = document.getElementsByName(szId);
     if(o == i)return this;
     if(o.length)/* radio box的处理*/
     for(i = 0; i < o.length; i++)
     {
        if((o[i].value || '') == s)
        {
           o[i].checked=true;
           Base.fireEvent(o[i], "change");
           break;
        }
     }
     return this;
  },/*选择的处理*/
  onSelect:function(e, oTr)
  {
     var o = this.SelectDiv, id = o.id, oIpt = Base.id(o[id]),
         n = oTr.rowIndex || oTr, oT = this.getObj(oIpt.id), dt = this.getData(oIpt.id), 
         cbk = oT['selectCallBack'];
     if(0 <= n && dt.length > n)
     {
         o["_tm"] = 13;
	     /* 处理选择*/
	     if(oT['valueField'])
	       this.setValue(oIpt, dt[n][oT['valueField']]);
	     /* 回调处理 */
	     cbk && cbk(dt[n], oIpt);
	     e && (Base.preventDefault(e), Base.stopPropagation(e));
	     this.hiddenSelectDiv();
	     o["_lstNum"] = n;
     }else Base.id(szId)["_over"] = 1;
  },/*检查当前输入对象的显示图层是否正在显示*/
  isShow: function(e, obj, oE)
  {
     var o = this.SelectDiv, szId = o.id;
     return(o && "block" == o.style.display && o[szId] == oE.id);     
  },/*检索过滤处理*/
  onInput:function(e, oIpt)
  {
     var n = 0, o = this.SelectDiv, oT = this.getObj(oIpt.id), k,
         s = oIpt.value.replace(/(^\s+)|(\s+$)/g, ""), a = oT["collection"], b = [];
     /* _inInput 防止重入*/
     if(o && !o["_inInput"])
     {
	     /* 检索过滤处理 */
	     if(0 < s.length)
	     {
	        o["_inInput"] = true;
	        for(n = 0; n < a.length; n++)
	           for(k in a[n])
	            if(-1 < a[n][k].indexOf(s))b.push(a[n]); 
	        this.data = b;
	        this.showSelectDiv(e, {width:o.style.width}, oIpt, b);
	        o["_inInput"] = false;
	     }
     }
  },
  /*键盘事件处理*/
  onkeydown:function(e, oIpt)
  {
     e = e || window.event;
     var n = e.which || e.keyCode, o = this.SelectDiv, oT = this.getObj(oIpt.id), i = o["_lstNum"];
     switch(n)
     {
        /* 接受连续退格键 e.repeat, 8 */
        /*Esc 关闭图层*/
        case 27:o["_tm"] = 13, this.hiddenSelectDiv();break;
        /* 回车选择 */
        case 13:
           this.onSelect(null, i);
           o["_tm"] = 13;
           Base.bIE ? (e.keyCode = 9) : (e.which = 9);
           this.hiddenSelectDiv();
           break;
        case 38: /* 上 */
           i = this.lightRow(i - 1);
           break;
        case 40: /* 下 */
           i = this.lightRow(i + 1);
           break;
        default:;
     }
     // return n;
  },
  /*显示下拉列表图层*/
  showSelectDiv: function(e, obj, oE)
  {
    if(oE.readOnly || oE.disabled || (this.isShow(e, obj, oE) && 3 == arguments.length))return false;
    var _t = this, o = this.SelectDiv, szId, 
        oR = Base.getOffset(oE),h = oR[3] - 1, w = oR[2], 
        p = {height:'1px',left: oR[0] + "px", top: (oR[1] + h) + "px", display:'block', 
        width: ((Base.bIE ? 2 : 0) + ((obj||{}).width || oE.clientWidth || w)) + "px"}, 
        k, fns = [function(){o["_over"] = 1, o["_tm"] = 3000},
                  function(){o["_over"] = null,o["_tm"] = 13}];
    if(!o)
    {
       this.SelectDiv = o = Base.createDiv({className:"selectInput_FloatDiv", id:"_Xui_SelectDiv"});
       document.body.appendChild(o);
       Base.addEvent(o, "mousemove", fns[0]).addEvent(o, "mousedown", fns[0])
           .addEvent(o, "mouseup", fns[0]).addEvent(o, "mouseout", fns[1]);
    }
    szId = o.id;
    // 状态的处理: 输入对象的id保留
    o[szId] = oE.id, o["_over"] = 1, o["_tm"] = 13, o["_lstNum"] = 0, o["_in"] = false;
    
    /* 修正显示图层的上下位置 */
    if(190 < p.top - document.body.scrollTop)p.top =  p.top - (o.clientHeight || 170) - h;
    /* 失去焦点就隐藏 */
    if(!oE[szId])
    {
       oE[szId] = o.id,
       Base.addEvent(oE, "blur", _t.hiddenSelectDiv).addEvent(oE, "mousemove", fns[0])
           .addEvent(oE, "mouseout", function(e)
           {
             _t.lightRow(-2)
           });
    }
    /  for(k in p)o.style[k] = p[k];
    /* 清除过滤显示数据 */
    3 == arguments.length && (_t.data  = null);
    o.innerHTML = _t.getSelectDataStr(oE, p.width, _t.data);
    o.style["height"] = Math.min(170, k = 2 + (o.scrollHeight || o.childNodes[0].clientHeight)) + "px";
    this.lightRow(0);
    Base.stopPropagation(e);
    Base.preventDefault(e);
  },
  /*隐藏图层的方法*/
  hiddenSelectDiv:function()
  {
    var o = this.SelectDiv;
    // 注册自动关闭
    // 防止重入，如果重入就回启动多个timer服务定时器
    if(o && !o["_in"])
    {
        o["_over"] = null;
	    o["_in"] = true;
	    Base.regTimer(function(e)
	    {
	       if(!o["_over"])
	          return o["_in"] = false, o.style.display = 'none', true;
	       return false
	    },o["_tm"]);
    }
  }
}