import {drizzle} from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './infrastructure/db/schema.js'

import { config } from './config/env.js';

const pool = new Pool({
    connectionString: config.db_url
})

export const db = drizzle({
    client: pool
});