package jcore.jsonrpc.rpcobj; // 必须是jcore.jsonrpc.rpcobj包下才可以免注册

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import jcore.jsonrpc.common.JsonRpcObject;
import jcore.jsonrpc.testobj.MyTestObj;

public class MyTestRpc extends JsonRpcObject {
	/**
	 * 返回普通的类型
	 * 直接使用类名MyTestRpc就可以调用，如下： 调用：rpc.MyTestRpc.getTestMsg()
	 * 
	 * @return
	 */
	public String getTestMsg() {
		// 获取界面中所有的输入对象值
		Map m = this.getAllInputParms();
		return "噢，成功了！mytest1 = " + m.get("mytest1") + ", mytest2= " + m.get("mytest2") + ", mytest3 = " + m.get("mytest3");
	}
	
	/**
	 * 返回List
	 * @return
	 */
	public List testGetList()
	{
		List lst = new ArrayList();
		lst.add(new String[]{"good1", "测试2", "测试4"});
		lst.add(new Object[]{new Integer(234), new Boolean(true), new java.math.BigDecimal(3444.454345)});
		return lst;
	}
	
	/**
	 * 返回复合对象
	 * @return
	 */
	public Object getMyObj()
	{
		return new MyTestObj();
	}
}