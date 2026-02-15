"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisambiguatedWord = void 0;
const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
class DisambiguatedWord extends Word_1.Word {
    parse;
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
//# sourceMappingURL=DisambiguatedWord.js.map