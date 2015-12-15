/**
 * 权限业务层实现类
 */
package caideli.service.serviceImpl;

import java.util.List;


import java.util.Map;

import javax.annotation.Resource;



import org.springframework.stereotype.Service;

import caideli.bean.BackPower;
import caideli.dao.BackPowerDao;
import caideli.service.BackPowerService;

/**
 * @author caideli
 * ClassName BackPowerService.java  @date 2015年9月16日上午9:33:42
 */
@Service("backPowerService")
public class BackPowerServiceImpl implements BackPowerService {
	/**权限dao*/
	@Resource
	private BackPowerDao backPowerDao;
	
	@Override
	public List<BackPower> getAllPowers() {
		return this.backPowerDao.selectAll();
	}
	@Override
	public BackPower getOnePower(Integer id) {
		return this.backPowerDao.selectOneById(id);
	}

	@Override
	public boolean addOnePower(BackPower backPower) {
		return this.backPowerDao.insertOne(backPower);
	}

	@Override
	public boolean updateOnePower(BackPower backPower) {
		return this.backPowerDao.updateOne(backPower);
	}

	@Override
	public boolean deleteOnePower(Integer id) {
		return this.backPowerDao.deleteOneById(id);
	}
	@Override
	public List<BackPower> getPowersByPage(Map<String, Object> params,
			Integer currPage, Integer pageSize) {
		return this.backPowerDao.selectAllByPage(params, currPage, pageSize);
	}
	
}
