
module.exports = {
  db: {
    database: process.env.DB_NAME || 'test',
    username: process.env.DB_USER || 'testuser',
    password: process.env.DB_PASS || '$up3rFud$',
    host: process.env.DB_HOST || 'dev-superfuds.cm8heorrngqo.sa-east-1.rds.amazonaws.com',
    dialect: 'mysql'
  }
}