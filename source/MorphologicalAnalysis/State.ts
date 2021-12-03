export class State {

    private startState: boolean
    private endState: boolean
    private name: string
    private pos: string

    /**
     * First constructor of the {@link State} class which takes 3 parameters String name, boolean startState,
     * and boolean endState as input and initializes the private variables of the class also leaves pos as null.
     *
     * @param name       String input.
     * @param startState boolean input.
     * @param endState   boolean input.
     * @param pos        String input.
     */
    constructor(name: string, startState: boolean, endState: boolean, pos?: string) {
        this.name = name;
        this.startState = startState;
        this.endState = endState;
        this.pos = pos
    }

    /**
     * Getter for the name.
     *
     * @return String name.
     */
    getName(): string{
        return this.name
    }

    /**
     * Getter for the pos.
     *
     * @return String pos.
     */
    getPos(): string{
        return this.pos
    }

    /**
     * The isEndState method returns endState's value.
     *
     * @return boolean endState.
     */
    isEndState(): boolean{
        return this.endState
    }

    /**
     * Overridden toString method which  returns the name.
     *
     * @return String name.
     */
    toString(): string{
        return this.name
    }
}