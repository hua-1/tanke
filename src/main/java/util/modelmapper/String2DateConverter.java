package util.modelmapper;

import org.modelmapper.AbstractConverter;
import util.StringUtils;

import java.util.Date;

public class String2DateConverter extends AbstractConverter<String, Date> {
    public String2DateConverter() {
    }

    protected Date convert(String source) {
        return StringUtils.isBlank(source) ? null : DateUtils.stringToDate(source, DateUtils.DATE_TO_STRING_DETAIAL_PATTERN);
    }
}
