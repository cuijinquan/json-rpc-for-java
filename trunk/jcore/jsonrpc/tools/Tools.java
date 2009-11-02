package jcore.jsonrpc.tools;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jcore.jsonrpc.common.JSONObject;

public class Tools {

	/***************************************************************************
	 * 通过路径获取File对象
	 * 
	 * @param resource
	 * @return
	 * @throws IOException
	 */
	public static File getResourceAsFile(String resource) throws IOException {
		return new File(getResourceURL(resource).getFile());
	}

	public static Reader getResourceAsReader(String resource)
			throws IOException {
		return new InputStreamReader(getResourceAsStream(resource));
	}
	 public static InputStream getResourceAsStream(String resource) throws IOException {
		    InputStream in = null;
		    ClassLoader loader = Tools.class.getClassLoader();
		    if (loader != null) in = loader.getResourceAsStream(resource);
		    if (in == null) in = ClassLoader.getSystemResourceAsStream(resource);
		    if (in == null) throw new IOException("Could not find resource " + resource);
		    return in;
		  }


	/***************************************************************************
	 * 通过路径获取URL对象
	 * 
	 * @param resource
	 * @return
	 * @throws IOException
	 */
	public static URL getResourceURL(String resource) throws IOException {
		URL url = null;
		ClassLoader loader = Tools.class.getClassLoader();
		if (loader != null)
			url = loader.getResource(resource);
		if (url == null)
			url = ClassLoader.getSystemResource(resource);
		if (url == null)
			url = Tools.class.getResource(resource);

		if (url == null)
			throw new IOException("Could not find resource " + resource);
		return url;
	}
	
	 private static final char c[] = { '<', '>', '&', '\"'};
	 private static final String expansion[] = {"&lt;", "&gt;", "&amp;", "&quot;"};
	 /**
	  * 将串中的 <, >, &, " 编码为html的表示方式
	  * @param s
	  * @return
	  */
	public static String HTMLEncode(String s) {
	      StringBuffer st = new StringBuffer();
	      for (int i = 0; i < s.length(); i++) {
	          boolean copy = true;
	          char ch = s.charAt(i);
	          for (int j = 0; j < c.length ; j++) {
	            if (c[j]==ch) {
	                st.append(expansion[j]);
	                copy = false;
	                break;
	            }
	          }
	          if (copy) st.append(ch);
	      }
	      return st.toString();
	    }
	
	/**
	 * html方式的解码
	 * @param s
	 * @return
	 */
	public static String HTMLDecode(String s) {
		  if(null == s || 0 == (s = s.trim()).length())return s;
	      return s.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&quot;", "\"");
	    }

	/***************************************************************************
	 * 解码html方式编码的中文汉字 ，例如将： "&#24322;&#24120;" 解码为 "异常"
	 * 符合的汉字正则表达式范围是：[\u4E00-\u9FA5]
	 * 
	 * @param szStr
	 * @return
	 */
	public static String decodeUnicodeHtm(String szStr) {
		Pattern p = Pattern.compile("&#(\\d+);", Pattern.MULTILINE);
		Matcher m = null;
		try {
			m = p.matcher(java.net.URLDecoder.decode(szStr, "UTF-8"));
		} catch (Exception e) {
			return szStr;
		}
		StringBuffer buf = new StringBuffer();
		if(null != m)
		while (m.find())
			m.appendReplacement(buf, (char) Integer.valueOf(m.group(1))
					.intValue()
					+ "");
		m.appendTail(buf);
		return buf.toString();
	}
	
	/*****************************************************************************
	 * 编码码字符串为html方式编码的中文汉字，例如将： "异常" 编码为 "&#24322;&#24120;"
	 * 符合的汉字正则表达式范围是：[\u4E00-\u9FA5]
	 * 
	 * @param szStr
	 * @return
	 */
	public static String encodeUnicodeHtm(String szStr) {
		if (null == szStr || 0 == szStr.trim().length())
			return szStr;
		Pattern p = Pattern.compile("[\u4E00-\u9FA5]", Pattern.MULTILINE);
		Matcher m = p.matcher(szStr);
		StringBuffer buf = new StringBuffer();
		while (m.find())
			m.appendReplacement(buf, "&#" + (int) m.group(0).toCharArray()[0] + ";");
		m.appendTail(buf);
		return buf.toString();
	}
	
	/**
	 * 将s中的汉字转换为\u4E00-\u9FA5这样的形式
	 * @param s
	 * @return
	 */
	public static String encodeUnicode2Js(String s)
	{
		StringBuffer buf = new StringBuffer();
		for(int i = 0, j = s.length(); i < j; i++)
		{
			int n = (int)s.charAt(i);
			// if(0x4E00 <= n && n <= 0x9FA5)
			if(255 < n && n <= 0)
			   buf.append("\\u" + Integer.toHexString(n));
			else buf.append((char)n);
		}
		return buf.toString();
	}
	
	/**
	 * 将s中的汉字转换为\u4E00-\u9FA5这样的形式
	 * @param s
	 * @return
	 */
	public static String decodeUnicode4Js(String szStr)
	{
		if (null == szStr || 0 == szStr.trim().length())
			return szStr;
		Pattern p = Pattern.compile("\\\\u([0-9A-Fa-f])", Pattern.MULTILINE);
		Matcher m = p.matcher(szStr);
		StringBuffer buf = new StringBuffer();
		while (m.find())
		{
			m.appendReplacement(buf, "" + (char)Integer.parseInt( m.group(0), 16));
		}
		m.appendTail(buf);
		return buf.toString();
	}

	/***************************************************************************
	 * 判断对象o是否是为不需要注册的"简单"对象
	 * 
	 * @param o
	 * @return
	 */
	public static boolean isSimpleType(Object o) {
		if (null == o)
			return false;
		String szType = o.getClass().getName();
		Pattern pa = Pattern.compile("^class \\[[ZBCISJFDL]");
		Matcher m = pa.matcher(szType);

		if (-1 < ",java.lang.String,java.util.Date,java.sql.Timestamp,java.lang.Boolean,java.lang.Character,java.lang.Short,java.lang.Integer,java.lang.Long,java.lang.Float,java.lang.Double,boolean,char,byte,short,int,long,float,double,"
				.indexOf("," + szType + ",")
				|| m.find()) {
			// 清除对象使用关联关系，便于内存的有效利用
			m = null;
			pa = null;
			szType = null;
			return true;
		}
		// 清除对象使用关联关系，便于内存的有效利用
		m = null;
		pa = null;
		szType = null;
		return false;
	}

	/***************************************************************************
	 * 判断对象o实现的所有接口中是否有szInterface 2008-08-07 修正多继承中判断接口的功能， 以及修正接口继承后的判断功能
	 * package test;
	 * 
	 * public interface ITest extends Serializable public interface ITest1
	 * extends ITest public class Test1 implements ITest1 public class Test2
	 * extends Test1 public class Test3 extends Test2
	 * 
	 * isInterface(Test3.class, "java.io.Serializable") = true
	 * isInterface(Test3.class, "test.ITest") = true isInterface(Test3.class,
	 * "test.ITest1") = true
	 * 
	 * @param c
	 * @param szInterface
	 * @return
	 */
	public static boolean isInterface(Class c, String szInterface) {
		if (c.getName().equals(szInterface))
			return true;
		Class[] face = c.getInterfaces();
		for (int i = 0, j = face.length; i < j; i++) {
			if (face[i].getName().equals(szInterface)) {
				return true;
			} else {
				Class[] face1 = face[i].getInterfaces();
				for (int x = 0; x < face1.length; x++) {
					if (face1[x].getName().equals(szInterface)) {
						return true;
					} else if (isInterface(face1[x], szInterface)) {
						return true;
					}
				}
			}
		}
		if (null != c.getSuperclass()) {
			return isInterface(c.getSuperclass(), szInterface);
		}
		return false;
	}

	/***************************************************************************
	 * 从c中获取到指定名字的方法对象，参数类型必须符合clsParm的描述，并尝试从super中进行搜索
	 * 
	 * @param c
	 * @param clsParm
	 * @param szName
	 * @return
	 */
	public static Method getSpecifyNameMethod(Class c, Class[] clsParm,
			String szName) {
		try {
			return c.getDeclaredMethod(szName, clsParm);
		} catch (Exception e) {
		}
		if (!c.getSuperclass().getName().equals("java.lang.Object"))
			return getSpecifyNameMethod(c.getSuperclass(), clsParm, szName);
		return null;
	}

	/***************************************************************************
	 * 在对象继承链路中寻找指定的field对象
	 * 
	 * @param c
	 * @param szName
	 * @return
	 */
	public static Field getSpecifyNameField(Class c, String szName) {
		try {
			Field[] f = c.getDeclaredFields();
			for (int i = 0; i < f.length; i++) {
				if (f[i].getName().equals(szName)) {
					f[i].setAccessible(true);
					return f[i];
				}
			}
		} catch (Exception e) {
		}
		if (!c.getSuperclass().getName().equals("java.lang.Object"))
			return getSpecifyNameField(c.getSuperclass(), szName);
		return null;
	}

	/***************************************************************************
	 * 将对象oValue向convert2TypeName类型进行转换
	 * 
	 * @param convert2TypeName
	 * @param oValue
	 * @return
	 */
	public static Object convertObject(Class convert2TypeName, Object oValue) {
		String szNm = convert2TypeName.getName();
		// 如果类型不匹配，就进行一系列转换
		// 将整数向日期进行转换
		if (null != oValue && !szNm.equals(oValue.getClass().getName())
				&& null != oValue) {
			String s = oValue.toString().trim(), szTmp01 = s.replaceAll(
					"[^\\d\\.\\-]", "");
			// 支持的参数类型、复合类型对象传入的处理
			// 防止无效的值在强制转换中发生异常
			try {
				if (szNm.equals("java.util.Date"))
					return new Date(Long.parseLong(szTmp01));
				else if (szNm.equals("java.math.BigDecimal"))
					return new BigDecimal(szTmp01);
				else if (szNm.equals("boolean")
						|| szNm.equals("java.lang.Boolean"))
					return new Boolean(szTmp01);
				else if (szNm.equals("char")
						|| szNm.equals("java.lang.Character"))
					return new Character(s.charAt(0));
				else if (szNm.equals("float") || szNm.equals("java.lang.Float"))
					return new Float(szTmp01);
				else if (szNm.equals("java.lang.Short"))
					return new Short(szTmp01);
				else if (szNm.equals("int") || szNm.equals("java.lang.Integer"))
					return new Integer(szTmp01);
				else if (szNm.equals("long") || szNm.equals("java.lang.Long"))
					return new Long(szTmp01);
				else if (szNm.equals("double")
						|| szNm.equals("java.lang.Double"))
					return new Double(szTmp01);
				else if (szNm.equals("java.lang.String")) {
					return s;
				} else {
					// 复合对象的处理
					if (s.startsWith("{") && s.endsWith("}")) {
						boolean bMap = isInterface(convert2TypeName,
								"java.util.Map");
						// 入口参数的符合对象类型必须是能够实例化的对象
						Object oRst = bMap ? new HashMap() : convert2TypeName
								.newInstance();
						Map map = new JSONObject(s).getHashMap();
						if (bMap)
							return map;
						else {
							// 迭代传入的参数
							Iterator it = map.entrySet().iterator();
							map = null;
							while (it.hasNext()) {
								Map.Entry entry = (Map.Entry) it.next();
								String szKey = (String) entry.getKey();
								if (null != szKey) {
									Field field = getSpecifyNameField(
											convert2TypeName, szKey);
									if (null != field) {
										field.setAccessible(true);
										field.set(oRst, entry.getValue());
									}
									// 寻找set方法
									else {
										Method mehod = getSpecifyNameMethod(
												convert2TypeName,
												new Class[] { java.lang.Object.class },
												"set"
														+ szKey.substring(0, 1)
																.toUpperCase()
														+ szKey.substring(1));
										// 注入内容
										if (null != mehod)
											try {
												mehod.invoke(oRst,
														new Object[] { entry
																.getValue() });
											} catch (Exception e) {
											}
									}
									field = null;
								}
								entry = null;
								szKey = null;
							}
							return oRst;
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else
			return oValue;
		return null;
	}
}
