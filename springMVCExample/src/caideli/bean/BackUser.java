/**
 * @author xuanyu
 * BackUser.java
 * 2015下午3:03:12
 */
package caideli.bean;

import java.io.Serializable;

/**管理员用户表
 * @author caideli
 * ClassName BackUser.java  @date 2015年8月11日下午3:03:12
 */
public class BackUser implements Serializable {

	/**  */
	private static final long serialVersionUID = 7266093283050310116L;
	/**用户id*/
	private Long id;
	/**用户姓名*/
	private String userName;
	/**用户密码*/
	private String userPassword;
	/** 状态  */
	private String status;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
