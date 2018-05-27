package util.modelmapper;

import org.modelmapper.AbstractConverter;

public class String2StringConverter extends AbstractConverter<String, String> {
    public String2StringConverter() {
    }

    protected String convert(String source) {
        return source == null ? "" : source;
    }

}
