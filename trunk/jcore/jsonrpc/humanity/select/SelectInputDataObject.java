package jcore.jsonrpc.humanity.select;

import java.io.Serializable;
import java.util.List;

public class SelectInputDataObject implements Serializable{
	private static final long serialVersionUID = 7915997089526874810L;
	// 数据区域
	public List collection;
	// 允许编辑的标志
	public boolean allowEdit;
	// 允许多选择标志
	public boolean multiple;
	// 定义选择时作为value的字段
	public String valueField;
	// 定义要显示的字段和要显示的顺序，不设置则全部显示
	public String displayFields;
	/***
	 * 选择的时候回掉函数的设置，通常格式为函数名：
	 * 函数定义格式：function cbk(oRow, o){...}
	 * 其中oRow为选择行的行数据，包含没有显示的列的数据
	 * o则为当前输入对象
	 */
	public String selectCallBack;
}
