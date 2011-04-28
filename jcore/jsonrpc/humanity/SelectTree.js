{
    /* 初始化下拉树，包括事件的一次性绑定 */
     initSlctTree:function(o,oStyle)
    {
       var id = o;
       o = $("#" + o);
       window.hdAll.push(function(){o.hide()});
       var oI = o.next(":input:first"), oTb = $(Base.p(oI[0], "TABLE"))
       oI.focus(function()
       {
       	  if(oI.attr("readonly") || oI.attr("disabled")) return;
           window.hdAll.start();
           var oSlct = $(XuiTree.slctCls), i,
                 oPos = oI.position();
	       o.css({left:oPos.left + "px", top: (oPos.top + oI.height()) + "px"});
	        if(oStyle && oStyle.width )o.css("width", oStyle.width.replace(/[^\d]/g,""));
       		else o.css("width",oTb.width()+'px');
       		if(oStyle && oStyle.height)o.css("height",oStyle.height.replace(/[^\d]/g,"")+'px');
	       o.show();
	       
          if(1 < oSlct.length)
           {
             /*只去除没有值的节点的状态*/
             var xxx = -1, kk;
             o.find(".x-tree-selected").each(function(){
               xxx++;
               if(-1 == this.innerHTML.indexOf(oI[0].nextSibling.value))
                 $(this).removeClass("x-tree-selected");
               else kk = xxx;
             });
             /* 必须模拟点击，设置最后的点击状态 */
              oSlct=oSlct[kk];XuiTree.curTree.select(oSlct,null,null);

              Base.fnSciv($("#" + id)[0], oSlct);
           }
       }).keydown(function(e)
       {
       	   if(oI.attr("readonly") || oI.attr("disabled")) return;
           if(9 == e.which)return o.hide(),true;
           o.show();
           XuiTree.curTree = XuiTree.XuiTreeCc[id];
           o.keydown(e);
           $(this).focus();
       }).change(function(){
           if(0 == this.value.trim().length)$(this).next().val('');
       }).blur(function(){
           if(!$(this).next().val())this.value = '';
       });
       /* 后面图标的点击 */
       oTb.click(function(){oI.focus()});
    }
}