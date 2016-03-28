Contents
4 Summary
Links 4
Author Links 4
Open-source projects address 4
Download works svn address 4
Examples of projects download address 4
Supported browser 5
Java objects to the JavaScript object tables 5
Features 6
Automatic caught 6
JavaScript registered in the release of the Java clients 6
Cascade called functional 7
Use 7
Web.xml configuration 7
7 package introduced Jar
AJAX Java services such as the preparation of 8
The preparation of their base class 9
AJAX Java class registration services 10
Their registration-type of preparation of 10
JSP in the use of 12
The introduction of JsonRpcClient.js 12
Calling 12




Overview
Following the "JavaScript and practice of advanced applications," after the launch json-rpc-for-java open source code, is only 100 lines of javascript code and less than 10 java super lightweight paper to achieve the rapid adoption of javaScript call java objects and Back to the arbitrary target lightweight framework, and support the cascade call, which means do not need additional JavaScript programming, it can be registered through the javascript call object and return to the java java object, if there are ways to return to the target, In this javascript in the java object to return to the variables, you can also continue to call it the way ..... This is the lightweight json-rpc-for-java the Shenqizhichu.
Link
Author Links
Author csdn blog
Sina author of more than 600 million hits blog
Author site
Open-source projects address
http://code.google.com/p/json-rpc-for-java/

Download address works svn
http://json-rpc-for-java.googlecode.com/svn/trunk/
Does not require a username and password.
Examples of projects download address

http://json-rpc-for-java.googlecode.com/files/JsonRpcExample2008-08-05.rar

Test environment: MyEclipse, JRE1.4 (or 1.6), tomcat 5.0 (or 6.0) If you want to test, can use the appropriate environment, need not be so high version of the environment, Import projects in the works Please note amended to correct JRE The path:


Supported browser
IE4, IE5, IE6, IE7, IE8, FireFox, Opera, Safari and so on.

Java objects to the JavaScript object tables
JavaScript object that Java objects
java.lang.String String
java.lang.Object String call java object toString (), after conversion to JavaScript
java.util.Date, java.sql.Timestamp String But for yyyy-MM-dd HH: mm: ss.000, if at all Fenmiao 0, is: yyyy-MM-dd
java.lang.Boolean Blooean the corresponding value: true, false
java.lang.Character String single string, such as: 'c'
java.lang.Short,
java.lang.Integer,
java.lang.Long,
java.lang.Float,
java.lang.Double,
java.math.BigDecimal Number in JavaScript are for the number of objects, can be directly involved in the increase, subtraction, multiplication, with the exception of computing
java.util.Map Object, for example: obj ["key1"](.md), obj ["key3"](.md), obj.key3, not only function of the way, of course, the function Object.prototype are still some properties
java.util.List Array, for example: a [0](0.md), a [2](2.md). getList ()
In other words, can also exist List of objects, these objects can still have their own methods
null null space object
Object other Java objects such as: obj.displayName (), obj.aac001, can have properties and methods
Features
Automatically be caught
In your java services prepared by the method does not require try (….) Catch (Exception e) (), this framework will you catch an error message, but you do not get javascript to the correct data, can be called asynchronous Object methods getErrMsg () access to unusual sources, the method in jcore.jsonrpc.common.JsonRpcObject in the package, which is java-based AJAX services category.
JavaScript registered in the release of the Java clients
You only need to call in JavaScript release () on the release of the Java objects registered resources, see detailed examples of works, or see "
http://code.google.com/p/json-rpc-for-java/wiki/Wiki32
Cascade called functional
Please do not understand the combination of local examples of the works to understand.
1, Java in the registration of objects myjsonrpc
2, JSP JavaScript in access to the object: var myjsonrpc = JsonRpcClient (). Myjsonrpc;
3, the call was registered java object methods getMyObj, the return of the java object TestDomain:
var oDomain = myjsonrpc. getMyObj ();
/ / To the call to return to the java object methods
alert (oDomain. toXml ())
Or: alert (myjsonrpc. getList () [1](1.md). ToXml ());
If toXml return or a composite of Java objects, you may continue to call in JavaScript, without the need for additional programming.
Use
Web.xml configuration
Web.xml need to add the following configuration "


&lt;servlet&gt;




&lt;servlet-name&gt;

 JSONRPCServlet </ servlet-name>


&lt;servlet-class&gt;


Jcore.jsonrpc.servlet.JSONRPCServlet
</ Servlet-class>


&lt;load-on-startup&gt;

 2 </ load-on-startup>
</ Servlet>


&lt;servlet-mapping&gt;




&lt;servlet-name&gt;

 JSONRPCServlet </ servlet-name>


&lt;url-pattern&gt;

 / JRPC </ url-pattern>
</ Servlet-mapping>
The introduction of Jar package
The need to introduce the works: JSON-RPC.jar, commons-logging.jar, commons-logging-api.jar, which followed two examples of projects in the jar in the JsonRpcExample \ webapp \ WEB-INF \ lib \ under. Examples of projects download address:
http://json-rpc-for-java.googlecode.com/files/JsonRpcExample2008-08-05.rar
And, JSON-RPC.jar, you can re-introduction of the source code package.
AJAX Java services such as the preparation of
We must inherit and jcore.jsonrpc.common.JsonRpcObject, and to achieve interface java.io.Serializable. Examples of projects such as AJAX services in the Java class:
package test;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jcore.jsonrpc.common.JsonRpcObject;

public class TestObject extends JsonRpcObject implements Serializable (
Private static final long serialVersionUID = 1L;

Private List myList = new ArrayList ();
Private Map map = new HashMap ();

Public TestObject ()
(
MyList.add ( "good");
MyList.add (new TestDomain ());
/ / Map of the compound can also Add to object
Map.put ( "first", "The first duty");
Map.put ( "p2", new Date ());
Map.put ( "domain", myList.get (1));
)

/  To Map object
**@ Return** /
Public Map getMap ()
(
Return map;
)

/ **Get an ordinary object** @ Return
**/
Public Object getStr ()
(
Return myList.get (0);
)**

/  Access to a composite target
**@ Return** /
Public Object getMyObj ()
(
Return myList.get (1);
)

/ **Get List object** @ Return
**/
Public List getList ()
(
Return myList;
)
)**

The preparation of their base class
Similarly, you can achieve some of succession jcore.jsonrpc.common.JsonRpcObject base class, so in their own projects in a more convenient and practical, such as:
package com.yinhai.yhsi2.web.common;

import com.yinhai.webframework.session.UserSession;
import jcore.jsonrpc.common.JsonRpcObject;

public abstract class Yhsi2JsonRpcObj extends JsonRpcObject (

Private UserSession us = null;
Public Yhsi2JsonRpcObj () (
Super ();
)

Public UserSession getUs () (
If (null == us)
Us = UserSession.getUserSession (getRequest ());
Return us;
)
)

AJAX Java class registration services
/ / Note that the class must be registered is to be examples of the type

jcore.jsonrpc.common.JsonRpcRegister.registerObject (us, "myjsonrpc", test.TestObject.class);

Test.TestObject.class way is to use multiple registration does not guarantee test.TestObject been repeatedly registered the implementation of several examples, and then to improve performance and allow multiple registration - indeed, within only registered once.
Registration of their own kind of preparation
Of course, you can also inherit jcore.jsonrpc.common.JsonRpcRegister in the application menu in order to make the switch when the release of resources, such as:
package com.yinhai.yhsi2.web.common;
import javax.servlet.http.HttpServletRequest;

import jcore.jsonrpc.common.Content;
import jcore.jsonrpc.common.JSONRPCBridge;

import com.yinhai.webframework.session.UserSession;
import jcore.jsonrpc.common.JsonRpcRegister;

/ *** Registration JsonRpc target
  * @ Author just
  * 
  * /
public class JsonRpcRegister extends jcore.jsonrpc.common.JsonRpcRegister (**

/  The request to register objects
**@ Param request** @ Param szKeyName
**@ Param o** /
public static void registerObject (HttpServletRequest request, String szKeyName, Object o)
(
registerObject (UserSession.getUserSession (request), szKeyName, o);
)

/  The request to register objects
**@ Param request** @ Param szKeyName
**@ Param o** /
public static void registerObject (UserSession us, String szKeyName, Object o)
(
If (null! = Us)
(
JSONRPCBridge brg = (JSONRPCBridge) us.getCurrentBusiness (). GetSessionResource (Content.RegSessionJSONRPCName);
> / / If this is the first time on the registration target
If (null == brg)
us.getCurrentBusiness (). putSessionResource (Content.RegSessionJSONRPCName, brg = new JSONRPCBridge (). setSession (us.getHttpSession ()));
Brg.registerObject (szKeyName, o);
)
)



/  The request to register objects
**@ Param request** @ Param szKeyName
**@ Param o** /
public static void registerObject (HttpServletRequest request, String szKeyName, Class o)
(
registerObject (UserSession.getUserSession (request), szKeyName, o);
)

/  The request to register objects
**@ Param request** @ Param szKeyName
**@ Param o** /
public static void registerObject (UserSession us, String szKeyName, Class o)
(
If (null! = Us)
(
JSONRPCBridge brg = (JSONRPCBridge) us.getCurrentBusiness (). GetSessionResource (Content.RegSessionJSONRPCName);
> / / If this is the first time on the registration target
If (null == brg)
us.getCurrentBusiness (). putSessionResource (Content.RegSessionJSONRPCName, brg = new JSONRPCBridge (). setSession (us.getHttpSession ()));
Try (
brg.registerObject (szKeyName, o.newInstance ());
) Catch (InstantiationException e) (
) Catch (IllegalAccessException e) (
)
)
)
)

The use of JSP
The introduction of JsonRpcClient.js


&lt;script charset="UTF-8" type="text/JavaScript" src="JsonRpcClient.js"&gt;

 </ script>
Call


&lt;script charset="UTF-8" type="text/JavaScript"&gt;

 <!--//--><![ CDATA [//><!--

/ / Myjsonrpc is registered by the name of JsonRpcRegister.registerObject
/ / Rpc here this time through the ownership of registered JsonRpcRegister.registerObject
/ / Asynchronous method of the corresponding object
var rpc = JsonRpcClient (). myjsonrpc;
/ / Personal code into the basic access to information and to fill the interface
if ( "dto (aac001)" === o.name & & 0 === "aab001". getValue (). length)
> (
> > if (0 <o.value.length)
> > (
> > / / Myjsonrpc access to the same aac001, aab001 attributes, and so on,
/ / You can use the same getAac001 (), and other methods,
/ / Can be used directly, without the need for additional coding
var myjsonrpc = rpc.getEmployeeBaseInfo (o.value), errMsg = rpc.getErrMsg ();
If (0 <errMsg.length)
Return o.focus (), alert (errMsg), false;
For (var k in myjsonrpc)
If (6 === k.length & & myjsonrpc [k](k.md))
K.getObj () & & k.setValue (myjsonrpc [k](k.md));
FnSetAtbt ( "dto (aac001)". GetObj (), 1),
FnSetAtbt ( "dto (aab001)". GetObj (), 4),
"Aab001". Focus ();
/ / Off the wrong message that
;
)

> )
/ / 2008-08-02 abnormal increase automatically blocking information, so you do not need to write the code in preparation try catch
/ / If there is unusual news, you can call js rpc.getErrMsg () was
/ / If you need the release of the registered name myjsonrpc target JsonRpcObj, can call in js rpc.release ();

//--><!]]></ script>