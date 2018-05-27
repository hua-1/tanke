package util.modelmapper;

import org.modelmapper.AbstractConverter;

import java.math.BigDecimal;

public class BigDecimal2StringConverter extends AbstractConverter<BigDecimal, String> {
    public BigDecimal2StringConverter() {
    }

    protected String convert(BigDecimal source) {
        return source == null ? "" : source.toString();
    }
}
