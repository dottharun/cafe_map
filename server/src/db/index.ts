import { Pool } from "pg";

//credentials are automatically read from .env file
const pool = new Pool();

//HACK types are just my guess
const query = (text: string, params?: string[]) => pool.query(text, params);

export { query };
