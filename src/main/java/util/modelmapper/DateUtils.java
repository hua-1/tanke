package util.modelmapper;


import com.sun.jmx.snmp.Timestamp;
import org.apache.commons.lang3.time.FastDateFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtils {
    /**
     * 日志对象
     */
    private static final Logger logger = LoggerFactory.getLogger(DateUtils.class);

    private DateUtils() {
        throw new AssertionError();
    }

    /**
     * 年-月-日 时:分:秒 显示格式
     */
    // 备注:如果使用大写HH标识使用24小时显示格式,如果使用小写hh就表示使用12小时制格式。
    public static String DATE_TO_STRING_DETAIAL_PATTERN = "yyyy-MM-dd HH:mm:ss";

    /**
     * 年-月-日 显示格式
     */
    public static String DATE_TO_STRING_SHORT_PATTERN = "yyyy-MM-dd";

    public static String FORMAT_LONG = "yyyyMMddHHmmssms";

    private static SimpleDateFormat simpleDateFormat;

    /**
     * Date类型转为指定格式的String类型
     *
     * @param source
     * @param pattern
     * @return
     */
    public static String dateToString(Date source, String pattern) {
        simpleDateFormat = new SimpleDateFormat(pattern);
        return simpleDateFormat.format(source);
    }

    /**
     * unix时间戳转为指定格式的String类型
     * <p>
     * <p>
     * System.currentTimeMillis()获得的是是从1970年1月1日开始所经过的毫秒数
     * unix时间戳:是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数,不考虑闰秒
     *
     * @param source
     * @param pattern
     * @return
     */
    public static String timeStampToString(long source, String pattern) {
        simpleDateFormat = new SimpleDateFormat(pattern);
        Date date = new Date(source * 1000);
        return simpleDateFormat.format(date);
    }

    /**
     * 将日期转换为时间戳(unix时间戳,单位秒)
     *
     * @param date
     * @return
     */
    public static long dateToTimeStamp(Date date) {
        Timestamp timestamp = new Timestamp(date.getTime());
        return timestamp.getDateTime() / 1000;

    }

    /**
     * 字符串转换为对应日期(可能会报错异常)
     *
     * @param source
     * @param pattern
     * @return
     */
    public static Date stringToDate(String source, String pattern) {
        simpleDateFormat = new SimpleDateFormat(pattern);
        Date date = null;
        try {
            date = simpleDateFormat.parse(source);
        } catch (ParseException e) {
            logger.error("字符串转换日期异常", e);
        }
        return date;
    }

    /**
     * 获得当前时间对应的指定格式
     *
     * @param pattern
     * @return
     */
    public static String currentFormatDate(String pattern) {
        simpleDateFormat = new SimpleDateFormat(pattern);
        return simpleDateFormat.format(new Date());

    }

    /**
     * 获得当前unix时间戳(单位秒)
     *
     * @return 当前unix时间戳
     */
    public static long currentTimeStamp() {
        return System.currentTimeMillis() / 1000;
    }


    public static String getNow(Date date) {
        return FastDateFormat.getInstance(DATE_TO_STRING_DETAIAL_PATTERN).format(date);
    }

    public static String getLongFormat(Date date) {
        return FastDateFormat.getInstance(FORMAT_LONG).format(date);
    }

    public static String getShortFormat(Date date) {
        return FastDateFormat.getInstance(FORMAT_LONG).format(date);
    }

    public static String getDateByCalendar(Calendar calendar, String format) {
        return FastDateFormat.getInstance(format).format(calendar);
    }


    public static String getPrevMonths(String format, Integer prevMons) {
        Calendar calendar = Calendar.getInstance();
        StringBuffer result = new StringBuffer(getDateByCalendar(calendar, format));

        for (int i = 0; i < prevMons.intValue(); ++i) {
            calendar.add(2, -1);
            result.append("," + getDateByCalendar(calendar, format));
        }

        return result.substring(0, result.length());
    }

    public static Date add(Date date, Integer type, Integer day) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.add(type.intValue(), day.intValue());
        return calendar.getTime();
    }
}
