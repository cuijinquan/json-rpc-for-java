{
  base: rpc.LoadJsObj("Base"),
  /*获取要显示的内容*/ 
  getSelectDataStr:function(oE)
  { 
   	var _t = this, a = slctIptData[oE.id]["collection"], a1 = ["<table style=\"width:100%;margin:0px;padding:0px;\">"], i, j, o, k,
             b = slctIptData[oE.id]["displayFields"], bDisp = !b;
    !bDisp && (b = b.split(/[,;\|\/]/));
   	for(i = 0; i < a.length; i++)
    {
      o = a[i];
      a1.push("<tr>");
      if(bDisp)
      {
          for(k in o)
     	  if("_id_" != k) 
             a1.push("<td>"), a1.push(o[k]), a1.push("</td>");
      }
      else
      {
        for(j = 0; j < b.length; j++)
        {
          a1.push("<td>"), a1.push(o[b[j]]), a1.push("</td>");
        }
      }
      a1.push("</tr>");
    }
    a1.push("</table>");
    return a1.join("")
  },
  /*显示下拉列表图层*/
  showSelectDiv: function(e, obj)
  {
    var base = this.base,_t = this, szId = "_Xui_SelectDiv", o = base.id(szId), 
        oE = base.FromEventObj(e), oR = base.getOffset(oE),h = oR[3] - 1, w = oR[2], 
        p = {height:'1px',left: oR[0] + "px", top: (oR[1] + h) + "px", display:'block', 
        width: ((base.bIE ? 2 : 0) + ((obj||{}).width || oE.clientWidth || w)) + "px"}, 
        k, fns = [base.bind(function(){this.id('_Xui_SelectDiv')["_over"] = 1}, base),
                  base.bind(function(){this.id('_Xui_SelectDiv')["_over"] = null}, base)];
    
    if(!o)
    {
       o = base.createDiv({className:"selectInput_FloatDiv", id: szId}),
       document.body.appendChild(o);
       base.addEvent(o, "mousemove", fns[0]).addEvent(o, "click", fns[0])
           .addEvent(o, "mouseout", fns[1]);
    }
    o.innerHTML = _t.getSelectDataStr(oE);
    
    // 状态的处理
    o["_iptId"] = oE.id, o["_over"] = 1;
    
    /* 修正显示图层的上下位置 */
    if(190 < p.top - document.body.scrollTop)p.top =  p.top - (o.clientHeight || 170) - h;
    /* 失去焦点就隐藏 */
    if(!oE[szId])
    {
       base.addEvent(oE, "blur", base.bind(_t.hiddenSelectDiv, _t)), oE[szId] = o.id;
       base.addEvent(oE, "mousemove", fns[0]);
    }
    for(k in p)
      o.style[k] = p[k];
    o.style["height"] = Math.min(170, k = 2 + (o.scrollHeight || o.childNodes[0].clientHeight)) + "px";
    base.stopPropagation(e);
  },/*隐藏图层的方法*/
  hiddenSelectDiv:function()
  {
    var base = this.base, _t = this, o = base.id('_Xui_SelectDiv');
    o["_over"] = null;
    // 注册自动关闭
    base.regTimer(function(e)
    {
       if(!o["_over"])
          return o.style.display = 'none', true;
       return false
    }, 333);
  }
}  