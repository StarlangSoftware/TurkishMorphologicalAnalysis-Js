import { FiniteStateMachine } from "./FiniteStateMachine";
import { TxtDictionary } from "nlptoolkit-dictionary/dist/Dictionary/TxtDictionary";
import { FsmParseList } from "./FsmParseList";
import { MorphologicalParse } from "./MorphologicalParse";
import { MetamorphicParse } from "./MetamorphicParse";
import { TxtWord } from "nlptoolkit-dictionary/dist/Dictionary/TxtWord";
import { FsmParse } from "./FsmParse";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
export declare class FsmMorphologicalAnalyzer {
    private dictionaryTrie;
    private suffixTrie;
    private parsedSurfaceForms;
    private pronunciations;
    private readonly finiteStateMachine;
    private static MAX_DISTANCE;
    private readonly dictionary;
    private readonly cache;
    private mostUsedPatterns;
    /**
     * Another constructor of FsmMorphologicalAnalyzer class. It generates a new TxtDictionary type dictionary from
     * given input dictionary, with given inputs fileName and cacheSize.
     *
     * @param fileName   the file to read the finite state machine.
     * @param dictionaryFileNameOrDictionary the dictionary file that will be used to generate dictionaryTrie.
     * @param cacheSize  the size of the LRUCache.
     */
    constructor(fileName?: string, dictionaryFileNameOrDictionary?: any, cacheSize?: number);
    /**
     * Constructs and returns the reverse string of a given string.
     * @param s String to be reversed.
     * @return Reverse of a given string.
     */
    private reverseString;
    /**
     * Constructs the suffix trie from the input file suffixes.txt. suffixes.txt contains the most frequent 6000
     * suffixes that a verb or a noun can take. The suffix trie is a trie that stores these suffixes in reverse form,
     * which can be then used to match a given word for its possible suffix content.
     */
    private prepareSuffixTrie;
    /**
     * Reads the file for correct surface forms and their most frequent root forms, in other words, the surface forms
     * which have at least one morphological analysis in  Turkish.
     * @param fileName Input file containing analyzable surface forms and their root forms.
     */
    addParsedSurfaceForms(fileName: string): void;
    /**
     * Reads the file for foreign words and their pronunciations.
     * @param fileName Input file containing foreign words and their pronunciations.
     */
    addPronunciations(fileName: string): void;
    /**
     * The getPossibleWords method takes {@link MorphologicalParse} and {@link MetamorphicParse} as input.
     * First it determines whether the given morphologicalParse is the root verb and whether it contains a verb tag.
     * Then it creates new transition with -mak and creates a new {@link Set} result.
     * <p>
     * It takes the given {@link MetamorphicParse} input as currentWord and if there is a compound word starting with the
     * currentWord, it gets this compoundWord from dictionaryTrie. If there is a compoundWord and the difference of the
     * currentWord and compundWords is less than 3 than compoundWord is added to the result, otherwise currentWord is added.
     * <p>
     * Then it gets the root from parse input as a currentRoot. If it is not null, and morphologicalParse input is verb,
     * it directly adds the verb to result after making transition to currentRoot with currentWord String. Else, it creates a new
     * transition with -lar and make this transition then adds to the result.
     *
     * @param morphologicalParse {@link MorphologicalParse} type input.
     * @param metamorphicParse              {@link MetamorphicParse} type input.
     * @return {@link HashSet} result.
     */
    getPossibleWords(morphologicalParse: MorphologicalParse, metamorphicParse?: MetamorphicParse): Set<string>;
    /**
     * The getDictionary method is used to get TxtDictionary.
     *
     * @return TxtDictionary type dictionary.
     */
    getDictionary(): TxtDictionary;
    /**
     * The getFiniteStateMachine method is used to get FiniteStateMachine.
     *
     * @return FiniteStateMachine type finiteStateMachine.
     */
    getFiniteStateMachine(): FiniteStateMachine;
    /**
     * The isPossibleSubstring method first checks whether given short and long strings are equal to root word.
     * Then, compares both short and long strings' chars till the last two chars of short string. In the presence of mismatch,
     * false is returned. On the other hand, it counts the distance between two strings until it becomes greater than 2,
     * which is the MAX_DISTANCE also finds the index of the last char.
     * <p>
     * If the substring is a rootWord and equals to 'ben', which is a special case or root holds the lastIdropsDuringSuffixation or
     * lastIdropsDuringPassiveSuffixation conditions, then it returns true if distance is not greater than MAX_DISTANCE.
     * <p>
     * On the other hand, if the shortStrong ends with one of these chars 'e, a, p, ç, t, k' and 't 's a rootWord with
     * the conditions of rootSoftenDuringSuffixation, vowelEChangesToIDuringYSuffixation, vowelAChangesToIDuringYSuffixation
     * or endingKChangesIntoG then it returns true if the last index is not equal to 2 and distance is not greater than
     * MAX_DISTANCE and false otherwise.
     *
     * @param shortString the possible substring.
     * @param longString  the long string to compare with substring.
     * @param root        the root of the long string.
     * @return true if given substring is the actual substring of the longString, false otherwise.
     */
    private isPossibleSubstring;
    /**
     * The initializeParseList method initializes the given given fsm ArrayList with given root words by parsing them.
     * <p>
     * It checks many conditions;
     * isPlural; if root holds the condition then it gets the state with the name of NominalRootPlural, then
     * creates a new parsing and adds this to the input fsmParse Arraylist.
     * Ex : Açıktohumlular
     * <p>
     * !isPlural and isPortmanteauEndingWithSI, if root holds the conditions then it gets the state with the
     * name of NominalRootNoPossesive.
     * Ex : Balarısı
     * <p>
     * !isPlural and isPortmanteau, if root holds the conditions then it gets the state with the name of
     * CompoundNounRoot.
     * Ex : Aslanağızı
     * <p>
     * !isPlural, !isPortmanteau and isHeader, if root holds the conditions then it gets the state with the
     * name of HeaderRoot.
     * Ex :  </title>
     * <p>
     * !isPlural, !isPortmanteau and isInterjection, if root holds the conditions then it gets the state
     * with the name of InterjectionRoot.
     * Ex : Hey, Aa
     * <p>
     * !isPlural, !isPortmanteau and isDuplicate, if root holds the conditions then it gets the state
     * with the name of DuplicateRoot.
     * Ex : Allak,
     * !isPlural, !isPortmanteau and isCode, if root holds the conditions then it gets the state
     * with the name of CodeRoot.
     * Ex : 9400f,
     * <p>
     * !isPlural, !isPortmanteau and isMetric, if root holds the conditions then it gets the state
     * with the name of MetricRoot.
     * Ex : 11x8x12,
     * <p>
     * !isPlural, !isPortmanteau and isNumeral, if root holds the conditions then it gets the state
     * with the name of CardinalRoot.
     * Ex : Yüz, bin
     * <p>
     * !isPlural, !isPortmanteau and isReal, if root holds the conditions then it gets the state
     * with the name of RealRoot.
     * Ex : 1.2
     * <p>
     * !isPlural, !isPortmanteau and isFraction, if root holds the conditions then it gets the state
     * with the name of FractionRoot.
     * Ex : 1/2
     * <p>
     * !isPlural, !isPortmanteau and isDate, if root holds the conditions then it gets the state
     * with the name of DateRoot.
     * Ex : 11/06/2018
     * <p>
     * !isPlural, !isPortmanteau and isPercent, if root holds the conditions then it gets the state
     * with the name of PercentRoot.
     * Ex : %12.5
     * <p>
     * !isPlural, !isPortmanteau and isRange, if root holds the conditions then it gets the state
     * with the name of RangeRoot.
     * Ex : 3-5
     * <p>
     * !isPlural, !isPortmanteau and isTime, if root holds the conditions then it gets the state
     * with the name of TimeRoot.
     * Ex : 13:16:08
     * <p>
     * !isPlural, !isPortmanteau and isOrdinal, if root holds the conditions then it gets the state
     * with the name of OrdinalRoot.
     * Ex : Altıncı
     * <p>
     * !isPlural, !isPortmanteau, and isVerb if root holds the conditions then it gets the state
     * with the name of VerbalRoot. Or isPassive, then it gets the state with the name of PassiveHn.
     * Ex : Anla (!isPAssive)
     * Ex : Çağrıl (isPassive)
     * <p>
     * !isPlural, !isPortmanteau and isPronoun, if root holds the conditions then it gets the state
     * with the name of PronounRoot. There are 6 different Pronoun state names, REFLEX, QUANT, QUANTPLURAL, DEMONS, PERS, QUES.
     * REFLEX = Reflexive Pronouns Ex : kendi
     * QUANT = Quantitative Pronouns Ex : öbür, hep, kimse, hiçbiri, bazı, kimi, biri
     * QUANTPLURAL = Quantitative Plural Pronouns Ex : tümü, çoğu, hepsi
     * DEMONS = Demonstrative Pronouns Ex : o, bu, şu
     * PERS = Personal Pronouns Ex : ben, sen, o, biz, siz, onlar
     * QUES = Interrogatıve Pronouns Ex : nere, ne, kim, hangi
     * <p>
     * !isPlural, !isPortmanteau and isAdjective, if root holds the conditions then it gets the state
     * with the name of AdjectiveRoot.
     * Ex : Absürt, Abes
     * <p>
     * !isPlural, !isPortmanteau and isPureAdjective, if root holds the conditions then it gets the state
     * with the name of Adjective.
     * Ex : Geçmiş, Cam
     * <p>
     * !isPlural, !isPortmanteau and isNominal, if root holds the conditions then it gets the state
     * with the name of NominalRoot.
     * Ex : Görüş
     * <p>
     * !isPlural, !isPortmanteau and isProper, if root holds the conditions then it gets the state
     * with the name of ProperRoot.
     * Ex : Abdi
     * <p>
     * !isPlural, !isPortmanteau and isQuestion, if root holds the conditions then it gets the state
     * with the name of QuestionRoot.
     * Ex : Mi, mü
     * <p>
     * !isPlural, !isPortmanteau and isDeterminer, if root holds the conditions then it gets the state
     * with the name of DeterminerRoot.
     * Ex : Çok, bir
     * <p>
     * !isPlural, !isPortmanteau and isConjunction, if root holds the conditions then it gets the state
     * with the name of ConjunctionRoot.
     * Ex : Ama , ancak
     * <p>
     * !isPlural, !isPortmanteau and isPostP, if root holds the conditions then it gets the state
     * with the name of PostP.
     * Ex : Ait, dair
     * <p>
     * !isPlural, !isPortmanteau and isAdverb, if root holds the conditions then it gets the state
     * with the name of AdverbRoot.
     * Ex : Acilen
     *
     * @param fsmParse ArrayList to initialize.
     * @param root     word to check properties and add to fsmParse according to them.
     * @param isProper is used to check a word is proper or not.
     */
    private initializeParseList;
    /**
     * The initializeParseListFromRoot method is used to create an {@link Array} which consists of initial fsm parsings.
     * First, traverses this HashSet and uses each word as a root and calls initializeParseList method with this root
     * and Array.
     * <p>
     *
     * @param parseList ArrayList to initialize.
     * @param root the root form to generate initial parse list.
     * @param isProper    is used to check a word is proper or not.
     */
    private initializeParseListFromRoot;
    /**
     * The initializeParseListFromSurfaceForm method is used to create an {@link Array} which consists of initial fsm parsings. First,
     * it calls getWordsWithPrefix methods by using input String surfaceForm and generates a {@link Set}. Then, traverses
     * this HashSet and uses each word as a root and calls initializeParseListFromRoot method with this root and ArrayList.
     * <p>
     *
     * @param surfaceForm the String used to generate a HashSet of words.
     * @param isProper    is used to check a word is proper or not.
     * @return initialFsmParse ArrayList.
     */
    private initializeParseListFromSurfaceForm;
    /**
     * The addNewParsesFromCurrentParse method initially gets the final suffixes from input currentFsmParse called as currentState,
     * and by using the currentState information it gets the new analysis. Then loops through each currentState's transition.
     * If the currentTransition is possible, it makes the transition.
     *
     * @param currentFsmParse FsmParse type input.
     * @param fsmParse        an ArrayList of FsmParse.
     * @param maxLength     Maximum length of the parse.
     * @param root            TxtWord used to make transition.
     */
    private addNewParsesFromCurrentParseLength;
    /**
     * The addNewParsesFromCurrentParse method initially gets the final suffixes from input currentFsmParse called as currentState,
     * and by using the currentState information it gets the currentSurfaceForm. Then loops through each currentState's transition.
     * If the currentTransition is possible, it makes the transition
     *
     * @param currentFsmParse FsmParse type input.
     * @param fsmParse        an ArrayList of FsmParse.
     * @param surfaceForm     String to use during transition.
     * @param root            TxtWord used to make transition.
     */
    private addNewParsesFromCurrentParseSurfaceForm;
    /**
     * The parseExists method is used to check the existence of the parse.
     *
     * @param fsmParse    an ArrayList of FsmParse
     * @param surfaceForm String to use during transition.
     * @return true when the currentState is end state and input surfaceForm id equal to currentSurfaceForm, otherwise false.
     */
    private parseExists;
    /**
     * The parseWord method is used to parse a given fsmParse. It simply adds new parses to the current parse by
     * using addNewParsesFromCurrentParse method.
     *
     * @param fsmParse    an ArrayList of FsmParse
     * @param maxLength maximum length of the surfaceform.
     * @return result {@link Array} which has the currentFsmParse.
     */
    private parseWordLength;
    /**
     * The parseWord method is used to parse a given fsmParse. It simply adds new parses to the current parse by
     * using addNewParsesFromCurrentParse method.
     *
     * @param fsmParse    an ArrayList of FsmParse
     * @param surfaceForm String to use during transition.
     * @return result {@link Array} which has the currentFsmParse.
     */
    private parseWordSurfaceForm;
    /**
     * The morphologicalAnalysis with 3 inputs is used to initialize an {@link Array} and add a new FsmParse
     * with given root and state.
     *
     * @param root        TxtWord input.
     * @param surfaceForm String input to use for parsing.
     * @param state       String input.
     * @return parseWord method with newly populated FsmParse ArrayList and input surfaceForm.
     */
    morphologicalAnalysisFromRoot(root: TxtWord, surfaceForm: string, state?: string): Array<FsmParse>;
    distinctSurfaceFormList(parseList: Array<FsmParse>): Set<string>;
    /**
     * The generateAllParses with 2 inputs is used to generate all parses with given root. Then it calls initializeParseListFromRoot method to initialize list with newly created ArrayList, input root,
     * and maximum length.
     *
     * @param root        TxtWord input.
     * @param maxLength Maximum length of the surface form.
     * @return parseWord method with newly populated FsmParse ArrayList and maximum length.
     */
    generateAllParses(root: TxtWord, maxLength: number): Array<FsmParse>;
    /**
     * Replaces previous lemma in the sentence with the new lemma. Both lemma can contain multiple words.
     * @param original Original sentence to be replaced with.
     * @param previousWord Root word in the original sentence
     * @param newWord New word to be replaced.
     * @return Newly generated sentence by replacing the previous word in the original sentence with the new word.
     */
    replaceWord(original: Sentence, previousWord: string, newWord: string): Sentence;
    /**
     * The analysisExists method checks several cases. If the given surfaceForm is a punctuation or double then it
     * returns true. If it is not a root word, then it initializes the parse list and returns the parseExists method with
     * this newly initialized list and surfaceForm.
     *
     * @param rootWord    TxtWord root.
     * @param surfaceForm String input.
     * @param isProper    boolean variable indicates a word is proper or not.
     * @return true if surfaceForm is punctuation or double, otherwise returns parseExist method with given surfaceForm.
     */
    private analysisExists;
    /**
     * The analysis method is used by the morphologicalAnalysis method. It gets String surfaceForm as an input and checks
     * its type such as punctuation, number or compares with the regex for date, fraction, percent, time, range, hashtag,
     * and mail or checks its variable type as integer or double. After finding the right case for given surfaceForm, it calls
     * constructInflectionalGroups method which creates sub-word units.
     *
     * @param surfaceForm String to analyse.
     * @param isProper    is used to indicate the proper words.
     * @return ArrayList type initialFsmParse which holds the analyses.
     */
    analysis(surfaceForm: string, isProper: boolean): Array<FsmParse>;
    /**
     * This method uses cache idea to speed up pattern matching in Fsm. mostUsedPatterns stores the compiled forms of
     * the previously used patterns. When Fsm tries to match a string to a pattern, first we check if it exists in
     * mostUsedPatterns. If it exists, we directly use the compiled pattern to match the string. Otherwise, new pattern
     * is compiled and put in the mostUsedPatterns.
     * @param expr Pattern to check
     * @param value String to match the pattern
     * @return True if the string matches the pattern, false otherwise.
     */
    private patternMatches;
    /**
     * The isProperNoun method takes surfaceForm String as input and checks its each char whether they are in the range
     * of letters between A to Z or one of the Turkish letters such as İ, Ü, Ğ, Ş, Ç, and Ö.
     *
     * @param surfaceForm String to check for proper noun.
     * @return false if surfaceForm is null or length of 0, return true if it is a letter.
     */
    isProperNoun(surfaceForm: string): boolean;
    /**
     * The isCode method takes surfaceForm String as input and checks if it consists of both letters and numbers
     *
     * @param surfaceForm String to check for code-like word.
     * @return true if it is a code-like word, return false otherwise.
     */
    isCode(surfaceForm: string): boolean;
    /**
     * Identifies a possible new root word for a given surface form. It also adds the new root form to the dictionary
     * for further usage. The method first searches the suffix trie for the reverse string of the surface form. This
     * way, it can identify if the word has a suffix that is in the most frequently used suffix list. Since a word can
     * have multiple possible suffixes, the method identifies the longest suffix and returns the substring of the
     * surface form tht does not contain the suffix. Let say the word is 'googlelaştırdık', it will identify 'tık' as
     * a suffix and will return 'googlelaştır' as a possible root form. Another example will be 'homelesslerimizle', it
     * will identify 'lerimizle' as suffix and will return 'homeless' as a possible root form. If the root word ends
     * with 'ğ', it is replacesd with 'k'. 'morfolojikliğini' will return 'morfolojikliğ' then which will be replaced
     * with 'morfolojiklik'.
     * @param surfaceForm Surface form for which we will identify a possible new root form.
     * @return Possible new root form.
     */
    private rootOfPossiblyNewWord;
    /**
     * The robustMorphologicalAnalysis is used to analyse surfaceForm String. First it gets the currentParse of the surfaceForm
     * then, if the size of the currentParse is 0, and given surfaceForm is a proper noun, it adds the surfaceForm
     * whose state name is ProperRoot to an {@link Array}, of it is not a proper noon, it adds the surfaceForm
     * whose state name is NominalRoot to the {@link Array}.
     *
     * @param surfaceForm String to analyse.
     * @return FsmParseList type currentParse which holds morphological analysis of the surfaceForm.
     */
    robustMorphologicalAnalysis(surfaceForm: string): FsmParseList;
    /**
     * The morphologicalAnalysis is used for debug purposes.
     *
     * @param sentence  to get word from.
     * @return FsmParseList type result.
     */
    morphologicalAnalysisFromSentence(sentence: Sentence): Array<FsmParseList>;
    /**
     * The robustMorphologicalAnalysis method takes just one argument as an input. It gets the name of the words from
     * input sentence then calls robustMorphologicalAnalysis with surfaceForm.
     *
     * @param sentence Sentence type input used to get surfaceForm.
     * @return FsmParseList array which holds the result of the analysis.
     */
    robustMorphologicalAnalysisFromSentence(sentence: Sentence): Array<FsmParseList>;
    /**
     * The isInteger method compares input surfaceForm with regex \+?\d+ and returns the result.
     * Supports positive integer checks only.
     *
     * @param surfaceForm String to check.
     * @return true if surfaceForm matches with the regex.
     */
    private isInteger;
    /**
     * The isDouble method compares input surfaceForm with regex \+?(\d+)?\.\d* and returns the result.
     *
     * @param surfaceForm String to check.
     * @return true if surfaceForm matches with the regex.
     */
    private isDouble;
    /**
     * The isNumber method compares input surfaceForm with the array of written numbers and returns the result.
     *
     * @param surfaceForm String to check.
     * @return true if surfaceForm matches with the regex.
     */
    private isNumber;
    /**
     * Checks if a given surface form matches to a percent value. It should be something like %4, %45, %4.3 or %56.786
     * @param surfaceForm Surface form to be checked.
     * @return True if the surface form is in percent form
     */
    private isPercent;
    /**
     * Checks if a given surface form matches to a time form. It should be something like 3:34, 12:56 etc.
     * @param surfaceForm Surface form to be checked.
     * @return True if the surface form is in time form
     */
    private isTime;
    /**
     * Checks if a given surface form matches to a range form. It should be something like 123-1400 or 12:34-15:78 or
     * 3.45-4.67.
     * @param surfaceForm Surface form to be checked.
     * @return True if the surface form is in range form
     */
    private isRange;
    /**
     * Checks if a given surface form matches to a date form. It should be something like 3/10/2023 or 2.3.2012
     * @param surfaceForm Surface form to be checked.
     * @return True if the surface form is in date form
     */
    private isDate;
    /**
     * The morphologicalAnalysis method is used to analyse a FsmParseList by comparing with the regex.
     * It creates an {@link Array} fsmParse to hold the result of the analysis method. For each surfaceForm input,
     * it gets a substring and considers it as a possibleRoot. Then compares with the regex.
     * <p>
     * If the surfaceForm input string matches with Turkish chars like Ç, Ş, İ, Ü, Ö, it adds the surfaceForm to Trie with IS_OA tag.
     * If the possibleRoot contains /, then it is added to the Trie with IS_KESIR tag.
     * If the possibleRoot contains \d\d|\d)/(\d\d|\d)/\d+, then it is added to the Trie with IS_DATE tag.
     * If the possibleRoot contains \\d\d|\d, then it is added to the Trie with IS_PERCENT tag.
     * If the possibleRoot contains \d\d|\d):(\d\d|\d):(\d\d|\d), then it is added to the Trie with IS_ZAMAN tag.
     * If the possibleRoot contains \d+-\d+, then it is added to the Trie with IS_RANGE tag.
     * If the possibleRoot is an Integer, then it is added to the Trie with IS_SAYI tag.
     * If the possibleRoot is a Double, then it is added to the Trie with IS_REELSAYI tag.
     *
     * @param surfaceForm String to analyse.
     * @return fsmParseList which holds the analysis.
     */
    morphologicalAnalysis(surfaceForm: string): FsmParseList;
    /**
     * The morphologicalAnalysisExists method calls analysisExists to check the existence of the analysis with given
     * root and surfaceForm.
     *
     * @param surfaceForm String to check.
     * @param rootWord    TxtWord input root.
     * @return true an analysis exists, otherwise return false.
     */
    morphologicalAnalysisExists(rootWord: TxtWord, surfaceForm: string): boolean;
}
