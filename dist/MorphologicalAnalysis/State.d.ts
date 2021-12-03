export declare class State {
    private startState;
    private endState;
    private name;
    private pos;
    /**
     * First constructor of the {@link State} class which takes 3 parameters String name, boolean startState,
     * and boolean endState as input and initializes the private variables of the class also leaves pos as null.
     *
     * @param name       String input.
     * @param startState boolean input.
     * @param endState   boolean input.
     * @param pos        String input.
     */
    constructor(name: string, startState: boolean, endState: boolean, pos?: string);
    /**
     * Getter for the name.
     *
     * @return String name.
     */
    getName(): string;
    /**
     * Getter for the pos.
     *
     * @return String pos.
     */
    getPos(): string;
    /**
     * The isEndState method returns endState's value.
     *
     * @return boolean endState.
     */
    isEndState(): boolean;
    /**
     * Overridden toString method which  returns the name.
     *
     * @return String name.
     */
    toString(): string;
}
