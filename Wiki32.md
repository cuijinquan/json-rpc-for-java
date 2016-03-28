示例工程下载地址：
http://json-rpc-for-java.googlecode.com/files/JsonRpcExample2008-08-05.rar

# 增加功能： #
## 异常消息自动捕获 ##
rpc的java方法中不需要try catch，当发生异常的时候框架自动为你捕获，因此你可以直接调用getErrMsg()获得最近一次异常消息
## 增加release 释放对象注册的资源 ##
调用release后，所有对该对象的调用都返回false

```
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

jcore.jsonrpc.common.JsonRpcRegister.registerObject(request, "myjsonrpc", test.TestObject.class);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>测试JSON-RPC for java</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
<script type="text/javascript" src="JsonRpcClient.js"></script>
  </head>
  <body>
<script type="text/javascript">
var json = JsonRpcClient("JRPC"), myjsonrpc = json.myjsonrpc;
var oTestDomain = myjsonrpc.getMyObj(); // myjsonrpc.myList[1]
</script>
<textarea style="width:100%;height:350px;">
// TestDomain.java
package test;

import java.io.Serializable;

public class TestDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	private String myName = "夏天";
	private String sex = "男";
	private int age = 10000;
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	
	public String toXml()
	{
		return new StringBuffer()
		.append("<name>").append(getMyName()).append("</name>")
		.append("<sex>").append(getSex()).append("</sex>")
		.append("<age>").append(getAge()).append("</age>")
		.toString();
	}
	public String getMyName() {
		return myName;
	}
	public void setMyName(String myName) {
		this.myName = myName;
	}
	public void makeException() throws Exception
	{
		throw new Exception("让框架自动捕获错误消息");
	}

}

// TestObject.java
package test;
import java.util.ArrayList;
import java.util.List;

import jcore.jsonrpc.common.JsonRpcObject;

public class TestObject extends JsonRpcObject {
	private static final long serialVersionUID = 1L;

	private List myList = new ArrayList();
	
	public TestObject()
	{
		myList.add("good");
		myList.add(new TestDomain());
	}
	
	public Object getStr()
	{
		return myList.get(0);
	}
	
	public Object getMyObj()
	{
		return myList.get(1);
	}
}

</textarea>
<style type="text/css">
p{cursor:pointer}
</style>
<p onclick="alert(oTestDomain.getMyName())">调用TestDomain.java中的getMyName,代码：alert(oTestDomain.getMyName())</p>
<p onclick="myjsonrpc.getStr(function(s){alert(s)});">调用TestObject.java中的getStr,代码：myjsonrpc.getStr(function(s){alert(s)});</p>
<p onclick="oTestDomain.setAge(999999)">调用TestDomain.java中的setAge,代码：oTestDomain.setAge(999999)</p>
<p onclick="oTestDomain.setMyName('风情主人 QQ: 11602011')">调用TestDomain.java中的setMyName,代码：oTestDomain.setMyName('风情主人 QQ: 11602011')</p>
<p onclick="alert(oTestDomain.toXml())">调用TestDomain.java中的toXml,代码：alert(oTestDomain.toXml())</p>
<p onclick="oTestDomain.makeException(),alert(myjsonrpc.getErrMsg())">测试自动捕获错误消息，调用TestDomain.java中的makeException,代码：oTestDomain.makeException(),alert(myjsonrpc.getErrMsg())</p>

<p onclick="myjsonrpc.release()">释放注册的对象，释放后上面的调用将发生错误,代码：myjsonrpc.release()</p>

  </body>
</html>

```