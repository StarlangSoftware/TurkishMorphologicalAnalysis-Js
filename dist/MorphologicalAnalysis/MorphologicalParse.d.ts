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
    /**
     * Returns the pronoun type of the parse for universal dependency feature ProType.
     * @return "Art" if the pronoun is also a determiner; "Prs" if the pronoun is personal pronoun; "Rcp" if the
     * pronoun is 'birbiri'; "Ind" if the pronoun is an indeterminate pronoun; "Neg" if the pronoun is 'hiçbiri';
     * "Int" if the pronoun is a question pronoun; "Dem" if the pronoun is a demonstrative pronoun.
     */
    private getPronType;
    /**
     * Returns the numeral type of the parse for universal dependency feature NumType.
     * @return "Ord" if the parse is Time, Ordinal or the word is '%' or 'kaçıncı'; "Dist" if the word is a
     * distributive number such as 'beşinci'; "Card" if the number is cardinal or any number or the word is 'kaç'.
     */
    private getNumType;
    /**
     * Returns the value for the dependency feature Reflex.
     * @return "Yes" if the root word is 'kendi', null otherwise.
     */
    private getReflex;
    /**
     * Returns the agreement of the parse for the universal dependency feature Number.
     * @return "Sing" if the agreement of the parse is singular (contains A1SG, A2SG, A3SG); "Plur" if the agreement
     * of the parse is plural (contains A1PL, A2PL, A3PL).
     */
    private getNumber;
    /**
     * Returns the possessive agreement of the parse for the universal dependency feature [Pos].
     * @return "Sing" if the possessive agreement of the parse is singular (contains P1SG, P2SG, P3SG); "Plur" if the
     * possessive agreement of the parse is plural (contains P1PL, P2PL, P3PL).
     */
    private getPossessiveNumber;
    /**
     * Returns the case marking of the parse for the universal dependency feature case.
     * @return "Acc" for accusative marker; "Dat" for dative marker; "Gen" for genitive marker; "Loc" for locative
     * marker; "Ins" for instrumentative marker; "Abl" for ablative marker; "Nom" for nominative marker.
     */
    private getCase;
    /**
     * Returns the definiteness of the parse for the universal dependency feature definite. It applies only for
     * determiners in Turkish.
     * @return "Ind" for 'bir', 'bazı', or 'birkaç'. "Def" for 'her', 'bu', 'şu', 'o', 'bütün'.
     */
    private getDefinite;
    /**
     * Returns the degree of the parse for the universal dependency feature degree.
     * @return "Cmp" for comparative adverb 'daha'; "Sup" for superlative adjective or adverb 'en'.
     */
    private getDegree;
    /**
     * Returns the polarity of the verb for the universal dependency feature polarity.
     * @return "Pos" for positive polarity containing tag POS; "Neg" for negative polarity containing tag NEG.
     */
    private getPolarity;
    /**
     * Returns the person of the agreement of the parse for the universal dependency feature person.
     * @return "1" for first person; "2" for second person; "3" for third person.
     */
    private getPerson;
    /**
     * Returns the person of the possessive agreement of the parse for the universal dependency feature [pos].
     * @return "1" for first person; "2" for second person; "3" for third person.
     */
    private getPossessivePerson;
    /**
     * Returns the voice of the verb parse for the universal dependency feature voice.
     * @return "CauPass" if the verb parse is both causative and passive; "Pass" if the verb parse is only passive;
     * "Rcp" if the verb parse is reciprocal; "Cau" if the verb parse is only causative; "Rfl" if the verb parse is
     * reflexive.
     */
    private getVoice;
    /**
     * Returns the aspect of the verb parse for the universal dependency feature aspect.
     * @return "Perf" for past, narrative and future tenses; "Prog" for progressive tenses; "Hab" for Aorist; "Rapid"
     * for parses containing HASTILY tag; "Dur" for parses containing START, STAY or REPEAT tags.
     */
    private getAspect;
    /**
     * Returns the tense of the verb parse for universal dependency feature tense.
     * @return "Past" for simple past tense; "Fut" for future tense; "Pqp" for narrative past tense; "Pres" for other
     * past tenses.
     */
    private getTense;
    /**
     * Returns the modality of the verb parse for the universal dependency feature mood.
     * @return "GenNecPot" if both necessitative and potential is combined with a suffix of general modality;
     * "CndGenPot" if both conditional and potential is combined with a suffix of general modality;
     * "GenNec" if necessitative is combined with a suffix of general modality;
     * "GenPot" if potential is combined with a suffix of general modality;
     * "NecPot" if necessitative is combined with potential;
     * "DesPot" if desiderative is combined with potential;
     * "CndPot" if conditional is combined with potential;
     * "CndGen" if conditional is combined with a suffix of general modality;
     * "Imp" for imperative; "Cnd" for simple conditional; "Des" for simple desiderative; "Opt" for optative; "Nec" for
     * simple necessitative; "Pot" for simple potential; "Gen" for simple suffix of a general modality.
     */
    private getMood;
    /**
     * Returns the form of the verb parse for the universal dependency feature verbForm.
     * @return "Part" for participles; "Vnoun" for infinitives; "Conv" for parses contaning tags SINCEDOINGSO,
     * WITHOUTHAVINGDONESO, WITHOUTBEINGABLETOHAVEDONESO, BYDOINGSO, AFTERDOINGSO, INFINITIVE3; "Fin" for others.
     */
    private getVerbForm;
    /**
     * Construct the universal dependency features as an array of strings. Each element represents a single feature.
     * Every feature is given as featureType = featureValue.
     * @param uPos Universal dependency part of speech tag for the parse.
     * @return An array of universal dependency features for this parse.
     */
    getUniversalDependencyFeatures(uPos: string): Array<string>;
    /**
     * Returns the universal dependency part of speech for this parse.
     * @return "AUX" for word 'değil; "PROPN" for proper nouns; "NOUN for nouns; "ADJ" for adjectives; "ADV" for
     * adverbs; "INTJ" for interjections; "VERB" for verbs; "PUNCT" for punctuation symbols; "DET" for determiners;
     * "NUM" for numerals; "PRON" for pronouns; "ADP" for post participles; "SCONJ" or "CCONJ" for conjunctions.
     */
    getUniversalDependencyPos(): string;
    /**
     * The overridden toString method gets the root and the first inflectional group as a result {@link String} then concatenates
     * with ^DB+ and the following inflectional groups.
     *
     * @return result {@link String}.
     */
    toString(): string;
}
