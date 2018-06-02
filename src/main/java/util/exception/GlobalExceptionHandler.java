package util.exception;

import dto.response.ResponseBaseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
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
        response.setMessage(e.getMessage());
        response.setSuccess(CommonConstant.FAIL);
        logger.info(e.getMessage());
        return response;
    }

    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    ResponseBaseDto handleBusinessException(BusinessException e){
        ResponseBaseDto response = new ResponseBaseDto();
        response.setSuccess(CommonConstant.FAIL);
        response.setMessage(e.getMessage());
        logger.info(e.getMessage());
        return response;
    }

    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseBaseDto signException(ResponseBaseDto ex) {
        ResponseBaseDto response = new ResponseBaseDto();
        response.setSuccess(CommonConstant.SUCCESS);
        response.setMessage("成功");
        logger.info(ex.getMessage());
        return response;
    }
}
