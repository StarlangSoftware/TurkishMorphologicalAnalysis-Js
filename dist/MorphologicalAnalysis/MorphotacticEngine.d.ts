import { TxtWord } from "nlptoolkit-dictionary/dist/Dictionary/TxtWord";
export declare class MorphotacticEngine {
    static resolveD(root: TxtWord, formation: string, formationToCheck: string): string;
    static resolveA(root: TxtWord, formation: string, rootWord: boolean, formationToCheck: string): string;
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
