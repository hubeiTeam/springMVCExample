package caideli.base;



import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 * @author caideli
 * ClassName ExampleStart.java  @date 2015年9月18日上午11:46:45
 */
public class ExampleStart {

	/**
	 * 内嵌jetty http 服务
	 */
	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		// 服务器的监听端口
		Server server = new Server(8080);
		// 关联一个已经存在的上下文
		WebAppContext context = new WebAppContext();
		// 设置描述符位置
		context.setDescriptor("/WEB-INF/web.xml");
		// 设置Web内容上下文路径
		context.setResourceBase("/");
		// 设置上下文路径
		context.setContextPath("/");
		context.setParentLoaderPriority(true);
		server.setHandler(context);
		// 启动
		server.start();
		server.join();
	}

}
