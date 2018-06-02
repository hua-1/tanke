package util.page;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class Page<T> {
    private static final long serialVersionUID = 867755909294344406L;
    private final List<T> content;
    private final Pageable pageable;
    private final long total;

    public Page(List<T> content, Pageable pageable, long total) {
        this.content = new ArrayList();
        if (null == content) {
            throw new IllegalArgumentException("Content must not be null!");
        } else {
            this.content.addAll(content);
            this.total = total;
            this.pageable = pageable;
        }
    }

    public Page(List<T> content) {
        this(content, (Pageable) null, null == content ? 0L : (long) content.size());
        System.out.printf("con"+content.size());
    }

    public int getNumber() {
        return this.pageable == null ? 0 : this.pageable.getPageNumber();
    }

    public int getSize() {
        return this.pageable == null ? 0 : this.pageable.getPageSize();
    }

    public int getTotalPages() {
        return this.getSize() == 0 ? 1 : (int) Math.ceil((double) this.total / (double) this.getSize());
    }

    public int getNumberOfElements() {
        return this.content.size();
    }

    public long getTotalElements() {
        return this.total;
    }

    public boolean hasPreviousPage() {
        return this.getNumber() > 0;
    }

    public boolean isFirstPage() {
        return !this.hasPreviousPage();
    }

    public boolean hasNextPage() {
        return this.getNumber() + 1 < this.getTotalPages();
    }

    public boolean isLastPage() {
        return !this.hasNextPage();
    }

    public Pageable nextPageable() {
        return this.hasNextPage() ? this.pageable.next() : null;
    }

    public Pageable previousPageable() {
        return this.hasPreviousPage() ? this.pageable.previousOrFirst() : null;
    }

    public Iterator<T> iterator() {
        return this.content.iterator();
    }

    public List<T> getContent() {
        return Collections.unmodifiableList(this.content);
    }

    public boolean hasContent() {
        return !this.content.isEmpty();
    }

    public long getTotal() {
        return this.total;
    }
}
