{
	/*失去焦点触发事件，使swf隐藏*/
	myBlur:function (id,e){
	  var o = getMultiSwf("__multiSelectSwf_" + id);
	  o && o.closeMultiSelect && o.closeMultiSelect();
	},
	/**隐藏swf*/
	hideSWF:function (o){
	  Base.setValue(o.p, o.sv);
	  Base.setValue(("_mask_multi" + o.p), o.v);
	  var div = $("#__multiComboBoxDiv_" + o.id);
	  div && div.css({left:"-1000px", top: "-1000px"});//避免swf的回调函数，在div隐藏后失效
	},
	/*显示swf的多选下拉框*/
	openSwf:function (input){
	  input && input.blur();//使input失去焦点，以免在swf上和input产生2个光标 
	  var multiid = $(input).attr("multiid"), div = $("#__multiComboBoxDiv_" + multiid),
	      oPos = $(input).position(),//定位swf的div的位置,输入框相对父容器的位置
	      o = getMultiSwf("__multiSelectSwf_" + multiid);
	  //o.width = $(input).width() + 2; //1.OBJECT宽度的控制 : 1.IE第一次不能弹出下拉框 2.FIXME:firefox not work    
	  div.css({left:oPos.left + "px", top: (oPos.top) + "px"});
	  if (o){
	    o.focus();//触发onfocus事件: 1.好处是，打开swf的div时，就将焦点置于swf上，以便在焦点失去的时候，触发object的onblur事件
	              //                2.坏处是，第一次点击的时候，会使swf消失,
	    o.openMultiSelect && o.openMultiSelect();      
	  }
	},
	/*根据swf的id获取OBJECT对象*/
	getMultiSwf:function (id){
	    return -1 != navigator.appName.indexOf("Microsoft") ? window[id] || document.getElementById(id): document[id];
	}
}