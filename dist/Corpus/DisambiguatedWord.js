(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-dictionary/dist/Dictionary/Word"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DisambiguatedWord = void 0;
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class DisambiguatedWord extends Word_1.Word {
        /**
         * The constructor of {@link DisambiguatedWord} class which takes a {@link String} and a {@link MorphologicalParse}
         * as inputs. It creates a new {@link MorphologicalParse} with given MorphologicalParse. It generates a new instance with
         * given {@link String}.
         *
         * @param name  Instances that will be a DisambiguatedWord.
         * @param parse {@link MorphologicalParse} of the {@link DisambiguatedWord}.
         */
        constructor(name, parse) {
            super(name);
            this.parse = parse;
        }
        /**
         * Accessor for the {@link MorphologicalParse}.
         *
         * @return MorphologicalParse.
         */
        getParse() {
            return this.parse;
        }
    }
    exports.DisambiguatedWord = DisambiguatedWord;
});
//# sourceMappingURL=DisambiguatedWord.js.map