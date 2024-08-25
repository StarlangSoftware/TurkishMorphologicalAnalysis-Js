(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./InflectionalGroup", "nlptoolkit-dictionary/dist/Dictionary/Word", "./MorphologicalTag"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MorphologicalParse = void 0;
    const InflectionalGroup_1 = require("./InflectionalGroup");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    const MorphologicalTag_1 = require("./MorphologicalTag");
    class MorphologicalParse {
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
        constructor(parseOrInflectionalGroups) {
            this.inflectionalGroups = new Array();
            if (parseOrInflectionalGroups != undefined) {
                if (!Array.isArray(parseOrInflectionalGroups)) {
                    let iGs = new Array();
                    let st = parseOrInflectionalGroups;
                    while (st.includes("^DB+")) {
                        iGs.push(st.substring(0, st.indexOf("^DB+")));
                        st = st.substring(st.indexOf("^DB+") + 4);
                    }
                    iGs.push(st);
                    if (iGs[0] == "++Punc") {
                        this.root = new Word_1.Word("+");
                        this.inflectionalGroups.push(new InflectionalGroup_1.InflectionalGroup("Punc"));
                    }
                    else {
                        if (iGs[0].indexOf('+') != -1) {
                            this.root = new Word_1.Word(iGs[0].substring(0, iGs[0].indexOf('+')));
                            this.inflectionalGroups.push(new InflectionalGroup_1.InflectionalGroup(iGs[0].substring(iGs[0].indexOf('+') + 1)));
                        }
                        else {
                            this.root = new Word_1.Word(iGs[0]);
                        }
                        for (let i = 1; i < iGs.length; i++) {
                            this.inflectionalGroups.push(new InflectionalGroup_1.InflectionalGroup(iGs[i]));
                        }
                    }
                }
                else {
                    let groups = parseOrInflectionalGroups;
                    if (groups[0].indexOf('+') != -1) {
                        this.root = new Word_1.Word(groups[0].substring(0, groups[0].indexOf('+')));
                        this.inflectionalGroups.push(new InflectionalGroup_1.InflectionalGroup(groups[0].substring(groups[0].indexOf('+') + 1)));
                    }
                    for (let i = 1; i < groups.length; i++) {
                        this.inflectionalGroups.push(new InflectionalGroup_1.InflectionalGroup(groups[i]));
                    }
                }
            }
        }
        /**
         * The no-arg getWord method returns root {@link Word}.
         *
         * @return root {@link Word}.
         */
        getWord() {
            return this.root;
        }
        /**
         * The getTransitionList method gets the first item of inflectionalGroups {@link Array} as a {@link String},
         * then loops through the items of inflectionalGroups and concatenates them by using +.
         *
         * @return String that contains transition list.
         */
        getMorphologicalParseTransitionList() {
            let result = this.inflectionalGroups[0].toString();
            for (let i = 1; i < this.inflectionalGroups.length; i++) {
                result = result + "+" + this.inflectionalGroups[i].toString();
            }
            return result;
        }
        /**
         * The getInflectionalGroupString method takes an {@link number} index as an input and if index is 0, it directly
         * returns the root and the first item of inflectionalGroups {@link Array}. If the index is not 0, it then returns
         * the corresponding item of inflectionalGroups {@link Array} as a {@link String}.
         *
         * @param index Integer input.
         * @return corresponding item of inflectionalGroups at given index as a {@link String}.
         */
        getInflectionalGroupString(index) {
            if (index == 0) {
                return this.root.getName() + "+" + this.inflectionalGroups[0].toString();
            }
            else {
                return this.inflectionalGroups[index].toString();
            }
        }
        /**
         * The getInflectionalGroup method takes an {@link number} index as an input and it directly returns the
         * {@link InflectionalGroup} at given index.
         *
         * @param index Integer input.
         * @return InflectionalGroup at given index.
         */
        getInflectionalGroup(index) {
            if (index == undefined) {
                index = this.inflectionalGroups.length - 1;
            }
            return this.inflectionalGroups[index];
        }
        /**
         * The getTag method takes an {@link number} index as an input and and if the given index is 0, it directly return
         * the root. Then, it loops through the inflectionalGroups {@link Array} it returns the MorphologicalTag of the
         * corresponding inflectional group.
         *
         * @param index Integer input.
         * @return the MorphologicalTag of the corresponding inflectional group, or null of invalid index inputs.
         */
        getTag(index) {
            let size = 1;
            if (index == 0)
                return this.root.getName();
            for (let group of this.inflectionalGroups) {
                if (index < size + group.size()) {
                    return InflectionalGroup_1.InflectionalGroup.getTag(group.getTag(index - size));
                }
                size += group.size();
            }
            return undefined;
        }
        /**
         * The tagSize method loops through the inflectionalGroups {@link Array} and accumulates the sizes of each inflectional group
         * in the inflectionalGroups.
         *
         * @return total size of the inflectionalGroups {@link Array}.
         */
        tagSize() {
            let size = 1;
            for (let group of this.inflectionalGroups) {
                size += group.size();
            }
            return size;
        }
        /**
         * The size method returns the size of the inflectionalGroups {@link Array}.
         *
         * @return the size of the inflectionalGroups {@link Array}.
         */
        size() {
            return this.inflectionalGroups.length;
        }
        /**
         * The firstInflectionalGroup method returns the first inflectional group of inflectionalGroups {@link Array}.
         *
         * @return the first inflectional group of inflectionalGroups {@link Array}.
         */
        firstInflectionalGroup() {
            return this.inflectionalGroups[0];
        }
        /**
         * The lastInflectionalGroup method returns the last inflectional group of inflectionalGroups {@link Array}.
         *
         * @return the last inflectional group of inflectionalGroups {@link Array}.
         */
        lastInflectionalGroup() {
            return this.inflectionalGroups[this.inflectionalGroups.length - 1];
        }
        /**
         * The getWordWithPos method returns root with the MorphologicalTag of the first inflectional as a new word.
         *
         * @return root with the MorphologicalTag of the first inflectional as a new word.
         */
        getWordWithPos() {
            return new Word_1.Word(this.root.getName() + "+" + InflectionalGroup_1.InflectionalGroup.getTag(this.firstInflectionalGroup().getTag(0)));
        }
        /**
         * The getPos method returns the MorphologicalTag of the last inflectional group.
         *
         * @return the MorphologicalTag of the last inflectional group.
         */
        getPos() {
            return InflectionalGroup_1.InflectionalGroup.getTag(this.lastInflectionalGroup().getTag(0));
        }
        /**
         * The getRootPos method returns the MorphologicalTag of the first inflectional group.
         *
         * @return the MorphologicalTag of the first inflectional group.
         */
        getRootPos() {
            return InflectionalGroup_1.InflectionalGroup.getTag(this.firstInflectionalGroup().getTag(0));
        }
        /**
         * The lastIGContainsCase method returns the MorphologicalTag of last inflectional group if it is one of the NOMINATIVE,
         * ACCUSATIVE, DATIVE, LOCATIVE or ABLATIVE cases, null otherwise.
         *
         * @return the MorphologicalTag of last inflectional group if it is one of the NOMINATIVE,
         * ACCUSATIVE, DATIVE, LOCATIVE or ABLATIVE cases, null otherwise.
         */
        lastIGContainsCase() {
            let caseTag = this.lastInflectionalGroup().containsCase();
            if (caseTag != undefined)
                return InflectionalGroup_1.InflectionalGroup.getTag(caseTag);
            else
                return "NULL";
        }
        /**
         * The lastIGContainsTag method takes a MorphologicalTag as an input and returns true if the last inflectional group's
         * MorphologicalTag matches with one of the tags in the IG {@link Array}, false otherwise.
         *
         * @param tag {@link MorphologicalTag} type input.
         * @return true if the last inflectional group's MorphologicalTag matches with one of the tags in the
         * IG {@link Array}, false otherwise.
         */
        lastIGContainsTag(tag) {
            return this.lastInflectionalGroup().containsTag(tag);
        }
        /**
         * lastIGContainsPossessive method returns true if the last inflectional group contains one of the
         * possessives: P1PL, P1SG, P2PL, P2SG, P3PL AND P3SG, false otherwise.
         *
         * @return true if the last inflectional group contains one of the possessives: P1PL, P1SG, P2PL, P2SG, P3PL AND P3SG, false otherwise.
         */
        lastIGContainsPossessive() {
            return this.lastInflectionalGroup().containsPossessive();
        }
        /**
         * The isCapitalWord method returns true if the character at first index o f root is an uppercase letter, false otherwise.
         *
         * @return true if the character at first index o f root is an uppercase letter, false otherwise.
         */
        isCapitalWord() {
            let ch = this.root.getName().charAt(0);
            return ch == ch.toLocaleUpperCase("tr");
        }
        /**
         * The isNoun method returns true if the part of speech is NOUN, false otherwise.
         *
         * @return true if the part of speech is NOUN, false otherwise.
         */
        isNoun() {
            return this.getPos() == "NOUN";
        }
        /**
         * The isVerb method returns true if the part of speech is VERB, false otherwise.
         *
         * @return true if the part of speech is VERB, false otherwise.
         */
        isVerb() {
            return this.getPos() == "VERB";
        }
        /**
         * The isRootVerb method returns true if the part of speech of root is BERV, false otherwise.
         *
         * @return true if the part of speech of root is VERB, false otherwise.
         */
        isRootVerb() {
            return this.getRootPos() == "VERB";
        }
        /**
         * The isAdjective method returns true if the part of speech is ADJ, false otherwise.
         *
         * @return true if the part of speech is ADJ, false otherwise.
         */
        isAdjective() {
            return this.getPos() == "ADJ";
        }
        /**
         * The isProperNoun method returns true if the first inflectional group's MorphologicalTag is a PROPERNOUN, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a PROPERNOUN, false otherwise.
         */
        isProperNoun() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.PROPERNOUN);
        }
        /**
         * The isPunctuation method returns true if the first inflectional group's MorphologicalTag is a PUNCTUATION, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a PUNCTUATION, false otherwise.
         */
        isPunctuation() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.PUNCTUATION);
        }
        /**
         * The isCardinal method returns true if the first inflectional group's MorphologicalTag is a CARDINAL, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a CARDINAL, false otherwise.
         */
        isCardinal() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.CARDINAL);
        }
        /**
         * The isOrdinal method returns true if the first inflectional group's MorphologicalTag is a ORDINAL, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a ORDINAL, false otherwise.
         */
        isOrdinal() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.ORDINAL);
        }
        /**
         * The isReal method returns true if the first inflectional group's MorphologicalTag is a REAL, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a REAL, false otherwise.
         */
        isReal() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.REAL);
        }
        /**
         * The isNumber method returns true if the first inflectional group's MorphologicalTag is REAL or CARDINAL, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a REAL or CARDINAL, false otherwise.
         */
        isNumber() {
            return this.isReal() || this.isCardinal();
        }
        /**
         * The isTime method returns true if the first inflectional group's MorphologicalTag is a TIME, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a TIME, false otherwise.
         */
        isTime() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.TIME);
        }
        /**
         * The isDate method returns true if the first inflectional group's MorphologicalTag is a DATE, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a DATE, false otherwise.
         */
        isDate() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.DATE);
        }
        /**
         * The isHashTag method returns true if the first inflectional group's MorphologicalTag is a HASHTAG, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a HASHTAG, false otherwise.
         */
        isHashTag() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.HASHTAG);
        }
        /**
         * The isEmail method returns true if the first inflectional group's MorphologicalTag is a EMAIL, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a EMAIL, false otherwise.
         */
        isEmail() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.EMAIL);
        }
        /**
         * The isPercent method returns true if the first inflectional group's MorphologicalTag is a PERCENT, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a PERCENT, false otherwise.
         */
        isPercent() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.PERCENT);
        }
        /**
         * The isFraction method returns true if the first inflectional group's MorphologicalTag is a FRACTION, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a FRACTION, false otherwise.
         */
        isFraction() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.FRACTION);
        }
        /**
         * The isRange method returns true if the first inflectional group's MorphologicalTag is a RANGE, false otherwise.
         *
         * @return true if the first inflectional group's MorphologicalTag is a RANGE, false otherwise.
         */
        isRange() {
            return this.getInflectionalGroup(0).containsTag(MorphologicalTag_1.MorphologicalTag.RANGE);
        }
        /**
         * The isPlural method returns true if {@link InflectionalGroup}'s MorphologicalTags are from the agreement plural
         * or possessive plural, i.e A1PL, A2PL, A3PL, P1PL, P2PL or P3PL, and false otherwise.
         *
         * @return true if {@link InflectionalGroup}'s MorphologicalTags are from the agreement plural or possessive plural.
         */
        isPlural() {
            for (let inflectionalGroup of this.inflectionalGroups) {
                if (inflectionalGroup.containsPlural()) {
                    return true;
                }
            }
            return false;
        }
        /**
         * The isAuxiliary method returns true if the root equals to the et, ol, or yap, and false otherwise.
         *
         * @return true if the root equals to the et, ol, or yap, and false otherwise.
         */
        isAuxiliary() {
            return this.root.getName() == "et" || this.root.getName() == "ol" || this.root.getName() == "yap";
        }
        /**
         * The containsTag method takes a MorphologicalTag as an input and loops through the inflectionalGroups {@link ArrayList},
         * returns true if the input matches with on of the tags in the IG, false otherwise.
         *
         * @param tag checked tag
         * @return true if the input matches with on of the tags in the IG, false otherwise.
         */
        containsTag(tag) {
            for (let inflectionalGroup of this.inflectionalGroups) {
                if (inflectionalGroup.containsTag(tag)) {
                    return true;
                }
            }
            return false;
        }
        /**
         * The getTreePos method returns the tree pos tag of a morphological analysis.
         *
         * @return Tree pos tag of the morphological analysis in string form.
         */
        getTreePos() {
            if (this.isProperNoun()) {
                return "NP";
            }
            else {
                if (this.root.getName() == "değil") {
                    return "NEG";
                }
                else {
                    if (this.isVerb()) {
                        if (this.lastIGContainsTag(MorphologicalTag_1.MorphologicalTag.ZERO)) {
                            return "NOMP";
                        }
                        else {
                            return "VP";
                        }
                    }
                    else {
                        if (this.isAdjective()) {
                            return "ADJP";
                        }
                        else {
                            if (this.isNoun() || this.isPercent()) {
                                return "NP";
                            }
                            else {
                                if (this.containsTag(MorphologicalTag_1.MorphologicalTag.ADVERB)) {
                                    return "ADVP";
                                }
                                else {
                                    if (this.isNumber() || this.isFraction()) {
                                        return "NUM";
                                    }
                                    else {
                                        if (this.containsTag(MorphologicalTag_1.MorphologicalTag.POSTPOSITION)) {
                                            return "PP";
                                        }
                                        else {
                                            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.CONJUNCTION)) {
                                                return "CONJP";
                                            }
                                            else {
                                                if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DETERMINER)) {
                                                    return "DP";
                                                }
                                                else {
                                                    if (this.containsTag(MorphologicalTag_1.MorphologicalTag.INTERJECTION)) {
                                                        return "INTJP";
                                                    }
                                                    else {
                                                        if (this.containsTag(MorphologicalTag_1.MorphologicalTag.QUESTIONPRONOUN)) {
                                                            return "WP";
                                                        }
                                                        else {
                                                            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.PRONOUN)) {
                                                                return "NP";
                                                            }
                                                            else {
                                                                if (this.isPunctuation()) {
                                                                    switch (this.root.getName()) {
                                                                        case "!":
                                                                        case "?":
                                                                            return ".";
                                                                        case ";":
                                                                        case "-":
                                                                        case "--":
                                                                            return ":";
                                                                        case "(":
                                                                        case "-LRB-":
                                                                        case "-lrb-":
                                                                            return "-LRB-";
                                                                        case ")":
                                                                        case "-RRB-":
                                                                        case "-rrb-":
                                                                            return "-RRB-";
                                                                        default:
                                                                            return this.root.getName();
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
                    }
                }
            }
            return "-XXX-";
        }
        /**
         * Returns the pronoun type of the parse for universal dependency feature ProType.
         * @return "Art" if the pronoun is also a determiner; "Prs" if the pronoun is personal pronoun; "Rcp" if the
         * pronoun is 'birbiri'; "Ind" if the pronoun is an indeterminate pronoun; "Neg" if the pronoun is 'hiçbiri';
         * "Int" if the pronoun is a question pronoun; "Dem" if the pronoun is a demonstrative pronoun.
         */
        getPronType() {
            let lemma = this.root.getName();
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DETERMINER)) {
                return "Art";
            }
            if (lemma == "kendi" || this.containsTag(MorphologicalTag_1.MorphologicalTag.PERSONALPRONOUN)) {
                return "Prs";
            }
            if (lemma == "birbiri" || lemma == "birbirleri") {
                return "Rcp";
            }
            if (lemma == "birçoğu" || lemma == "hep" || lemma == "kimse"
                || lemma == "bazı" || lemma == "biri" || lemma == "çoğu"
                || lemma == "hepsi" || lemma == "diğeri" || lemma == "tümü"
                || lemma == "herkes" || lemma == "kimi" || lemma == "öbür"
                || lemma == "öteki" || lemma == "birkaçı" || lemma == "topu"
                || lemma == "başkası") {
                return "Ind";
            }
            if (lemma == "hiçbiri") {
                return "Neg";
            }
            if (lemma == "kim" || lemma == "nere" || lemma == "ne"
                || lemma == "hangi" || lemma == "nasıl" || lemma == "kaç"
                || lemma == "mi" || lemma == "mı" || lemma == "mu" || lemma == "mü") {
                return "Int";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DEMONSTRATIVEPRONOUN)) {
                return "Dem";
            }
            return undefined;
        }
        /**
         * Returns the numeral type of the parse for universal dependency feature NumType.
         * @return "Ord" if the parse is Time, Ordinal or the word is '%' or 'kaçıncı'; "Dist" if the word is a
         * distributive number such as 'beşinci'; "Card" if the number is cardinal or any number or the word is 'kaç'.
         */
        getNumType() {
            let lemma = this.root.getName();
            if (lemma == "%" || this.containsTag(MorphologicalTag_1.MorphologicalTag.TIME)) {
                return "Ord";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.ORDINAL) || lemma == "kaçıncı") {
                return "Ord";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DISTRIBUTIVE)) {
                return "Dist";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.CARDINAL) || this.containsTag(MorphologicalTag_1.MorphologicalTag.NUMBER) || lemma == "kaç") {
                return "Card";
            }
            return undefined;
        }
        /**
         * Returns the value for the dependency feature Reflex.
         * @return "Yes" if the root word is 'kendi', null otherwise.
         */
        getReflex() {
            let lemma = this.root.getName();
            if (lemma == "kendi") {
                return "Yes";
            }
            return undefined;
        }
        /**
         * Returns the agreement of the parse for the universal dependency feature Number.
         * @return "Sing" if the agreement of the parse is singular (contains A1SG, A2SG, A3SG); "Plur" if the agreement
         * of the parse is plural (contains A1PL, A2PL, A3PL).
         */
        getNumber() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.A1SG) || this.containsTag(MorphologicalTag_1.MorphologicalTag.A2SG) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.A3SG)) {
                return "Sing";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.A1PL) || this.containsTag(MorphologicalTag_1.MorphologicalTag.A2PL) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.A3PL)) {
                return "Plur";
            }
            return undefined;
        }
        /**
         * Returns the possessive agreement of the parse for the universal dependency feature [Pos].
         * @return "Sing" if the possessive agreement of the parse is singular (contains P1SG, P2SG, P3SG); "Plur" if the
         * possessive agreement of the parse is plural (contains P1PL, P2PL, P3PL).
         */
        getPossessiveNumber() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.P1SG) || this.containsTag(MorphologicalTag_1.MorphologicalTag.P2SG) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.P3SG)) {
                return "Sing";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.P1PL) || this.containsTag(MorphologicalTag_1.MorphologicalTag.P2PL) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.P3PL)) {
                return "Plur";
            }
            return undefined;
        }
        /**
         * Returns the case marking of the parse for the universal dependency feature case.
         * @return "Acc" for accusative marker; "Dat" for dative marker; "Gen" for genitive marker; "Loc" for locative
         * marker; "Ins" for instrumentative marker; "Abl" for ablative marker; "Nom" for nominative marker.
         */
        getCase() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.ACCUSATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PCACCUSATIVE)) {
                return "Acc";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PCDATIVE)) {
                return "Dat";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.GENITIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PCGENITIVE)) {
                return "Gen";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.LOCATIVE)) {
                return "Loc";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.INSTRUMENTAL) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PCINSTRUMENTAL)) {
                return "Ins";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PCABLATIVE)) {
                return "Abl";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.NOMINATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PCNOMINATIVE)) {
                return "Nom";
            }
            return undefined;
        }
        /**
         * Returns the definiteness of the parse for the universal dependency feature definite. It applies only for
         * determiners in Turkish.
         * @return "Ind" for 'bir', 'bazı', or 'birkaç'. "Def" for 'her', 'bu', 'şu', 'o', 'bütün'.
         */
        getDefinite() {
            let lemma = this.root.getName();
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DETERMINER)) {
                if (lemma == "bir" || lemma == "bazı" || lemma == "birkaç") {
                    return "Ind";
                }
                if (lemma == "her" || lemma == "bu" || lemma == "şu" || lemma == "o" || lemma == "bütün") {
                    return "Def";
                }
            }
            return undefined;
        }
        /**
         * Returns the degree of the parse for the universal dependency feature degree.
         * @return "Cmp" for comparative adverb 'daha'; "Sup" for superlative adjective or adverb 'en'.
         */
        getDegree() {
            let lemma = this.root.getName();
            if (lemma == "daha") {
                return "Cmp";
            }
            if (lemma == "en" && !this.isNoun()) {
                return "Sup";
            }
            return undefined;
        }
        /**
         * Returns the polarity of the verb for the universal dependency feature polarity.
         * @return "Pos" for positive polarity containing tag POS; "Neg" for negative polarity containing tag NEG.
         */
        getPolarity() {
            if (this.root.getName() == "değil") {
                return "Neg";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.POSITIVE)) {
                return "Pos";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.NEGATIVE)) {
                return "Neg";
            }
            return undefined;
        }
        /**
         * Returns the person of the agreement of the parse for the universal dependency feature person.
         * @return "1" for first person; "2" for second person; "3" for third person.
         */
        getPerson() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.A1SG) || this.containsTag(MorphologicalTag_1.MorphologicalTag.A1PL)) {
                return "1";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.A2SG) || this.containsTag(MorphologicalTag_1.MorphologicalTag.A2PL)) {
                return "2";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.A3SG) || this.containsTag(MorphologicalTag_1.MorphologicalTag.A3PL)) {
                return "3";
            }
            return undefined;
        }
        /**
         * Returns the person of the possessive agreement of the parse for the universal dependency feature [pos].
         * @return "1" for first person; "2" for second person; "3" for third person.
         */
        getPossessivePerson() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.P1SG) || this.containsTag(MorphologicalTag_1.MorphologicalTag.P1PL)) {
                return "1";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.P2SG) || this.containsTag(MorphologicalTag_1.MorphologicalTag.P2PL)) {
                return "2";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.P3SG) || this.containsTag(MorphologicalTag_1.MorphologicalTag.P3PL)) {
                return "3";
            }
            return undefined;
        }
        /**
         * Returns the voice of the verb parse for the universal dependency feature voice.
         * @return "CauPass" if the verb parse is both causative and passive; "Pass" if the verb parse is only passive;
         * "Rcp" if the verb parse is reciprocal; "Cau" if the verb parse is only causative; "Rfl" if the verb parse is
         * reflexive.
         */
        getVoice() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.CAUSATIVE) && this.containsTag(MorphologicalTag_1.MorphologicalTag.PASSIVE)) {
                return "CauPass";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.PASSIVE)) {
                return "Pass";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.RECIPROCAL)) {
                return "Rcp";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.CAUSATIVE)) {
                return "Cau";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.REFLEXIVE)) {
                return "Rfl";
            }
            return undefined;
        }
        /**
         * Returns the aspect of the verb parse for the universal dependency feature aspect.
         * @return "Perf" for past, narrative and future tenses; "Prog" for progressive tenses; "Hab" for Aorist; "Rapid"
         * for parses containing HASTILY tag; "Dur" for parses containing START, STAY or REPEAT tags.
         */
        getAspect() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.PASTTENSE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.NARRATIVE) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.FUTURE)) {
                return "Perf";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.PROGRESSIVE1) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PROGRESSIVE2)) {
                return "Prog";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST)) {
                return "Hab";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.HASTILY)) {
                return "Rapid";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.START) || this.containsTag(MorphologicalTag_1.MorphologicalTag.STAY) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.REPEAT)) {
                return "Dur";
            }
            return undefined;
        }
        /**
         * Returns the tense of the verb parse for universal dependency feature tense.
         * @return "Past" for simple past tense; "Fut" for future tense; "Pqp" for narrative past tense; "Pres" for other
         * past tenses.
         */
        getTense() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.NARRATIVE) && this.containsTag(MorphologicalTag_1.MorphologicalTag.PASTTENSE)) {
                return "Pqp";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.NARRATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PASTTENSE)) {
                return "Past";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.FUTURE)) {
                return "Fut";
            }
            if (!this.containsTag(MorphologicalTag_1.MorphologicalTag.PASTTENSE) && !this.containsTag(MorphologicalTag_1.MorphologicalTag.FUTURE)) {
                return "Pres";
            }
            return undefined;
        }
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
        getMood() {
            if ((this.containsTag(MorphologicalTag_1.MorphologicalTag.COPULA) || this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST)) &&
                this.containsTag(MorphologicalTag_1.MorphologicalTag.NECESSITY) && this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE)) {
                return "GenNecPot";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.CONDITIONAL) && (this.containsTag(MorphologicalTag_1.MorphologicalTag.COPULA) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST)) && this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE)) {
                return "CndGenPot";
            }
            if ((this.containsTag(MorphologicalTag_1.MorphologicalTag.COPULA) || this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST)) &&
                this.containsTag(MorphologicalTag_1.MorphologicalTag.NECESSITY)) {
                return "GenNec";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.NECESSITY) && this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE)) {
                return "NecPot";
            }
            if ((this.containsTag(MorphologicalTag_1.MorphologicalTag.COPULA) || this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST)) &&
                this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE)) {
                return "GenPot";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DESIRE) && this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE)) {
                return "DesPot";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.CONDITIONAL) && this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE)) {
                return "CndPot";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.CONDITIONAL) && (this.containsTag(MorphologicalTag_1.MorphologicalTag.COPULA) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST))) {
                return "CndGen";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.IMPERATIVE)) {
                return "Imp";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.CONDITIONAL)) {
                return "Cnd";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DESIRE)) {
                return "Des";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.OPTATIVE)) {
                return "Opt";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.NECESSITY)) {
                return "Nec";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE)) {
                return "Pot";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.PASTTENSE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.NARRATIVE) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.PROGRESSIVE1) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PROGRESSIVE2) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.FUTURE)) {
                return "Ind";
            }
            if ((this.containsTag(MorphologicalTag_1.MorphologicalTag.COPULA) || this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST))) {
                return "Gen";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.ZERO) && !this.containsTag(MorphologicalTag_1.MorphologicalTag.A3PL)) {
                return "Gen";
            }
            return undefined;
        }
        /**
         * Returns the form of the verb parse for the universal dependency feature verbForm.
         * @return "Part" for participles; "Vnoun" for infinitives; "Conv" for parses contaning tags SINCEDOINGSO,
         * WITHOUTHAVINGDONESO, WITHOUTBEINGABLETOHAVEDONESO, BYDOINGSO, AFTERDOINGSO, INFINITIVE3; "Fin" for others.
         */
        getVerbForm() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.PASTPARTICIPLE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.FUTUREPARTICIPLE) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.PRESENTPARTICIPLE)) {
                return "Part";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.INFINITIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.INFINITIVE2)) {
                return "Vnoun";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.SINCEDOINGSO) || this.containsTag(MorphologicalTag_1.MorphologicalTag.WITHOUTHAVINGDONESO) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.WITHOUTBEINGABLETOHAVEDONESO) || this.containsTag(MorphologicalTag_1.MorphologicalTag.BYDOINGSO) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.AFTERDOINGSO) || this.containsTag(MorphologicalTag_1.MorphologicalTag.INFINITIVE3)) {
                return "Conv";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.COPULA) || this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PROGRESSIVE2) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.DESIRE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.NECESSITY) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.CONDITIONAL) || this.containsTag(MorphologicalTag_1.MorphologicalTag.IMPERATIVE) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.OPTATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PASTTENSE) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.NARRATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PROGRESSIVE1) ||
                this.containsTag(MorphologicalTag_1.MorphologicalTag.FUTURE) || (this.containsTag(MorphologicalTag_1.MorphologicalTag.ZERO) &&
                !this.containsTag(MorphologicalTag_1.MorphologicalTag.A3PL))) {
                return "Fin";
            }
            return undefined;
        }
        getEvident() {
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.NARRATIVE)) {
                return "Nfh";
            }
            else {
                if (this.containsTag(MorphologicalTag_1.MorphologicalTag.COPULA) || this.containsTag(MorphologicalTag_1.MorphologicalTag.ABLE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.AORIST) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PROGRESSIVE2)
                    || this.containsTag(MorphologicalTag_1.MorphologicalTag.DESIRE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.NECESSITY) || this.containsTag(MorphologicalTag_1.MorphologicalTag.CONDITIONAL) || this.containsTag(MorphologicalTag_1.MorphologicalTag.IMPERATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.OPTATIVE)
                    || this.containsTag(MorphologicalTag_1.MorphologicalTag.PASTTENSE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.NARRATIVE) || this.containsTag(MorphologicalTag_1.MorphologicalTag.PROGRESSIVE1) || this.containsTag(MorphologicalTag_1.MorphologicalTag.FUTURE)) {
                    return "Fh";
                }
            }
            return undefined;
        }
        /**
         * Construct the universal dependency features as an array of strings. Each element represents a single feature.
         * Every feature is given as featureType = featureValue.
         * @param uPos Universal dependency part of speech tag for the parse.
         * @return An array of universal dependency features for this parse.
         */
        getUniversalDependencyFeatures(uPos) {
            let featureList = new Array();
            let pronType = this.getPronType();
            if (pronType != undefined && uPos.toUpperCase() != "NOUN" && uPos.toUpperCase() != "ADJ" && uPos.toUpperCase() != "VERB" && uPos.toUpperCase() != "CCONJ" && uPos.toUpperCase() != "PROPN") {
                featureList.push("PronType=" + pronType);
            }
            let numType = this.getNumType();
            if (numType != undefined && uPos.toUpperCase() != "VERB" && uPos.toUpperCase() != "NOUN" && uPos.toUpperCase() != "ADV") {
                featureList.push("NumType=" + numType);
            }
            let reflex = this.getReflex();
            if (reflex != undefined && uPos.toUpperCase() != "ADJ" && uPos.toUpperCase() != "VERB") {
                featureList.push("Reflex=" + reflex);
            }
            let degree = this.getDegree();
            if (degree != undefined && uPos.toUpperCase() != "ADJ") {
                featureList.push("Degree=" + degree);
            }
            if (this.isNoun() || this.isVerb() || this.root.getName() == "mi" || (pronType != undefined && pronType != "Art")) {
                let number = this.getNumber();
                if (number != undefined) {
                    featureList.push("Number=" + number);
                }
                let possessiveNumber = this.getPossessiveNumber();
                if (possessiveNumber != undefined) {
                    featureList.push("Number[psor]=" + possessiveNumber);
                }
                let person = this.getPerson();
                if (person != undefined && uPos.toUpperCase() != "PROPN") {
                    featureList.push("Person=" + person);
                }
                let possessivePerson = this.getPossessivePerson();
                if (possessivePerson != undefined && uPos.toUpperCase() != "PROPN") {
                    featureList.push("Person[psor]=" + possessivePerson);
                }
            }
            if (this.isNoun() || (pronType != undefined && pronType != "Art")) {
                let case_ = this.getCase();
                if (case_ != undefined) {
                    featureList.push("Case=" + case_);
                }
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DETERMINER)) {
                let definite = this.getDefinite();
                if (definite != undefined) {
                    featureList.push("Definite=" + definite);
                }
            }
            if (this.isVerb() || this.root.getName() == "mi") {
                let polarity = this.getPolarity();
                if (polarity != undefined) {
                    featureList.push("Polarity=" + polarity);
                }
                let voice = this.getVoice();
                if (voice != undefined && this.root.getName() != "mi") {
                    featureList.push("Voice=" + voice);
                }
                let aspect = this.getAspect();
                if (aspect != undefined && uPos.toUpperCase() != "PROPN" && this.root.getName() != "mi") {
                    featureList.push("Aspect=" + aspect);
                }
                let tense = this.getTense();
                if (tense != undefined && uPos.toUpperCase() != "PROPN") {
                    featureList.push("Tense=" + tense);
                }
                let mood = this.getMood();
                if (mood != undefined && uPos.toUpperCase() != "PROPN" && this.root.getName() != "mi") {
                    featureList.push("Mood=" + mood);
                }
                let verbForm = this.getVerbForm();
                if (verbForm != undefined && uPos.toUpperCase() != "PROPN") {
                    featureList.push("VerbForm=" + verbForm);
                }
                let evident = this.getEvident();
                if (evident != undefined && this.root.getName() != "mi") {
                    featureList.push("Evident=" + evident);
                }
            }
            featureList.sort();
            return featureList;
        }
        /**
         * Returns the universal dependency part of speech for this parse.
         * @return "AUX" for word 'değil; "PROPN" for proper nouns; "NOUN for nouns; "ADJ" for adjectives; "ADV" for
         * adverbs; "INTJ" for interjections; "VERB" for verbs; "PUNCT" for punctuation symbols; "DET" for determiners;
         * "NUM" for numerals; "PRON" for pronouns; "ADP" for post participles; "SCONJ" or "CCONJ" for conjunctions.
         */
        getUniversalDependencyPos() {
            let lemma = this.root.getName();
            if (lemma == "değil") {
                return "AUX";
            }
            if (this.isProperNoun()) {
                return "PROPN";
            }
            if (this.isNoun()) {
                return "NOUN";
            }
            if (this.isAdjective()) {
                return "ADJ";
            }
            if (this.getPos() == "ADV") {
                return "ADV";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.INTERJECTION)) {
                return "INTJ";
            }
            if (this.isVerb()) {
                return "VERB";
            }
            if (this.isPunctuation() || this.isHashTag()) {
                return "PUNCT";
            }
            if (this.containsTag(MorphologicalTag_1.MorphologicalTag.DETERMINER)) {
                return "DET";
            }
            if (this.isNumber() || this.isDate() || this.isTime() || this.isOrdinal() || this.isFraction() || lemma == "%") {
                return "NUM";
            }
            if (this.getPos() == "PRON") {
                return "PRON";
            }
            if (this.getPos() == "POSTP") {
                return "ADP";
            }
            if (this.getPos() == "QUES") {
                return "AUX";
            }
            if (this.getPos() == "CONJ") {
                if (lemma == "ki" || lemma == "eğer" || lemma == "diye") {
                    return "SCONJ";
                }
                else {
                    return "CCONJ";
                }
            }
            return "X";
        }
        /**
         * The overridden toString method gets the root and the first inflectional group as a result {@link String} then concatenates
         * with ^DB+ and the following inflectional groups.
         *
         * @return result {@link String}.
         */
        toString() {
            let result = this.root.getName() + "+" + this.inflectionalGroups[0].toString();
            for (let i = 1; i < this.inflectionalGroups.length; i++) {
                result = result + "^DB+" + this.inflectionalGroups[i].toString();
            }
            return result;
        }
    }
    exports.MorphologicalParse = MorphologicalParse;
});
//# sourceMappingURL=MorphologicalParse.js.map