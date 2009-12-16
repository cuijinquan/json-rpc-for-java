{
    /* 初始化下拉树，包括事件的一次性绑定 */
     initSlctTree:function(o)
    {
       var id = o;
       o = $("#" + o);
       window.hdAll.push(function(){o.hide()});
       var oI = o.next(":input:first"), oTb = $(Base.p(oI[0], "TABLE"));
       oI.focus(function()
       {
           window.hdAll.start();
           var oPos = oI.position();
	       o.css({left:oPos.left + "px", top: (oPos.top + oI.height()) + "px", width:oTb.width() + 'px'});
	       o.show();
	       XuiTree.curTree = XuiTree.XuiTreeCc[id];
       }).keydown(function(e)
       {
           o.show();
           o.keydown(e);
       });
       /* 后面图标的点击 */
       oTb.click(function(){oI.focus()});
    }
}