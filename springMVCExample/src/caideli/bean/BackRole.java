/**
 * @author xuanyu
 * BackRole.java
 * 2015下午2:07:10
 */
package caideli.bean;

import java.io.Serializable;

/**角色表
 * @author caideli
 * ClassName BackRole.java  @date 2015年8月11日下午2:07:10
 */
public class BackRole implements Serializable {

	/**  */
	private static final long serialVersionUID = 335673076907289131L;
	/**角色id*/
	private Long id;
	/**角色名称*/
	private String roleName;
	/** 角色描述*/
	private String desc;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
}
