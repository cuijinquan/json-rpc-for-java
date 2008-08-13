package jcore.jsonrpc.tools;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import jcore.jsonrpc.common.JSONObject;

public class Tools {
	
	/***************************************************************************
	 * 判断对象o实现的所有接口中是否有szInterface 
	 * 2008-08-07 修正多继承中判断接口的功能，
	 * 以及修正接口继承后的判断功能
	 * package test;
	 * 
	 * public interface ITest extends Serializable
	 * public interface ITest1 extends ITest
	 * public class Test1 implements ITest1
	 * public class Test2 extends Test1
	 * public class Test3 extends Test2 
	 * 
	 * isInterface(Test3.class, "java.io.Serializable") = true
	 * isInterface(Test3.class, "test.ITest") = true
	 * isInterface(Test3.class, "test.ITest1") = true
	 * @param c
	 * @param szInterface
	 * @return
	 */
	public static boolean isInterface(Class c, String szInterface)
	{
		if(c.getName().equals(szInterface))return true;
		Class[] face = c.getInterfaces();
		for (int i = 0, j = face.length; i < j; i++) 
		{
			if(face[i].getName().equals(szInterface))
			{
				return true;
			}
			else
			{ 
				Class[] face1 = face[i].getInterfaces();
				for(int x = 0; x < face1.length; x++)
				{
					if(face1[x].getName().equals(szInterface))
					{
						return true;
					}
					else if(isInterface(face1[x], szInterface))
					{
						return true;
					}
				}
			}
		}
		if (null != c.getSuperclass())
		{
			return isInterface(c.getSuperclass(), szInterface);
		}
		return false;
	}
	/***
	 * 从c中获取到指定名字的方法对象，参数类型必须符合clsParm的描述，并尝试从super中进行搜索
	 * @param c
	 * @param clsParm
	 * @param szName
	 * @return
	 */
	public static Method getSpecifyNameMethod(Class c, Class []clsParm, String szName)
	{
		try
		{
			return  c.getDeclaredMethod(szName, clsParm);
		}catch(Exception e)
		{
		}
		if(!c.getSuperclass().getName().equals("java.lang.Object"))
			return getSpecifyNameMethod(c.getSuperclass(), clsParm, szName);
		return null;
	}
	
	/***
	 * 在对象继承链路中寻找指定的field对象
	 * @param c
	 * @param szName
	 * @return
	 */
	public static Field getSpecifyNameField(Class c, String szName)
	{
		try
		{
			Field []f = c.getDeclaredFields();
			for(int i = 0; i < f.length; i++)
			{
				if(f[i].getName().equals(szName))
				{
					f[i].setAccessible(true);
					return f[i];
				}
			}
		}catch(Exception e)
		{
		}
		if(!c.getSuperclass().getName().equals("java.lang.Object"))
			return getSpecifyNameField(c.getSuperclass(), szName);
		return null;
	}
	
	/***
	 * 将对象oValue向convert2TypeName类型进行转换
	 * @param convert2TypeName
	 * @param oValue
	 * @return
	 */
	public static Object convertObject(Class convert2TypeName, Object oValue)
	{
		String szNm = convert2TypeName.getName();
		// 如果类型不匹配，就进行一系列转换
		// 将整数向日期进行转换
		if(null != oValue && !szNm.equals(oValue.getClass().getName()) && null != oValue)
		{
			String s = oValue.toString().trim(), szTmp01 = s.replaceAll("[^\\d\\.\\-]", "");
			// 支持的参数类型、复合类型对象传入的处理
			// 防止无效的值在强制转换中发生异常
			try
			{
				if(szNm.equals("java.util.Date"))
					return new Date(Long.parseLong(szTmp01));
				else if(szNm.equals("java.math.BigDecimal"))
					return new BigDecimal(szTmp01);
				else if(szNm.equals("boolean") || szNm.equals("java.lang.Boolean"))
					return new Boolean(szTmp01);
				else if(szNm.equals("char") || szNm.equals("java.lang.Character"))
					return new Character(s.charAt(0));
				else if(szNm.equals("float") || szNm.equals("java.lang.Float"))
					return new Float(szTmp01);
				else if(szNm.equals("java.lang.Short"))
					return new Short(szTmp01);
				else if(szNm.equals("int") || szNm.equals("java.lang.Integer"))
					return new Integer(szTmp01);
				else if(szNm.equals("long") || szNm.equals("java.lang.Long"))
					return new Long(szTmp01);
				else if(szNm.equals("double") || szNm.equals("java.lang.Double"))
					return new Double(szTmp01);
				else if(szNm.equals("java.lang.String"))
				{
					return s;
				}
				else
				{
					// 复合对象的处理
					if(s.startsWith("{") && s.endsWith("}"))
					{
						boolean bMap = isInterface(convert2TypeName, "java.util.Map");
						// 入口参数的符合对象类型必须是能够实例化的对象
						Object oRst = bMap ? new HashMap() : convert2TypeName.newInstance();
						Map map = new JSONObject(s).getHashMap();
						if(bMap)return map;
						else
						{
							// 迭代传入的参数
							Iterator it = map.entrySet().iterator();
							map = null;
							while(it.hasNext())
							{
								Map.Entry entry = (Map.Entry)it.next();
								String szKey = (String)entry.getKey();
								if(null != szKey)
								{
									Field field = getSpecifyNameField(convert2TypeName, szKey);
									if(null != field)
									{
										field.setAccessible(true);
										field.set(oRst, entry.getValue());
									}
									// 寻找set方法
									else
									{
										Method mehod = getSpecifyNameMethod(convert2TypeName, 
												new Class[]{java.lang.Object.class},
												"set" + szKey.substring(0,1).toUpperCase() + szKey.substring(1)
												);
										// 注入内容
										if(null != mehod)
											try{mehod.invoke(oRst, new Object[]{entry.getValue()});}catch(Exception e){}
									}										
									field = null;
								}
								entry = null; szKey = null;
							}
							return oRst;
						}
					}
				}
			} catch (Exception e) {e.printStackTrace();}
		}
		else return oValue;
		return null;
	}
}
