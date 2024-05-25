import { Corpus } from "nlptoolkit-corpus/dist/Corpus";
export declare class DisambiguationCorpus extends Corpus {
    /**
     * Constructor which takes a file name {@link String} as an input and reads the file line by line. It takes each word of the line,
     * and creates a new {@link DisambiguatedWord} with current word and its {@link MorphologicalParse}. It also creates a new {@link Sentence}
     * when a new sentence starts, and adds each word to this sentence till the end of that sentence.
     *
     * @param fileName File which will be read and parsed.
     */
    constructor(fileName?: string);
}
