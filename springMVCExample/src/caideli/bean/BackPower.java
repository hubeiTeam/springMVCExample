package caideli.bean;




import java.io.Serializable;
import java.util.List;

/**权限
 * @author caideli
 * ClassName BackPower.java  @date 
 */
public class BackPower implements Serializable {

	/**  */
	private static final long serialVersionUID = -7572858761542506875L;
	/** 权限id */
	private Long id;
	/** 权限名称  */
	private String powerName;
	/** 路径  */
	private String path;
	/** 父id  */
	private Long parentId;
	/** 权限描述  */
	private String desc;
	/**权限集合*/
	private List<BackPower> backPowers;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPowerName() {
		return powerName;
	}
	public void setPowerName(String powerName) {
		this.powerName = powerName;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public List<BackPower> getBackPowers() {
		return backPowers;
	}
	public void setBackPowers(List<BackPower> backPowers) {
		this.backPowers = backPowers;
	}
	
	
}
