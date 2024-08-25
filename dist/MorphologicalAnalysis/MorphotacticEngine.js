(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-dictionary/dist/Dictionary/Word", "nlptoolkit-dictionary/dist/Language/TurkishLanguage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MorphotacticEngine = void 0;
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    const TurkishLanguage_1 = require("nlptoolkit-dictionary/dist/Language/TurkishLanguage");
    class MorphotacticEngine {
        /**
         * resolveD resolves the D metamorpheme to 'd' or 't' depending on the root and current formationToCheck. It adds
         * 'd' if the root is an abbreviation; 't' if the last phoneme is one of the "çfhkpsşt" (fıstıkçı şahap) or 'd'
         * otherwise; 't' if the word is a number ending with 3, 4, 5, 40, 60, or 70 or 'd' otherwise.
         * @param root Root of the word
         * @param formation Formation is current status of the wordform in the current state of the finite state machine. It
         *                  is always equal to formationToCheck except the case where there is an apostrophe after the
         *                  formationToCheck such as (3').
         * @param formationToCheck FormationToCheck is current status of the wordform in the current state of the finite
         *                         state machine except the apostrophe at the end if it exists.
         * @return Formation with added 'd' or 't' character.
         */
        static resolveD(root, formation, formationToCheck) {
            if (root.isAbbreviation()) {
                return formation + 'd';
            }
            if (Word_1.Word.lastPhoneme(formationToCheck) >= '0' && Word_1.Word.lastPhoneme(formationToCheck) <= '9') {
                switch (Word_1.Word.lastPhoneme(formationToCheck)) {
                    case '3':
                    case '4':
                    case '5':
                        //3->3'tü, 5->5'ti, 4->4'tü
                        return formation + 't';
                    case '0':
                        if (root.getName().endsWith("40") || root.getName().endsWith("60") || root.getName().endsWith("70"))
                            //40->40'tı, 60->60'tı, 70->70'ti
                            return formation + 't';
                        else
                            //30->30'du, 50->50'ydi, 80->80'di
                            return formation + 'd';
                    default:
                        return formation + 'd';
                }
            }
            else {
                if (TurkishLanguage_1.TurkishLanguage.isSertSessiz(Word_1.Word.lastPhoneme(formationToCheck))) {
                    //yap+DH->yaptı
                    return formation + 't';
                }
                else {
                    //sar+DH->sardı
                    return formation + 'd';
                }
            }
        }
        /**
         * resolveA resolves the A metamorpheme to 'a' or 'e' depending on the root and current formationToCheck. It adds
         * 'e' if the root is an abbreviation; 'a' if the last vowel is a back vowel (except words that do not obey vowel
         * harmony during agglutination); 'e' if the last vowel is a front vowel (except words that do not obey vowel
         * harmony during agglutination); 'a' if the word is a number ending with 6, 9, 10, 30, 40, 60, or 90 or 'e'
         * otherwise.
         * @param root Root of the word
         * @param formation Formation is current status of the wordform in the current state of the finite state machine. It
         *                  is always equal to formationToCheck except the case where there is an apostrophe after the
         *                  formationToCheck such as (3').
         * @param rootWord True if the current word form is root form, false otherwise.
         * @param formationToCheck FormationToCheck is current status of the wordform in the current state of the finite
         *                         state machine except the apostrophe at the end if it exists.
         * @return Formation with added 'a' or 'e' character.
         */
        static resolveA(root, formation, rootWord, formationToCheck) {
            if (root.isAbbreviation()) {
                return formation + 'e';
            }
            if (Word_1.Word.lastVowel(formationToCheck) >= '0' && Word_1.Word.lastVowel(formationToCheck) <= '9') {
                switch (Word_1.Word.lastVowel(formationToCheck)) {
                    case '6':
                    case '9':
                        //6'ya, 9'a
                        return formation + 'a';
                    case '0':
                        if (root.getName().endsWith("10") || root.getName().endsWith("30") || root.getName().endsWith("40") ||
                            root.getName().endsWith("60") || root.getName().endsWith("90"))
                            //10'a, 30'a, 40'a, 60'a, 90'a
                            return formation + 'a';
                        else
                            //20'ye, 50'ye, 80'e, 70'e
                            return formation + 'e';
                    default:
                        //3'e, 8'e, 4'e, 2'ye
                        return formation + 'e';
                }
            }
            if (TurkishLanguage_1.TurkishLanguage.isBackVowel(Word_1.Word.lastVowel(formationToCheck))) {
                if (root.notObeysVowelHarmonyDuringAgglutination() && rootWord) {
                    //alkole, anormale
                    return formation + 'e';
                }
                else {
                    //sakala, kabala
                    return formation + 'a';
                }
            }
            if (TurkishLanguage_1.TurkishLanguage.isFrontVowel(Word_1.Word.lastVowel(formationToCheck))) {
                if (root.notObeysVowelHarmonyDuringAgglutination() && rootWord) {
                    //faika, halika
                    return formation + 'a';
                }
                else {
                    //kediye, eve
                    return formation + 'e';
                }
            }
            if (root.isNumeral() || root.isFraction() || root.isReal()) {
                if (root.getName().endsWith("6") || root.getName().endsWith("9") || root.getName().endsWith("10") ||
                    root.getName().endsWith("30") || root.getName().endsWith("40") || root.getName().endsWith("60") ||
                    root.getName().endsWith("90")) {
                    return formation + 'a';
                }
                else {
                    return formation + 'e';
                }
            }
            return formation;
        }
        /**
         * resolveH resolves the H metamorpheme to 'ı', 'i', 'u' or 'ü', depending on the  current formationToCheck, root,
         * and formation. It adds 'i' if the root is an abbreviation; 'ü' if the  character before the last vowel is
         * front rounded (or back rounded when the root word does not obey vowel harmony during agglutination); 'i' if the
         * character before the last vowel is front unrounded; 'u' if the character before the  last vowel is back rounded;
         * 'ı' if the character before the last vowel is back unrounded (or front unrounded when the root word does not obey
         * vowel harmony during agglutination); 'ı' if the word is a  number ending with 6, 40, 60 or 90; 'ü' if the word
         * is a number ending with 3, 4, or 00; 'u' if the word is a number ending with 9, 10, or 30; 'i' otherwise for
         * numbers. Special case for 'Hyor' suffix is handled with resolveHforSpecialCaseTenseSuffix method.
         * @param root Root of the word
         * @param formation Formation is current status of the wordform in the current state of the finite state machine. It
         *                  is always equal to formationToCheck except the case where there is an apostrophe after the
         *                  formationToCheck such as (3').
         * @param beginningOfSuffix True if H appears in the beginning of the suffix, false otherwise.
         * @param specialCaseTenseSuffix True if the suffix is 'Hyor', false otherwise.
         * @param rootWord True if the current word form is root form, false otherwise.
         * @param formationToCheck FormationToCheck is current status of the word form in the current state of the finite
         *                         state machine except the apostrophe at the end if it exists.
         * @return Formation with possibly last character dropped and 'ı', 'i', 'u' or 'ü' character added.
         */
        static resolveH(root, formation, beginningOfSuffix, specialCaseTenseSuffix, rootWord, formationToCheck) {
            if (root.isAbbreviation())
                return formation + 'i';
            if (beginningOfSuffix && TurkishLanguage_1.TurkishLanguage.isVowel(Word_1.Word.lastPhoneme(formationToCheck)) &&
                !specialCaseTenseSuffix) {
                return formation;
            }
            if (specialCaseTenseSuffix) {
                //eğer ek Hyor eki ise,
                if (rootWord) {
                    if (root.vowelAChangesToIDuringYSuffixation()) {
                        if (TurkishLanguage_1.TurkishLanguage.isFrontRoundedVowel(Word_1.Word.beforeLastVowel(formationToCheck))) {
                            //büyülüyor, bölümlüyor, çözümlüyor, döşüyor
                            return formation.substring(0, formation.length - 1) + 'ü';
                        }
                        if (TurkishLanguage_1.TurkishLanguage.isFrontUnroundedVowel(Word_1.Word.beforeLastVowel(formationToCheck))) {
                            //adresliyor, alevliyor, ateşliyor, bekliyor
                            return formation.substring(0, formation.length - 1) + 'i';
                        }
                        if (TurkishLanguage_1.TurkishLanguage.isBackRoundedVowel(Word_1.Word.beforeLastVowel(formationToCheck))) {
                            //buğuluyor, bulguluyor, çamurluyor, aforozluyor
                            return formation.substring(0, formation.length - 1) + 'u';
                        }
                        if (TurkishLanguage_1.TurkishLanguage.isBackUnroundedVowel(Word_1.Word.beforeLastVowel(formationToCheck))) {
                            //açıklıyor, çalkalıyor, gazlıyor, gıcırdıyor
                            return formation.substring(0, formation.length - 1) + 'ı';
                        }
                    }
                }
                if (TurkishLanguage_1.TurkishLanguage.isVowel(Word_1.Word.lastPhoneme(formationToCheck))) {
                    if (TurkishLanguage_1.TurkishLanguage.isFrontRoundedVowel(Word_1.Word.beforeLastVowel(formationToCheck))) {
                        return formation.substring(0, formation.length - 1) + 'ü';
                    }
                    if (TurkishLanguage_1.TurkishLanguage.isFrontUnroundedVowel(Word_1.Word.beforeLastVowel(formationToCheck))) {
                        return formation.substring(0, formation.length - 1) + 'i';
                    }
                    if (TurkishLanguage_1.TurkishLanguage.isBackRoundedVowel(Word_1.Word.beforeLastVowel(formationToCheck))) {
                        return formation.substring(0, formation.length - 1) + 'u';
                    }
                    if (TurkishLanguage_1.TurkishLanguage.isBackUnroundedVowel(Word_1.Word.beforeLastVowel(formationToCheck))) {
                        return formation.substring(0, formation.length - 1) + 'ı';
                    }
                }
            }
            if (TurkishLanguage_1.TurkishLanguage.isFrontRoundedVowel(Word_1.Word.lastVowel(formationToCheck)) ||
                (TurkishLanguage_1.TurkishLanguage.isBackRoundedVowel(Word_1.Word.lastVowel(formationToCheck)) && root.notObeysVowelHarmonyDuringAgglutination())) {
                return formation + 'ü';
            }
            if ((TurkishLanguage_1.TurkishLanguage.isFrontUnroundedVowel(Word_1.Word.lastVowel(formationToCheck)) && (!root.notObeysVowelHarmonyDuringAgglutination() || !rootWord)) ||
                ((Word_1.Word.lastVowel(formationToCheck) == 'a' || Word_1.Word.lastVowel(formationToCheck) == 'â') && root.notObeysVowelHarmonyDuringAgglutination())) {
                return formation + 'i';
            }
            if (TurkishLanguage_1.TurkishLanguage.isBackRoundedVowel(Word_1.Word.lastVowel(formationToCheck))) {
                return formation + 'u';
            }
            if (TurkishLanguage_1.TurkishLanguage.isBackUnroundedVowel(Word_1.Word.lastVowel(formationToCheck)) || (TurkishLanguage_1.TurkishLanguage.isFrontUnroundedVowel(Word_1.Word.lastVowel(formationToCheck)) && root.notObeysVowelHarmonyDuringAgglutination())) {
                return formation + 'ı';
            }
            if (root.isNumeral() || root.isFraction() || root.isReal()) {
                if (root.getName().endsWith("6") || root.getName().endsWith("40") || root.getName().endsWith("60") ||
                    root.getName().endsWith("90")) {
                    //6'yı, 40'ı, 60'ı
                    return formation + 'ı';
                }
                else {
                    if (root.getName().endsWith("3") || root.getName().endsWith("4") || root.getName().endsWith("00")) {
                        //3'ü, 4'ü, 100'ü
                        return formation + 'ü';
                    }
                    else {
                        if (root.getName().endsWith("9") || root.getName().endsWith("10") || root.getName().endsWith("30")) {
                            //9'u, 10'u, 30'u
                            return formation + 'u';
                        }
                        else {
                            //2'yi, 5'i, 8'i
                            return formation + 'i';
                        }
                    }
                }
            }
            return formation;
        }
        /**
         * The resolveC method takes a {@link String} formation as an input. If the last phoneme is on of the "çfhkpsşt", it
         * concatenates given formation with 'ç', if not it concatenates given formation with 'c'.
         *
         * @param formation {@link String} input.
         * @param formationToCheck {@link String} input.
         * @return resolved String.
         */
        static resolveC(formation, formationToCheck) {
            if (TurkishLanguage_1.TurkishLanguage.isSertSessiz(Word_1.Word.lastPhoneme(formationToCheck))) {
                return formation + 'ç';
            }
            else {
                return formation + 'c';
            }
        }
        /**
         * The resolveS method takes a {@link String} formation as an input. It then concatenates given formation with 's'.
         *
         * @param formation {@link String} input.
         * @return resolved String.
         */
        static resolveS(formation) {
            return formation + 's';
        }
        /**
         * The resolveSh method takes a {@link String} formation as an input. If the last character is a vowel, it concatenates
         * given formation with ş, if the last character is not a vowel, and not 't' it directly returns given formation, but if it
         * is equal to 't', it transforms it to 'd'.
         *
         * @param formation {@link String} input.
         * @return resolved String.
         */
        static resolveSh(formation) {
            if (TurkishLanguage_1.TurkishLanguage.isVowel(formation.charAt(formation.length - 1))) {
                return formation + 'ş';
            }
            else {
                if (formation.charAt(formation.length - 1) != 't')
                    return formation;
                else
                    return formation.substring(0, formation.length - 1) + 'd';
            }
        }
    }
    exports.MorphotacticEngine = MorphotacticEngine;
});
//# sourceMappingURL=MorphotacticEngine.js.map