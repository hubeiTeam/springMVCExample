/**
 * @author xuanyu
 * BackRolePower.java
 * 2015下午6:00:01
 */
package caideli.bean;

import java.io.Serializable;

/**角色权限中间表
 * @author caideli
 * ClassName BackRolePower.java  @date 2015年8月11日下午6:00:01
 */
public class BackRolePower implements Serializable {

	/**  */
	private static final long serialVersionUID = -7343794416363563178L;
	private Long id;
	/**角色id*/
	private Long roleId;
	/**权限id*/
	private Long powerId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	public Long getPowerId() {
		return powerId;
	}
	public void setPowerId(Long powerId) {
		this.powerId = powerId;
	}
	
}
