import { MorphologicalTag } from "./MorphologicalTag";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import { MorphologicalParse } from "./MorphologicalParse";
export declare class MetamorphicParse {
    static metaMorphemes: string[];
    static morphotacticTags: MorphologicalTag[];
    private metaMorphemeList;
    private readonly root;
    /**
     * The getMetaMorphemeTag method takes a String tag as an input and takes the first char of the tag. If first char
     * is a punctuation it gets a substring from the tag. And gets the meta morphemes of this tag then adds to the
     * result {@link Array}.
     *
     * @param tag String to get meta morphemes from.
     * @param parse MorphologicalParse type input.
     * @return ArrayList type result which holds meta morphemes.
     */
    static getMetaMorphemeTag(tag: string, parse?: MorphologicalParse): Array<MorphologicalTag>;
    /**
     * The getter method for Private Word root.
     *
     * @return Word type root.
     */
    getWord(): Word;
    /**
     * A constructor of {@link MetamorphicParse} class which creates an {@link ArrayList} metaMorphemeList which has split words
     * according to +.
     *
     * @param parse String to parse.
     */
    constructor(parse: string);
    /**
     * The size method returns the size of the metaMorphemeList.
     *
     * @return the size of the metaMorphemeList.
     */
    size(): number;
    /**
     * The addMetaMorphemeList method splits input String by + and add to the metaMorphemeList.
     *
     * @param newTacticSet String to add the metaMorphemeList.
     */
    addMetamorphemeList(newTacticSet: string): void;
    /**
     * The removeMetaMorphemeFromIndex method removes the meta morpheme at given index from metaMorphemeList.
     *
     * @param index to remove from metaMorphemeList.
     */
    removeMetaMorphemeFromIndex(index: number): void;
    /**
     * The getMetaMorpheme method gets the meta morpheme at given index.
     *
     * @param index is used to get the meta morpheme.
     * @return metaMorphemeList's corresponding meta morpheme.
     */
    getMetaMorpheme(index: number): string;
    /**
     * Overridden toString method to return resulting meta morphemes in metaMorphemeList.
     *
     * @return String result.
     */
    toString(): string;
}
