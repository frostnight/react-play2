import View from "./View.js";
import {delegate, qs} from "../helpers.js";

const tag = "[KeywordListView]";

export default class KeywordListView extends View {
    constructor() {
        super(qs('#keyword-list-view'));

        this.template = new Template();

        this.bindEvents();
    }

    bindEvents() {
        delegate(this.element, "click", "li",
            event => this.handleClick(event));
    }

    handleClick(event) {
        console.log(tag, "handleClick", event.target);
        const value = event.target.dataset.keyword;
        this.emit("@click", { value });
    }

    show(data = []) {
        this.element.innerHTML =
            data.length > 0 
                ? this.template.getList(data) 
                : this.template.getEmptyMessage();
        super.show();
    }
}

class Template {

    getList(data = [])   {
        return `
            <ul class="list">
                ${data.map(this._getItem).join("")}
            </ul>
        `
    }

    getEmptyMessage() {
        return `<div class="empty-box">추천 검색어가 없습니다.</div>`
    }

    _getItem({id, keyword}) {
        return `
            <li data-keyword="${keyword}" style="cursor:pointer">
                <span class="number">${id}</span>
                ${keyword}
            </li>
        `
    }
}