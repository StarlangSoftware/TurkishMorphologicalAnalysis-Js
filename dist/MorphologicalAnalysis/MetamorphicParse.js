(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MorphologicalTag", "nlptoolkit-dictionary/dist/Dictionary/Word"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetamorphicParse = void 0;
    const MorphologicalTag_1 = require("./MorphologicalTag");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class MetamorphicParse {
        /**
         * A constructor of {@link MetamorphicParse} class which creates an {@link ArrayList} metaMorphemeList which has split words
         * according to +.
         *
         * @param parse String to parse.
         */
        constructor(parse) {
            this.metaMorphemeList = new Array();
            if (parse == "+") {
                this.root = new Word_1.Word("+");
            }
            else {
                let words = parse.split("\\+");
                this.root = new Word_1.Word(words[0]);
                for (let i = 1; i < words.length; i++) {
                    this.metaMorphemeList.push(words[i]);
                }
            }
        }
        /**
         * The getMetaMorphemeTag method takes a String tag as an input and takes the first char of the tag. If first char
         * is a punctuation it gets a substring from the tag. And gets the meta morphemes of this tag then adds to the
         * result {@link Array}.
         *
         * @param tag String to get meta morphemes from.
         * @param parse MorphologicalParse type input.
         * @return ArrayList type result which holds meta morphemes.
         */
        static getMetaMorphemeTag(tag, parse) {
            let result = new Array();
            let s = tag.charAt(0);
            if (Word_1.Word.isPunctuation(s)) {
                tag = tag.substring(1);
            }
            for (let j = 0; j < this.metaMorphemes.length; j++) {
                if (tag.toLowerCase() == this.metaMorphemes[j].toLowerCase()) {
                    if (parse != undefined) {
                        if (parse.containsTag(this.morphotacticTags[j])) {
                            result.push(this.morphotacticTags[j]);
                        }
                    }
                    else {
                        result.push(this.morphotacticTags[j]);
                    }
                }
            }
            return result;
        }
        /**
         * The getter method for Private Word root.
         *
         * @return Word type root.
         */
        getWord() {
            return this.root;
        }
        /**
         * The size method returns the size of the metaMorphemeList.
         *
         * @return the size of the metaMorphemeList.
         */
        size() {
            return this.metaMorphemeList.length + 1;
        }
        /**
         * The addMetaMorphemeList method splits input String by + and add to the metaMorphemeList.
         *
         * @param newTacticSet String to add the metaMorphemeList.
         */
        addMetamorphemeList(newTacticSet) {
            let tactics = newTacticSet.split("\\+");
            for (let tactic of tactics) {
                this.metaMorphemeList.push(tactic);
            }
        }
        /**
         * The removeMetaMorphemeFromIndex method removes the meta morpheme at given index from metaMorphemeList.
         *
         * @param index to remove from metaMorphemeList.
         */
        removeMetaMorphemeFromIndex(index) {
            this.metaMorphemeList.splice(index, this.metaMorphemeList.length - index);
        }
        /**
         * The getMetaMorpheme method gets the meta morpheme at given index.
         *
         * @param index is used to get the meta morpheme.
         * @return metaMorphemeList's corresponding meta morpheme.
         */
        getMetaMorpheme(index) {
            if (index == 0) {
                return this.root.getName();
            }
            else {
                return this.metaMorphemeList[index - 1];
            }
        }
        /**
         * Overridden toString method to return resulting meta morphemes in metaMorphemeList.
         *
         * @return String result.
         */
        toString() {
            let result = this.root.getName();
            for (let metaMorpheme of this.metaMorphemeList) {
                result = result + "+" + metaMorpheme;
            }
            return result;
        }
    }
    exports.MetamorphicParse = MetamorphicParse;
    MetamorphicParse.metaMorphemes = ["Ar", "Ar", "CA", "CA",
        "CA", "cAsHnA", "CH", "CHk",
        "DA", "DAn", "DH", "DHk",
        "DHkCA", "DHr", "DHr", "DHr",
        "H", "Hl", "Hm", "Hn",
        "Hn", "Hn", "HmHz", "HncH",
        "HnHz", "Hr", "Hr", "Hs",
        "Ht", "Hyor", "Hz", "k",
        "ki", "k??", "lAn", "lAr",
        "lArDHr", "lArH", "lArH'", "lAs",
        "lH", "lHk", "lHm", "m",
        "mA", "mA", "mAcA", "mAdAn",
        "mAk", "mAksHzHn", "mAktA", "mAlH",
        "mAzlHk", "mHs", "n", "n",
        "nA", "ncA", "nDA", "nDAn",
        "nH", "nHn", "nHz", "nlAr",
        "SA", "SAl", "sH", "SH",
        "SH", "SHn", "SHnHz", "SHnlAr",
        "SHz", "??Ar", "t", "yA",
        "yA", "yAbil", "yAcAk", "yAcAk",
        "yAdur", "yAgel", "yAlH", "yAmA",
        "yAmAdAn", "yAn", "yArAk", "yAsH",
        "yDH", "yH", "yHcH", "yHm",
        "yHn", "yHncA", "yHp", "yHs",
        "yHver", "yHz", "yken", "ylA",
        "ymHs", "ysA", "z", "zsHn",
        "zsHnHz", "zlAr", "yAkal", "yAkoy",
        "yAgor"];
    MetamorphicParse.morphotacticTags = [
        /**
         * Aorist Tense : Her hafta sonunda futbol oynarlar.
         */
        MorphologicalTag_1.MorphologicalTag.AORIST,
        /**
         * Causative Form : Pi??irmek
         */
        MorphologicalTag_1.MorphologicalTag.CAUSATIVE,
        /**
         * As if : Ya??arm????cas??na
         */
        MorphologicalTag_1.MorphologicalTag.ASIF,
        /**
         * -LY : Ak??ll??ca
         */
        MorphologicalTag_1.MorphologicalTag.LY,
        /**
         * Equative : ??ylece
         */
        MorphologicalTag_1.MorphologicalTag.EQUATIVE,
        /**
         * As if
         */
        MorphologicalTag_1.MorphologicalTag.ASIF,
        /**
         * Agent : Toplay??c??
         */
        MorphologicalTag_1.MorphologicalTag.AGENT,
        /**
         * Dimension : K??????c??k
         */
        MorphologicalTag_1.MorphologicalTag.DIMENSION,
        /**
         * Locative : A??a????da
         */
        MorphologicalTag_1.MorphologicalTag.LOCATIVE,
        /**
         * Ablative : Okuldan
         */
        MorphologicalTag_1.MorphologicalTag.ABLATIVE,
        /**
         * Past tense : Ya??and??
         */
        MorphologicalTag_1.MorphologicalTag.PASTTENSE,
        /**
         * Past participle : K??r??lm????
         */
        MorphologicalTag_1.MorphologicalTag.PASTPARTICIPLE,
        /**
         * As long as : Ya??ad??k??a
         */
        MorphologicalTag_1.MorphologicalTag.ASLONGAS,
        /**
         * Copula : Mavidir
         */
        MorphologicalTag_1.MorphologicalTag.COPULA,
        /**
         * Since : Y??llard??r
         */
        MorphologicalTag_1.MorphologicalTag.SINCE,
        /**
         * Causitive
         */
        MorphologicalTag_1.MorphologicalTag.CAUSATIVE,
        /**
         * 3rd person singular possessive : Onun
         */
        MorphologicalTag_1.MorphologicalTag.P3SG,
        /**
         * Passive : A????ld??
         */
        MorphologicalTag_1.MorphologicalTag.PASSIVE,
        /**
         * 1st person singular possessive : Benim
         */
        MorphologicalTag_1.MorphologicalTag.P1SG,
        /**
         * Reflexive : Kendi
         */
        MorphologicalTag_1.MorphologicalTag.REFLEXIVE,
        /**
         * Passive
         */
        MorphologicalTag_1.MorphologicalTag.PASSIVE,
        /**
         * 2nd person singular possessive :Senin
         */
        MorphologicalTag_1.MorphologicalTag.P2SG,
        /**
         * 1st person plural possessive :  Bizim
         */
        MorphologicalTag_1.MorphologicalTag.P1PL,
        /**
         * Ordinal Number : Alt??nc??
         */
        MorphologicalTag_1.MorphologicalTag.ORDINAL,
        /**
         * 2nd person plural possessive : Sizin
         */
        MorphologicalTag_1.MorphologicalTag.P2PL,
        /**
         * Aorist
         */
        MorphologicalTag_1.MorphologicalTag.AORIST,
        /**
         * Causitive
         */
        MorphologicalTag_1.MorphologicalTag.CAUSATIVE,
        /**
         * Reciprocal verb : G??r????mek
         */
        MorphologicalTag_1.MorphologicalTag.RECIPROCAL,
        /**
         * Causitive
         */
        MorphologicalTag_1.MorphologicalTag.CAUSATIVE,
        /**
         * Progressive1 : G??r??yor
         */
        MorphologicalTag_1.MorphologicalTag.PROGRESSIVE1,
        /**
         * 1st person plural agreement : Biz gideriz
         */
        MorphologicalTag_1.MorphologicalTag.A1PL,
        /**
         * 1st person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A1PL,
        /**
         * Relative : Gelenin
         */
        MorphologicalTag_1.MorphologicalTag.RELATIVE,
        /**
         * Relative
         */
        MorphologicalTag_1.MorphologicalTag.RELATIVE,
        /**
         * Acquire : Kazan??lan
         */
        MorphologicalTag_1.MorphologicalTag.ACQUIRE,
        /**
         * 3rd person plural agreement : Onlar giderler
         */
        MorphologicalTag_1.MorphologicalTag.A3PL,
        /**
         * Since
         */
        MorphologicalTag_1.MorphologicalTag.SINCE,
        /**
         * 3rd person plural possessive : Onlar??n
         */
        MorphologicalTag_1.MorphologicalTag.P3PL,
        /**
         * 3rd person plural possessive
         */
        MorphologicalTag_1.MorphologicalTag.P3PL,
        /**
         * Become : Abidele??
         */
        MorphologicalTag_1.MorphologicalTag.BECOME,
        /**
         * With : Kalemle
         */
        MorphologicalTag_1.MorphologicalTag.WITH,
        /**
         * Ness : A????rba??l??l??k
         */
        MorphologicalTag_1.MorphologicalTag.NESS,
        /**
         * 1st person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A1PL,
        /**
         * 1st person singular agreement : Ben giderim
         */
        MorphologicalTag_1.MorphologicalTag.A1SG,
        /**
         * Infinitive2 : Yapma
         */
        MorphologicalTag_1.MorphologicalTag.INFINITIVE2,
        /**
         * Negative : Yapama
         */
        MorphologicalTag_1.MorphologicalTag.NEGATIVE,
        /**
         * Act of : Aldatmaca
         */
        MorphologicalTag_1.MorphologicalTag.ACTOF,
        /**
         * Without having done so : ??akt??rmadan
         */
        MorphologicalTag_1.MorphologicalTag.WITHOUTHAVINGDONESO,
        /**
         * Infinitive : Yapmak
         */
        MorphologicalTag_1.MorphologicalTag.INFINITIVE,
        /**
         * Without having done so
         */
        MorphologicalTag_1.MorphologicalTag.WITHOUTHAVINGDONESO,
        /**
         * Progressive2 : G??rmekte
         */
        MorphologicalTag_1.MorphologicalTag.PROGRESSIVE2,
        /**
         * Necessity : Yapmal??
         */
        MorphologicalTag_1.MorphologicalTag.NECESSITY,
        /**
         * Notable state : Anla????lmazl??k
         */
        MorphologicalTag_1.MorphologicalTag.NOTABLESTATE,
        /**
         * Narrative Narrative Past Tense : Olu??mu??
         */
        MorphologicalTag_1.MorphologicalTag.NARRATIVE,
        /**
         * 2nd person singuular agreement : Sen gelirsin
         */
        MorphologicalTag_1.MorphologicalTag.A2SG,
        /**
         * Passive
         */
        MorphologicalTag_1.MorphologicalTag.PASSIVE,
        /**
         * Dative case : Bana
         */
        MorphologicalTag_1.MorphologicalTag.DATIVE,
        /**
         * Equative
         */
        MorphologicalTag_1.MorphologicalTag.EQUATIVE,
        /**
         * Locative
         */
        MorphologicalTag_1.MorphologicalTag.LOCATIVE,
        /**
         * Ablative
         */
        MorphologicalTag_1.MorphologicalTag.ABLATIVE,
        /**
         * Accusat??ve : Beni
         */
        MorphologicalTag_1.MorphologicalTag.ACCUSATIVE,
        /**
         * Genitive : Benim
         */
        MorphologicalTag_1.MorphologicalTag.GENITIVE,
        /**
         * 2nd person plural agreement : Siz gelirsiniz
         */
        MorphologicalTag_1.MorphologicalTag.A2PL,
        /**
         * 3rd person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A3PL,
        /**
         * Desire/Past Auxiliary : ????karsa
         */
        MorphologicalTag_1.MorphologicalTag.DESIRE,
        /**
         * Related to : Davran????sal
         */
        MorphologicalTag_1.MorphologicalTag.RELATED,
        /**
         * 3rd person singular possessive
         */
        MorphologicalTag_1.MorphologicalTag.P3SG,
        /**
         * Just like : Destans??
         */
        MorphologicalTag_1.MorphologicalTag.JUSTLIKE,
        /**
         * Almost : Dikensi
         */
        MorphologicalTag_1.MorphologicalTag.ALMOST,
        /**
         * 2nd person singular agreement
         */
        MorphologicalTag_1.MorphologicalTag.A2SG,
        /**
         * 2nd person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A2PL,
        /**
         * 3rd person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A3PL,
        /**
         * Without : Diki??siz
         */
        MorphologicalTag_1.MorphologicalTag.WITHOUT,
        /**
         * Distributive : alt????ar
         */
        MorphologicalTag_1.MorphologicalTag.DISTRIBUTIVE,
        /**
         * Causitive form
         */
        MorphologicalTag_1.MorphologicalTag.CAUSATIVE,
        /**
         * Dative case
         */
        MorphologicalTag_1.MorphologicalTag.DATIVE,
        /**
         * Optative : Do??anaya
         */
        MorphologicalTag_1.MorphologicalTag.OPTATIVE,
        /**
         * Ability, possibility : Olabilir
         */
        MorphologicalTag_1.MorphologicalTag.ABLE,
        /**
         * Future participle : G??lecek
         */
        MorphologicalTag_1.MorphologicalTag.FUTUREPARTICIPLE,
        /**
         * Future : Ya??acak
         */
        MorphologicalTag_1.MorphologicalTag.FUTURE,
        /**
         * Continuous : Yapadur
         */
        MorphologicalTag_1.MorphologicalTag.REPEAT,
        /**
         * Ever since : ????kagel
         */
        MorphologicalTag_1.MorphologicalTag.EVERSINCE,
        /**
         * Since doing so : Amasyal??
         */
        MorphologicalTag_1.MorphologicalTag.SINCEDOINGSO,
        /**
         * Not able state : Anla????lmazl??k
         */
        MorphologicalTag_1.MorphologicalTag.NOTABLESTATE,
        /**
         * W??thout be??ng able to have done so: kararlamadan
         */
        MorphologicalTag_1.MorphologicalTag.WITHOUTBEINGABLETOHAVEDONESO,
        /**
         * Present participle : Sar??lan
         */
        MorphologicalTag_1.MorphologicalTag.PRESENTPARTICIPLE,
        /**
         * By doing so : Z??playarak
         */
        MorphologicalTag_1.MorphologicalTag.BYDOINGSO,
        /**
         * Projection : ??p??lesi
         */
        MorphologicalTag_1.MorphologicalTag.FEELLIKE,
        /**
         * Past tense : Gitti
         */
        MorphologicalTag_1.MorphologicalTag.PASTTENSE,
        /**
         * Accusative
         */
        MorphologicalTag_1.MorphologicalTag.ACCUSATIVE,
        /**
         * Agent
         */
        MorphologicalTag_1.MorphologicalTag.AGENT,
        /**
         * 1st person singular agreement
         */
        MorphologicalTag_1.MorphologicalTag.A1SG,
        /**
         * 2nd person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A2PL,
        /**
         * When : Okuyunca
         */
        MorphologicalTag_1.MorphologicalTag.WHEN,
        /**
         * After doing so : Yap??p
         */
        MorphologicalTag_1.MorphologicalTag.AFTERDOINGSO,
        /**
         * Infinitive : Yap????
         */
        MorphologicalTag_1.MorphologicalTag.INFINITIVE3,
        /**
         * Hastility : Yap??ver
         */
        MorphologicalTag_1.MorphologicalTag.HASTILY,
        /**
         * 1st person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A1PL,
        /**
         * While : Gelirken
         */
        MorphologicalTag_1.MorphologicalTag.WHILE,
        /**
         * Instrumental : K??????n, arabayla
         */
        MorphologicalTag_1.MorphologicalTag.INSTRUMENTAL,
        /**
         * Narrative
         */
        MorphologicalTag_1.MorphologicalTag.NARRATIVE,
        /**
         * Conditional : Gelirse
         */
        MorphologicalTag_1.MorphologicalTag.CONDITIONAL,
        /**
         * 3rd person singuular agreement : O gelir
         */
        MorphologicalTag_1.MorphologicalTag.A3SG,
        /**
         * 2nd person singuular agreement
         */
        MorphologicalTag_1.MorphologicalTag.A2SG,
        /**
         * 2nd person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A2PL,
        /**
         * 3rd person plural agreement
         */
        MorphologicalTag_1.MorphologicalTag.A3PL,
        /**
         * Stay : Bakakal
         */
        MorphologicalTag_1.MorphologicalTag.STAY,
        /**
         * Start : Al??koy
         */
        MorphologicalTag_1.MorphologicalTag.START,
        /**
         * Repeat : Yapag??r
         */
        MorphologicalTag_1.MorphologicalTag.REPEAT
    ];
});
//# sourceMappingURL=MetamorphicParse.js.map