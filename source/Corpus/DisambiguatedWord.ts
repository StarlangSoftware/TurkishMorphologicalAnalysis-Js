import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {MorphologicalParse} from "../MorphologicalAnalysis/MorphologicalParse";

export class DisambiguatedWord extends Word{

    private parse: MorphologicalParse

    /**
     * The constructor of {@link DisambiguatedWord} class which takes a {@link String} and a {@link MorphologicalParse}
     * as inputs. It creates a new {@link MorphologicalParse} with given MorphologicalParse. It generates a new instance with
     * given {@link String}.
     *
     * @param name  Instances that will be a DisambiguatedWord.
     * @param parse {@link MorphologicalParse} of the {@link DisambiguatedWord}.
     */
    constructor(name: string, parse: MorphologicalParse) {
        super(name);
        this.parse = parse
    }

    /**
     * Accessor for the {@link MorphologicalParse}.
     *
     * @return MorphologicalParse.
     */
    getParse(): MorphologicalParse{
        return this.parse
    }
}