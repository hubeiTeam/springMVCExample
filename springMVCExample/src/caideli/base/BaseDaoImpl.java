package caideli.base;

import java.sql.SQLException;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author caideli ClassName Test.java @date 2015年9月17日下午6:23:10
 */
public abstract class BaseDaoImpl<T> extends IbatiesDao implements BaseDao<T> {

	/** 泛型类 */
	private final Class<T> clazz;

	/** 构造函数 */
	public BaseDaoImpl(Class<T> clazz) {
		this.clazz = clazz;
	}

	/** 查询所有 */
	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<T> selectAll() {
		List<T> list = Collections.emptyList();
		list = super.getSqlMapClientTemplate().queryForList(
				this.clazz.getSimpleName() + ".query");
		return list;
	}
	/** 查询所有 */
	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<T> selectAllByPage(Map<String,Object> params,Integer currPage,Integer pageSize) {
		List<T> list = Collections.emptyList();
		if(params==null){
			params=new HashMap<String,Object>();
		}
		if(currPage==-1&&pageSize==-1){
			try {
				list=super.getSqlMapClient().queryForList(
						this.clazz.getSimpleName() + ".query",params);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		try {
			list = super.getSqlMapClient().queryForList(
					this.clazz.getSimpleName() + ".query",params,currPage,pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	/**自写sql的查询*/
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<T> selectAllByPage(Map<String,Object> params,String sqlName,Integer currPage,Integer pageSize){
		List<T> list = Collections.emptyList();
		if(params==null){
			params=new HashMap<String,Object>();
		}
		if(currPage==-1&&pageSize==-1){
			list=super.getSqlMapClientTemplate().queryForList(
					this.clazz.getSimpleName() + sqlName,params);
		}
		list = super.getSqlMapClientTemplate().queryForList(
				this.clazz.getSimpleName() + sqlName,params,currPage,pageSize);
		return list;
	}
    
    /**带条件的查数量*/
	@SuppressWarnings("deprecation")
	@Override
	public Integer selectCount(Map<String,Object> params){
		Integer count=0;
		if(params==null){
			params=new HashMap<String,Object>();
		}
		count=(Integer)super.getSqlMapClientTemplate().queryForObject(this.clazz.getSimpleName()+".count", params);
		return count;
	}
    
    /** 自写带条件的查数量*/
	@SuppressWarnings("deprecation")
	@Override
	public Integer selectCount(Map<String,Object> params,String sqlName){
		Integer count=0;
		if(params==null){
			params=new HashMap<String,Object>();
		}
		count=(Integer)super.getSqlMapClientTemplate().queryForObject(this.clazz.getSimpleName()+sqlName, params);
		return count;
	}
	
	/** 据id查询 */
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public T selectOneById(Integer id) {
		T obj = null;
		if (id == null) {
			return null;
		}
		obj = (T) super.getSqlMapClientTemplate().queryForObject(
				this.clazz.getSimpleName() + ".query_id", id);
		return obj;
	}

	/** 插入一条记录 */
	@SuppressWarnings("deprecation")
	@Override
	public boolean insertOne(Object obj) {
		Boolean flag = false;
		if (super.getSqlMapClientTemplate().insert(
				this.clazz.getSimpleName() + ".add", obj) != null) {
			flag = true;
		}
		return flag;
	}

	/** 修改一条记录 */
	@SuppressWarnings("deprecation")
	@Override
	public boolean updateOne(Object obj) {
		Boolean flag = false;
		if (super.getSqlMapClientTemplate().update(
				this.clazz.getSimpleName() + ".update", obj) > 0) {
			flag = true;
		}
		return flag;
	}

	/** 删除一条记录 */
	@SuppressWarnings("deprecation")
	@Override
	public boolean deleteOneById(Integer id) {
		Boolean flag = false;
		if (super.getSqlMapClientTemplate().delete(
				this.clazz.getSimpleName() + ".delete", id) > 0) {
			flag = true;
		}
		return flag;
	}
	
	/** 删除一条记录 */
	@SuppressWarnings("deprecation")
	@Override
	public boolean deleteOneByPo(T t) {
		Boolean flag = false;
		if (super.getSqlMapClientTemplate().delete(
				this.clazz.getSimpleName() + ".delete", t) > 0) {
			flag = true;
		}
		return flag;
	}

	/** 批量插入对象*/
	@SuppressWarnings("deprecation")
	@Override
	public boolean insertAll(List<T> list){
		Boolean flag = false;
		try {
			//将事务设置不提交
//			sqlMapClient.getDataSource().getConnection().setAutoCommit(false);
			//开启事务
			super.getSqlMapClient().startTransaction();   
			//开始批处理
			super.getSqlMapClient().startBatch();        
			for(T t : list){
				if(super.getSqlMapClientTemplate().insert(this.clazz.getSimpleName() + ".add", t)!=null){
					flag=true;
				}else{
					flag=false;
				}
			}
			//结束批处理
			super.getSqlMapClient().executeBatch();
			//提交事务
			super.getSqlMapClient().commitTransaction();
		} catch (Exception e) {
			flag=false;
			e.printStackTrace();
		} finally {
			try {
				// 结束事务
				super.getSqlMapClient().endTransaction();
			} catch (SQLException e) {
				e.getMessage();
			}
		}
		return flag;
	}

	/** 批量修改对象*/
	@SuppressWarnings("deprecation")
	@Override
	public boolean updateAll(List<T> list){
		Boolean flag = false;
		try {
			//开启事务
			super.getSqlMapClient().startTransaction();   
			//开始批处理
			super.getSqlMapClient().startBatch();        
			for(T t : list){
				if(super.getSqlMapClientTemplate().update(this.clazz.getSimpleName() + ".update", t)>0){
					flag=true;
				}else{
					flag=false;
				}
			}
			//结束批处理
			super.getSqlMapClient().executeBatch();
			//提交事务
			super.getSqlMapClient().commitTransaction();
		} catch (Exception e) {
			flag=false;
			e.printStackTrace();
		} finally {
			try {
				// 结束事务
				super.getSqlMapClient().endTransaction();
			} catch (SQLException e) {
				e.getMessage();
			}
		}
		return flag;
	}

	/** 据id批量删除对象*/
	@SuppressWarnings("deprecation")
	@Override
	public boolean deleteAllById(List<Integer> list){
		Boolean flag = false;
		try {
			//开启事务
			super.getSqlMapClient().startTransaction();   
			//开始批处理
			super.getSqlMapClient().startBatch();        
			for(Integer t : list){
				if(super.getSqlMapClientTemplate().delete(this.clazz.getSimpleName() + ".delete", t)>0){
					flag=true;
				}else{
					flag=false;
				}
			}
			//结束批处理
			super.getSqlMapClient().executeBatch();
			//提交事务
			super.getSqlMapClient().commitTransaction();
		} catch (Exception e) {
			flag=false;
			e.printStackTrace();
		} finally {
			try {
				// 结束事务
				super.getSqlMapClient().endTransaction();
			} catch (SQLException e) {
				e.getMessage();
			}
		}
		return flag;
	}

	/** 据id批量删除对象*/
	@SuppressWarnings("deprecation")
	@Override
	public boolean deleteAllByPo(List<T> list){
		Boolean flag = false;
		try {
			//开启事务
			super.getSqlMapClient().startTransaction();   
			//开始批处理
			super.getSqlMapClient().startBatch();        
			for(T t : list){
				if(super.getSqlMapClientTemplate().delete(this.clazz.getSimpleName() + ".delete", t)>0){
					flag=true;
				}else{
					flag=false;
				}
			}
			//结束批处理
			super.getSqlMapClient().executeBatch();
			//提交事务
			super.getSqlMapClient().commitTransaction();
		} catch (Exception e) {
			flag=false;
			e.printStackTrace();
		} finally {
			try {
				// 结束事务
				super.getSqlMapClient().endTransaction();
			} catch (SQLException e) {
				e.getMessage();
			}
		}
		return flag;
	}
}
