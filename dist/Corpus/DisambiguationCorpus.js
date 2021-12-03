(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-corpus/dist/Corpus", "fs", "./DisambiguatedWord", "../MorphologicalAnalysis/MorphologicalParse", "nlptoolkit-corpus/dist/Sentence"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DisambiguationCorpus = void 0;
    const Corpus_1 = require("nlptoolkit-corpus/dist/Corpus");
    const fs = require("fs");
    const DisambiguatedWord_1 = require("./DisambiguatedWord");
    const MorphologicalParse_1 = require("../MorphologicalAnalysis/MorphologicalParse");
    const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
    class DisambiguationCorpus extends Corpus_1.Corpus {
        constructor(fileName) {
            super();
            if (fileName != undefined) {
                let newSentence = undefined;
                let data = fs.readFileSync(fileName, 'utf8');
                let lines = data.split("\n");
                for (let line of lines) {
                    let word = line.substring(0, line.indexOf("\t"));
                    let parse = line.substring(line.indexOf("\t") + 1);
                    if (word != "" && parse != "") {
                        let newWord = new DisambiguatedWord_1.DisambiguatedWord(word, new MorphologicalParse_1.MorphologicalParse(parse));
                        if (word == "<S>") {
                            newSentence = new Sentence_1.Sentence();
                        }
                        else {
                            if (word == "</S>") {
                                this.addSentence(newSentence);
                            }
                            else {
                                if (word == "<DOC>" || word == "</DOC>" || word == "<TITLE>" || word == "</TITLE>") {
                                }
                                else {
                                    if (newSentence != null) {
                                        newSentence.addWord(newWord);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    exports.DisambiguationCorpus = DisambiguationCorpus;
});
//# sourceMappingURL=DisambiguationCorpus.js.map