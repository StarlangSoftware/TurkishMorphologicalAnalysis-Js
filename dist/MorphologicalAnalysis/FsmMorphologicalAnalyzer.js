(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-dictionary/dist/Dictionary/Trie/Trie", "./FiniteStateMachine", "nlptoolkit-dictionary/dist/Dictionary/TxtDictionary", "nlptoolkit-datastructure/dist/LRUCache", "./FsmParseList", "nlptoolkit-dictionary/dist/Dictionary/WordComparator", "fs", "./Transition", "./MorphologicalTag", "nlptoolkit-dictionary/dist/Dictionary/TxtWord", "./FsmParse", "nlptoolkit-corpus/dist/Sentence", "nlptoolkit-dictionary/dist/Dictionary/Word", "./State", "nlptoolkit-datastructure/dist/Queue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FsmMorphologicalAnalyzer = void 0;
    const Trie_1 = require("nlptoolkit-dictionary/dist/Dictionary/Trie/Trie");
    const FiniteStateMachine_1 = require("./FiniteStateMachine");
    const TxtDictionary_1 = require("nlptoolkit-dictionary/dist/Dictionary/TxtDictionary");
    const LRUCache_1 = require("nlptoolkit-datastructure/dist/LRUCache");
    const FsmParseList_1 = require("./FsmParseList");
    const WordComparator_1 = require("nlptoolkit-dictionary/dist/Dictionary/WordComparator");
    const fs = require("fs");
    const Transition_1 = require("./Transition");
    const MorphologicalTag_1 = require("./MorphologicalTag");
    const TxtWord_1 = require("nlptoolkit-dictionary/dist/Dictionary/TxtWord");
    const FsmParse_1 = require("./FsmParse");
    const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    const State_1 = require("./State");
    const Queue_1 = require("nlptoolkit-datastructure/dist/Queue");
    class FsmMorphologicalAnalyzer {
        /**
         * Another constructor of FsmMorphologicalAnalyzer class. It generates a new TxtDictionary type dictionary from
         * given input dictionary, with given inputs fileName and cacheSize.
         *
         * @param fileName   the file to read the finite state machine.
         * @param dictionaryFileNameOrDictionary the dictionary file that will be used to generate dictionaryTrie.
         * @param cacheSize  the size of the LRUCache.
         */
        constructor(fileName, dictionaryFileNameOrDictionary, cacheSize) {
            this.parsedSurfaceForms = undefined;
            this.cache = undefined;
            this.mostUsedPatterns = new Map();
            if (dictionaryFileNameOrDictionary == undefined) {
                this.dictionary = new TxtDictionary_1.TxtDictionary();
            }
            else {
                if (dictionaryFileNameOrDictionary instanceof TxtDictionary_1.TxtDictionary) {
                    this.dictionary = dictionaryFileNameOrDictionary;
                }
                else {
                    this.dictionary = new TxtDictionary_1.TxtDictionary(WordComparator_1.WordComparator.TURKISH, dictionaryFileNameOrDictionary);
                }
            }
            if (fileName == undefined) {
                this.finiteStateMachine = new FiniteStateMachine_1.FiniteStateMachine();
            }
            else {
                this.finiteStateMachine = new FiniteStateMachine_1.FiniteStateMachine(fileName);
            }
            this.prepareSuffixTrie();
            this.dictionaryTrie = this.dictionary.prepareTrie();
            if (cacheSize > 0) {
                this.cache = new LRUCache_1.LRUCache(cacheSize);
            }
        }
        reverseString(s) {
            let result = "";
            for (let i = s.length - 1; i >= 0; i--) {
                result += s[i];
            }
            return result;
        }
        prepareSuffixTrie() {
            this.suffixTrie = new Trie_1.Trie();
            let data = fs.readFileSync("suffixes.txt", 'utf8');
            let lines = data.split("\n");
            for (let suffix of lines) {
                let reverseSuffix = this.reverseString(suffix);
                this.suffixTrie.addWord(reverseSuffix, new Word_1.Word(reverseSuffix));
            }
        }
        addParsedSurfaceForms(fileName) {
            this.parsedSurfaceForms = new Map();
            let data = fs.readFileSync(fileName, 'utf8');
            let lines = data.split("\n");
            for (let line of lines) {
                let items = line.split(" ");
                this.parsedSurfaceForms.set(items[0], items[1]);
            }
        }
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
        getPossibleWords(morphologicalParse, metamorphicParse) {
            let isRootVerb = morphologicalParse.getRootPos() == "VERB";
            let containsVerb = morphologicalParse.containsTag(MorphologicalTag_1.MorphologicalTag.VERB);
            let verbTransition = new Transition_1.Transition("mAk");
            let result = new Set();
            if (metamorphicParse == undefined || metamorphicParse.getWord() == undefined) {
                return result;
            }
            let currentWord = metamorphicParse.getWord().getName();
            let pluralIndex = -1;
            let compoundWord = this.dictionaryTrie.getCompoundWordStartingWith(currentWord);
            if (!isRootVerb) {
                if (compoundWord != null && compoundWord.getName().length - currentWord.length < 3) {
                    result.add(compoundWord.getName());
                }
                result.add(currentWord);
            }
            let currentRoot = this.dictionary.getWord(metamorphicParse.getWord().getName());
            if (currentRoot == undefined && compoundWord != undefined) {
                currentRoot = compoundWord;
            }
            if (currentRoot != undefined) {
                if (isRootVerb) {
                    let verbWord = verbTransition.makeTransition(currentRoot, currentWord);
                    result.add(verbWord);
                }
                let pluralWord = undefined;
                for (let i = 1; i < metamorphicParse.size(); i++) {
                    let transition = new Transition_1.Transition(metamorphicParse.getMetaMorpheme(i), undefined, undefined);
                    if (metamorphicParse.getMetaMorpheme(i) == "lAr") {
                        pluralWord = currentWord;
                        pluralIndex = i + 1;
                    }
                    currentWord = transition.makeTransition(currentRoot, currentWord);
                    result.add(currentWord);
                    if (containsVerb) {
                        let verbWord = verbTransition.makeTransition(currentRoot, currentWord);
                        result.add(verbWord);
                    }
                }
                if (pluralWord != null) {
                    currentWord = pluralWord;
                    for (let i = pluralIndex; i < metamorphicParse.size(); i++) {
                        let transition = new Transition_1.Transition(metamorphicParse.getMetaMorpheme(i), undefined, undefined);
                        currentWord = transition.makeTransition(currentRoot, currentWord);
                        result.add(currentWord);
                        if (containsVerb) {
                            let verbWord = verbTransition.makeTransition(currentRoot, currentWord);
                            result.add(verbWord);
                        }
                    }
                }
            }
            return result;
        }
        /**
         * The getDictionary method is used to get TxtDictionary.
         *
         * @return TxtDictionary type dictionary.
         */
        getDictionary() {
            return this.dictionary;
        }
        /**
         * The getFiniteStateMachine method is used to get FiniteStateMachine.
         *
         * @return FiniteStateMachine type finiteStateMachine.
         */
        getFiniteStateMachine() {
            return this.finiteStateMachine;
        }
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
        isPossibleSubstring(shortString, longString, root) {
            let rootWord = ((shortString == root.getName()) || longString == root.getName());
            let distance = 0, last = 1;
            for (let j = 0; j < shortString.length; j++) {
                if (shortString.charAt(j) != longString.charAt(j)) {
                    if (j < shortString.length - 2) {
                        return false;
                    }
                    last = shortString.length - j;
                    distance++;
                    if (distance > FsmMorphologicalAnalyzer.MAX_DISTANCE) {
                        break;
                    }
                }
            }
            if (rootWord && (root.getName() == "ben" || root.getName() == "sen" ||
                root.lastIdropsDuringSuffixation() || root.lastIdropsDuringPassiveSuffixation())) {
                return (distance <= FsmMorphologicalAnalyzer.MAX_DISTANCE);
            }
            else {
                if (shortString.endsWith("e") || shortString.endsWith("a") || shortString.endsWith("p") ||
                    shortString.endsWith("ç") || shortString.endsWith("t") || shortString.endsWith("k") ||
                    (rootWord && (root.rootSoftenDuringSuffixation() || root.vowelEChangesToIDuringYSuffixation() ||
                        root.vowelAChangesToIDuringYSuffixation() || root.endingKChangesIntoG()))) {
                    return (last != 2 && distance <= FsmMorphologicalAnalyzer.MAX_DISTANCE - 1);
                }
                else {
                    return (distance <= FsmMorphologicalAnalyzer.MAX_DISTANCE - 2);
                }
            }
        }
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
        initializeParseList(fsmParse, root, isProper) {
            let currentFsmParse;
            if (root.isPlural()) {
                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("NominalRootPlural"));
                fsmParse.push(currentFsmParse);
            }
            else {
                if (root.isPortmanteauEndingWithSI()) {
                    currentFsmParse = new FsmParse_1.FsmParse(root.getName().substring(0, root.getName().length - 2), this.finiteStateMachine.getState("CompoundNounRoot"));
                    fsmParse.push(currentFsmParse);
                    currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("NominalRootNoPossesive"));
                    fsmParse.push(currentFsmParse);
                }
                else {
                    if (root.isPortmanteau()) {
                        if (root.isPortmanteauFacedVowelEllipsis()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("NominalRootNoPossesive"));
                            fsmParse.push(currentFsmParse);
                            currentFsmParse = new FsmParse_1.FsmParse(root.getName().substring(0, root.getName().length - 2) + root.getName().charAt(root.getName().length - 1) + root.getName().charAt(root.getName().length - 2), this.finiteStateMachine.getState("CompoundNounRoot"));
                        }
                        else {
                            if (root.isPortmanteauFacedSoftening()) {
                                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("NominalRootNoPossesive"));
                                fsmParse.push(currentFsmParse);
                                switch (root.getName().charAt(root.getName().length - 2)) {
                                    case 'b':
                                        currentFsmParse = new FsmParse_1.FsmParse(root.getName().substring(0, root.getName().length - 2) + 'p', this.finiteStateMachine.getState("CompoundNounRoot"));
                                        break;
                                    case 'c':
                                        currentFsmParse = new FsmParse_1.FsmParse(root.getName().substring(0, root.getName().length - 2) + 'ç', this.finiteStateMachine.getState("CompoundNounRoot"));
                                        break;
                                    case 'd':
                                        currentFsmParse = new FsmParse_1.FsmParse(root.getName().substring(0, root.getName().length - 2) + 't', this.finiteStateMachine.getState("CompoundNounRoot"));
                                        break;
                                    case 'ğ':
                                        currentFsmParse = new FsmParse_1.FsmParse(root.getName().substring(0, root.getName().length - 2) + 'k', this.finiteStateMachine.getState("CompoundNounRoot"));
                                        break;
                                    default:
                                        currentFsmParse = new FsmParse_1.FsmParse(root.getName().substring(0, root.getName().length - 1), this.finiteStateMachine.getState("CompoundNounRoot"));
                                }
                            }
                            else {
                                currentFsmParse = new FsmParse_1.FsmParse(root.getName().substring(0, root.getName().length - 1), this.finiteStateMachine.getState("CompoundNounRoot"));
                            }
                        }
                        fsmParse.push(currentFsmParse);
                    }
                    else {
                        if (root.isHeader()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("HeaderRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isInterjection()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("InterjectionRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isDuplicate()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("DuplicateRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isCode()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("CodeRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isMetric()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("MetricRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isNumeral()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("CardinalRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isReal()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("RealRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isFraction()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("FractionRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isDate()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("DateRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isPercent()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PercentRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isRange()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("RangeRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isTime()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("TimeRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isOrdinal()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("OrdinalRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isVerb() || root.isPassive()) {
                            if (root.verbType() != "") {
                                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("VerbalRoot(" + root.verbType() + ")"));
                            }
                            else {
                                if (!root.isPassive()) {
                                    currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("VerbalRoot"));
                                }
                                else {
                                    currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PassiveHn"));
                                }
                            }
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isPronoun()) {
                            if (root.getName() == "kendi") {
                                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PronounRoot(REFLEX)"));
                                fsmParse.push(currentFsmParse);
                            }
                            if (root.getName() == "öbür" || root.getName() == "öteki" || root.getName() == "hep" || root.getName() == "kimse" || root.getName() == "diğeri" || root.getName() == "hiçbiri" || root.getName() == "böylesi" || root.getName() == "birbiri" || root.getName() == "birbirleri" || root.getName() == "biri" || root.getName() == "başkası" || root.getName() == "bazı" || root.getName() == "kimi") {
                                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PronounRoot(QUANT)"));
                                fsmParse.push(currentFsmParse);
                            }
                            if (root.getName() == "tümü" || root.getName() == "topu" || root.getName() == "herkes" || root.getName() == "cümlesi" || root.getName() == "çoğu" || root.getName() == "birçoğu" || root.getName() == "birkaçı" || root.getName() == "birçokları" || root.getName() == "hepsi") {
                                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PronounRoot(QUANTPLURAL)"));
                                fsmParse.push(currentFsmParse);
                            }
                            if (root.getName() == "o" || root.getName() == "bu" || root.getName() == "şu") {
                                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PronounRoot(DEMONS)"));
                                fsmParse.push(currentFsmParse);
                            }
                            if (root.getName() == "ben" || root.getName() == "sen" || root.getName() == "o" || root.getName() == "biz" || root.getName() == "siz" || root.getName() == "onlar") {
                                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PronounRoot(PERS)"));
                                fsmParse.push(currentFsmParse);
                            }
                            if (root.getName() == "nere" || root.getName() == "ne" || root.getName() == "kaçı" || root.getName() == "kim" || root.getName() == "hangi") {
                                currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PronounRoot(QUES)"));
                                fsmParse.push(currentFsmParse);
                            }
                        }
                        if (root.isAdjective()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("AdjectiveRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isPureAdjective()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("Adjective"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isNominal()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("NominalRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isAbbreviation()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("NominalRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isProperNoun() && isProper) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("ProperRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isQuestion()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("QuestionRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isDeterminer()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("DeterminerRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isConjunction()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("ConjunctionRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isPostP()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("PostP"));
                            fsmParse.push(currentFsmParse);
                        }
                        if (root.isAdverb()) {
                            currentFsmParse = new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState("AdverbRoot"));
                            fsmParse.push(currentFsmParse);
                        }
                    }
                }
            }
        }
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
        initializeParseListFromRoot(parseList, root, isProper) {
            this.initializeParseList(parseList, root, isProper);
            if (root.obeysAndNotObeysVowelHarmonyDuringAgglutination()) {
                let newRoot = root.clone();
                newRoot.removeFlag("IS_UU");
                newRoot.removeFlag("IS_UUU");
                this.initializeParseList(parseList, newRoot, isProper);
            }
            if (root.rootSoftenAndNotSoftenDuringSuffixation()) {
                let newRoot = root.clone();
                newRoot.removeFlag("IS_SD");
                newRoot.removeFlag("IS_SDD");
                this.initializeParseList(parseList, newRoot, isProper);
            }
            if (root.lastIDropsAndNotDropDuringSuffixation()) {
                let newRoot = root.clone();
                newRoot.removeFlag("IS_UD");
                newRoot.removeFlag("IS_UDD");
                this.initializeParseList(parseList, newRoot, isProper);
            }
            if (root.duplicatesAndNotDuplicatesDuringSuffixation()) {
                let newRoot = root.clone();
                newRoot.removeFlag("IS_ST");
                newRoot.removeFlag("IS_STT");
                this.initializeParseList(parseList, newRoot, isProper);
            }
            if (root.endingKChangesIntoG() && root.containsFlag("IS_OA")) {
                let newRoot = root.clone();
                newRoot.removeFlag("IS_OA");
                this.initializeParseList(parseList, newRoot, isProper);
            }
        }
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
        initializeParseListFromSurfaceForm(surfaceForm, isProper) {
            let initialFsmParse = new Array();
            if (surfaceForm.length == 0) {
                return initialFsmParse;
            }
            let words = this.dictionaryTrie.getWordsWithPrefix(surfaceForm);
            for (let word of words) {
                let root = word;
                this.initializeParseListFromRoot(initialFsmParse, root, isProper);
            }
            return initialFsmParse;
        }
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
        addNewParsesFromCurrentParseLength(currentFsmParse, fsmParse, maxLength, root) {
            let currentState = currentFsmParse.getFinalSuffix();
            let currentSurfaceForm = currentFsmParse.getSurfaceForm();
            for (let currentTransition of this.finiteStateMachine.getTransitions(currentState)) {
                if (currentTransition.transitionPossibleFromParse(currentFsmParse) && (currentSurfaceForm != root.getName() ||
                    (currentSurfaceForm == root.getName() && currentTransition.transitionPossibleFromRoot(root, currentState)))) {
                    let tmp = currentTransition.makeTransition(root, currentSurfaceForm, currentFsmParse.getStartState());
                    if (tmp.length <= maxLength) {
                        let newFsmParse = currentFsmParse.clone();
                        newFsmParse.addSuffix(currentTransition.toState(), tmp, currentTransition.getWith(), currentTransition.toString(), currentTransition.toPos());
                        newFsmParse.setAgreement(currentTransition.getWith());
                        fsmParse.enqueue(newFsmParse);
                    }
                }
            }
        }
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
        addNewParsesFromCurrentParseSurfaceForm(currentFsmParse, fsmParse, surfaceForm, root) {
            let currentState = currentFsmParse.getFinalSuffix();
            let currentSurfaceForm = currentFsmParse.getSurfaceForm();
            for (let currentTransition of this.finiteStateMachine.getTransitions(currentState)) {
                if (currentTransition.transitionPossible(currentFsmParse.getSurfaceForm(), surfaceForm) && currentTransition.transitionPossibleFromParse(currentFsmParse) && (currentSurfaceForm != root.getName() || (currentSurfaceForm == root.getName() && currentTransition.transitionPossibleFromRoot(root, currentState)))) {
                    let tmp = currentTransition.makeTransition(root, currentSurfaceForm, currentFsmParse.getStartState());
                    if ((tmp.length < surfaceForm.length && this.isPossibleSubstring(tmp, surfaceForm, root)) || (tmp.length == surfaceForm.length && (root.lastIdropsDuringSuffixation() || (tmp == surfaceForm)))) {
                        let newFsmParse = currentFsmParse.clone();
                        newFsmParse.addSuffix(currentTransition.toState(), tmp, currentTransition.getWith(), currentTransition.toString(), currentTransition.toPos());
                        newFsmParse.setAgreement(currentTransition.getWith());
                        fsmParse.enqueue(newFsmParse);
                    }
                }
            }
        }
        /**
         * The parseExists method is used to check the existence of the parse.
         *
         * @param fsmParse    an ArrayList of FsmParse
         * @param surfaceForm String to use during transition.
         * @return true when the currentState is end state and input surfaceForm id equal to currentSurfaceForm, otherwise false.
         */
        parseExists(fsmParse, surfaceForm) {
            let parseQueue = new Queue_1.Queue(1000);
            parseQueue.enqueueAll(fsmParse);
            while (!parseQueue.isEmpty()) {
                let currentFsmParse = parseQueue.peek();
                parseQueue.dequeue();
                let root = currentFsmParse.getWord();
                let currentState = currentFsmParse.getFinalSuffix();
                let currentSurfaceForm = currentFsmParse.getSurfaceForm();
                if (currentState.isEndState() && currentSurfaceForm == surfaceForm) {
                    return true;
                }
                this.addNewParsesFromCurrentParseSurfaceForm(currentFsmParse, parseQueue, surfaceForm, root);
            }
            return false;
        }
        /**
         * The parseWord method is used to parse a given fsmParse. It simply adds new parses to the current parse by
         * using addNewParsesFromCurrentParse method.
         *
         * @param fsmParse    an ArrayList of FsmParse
         * @param maxLength maximum length of the surfaceform.
         * @return result {@link Array} which has the currentFsmParse.
         */
        parseWordLength(fsmParse, maxLength) {
            let result = new Array();
            let resultSuffixList = new Array();
            let parseQueue = new Queue_1.Queue(1000);
            parseQueue.enqueueAll(fsmParse);
            while (!parseQueue.isEmpty()) {
                let currentFsmParse = parseQueue.peek();
                parseQueue.dequeue();
                let root = currentFsmParse.getWord();
                let currentState = currentFsmParse.getFinalSuffix();
                let currentSurfaceForm = currentFsmParse.getSurfaceForm();
                if (currentState.isEndState() && currentSurfaceForm.length <= maxLength) {
                    let currentSuffixList = currentFsmParse.getSuffixList();
                    if (!resultSuffixList.includes(currentSuffixList)) {
                        result.push(currentFsmParse);
                        currentFsmParse.constructInflectionalGroups();
                        resultSuffixList.push(currentSuffixList);
                    }
                }
                this.addNewParsesFromCurrentParseLength(currentFsmParse, parseQueue, maxLength, root);
            }
            return result;
        }
        /**
         * The parseWord method is used to parse a given fsmParse. It simply adds new parses to the current parse by
         * using addNewParsesFromCurrentParse method.
         *
         * @param fsmParse    an ArrayList of FsmParse
         * @param surfaceForm String to use during transition.
         * @return result {@link Array} which has the currentFsmParse.
         */
        parseWordSurfaceForm(fsmParse, surfaceForm) {
            let result = new Array();
            let resultSuffixList = new Array();
            let parseQueue = new Queue_1.Queue(1000);
            parseQueue.enqueueAll(fsmParse);
            while (!parseQueue.isEmpty()) {
                let currentFsmParse = parseQueue.peek();
                parseQueue.dequeue();
                let root = currentFsmParse.getWord();
                let currentState = currentFsmParse.getFinalSuffix();
                let currentSurfaceForm = currentFsmParse.getSurfaceForm();
                if (currentState.isEndState() && currentSurfaceForm == surfaceForm) {
                    let currentSuffixList = currentFsmParse.getSuffixList();
                    if (!resultSuffixList.includes(currentSuffixList)) {
                        result.push(currentFsmParse);
                        currentFsmParse.constructInflectionalGroups();
                        resultSuffixList.push(currentSuffixList);
                    }
                }
                this.addNewParsesFromCurrentParseSurfaceForm(currentFsmParse, parseQueue, surfaceForm, root);
            }
            return result;
        }
        /**
         * The morphologicalAnalysis with 3 inputs is used to initialize an {@link Array} and add a new FsmParse
         * with given root and state.
         *
         * @param root        TxtWord input.
         * @param surfaceForm String input to use for parsing.
         * @param state       String input.
         * @return parseWord method with newly populated FsmParse ArrayList and input surfaceForm.
         */
        morphologicalAnalysisFromRoot(root, surfaceForm, state) {
            let initialFsmParse = new Array();
            if (state != undefined) {
                initialFsmParse.push(new FsmParse_1.FsmParse(root, this.finiteStateMachine.getState(state)));
                return this.parseWordSurfaceForm(initialFsmParse, surfaceForm);
            }
            else {
                this.initializeParseListFromRoot(initialFsmParse, root, this.isProperNoun(surfaceForm));
                return this.parseWordSurfaceForm(initialFsmParse, surfaceForm);
            }
        }
        distinctSurfaceFormList(parseList) {
            let items = new Set();
            for (let parse of parseList) {
                items.add(parse.getSurfaceForm());
            }
            return items;
        }
        /**
         * The generateAllParses with 2 inputs is used to generate all parses with given root. Then it calls initializeParseListFromRoot method to initialize list with newly created ArrayList, input root,
         * and maximum length.
         *
         * @param root        TxtWord input.
         * @param maxLength Maximum length of the surface form.
         * @return parseWord method with newly populated FsmParse ArrayList and maximum length.
         */
        generateAllParses(root, maxLength) {
            let initialFsmParse = new Array();
            if (root.isProperNoun()) {
                this.initializeParseListFromRoot(initialFsmParse, root, true);
            }
            this.initializeParseListFromRoot(initialFsmParse, root, false);
            return this.parseWordLength(initialFsmParse, maxLength);
        }
        /**
         * Replaces previous lemma in the sentence with the new lemma. Both lemma can contain multiple words.
         * @param original Original sentence to be replaced with.
         * @param previousWord Root word in the original sentence
         * @param newWord New word to be replaced.
         * @return Newly generated sentence by replacing the previous word in the original sentence with the new word.
         */
        replaceWord(original, previousWord, newWord) {
            let previousWordSplitted = undefined, newWordSplitted = undefined;
            let result = new Sentence_1.Sentence();
            let replacedWord = undefined;
            let previousWordMultiple = previousWord.includes(" ");
            let newWordMultiple = newWord.includes(" ");
            let lastWord;
            if (previousWordMultiple) {
                previousWordSplitted = previousWord.split(" ");
                lastWord = previousWordSplitted[previousWordSplitted.length - 1];
            }
            else {
                lastWord = previousWord;
            }
            let newRootWord;
            if (newWordMultiple) {
                newWordSplitted = newWord.split(" ");
                newRootWord = newWordSplitted[newWordSplitted.length - 1];
            }
            else {
                newRootWord = newWord;
            }
            let newRootTxtWord = this.dictionary.getWord(newRootWord);
            let parseList = this.morphologicalAnalysisFromSentence(original);
            let i;
            for (i = 0; i < parseList.length; i++) {
                let replaced = false;
                for (let j = 0; j < parseList[i].size(); j++) {
                    if (parseList[i].getFsmParse(j).getWord().getName() == lastWord && newRootTxtWord != undefined) {
                        replaced = true;
                        replacedWord = parseList[i].getFsmParse(j).replaceRootWord(newRootTxtWord);
                    }
                }
                if (replaced && replacedWord != null) {
                    if (previousWordMultiple) {
                        for (let k = 0; k < i - previousWordSplitted.length + 1; k++) {
                            result.addWord(original.getWord(k));
                        }
                    }
                    if (newWordMultiple) {
                        for (let k = 0; k < newWordSplitted.length - 1; k++) {
                            if (result.wordCount() == 0) {
                                result.addWord(new Word_1.Word((newWordSplitted[k].charAt(0) + "").toLocaleUpperCase("tr") + newWordSplitted[k].substring(1)));
                            }
                            else {
                                result.addWord(new Word_1.Word(newWordSplitted[k]));
                            }
                        }
                    }
                    if (result.wordCount() == 0) {
                        replacedWord = (replacedWord.charAt(0) + "").toLocaleUpperCase("tr") + replacedWord.substring(1);
                    }
                    result.addWord(new Word_1.Word(replacedWord));
                    if (previousWordMultiple) {
                        i++;
                        break;
                    }
                }
                else {
                    if (!previousWordMultiple) {
                        result.addWord(original.getWord(i));
                    }
                }
            }
            if (previousWordMultiple) {
                for (; i < parseList.length; i++) {
                    result.addWord(original.getWord(i));
                }
            }
            return result;
        }
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
        analysisExists(rootWord, surfaceForm, isProper) {
            if (Word_1.Word.isPunctuation(surfaceForm)) {
                return true;
            }
            if (this.isDouble(surfaceForm)) {
                return true;
            }
            let initialFsmParse;
            if (rootWord != null) {
                initialFsmParse = new Array();
                this.initializeParseListFromRoot(initialFsmParse, rootWord, isProper);
            }
            else {
                initialFsmParse = this.initializeParseListFromSurfaceForm(surfaceForm, isProper);
            }
            return this.parseExists(initialFsmParse, surfaceForm);
        }
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
        analysis(surfaceForm, isProper) {
            let initialFsmParse, fsmParse;
            if (Word_1.Word.isPunctuation(surfaceForm) && surfaceForm != "%") {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("Punctuation"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (this.isNumber(surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("CardinalRoot"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (this.patternMatches("^\\d+/\\d+$", surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("FractionRoot"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("DateRoot"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (this.isDate(surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("DateRoot"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (this.patternMatches("^\\d+\\\\/\\d+$", surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("FractionRoot"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (surfaceForm == "%" || this.isPercent(surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("PercentRoot"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (this.isTime(surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("TimeRoot"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (this.isRange(surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("RangeRoot"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (surfaceForm.startsWith("#")) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("Hashtag"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (surfaceForm.includes("@")) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(surfaceForm, new State_1.State(("Email"), true, true));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (surfaceForm.endsWith(".") && this.isInteger(surfaceForm.substring(0, surfaceForm.length - 1))) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(Number.parseInt(surfaceForm.substring(0, surfaceForm.length - 1)), this.finiteStateMachine.getState("OrdinalRoot"));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (this.isInteger(surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(Number.parseInt(surfaceForm), this.finiteStateMachine.getState("CardinalRoot"));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            if (this.isDouble(surfaceForm)) {
                initialFsmParse = new Array();
                fsmParse = new FsmParse_1.FsmParse(Number.parseFloat(surfaceForm), this.finiteStateMachine.getState("RealRoot"));
                fsmParse.constructInflectionalGroups();
                initialFsmParse.push(fsmParse);
                return initialFsmParse;
            }
            initialFsmParse = this.initializeParseListFromSurfaceForm(surfaceForm, isProper);
            return this.parseWordSurfaceForm(initialFsmParse, surfaceForm);
        }
        patternMatches(expr, value) {
            let p = this.mostUsedPatterns.get(expr);
            if (p == undefined) {
                p = RegExp(expr);
                this.mostUsedPatterns.set(expr, p);
            }
            return value.match(p) != null;
        }
        /**
         * The isProperNoun method takes surfaceForm String as input and checks its each char whether they are in the range
         * of letters between A to Z or one of the Turkish letters such as İ, Ü, Ğ, Ş, Ç, and Ö.
         *
         * @param surfaceForm String to check for proper noun.
         * @return false if surfaceForm is null or length of 0, return true if it is a letter.
         */
        isProperNoun(surfaceForm) {
            if (surfaceForm == undefined || surfaceForm.length == 0) {
                return false;
            }
            return (surfaceForm.charAt(0) >= 'A' && surfaceForm.charAt(0) <= 'Z') || (surfaceForm.charAt(0) == '\u0130') ||
                (surfaceForm.charAt(0) == '\u00dc') || (surfaceForm.charAt(0) == '\u011e') || (surfaceForm.charAt(0) == '\u015e') ||
                (surfaceForm.charAt(0) == '\u00c7') || (surfaceForm.charAt(0) == '\u00d6'); // İ, Ü, Ğ, Ş, Ç, Ö
        }
        /**
         * The isCode method takes surfaceForm String as input and checks if it consists of both letters and numbers
         *
         * @param surfaceForm String to check for code-like word.
         * @return true if it is a code-like word, return false otherwise.
         */
        isCode(surfaceForm) {
            if (surfaceForm == undefined || surfaceForm.length == 0) {
                return false;
            }
            return this.patternMatches("^.*[0-9].*$", surfaceForm) && this.patternMatches("^.*[a-zA-ZçöğüşıÇÖĞÜŞİ].*$", surfaceForm);
        }
        rootOfPossiblyNewWord(surfaceForm) {
            let words = this.suffixTrie.getWordsWithPrefix(this.reverseString(surfaceForm));
            let maxLength = 0;
            let longestWord = null;
            for (let word of words) {
                if (word.getName().length > maxLength) {
                    longestWord = surfaceForm.substring(0, surfaceForm.length - word.getName().length);
                    maxLength = word.getName().length;
                }
            }
            if (maxLength != 0) {
                let newWord;
                if (longestWord.endsWith("ğ")) {
                    longestWord = longestWord.substring(0, longestWord.length - 1) + "k";
                    newWord = new TxtWord_1.TxtWord(longestWord, "CL_ISIM");
                    newWord.addFlag("IS_SD");
                }
                else {
                    newWord = new TxtWord_1.TxtWord(longestWord, "CL_ISIM");
                    newWord.addFlag("CL_FIIL");
                }
                this.dictionaryTrie.addWord(longestWord, newWord);
                return newWord;
            }
            return null;
        }
        /**
         * The robustMorphologicalAnalysis is used to analyse surfaceForm String. First it gets the currentParse of the surfaceForm
         * then, if the size of the currentParse is 0, and given surfaceForm is a proper noun, it adds the surfaceForm
         * whose state name is ProperRoot to an {@link Array}, of it is not a proper noon, it adds the surfaceForm
         * whose state name is NominalRoot to the {@link Array}.
         *
         * @param surfaceForm String to analyse.
         * @return FsmParseList type currentParse which holds morphological analysis of the surfaceForm.
         */
        robustMorphologicalAnalysis(surfaceForm) {
            if (surfaceForm == undefined || surfaceForm == "") {
                return new FsmParseList_1.FsmParseList(new Array());
            }
            let currentParse = this.morphologicalAnalysis(surfaceForm);
            if (currentParse.size() == 0) {
                let fsmParse = new Array();
                if (this.isProperNoun(surfaceForm)) {
                    fsmParse.push(new FsmParse_1.FsmParse(surfaceForm, this.finiteStateMachine.getState("ProperRoot")));
                }
                else {
                    if (this.isCode(surfaceForm)) {
                        fsmParse.push(new FsmParse_1.FsmParse(surfaceForm, this.finiteStateMachine.getState("CodeRoot")));
                    }
                    else {
                        let newRoot = this.rootOfPossiblyNewWord(surfaceForm);
                        if (newRoot != null) {
                            fsmParse.push(new FsmParse_1.FsmParse(newRoot, this.finiteStateMachine.getState("VerbalRoot")));
                            fsmParse.push(new FsmParse_1.FsmParse(newRoot, this.finiteStateMachine.getState("NominalRoot")));
                        }
                        else {
                            fsmParse.push(new FsmParse_1.FsmParse(surfaceForm, this.finiteStateMachine.getState("NominalRoot")));
                        }
                    }
                }
                return new FsmParseList_1.FsmParseList(this.parseWordSurfaceForm(fsmParse, surfaceForm));
            }
            else {
                return currentParse;
            }
        }
        /**
         * The morphologicalAnalysis is used for debug purposes.
         *
         * @param sentence  to get word from.
         * @return FsmParseList type result.
         */
        morphologicalAnalysisFromSentence(sentence) {
            let result = new Array();
            for (let i = 0; i < sentence.wordCount(); i++) {
                let originalForm = sentence.getWord(i).getName();
                let spellCorrectedForm = this.dictionary.getCorrectForm(originalForm);
                if (spellCorrectedForm == undefined) {
                    spellCorrectedForm = originalForm;
                }
                let wordFsmParseList = this.morphologicalAnalysis(spellCorrectedForm);
                result.push(wordFsmParseList);
            }
            return result;
        }
        /**
         * The robustMorphologicalAnalysis method takes just one argument as an input. It gets the name of the words from
         * input sentence then calls robustMorphologicalAnalysis with surfaceForm.
         *
         * @param sentence Sentence type input used to get surfaceForm.
         * @return FsmParseList array which holds the result of the analysis.
         */
        robustMorphologicalAnalysisFromSentence(sentence) {
            let result = new Array();
            for (let i = 0; i < sentence.wordCount(); i++) {
                let originalForm = sentence.getWord(i).getName();
                let spellCorrectedForm = this.dictionary.getCorrectForm(originalForm);
                if (spellCorrectedForm == undefined) {
                    spellCorrectedForm = originalForm;
                }
                let fsmParseList = this.robustMorphologicalAnalysis(spellCorrectedForm);
                result.push(fsmParseList);
            }
            return result;
        }
        /**
         * The isInteger method compares input surfaceForm with regex \+?\d+ and returns the result.
         * Supports positive integer checks only.
         *
         * @param surfaceForm String to check.
         * @return true if surfaceForm matches with the regex.
         */
        isInteger(surfaceForm) {
            if (!this.patternMatches("^[+-]?\\d+$", surfaceForm))
                return false;
            let len = surfaceForm.length;
            if (len < 10) {
                return true;
            }
            else {
                if (len > 10) {
                    return false;
                }
                else {
                    return surfaceForm >= "2147483647";
                }
            }
        }
        /**
         * The isDouble method compares input surfaceForm with regex \+?(\d+)?\.\d* and returns the result.
         *
         * @param surfaceForm String to check.
         * @return true if surfaceForm matches with the regex.
         */
        isDouble(surfaceForm) {
            return this.patternMatches("^[+-]?(\\d+)?\\.\\d*$", surfaceForm);
        }
        /**
         * The isNumber method compares input surfaceForm with the array of written numbers and returns the result.
         *
         * @param surfaceForm String to check.
         * @return true if surfaceForm matches with the regex.
         */
        isNumber(surfaceForm) {
            let count = 0;
            let numbers = ["bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz",
                "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan",
                "yüz", "bin", "milyon", "milyar", "trilyon", "katrilyon"];
            let word = surfaceForm;
            while (word != "") {
                let found = false;
                for (let number of numbers) {
                    if (word.startsWith(number)) {
                        found = true;
                        count++;
                        word = word.substring(number.length);
                        break;
                    }
                }
                if (!found) {
                    break;
                }
            }
            return word == "" && count > 1;
        }
        isPercent(surfaceForm) {
            return this.patternMatches("^%(\\d\\d|\\d)$", surfaceForm) ||
                this.patternMatches("^%(\\d\\d|\\d)\\.\\d+$", surfaceForm);
        }
        isTime(surfaceForm) {
            return this.patternMatches("^(\\d\\d|\\d):(\\d\\d|\\d):(\\d\\d|\\d)$", surfaceForm) ||
                this.patternMatches("^(\\d\\d|\\d):(\\d\\d|\\d)$", surfaceForm);
        }
        isRange(surfaceForm) {
            return this.patternMatches("^\\d+-\\d+$", surfaceForm) ||
                this.patternMatches("^(\\d\\d|\\d):(\\d\\d|\\d)-(\\d\\d|\\d):(\\d\\d|\\d)$", surfaceForm) ||
                this.patternMatches("^(\\d\\d|\\d)\\.(\\d\\d|\\d)-(\\d\\d|\\d)\\.(\\d\\d|\\d)$", surfaceForm);
        }
        isDate(surfaceForm) {
            return this.patternMatches("^(\\d\\d|\\d)/(\\d\\d|\\d)/\\d+$", surfaceForm) ||
                this.patternMatches("^(\\d\\d|\\d)\\.(\\d\\d|\\d)\\.\\d+$", surfaceForm);
        }
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
        morphologicalAnalysis(surfaceForm) {
            let lowerCased = surfaceForm.toLocaleLowerCase("tr");
            if (this.parsedSurfaceForms != undefined && this.parsedSurfaceForms.has(lowerCased) &&
                !this.isInteger(surfaceForm) && !this.isDouble(surfaceForm) && !this.isPercent(surfaceForm) &&
                !this.isTime(surfaceForm) && !this.isRange(surfaceForm) && !this.isDate(surfaceForm)) {
                let parses = new Array();
                parses.push(new FsmParse_1.FsmParse(new Word_1.Word(this.parsedSurfaceForms.get(lowerCased))));
                return new FsmParseList_1.FsmParseList(parses);
            }
            if (this.cache != undefined && this.cache.contains(surfaceForm)) {
                return this.cache.get(surfaceForm);
            }
            if (this.patternMatches("^(\\w|Ç|Ş|İ|Ü|Ö)\\.$", surfaceForm)) {
                this.dictionaryTrie.addWord(surfaceForm.toLocaleLowerCase("tr"), new TxtWord_1.TxtWord(surfaceForm.toLocaleLowerCase("tr"), "IS_OA"));
            }
            let defaultFsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
            if (defaultFsmParse.length > 0) {
                let fsmParseList = new FsmParseList_1.FsmParseList(defaultFsmParse);
                if (this.cache != undefined) {
                    this.cache.add(surfaceForm, fsmParseList);
                }
                return fsmParseList;
            }
            let fsmParse = new Array();
            if (surfaceForm.includes("'")) {
                let possibleRoot = surfaceForm.substring(0, surfaceForm.indexOf('\''));
                if (possibleRoot != "") {
                    if (possibleRoot.includes("/") || possibleRoot.includes("\\/")) {
                        this.dictionaryTrie.addWord(possibleRoot, new TxtWord_1.TxtWord(possibleRoot, "IS_KESIR"));
                        fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                    }
                    else {
                        if (this.isDate(possibleRoot)) {
                            this.dictionaryTrie.addWord(possibleRoot, new TxtWord_1.TxtWord(possibleRoot, "IS_DATE"));
                            fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                        }
                        else {
                            if (this.patternMatches("^\\d+/\\d+$", possibleRoot)) {
                                this.dictionaryTrie.addWord(possibleRoot, new TxtWord_1.TxtWord(possibleRoot, "IS_KESIR"));
                                fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                            }
                            else {
                                if (this.isPercent(possibleRoot)) {
                                    this.dictionaryTrie.addWord(possibleRoot, new TxtWord_1.TxtWord(possibleRoot, "IS_PERCENT"));
                                    fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                                }
                                else {
                                    if (this.isTime(surfaceForm)) {
                                        this.dictionaryTrie.addWord(possibleRoot, new TxtWord_1.TxtWord(possibleRoot, "IS_ZAMAN"));
                                        fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                                    }
                                    else {
                                        if (this.isRange(surfaceForm)) {
                                            this.dictionaryTrie.addWord(possibleRoot, new TxtWord_1.TxtWord(possibleRoot, "IS_RANGE"));
                                            fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                                        }
                                        else {
                                            if (this.isInteger(possibleRoot)) {
                                                this.dictionaryTrie.addWord(possibleRoot, new TxtWord_1.TxtWord(possibleRoot, "IS_SAYI"));
                                                fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                                            }
                                            else {
                                                if (this.isDouble(possibleRoot)) {
                                                    this.dictionaryTrie.addWord(possibleRoot, new TxtWord_1.TxtWord(possibleRoot, "IS_REELSAYI"));
                                                    fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                                                }
                                                else {
                                                    if (Word_1.Word.isCapital(possibleRoot)) {
                                                        let newWord = undefined;
                                                        if (this.dictionary.getWord(possibleRoot.toLocaleLowerCase("tr")) != null) {
                                                            this.dictionary.getWord(possibleRoot.toLocaleLowerCase("tr")).addFlag("IS_OA");
                                                        }
                                                        else {
                                                            newWord = new TxtWord_1.TxtWord(possibleRoot.toLocaleLowerCase("tr"), "IS_OA");
                                                            this.dictionaryTrie.addWord(possibleRoot.toLocaleLowerCase("tr"), newWord);
                                                        }
                                                        fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                                                        if (fsmParse.length == 0 && newWord != undefined) {
                                                            newWord.addFlag("IS_KIS");
                                                            fsmParse = this.analysis(surfaceForm.toLocaleLowerCase("tr"), this.isProperNoun(surfaceForm));
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            let fsmParseList = new FsmParseList_1.FsmParseList(fsmParse);
            if (this.cache != undefined && fsmParseList.size() > 0) {
                this.cache.add(surfaceForm, fsmParseList);
            }
            return fsmParseList;
        }
        /**
         * The morphologicalAnalysisExists method calls analysisExists to check the existence of the analysis with given
         * root and surfaceForm.
         *
         * @param surfaceForm String to check.
         * @param rootWord    TxtWord input root.
         * @return true an analysis exists, otherwise return false.
         */
        morphologicalAnalysisExists(rootWord, surfaceForm) {
            return this.analysisExists(rootWord, surfaceForm.toLocaleLowerCase("tr"), true);
        }
    }
    exports.FsmMorphologicalAnalyzer = FsmMorphologicalAnalyzer;
    FsmMorphologicalAnalyzer.MAX_DISTANCE = 2;
});
//# sourceMappingURL=FsmMorphologicalAnalyzer.js.map