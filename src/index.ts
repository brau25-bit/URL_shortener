import {drizzle} from 'drizzle-orm/node-postgres';

import { config } from './config/env.js';

export const db = drizzle(config.db_url!);