{
	init: function () {
	    XUI(this);
		this.swfCache = [];
		return this;
	},
	addSwfNoRight:function(id)
	{
	    var _t = RightClick;
	    this.swfCache.push(id);
		this.Cache = id;
		if(window.addEventListener){
			 window.addEventListener("mousedown", this.onGeckoMouse(), true);
		} else {
		    var oParent = $("#" + id).parent()[0];
		    if(oParent)
		    {
		      oParent.onmouseup = function() { if(oParent.releaseCapture)oParent.releaseCapture(); }
			  oParent.onmousedown = RightClick.onIEMouse;
			}
			document.oncontextmenu = function(){ if(-1 < _t.swfCache.indexOf(window.event.srcElement.id)) { return false; }}
		}
	},
	/* 阻止事件的传递 */
	killEvents: function(e) {
		if(e) {
			if (e.stopPropagation) e.stopPropagation();
			if (e.preventDefault) e.preventDefault();
			if (e.preventCapture) e.preventCapture();
	   		if (e.preventBubble) e.preventBubble();
		}
	},
	onGeckoMouse: function(ev) {
	    var _t = RightClick;
	  	return function(ev) {
	    if (ev.button != 0) {
			RightClick.killEvents(ev);
			if(-1 < _t.swfCache.indexOf(ev.target.id) && RightClick.Cache == ev.target.id) {
	    		RightClick.call(ev.target.id);
			}
			RightClick.Cache = ev.target.id;
		}
	  }
	},
	onIEMouse: function() {
	    var _t = RightClick, szId = window.event.srcElement.id, oParent = $("#" + szId).parent()[0];
	  	if (event.button > 1) {
			if(-1 < _t.swfCache.indexOf(szId) && RightClick.Cache == szId) {
				RightClick.call(szId); 
			}
			if(oParent)oParent.setCapture();
			if(szId)RightClick.Cache = szId;
		}
	},
	call: function(id) {
		document.getElementById(id).rightClick();
	}
}