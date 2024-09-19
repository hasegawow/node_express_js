module.exports = {

  development: {
    client: "mysql2",
    connection: {
      database: "todo_app",
      user: "root",
      password: "root",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      database: "todo_app",
      user: "root",
      password: "root",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "pg",  // PostgreSQL用のクライアント
    connection: {
      host: "localhost", // 環境変数に基づいて接続情報を設定
      database: "todo_app",
      user: "root",
      password: "root",
      port: process.env.DB_PORT || 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

