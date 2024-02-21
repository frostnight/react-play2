import View from "./View.js";
import {on, qs} from "../helpers.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
    constructor() {
        super(qs("#search-form-view"));

        this.inputElement = qs("[type=text]", this.element);
        this.resetElement = qs("[type=reset]", this.element);

        this.showResetButton(false);
        this.bindEvent();
    }

    showResetButton(visible = true) {
        this.resetElement.style.display = visible ? "block" : "none";
    }

    bindEvent() {
        on(this.inputElement, "keyup", () => this.handleKeyUp());
        on(this.element, "submit", (event) => this.handleSubmit(event));
        on(this.resetElement, "click", () => this.handleReset());
    }

    handleKeyUp() {
        const {value} = this.inputElement
        this.showResetButton(value.length > 0);

        if(value.length <= 0) {
            this.handleReset();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(tag, "handleSubmit");
        const {value} = this.inputElement;
        this.emit("@submit", {value});
    }

    handleReset() {
        console.log(tag, 'handleReset');
        this.emit('@reset');
    }
}