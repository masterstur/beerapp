"use strict";

const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");
const config    = require('config');

const sql = new Sequelize(
    config.db.name,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect
    }
    
);

const db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = sql.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sql = sql;
db.Sequelize = Sequelize;

module.exports = db;