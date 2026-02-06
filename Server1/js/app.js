import { MSG } from '../lang/en/user.js';

export class App {
    constructor(api) {
        this.api = api;

        this.title = document.getElementById('title');
        this.subtitle = document.getElementById('subtitle');
        this.insHeading = document.getElementById('insHeading');
        this.insDesc = document.getElementById('insDesc');
        this.insBtn = document.getElementById('insBtn');
        this.insStatus = document.getElementById('insStatus');
        this.qHeading = document.getElementById('qHeading');
        this.qDesc = document.getElementById('qDesc');
        this.qInputLabel = document.getElementById('qInputLabel');
        this.qInput = document.getElementById('qInput');
        this.qBtn = document.getElementById('qBtn');
        this.resHeading = document.getElementById('resHeading');
        this.resDesc = document.getElementById('resDesc');
        this.resOutput = document.getElementById('resOutput');
    }

    initText() {
        this.setText(this.title, MSG.PAGE_TITLE);
        this.setText(this.subtitle, MSG.PAGE_SUBTITLE);

        this.setText(this.insHeading, MSG.INSERT_HEADING);
        this.setText(this.insDesc, MSG.INSERT_DESC);
        this.setText(this.insBtn, MSG.INSERT_BUTTON);

        this.setText(this.qHeading, MSG.QUERY_HEADING);
        this.setText(this.qDesc, MSG.QUERY_DESC);
        this.setText(this.qInputLabel, MSG.QUERY_LABEL);
        this.setText(this.qBtn, MSG.QUERY_BUTTON);

        this.setText(this.resHeading, MSG.RESPONSE_HEADING);
        this.setText(this.resDesc, MSG.RESPONSE_DESC);

        this.setStatus(MSG.STATUS_READY);

        if (this.qInput) this.qInput.value = MSG.DEFAULT_QUERY;
    }

    bindEvents() {
        this.insBtn.addEventListener('click', async () => {
            await this.handleInsertClick();
        });
        this.qBtn.addEventListener('click', async () => {
            await this.handleQueryClick();
        });
    }

    async handleInsertClick() {
        try {
            this.setStatus(MSG.STATUS_INSERTING);
            const data = await this.api.insert();
            this.setStatus(MSG.STATUS_READY);
            this.setOutputJson(data);
        } catch (err) {
            this.setStatus(MSG.STATUS_ERROR);
            this.setOutputText(`${MSG.ERROR_PRE}${String(err)}`);
        }
    }

    async handleQueryClick() {
        try {
            const query = this.qInput ? this.qInput.value.trim() : '';
            if (!query) {
                this.setOutputText(MSG.ERROR_EMPTY);
                return;
            }
            this.setStatus(MSG.STATUS_QUERYING);
            const data = await this.api.runSqlSelect(query);
            this.setStatus(MSG.STATUS_READY);
            this.setOutputJson(data);
        } catch(err) {
            this.setStatus(MSG.STATUS_ERROR);
            this.setOutputText(`${MSG.ERROR_PRE}${String(err)}`);
        }
    }

    setText(node, text) {
        if(node) {
            node.textContent = text;
        }
    }

    setStatus(text) {
        this.setText(this.insStatus, text)
    }

    setOutputJson(object) {
        if (this.resOutput) {
            this.resOutput.textContent = JSON.stringify(object, null, 2)
        }
    }

    setOutputText(text) {
        if (this.resOutput) {
            this.resOutput.textContent = text;
        }
    }
}
