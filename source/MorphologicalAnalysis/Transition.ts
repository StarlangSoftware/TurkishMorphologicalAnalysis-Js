import {State} from "./State";
import {TxtWord} from "nlptoolkit-dictionary/dist/Dictionary/TxtWord";
import {TurkishLanguage} from "nlptoolkit-dictionary/dist/Language/TurkishLanguage";
import {FsmParse} from "./FsmParse";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {MorphotacticEngine} from "./MorphotacticEngine";

export class Transition {

    private readonly _toState: State = undefined
    private readonly _with: string = undefined
    private readonly withName: string = undefined
    private readonly _toPos: string = undefined

    /**
     * Another constructor of {@link Transition} class which takes  a {@link State}, and three {@link String}s as input. Then it
     * initializes toState, with, withName and toPos variables with given inputs.
     *
     * @param toState  {@link State} input.
     * @param _with     String input.
     * @param withName String input.
     * @param toPos    String input.
     */
    constructor(_with: string, withName?: string, toState?: State, toPos?: string) {
        this._with = _with
        this.withName = withName
        this._toState = toState
        this._toPos = toPos
    }

    /**
     * Getter for the toState variable.
     *
     * @return toState variable.
     */
    toState(): State{
        return this._toState
    }

    /**
     * Getter for the toPos variable.
     *
     * @return toPos variable.
     */
    toPos(): string{
        return this._toPos
    }

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
    transitionPossible(currentSurfaceForm: string, realSurfaceForm: string): boolean{
        if (currentSurfaceForm.length == 0 || currentSurfaceForm.length >= realSurfaceForm.length) {
            return true;
        }
        let searchString = realSurfaceForm.substring(currentSurfaceForm.length);
        for (let i = 0; i < this._with.length; i++) {
            switch (this._with.charAt(i)) {
                case 'C':
                    return searchString.includes("c") || searchString.includes("ç");
                case 'D':
                    return searchString.includes("d") || searchString.includes("t");
                case 'c':
                case 'e':
                case 'r':
                case 'p':
                case 'l':
                case 'b':
                case 'g':
                case 'o':
                case 'm':
                case 'v':
                case 'i':
                case 'ü':
                case 'z':
                    return searchString.includes(this._with.charAt(i));
                case 'A':
                    return searchString.includes("a") || searchString.includes("e");
                case 'k':
                    return searchString.includes("k") || searchString.includes("g") || searchString.includes("ğ");
            }
        }
        return true;
    }

    /**
     * The transitionPossible method takes a {@link FsmParse} currentFsmParse as an input. It then checks some special cases;
     *
     * @param currentFsmParse Parse to be checked
     * @return true if transition is possible false otherwise
     */
    transitionPossibleFromParse(currentFsmParse: FsmParse): boolean{
        if (this._with == "Ar" && currentFsmParse.getSurfaceForm().endsWith("l") &&
            currentFsmParse.getWord().getName() != currentFsmParse.getSurfaceForm()) {
            return false;
        }
        if (currentFsmParse.getVerbAgreement() != null && currentFsmParse.getPossesiveAgreement() != null &&
            this.withName != undefined) {
            if (currentFsmParse.getVerbAgreement() == "A3PL" && this.withName == "^DB+VERB+ZERO+PRES+A1SG") {
                return false;
            }
            if (currentFsmParse.getVerbAgreement() == "A3SG" &&
                (currentFsmParse.getPossesiveAgreement() == "P1SG" ||  currentFsmParse.getPossesiveAgreement() == "P2SG") &&
                this.withName == "^DB+VERB+ZERO+PRES+A1PL") {
                return false;
            }
        }
        return true;
    }

    /**
     * The transitionPossibleFromRoot method takes root and current parse as inputs. It then checks some special cases.
     *
     * @param root Current root word
     * @param fromState From which state we arrived to this state.
     * @return true if transition is possible false otherwise
     */
    transitionPossibleFromRoot(root: TxtWord, fromState: State){
        if (root.isAdjective() && ((root.isNominal() && !root.isExceptional()) || root.isPronoun()) && this._toState.getName() == "NominalRoot(ADJ)" && this._with == "0") {
            return false;
        }
        if (root.isAdjective() && root.isNominal() && this._with == "^DB+VERB+ZERO+PRES+A3PL" && fromState.getName() == "AdjectiveRoot") {
            return false;
        }
        if (root.isAdjective() && root.isNominal() && this._with == "SH" && fromState.getName() == "AdjectiveRoot") {
            return false;
        }
        if (this._with == "ki") {
            return root.takesRelativeSuffixKi();
        }
        if (this._with == "kü") {
            return root.takesRelativeSuffixKu();
        }
        if (this._with == "DHr") {
            if (this._toState.getName() == "Adverb") {
                return true;
            } else {
                return root.takesSuffixDIRAsFactitive();
            }
        }
        if (this._with == "Hr" && (this._toState.getName() == "AdjectiveRoot(VERB)" ||
            this._toState.getName() == "OtherTense" || this._toState.getName() == "OtherTense2")) {
            return root.takesSuffixIRAsAorist();
        }
        return true;
    }

    /**
     * The withFirstChar method returns the first character of the with variable.
     *
     * @return the first character of the with variable.
     */
    private withFirstChar(): string{
        if (this._with.length == 0) {
            return '$';
        }
        if (this._with.charAt(0) != '\'') {
            return this._with.charAt(0);
        } else {
            if (this._with.length == 1) {
                return this._with.charAt(0);
            } else {
                return this._with.charAt(1);
            }
        }
    }

    /**
     * The startWithVowelorConsonantDrops method checks for some cases. If the first character of with variable is "nsy",
     * and with variable does not equal to one of the Strings; "ylA, ysA, ymHs, yDH, yken", it returns true. If
     * <p>
     * Or, if the first character of with variable is 'A, H: or any other vowels, it returns true.
     *
     * @return true if it starts with vowel or consonant drops, false otherwise.
     */
    private startWithVowelorConsonantDrops(): boolean{
        if (TurkishLanguage.isConsonantDrop(this.withFirstChar()) && this._with != "ylA" && this._with !="ysA" &&
            this._with !="ymHs" && this._with != "yDH" && this._with != "yken") {
            return true;
        }
        if (this.withFirstChar() == 'A' || this.withFirstChar() == 'H' || TurkishLanguage.isVowel(this.withFirstChar())) {
            return true;
        }
        return false;
    }

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
    softenDuringSuffixation(root: TxtWord): boolean{
        if ((root.isNominal() || root.isAdjective()) && root.nounSoftenDuringSuffixation() &&
            (this._with == "Hm" || this._with == "nDAn" || this._with == "ncA" || this._with == "nDA" ||
                this._with == "yA" || this._with == "yHm" || this._with == "yHz" || this._with == "yH" ||
                this._with == "nH" || this._with == "nA" || this._with == "nHn" || this._with == "H" ||
                this._with == "sH" || this._with == "Hn" || this._with == "HnHz" || this._with == "HmHz")) {
            return true;
        }
        if (root.isVerb() && root.verbSoftenDuringSuffixation() &&
            (this._with.startsWith("Hyor") || this._with == "yHs" || this._with == "yAn" || this._with == "yA" ||
            this._with.startsWith("yAcAk") || this._with == "yAsH" || this._with == "yHncA" || this._with == "yHp" ||
                this._with == "yAlH" || this._with == "yArAk" || this._with == "yAdur" || this._with == "yHver" ||
                this._with == "yAgel" || this._with == "yAgor" || this._with == "yAbil" || this._with == "yAyaz" ||
                this._with == "yAkal" || this._with == "yAkoy" || this._with == "yAmA" || this._with == "yHcH" ||
                this._with == "HCH" || this._with.startsWith("Hr") || this._with == "Hs" || this._with == "Hn" ||
                this._with == "yHn" || this._with == "yHnHz" || this._with.startsWith("Ar") || this._with == "Hl")) {
            return true;
        }
        return false;
    }

    /**
     * The method is main driving method to accomplish the current transition from one state to another depending on
     * the root form of the word, current value of the word form, and the type of the start state. The method
     * (a) returns the original word form if the transition is an epsilon transition, (b) adds 'nunla' if the current
     * stem is 'bu', 'şu' or 'o', (c) returns 'bana' or 'sana' if the current stem is 'ben' or 'sen' respectively.
     * For other cases, the method first modifies current stem and then adds the transition using special metamorpheme
     * resolving methods. These cases are: (d) Converts 'y' of the first character of the transition to 'i' if the
     * current stem is 'ye' or 'de'. (e) Drops the last two characters and adds last character when the transition is
     * ('Hl' or 'Hn') and last 'I' drops during passive suffixation. (f) Adds 'y' character when the word ends with 'su'
     * and the transition does not start with 'y'. (g) Adds the last character again when the root duplicates during
     * suffixation. (h) Drops the last two characters and adds the last character when last 'i' drops during
     * suffixation. (i) Replaces the last character with a soft one when the root soften during suffixation.
     * @param root Root of the current word form
     * @param stem Current word form
     * @param startState The state from which this Fsm morphological analysis search has started.
     * @return The current value of the word form after this transition is completed in the finite state machine.
     */
    makeTransition(root: TxtWord, stem: string, startState?: State): string{
        if (startState == undefined){
            if (root.isVerb()) {
                return this.makeTransition(root, stem, new State("VerbalRoot", true, false));
            } else {
                return this.makeTransition(root, stem, new State("NominalRoot", true, false));
            }
        } else {
            let rootWord = root.getName() == stem || (root.getName() + "'") == stem;
            let formation = stem;
            let i = 0;
            if (this._with == "0") {
                return stem;
            }
            if ((stem== "bu" || stem== "şu" || stem== "o") && rootWord && this._with == "ylA") {
                return stem + "nunla";
            }
            if (this._with == "yA") {
                if (stem== "ben") {
                    return "bana";
                }
                if (stem== "sen") {
                    return "sana";
                }
            }
            let formationToCheck;
            //---vowelEChangesToIDuringYSuffixation---
            //de->d(i)yor, ye->y(i)yor
            if (rootWord && this.withFirstChar() == 'y' && root.vowelEChangesToIDuringYSuffixation() &&
                (this._with.charAt(1) != 'H' || root.getName()== "ye")) {
                formation = stem.substring(0, stem.length - 1) + 'i';
                formationToCheck = formation;
            } else {
                //---lastIdropsDuringPassiveSuffixation---
                // yoğur->yoğrul, ayır->ayrıl, buyur->buyrul, çağır->çağrıl, çevir->çevril, devir->devril,
                // kavur->kavrul, kayır->kayrıl, kıvır->kıvrıl, savur->savrul, sıyır->sıyrıl, yoğur->yoğrul
                if (rootWord && (this._with == "Hl" || this._with == "Hn") && root.lastIdropsDuringPassiveSuffixation()) {
                    formation = stem.substring(0, stem.length - 2) + stem.charAt(stem.length - 1);
                    formationToCheck = stem;
                } else {
                    //---showsSuRegularities---
                    //karasu->karasuyu, su->suyu, ağırsu->ağırsuyu, akarsu->akarsuyu, bengisu->bengisuyu
                    if (rootWord && root.showsSuRegularities() && this.startWithVowelorConsonantDrops() && !this._with.startsWith("y")) {
                        formation = stem + 'y';
                        formationToCheck = formation;
                    } else {
                        if (rootWord && root.duplicatesDuringSuffixation() && !startState.getName().startsWith("VerbalRoot") &&
                            TurkishLanguage.isConsonantDrop(this._with.charAt(0))) {
                            //---duplicatesDuringSuffixation---
                            if (this.softenDuringSuffixation(root)) {
                                //--extra softenDuringSuffixation
                                switch (Word.lastPhoneme(stem)) {
                                    case 'p':
                                        //tıp->tıbbı
                                        formation = stem.substring(0, stem.length - 1) + "bb";
                                        break;
                                    case 't':
                                        //cet->ceddi, met->meddi, ret->reddi, serhat->serhaddi, zıt->zıddı, şet->şeddi
                                        formation = stem.substring(0, stem.length - 1) + "dd";
                                        break;
                                }
                            } else {
                                //cer->cerri, emrihak->emrihakkı, fek->fekki, fen->fenni, had->haddi, hat->hattı,
                                // haz->hazzı, his->hissi
                                formation = stem + stem.charAt(stem.length - 1);
                            }
                            formationToCheck = formation;
                        } else {
                            if (rootWord && root.lastIdropsDuringSuffixation() &&
                                !startState.getName().startsWith("VerbalRoot") && !startState.getName().startsWith("ProperRoot") &&
                                this.startWithVowelorConsonantDrops()) {
                                //---lastIdropsDuringSuffixation---
                                if (this.softenDuringSuffixation(root)) {
                                    //---softenDuringSuffixation---
                                    switch (Word.lastPhoneme(stem)) {
                                        case 'p':
                                            //hizip->hizbi, kayıp->kaybı, kayıt->kaydı, kutup->kutbu
                                            formation = stem.substring(0, stem.length - 2) + 'b';
                                            break;
                                        case 't':
                                            //akit->akdi, ahit->ahdi, lahit->lahdi, nakit->nakdi, vecit->vecdi
                                            formation = stem.substring(0, stem.length - 2) + 'd';
                                            break;
                                        case 'ç':
                                            //eviç->evci, nesiç->nesci
                                            formation = stem.substring(0, stem.length - 2) + 'c';
                                            break;
                                    }
                                } else {
                                    //sarıağız->sarıağzı, zehir->zehri, zikir->zikri, nutuk->nutku, omuz->omzu, ömür->ömrü
                                    //lütuf->lütfu, metin->metni, kavim->kavmi, kasıt->kastı
                                    formation = stem.substring(0, stem.length - 2) + stem.charAt(stem.length - 1);
                                }
                                formationToCheck = stem;
                            } else {
                                switch (Word.lastPhoneme(stem)) {
                                    //---nounSoftenDuringSuffixation or verbSoftenDuringSuffixation
                                    case 'p':
                                        //adap->adabı, amip->amibi, azap->azabı, gazap->gazabı
                                        if (this.startWithVowelorConsonantDrops() && rootWord && this.softenDuringSuffixation(root)) {
                                            formation = stem.substring(0, stem.length - 1) + 'b';
                                        }
                                        break;
                                    case 't':
                                        //adet->adedi, akort->akordu, armut->armudu
                                        //affet->affedi, yoket->yokedi, sabret->sabredi, rakset->raksedi
                                        if (this.startWithVowelorConsonantDrops() && rootWord && this.softenDuringSuffixation(root)) {
                                            formation = stem.substring(0, stem.length - 1) + 'd';
                                        }
                                        break;
                                    case 'ç':
                                        //ağaç->ağacı, almaç->almacı, akaç->akacı, avuç->avucu
                                        if (this.startWithVowelorConsonantDrops() && rootWord && this.softenDuringSuffixation(root)) {
                                            formation = stem.substring(0, stem.length - 1) + 'c';
                                        }
                                        break;
                                    case 'g':
                                        //arkeolog->arkeoloğu, filolog->filoloğu, minerolog->mineroloğu
                                        if (this.startWithVowelorConsonantDrops() && rootWord && this.softenDuringSuffixation(root)) {
                                            formation = stem.substring(0, stem.length - 1) + 'ğ';
                                        }
                                        break;
                                    case 'k':
                                        //ahenk->ahengi, künk->küngü, renk->rengi, pelesenk->pelesengi
                                        if (this.startWithVowelorConsonantDrops() && rootWord && root.endingKChangesIntoG() &&
                                            (!root.isProperNoun() || startState.toString() != "ProperRoot")) {
                                            formation = stem.substring(0, stem.length - 1) + 'g';
                                        } else {
                                            //ablak->ablağı, küllük->küllüğü, kitaplık->kitaplığı, evcilik->evciliği
                                            if (this.startWithVowelorConsonantDrops() && (!rootWord ||
                                                (this.softenDuringSuffixation(root) && (!root.isProperNoun() ||
                                                    startState.toString() != "ProperRoot")))) {
                                                formation = stem.substring(0, stem.length - 1) + 'ğ';
                                            }
                                        }
                                        break;
                                }
                                formationToCheck = formation;
                            }
                        }
                    }
                }
            }
            if (TurkishLanguage.isConsonantDrop(this.withFirstChar()) &&
                !TurkishLanguage.isVowel(stem.charAt(stem.length - 1)) &&
                (root.isNumeral() || root.isReal() || root.isFraction() || root.isTime() || root.isDate() ||
                    root.isPercent() || root.isRange()) && (root.getName().endsWith("1") || root.getName().endsWith("3") ||
                    root.getName().endsWith("4") || root.getName().endsWith("5") || root.getName().endsWith("8") ||
                    root.getName().endsWith("9") || root.getName().endsWith("10") || root.getName().endsWith("30") ||
                    root.getName().endsWith("40") || root.getName().endsWith("60") || root.getName().endsWith("70") ||
                    root.getName().endsWith("80") || root.getName().endsWith("90") || root.getName().endsWith("00"))) {
                if (this._with.charAt(0) == '\'') {
                    formation = formation + '\'';
                    i = 2;
                } else {
                    i = 1;
                }
            } else {
                if ((TurkishLanguage.isConsonantDrop(this.withFirstChar()) && TurkishLanguage.isConsonant(Word.lastPhoneme(stem))) ||
                    (rootWord && root.consonantSMayInsertedDuringPossesiveSuffixation())) {
                    if (this._with.charAt(0) == '\'') {
                        formation = formation + '\'';
                        if (root.isAbbreviation())
                            i = 1;
                        else
                            i = 2;
                    } else {
                        i = 1;
                    }
                }
            }
            for (; i < this._with.length; i++) {
                switch (this._with.charAt(i)) {
                    case 'D':
                        formation = MorphotacticEngine.resolveD(root, formation, formationToCheck);
                        break;
                    case 'A':
                        formation = MorphotacticEngine.resolveA(root, formation, rootWord, formationToCheck);
                        break;
                    case 'H':
                        if (this._with.charAt(0) != '\'') {
                            formation = MorphotacticEngine.resolveH(root, formation, i == 0, this._with.startsWith("Hyor"), rootWord, formationToCheck);
                        } else {
                            formation = MorphotacticEngine.resolveH(root, formation, i == 1, false, rootWord, formationToCheck);
                        }
                        rootWord = false
                        break;
                    case 'C':
                        formation = MorphotacticEngine.resolveC(formation, formationToCheck);
                        break;
                    case 'S':
                        formation = MorphotacticEngine.resolveS(formation);
                        break;
                    case 'Ş':
                        formation = MorphotacticEngine.resolveSh(formation);
                        break;
                    default:
                        if (i == this._with.length - 1 && this._with.charAt(i) == 's') {
                            formation += 'ş';
                        } else {
                            formation += this._with.charAt(i);
                        }
                }
                formationToCheck = formation;
            }
            return formation;
        }
    }

    /**
     * An overridden toString method which returns the with variable.
     *
     * @return with variable.
     */
    toString(): string{
        return this._with
    }

    /**
     * The with method returns the withName variable.
     *
     * @return the withName variable.
     */
    getWith(): string{
        return this.withName
    }
}