package util.base;

import dto.response.ResponseBaseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;
import util.json.JacksonUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class RestHeartControllerBean implements Controller {
    private Logger logger = LoggerFactory.getLogger(RestHeartControllerBean.class);

    public ModelAndView handleRequest(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        ResponseBaseDto dto = new ResponseBaseDto();
        dto.setSuccess("1");
        dto.setMessage("操作成功");
        String result;
        try {
            result = JacksonUtils.ObjectToStirng(dto);
        } catch (Exception var6) {
            result = "";
            this.logger.error("convert json error. " + var6.getMessage(), var6);
        }

        httpServletResponse.setContentType("application/json; charset=utf-8");
        PrintWriter writer = httpServletResponse.getWriter();
        writer.print(result);
        writer.flush();
        writer.close();
        return null;
    }
}
