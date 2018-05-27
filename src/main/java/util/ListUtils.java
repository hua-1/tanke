package util;

import java.util.List;

public class ListUtils {

    private ListUtils() {

    }

    public static Boolean isNotEmpty(List o) {
        return o != null && o.size() > 0;
    }

    public static Boolean isEmpty(List o) {
        return !isNotEmpty(o).booleanValue();
    }
}
