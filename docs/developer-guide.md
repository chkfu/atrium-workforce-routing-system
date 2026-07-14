<!--

Learnt:

The developer-guide.md file use to educate the future developers internally on
how to edit, expand and append the new elements.

It ensures future developers could make changes on the system within the
specific structure.

-->

# DEVELOPMENT GUIDE

This guide provide the instructions for setting up the dev environment, maintaining the project and understanding the system operation.

<br/>

## Contents

- [Installation Guide](#installation-guide)
- [Database Setup Guide](#database-setups-guide)
- [SSL/TLS Setup Guide](#ssltls-setup-guide)
- [Logging Guide](#logging-guide)
- [Cache Guide](#cache-guide)

<br/>

## Installation Guide

For project setup, you need to install Node.js v18+, PostgreSQL, and Redis to proceed further.

Please clone the project at the <a href='https://github.com/chkfu/atrium-workforce-routing-system.git'>Github repository</a>.

### A. Server side setup (development environment)

Beginning with a new terminal, and run the CLI with the commands below:

```
$ cd server
$ npm install
$ npm run dev
```

The server will be available at `https://localhost:8080` (or specified).

<i>
Make sure to setup the `config.env` file at the root level, before starting the express server.  The file specifically centralises the project configuration related to sever, database, security and etc.
</i>


### B. Client side setup (development environment)

For browser display, please start the second terminal and run the below commands:

```
$ cd client
$ npm install
$ npm run dev
```

The client will be available at `http://localhost:5173` (or specified).

<br/>

## Database Setup Guide

### A. Initialise Neon PostGre database

#### (1) database setup

You may check the current postgresql version with:

```
$ psql --version
```

Please run the below CLI instructions at terminal if it has not been installed:

```
$ brew install postgresql@17
$ brew services start postgresql@17

```

Once installed, the initialization script in `package.json` will execute the schema file by running:

```
$ npm run db:init
```

This creates all required tables and enums defined in the schema.

#### (2) operational rationale

In `src/infra/database`, PostgreSQL codes have been stored in the listed files in below:

| File Name  | Usage         | 
| ------ | ----------------- | 
| postgres.ts | Initialises database connection pool and manages connections |
| pg_codes.ts | Reference list for PostgreSQL error codes to HTTP status codes| 
| schema.sql | Defines schema for forming tabular data and their inter-relations therein. | 

<p>
  <img src="charts/chart_dev_postgre-usage.png" width="100%">
</p>

<br/>

### B. Initialise Redis

#### (1) database setup

You may check the current Redis version with:

```
$ redis-cli --version
```

Please run the below CLI instructions at terminal if it has not been installed:

```
$ brew install redis
$ brew services start redis
```

Once installed, verify Redis is running:

```
$ redis-cli ping
```

Rate limiting is performed through the `rate-limit-redis` middleware. No additional initialization scripts are required.

#### (2) operational rationale

In `src/infra/database`, Redis codes have been stored in the listed files in `redis.ts`.

<p>
  <img src="charts/chart_dev_redis-usage.png" width="100%">
</p>

<br/>

##  SSL/TLS Setup Guide

To support HTTPS connection, SSL/TLS certificate is required to encrypt the sensitive data when it is transitioning. 

<br/>

### Step 1:

Create RSA-encrypted keys:

```
$ openssl genrsa -out privatekey.pem 2048
```

2048 provides higher standard of key encryption but slightly longer time cost

<br/>

### Step 2:

Setup certificate requirement:

```
$ openssl req -new -key privatekey.pem -out csrreq.csr
```

<br/>

### Step 3:

Based on PKI protocol for CA certificate:

```
$ openssl x509 -req -days 365 -in csrreq.csr -signkey privatekey.pem -out ca.pem
```

Short expiry is a kind of security practice for protection, but the 365 days has been set for local development.

<br/>

### Step 4:

To secure the designated connection, you may install mkcert and then generate key and cert using:

```
$ mkcert -install
$ mkcert {designated_address}
```

With the example of `localhost`, please run:

```
$ mkcert localhost
```


<br/>

## Logging Guide

### A. Logger Structure

The loggers setting is stored at `server/infra/logger` in the server side. 

Through winston, the project centralise the logger managements (especially categorisation, formatting and configuration). The file contains three core parts:

| Function / Component | Description |
|----------------------|-------------|
| `createRotateTransport()` | Customises the configuration and settings of future log files. |
| `msg_format` | The format of logger messages listed in the log files. |
| `create_loggers()` | Creating new loggers to adopt the customised configurations. |

In our design, the project utilise the serveral log with their specific features:

| Logger | Description |
|--------|-------------|
| `app_logger` | related to system operation. |
| `http_logger` | related to HTTP requests and responses. |
| `auth_logger` | related to authentication and authorisation. |
| `critical_logger` | related critical errors. |

### B. Log Storage

After initialised the project, a `server/logs/` folder will be automatically created once new log message has been formed. 

As default, the log file will stored as default setting:

| Setting | Value | Description |
|---------|-------|-------------|
| `filename` | `./logs/<filename>-%DATE%.log` | Log file path with date. |
| `datePattern` | `YYYY-MM-DD` | Daily rotation. |
| `zippedArchive` | `true` | Compress old logs. |
| `maxSize` | `128m` | Rotate at 128MB. |
| `maxFiles` | `7d` | Keep logs for 7 days. |
| `level` | Configurable | Log level filter. |

Please refined the settings at rooted file (in `server/infra/logger`) and update this guide, if any amendment has been made.

<br/>

## Cache Guide

The Redis database has been set up at `infra/database/redis.ts` for initialisation, and `CacheService` (`infra/cache/CacheServices`) centralise all cache management methods to assist massive CRUD action with better efficiency.

This cache design aims to:
- serve as a fast in-memory layer to prevent overloading the permanent storage
- support high-frequency operations with rate-limiting
- prevent race conditions over editing the same cached data

### A. Composition

| Method | Description |
|---|---|
| `create_key` | Create new key (`table:id` / `table:all`) |
| `validate_key` | Validate key |
| `acquire_lock` | Acquire a lock, support `handle_lock` |
| `release_lock` | Release the lock, support `handle_lock` |
| `handle_lock` | Run through locking cycle |
| `get_cache` | Cache read |
| `set_cache` | Cache change |
| `del_cache` | Remove cache by key |
| `del_cache_by_pattern` | remove cache by table |


### B. Usage

#### Example: getting record with specific id

For example, data records with specific id has been requested to read action.

In cache handling, however, the system need to consider for both senario when whether cache record has been stored in reids's fast memeories: 

```
public get_record_by_id = async (id: string) => {
  return await this.cache_service.handle_lock(this.table, id, async () => {

    //  remarks: senario 1 - cache found
    //  task: use get_cache methods to retrieve existing data

    const cached_key: string = this.cache_service.create_key(this.table, id);
    const cached_val: any = await this.cache_service.get_cache(cached_key);
    if (cached_val) {
      return cached_val;
    }

    //  remarks:  senario 2 - not in cache
    //  task: call data from permanant database, and then update cache with set_cache method

    // ... fetch data  ...

    // populate cache for future reads
    await this.cache_service.set_cache(cached_key, result);
    return result;
  });
};
```

Once updated data has been stored, subsequebnt reading requests will find the existing record, preventing the loop on frequent queries over permanant database.

#### Exception: getting all record from a table

Considered that the batch record queries involving massive combination of sorting, filtering and pagination. Massive combination will overload the fast-memory storage, while these queries are unlikely to be repeated with lower hit possibility. In practice, it scarisfied memory for unused data with actually improvement over caching efficiency.

<br/>

<i> Author: kchan </i>
</br>
<i> Last Updated: July 14, 2026</i>
