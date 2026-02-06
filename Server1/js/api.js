import { MSG } from '../lang/en/user.js';

export class Api {
    constructor(origin){
        this.origin = origin;
    }

    buildURL(path) {
        return `${this.origin}${path}`;
    }

    async parseJson(response) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            return response.json();
        }

        const raw = await response.text();
        try {
            return JSON.parse(raw);
        } catch {
            return raw;
        }
    }

    async request(path, options) {
        const url = this.buildURL(path);
        const res = await fetch(url, options);

        const data = await this.parseJson(res);
        if(!res.ok) {
            const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
            throw new Error(`${MSG.ERROR_HTTP} ${res.status}\n${payload}`);
        }

        return data;
    }

    async insert() {
        return this.request(MSG.PATH_INSERT, {
            method : 'POST',
            headers: { 'Content-Type': 'text/plain; charset=utf-8'},
            body: 'insert'
        });
    }

    async runSqlSelect(query) {
        const url = new URL(this.origin);

        url.searchParams.set('sql', query);

        const res = await fetch(url.toString(), { method: 'GET'});
        const data = await this.parseJson(res);

        if(!res.ok) {
            const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
            throw new Error(`${MSG.ERROR_HTTP} ${res.status}\n${payload}`);
        }

        return data;
    }
}