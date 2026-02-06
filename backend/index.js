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
        this.body = body;
        this.status = options.status || 200;
        this.headers = options.headers || {};
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
                        response = new Response(JSON.stringify(
                            await database.query(parsedUrl.query.sql ?? ''),
                        ), {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        break;
                    case 'POST':
                        const buf = [];
                        for await (const data of req) {
                            buf.push(data);
                        }
                        console.log(Buffer.concat(buf).toString());

                        response = new Response(JSON.stringify(
                            await database.query(Buffer.concat(buf).toString() ?? ''),
                        ), {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
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
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
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
