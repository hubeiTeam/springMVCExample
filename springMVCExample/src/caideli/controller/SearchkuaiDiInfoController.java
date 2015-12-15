package caideli.controller;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import caideli.annotation.NoLogin;
import caideli.tool.LoggerFactary;
@Scope("prototype")
@Controller("searchkuaiDiInfoController")
public class SearchkuaiDiInfoController {
	/**
     * 日志
     */
    private Logger log = Logger.getLogger(SearchkuaiDiInfoController.class);
    private Logger TIMER_LOGGER = LoggerFactary.getLogger(LoggerFactary.QUERY_TIME);

    /**
     * 快递查询接口方法
     * 
     * @param key
     *            ：商家用户key值，在http://www.kuaidi100.com/openapi申请的
     * @param com
     *            ：快递公司代码，在http://www.kuaidi100.com/openapi网上的技术文档里可以查询到
     * @param nu
     *            ：快递单号，请勿带特殊符号，不支持中文（大小写不敏感）
     * @return 快递100返回的url，然后放入页面iframe标签的src即可
     * @see
     */
    @NoLogin
    /*@RequestMapping(value="/myPage/kuaidi/searchkuaiDiInfo",method=RequestMethod.GET)*/
    @RequestMapping(value="/myPage/kuaidi/searchkuaiDiInfo.html",method=RequestMethod.GET)
    public ModelAndView searchkuaiDiInfo(){	
    	
    	long startTime = System.currentTimeMillis();
    	ModelAndView result=new ModelAndView();
	    //result.setViewName("json");
        String content = "";
        String com="huitongkuaidi";
        String nu="50155590903698";
        String key="a2aed609747f7641";
        try
        {
            URL url = new URL("http://www.kuaidi100.com/applyurl?key=" + key + "&com=" + com
                              + "&nu=" + nu);
            URLConnection con = url.openConnection();
            con.setAllowUserInteraction(false);
            InputStream urlStream = url.openStream();
            byte b[] = new byte[10000];
            int numRead = urlStream.read(b);
            content = new String(b, 0, numRead);
            while (numRead != -1)
            {
                numRead = urlStream.read(b);
                if (numRead != -1)
                {
                    // String newContent = new String(b, 0, numRead);
                    String newContent = new String(b, 0, numRead, "UTF-8");
                    content += newContent;
                }
            }
            urlStream.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            log.error("快递查询错误");
        }
        result.addObject("url",content);
        TIMER_LOGGER.info("[/backBone/searchkuaiDiInfo.json] push time[" + (System.currentTimeMillis() - startTime) +"ms]");     
        return result;
        //return content;
    }

    /*	public static void main(String[] agrs)
    {
    	SearchkuaiDiInfoController kuaidi = new SearchkuaiDiInfoController();
	//
        String content = kuaidi.searchkuaiDiInfo();
        System.out.println(content);
    }*/
}
