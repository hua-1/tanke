package util.modelmapper;


public abstract class MapperMapping<S, D> {
    private S source;
    private D destination;

    public MapperMapping() {
    }

    public S getSource() {
        return this.source;
    }

    public void setSource(S source) {
        this.source = source;
    }

    public D getDestination() {
        return this.destination;
    }

    public void setDestination(D destination) {
        this.destination = destination;
    }

    public abstract void configure();
}