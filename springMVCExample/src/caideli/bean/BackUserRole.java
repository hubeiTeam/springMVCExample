/**
 * @author xuanyu
 * BackUserRole.java
 * 2015下午3:22:52
 */
package caideli.bean;

import java.io.Serializable;

/**用户角色中间表
 * @author caideli
 * ClassName BackUserRole.java  @date 2015年8月11日下午3:22:52
 */
public class BackUserRole implements Serializable {

	/**  */
	private static final long serialVersionUID = -1636496423879485949L;
	/**id*/
	private Long id;
	/**用户id*/
	private Long userId;
	/**角色id*/
	private Long roleId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	
}
