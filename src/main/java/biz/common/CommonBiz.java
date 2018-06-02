package biz.common;

import org.springframework.stereotype.Service;
import util.base.entity.BaseEntity;
import util.resource.CommonConstant;

import java.util.Date;
@Service
public class CommonBiz {

    public void setBaseEntityAdd(BaseEntity baseEntity, String operationName) {
        Date now = new Date();
        baseEntity.setValid(CommonConstant.INTEGER_ONE);
        baseEntity.setCreatedBy(operationName);
        baseEntity.setCreatedTime(now);
        baseEntity.setLastModifiedBy(operationName);
        baseEntity.setLastModifiedTime(now);
    }

    //设置实体类的基本数据，编辑
    public void setBaseEntityModify(BaseEntity baseEntity, String operationName) {
        Date now = new Date();
        baseEntity.setLastModifiedBy(operationName);
        baseEntity.setLastModifiedTime(now);
    }

}
