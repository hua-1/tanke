package util.page;

public abstract class Dialect {
    public Dialect() {
    }

    public String getLimitString(String sql, int offset, int limit) {
        return this.getLimitString(sql, offset, Integer.toString(offset), limit, Integer.toString(limit));
    }

    public abstract String getLimitString(String var1, int var2, String var3, int var4, String var5);

    public String getCountString(String sql) {
        return "select count(1) from (" + sql + ") tmp_count";
    }
}
