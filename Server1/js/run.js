
import { MSG } from '../lang/en/user.js';
import { Api } from './api.js';
import { App } from './app.js';

window.addEventListener('DOMContentLoaded', () => {
  const api = new Api(MSG.API_ORIGIN);
  const app = new App(api);

  app.initText();
  app.bindEvents();
});