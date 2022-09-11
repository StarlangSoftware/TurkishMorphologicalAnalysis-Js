(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MorphologicalTag = void 0;
    var MorphologicalTag;
    (function (MorphologicalTag) {
        /**
         * Noun : Alengir
         */
        MorphologicalTag[MorphologicalTag["NOUN"] = 0] = "NOUN";
        /**
         * Adverb : Alelacele
         */
        MorphologicalTag[MorphologicalTag["ADVERB"] = 1] = "ADVERB";
        /**
         * Adjective : Alengirli
         */
        MorphologicalTag[MorphologicalTag["ADJECTIVE"] = 2] = "ADJECTIVE";
        /**
         * Verb : Alıkoy
         */
        MorphologicalTag[MorphologicalTag["VERB"] = 3] = "VERB";
        /**
         * 1st person singular agreement : Ben gelirim
         */
        MorphologicalTag[MorphologicalTag["A1SG"] = 4] = "A1SG";
        /**
         * 2nd person singular agreement : Sen gelirsin
         */
        MorphologicalTag[MorphologicalTag["A2SG"] = 5] = "A2SG";
        /**
         * 3rd person singular agreement : O gelir
         */
        MorphologicalTag[MorphologicalTag["A3SG"] = 6] = "A3SG";
        /**
         * 1st person plural agreement : Biz geliriz
         */
        MorphologicalTag[MorphologicalTag["A1PL"] = 7] = "A1PL";
        /**
         * 2nd person plural agreement : Siz gelirsiniz
         */
        MorphologicalTag[MorphologicalTag["A2PL"] = 8] = "A2PL";
        /**
         * 3rd person plural agreement : Onlar gelirler
         */
        MorphologicalTag[MorphologicalTag["A3PL"] = 9] = "A3PL";
        /**
         * 1st person singular possessive : Benim
         */
        MorphologicalTag[MorphologicalTag["P1SG"] = 10] = "P1SG";
        /**
         * 2nd person singular possessive :Senin
         */
        MorphologicalTag[MorphologicalTag["P2SG"] = 11] = "P2SG";
        /**
         * 3rd person singular possessive : Onun
         */
        MorphologicalTag[MorphologicalTag["P3SG"] = 12] = "P3SG";
        /**
         * 1st person plural possessive :  Bizim
         */
        MorphologicalTag[MorphologicalTag["P1PL"] = 13] = "P1PL";
        /**
         * 2nd person plural possessive : Sizin
         */
        MorphologicalTag[MorphologicalTag["P2PL"] = 14] = "P2PL";
        /**
         * 3rd person plural possessive : Onların
         */
        MorphologicalTag[MorphologicalTag["P3PL"] = 15] = "P3PL";
        /**
         * Proper noun : John
         */
        MorphologicalTag[MorphologicalTag["PROPERNOUN"] = 16] = "PROPERNOUN";
        /**
         * None possessive : Ev
         */
        MorphologicalTag[MorphologicalTag["PNON"] = 17] = "PNON";
        /**
         * Nominative Case : Kedi uyuyor.
         */
        MorphologicalTag[MorphologicalTag["NOMINATIVE"] = 18] = "NOMINATIVE";
        /**
         * With : Kalemle
         */
        MorphologicalTag[MorphologicalTag["WITH"] = 19] = "WITH";
        /**
         * Without : Dikişsiz
         */
        MorphologicalTag[MorphologicalTag["WITHOUT"] = 20] = "WITHOUT";
        /**
         * Accusatıve : Beni
         */
        MorphologicalTag[MorphologicalTag["ACCUSATIVE"] = 21] = "ACCUSATIVE";
        /**
         * Dative case : Bana
         */
        MorphologicalTag[MorphologicalTag["DATIVE"] = 22] = "DATIVE";
        /**
         * Genitive : Benim
         */
        MorphologicalTag[MorphologicalTag["GENITIVE"] = 23] = "GENITIVE";
        /**
         * Ablative : Okuldan
         */
        MorphologicalTag[MorphologicalTag["ABLATIVE"] = 24] = "ABLATIVE";
        /**
         * Perosnal pronoun : O
         */
        MorphologicalTag[MorphologicalTag["PERSONALPRONOUN"] = 25] = "PERSONALPRONOUN";
        /**
         * Zero Derivation : Kırmızıydı
         */
        MorphologicalTag[MorphologicalTag["ZERO"] = 26] = "ZERO";
        /**
         * Ability, possibility : Olabilir
         */
        MorphologicalTag[MorphologicalTag["ABLE"] = 27] = "ABLE";
        /**
         * Negative : Yapama
         */
        MorphologicalTag[MorphologicalTag["NEGATIVE"] = 28] = "NEGATIVE";
        /**
         * Past tense : Gitti
         */
        MorphologicalTag[MorphologicalTag["PASTTENSE"] = 29] = "PASTTENSE";
        /**
         * Conjunction or disjunction : Ama, ise
         */
        MorphologicalTag[MorphologicalTag["CONJUNCTION"] = 30] = "CONJUNCTION";
        /**
         * Determiner : Birtakım
         */
        MorphologicalTag[MorphologicalTag["DETERMINER"] = 31] = "DETERMINER";
        /**
         * Duplication : Çıtır çıtır
         */
        MorphologicalTag[MorphologicalTag["DUPLICATION"] = 32] = "DUPLICATION";
        /**
         * Interjection : Agucuk
         */
        MorphologicalTag[MorphologicalTag["INTERJECTION"] = 33] = "INTERJECTION";
        /**
         * Number : bir
         */
        MorphologicalTag[MorphologicalTag["NUMBER"] = 34] = "NUMBER";
        /**
         * Post posıtıon : Atfen
         */
        MorphologicalTag[MorphologicalTag["POSTPOSITION"] = 35] = "POSTPOSITION";
        /**
         * Punctuation : +
         */
        MorphologicalTag[MorphologicalTag["PUNCTUATION"] = 36] = "PUNCTUATION";
        /**
         * Question : Mı
         */
        MorphologicalTag[MorphologicalTag["QUESTION"] = 37] = "QUESTION";
        /**
         * Agent : Toplayıcı
         */
        MorphologicalTag[MorphologicalTag["AGENT"] = 38] = "AGENT";
        /**
         * By doing so : Zıplayarak
         */
        MorphologicalTag[MorphologicalTag["BYDOINGSO"] = 39] = "BYDOINGSO";
        /**
         * Cardinal : yüz, bin
         */
        MorphologicalTag[MorphologicalTag["CARDINAL"] = 40] = "CARDINAL";
        /**
         * Causative Form : Pişirmek
         */
        MorphologicalTag[MorphologicalTag["CAUSATIVE"] = 41] = "CAUSATIVE";
        /**
         * Demonstrative pronoun : Bu, şu
         */
        MorphologicalTag[MorphologicalTag["DEMONSTRATIVEPRONOUN"] = 42] = "DEMONSTRATIVEPRONOUN";
        /**
         * Distributive : altışar
         */
        MorphologicalTag[MorphologicalTag["DISTRIBUTIVE"] = 43] = "DISTRIBUTIVE";
        /**
         * Fit for : Ahmetlik
         */
        MorphologicalTag[MorphologicalTag["FITFOR"] = 44] = "FITFOR";
        /**
         * Future participle : Gülecek
         */
        MorphologicalTag[MorphologicalTag["FUTUREPARTICIPLE"] = 45] = "FUTUREPARTICIPLE";
        /**
         * Infinitive : Biri
         */
        MorphologicalTag[MorphologicalTag["INFINITIVE"] = 46] = "INFINITIVE";
        /**
         * Ness : Ağırbaşlılık
         */
        MorphologicalTag[MorphologicalTag["NESS"] = 47] = "NESS";
        /**
         * Ordinal Number : Altıncı
         */
        MorphologicalTag[MorphologicalTag["ORDINAL"] = 48] = "ORDINAL";
        /**
         * Passive : Açıldı
         */
        MorphologicalTag[MorphologicalTag["PASSIVE"] = 49] = "PASSIVE";
        /**
         * Past participle : Kırılmış
         */
        MorphologicalTag[MorphologicalTag["PASTPARTICIPLE"] = 50] = "PASTPARTICIPLE";
        /**
         * Present partıcıple : Sarılan
         */
        MorphologicalTag[MorphologicalTag["PRESENTPARTICIPLE"] = 51] = "PRESENTPARTICIPLE";
        /**
         * Question pronoun : Kim
         */
        MorphologicalTag[MorphologicalTag["QUESTIONPRONOUN"] = 52] = "QUESTIONPRONOUN";
        /**
         * Quantitative pronoun : Each
         */
        MorphologicalTag[MorphologicalTag["QUANTITATIVEPRONOUN"] = 53] = "QUANTITATIVEPRONOUN";
        /**
         * Range : 1 - 3
         */
        MorphologicalTag[MorphologicalTag["RANGE"] = 54] = "RANGE";
        /**
         * Ratio : 1/2
         */
        MorphologicalTag[MorphologicalTag["RATIO"] = 55] = "RATIO";
        /**
         * Real : 1.0
         */
        MorphologicalTag[MorphologicalTag["REAL"] = 56] = "REAL";
        /**
         * Reciprocal verb : Görüşmek
         */
        MorphologicalTag[MorphologicalTag["RECIPROCAL"] = 57] = "RECIPROCAL";
        /**
         * Reflexive : Kendi
         */
        MorphologicalTag[MorphologicalTag["REFLEXIVE"] = 58] = "REFLEXIVE";
        /**
         * Reflexive pronoun : Kendim
         */
        MorphologicalTag[MorphologicalTag["REFLEXIVEPRONOUN"] = 59] = "REFLEXIVEPRONOUN";
        /**
         * Time : 14:28
         */
        MorphologicalTag[MorphologicalTag["TIME"] = 60] = "TIME";
        /**
         * When : Okuyunca
         */
        MorphologicalTag[MorphologicalTag["WHEN"] = 61] = "WHEN";
        /**
         * While : Gelirken
         */
        MorphologicalTag[MorphologicalTag["WHILE"] = 62] = "WHILE";
        /**
         * Without having done so : Çaktırmadan
         */
        MorphologicalTag[MorphologicalTag["WITHOUTHAVINGDONESO"] = 63] = "WITHOUTHAVINGDONESO";
        /**
         * PC ablative : Başka
         */
        MorphologicalTag[MorphologicalTag["PCABLATIVE"] = 64] = "PCABLATIVE";
        /***
         * PC accusative : Takiben
         */
        MorphologicalTag[MorphologicalTag["PCACCUSATIVE"] = 65] = "PCACCUSATIVE";
        /**
         * PC dative : İlişkin
         */
        MorphologicalTag[MorphologicalTag["PCDATIVE"] = 66] = "PCDATIVE";
        /**
         * PC genitive : Yanısıra
         */
        MorphologicalTag[MorphologicalTag["PCGENITIVE"] = 67] = "PCGENITIVE";
        /**
         * PC instrumental : Birlikte
         */
        MorphologicalTag[MorphologicalTag["PCINSTRUMENTAL"] = 68] = "PCINSTRUMENTAL";
        /**
         * PC nominative
         */
        MorphologicalTag[MorphologicalTag["PCNOMINATIVE"] = 69] = "PCNOMINATIVE";
        /**
         * Acquire : Kazanılan
         */
        MorphologicalTag[MorphologicalTag["ACQUIRE"] = 70] = "ACQUIRE";
        /**
         * Act of : Aldatmaca
         */
        MorphologicalTag[MorphologicalTag["ACTOF"] = 71] = "ACTOF";
        /**
         * After doing so : Yapıp
         */
        MorphologicalTag[MorphologicalTag["AFTERDOINGSO"] = 72] = "AFTERDOINGSO";
        /**
         * Almost : Dikensi
         */
        MorphologicalTag[MorphologicalTag["ALMOST"] = 73] = "ALMOST";
        /**
         * As : gibi
         */
        MorphologicalTag[MorphologicalTag["AS"] = 74] = "AS";
        /**
         * As if : Yaşarmışcasına
         */
        MorphologicalTag[MorphologicalTag["ASIF"] = 75] = "ASIF";
        /**
         * Become : Abideleş
         */
        MorphologicalTag[MorphologicalTag["BECOME"] = 76] = "BECOME";
        /**
         * Ever since : Çıkagel
         */
        MorphologicalTag[MorphologicalTag["EVERSINCE"] = 77] = "EVERSINCE";
        /**
         * Projection : Öpülesi
         */
        MorphologicalTag[MorphologicalTag["FEELLIKE"] = 78] = "FEELLIKE";
        /**
         * Hastility : Yapıver
         */
        MorphologicalTag[MorphologicalTag["HASTILY"] = 79] = "HASTILY";
        /**
         * In between : Arasında
         */
        MorphologicalTag[MorphologicalTag["INBETWEEN"] = 80] = "INBETWEEN";
        /**
         * Just like : Destansı
         */
        MorphologicalTag[MorphologicalTag["JUSTLIKE"] = 81] = "JUSTLIKE";
        /**
         * -LY : Akıllıca
         */
        MorphologicalTag[MorphologicalTag["LY"] = 82] = "LY";
        /**
         * Related to : Davranışsal
         */
        MorphologicalTag[MorphologicalTag["RELATED"] = 83] = "RELATED";
        /**
         * Continuous : Yapadur
         */
        MorphologicalTag[MorphologicalTag["REPEAT"] = 84] = "REPEAT";
        /**
         * Since doing so : Amasyalı
         */
        MorphologicalTag[MorphologicalTag["SINCE"] = 85] = "SINCE";
        /**
         * Since doing so : Amasyalı
         */
        MorphologicalTag[MorphologicalTag["SINCEDOINGSO"] = 86] = "SINCEDOINGSO";
        /**
         * Start : Alıkoy
         */
        MorphologicalTag[MorphologicalTag["START"] = 87] = "START";
        /**
         * Stay : Bakakal
         */
        MorphologicalTag[MorphologicalTag["STAY"] = 88] = "STAY";
        /**
         * Equative : Öylece
         */
        MorphologicalTag[MorphologicalTag["EQUATIVE"] = 89] = "EQUATIVE";
        /**
         * Instrumental : Kışın, arabayla
         */
        MorphologicalTag[MorphologicalTag["INSTRUMENTAL"] = 90] = "INSTRUMENTAL";
        /**
         * Aorist Tense : Her hafta sonunda futbol oynarlar.
         */
        MorphologicalTag[MorphologicalTag["AORIST"] = 91] = "AORIST";
        /**
         * Desire/Past Auxiliary : Çıkarsa
         */
        MorphologicalTag[MorphologicalTag["DESIRE"] = 92] = "DESIRE";
        /**
         * Future : Yağacak
         */
        MorphologicalTag[MorphologicalTag["FUTURE"] = 93] = "FUTURE";
        /**
         * Imperative : Otur!
         */
        MorphologicalTag[MorphologicalTag["IMPERATIVE"] = 94] = "IMPERATIVE";
        /**
         * Narrative Past Tense : Oluşmuş
         */
        MorphologicalTag[MorphologicalTag["NARRATIVE"] = 95] = "NARRATIVE";
        /**
         * Necessity : Yapmalı
         */
        MorphologicalTag[MorphologicalTag["NECESSITY"] = 96] = "NECESSITY";
        /**
         * Optative : Doğanaya
         */
        MorphologicalTag[MorphologicalTag["OPTATIVE"] = 97] = "OPTATIVE";
        /**
         * Past tense : Gitti
         */
        MorphologicalTag[MorphologicalTag["PAST"] = 98] = "PAST";
        /**
         * Present partıcıple : Sarılan
         */
        MorphologicalTag[MorphologicalTag["PRESENT"] = 99] = "PRESENT";
        /**
         * Progressive : Görüyorum
         */
        MorphologicalTag[MorphologicalTag["PROGRESSIVE1"] = 100] = "PROGRESSIVE1";
        /**
         * Progressive : Görmekteyim
         */
        MorphologicalTag[MorphologicalTag["PROGRESSIVE2"] = 101] = "PROGRESSIVE2";
        /**
         * Conditional : Gelirse
         */
        MorphologicalTag[MorphologicalTag["CONDITIONAL"] = 102] = "CONDITIONAL";
        /**
         * Copula : Mavidir
         */
        MorphologicalTag[MorphologicalTag["COPULA"] = 103] = "COPULA";
        /**
         * Positive : Gittim
         */
        MorphologicalTag[MorphologicalTag["POSITIVE"] = 104] = "POSITIVE";
        /**
         * Pronoun : Ben
         */
        MorphologicalTag[MorphologicalTag["PRONOUN"] = 105] = "PRONOUN";
        /**
         * Locative : Aşağıda
         */
        MorphologicalTag[MorphologicalTag["LOCATIVE"] = 106] = "LOCATIVE";
        /**
         * Relative : Gelenin
         */
        MorphologicalTag[MorphologicalTag["RELATIVE"] = 107] = "RELATIVE";
        /**
         * Demonstrative : Bu
         */
        MorphologicalTag[MorphologicalTag["DEMONSTRATIVE"] = 108] = "DEMONSTRATIVE";
        /**
         * Infinitive2 : Gitme
         */
        MorphologicalTag[MorphologicalTag["INFINITIVE2"] = 109] = "INFINITIVE2";
        /**
         * Infinitive3 : Gidiş
         */
        MorphologicalTag[MorphologicalTag["INFINITIVE3"] = 110] = "INFINITIVE3";
        /**
         * Sentence beginning header
         */
        MorphologicalTag[MorphologicalTag["BEGINNINGOFSENTENCE"] = 111] = "BEGINNINGOFSENTENCE";
        /**
         * Sentence ending header
         */
        MorphologicalTag[MorphologicalTag["ENDOFSENTENCE"] = 112] = "ENDOFSENTENCE";
        /**
         * Title beginning header
         */
        MorphologicalTag[MorphologicalTag["BEGINNINGOFTITLE"] = 113] = "BEGINNINGOFTITLE";
        /**
         * Title ending header
         */
        MorphologicalTag[MorphologicalTag["ENDOFTITLE"] = 114] = "ENDOFTITLE";
        /**
         * Document beginning header
         */
        MorphologicalTag[MorphologicalTag["BEGINNINGOFDOCUMENT"] = 115] = "BEGINNINGOFDOCUMENT";
        /**
         * Document ending header
         */
        MorphologicalTag[MorphologicalTag["ENDOFDOCUMENT"] = 116] = "ENDOFDOCUMENT";
        /**
         * As long as : Yaşadıkça
         */
        MorphologicalTag[MorphologicalTag["ASLONGAS"] = 117] = "ASLONGAS";
        /**
         * Adamantly
         */
        MorphologicalTag[MorphologicalTag["ADAMANTLY"] = 118] = "ADAMANTLY";
        /**
         * Percent : 15%
         */
        MorphologicalTag[MorphologicalTag["PERCENT"] = 119] = "PERCENT";
        /**
         * Without being able to have done so: kararlamadan
         */
        MorphologicalTag[MorphologicalTag["WITHOUTBEINGABLETOHAVEDONESO"] = 120] = "WITHOUTBEINGABLETOHAVEDONESO";
        /**
         * Dimension : Küçücük
         */
        MorphologicalTag[MorphologicalTag["DIMENSION"] = 121] = "DIMENSION";
        /**
         * Notable state : Anlaşılmazlık
         */
        MorphologicalTag[MorphologicalTag["NOTABLESTATE"] = 122] = "NOTABLESTATE";
        /**
         * Fraction : 1/2
         */
        MorphologicalTag[MorphologicalTag["FRACTION"] = 123] = "FRACTION";
        /**
         * Hash tag : #
         */
        MorphologicalTag[MorphologicalTag["HASHTAG"] = 124] = "HASHTAG";
        /**
         * E-mail : @
         */
        MorphologicalTag[MorphologicalTag["EMAIL"] = 125] = "EMAIL";
        /**
         * Date : 11/06/2018
         */
        MorphologicalTag[MorphologicalTag["DATE"] = 126] = "DATE";
        /**
         * Code : i7-9700K
         */
        MorphologicalTag[MorphologicalTag["CODE"] = 127] = "CODE";
        /**
         * Metric : 6cmx7cmx8cm
         */
        MorphologicalTag[MorphologicalTag["METRIC"] = 128] = "METRIC";
    })(MorphologicalTag = exports.MorphologicalTag || (exports.MorphologicalTag = {}));
});
//# sourceMappingURL=MorphologicalTag.js.map