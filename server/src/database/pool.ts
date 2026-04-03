import path from 'path';
import dotenv from 'dotenv';
import { Pool } from 'pg';

//  Setup dotenv
dotenv.config({ path: path.resolve(__dirname, '../../process.env.example') });

//  Connect postgre database
//  learnt: connection pool set for reusability, optimised performance and database management
const pool = new Pool({
  connectionString: process.env.POSTGRE_CONN,
  ssl: { rejectUnauthorized: true },
});

export default pool;
