/**
 *
 * 权限业务层接口
 *
 */
package caideli.service;

import java.util.List;
import java.util.Map;

import caideli.bean.BackPower;

/**
 * @author :caideli
 * @pakageName:caideli.service
 * @CreatTime ：2015年9月22日 下午3:48:59 
 */
public interface BackPowerService {
    // 查询所有权限记录
	
    List<BackPower> getAllPowers();
    
    // 分页查询权限记录
	
    List<BackPower> getPowersByPage(Map<String,Object> params,Integer currPage,Integer pageSize);

	// 据id查询一个权限对象
	
	BackPower getOnePower(Integer id);

	// 插入一个权限对象

	boolean addOnePower(BackPower backPower);

	// 修改一个权限对象

	boolean updateOnePower(BackPower backPower);

	// 据id删除一个权限对象
	boolean deleteOnePower(Integer id);
}
