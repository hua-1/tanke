package util.modelmapper;

import org.modelmapper.AbstractConverter;

import java.util.Date;

public class Date2StringConverter extends AbstractConverter<Date, String> {
    public Date2StringConverter() {
    }

    protected String convert(Date source) {
        return source == null ? "" : DateUtils.dateToString(source, DateUtils.DATE_TO_STRING_DETAIAL_PATTERN);
    }
}
