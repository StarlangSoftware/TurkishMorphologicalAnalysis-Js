"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisambiguationCorpus = void 0;
const Corpus_1 = require("nlptoolkit-corpus/dist/Corpus");
const fs = __importStar(require("fs"));
const DisambiguatedWord_1 = require("./DisambiguatedWord");
const MorphologicalParse_1 = require("../MorphologicalAnalysis/MorphologicalParse");
const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
class DisambiguationCorpus extends Corpus_1.Corpus {
    /**
     * Constructor which takes a file name {@link String} as an input and reads the file line by line. It takes each word of the line,
     * and creates a new {@link DisambiguatedWord} with current word and its {@link MorphologicalParse}. It also creates a new {@link Sentence}
     * when a new sentence starts, and adds each word to this sentence till the end of that sentence.
     *
     * @param fileName File which will be read and parsed.
     */
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
//# sourceMappingURL=DisambiguationCorpus.js.map