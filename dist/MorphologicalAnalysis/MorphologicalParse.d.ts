import { InflectionalGroup } from "./InflectionalGroup";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import { MorphologicalTag } from "./MorphologicalTag";
export declare class MorphologicalParse {
    protected inflectionalGroups: Array<InflectionalGroup>;
    protected root: Word;
    /**
     * Another constructor of {@link MorphologicalParse} class which takes a {@link String} parse as an input. First it creates
     * an {@link Array} as iGs for inflectional groups, and while given String contains derivational boundary (^DB+), it
     *.pushs the substring to the iGs {@link Array} and continue to use given String from 4th index. If it does not contain ^DB+,
     * it directly.pushs the given String to the iGs {@link Array}. Then, it creates a new {@link Array} as
     * inflectionalGroups and checks for some cases.
     * <p>
     * If the first item of iGs {@link Array} is ++Punc, it creates a new root as +, and by calling
     * {@link InflectionalGroup} method with Punc it initializes the IG {@link Array} by parsing given input
     * String IG by + and calling the getMorphologicalTag method with these substrings. If getMorphologicalTag method returns
     * a tag, it.pushs this tag to the IG {@link Array} and also to the inflectionalGroups {@link Array}.
     * <p>
     * If the first item of iGs {@link Array} has +, it creates a new word of first item's substring from index 0 to +,
     * and assigns it to root. Then, by calling {@link InflectionalGroup} method with substring from index 0 to +,
     * it initializes the IG {@link Array} by parsing given input String IG by + and calling the getMorphologicalTag
     * method with these substrings. If getMorphologicalTag method returns a tag, it.pushs this tag to the IG {@link Array}
     * and also to the inflectionalGroups {@link Array}.
     * <p>
     * If the first item of iGs {@link Array} does not contain +, it creates a new word with first item and assigns it as root.
     * <p>
     * At the end, it loops through the items of iGs and by calling {@link InflectionalGroup} method with these items
     * it initializes the IG {@link Array} by parsing given input String IG by + and calling the getMorphologicalTag
     * method with these substrings. If getMorphologicalTag method returns a tag, it.pushs this tag to the IG {@link Array}
     * and also to the inflectionalGroups {@link Array}.
     *
     * @param parseOrInflectionalGroups String input.
     */
    constructor(parseOrInflectionalGroups?: any);
    /**
     * The no-arg getWord method returns root {@link Word}.
     *
     * @return root {@link Word}.
     */
    getWord(): Word;
    /**
     * The getTransitionList method gets the first item of inflectionalGroups {@link Array} as a {@link String},
     * then loops through the items of inflectionalGroups and concatenates them by using +.
     *
     * @return String that contains transition list.
     */
    getMorphologicalParseTransitionList(): string;
    /**
     * The getInflectionalGroupString method takes an {@link number} index as an input and if index is 0, it directly
     * returns the root and the first item of inflectionalGroups {@link Array}. If the index is not 0, it then returns
     * the corresponding item of inflectionalGroups {@link Array} as a {@link String}.
     *
     * @param index Integer input.
     * @return corresponding item of inflectionalGroups at given index as a {@link String}.
     */
    getInflectionalGroupString(index: number): string;
    /**
     * The getInflectionalGroup method takes an {@link number} index as an input and it directly returns the
     * {@link InflectionalGroup} at given index.
     *
     * @param index Integer input.
     * @return InflectionalGroup at given index.
     */
    getInflectionalGroup(index?: number): InflectionalGroup;
    /**
     * The getTag method takes an {@link number} index as an input and and if the given index is 0, it directly return
     * the root. Then, it loops through the inflectionalGroups {@link Array} it returns the MorphologicalTag of the
     * corresponding inflectional group.
     *
     * @param index Integer input.
     * @return the MorphologicalTag of the corresponding inflectional group, or null of invalid index inputs.
     */
    getTag(index: number): string;
    /**
     * The tagSize method loops through the inflectionalGroups {@link Array} and accumulates the sizes of each inflectional group
     * in the inflectionalGroups.
     *
     * @return total size of the inflectionalGroups {@link Array}.
     */
    tagSize(): number;
    /**
     * The size method returns the size of the inflectionalGroups {@link Array}.
     *
     * @return the size of the inflectionalGroups {@link Array}.
     */
    size(): number;
    /**
     * The firstInflectionalGroup method returns the first inflectional group of inflectionalGroups {@link Array}.
     *
     * @return the first inflectional group of inflectionalGroups {@link Array}.
     */
    firstInflectionalGroup(): InflectionalGroup;
    /**
     * The lastInflectionalGroup method returns the last inflectional group of inflectionalGroups {@link Array}.
     *
     * @return the last inflectional group of inflectionalGroups {@link Array}.
     */
    lastInflectionalGroup(): InflectionalGroup;
    /**
     * The getWordWithPos method returns root with the MorphologicalTag of the first inflectional as a new word.
     *
     * @return root with the MorphologicalTag of the first inflectional as a new word.
     */
    getWordWithPos(): Word;
    /**
     * The getPos method returns the MorphologicalTag of the last inflectional group.
     *
     * @return the MorphologicalTag of the last inflectional group.
     */
    getPos(): string;
    /**
     * The getRootPos method returns the MorphologicalTag of the first inflectional group.
     *
     * @return the MorphologicalTag of the first inflectional group.
     */
    getRootPos(): string;
    /**
     * The lastIGContainsCase method returns the MorphologicalTag of last inflectional group if it is one of the NOMINATIVE,
     * ACCUSATIVE, DATIVE, LOCATIVE or ABLATIVE cases, null otherwise.
     *
     * @return the MorphologicalTag of last inflectional group if it is one of the NOMINATIVE,
     * ACCUSATIVE, DATIVE, LOCATIVE or ABLATIVE cases, null otherwise.
     */
    lastIGContainsCase(): string;
    /**
     * The lastIGContainsTag method takes a MorphologicalTag as an input and returns true if the last inflectional group's
     * MorphologicalTag matches with one of the tags in the IG {@link Array}, false otherwise.
     *
     * @param tag {@link MorphologicalTag} type input.
     * @return true if the last inflectional group's MorphologicalTag matches with one of the tags in the
     * IG {@link Array}, false otherwise.
     */
    lastIGContainsTag(tag: MorphologicalTag): boolean;
    /**
     * lastIGContainsPossessive method returns true if the last inflectional group contains one of the
     * possessives: P1PL, P1SG, P2PL, P2SG, P3PL AND P3SG, false otherwise.
     *
     * @return true if the last inflectional group contains one of the possessives: P1PL, P1SG, P2PL, P2SG, P3PL AND P3SG, false otherwise.
     */
    lastIGContainsPossessive(): boolean;
    /**
     * The isCapitalWord method returns true if the character at first index o f root is an uppercase letter, false otherwise.
     *
     * @return true if the character at first index o f root is an uppercase letter, false otherwise.
     */
    isCapitalWord(): boolean;
    /**
     * The isNoun method returns true if the part of speech is NOUN, false otherwise.
     *
     * @return true if the part of speech is NOUN, false otherwise.
     */
    isNoun(): boolean;
    /**
     * The isVerb method returns true if the part of speech is VERB, false otherwise.
     *
     * @return true if the part of speech is VERB, false otherwise.
     */
    isVerb(): boolean;
    /**
     * The isRootVerb method returns true if the part of speech of root is BERV, false otherwise.
     *
     * @return true if the part of speech of root is VERB, false otherwise.
     */
    isRootVerb(): boolean;
    /**
     * The isAdjective method returns true if the part of speech is ADJ, false otherwise.
     *
     * @return true if the part of speech is ADJ, false otherwise.
     */
    isAdjective(): boolean;
    /**
     * The isProperNoun method returns true if the first inflectional group's MorphologicalTag is a PROPERNOUN, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a PROPERNOUN, false otherwise.
     */
    isProperNoun(): boolean;
    /**
     * The isPunctuation method returns true if the first inflectional group's MorphologicalTag is a PUNCTUATION, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a PUNCTUATION, false otherwise.
     */
    isPunctuation(): boolean;
    /**
     * The isCardinal method returns true if the first inflectional group's MorphologicalTag is a CARDINAL, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a CARDINAL, false otherwise.
     */
    isCardinal(): boolean;
    /**
     * The isOrdinal method returns true if the first inflectional group's MorphologicalTag is a ORDINAL, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a ORDINAL, false otherwise.
     */
    isOrdinal(): boolean;
    /**
     * The isReal method returns true if the first inflectional group's MorphologicalTag is a REAL, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a REAL, false otherwise.
     */
    isReal(): boolean;
    /**
     * The isNumber method returns true if the first inflectional group's MorphologicalTag is REAL or CARDINAL, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a REAL or CARDINAL, false otherwise.
     */
    isNumber(): boolean;
    /**
     * The isTime method returns true if the first inflectional group's MorphologicalTag is a TIME, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a TIME, false otherwise.
     */
    isTime(): boolean;
    /**
     * The isDate method returns true if the first inflectional group's MorphologicalTag is a DATE, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a DATE, false otherwise.
     */
    isDate(): boolean;
    /**
     * The isHashTag method returns true if the first inflectional group's MorphologicalTag is a HASHTAG, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a HASHTAG, false otherwise.
     */
    isHashTag(): boolean;
    /**
     * The isEmail method returns true if the first inflectional group's MorphologicalTag is a EMAIL, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a EMAIL, false otherwise.
     */
    isEmail(): boolean;
    /**
     * The isPercent method returns true if the first inflectional group's MorphologicalTag is a PERCENT, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a PERCENT, false otherwise.
     */
    isPercent(): boolean;
    /**
     * The isFraction method returns true if the first inflectional group's MorphologicalTag is a FRACTION, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a FRACTION, false otherwise.
     */
    isFraction(): boolean;
    /**
     * The isRange method returns true if the first inflectional group's MorphologicalTag is a RANGE, false otherwise.
     *
     * @return true if the first inflectional group's MorphologicalTag is a RANGE, false otherwise.
     */
    isRange(): boolean;
    /**
     * The isPlural method returns true if {@link InflectionalGroup}'s MorphologicalTags are from the agreement plural
     * or possessive plural, i.e A1PL, A2PL, A3PL, P1PL, P2PL or P3PL, and false otherwise.
     *
     * @return true if {@link InflectionalGroup}'s MorphologicalTags are from the agreement plural or possessive plural.
     */
    isPlural(): boolean;
    /**
     * The isAuxiliary method returns true if the root equals to the et, ol, or yap, and false otherwise.
     *
     * @return true if the root equals to the et, ol, or yap, and false otherwise.
     */
    isAuxiliary(): boolean;
    /**
     * The containsTag method takes a MorphologicalTag as an input and loops through the inflectionalGroups {@link ArrayList},
     * returns true if the input matches with on of the tags in the IG, false otherwise.
     *
     * @param tag checked tag
     * @return true if the input matches with on of the tags in the IG, false otherwise.
     */
    containsTag(tag: MorphologicalTag): boolean;
    /**
     * The getTreePos method returns the tree pos tag of a morphological analysis.
     *
     * @return Tree pos tag of the morphological analysis in string form.
     */
    getTreePos(): string;
    private getPronType;
    private getNumType;
    private getReflex;
    private getNumber;
    private getPossessiveNumber;
    private getCase;
    private getDefinite;
    private getDegree;
    private getPolarity;
    private getPerson;
    private getPossessivePerson;
    private getVoice;
    private getAspect;
    private getTense;
    private getMood;
    private getVerbForm;
    getUniversalDependencyFeatures(uPos: string): Array<string>;
    getUniversalDependencyPos(): string;
    /**
     * The overridden toString method gets the root and the first inflectional group as a result {@link String} then concatenates
     * with ^DB+ and the following inflectional groups.
     *
     * @return result {@link String}.
     */
    toString(): string;
}
