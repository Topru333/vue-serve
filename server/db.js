'use strict'
const sqlite3 = require('sqlite3').verbose()
let logger = require('./logger');


class Db {
  constructor (file) {
    this.db = new sqlite3.Database(file)
    this.createTable()
  }

  createTable () {
    const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                email text UNIQUE,
                is_admin integer)`
    this.db.run(sql, () => {
      logger.accessLog.info('Db created...')
    })
    let user = {
      email: '',
      is_admin: '1'
    }
    return this.db.run(
      'INSERT INTO user (email,is_admin) VALUES (?,?,?,?)', user, () => {
        this.db.run(sql, () => {
          logger.accessLog.info('Admin created...')
        })
      })
  }

  selectByEmail (email, callback) {
    return this.db.get(
      `SELECT * FROM user WHERE email = ?`,
      [email], function (err, row) {
        callback(err, row)
      })
  }

  insertAdmin (user, callback) {
    return this.db.run(
      'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
      user, (err) => {
        callback(err)
      })
  }

  selectAll (callback) {
    return this.db.all(`SELECT * FROM user`, function (err, rows) {
      callback(err, rows)
    })
  }

  insert (user, callback) {
    return this.db.run(
      'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
      user, (err) => {
        callback(err)
      })
  }
}

module.exports = Db
