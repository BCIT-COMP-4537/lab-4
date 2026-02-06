import { MSG } from '../lang/en/user.js';
import { Api } from './app.js';
import { App } from './api.js';

window.addEventListener('DOMContentLoaded', () => {
    const api = Api(MSG.API_ORIGIN);
    const app = new App(api);

    app.initText();
    app.bindEvents();
})
