var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/nasa';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE potd('
  +'id SERIAL PRIMARY KEY,'
  +'date date  not null,'
  +'title VARCHAR(1000) not null,'
  +'explanation text null,'
  +'hdurl VARCHAR(1000) null,'
  +'url VARCHAR(1000) null,'
  +'copyright VARCHAR(1000) null'
+')');
query.on('end', function() { client.end(); });
