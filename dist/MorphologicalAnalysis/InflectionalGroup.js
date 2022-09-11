(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MorphologicalTag"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InflectionalGroup = void 0;
    const MorphologicalTag_1 = require("./MorphologicalTag");
    class InflectionalGroup {
        /**
         * A constructor of {@link InflectionalGroup} class which initializes the IG {@link Array} by parsing given input
         * String IG by + and calling the getMorphologicalTag method with these substrings. If getMorphologicalTag method returns
         * a tag, it adds this tag to the IG {@link Array}.
         *
         * @param IG String input.
         */
        constructor(IG) {
            this.IG = new Array();
            let st = IG;
            while (st.includes("+")) {
                let morphologicalTag = st.substring(0, st.indexOf("+"));
                let tag = InflectionalGroup.getMorphologicalTag(morphologicalTag);
                if (tag != undefined) {
                    this.IG.push(tag);
                }
                st = st.substring(st.indexOf("+") + 1);
            }
            let morphologicalTag = st;
            let tag = InflectionalGroup.getMorphologicalTag(morphologicalTag);
            if (tag != undefined) {
                this.IG.push(tag);
            }
        }
        /**
         * The getMorphologicalTag method takes a String tag as an input and if the input matches with one of the elements of
         * tags array, it then gets the morphoTags of this tag and returns it.
         *
         * @param tag String to get morphoTags from.
         * @return morphoTags if found, null otherwise.
         */
        static getMorphologicalTag(tag) {
            for (let j = 0; j < this.tags.length; j++) {
                if (tag.toLowerCase() == this.tags[j].toLowerCase()) {
                    return this.morphoTags[j];
                }
            }
            return undefined;
        }
        /**
         * The getTag method takes a MorphologicalTag type tag as an input and returns its corresponding tag from tags array.
         *
         * @param tag MorphologicalTag type input to find tag from.
         * @return tag if found, null otherwise.
         */
        static getTag(tag) {
            for (let j = 0; j < this.morphoTags.length; j++) {
                if (tag == this.morphoTags[j]) {
                    return this.tags[j];
                }
            }
            return undefined;
        }
        /**
         * Another getTag method which takes index as an input and returns the corresponding tag from IG {@link ArrayList}.
         *
         * @param index to get tag.
         * @return tag at input index.
         */
        getTag(index) {
            return this.IG[index];
        }
        /**
         * The size method returns the size of the IG {@link Array}.
         *
         * @return the size of the IG {@link Array}.
         */
        size() {
            return this.IG.length;
        }
        /**
         * Overridden toString method to return resulting tags in IG {@link Array}.
         *
         * @return String result.
         */
        toString() {
            let result = InflectionalGroup.getTag(this.IG[0]);
            for (let i = 1; i < this.IG.length; i++) {
                result = result + "+" + InflectionalGroup.getTag(this.IG[i]);
            }
            return result;
        }
        /**
         * The containsCase method loops through the tags in IG {@link Array} and finds out the tags of the NOMINATIVE,
         * ACCUSATIVE, DATIVE, LOCATIVE or ABLATIVE cases.
         *
         * @return tag which holds the condition.
         */
        containsCase() {
            for (let tag of this.IG) {
                if (tag == MorphologicalTag_1.MorphologicalTag.NOMINATIVE || tag == MorphologicalTag_1.MorphologicalTag.ACCUSATIVE ||
                    tag == MorphologicalTag_1.MorphologicalTag.DATIVE || tag == MorphologicalTag_1.MorphologicalTag.LOCATIVE ||
                    tag == MorphologicalTag_1.MorphologicalTag.ABLATIVE) {
                    return tag;
                }
            }
            return undefined;
        }
        /**
         * The containsPlural method loops through the tags in IG {@link Array} and checks whether the tags are from
         * the agreement plural or possessive plural, i.e A1PL, A2PL, A3PL, P1PL, P2PL and P3PL.
         *
         * @return true if the tag is plural, false otherwise.
         */
        containsPlural() {
            for (let tag of this.IG) {
                if (tag == MorphologicalTag_1.MorphologicalTag.A1PL || tag == MorphologicalTag_1.MorphologicalTag.A2PL || tag == MorphologicalTag_1.MorphologicalTag.A3PL ||
                    tag == MorphologicalTag_1.MorphologicalTag.P1PL || tag == MorphologicalTag_1.MorphologicalTag.P2PL || tag == MorphologicalTag_1.MorphologicalTag.P3PL) {
                    return true;
                }
            }
            return false;
        }
        /**
         * The containsTag method takes a MorphologicalTag type tag as an input and loops through the tags in
         * IG {@link Array} and returns true if the input matches with on of the tags in the IG.
         *
         * @param tag MorphologicalTag type input to search for.
         * @return true if tag matches with the tag in IG, false otherwise.
         */
        containsTag(tag) {
            for (let currentTag of this.IG) {
                if (currentTag == tag) {
                    return true;
                }
            }
            return false;
        }
        /**
         * The containsPossessive method loops through the tags in IG {@link Array} and returns true if the tag in IG is
         * one of the possessives: P1PL, P1SG, P2PL, P2SG, P3PL AND P3SG.
         *
         * @return true if it contains possessive tag, false otherwise.
         */
        containsPossessive() {
            for (let tag of this.IG) {
                if (tag == MorphologicalTag_1.MorphologicalTag.P1PL || tag == MorphologicalTag_1.MorphologicalTag.P1SG || tag == MorphologicalTag_1.MorphologicalTag.P2PL ||
                    tag == MorphologicalTag_1.MorphologicalTag.P2SG || tag == MorphologicalTag_1.MorphologicalTag.P3PL || tag == MorphologicalTag_1.MorphologicalTag.P3SG) {
                    return true;
                }
            }
            return false;
        }
    }
    exports.InflectionalGroup = InflectionalGroup;
    InflectionalGroup.tags = ["NOUN", "ADV", "ADJ", "VERB", "A1SG",
        "A2SG", "A3SG", "A1PL", "A2PL", "A3PL",
        "P1SG", "P2SG", "P3SG", "P1PL", "P2PL",
        "P3PL", "PROP", "PNON", "NOM", "WITH",
        "WITHOUT", "ACC", "DAT", "GEN", "ABL",
        "ZERO", "ABLE", "NEG", "PAST",
        "CONJ", "DET", "DUP", "INTERJ", "NUM",
        "POSTP", "PUNC", "QUES", "AGT", "BYDOINGSO",
        "CARD", "CAUS", "DEMONSP", "DISTRIB", "FITFOR",
        "FUTPART", "INF", "NESS", "ORD", "PASS",
        "PASTPART", "PRESPART", "QUESP", "QUANTP", "RANGE",
        "RATIO", "REAL", "RECIP", "REFLEX", "REFLEXP",
        "TIME", "WHEN", "WHILE", "WITHOUTHAVINGDONESO", "PCABL",
        "PCACC", "PCDAT", "PCGEN", "PCINS", "PCNOM",
        "ACQUIRE", "ACTOF", "AFTERDOINGSO", "ALMOST", "AS",
        "ASIF", "BECOME", "EVERSINCE", "FEELLIKE", "HASTILY",
        "INBETWEEN", "JUSTLIKE", "LY", "NOTABLESTATE", "RELATED",
        "REPEAT", "SINCE", "SINCEDOINGSO", "START", "STAY",
        "EQU", "INS", "AOR", "DESR", "FUT",
        "IMP", "NARR", "NECES", "OPT", "PAST",
        "PRES", "PROG1", "PROG2", "COND", "COP",
        "POS", "PRON", "LOC", "REL", "DEMONS",
        "INF2", "INF3", "BSTAG", "ESTAG", "BTTAG",
        "ETTAG", "BDTAG", "EDTAG", "INF1", "ASLONGAS",
        "DIST", "ADAMANTLY", "PERCENT", "WITHOUTBEINGABLETOHAVEDONESO", "DIM",
        "PERS", "FRACTION", "HASHTAG", "EMAIL", "DATE", "CODE", "METRIC"];
    InflectionalGroup.morphoTags = [MorphologicalTag_1.MorphologicalTag.NOUN, MorphologicalTag_1.MorphologicalTag.ADVERB, MorphologicalTag_1.MorphologicalTag.ADJECTIVE,
        MorphologicalTag_1.MorphologicalTag.VERB, MorphologicalTag_1.MorphologicalTag.A1SG, MorphologicalTag_1.MorphologicalTag.A2SG, MorphologicalTag_1.MorphologicalTag.A3SG, MorphologicalTag_1.MorphologicalTag.A1PL,
        MorphologicalTag_1.MorphologicalTag.A2PL, MorphologicalTag_1.MorphologicalTag.A3PL, MorphologicalTag_1.MorphologicalTag.P1SG, MorphologicalTag_1.MorphologicalTag.P2SG, MorphologicalTag_1.MorphologicalTag.P3SG, MorphologicalTag_1.MorphologicalTag.P1PL,
        MorphologicalTag_1.MorphologicalTag.P2PL, MorphologicalTag_1.MorphologicalTag.P3PL, MorphologicalTag_1.MorphologicalTag.PROPERNOUN, MorphologicalTag_1.MorphologicalTag.PNON, MorphologicalTag_1.MorphologicalTag.NOMINATIVE,
        MorphologicalTag_1.MorphologicalTag.WITH, MorphologicalTag_1.MorphologicalTag.WITHOUT, MorphologicalTag_1.MorphologicalTag.ACCUSATIVE, MorphologicalTag_1.MorphologicalTag.DATIVE, MorphologicalTag_1.MorphologicalTag.GENITIVE,
        MorphologicalTag_1.MorphologicalTag.ABLATIVE, MorphologicalTag_1.MorphologicalTag.ZERO, MorphologicalTag_1.MorphologicalTag.ABLE, MorphologicalTag_1.MorphologicalTag.NEGATIVE, MorphologicalTag_1.MorphologicalTag.PASTTENSE,
        MorphologicalTag_1.MorphologicalTag.CONJUNCTION, MorphologicalTag_1.MorphologicalTag.DETERMINER, MorphologicalTag_1.MorphologicalTag.DUPLICATION, MorphologicalTag_1.MorphologicalTag.INTERJECTION, MorphologicalTag_1.MorphologicalTag.NUMBER,
        MorphologicalTag_1.MorphologicalTag.POSTPOSITION, MorphologicalTag_1.MorphologicalTag.PUNCTUATION, MorphologicalTag_1.MorphologicalTag.QUESTION, MorphologicalTag_1.MorphologicalTag.AGENT, MorphologicalTag_1.MorphologicalTag.BYDOINGSO,
        MorphologicalTag_1.MorphologicalTag.CARDINAL, MorphologicalTag_1.MorphologicalTag.CAUSATIVE, MorphologicalTag_1.MorphologicalTag.DEMONSTRATIVEPRONOUN, MorphologicalTag_1.MorphologicalTag.DISTRIBUTIVE, MorphologicalTag_1.MorphologicalTag.FITFOR,
        MorphologicalTag_1.MorphologicalTag.FUTUREPARTICIPLE, MorphologicalTag_1.MorphologicalTag.INFINITIVE, MorphologicalTag_1.MorphologicalTag.NESS, MorphologicalTag_1.MorphologicalTag.ORDINAL, MorphologicalTag_1.MorphologicalTag.PASSIVE,
        MorphologicalTag_1.MorphologicalTag.PASTPARTICIPLE, MorphologicalTag_1.MorphologicalTag.PRESENTPARTICIPLE, MorphologicalTag_1.MorphologicalTag.QUESTIONPRONOUN, MorphologicalTag_1.MorphologicalTag.QUANTITATIVEPRONOUN, MorphologicalTag_1.MorphologicalTag.RANGE,
        MorphologicalTag_1.MorphologicalTag.RATIO, MorphologicalTag_1.MorphologicalTag.REAL, MorphologicalTag_1.MorphologicalTag.RECIPROCAL, MorphologicalTag_1.MorphologicalTag.REFLEXIVE, MorphologicalTag_1.MorphologicalTag.REFLEXIVEPRONOUN,
        MorphologicalTag_1.MorphologicalTag.TIME, MorphologicalTag_1.MorphologicalTag.WHEN, MorphologicalTag_1.MorphologicalTag.WHILE, MorphologicalTag_1.MorphologicalTag.WITHOUTHAVINGDONESO, MorphologicalTag_1.MorphologicalTag.PCABLATIVE,
        MorphologicalTag_1.MorphologicalTag.PCACCUSATIVE, MorphologicalTag_1.MorphologicalTag.PCDATIVE, MorphologicalTag_1.MorphologicalTag.PCGENITIVE, MorphologicalTag_1.MorphologicalTag.PCINSTRUMENTAL, MorphologicalTag_1.MorphologicalTag.PCNOMINATIVE,
        MorphologicalTag_1.MorphologicalTag.ACQUIRE, MorphologicalTag_1.MorphologicalTag.ACTOF, MorphologicalTag_1.MorphologicalTag.AFTERDOINGSO, MorphologicalTag_1.MorphologicalTag.ALMOST, MorphologicalTag_1.MorphologicalTag.AS,
        MorphologicalTag_1.MorphologicalTag.ASIF, MorphologicalTag_1.MorphologicalTag.BECOME, MorphologicalTag_1.MorphologicalTag.EVERSINCE, MorphologicalTag_1.MorphologicalTag.FEELLIKE, MorphologicalTag_1.MorphologicalTag.HASTILY,
        MorphologicalTag_1.MorphologicalTag.INBETWEEN, MorphologicalTag_1.MorphologicalTag.JUSTLIKE, MorphologicalTag_1.MorphologicalTag.LY, MorphologicalTag_1.MorphologicalTag.NOTABLESTATE, MorphologicalTag_1.MorphologicalTag.RELATED,
        MorphologicalTag_1.MorphologicalTag.REPEAT, MorphologicalTag_1.MorphologicalTag.SINCE, MorphologicalTag_1.MorphologicalTag.SINCEDOINGSO, MorphologicalTag_1.MorphologicalTag.START, MorphologicalTag_1.MorphologicalTag.STAY,
        MorphologicalTag_1.MorphologicalTag.EQUATIVE, MorphologicalTag_1.MorphologicalTag.INSTRUMENTAL, MorphologicalTag_1.MorphologicalTag.AORIST, MorphologicalTag_1.MorphologicalTag.DESIRE, MorphologicalTag_1.MorphologicalTag.FUTURE,
        MorphologicalTag_1.MorphologicalTag.IMPERATIVE, MorphologicalTag_1.MorphologicalTag.NARRATIVE, MorphologicalTag_1.MorphologicalTag.NECESSITY, MorphologicalTag_1.MorphologicalTag.OPTATIVE, MorphologicalTag_1.MorphologicalTag.PAST,
        MorphologicalTag_1.MorphologicalTag.PRESENT, MorphologicalTag_1.MorphologicalTag.PROGRESSIVE1, MorphologicalTag_1.MorphologicalTag.PROGRESSIVE2, MorphologicalTag_1.MorphologicalTag.CONDITIONAL, MorphologicalTag_1.MorphologicalTag.COPULA,
        MorphologicalTag_1.MorphologicalTag.POSITIVE, MorphologicalTag_1.MorphologicalTag.PRONOUN, MorphologicalTag_1.MorphologicalTag.LOCATIVE, MorphologicalTag_1.MorphologicalTag.RELATIVE, MorphologicalTag_1.MorphologicalTag.DEMONSTRATIVE,
        MorphologicalTag_1.MorphologicalTag.INFINITIVE2, MorphologicalTag_1.MorphologicalTag.INFINITIVE3, MorphologicalTag_1.MorphologicalTag.BEGINNINGOFSENTENCE, MorphologicalTag_1.MorphologicalTag.ENDOFSENTENCE, MorphologicalTag_1.MorphologicalTag.BEGINNINGOFTITLE,
        MorphologicalTag_1.MorphologicalTag.ENDOFTITLE, MorphologicalTag_1.MorphologicalTag.BEGINNINGOFDOCUMENT, MorphologicalTag_1.MorphologicalTag.ENDOFDOCUMENT, MorphologicalTag_1.MorphologicalTag.INFINITIVE, MorphologicalTag_1.MorphologicalTag.ASLONGAS,
        MorphologicalTag_1.MorphologicalTag.DISTRIBUTIVE, MorphologicalTag_1.MorphologicalTag.ADAMANTLY, MorphologicalTag_1.MorphologicalTag.PERCENT, MorphologicalTag_1.MorphologicalTag.WITHOUTBEINGABLETOHAVEDONESO, MorphologicalTag_1.MorphologicalTag.DIMENSION,
        MorphologicalTag_1.MorphologicalTag.PERSONALPRONOUN, MorphologicalTag_1.MorphologicalTag.FRACTION, MorphologicalTag_1.MorphologicalTag.HASHTAG, MorphologicalTag_1.MorphologicalTag.EMAIL, MorphologicalTag_1.MorphologicalTag.DATE,
        MorphologicalTag_1.MorphologicalTag.CODE, MorphologicalTag_1.MorphologicalTag.METRIC];
});
//# sourceMappingURL=InflectionalGroup.js.map