/**
 *
 * TODO
 *
 */
package caideli.dao.daoImpl;

import org.springframework.stereotype.Component;

import caideli.base.BaseDaoImpl;
import caideli.bean.BackUser;
import caideli.dao.BackUserDao;

/**
 * @author :caideli
 * @pakageName:caideli.dao.daoImpl
 * @CreatTime ：2015年9月28日 上午11:35:45 
 */
@Component("backUser")
public class BackUserDaoImpl extends BaseDaoImpl<BackUser> implements BackUserDao {
	/** 注入用户对象  */
	public BackUserDaoImpl() {
		super(BackUser.class);
	}

}
