package util.page;

public class MySQLDialect extends Dialect {
    public MySQLDialect() {
    }

    public String getLimitString(String sql, int offset, String offsetPlaceholder, int limit, String limitPlaceholder) {
        return offset > 0 ? sql + " limit " + offsetPlaceholder + "," + limitPlaceholder : sql + " limit " + limitPlaceholder;
    }
}