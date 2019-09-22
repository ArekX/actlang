class Scanner {
    constructor(text) {
        this._index = 0;
        this._text = text;
        this._line = 0;
        this._column = 0;
        this._lineOffset = 0;
        this._columnOffset = 0;
    }

    get char() {
        return this._text[this._index];
    }

    get length() {
        return this._text.length;
    }

    get index() {
        return this._index;
    }

    get line() {
        return this._line + this._lineOffset;
    }

    get column() {
        return this._column + this._columnOffset;
    }

    get at() {
        return {line: this.line, column: this.column};
    }

    offset(line, column) {
        this._lineOffset = line;
        this._columnOffset = column;
    }

    _checkLine() {
        if (this.char === '\n') {
            this._line++;
            this._column = 0;
        }

        this._column++;
    }

    get endOfText() {
        return this._index >= this._text.length;
    }

    getPart(max = 1, min = 0) {
        return this._text.substring(this._index - min, this._index + max);
    }

    matchesRight(string) {
        return this.getPart(string.length) === string;
    }

    matchesLeft(string) {
        return this.getPart(string.length * -1) === string;
    }

    move(increase = 1) {
        let nextIndex = this._index + increase;

        while(this._index < nextIndex) {
            this._checkLine();
            this._index++;
        }
    }
}

module.exports = Scanner;