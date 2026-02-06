import { config } from "@dotenvx/dotenvx";
import postgres from 'postgres'
import { env } from "node:process";

config();

const sql = postgres({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    pass: env.DB_PASS,
    db: env.DB_NAME,
});

const t = "select * from t";

console.log(await sql.unsafe(t));
