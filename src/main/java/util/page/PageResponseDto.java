package util.page;

import java.util.ArrayList;
import java.util.List;

public class PageResponseDto<T> {
    List<T> rows = new ArrayList<>();
    Long total = 0L;

    public PageResponseDto() {
    }

    public PageResponseDto(List<T> t, Long total) {
        this.rows = t;
        this.total = total;
    }

    public List<T> getRows() {
        return this.rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public Long getTotal() {
        return this.total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
