import { FsmParse } from "./FsmParse";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
export declare class FsmParseList {
    private readonly fsmParses;
    static longestRootExceptions: string[];
    /**
     * A constructor of {@link FsmParseList} class which takes an {@link Array} fsmParses as an input. First it sorts
     * the items of the {@link Array} then loops through it, if the current item's transitions equal to the next item's
     * transitions, it removes the latter item. At the end, it assigns this {@link Array} to the fsmParses variable.
     *
     * @param fsmParses {@link FsmParse} type{@link Array} input.
     */
    constructor(fsmParses: Array<FsmParse>);
    /**
     * The size method returns the size of fsmParses {@link Array}.
     *
     * @return the size of fsmParses {@link Array}.
     */
    size(): number;
    /**
     * The getFsmParse method takes an integer index as an input and returns the item of fsmParses {@link Array} at
     * given index.
     *
     * @param index Integer input.
     * @return the item of fsmParses {@link Array} at given index.
     */
    getFsmParse(index: number): FsmParse;
    /**
     * The rootWords method gets the first item's root of fsmParses {@link Array} and uses it as currentRoot. Then loops
     * through the fsmParses, if the current item's root does not equal to the currentRoot, it then assigns it as the
     * currentRoot and accumulates root words in a {@link String} result.
     *
     * @return String result that has root words.
     */
    rootWords(): string;
    /**
     * The reduceToParsesWithSameRootAndPos method takes a {@link Word} currentWithPos as an input and loops i times till
     * i equals to the size of the fsmParses {@link Array}. If the given currentWithPos does not equal to the ith item's
     * root and the MorphologicalTag of the first inflectional of fsmParses, it removes the ith item from the {@link Array}.
     *
     * @param currentWithPos {@link Word} input.
     */
    reduceToParsesWithSameRootAndPos(currentWithPos: Word): void;
    /**
     * The getParseWithLongestRootWord method returns the parse with the longest root word. If more than one parse has the
     * longest root word, the first parse with that root is returned. If the longest root word belongs to an
     * exceptional case, the parse with the next longest root word that does not, is returned.
     *
     * @return FsmParse Parse with the longest root word.
     */
    getParseWithLongestRootWord(): FsmParse;
    /**
     * The isLongestRootException method returns true if the longest root word belongs to an exceptional case, false otherwise.
     *
     * @param fsmParse {@link FsmParse} input.
     * @return true if the longest root belongs to an exceptional case, false otherwise.
     */
    isLongestRootException(fsmParse: FsmParse): boolean;
    /**
     * The reduceToParsesWithSameRoot method takes a {@link String} currentWithPos as an input and loops i times till
     * i equals to the size of the fsmParses {@link Array}. If the given currentRoot does not equal to the root of ith
     * item of fsmParses, it removes the ith item from the {@link Array}.
     *
     * @param currentRoot {@link String} input.
     */
    reduceToParsesWithSameRoot(currentRoot: string): void;
    /**
     * The constructParseListForDifferentRootWithPos method initially creates a result {@link Array} then loops through the
     * fsmParses {@link Array}. For the first iteration, it creates new {@link Array} as initial, then adds the
     * first item od fsmParses to initial and also add this initial {@link Array} to the result {@link Array}.
     * For the following iterations, it checks whether the current item's root with the MorphologicalTag of the first inflectional
     * equal to the previous item's  root with the MorphologicalTag of the first inflectional. If so, it adds that item
     * to the result {@link Array}, if not it creates new {@link Array} as initial and adds the first item od fsmParses
     * to initial and also add this initial {@link Array} to the result {@link Array}.
     *
     * @return result {@link Array} type of {@link FsmParseList}.
     */
    constructParseListForDifferentRootWithPos(): Array<FsmParseList>;
    /**
     * The parsesWithoutPrefixAndSuffix method first creates a {@link String} array named analyses with the size of
     * fsmParses {@link Array}'s size.
     * <p>
     * If the size is just 1, it then returns the first item's transitionList, if it is greater than 1, loops through
     * the fsmParses and puts the transitionList of each item to the analyses array.
     * <p>
     * If the removePrefix condition holds, it loops through the analyses array and takes each item's substring after
     * the first + sign and updates that item of analyses array with that substring.
     * <p>
     * If the removeSuffix condition holds, it loops through the analyses array and takes each item's substring till the
     * last + sign and updates that item of analyses array with that substring.
     * <p>
     * It then removes the duplicate items of analyses array and returns a result {@link String} that has the
     * accumulated items of analyses array.
     *
     * @return result {@link String} that has the accumulated items of analyses array.
     */
    parsesWithoutPrefixAndSuffix(): string;
    /**
     * The overridden toString method loops through the fsmParses {@link Array} and accumulates the items to a result
     * {@link String}.
     *
     * @return result {@link String} that has the items of fsmParses {@link Array}.
     */
    toString(): string;
}
