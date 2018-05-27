package util.exception;

import dto.response.ResponseBaseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import util.resource.CommonConstant;

@ControllerAdvice(
        annotations = {RestController.class}
)
public class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(RestControllerAdvice.class);

    @ExceptionHandler(Exception.class)
    @ResponseBody
    ResponseBaseDto handleException(Exception e){
        ResponseBaseDto response = new ResponseBaseDto();
        response.setMessage("失败");
        response.setSuccess(CommonConstant.FAIL);
        return response;
    }

    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    ResponseBaseDto handleBusinessException(BusinessException e){
        ResponseBaseDto response = new ResponseBaseDto();
        response.setSuccess(CommonConstant.FAIL);
        response.setMessage(e.getMessage());
        return response;
    }
}
