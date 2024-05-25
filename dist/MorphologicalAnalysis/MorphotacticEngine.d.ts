import { TxtWord } from "nlptoolkit-dictionary/dist/Dictionary/TxtWord";
export declare class MorphotacticEngine {
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
    static resolveD(root: TxtWord, formation: string, formationToCheck: string): string;
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
    static resolveA(root: TxtWord, formation: string, rootWord: boolean, formationToCheck: string): string;
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
    static resolveH(root: TxtWord, formation: string, beginningOfSuffix: boolean, specialCaseTenseSuffix: boolean, rootWord: boolean, formationToCheck: string): string;
    /**
     * The resolveC method takes a {@link String} formation as an input. If the last phoneme is on of the "çfhkpsşt", it
     * concatenates given formation with 'ç', if not it concatenates given formation with 'c'.
     *
     * @param formation {@link String} input.
     * @param formationToCheck {@link String} input.
     * @return resolved String.
     */
    static resolveC(formation: string, formationToCheck: string): string;
    /**
     * The resolveS method takes a {@link String} formation as an input. It then concatenates given formation with 's'.
     *
     * @param formation {@link String} input.
     * @return resolved String.
     */
    static resolveS(formation: string): string;
    /**
     * The resolveSh method takes a {@link String} formation as an input. If the last character is a vowel, it concatenates
     * given formation with ş, if the last character is not a vowel, and not 't' it directly returns given formation, but if it
     * is equal to 't', it transforms it to 'd'.
     *
     * @param formation {@link String} input.
     * @return resolved String.
     */
    static resolveSh(formation: string): string;
}
