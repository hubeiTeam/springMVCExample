/**
 *
 * TODO
 *
 */
package caideli.service;

import java.util.List;
import java.util.Map;

import caideli.bean.BackUser;

/**
 * @author :caideli
 * @pakageName:caideli.service
 * @CreatTime ：2015年9月28日 下午5:07:10
 */
public interface BackUserService {
	// 查询所有权限记录

	List<BackUser> getAllUsers();
	
	// 分页查询
	
	List<BackUser> getUsersByPage(Map<String,Object> params,Integer currPage,Integer pageSize );
	
	// 查询数量
	
	Integer getCount(Map<String,Object> params);
	
	// 据id查询一个权限对象

	BackUser getOneUser(Integer id);

	// 插入一个权限对象

	boolean addOneUser(BackUser backUser);

	// 修改一个权限对象

	boolean updateOneUser(BackUser backUser);

	// 据id删除一个权限对象
	boolean deleteOnePower(Integer id);
}
