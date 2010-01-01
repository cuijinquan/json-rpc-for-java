package jcore.jsonrpc.tools;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class GetAllSupersProperty {

	
	public static Field[] getDeclaredFields(Class c)
	{
		Field []fRst = c.getDeclaredFields();
		c = c.getSuperclass();
		while(!(c.getName().equals(Object.class.getName()) || c.getName().equals(Class.class.getName())))
		{
			Field []fRst1 = c.getDeclaredFields();
			Field []fRst2 = new Field[fRst.length + fRst1.length];
			System.arraycopy(fRst, 0, fRst2, 0, fRst.length);
			System.arraycopy(fRst1, 0, fRst2, fRst.length, fRst1.length);
			fRst = fRst2;
			fRst1 = null;
			c = c.getSuperclass();
		}
		return fRst;
	}
	
	public static Field[] getFields(Class c)
	{
		Field []fRst = c.getFields();
		Field []fRst1 = getDeclaredFields(c);
		
		Field []fRst2 = new Field[fRst.length + fRst1.length];
		System.arraycopy(fRst, 0, fRst2, 0, fRst.length);
		System.arraycopy(fRst1, 0, fRst2, fRst.length, fRst1.length);
		fRst = fRst2;
		c = c.getSuperclass();
		while(!(c.getName().equals(Object.class.getName()) || c.getName().equals(Class.class.getName())))
		{
			fRst1 = c.getFields();
			fRst2 = new Field[fRst.length + fRst1.length];
			System.arraycopy(fRst, 0, fRst2, 0, fRst.length);
			System.arraycopy(fRst1, 0, fRst2, fRst.length, fRst1.length);
			fRst = fRst2;
			fRst1 = null;
			c = c.getSuperclass();
		}
		
		return fRst;
	}
	
    public static Method [] getMethods(Class c)
    {
    	Method []fRst = c.getMethods();
		c = c.getSuperclass();
		while(!(c.getName().equals(Object.class.getName()) || c.getName().equals(Class.class.getName())))
		{
			Method []fRst1 = c.getMethods();
			Method []fRst2 = new Method[fRst.length + fRst1.length];
			System.arraycopy(fRst, 0, fRst2, 0, fRst.length);
			System.arraycopy(fRst1, 0, fRst2, fRst.length, fRst1.length);
			fRst = fRst2;
			fRst1 = null;
			c = c.getSuperclass();
		}
		return fRst;
    }
	
}
