import { MorphologicalParse } from "./MorphologicalParse";
import { State } from "./State";
import { TxtWord } from "nlptoolkit-dictionary/dist/Dictionary/TxtWord";
export declare class FsmParse extends MorphologicalParse {
    private suffixList;
    private formList;
    private transitionList;
    private withList;
    private initialPos;
    private pos;
    private form;
    private verbAgreement;
    private possesiveAgreement;
    /**
     * Another constructor of {@link FsmParse} class which takes a {@link TxtWord} root and a {@link State} as inputs.
     * First, initializes root variable with this {@link TxtWord}. It also initializes form with root's name, pos and
     * initialPos with given {@link State}'s POS, creates 4 new {@link Array} suffixList, formList, transitionList
     * and withList and adds given {@link State} to suffixList, form to formList.
     *
     * @param root       {@link TxtWord} input.
     * @param startState {@link State} input.
     */
    constructor(root: any, startState?: State);
    /**
     * The constructInflectionalGroups method initially calls the transitionList method and assigns the resulting {@link String}
     * to the parse variable and creates a new {@link Array} as iGs. If parse {@link String} contains a derivational boundary
     * it adds the substring starting from the 0 to the index of derivational boundary to the iGs. If it does not contain a DB,
     * it directly adds parse to the iGs. Then, creates and initializes new {@link Array} as inflectionalGroups and fills with
     * the items of iGs.
     */
    constructInflectionalGroups(): void;
    /**
     * Getter for the verbAgreement variable.
     *
     * @return the verbAgreement variable.
     */
    getVerbAgreement(): string;
    /**
     * Getter for the getPossesiveAgreement variable.
     *
     * @return the possesiveAgreement variable.
     */
    getPossesiveAgreement(): string;
    /**
     * The setAgreement method takes a {@link String} transitionName as an input and if it is one of the A1SG, A2SG, A3SG,
     * A1PL, A2PL or A3PL it assigns transitionName input to the verbAgreement variable. Or if it is ine of the PNON, P1SG, P2SG,P3SG,
     * P1PL, P2PL or P3PL it assigns transitionName input to the possesiveAgreement variable.
     *
     * @param transitionName {@link String} input.
     */
    setAgreement(transitionName?: string): void;
    /**
     * The getLastLemmaWithTag method takes a String input pos as an input. If given pos is an initial pos then it assigns
     * root to the lemma, and assign null otherwise.  Then, it loops i times where i ranges from 1 to size of the formList,
     * if the item at i-1 of transitionList is not null and contains a derivational boundary with pos but not with ZERO,
     * it assigns the ith item of formList to lemma.
     *
     * @param pos {@link String} input.
     * @return String output lemma.
     */
    getLastLemmaWithTag(pos: string): string;
    /**
     * The getLastLemma method initially assigns root as lemma. Then, it loops i times where i ranges from 1 to size of the formList,
     * if the item at i-1 of transitionList is not null and contains a derivational boundary, it assigns the ith item of formList to lemma.
     *
     * @return String output lemma.
     */
    getLastLemma(): string;
    /**
     * The addSuffix method takes 5 different inputs; {@link State} suffix, {@link String} form, transition, with and toPos.
     * If the pos of given input suffix is not null, it then assigns it to the pos variable. If the pos of the given suffix
     * is null but given toPos is not null than it assigns toPos to pos variable. At the end, it adds suffix to the suffixList,
     * form to the formList, transition to the transitionList and if given with is not 0, it is also added to withList.
     *
     * @param suffix     {@link State} input.
     * @param form       {@link String} input.
     * @param transition {@link String} input.
     * @param _with       {@link String} input.
     * @param toPos      {@link String} input.
     */
    addSuffix(suffix: State, form: string, transition: string, _with: string, toPos: string): void;
    /**
     * Getter for the form variable.
     *
     * @return the form variable.
     */
    getSurfaceForm(): string;
    /**
     * The getStartState method returns the first item of suffixList {@link Array}.
     *
     * @return the first item of suffixList {@link Array}.
     */
    getStartState(): State;
    /**
     * Getter for the pos variable.
     *
     * @return the pos variable.
     */
    getFinalPos(): string;
    /**
     * Getter for the initialPos variable.
     *
     * @return the initialPos variable.
     */
    getInitialPos(): string;
    /**
     * The setForm method takes a {@link String} name as an input and assigns it to the form variable, then it removes
     * the first item of formList {@link Array} and adds the given name to the formList.
     *
     * @param name String input to set form.
     */
    setForm(name: string): void;
    /**
     * The getFinalSuffix method returns the last item of suffixList {@link Array}.
     *
     * @return the last item of suffixList {@link Array}.
     */
    getFinalSuffix(): State;
    /**
     * The overridden clone method creates a new {@link FsmParse} abject with root variable and initializes variables form, pos,
     * initialPos, verbAgreement, possesiveAgreement, and also the {@link ArrayList}s suffixList, formList, transitionList and withList.
     * Then returns newly created and cloned {@link FsmParse} object.
     *
     * @return FsmParse object.
     */
    clone(): FsmParse;
    /**
     * The headerTransition method gets the first item of formList and checks for cases;
     * <p>
     * If it is &lt;DOC&gt;, it returns &lt;DOC&gt;+BDTAG which indicates the beginning of a document.
     * If it is &lt;/DOC&gt;, it returns &lt;/DOC&gt;+EDTAG which indicates the ending of a document.
     * If it is &lt;TITLE&gt;, it returns &lt;TITLE&gt;+BTTAG which indicates the beginning of a title.
     * If it is &lt;/TITLE&gt;, it returns &lt;/TITLE&gt;+ETTAG which indicates the ending of a title.
     * If it is &lt;S&gt;, it returns &lt;S&gt;+BSTAG which indicates the beginning of a sentence.
     * If it is &lt;/S&gt;, it returns &lt;/S&gt;+ESTAG which indicates the ending of a sentence.
     *
     * @return corresponding tags of the headers and an empty {@link String} if any case does not match.
     */
    headerTransition(): string;
    /**
     * The pronounTransition method gets the first item of formList and checks for cases;
     * <p>
     * If it is "kendi", it returns kendi+PRON+REFLEXP which indicates a reflexive pronoun.
     * If it is one of the "hep, öbür, topu, öteki, kimse, hiçbiri, tümü, çoğu, hepsi, herkes, başkası, birçoğu, birçokları, biri, birbirleri, birbiri, birkaçı, böylesi, diğeri, cümlesi, bazı, kimi", it returns
     * +PRON+QUANTP which indicates a quantitative pronoun.
     * If it is one of the "o, bu, şu" and if it is "o" it also checks the first item of suffixList and if it is a PronounRoot(DEMONS),
     * it returns +PRON+DEMONSP which indicates a demonstrative pronoun.
     * If it is "ben", it returns +PRON+PERS+A1SG+PNON which indicates a 1st person singular agreement.
     * If it is "sen", it returns +PRON+PERS+A2SG+PNON which indicates a 2nd person singular agreement.
     * If it is "o" and the first item of suffixList, if it is a PronounRoot(PERS), it returns +PRON+PERS+A3SG+PNON which
     * indicates a 3rd person singular agreement.
     * If it is "biz", it returns +PRON+PERS+A1PL+PNON which indicates a 1st person plural agreement.
     * If it is "siz", it returns +PRON+PERS+A2PL+PNON which indicates a 2nd person plural agreement.
     * If it is "onlar" and the first item of suffixList, if it is a PronounRoot(PERS), it returns o+PRON+PERS+A3PL+PNON which
     * indicates a 3rd person plural agreement.
     * If it is one of the "nere, ne, kim, hangi", it returns +PRON+QUESP which indicates a question pronoun.
     *
     * @return corresponding transitions of pronouns and an empty {@link String} if any case does not match.
     */
    pronounTransition(): string;
    /**
     * The transitionList method first creates an empty {@link String} result, then gets the first item of suffixList and checks for cases;
     * <p>
     * If it is one of the "NominalRoot, NominalRootNoPossesive, CompoundNounRoot, NominalRootPlural", it assigns concatenation of first
     * item of formList and +NOUN to the result String.
     * Ex : Birincilik
     * <p>
     * If it is one of the "VerbalRoot, PassiveHn", it assigns concatenation of first item of formList and +VERB to the result String.
     * Ex : Başkalaştı
     * <p>
     * If it is "CardinalRoot", it assigns concatenation of first item of formList and +NUM+CARD to the result String.
     * Ex : Onuncu
     * <p>
     * If it is "FractionRoot", it assigns concatenation of first item of formList and NUM+FRACTION to the result String.
     * Ex : 1/2
     * <p>
     * If it is "TimeRoot", it assigns concatenation of first item of formList and +TIME to the result String.
     * Ex : 14:28
     * <p>
     * If it is "RealRoot", it assigns concatenation of first item of formList and +NUM+REAL to the result String.
     * Ex : 1.2
     * <p>
     * If it is "Punctuation", it assigns concatenation of first item of formList and +PUNC to the result String.
     * Ex : ,
     * <p>
     * If it is "Hashtag", it assigns concatenation of first item of formList and +HASHTAG to the result String.
     * Ex : #
     * <p>
     * If it is "DateRoot", it assigns concatenation of first item of formList and +DATE to the result String.
     * Ex : 11/06/2018
     * <p>
     * If it is "RangeRoot", it assigns concatenation of first item of formList and +RANGE to the result String.
     * Ex : 3-5
     * <p>
     * If it is "Email", it assigns concatenation of first item of formList and +EMAIL to the result String.
     * Ex : abc@
     * <p>
     * If it is "PercentRoot", it assigns concatenation of first item of formList and +PERCENT to the result String.
     * Ex : %12.5
     * <p>
     * If it is "DeterminerRoot", it assigns concatenation of first item of formList and +DET to the result String.
     * Ex : Birtakım
     * <p>
     * If it is "ConjunctionRoot", it assigns concatenation of first item of formList and +CONJ to the result String.
     * Ex : Ama
     * <p>
     * If it is "AdverbRoot", it assigns concatenation of first item of formList and +ADV to the result String.
     * Ex : Acilen
     * <p>
     * If it is "ProperRoot", it assigns concatenation of first item of formList and +NOUN+PROP to the result String.
     * Ex : Ahmet
     * <p>
     * If it is "HeaderRoot", it assigns the result of the headerTransition method to the result String.
     * Ex : &lt;DOC&gt;
     * <p>
     * If it is "InterjectionRoot", it assigns concatenation of first item of formList and +INTERJ to the result String.
     * Ex : Hey
     * <p>
     * If it is "DuplicateRoot", it assigns concatenation of first item of formList and +DUP to the result String.
     * Ex : Allak
     * <p>
     * If it is "CodeRoot", it assigns concatenation of first item of formList and +CODE to the result String.
     * Ex : 5000-WX
     * <p>
     * If it is "MetricRoot", it assigns concatenation of first item of formList and +METRIC to the result String.
     * Ex : 6cmx12cm
     * <p>
     * If it is "QuestionRoot", it assigns concatenation of first item of formList and +QUES to the result String.
     * Ex : Mı
     * <p>
     * If it is "PostP", and the first item of formList is one of the "karşı, ilişkin, göre, kadar, ait, yönelik, rağmen, değin,
     * dek, doğru, karşın, dair, atfen, binaen, hitaben, istinaden, mahsuben, mukabil, nazaran", it assigns concatenation of first
     * item of formList and +POSTP+PCDAT to the result String.
     * Ex : İlişkin
     * <p>
     * If it is "PostP", and the first item of formList is one of the "sonra, önce, beri, fazla, dolayı, itibaren, başka,
     * çok, evvel, ötürü, yana, öte, aşağı, yukarı, dışarı, az, gayrı", it assigns concatenation of first
     * item of formList and +POSTP+PCABL to the result String.
     * Ex : Başka
     * <p>
     * If it is "PostP", and the first item of formList is "yanısıra", it assigns concatenation of first
     * item of formList and +POSTP+PCGEN to the result String.
     * Ex : Yanısıra
     * <p>
     * If it is "PostP", and the first item of formList is one of the "birlikte, beraber", it assigns concatenation of first
     * item of formList and +PPOSTP+PCINS to the result String.
     * Ex : Birlikte
     * <p>
     * If it is "PostP", and the first item of formList is one of the "aşkın, takiben", it assigns concatenation of first
     * item of formList and +POSTP+PCACC to the result String.
     * Ex : Takiben
     * <p>
     * If it is "PostP", it assigns concatenation of first item of formList and +POSTP+PCNOM to the result String.
     * <p>
     * If it is "PronounRoot", it assigns result of the pronounTransition method to the result String.
     * Ex : Ben
     * <p>
     * If it is "OrdinalRoot", it assigns concatenation of first item of formList and +NUM+ORD to the result String.
     * Ex : Altıncı
     * <p>
     * If it starts with "Adjective", it assigns concatenation of first item of formList and +ADJ to the result String.
     * Ex : Güzel
     * <p>
     * At the end, it loops through the formList and concatenates each item with result {@link String}.
     *
     * @return String result accumulated with items of formList.
     */
    getFsmParseTransitionList(): string;
    /**
     * The suffixList method gets the first items of suffixList and formList and concatenates them with parenthesis and
     * assigns a String result. Then, loops through the formList and it the current ith item is not equal to previous
     * item it accumulates ith items of formList and suffixList to the result {@link String}.
     *
     * @return result {@link String} accumulated with the items of formList and suffixList.
     */
    getSuffixList(): string;
    /**
     * The withList method gets the root as a result {@link String} then loops through the withList and concatenates each item
     * with result {@link String}.
     *
     * @return result {@link String} accumulated with items of withList.
     */
    getWithList(): string;
    /**
     * Replace root word of the current parse with the new root word and returns the new word.
     * @param newRoot Replaced root word
     * @return Root word of the parse will be replaced with the newRoot and the resulting surface form is returned.
     */
    replaceRootWord(newRoot: TxtWord): string;
    /**
     * The overridden toString method which returns transitionList method.
     *
     * @return returns transitionList method.
     */
    toString(): string;
}
