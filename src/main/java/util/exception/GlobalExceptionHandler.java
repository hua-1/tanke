package util.exception;

import dto.response.ResponseBaseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import util.json.JacksonUtils;
import util.resource.CommonConstant;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@ControllerAdvice(
        annotations = {RestController.class}
)
public class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(RestControllerAdvice.class);

    @ExceptionHandler(Exception.class)
    @ResponseBody
    ResponseBaseDto handleException(Exception e){
        ResponseBaseDto response = new ResponseBaseDto();
        response.setMessage("操作失败");
        response.setSuccess(CommonConstant.FAIL);
        logger.info(e.getMessage());
        logger.debug(e.getMessage());
        logger.error(e.getCause().getMessage());
        return response;
    }

    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    ResponseBaseDto handleBusinessException(BusinessException e){
        ResponseBaseDto response = new ResponseBaseDto();
        response.setSuccess(CommonConstant.FAIL);
        response.setMessage("操作失败");
        logger.info(e.getMessage());
        logger.debug(e.getMessage());
        logger.error(e.getCause().getMessage());
        return response;
    }
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
   ResponseBaseDto handleRuntimeException(BusinessException e){
        ResponseBaseDto response = new ResponseBaseDto();
        response.setSuccess(CommonConstant.FAIL);
        response.setMessage("操作失败");
        logger.info(e.getMessage());
        logger.debug(e.getMessage());
        logger.error(e.getCause().getMessage());
        return response;
    }
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseBaseDto signException(HttpServletResponse servletResponse,ResponseBaseDto ex) {
        ResponseBaseDto response = new ResponseBaseDto();
        response.setSuccess(CommonConstant.SUCCESS);
        response.setMessage("成功");
        logger.info(ex.getMessage());
        String result;
        try {
            result = JacksonUtils.ObjectToStirng(response);
        } catch (Exception var6) {
            result = "";
            this.logger.error("convert json error. " + var6.getMessage(), var6);
        }
        servletResponse.setContentType("application/json; charset=utf-8");
        PrintWriter writer = null;
        try {
            writer = servletResponse.getWriter();
        } catch (IOException e) {
            e.printStackTrace();
        }
        writer.print(result);
        return response;
    }

    @ExceptionHandler(NullPointerException.class)
    @ResponseBody
    public ResponseBaseDto nullPointerExceptionHandler(NullPointerException e) {
        ResponseBaseDto response = new ResponseBaseDto();
        response.setSuccess(CommonConstant.FAIL);
        response.setMessage("操作失败");
        logger.info(e.getMessage());
        logger.debug(e.getMessage());
        logger.error(e.getCause().getMessage());
        return response;
    }
}
