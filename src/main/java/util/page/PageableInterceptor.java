package util.page;
import org.apache.ibatis.binding.MapperMethod;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Intercepts({@Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
)})
public class PageableInterceptor implements Interceptor {
    private static Logger logger = LoggerFactory.getLogger(PageableInterceptor.class);
    static int MAPPED_STATEMENT_INDEX = 0;
    static int PARAMETER_INDEX = 1;
    static int ROWBOUNDS_INDEX = 2;
    static int RESULT_HANDLER_INDEX = 3;
    private Dialect dialect;

    public PageableInterceptor() {
    }

    public Object intercept(Invocation inv) throws Throwable {
        Object[] queryArgs = inv.getArgs();
        Pageable pageRequest = this.findPageableObject(queryArgs[PARAMETER_INDEX]);
        if (pageRequest != null) {
            MappedStatement ms = (MappedStatement) queryArgs[MAPPED_STATEMENT_INDEX];
            Object parameter = queryArgs[PARAMETER_INDEX];
            BoundSql boundSql = ms.getBoundSql(parameter);
            String sql = boundSql.getSql().trim().replaceAll(";$", "");
            int total = 0;
            if (pageRequest.getCountable()) {
                total = this.queryTotal(sql, ms, boundSql);
            }

            String limitSql = this.dialect.getLimitString(sql, pageRequest.getOffset(), pageRequest.getPageSize());
            queryArgs[ROWBOUNDS_INDEX] = new RowBounds(0, 2147483647);
            queryArgs[MAPPED_STATEMENT_INDEX] = this.copyFromNewSql(ms, boundSql, limitSql);
            Object ret = inv.proceed();
            Page<?> pi = new Page((List) ret, pageRequest, (long) total);
            List<Page<?>> tmp = new ArrayList(1);
            tmp.add(pi);
            return tmp;
        } else {
            return inv.proceed();
        }
    }

    private Pageable findPageableObject(Object params) {
        if (params == null) {
            return null;
        } else if (Pageable.class.isAssignableFrom(params.getClass())) {
            return (Pageable) params;
        } else {
            if (params instanceof MapperMethod.ParamMap) {
                MapperMethod.ParamMap<Object> paramMap = (MapperMethod.ParamMap) params;
                Iterator i$ = paramMap.entrySet().iterator();

                while (i$.hasNext()) {
                    Map.Entry<String, Object> entry = (Map.Entry) i$.next();
                    Object paramValue = entry.getValue();
                    if (paramValue != null && Pageable.class.isAssignableFrom(paramValue.getClass())) {
                        return (Pageable) paramValue;
                    }
                }
            }

            return null;
        }
    }

    public Object plugin(Object target) {
        return Executor.class.isAssignableFrom(target.getClass()) ? Plugin.wrap(target, this) : target;
    }

    public void setProperties(Properties p) {
        String dialectClass = p.getProperty("dialectClass");

        try {
            this.setDialect((Dialect) Class.forName(dialectClass).newInstance());
        } catch (Exception var4) {
            throw new RuntimeException("cannot create dialect instance by dialectClass:" + dialectClass, var4);
        }
    }

    private int queryTotal(String sql, MappedStatement mappedStatement, BoundSql boundSql) throws SQLException {
        Connection connection = null;
        PreparedStatement countStmt = null;
        ResultSet rs = null;

        int var10;
        try {
            connection = mappedStatement.getConfiguration().getEnvironment().getDataSource().getConnection();
            String countSql = this.dialect.getCountString(sql);
            countStmt = connection.prepareStatement(countSql);
            BoundSql countBoundSql = new BoundSql(mappedStatement.getConfiguration(), countSql, boundSql.getParameterMappings(), boundSql.getParameterObject());
            this.setParameters(countStmt, mappedStatement, countBoundSql, boundSql.getParameterObject());
            rs = countStmt.executeQuery();
            int totalCount = 0;
            if (rs.next()) {
                totalCount = rs.getInt(1);
            }

            var10 = totalCount;
        } catch (SQLException var25) {
            logger.error("查询总记录数出错", var25);
            throw var25;
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException var24) {
                    logger.error("exception happens when doing: ResultSet.close()", var24);
                }
            }

            if (countStmt != null) {
                try {
                    countStmt.close();
                } catch (SQLException var23) {
                    logger.error("exception happens when doing: PreparedStatement.close()", var23);
                }
            }

            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException var22) {
                    logger.error("exception happens when doing: Connection.close()", var22);
                }
            }

        }

        return var10;
    }

    private void setParameters(PreparedStatement ps, MappedStatement mappedStatement, BoundSql boundSql, Object parameterObject) throws SQLException {
        ParameterHandler parameterHandler = new DefaultParameterHandler(mappedStatement, parameterObject, boundSql);
        parameterHandler.setParameters(ps);
    }

    public Dialect getDialect() {
        return this.dialect;
    }

    public void setDialect(Dialect dialect) {
        this.dialect = dialect;
    }

    private MappedStatement copyFromNewSql(MappedStatement ms, BoundSql boundSql, String sql) {
        BoundSql newBoundSql = this.copyFromBoundSql(ms, boundSql, sql);
        return this.copyFromMappedStatement(ms, new PageableInterceptor.BoundSqlSqlSource(newBoundSql));
    }

    private BoundSql copyFromBoundSql(MappedStatement ms, BoundSql boundSql, String sql) {
        BoundSql newBoundSql = new BoundSql(ms.getConfiguration(), sql, boundSql.getParameterMappings(), boundSql.getParameterObject());
        Iterator i$ = boundSql.getParameterMappings().iterator();

        while (i$.hasNext()) {
            ParameterMapping mapping = (ParameterMapping) i$.next();
            String prop = mapping.getProperty();
            if (boundSql.hasAdditionalParameter(prop)) {
                newBoundSql.setAdditionalParameter(prop, boundSql.getAdditionalParameter(prop));
            }
        }

        return newBoundSql;
    }

    private MappedStatement copyFromMappedStatement(MappedStatement ms, SqlSource newSqlSource) {
        MappedStatement.Builder builder = new MappedStatement.Builder(ms.getConfiguration(), ms.getId(), newSqlSource, ms.getSqlCommandType());
        builder.resource(ms.getResource());
        builder.fetchSize(ms.getFetchSize());
        builder.statementType(ms.getStatementType());
        builder.keyGenerator(ms.getKeyGenerator());
        if (ms.getKeyProperties() != null && ms.getKeyProperties().length != 0) {
            StringBuffer keyProperties = new StringBuffer();
            String[] arr$ = ms.getKeyProperties();
            int len$ = arr$.length;

            for (int i$ = 0; i$ < len$; ++i$) {
                String keyProperty = arr$[i$];
                keyProperties.append(keyProperty).append(",");
            }

            keyProperties.delete(keyProperties.length() - 1, keyProperties.length());
            builder.keyProperty(keyProperties.toString());
        }

        builder.timeout(ms.getTimeout());
        builder.parameterMap(ms.getParameterMap());
        builder.resultMaps(ms.getResultMaps());
        builder.resultSetType(ms.getResultSetType());
        builder.cache(ms.getCache());
        builder.flushCacheRequired(ms.isFlushCacheRequired());
        builder.useCache(ms.isUseCache());
        return builder.build();
    }

    public static class BoundSqlSqlSource implements SqlSource {
        BoundSql boundSql;

        public BoundSqlSqlSource(BoundSql boundSql) {
            this.boundSql = boundSql;
        }

        public BoundSql getBoundSql(Object parameterObject) {
            return this.boundSql;
        }
    }
}
