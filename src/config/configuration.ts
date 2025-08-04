export default () => ({
  NODE_ENV: process.env.NODE_ENV,

  port: parseInt(process.env.PORT ?? '3000'),

  secret: process.env.SECRET,

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    user: process.env.DB_USENAME,
    pass: process.env.DB_PWD,
    name: process.env.DB_NAME,
  },
});
