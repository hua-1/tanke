package util.modelmapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.NameTokenizers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import util.ListUtils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
public class MapperUtils {
    private MapperUtils() {
        throw new AssertionError();
    }

    private static Logger logger = LoggerFactory.getLogger(MapperUtils.class);
    private static ModelMapper modelMapper = new ModelMapper();
    private static ModelMapper modelMapper2;

    private static void setDefaultConverter(ModelMapper modelMapper) {
        modelMapper.addConverter(new BigDecimal2StringConverter());
        modelMapper.addConverter(new Boolean2StringConverter());
        modelMapper.addConverter(new Date2StringConverter());
        modelMapper.addConverter(new Integer2StringConverter());
        modelMapper.addConverter(new Long2StringConverter());
        modelMapper.addConverter(new String2StringConverter());
        modelMapper.getConfiguration().setSourceNameTokenizer(NameTokenizers.UNDERSCORE).setDestinationNameTokenizer(NameTokenizers.UNDERSCORE);
    }

    private static void setNoDefaultConverter(ModelMapper modelMapper) {
        modelMapper.addConverter(new String2DateConverter());
        modelMapper.getConfiguration().setSourceNameTokenizer(NameTokenizers.UNDERSCORE).setDestinationNameTokenizer(NameTokenizers.UNDERSCORE);
    }

    public static <D> D mapper(Object source, Class<D> destinationType) {
        return source == null ? null : modelMapper.map(source, destinationType);
    }

    public static void mapper(Object source, Object destination, MapperMapping propertyMap) {
        if (source != null && destination != null) {
            ModelMapper modelMapper = new ModelMapper();
            setDefaultConverter(modelMapper);
            modelMapper.map(source, destination);
            if (propertyMap != null) {
                propertyMap.setSource(source);
                propertyMap.setDestination(destination);
                propertyMap.configure();
            }

        }
    }

    public static <D> D mapper(Object source, Class<D> destinationType, MapperMapping propertyMap) {
        if (source != null && destinationType != null) {
            D newInstance = null;

            try {
                newInstance = destinationType.newInstance();
            } catch (InstantiationException var5) {
                logger.error("destinationType.newInstance InstantiationException " + var5.getMessage(), var5);
            } catch (IllegalAccessException var6) {
                logger.error("destinationType.newInstance IllegalAccessException " + var6.getMessage(), var6);
            }

            mapper(source, newInstance, propertyMap);
            return newInstance;
        } else {
            return null;
        }
    }

    public static <D> List<D> mapper(List sources, Class<D> destinationType, MapperMapping propertyMap) {
        List<D> list = new ArrayList();
        if (ListUtils.isNotEmpty(sources).booleanValue()) {
            Iterator i$ = sources.iterator();

            while (i$.hasNext()) {
                Object obj = i$.next();
                list.add(mapper(obj, destinationType, propertyMap));
            }
        }

        return list;
    }

    public static void mapper(Object source, Object destination) {
        if (source != null && destination != null) {
            modelMapper.map(source, destination);
        }
    }

    public static <D> List<D> mapper(List sources, Class<D> destinationType) {
        List<D> list = new ArrayList();
        if (ListUtils.isNotEmpty(sources).booleanValue()) {
            Iterator i$ = sources.iterator();
            while (i$.hasNext()) {
                Object obj = i$.next();
                list.add(modelMapper.map(obj, destinationType));
            }
        }

        return list;
    }

    public static <D> D mapperNoDefault(Object source, Class<D> destinationType) {
        return source == null ? null : modelMapper2.map(source, destinationType);
    }

    public static void mapperNoDefault(Object source, Object destination) {
        if (source != null && destination != null) {
            modelMapper2.map(source, destination);
        }
    }

    public static <D> List<D> mapperNoDefault(List sources, Class<D> destinationType) {
        List<D> list = new ArrayList();
        if (ListUtils.isNotEmpty(sources).booleanValue()) {
            Iterator i$ = sources.iterator();

            while (i$.hasNext()) {
                Object obj = i$.next();
                list.add(modelMapper2.map(obj, destinationType));
            }
        }

        return list;
    }

    static {
        setDefaultConverter(modelMapper);
        modelMapper2 = new ModelMapper();
        setNoDefaultConverter(modelMapper2);
    }
}
