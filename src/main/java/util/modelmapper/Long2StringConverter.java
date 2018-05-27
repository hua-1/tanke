package util.modelmapper;

import org.modelmapper.AbstractConverter;

public class Long2StringConverter extends AbstractConverter<Long, String> {
    public Long2StringConverter() {
    }

    protected String convert(Long source) {
        return source == null ? "" : source.toString();
    }
}