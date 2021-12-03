import {FsmParse} from "./FsmParse";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";

export class FsmParseList {

    private readonly fsmParses: Array<FsmParse> = new Array<FsmParse>()

    /**
     * A constructor of {@link FsmParseList} class which takes an {@link Array} fsmParses as an input. First it sorts
     * the items of the {@link Array} then loops through it, if the current item's transitions equal to the next item's
     * transitions, it removes the latter item. At the end, it assigns this {@link Array} to the fsmParses variable.
     *
     * @param fsmParses {@link FsmParse} type{@link Array} input.
     */
    constructor(fsmParses: Array<FsmParse>) {
        fsmParses.sort((fsmParse1: FsmParse, fsmParse2: FsmParse) =>
            fsmParse1.getFsmParseTransitionList().localeCompare(fsmParse2.getFsmParseTransitionList()))
        for (let i = 0; i < fsmParses.length - 1; i++) {
            if (fsmParses[i].getFsmParseTransitionList() == fsmParses[i + 1].getFsmParseTransitionList()) {
                fsmParses.splice(i + 1, 1);
                i--;
            }
        }
        this.fsmParses = fsmParses;
    }

    /**
     * The size method returns the size of fsmParses {@link Array}.
     *
     * @return the size of fsmParses {@link Array}.
     */
    size(): number{
        return this.fsmParses.length
    }

    /**
     * The getFsmParse method takes an integer index as an input and returns the item of fsmParses {@link Array} at
     * given index.
     *
     * @param index Integer input.
     * @return the item of fsmParses {@link Array} at given index.
     */
    getFsmParse(index: number): FsmParse{
        return this.fsmParses[index]
    }

    /**
     * The rootWords method gets the first item's root of fsmParses {@link Array} and uses it as currentRoot. Then loops
     * through the fsmParses, if the current item's root does not equal to the currentRoot, it then assigns it as the
     * currentRoot and accumulates root words in a {@link String} result.
     *
     * @return String result that has root words.
     */
    rootWords(): string{
        let result = this.fsmParses[0].getWord().getName(), currentRoot = result;
        for (let i = 1; i < this.fsmParses.length; i++) {
            if (this.fsmParses[i].getWord().getName() != currentRoot) {
                currentRoot = this.fsmParses[i].getWord().getName();
                result = result + "$" + currentRoot;
            }
        }
        return result;
    }

    /**
     * The reduceToParsesWithSameRootAndPos method takes a {@link Word} currentWithPos as an input and loops i times till
     * i equals to the size of the fsmParses {@link Array}. If the given currentWithPos does not equal to the ith item's
     * root and the MorphologicalTag of the first inflectional of fsmParses, it removes the ith item from the {@link Array}.
     *
     * @param currentWithPos {@link Word} input.
     */
    reduceToParsesWithSameRootAndPos(currentWithPos: Word){
        let i = 0;
        while (i < this.fsmParses.length) {
            if (this.fsmParses[i].getWordWithPos().getName() != currentWithPos.getName()) {
                this.fsmParses.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    /**
     * The getParseWithLongestRootWord method returns the parse with the longest root word. If more than one parse has the
     * longest root word, the first parse with that root is returned.
     *
     * @return FsmParse Parse with the longest root word.
     */
    getParseWithLongestRootWord(): FsmParse{
        let maxLength = -1;
        let bestParse = undefined;
        for (let currentParse of this.fsmParses) {
            if (currentParse.getWord().getName().length > maxLength) {
                maxLength = currentParse.getWord().getName().length;
                bestParse = currentParse;
            }
        }
        return bestParse;
    }

    /**
     * The reduceToParsesWithSameRoot method takes a {@link String} currentWithPos as an input and loops i times till
     * i equals to the size of the fsmParses {@link Array}. If the given currentRoot does not equal to the root of ith
     * item of fsmParses, it removes the ith item from the {@link Array}.
     *
     * @param currentRoot {@link String} input.
     */
    reduceToParsesWithSameRoot(currentRoot: string){
        let i = 0;
        while (i < this.fsmParses.length) {
            if (this.fsmParses[i].getWord().getName() != currentRoot) {
                this.fsmParses.splice(i, 1);
            } else {
                i++;
            }
        }
    }

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
    constructParseListForDifferentRootWithPos(): Array<FsmParseList>{
        let result = new Array<FsmParseList>();
        let i = 0;
        while (i < this.fsmParses.length) {
            if (i == 0) {
                let initial = new Array<FsmParse>();
                initial.push(this.fsmParses[i]);
                result.push(new FsmParseList(initial));
            } else {
                if (this.fsmParses[i].getWordWithPos().getName() == this.fsmParses[i - 1].getWordWithPos().getName()) {
                    result[result.length - 1].fsmParses.push(this.fsmParses[i]);
                } else {
                    let initial = new Array<FsmParse>();
                    initial.push(this.fsmParses[i]);
                    result.push(new FsmParseList(initial));
                }
            }
            i++;
        }
        return result;
    }

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
    parsesWithoutPrefixAndSuffix(): string{
        let analyses = new Array<string>();
        let removePrefix = true, removeSuffix = true;
        if (this.fsmParses.length == 1) {
            return this.fsmParses[0].getFsmParseTransitionList().substring(this.fsmParses[0].getFsmParseTransitionList().indexOf("+") + 1);
        }
        for (let i = 0; i < this.fsmParses.length; i++) {
            analyses.push(this.fsmParses[i].getFsmParseTransitionList());
        }
        while (removePrefix) {
            removePrefix = true;
            for (let i = 0; i < this.fsmParses.length - 1; i++) {
                if (!analyses[i].includes("+") || !analyses[i + 1].includes("+") ||
                    analyses[i].substring(0, analyses[i].indexOf("+") + 1) != analyses[i + 1].substring(0, analyses[i + 1].indexOf("+") + 1)) {
                    removePrefix = false;
                    break;
                }
            }
            if (removePrefix) {
                for (let i = 0; i < this.fsmParses.length; i++) {
                    analyses[i] = analyses[i].substring(analyses[i].indexOf("+") + 1);
                }
            }
        }
        while (removeSuffix) {
            removeSuffix = true;
            for (let i = 0; i < this.fsmParses.length - 1; i++) {
                if (!analyses[i].includes("+") || !analyses[i + 1].includes("+") ||
                    analyses[i].substring(analyses[i].lastIndexOf("+")) != analyses[i + 1].substring(analyses[i + 1].lastIndexOf("+"))) {
                    removeSuffix = false;
                    break;
                }
            }
            if (removeSuffix) {
                for (let i = 0; i < this.fsmParses.length; i++) {
                    analyses[i] = analyses[i].substring(0, analyses[i].lastIndexOf("+"));
                }
            }
        }
        for (let i = 0; i < analyses.length; i++) {
            for (let j = i + 1; j < analyses.length; j++) {
                if (analyses[i] > analyses[j]) {
                    let tmp = analyses[i];
                    analyses[i] = analyses[j];
                    analyses[j] = tmp;
                }
            }
        }
        let result = analyses[0];
        for (let i = 1; i < analyses.length; i++) {
            result = result + "$" + analyses[i];
        }
        return result;
    }

    /**
     * The overridden toString method loops through the fsmParses {@link Array} and accumulates the items to a result
     * {@link String}.
     *
     * @return result {@link String} that has the items of fsmParses {@link Array}.
     */
    toString(): string{
        let result = "";
        for (let i = 0; i < this.fsmParses.length; i++) {
            result += this.fsmParses[i] + "\n";
        }
        return result;
    }
}