/**
 * @author xuanyu

 * BaseDao.java
 * 2015下午6:07:09
 */
package caideli.base;

import java.util.List;
import java.util.Map;

/**
 * @author caideli ClassName BaseDao.java @date 2015年9月17日下午6:07:09
 */
public interface BaseDao<T> {
	
	// 查询所有记录
	
    List<T> selectAll();
    
    // 分页查询
	
    List<T> selectAllByPage(Map<String,Object> params,Integer currPage,Integer pageSize);
    
    // 自写sql的查询
	
    List<T> selectAllByPage(Map<String,Object> params,String sqlName,Integer currPage,Integer pageSize);
    
    // 带条件的查数量
	
    Integer selectCount(Map<String,Object> params);
    
    // 自写带条件的查数量
	
    Integer selectCount(Map<String,Object> params,String sqlName);

	// 据id查询一个对象
	
	T selectOneById(Integer id);

	// 插入一个对象

	boolean insertOne(T t);

	// 修改一个对象

	boolean updateOne(T t);

	// 据id删除一个对象
	boolean deleteOneById(Integer id);
	
	// 据id删除一个对象
	boolean deleteOneByPo(T t);
	
	// 批量插入对象

	boolean insertAll(List<T> t);

	// 批量修改对象

	boolean updateAll(List<T> list);

	// 据id批量删除对象
	boolean deleteAllById(List<Integer> list);
	
	// 据id批量删除对象
	boolean deleteAllByPo(List<T> list);
}
