package util.base;

import dto.response.ResponseBaseDto;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import util.json.JacksonUtils;

import java.io.File;
import java.io.PrintWriter;

@ControllerAdvice
public class MyResponseBodyAdvice implements ResponseBodyAdvice<Object> {
    private static Log log = LogFactory.getLog(MyResponseBodyAdvice.class);

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        log.debug("MyResponseBodyAdvice==>supports:" + converterType);
        log.debug("MyResponseBodyAdvice==>supports:" + returnType.getClass());
        log.debug("MyResponseBodyAdvice==>supports:"
                + MappingJackson2HttpMessageConverter.class.isAssignableFrom(converterType));
        return MappingJackson2HttpMessageConverter.class.isAssignableFrom(converterType);
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request,
                                  ServerHttpResponse response) {
        if (body == null) {
            return body;
        }

        if (body instanceof ResponseBaseDto || body instanceof String) {
            return body;
        } else if (body instanceof File) {
            return body;
        } else {
            log.debug("MyResponseBodyAdvice==>beforeBodyWrite:" + returnType + "," + body);
            ResponseBaseDto result = new ResponseBaseDto();
            result.setCode(HttpStatus.OK.value());
            result.setSuccess("1");
            result.setMessage("操作成功");
          //  body = (Object) result;
            return body;
        }
    }
}