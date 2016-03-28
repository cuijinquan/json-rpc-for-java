# 2008-08-07 修正多继承中判断接口的功能，以及修正接口继承后的判断功能 #
更新：

jcore\jsonrpc\common\ObjectToJSON.java

```
	/***************************************************************************
	 * 判断对象o实现的所有接口中是否有szInterface 
	 * 2008-08-07 修正多继承中判断接口的功能，
	 * 以及修正接口继承后的判断功能
	 * package test;
	 * 
	 * public interface ITest extends Serializable
	 * public class Test1 implements ITest
	 * public class Test2 extends Test1
	 * public class Test3 extends Test2 
	 * 
	 * isInterface(Test3.class, "java.io.Serializable") = true
	 * isInterface(Test3.class, "test.ITest") = true
	 * @param c
	 * @param szInterface
	 * @return
	 */
	public boolean isInterface(Class c, String szInterface)
	{
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
```