## How to deploy application.

Before deploy, create next files:

* `postgres.env` template (in root directory):

```
POSTGRES_PASSWORD = '<password>'

```

* `server/.env` template (in server directory):

```
PGUSER = 'postgres'
PGPASSWORD = '<password>'
PGDATABASE = 'postgres'
__DATABASE = 'book_shop_seq'
PGHOST = 'postgres'
__HOST = 'localhost'
PORT = 5432
PORT = 4000

```

To deploy application, run:

```
docker-compose up --build
```

To provide dump into postgres container, run:

```
psql -U postgres -p 9876 postgres < dump.sql
```

To provide images into server container, run:

```
docker cp server/public/. server:/app/public
```

Deployed application address: http://localhost:6174

You can view logs here: http://localhost:5601

## How to run application without deploying.

In `server/.env` file, swap `PGDATABASE` and `__DATABASE`, as well as `PGHOST` and `__HOST`.

## Next for developers.

You can insert heartbeat into input in Logstash configuration file to check Logstash availability.

```
heartbeat {
  interval => 5
  message  => 'Hello from Logstash 💓'
}
```
