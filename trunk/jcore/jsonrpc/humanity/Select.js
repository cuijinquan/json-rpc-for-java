{
  base: (window.Base = rpc.LoadJsObj("Base")),
  getData:function(szId)/*获取下拉列表数据*/
  {
    return slctIptData[szId]["collection"]
  },/*高亮显示指定的行*/
  lightRow:function(n)
  {
    var r = Base.id("_Xui_SelectDiv").childNodes[0].rows;
    if(0 <= n && r.length > n)
         Base.fireEvent(r[n],"mouseover");
    else Base.fireEvent(r[0],"mouseout");
  },
  /*获取要显示的内容*/ 
  getSelectDataStr:function(oE, w)
  { 
   	var _t = this, a = this.getData(oE.id), a1 = ["<table cellPadding=\"0\" border=\"0\" cellSpacing=\"0\" style=\"border:0px;width:" + w + ";margin:0px;padding:0px;\">"], i, j, o, k,
             b = slctIptData[oE.id]["displayFields"], bDisp = !b;
    !bDisp && (b = b.split(/[,;\|\/]/));
   	for(i = 0; i < a.length; i++)
    {
      o = a[i];
      a1.push("<tr onclick=\"Select.onSelect(event, this)\" class=\"slcthand\" onmouseover=\"this.title=this.innerText||this.textContent;this.className='slcthand slctOver'\" onmouseout=\"this.className='slcthand'\">");
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
     var id = "_Xui_SelectDiv", o = Base.id(id), oIpt = Base.id(o[id]),
         n = oTr.rowIndex, oT = slctIptData[oIpt.id], data = this.getData(oIpt.id), 
         cbk = oT['selectCallBack'];
     if(0 <= n)
     {
	     /* 处理选择*/
	     if(oT['valueField'])
	       this.setValue(oIpt, data[n][oT['valueField']]);
	     /* 回调处理 */
	     cbk && cbk(data[n], oIpt);
	     Base.preventDefault(e);
	     Base.stopPropagation(e);
	     this.hiddenSelectDiv();
     }else Base.id(szId)["_over"] = 1;
  },
  isShow: function(e, obj, oE)
  {
     var szId, o = Base.id(szId = "_Xui_SelectDiv");
     return(o && "block" == o.style.display && o[szId] == oE.id);     
  },
  /*显示下拉列表图层*/
  showSelectDiv: function(e, obj, oE)
  {
    if(oE.readOnly || oE.disabled || this.isShow(e, obj, oE))return false;
    var _t = this, szId = "_Xui_SelectDiv", o = Base.id(szId), 
        oR = Base.getOffset(oE),h = oR[3] - 1, w = oR[2], 
        p = {height:'1px',left: oR[0] + "px", top: (oR[1] + h) + "px", display:'block', 
        width: ((Base.bIE ? 2 : 0) + ((obj||{}).width || oE.clientWidth || w)) + "px"}, 
        k, fns = [function(){Base.id(szId)["_over"] = 1},
                  function(){Base.id(szId)["_over"] = null}];
    if(!o)
    {
       o = Base.createDiv({className:"selectInput_FloatDiv", id: szId}),
       document.body.appendChild(o);
       Base.addEvent(o, "mousemove", fns[0])
           .addEvent(o, "mousedown", fns[0])
           .addEvent(o, "mouseout", fns[1]);
    }
    
    // 状态的处理: 输入对象的id保留
    o[szId] = oE.id, o["_over"] = 1;
    
    /* 修正显示图层的上下位置 */
    if(190 < p.top - document.body.scrollTop)p.top =  p.top - (o.clientHeight || 170) - h;
    /* 失去焦点就隐藏 */
    if(!oE[szId])
    {
       oE[szId] = o.id,
       Base.addEvent(oE, "blur", _t.hiddenSelectDiv)
           .addEvent(oE, "mousemove", fns[0])
           .addEvent(oE, "mouseout", function(e)
           {
             _t.lightRow(-1)
           });
    }
    for(k in p)
      o.style[k] = p[k];
    o.innerHTML = _t.getSelectDataStr(oE, p.width);
    o.style["height"] = Math.min(170, k = 2 + (o.scrollHeight || o.childNodes[0].clientHeight)) + "px";
    this.lightRow(0);
    Base.stopPropagation(e);
    Base.preventDefault(e);
  },/*隐藏图层的方法*/
  hiddenSelectDiv:function()
  {
    var o = Base.id("_Xui_SelectDiv");
    o["_over"] = null;
    // 注册自动关闭
    // 防止重入
    if(!o["_in"])
    {
	    o["_in"] = true;
	    Base.regTimer(function(e)
	    {
	       if(!o["_over"])
	          return o["_in"] = false, o.style.display = 'none', true;
	       return false
	    },133);
    }
  }
}  