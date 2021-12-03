import { State } from "./State";
import { Transition } from "./Transition";
export declare class FiniteStateMachine {
    private states;
    private transitions;
    /**
     * Constructor reads the finite state machine in the given input file. It has a NodeList which holds the states
     * of the nodes and there are 4 different type of nodes; stateNode, root Node, transitionNode and withNode.
     * Also there are two states; state that a node currently in and state that a node will be in.
     * <p>
     * DOMParser is used to parse the given file. Firstly it gets the document to parse, then gets its elements by the
     * tag names. For instance, it gets states by the tag name 'state' and puts them into an ArrayList called stateList.
     * Secondly, it traverses this stateList and gets each Node's attributes. There are three attributes; name, start,
     * and end which will be named as states. If a node is in a startState it is tagged as 'yes', otherwise 'no'.
     * Also, if a node is in a startState, additional attribute will be fetched; originalPos that represents its original
     * part of speech.
     * <p>
     * At the last step, by starting rootNode's first child, it gets all the transitionNodes and next states called toState,
     * then continue with the nextSiblings. Also, if there is no possible toState, it prints this case and the causative states.
     *
     * @param fileName the resource file to read the finite state machine. Only files in resources folder are supported.
     */
    constructor(fileName?: string);
    /**
     * The isValidTransition loops through states ArrayList and checks transitions between states. If the actual transition
     * equals to the given transition input, method returns true otherwise returns false.
     *
     * @param transition is used to compare with the actual transition of a state.
     * @return true when the actual transition equals to the transition input, false otherwise.
     */
    isValidTransition(transition: string): boolean;
    /**
     * the getStates method returns the states in the FiniteStateMachine.
     * @return StateList.
     */
    getStates(): Array<State>;
    /**
     * The getState method is used to loop through the states {@link Array} and return the state whose name equal
     * to the given input name.
     *
     * @param name is used to compare with the state's actual name.
     * @return state if found any, null otherwise.
     */
    getState(name: string): State;
    /**
     * Another addTransition method which takes additional argument; toPos and. It creates a new {@link Transition}
     * with given input parameters and adds the transition to transitions {@link Array}.
     *
     * @param fromState  State type input indicating the from state.
     * @param toState  State type input indicating the next state.
     * @param _with     String input indicating with what the transition will be made.
     * @param withName String input.
     * @param toPos    String input.
     */
    addTransition(fromState: State, toState: State, _with: string, withName: string, toPos?: string): void;
    /**
     * The getTransitions method returns the transitions at the given state.
     *
     * @param state State input.
     * @return transitions at given state.
     */
    getTransitions(state: State): Array<Transition>;
}
