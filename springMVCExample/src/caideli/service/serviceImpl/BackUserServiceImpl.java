/**
 *
 * TODO
 *
 */
package caideli.service.serviceImpl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import caideli.bean.BackUser;
import caideli.dao.BackUserDao;
import caideli.service.BackUserService;

/**
 * @author :caideli
 * @pakageName:caideli.service.serviceImpl
 * @CreatTime ：2015年9月28日 下午5:16:49 
 */
@Service("backUserService")
public class BackUserServiceImpl implements BackUserService {
	@Resource
	private BackUserDao backUserdao;
	
	@Override
	public List<BackUser> getAllUsers() {
		
		return this.backUserdao.selectAll();
	}

	@Override
	public List<BackUser> getUsersByPage(Map<String, Object> params,
			Integer currPage, Integer pageSize) {
		return this.backUserdao.selectAllByPage(params, currPage, pageSize);
	}

	@Override
	public Integer getCount(Map<String, Object> params) {
		return this.backUserdao.selectCount(params);
	}

	@Override
	public BackUser getOneUser(Integer id) {
		return this.backUserdao.selectOneById(id);
	}

	@Override
	public boolean addOneUser(BackUser backUser) {
		return this.backUserdao.insertOne(backUser);
	}

	@Override
	public boolean updateOneUser(BackUser backUser) {
		return this.backUserdao.updateOne(backUser);
	}

	@Override
	public boolean deleteOnePower(Integer id) {
		return this.backUserdao.deleteOneById(id);
	}
	
}
