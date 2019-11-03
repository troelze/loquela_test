'use strict';

// Sources:
// https://db-migrate.readthedocs.io/en/latest/API/SQL/
// https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/#reset
// https://www.wlaurance.com/2018/09/node-postgres-insert-multiple-rows/
var dbm;
var type;
var seed;
var pg = require('pg')
var format = require('pg-format')

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

var values = [
  ['lauren', 'lauren@test.com', '1234abcd'],
  ['hudson', 'hudson@test.com', '1234abcd'],
  ['tres', 'tres@test.com', '1234abcd']
]
var query = format('INSERT INTO users (username, email, password_hash) VALUES %L', values);

exports.up = async function(db, callback) {
  // We need to use pg-format and create a new connection here because otherwise there's
  // no support for inserting multiple values at once
  const client = new pg.Client({
      connectionString: 'postgres://me:password@localhost:5432/loquela'
  });
  client.connect().then(function() {
    client.query(query).then(function() {
      client.end();
    })
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  'version': 1
};
