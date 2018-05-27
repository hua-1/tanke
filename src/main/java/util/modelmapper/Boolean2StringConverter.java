package util.modelmapper;

import org.modelmapper.AbstractConverter;

public class Boolean2StringConverter extends AbstractConverter<Boolean, String> {
    public Boolean2StringConverter() {
    }

    protected String convert(Boolean source) {
        return source == null ? "" : source.toString();
    }
}
