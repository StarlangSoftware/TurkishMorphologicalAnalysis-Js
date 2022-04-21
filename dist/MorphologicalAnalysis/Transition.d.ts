import { State } from "./State";
import { TxtWord } from "nlptoolkit-dictionary/dist/Dictionary/TxtWord";
import { FsmParse } from "./FsmParse";
export declare class Transition {
    private readonly _toState;
    private readonly _with;
    private readonly withName;
    private formationToCheck;
    private readonly _toPos;
    /**
     * Another constructor of {@link Transition} class which takes  a {@link State}, and three {@link String}s as input. Then it
     * initializes toState, with, withName and toPos variables with given inputs.
     *
     * @param toState  {@link State} input.
     * @param _with     String input.
     * @param withName String input.
     * @param toPos    String input.
     */
    constructor(_with: string, withName?: string, toState?: State, toPos?: string);
    /**
     * Getter for the toState variable.
     *
     * @return toState variable.
     */
    toState(): State;
    /**
     * Getter for the toPos variable.
     *
     * @return toPos variable.
     */
    toPos(): string;
    /**
     * The transitionPossible method takes two {@link String} as inputs; currentSurfaceForm and realSurfaceForm. If the
     * length of the given currentSurfaceForm is greater than the given realSurfaceForm, it directly returns true. If not,
     * it takes a substring from given realSurfaceForm with the size of currentSurfaceForm. Then checks for the characters of
     * with variable.
     * <p>
     * If the character of with that makes transition is C, it returns true if the substring contains c or ç.
     * If the character of with that makes transition is D, it returns true if the substring contains d or t.
     * If the character of with that makes transition is A, it returns true if the substring contains a or e.
     * If the character of with that makes transition is K, it returns true if the substring contains k, g or ğ.
     * If the character of with that makes transition is other than the ones above, it returns true if the substring
     * contains the same character as with.
     *
     * @param currentSurfaceForm {@link String} input.
     * @param realSurfaceForm    {@link String} input.
     * @return true when the transition is possible according to Turkish grammar, false otherwise.
     */
    transitionPossible(currentSurfaceForm: string, realSurfaceForm: string): boolean;
    /**
     * The transitionPossible method takes a {@link FsmParse} currentFsmParse as an input. It then checks some special cases;
     *
     * @param currentFsmParse Parse to be checked
     * @return true if transition is possible false otherwise
     */
    transitionPossibleFromParse(currentFsmParse: FsmParse): boolean;
    transitionPossibleFromRoot(root: TxtWord, fromState: State): boolean;
    /**
     * The withFirstChar method returns the first character of the with variable.
     *
     * @return the first character of the with variable.
     */
    private withFirstChar;
    /**
     * The startWithVowelorConsonantDrops method checks for some cases. If the first character of with variable is "nsy",
     * and with variable does not equal to one of the Strings; "ylA, ysA, ymHs, yDH, yken", it returns true. If
     * <p>
     * Or, if the first character of with variable is 'A, H: or any other vowels, it returns true.
     *
     * @return true if it starts with vowel or consonant drops, false otherwise.
     */
    private startWithVowelorConsonantDrops;
    /**
     * The softenDuringSuffixation method takes a {@link TxtWord} root as an input. It checks two cases; first case returns
     * true if the given root is nominal or adjective and has one of the flags "IS_SD, IS_B_SD, IS_SDD" and with variable
     * equals o one of the Strings "Hm, nDAn, ncA, nDA, yA, yHm, yHz, yH, nH, nA, nHn, H, sH, Hn, HnHz, HmHz".
     * <p>
     * And the second case returns true if the given root is verb and has the "F_SD" flag, also with variable starts with
     * "Hyor" or equals one of the Strings "yHs, yAn, yA, yAcAk, yAsH, yHncA, yHp, yAlH, yArAk, yAdur, yHver, yAgel, yAgor,
     * yAbil, yAyaz, yAkal, yAkoy, yAmA, yHcH, HCH, Hr, Hs, Hn, yHn", yHnHz, Ar, Hl").
     *
     * @param root {@link TxtWord} input.
     * @return true if there is softening during suffixation of the given root, false otherwise.
     */
    softenDuringSuffixation(root: TxtWord): boolean;
    /**
     * The makeTransition method takes a {@link TxtWord} root and s {@link String} stem as inputs. If given root is a verb,
     * it makes transition with given root and stem with the verbal root state. If given root is not verb, it makes transition
     * with given root and stem and the nominal root state.
     *
     * @param root {@link TxtWord} input.
     * @param stem String input.
     * @param startState Start state to make the transition.
     * @return String type output that has the transition.
     */
    makeTransition(root: TxtWord, stem: string, startState?: State): string;
    /**
     * An overridden toString method which returns the with variable.
     *
     * @return with variable.
     */
    toString(): string;
    /**
     * The with method returns the withName variable.
     *
     * @return the withName variable.
     */
    getWith(): string;
}
