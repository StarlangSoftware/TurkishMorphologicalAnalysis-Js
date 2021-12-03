import { MorphologicalTag } from "./MorphologicalTag";
export declare class InflectionalGroup {
    private IG;
    static tags: string[];
    static morphoTags: MorphologicalTag[];
    /**
     * The getMorphologicalTag method takes a String tag as an input and if the input matches with one of the elements of
     * tags array, it then gets the morphoTags of this tag and returns it.
     *
     * @param tag String to get morphoTags from.
     * @return morphoTags if found, null otherwise.
     */
    static getMorphologicalTag(tag: string): MorphologicalTag;
    /**
     * The getTag method takes a MorphologicalTag type tag as an input and returns its corresponding tag from tags array.
     *
     * @param tag MorphologicalTag type input to find tag from.
     * @return tag if found, null otherwise.
     */
    static getTag(tag: MorphologicalTag): string;
    /**
     * A constructor of {@link InflectionalGroup} class which initializes the IG {@link Array} by parsing given input
     * String IG by + and calling the getMorphologicalTag method with these substrings. If getMorphologicalTag method returns
     * a tag, it adds this tag to the IG {@link Array}.
     *
     * @param IG String input.
     */
    constructor(IG: string);
    /**
     * Another getTag method which takes index as an input and returns the corresponding tag from IG {@link ArrayList}.
     *
     * @param index to get tag.
     * @return tag at input index.
     */
    getTag(index: number): MorphologicalTag;
    /**
     * The size method returns the size of the IG {@link Array}.
     *
     * @return the size of the IG {@link Array}.
     */
    size(): number;
    /**
     * Overridden toString method to return resulting tags in IG {@link Array}.
     *
     * @return String result.
     */
    toString(): string;
    /**
     * The containsCase method loops through the tags in IG {@link Array} and finds out the tags of the NOMINATIVE,
     * ACCUSATIVE, DATIVE, LOCATIVE or ABLATIVE cases.
     *
     * @return tag which holds the condition.
     */
    containsCase(): MorphologicalTag;
    /**
     * The containsPlural method loops through the tags in IG {@link Array} and checks whether the tags are from
     * the agreement plural or possessive plural, i.e A1PL, A2PL, A3PL, P1PL, P2PL and P3PL.
     *
     * @return true if the tag is plural, false otherwise.
     */
    containsPlural(): boolean;
    /**
     * The containsTag method takes a MorphologicalTag type tag as an input and loops through the tags in
     * IG {@link Array} and returns true if the input matches with on of the tags in the IG.
     *
     * @param tag MorphologicalTag type input to search for.
     * @return true if tag matches with the tag in IG, false otherwise.
     */
    containsTag(tag: MorphologicalTag): boolean;
    /**
     * The containsPossessive method loops through the tags in IG {@link Array} and returns true if the tag in IG is
     * one of the possessives: P1PL, P1SG, P2PL, P2SG, P3PL AND P3SG.
     *
     * @return true if it contains possessive tag, false otherwise.
     */
    containsPossessive(): boolean;
}
