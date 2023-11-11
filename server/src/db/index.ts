import { Pool, types } from "pg";

//credentials are automatically read from .env file
const pool = new Pool();

// //for making BIGSERIAL in pg to BIGINT in node
// //if didnt work will get string for bigserial(64 bit numbers)
types.setTypeParser(20, (val) => parseInt(val));

//HACK types are just my guess
const query = (text: string, params?: string[]) => pool.query(text, params);

export { query };
