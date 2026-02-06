import { config } from '@dotenvx/dotenvx';
import postgres from 'postgres'
import { env } from 'node:process';
import http from 'node:http';
import url from 'node:url';

const database = new (class {
    constructor() {
        config();
        this.sql = postgres({
            host: env.DB_HOST,
            port: env.DB_PORT,
            user: env.DB_USER,
            pass: env.DB_PASS,
            db: env.DB_NAME,
        });
    }

    async query(query) {
        return await this.sql.unsafe(query);
    }
})();

class Response {
    constructor(body, options = {}) {
        this.body = JSON.stringify(body);
        this.status = options.status || 200;
        this.headers = options.headers || {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
    }
}

(new (class {
    constructor() {


        this.server = http.createServer(async (req, res) => {
            const parsedUrl = url.parse(req.url, true);

            try {
                let response;

                switch (req.method) {
                    case 'GET':
                        response = new Response(await database.query(parsedUrl.query.sql ?? ''));
                        break;
                    case 'POST':
                        const buf = [];
                        for await (const data of req) {
                            buf.push(data);
                        }
                        const people = JSON.parse(Buffer.concat(buf).toString())?.rows ?? [];
                        response = new Response(await database.sql`INSERT INTO people ${database.sql(people)}`);
                        break;
                    default:
                        response = new Response(null, { status: 405 });
                        break;
                }

                res.statusCode = response.status;
                for (const [key, value] of Object.entries(response.headers)) {
                    res.setHeader(key, value);
                }
                res.end(response.body);
            } catch (err) {
                const response = new Response({ error: err.message }, {
                    status: 500,
                });

                res.statusCode = response.status;
                for (const [key, value] of Object.entries(response.headers)) {
                    res.setHeader(key, value);
                }
                res.end(response.body);
            }
        });
    }

    start() {
        const PORT = 3000;
        this.server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });
    }
})()).start();
