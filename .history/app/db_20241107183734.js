const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');
const crypto = require('crypto');

const maindb = new sqlite3.Database('../var/db/veltro.db');

maindb.serialize(() => {
  maindb.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT, \
    email TEXT UNIQUE, \
    email_verified INTEGER, \
    avatar BLOB, \
    status TEXT \
  )");
  
  maindb.run("CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) \
  )");
  
  const salt = crypto.randomBytes(16);
  // maindb.run('INSERT OR IGNORE INTO users (username, hashed_password, salt, email, status) VALUES (?, ?, ?, ?, ?)', [
  //   'ThatLemonGamer',
  //   crypto.pbkdf2Sync('LemonRokcet22', salt, 310000, 32, 'sha256'),
  //   salt.toString('hex'),
  //   'gaminglemonz23@gmail.com',
  //   'admin',
  // ]);
});

module.exports = maindb;