import {Corpus} from "nlptoolkit-corpus/dist/Corpus";
import * as fs from "fs";
import {DisambiguatedWord} from "./DisambiguatedWord";
import {MorphologicalParse} from "../MorphologicalAnalysis/MorphologicalParse";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";

export class DisambiguationCorpus extends Corpus{

    /**
     * Constructor which takes a file name {@link String} as an input and reads the file line by line. It takes each word of the line,
     * and creates a new {@link DisambiguatedWord} with current word and its {@link MorphologicalParse}. It also creates a new {@link Sentence}
     * when a new sentence starts, and adds each word to this sentence till the end of that sentence.
     *
     * @param fileName File which will be read and parsed.
     */
    constructor(fileName?: string) {
        super();
        if (fileName != undefined){
            let newSentence = undefined;
            let data = fs.readFileSync(fileName, 'utf8')
            let lines = data.split("\n")
            for (let line of lines) {
                let word = line.substring(0, line.indexOf("\t"));
                let parse = line.substring(line.indexOf("\t") + 1);
                if (word != "" && parse != "") {
                    let newWord = new DisambiguatedWord(word, new MorphologicalParse(parse));
                    if (word == "<S>") {
                        newSentence = new Sentence();
                    } else {
                        if (word == "</S>") {
                            this.addSentence(newSentence);
                        } else {
                            if (word == "<DOC>" || word == "</DOC>" || word == "<TITLE>" || word == "</TITLE>") {
                            } else {
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