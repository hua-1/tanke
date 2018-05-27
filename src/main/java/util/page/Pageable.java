package util.page;

public class Pageable {
    private static final long serialVersionUID = 7280485938848398236L;
    private final int page;
    private final int size;
    private final boolean countable;

    public Pageable(int page, int size) {
        this(page, size, true);
    }

    public Pageable(int page, int size, boolean countable) {
        if (page < 0) {
            throw new IllegalArgumentException("Page index must not be less than zero!");
        } else if (size < 0) {
            throw new IllegalArgumentException("Page size must not be less than zero!");
        } else {
            this.page = page;
            this.size = size;
            this.countable = countable;
        }
    }

    public boolean getCountable() {
        return this.countable;
    }

    public int getPageSize() {
        return this.size;
    }

    public int getPageNumber() {
        return this.page;
    }

    public int getOffset() {
        return this.page * this.size;
    }

    public boolean hasPrevious() {
        return this.page > 0;
    }

    public Pageable next() {
        return new Pageable(this.page + 1, this.size);
    }

    public Pageable previousOrFirst() {
        return this.hasPrevious() ? new Pageable(this.page - 1, this.size) : this;
    }

    public Pageable first() {
        return new Pageable(0, this.size);
    }

    public String toString() {
        return String.format("Page request [number: %d, size %d]", this.page, this.size);
    }
}
