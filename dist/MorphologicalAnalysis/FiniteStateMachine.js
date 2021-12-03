(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./State", "./Transition", "nlptoolkit-xmlparser/dist/XmlDocument"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FiniteStateMachine = void 0;
    const State_1 = require("./State");
    const Transition_1 = require("./Transition");
    const XmlDocument_1 = require("nlptoolkit-xmlparser/dist/XmlDocument");
    class FiniteStateMachine {
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
        constructor(fileName = "turkish_finite_state_machine.xml") {
            this.states = new Array();
            this.transitions = new Map();
            let xmlDocument = new XmlDocument_1.XmlDocument(fileName);
            xmlDocument.parse();
            let stateListNode = xmlDocument.getFirstChild();
            let stateNode = stateListNode.getFirstChild();
            while (stateNode != undefined) {
                if (stateNode.hasAttributes()) {
                    let stateName = stateNode.getAttributeValue("name");
                    let startState = stateNode.getAttributeValue("start");
                    let endState = stateNode.getAttributeValue("end");
                    let state;
                    if (startState == "yes") {
                        let originalPos = stateNode.getAttributeValue("originalpos");
                        state = new State_1.State(stateName, true, endState == "yes", originalPos);
                    }
                    else {
                        state = new State_1.State(stateName, false, endState == "yes");
                    }
                    this.states.push(state);
                }
                stateNode = stateNode.getNextSibling();
            }
            stateNode = stateListNode.getFirstChild();
            while (stateNode != undefined) {
                if (stateNode.hasAttributes()) {
                    let stateName = stateNode.getAttributeValue("name");
                    let state = this.getState(stateName);
                    let transitionNode = stateNode.getFirstChild();
                    while (transitionNode != undefined) {
                        if (transitionNode.hasAttributes()) {
                            let toStateName = transitionNode.getAttributeValue("name");
                            let toState = this.getState(toStateName);
                            let withName = transitionNode.getAttributeValue("transitionname");
                            let rootToPos = transitionNode.getAttributeValue("topos");
                            let withNode = transitionNode.getFirstChild();
                            while (withNode != undefined) {
                                let toPos;
                                if (withNode.hasAttributes()) {
                                    withName = withNode.getAttributeValue("name");
                                    toPos = withNode.getAttributeValue("topos");
                                }
                                else {
                                    toPos = "";
                                }
                                if (toPos == "") {
                                    if (rootToPos == "") {
                                        this.addTransition(state, toState, withNode.getPcData(), withName);
                                    }
                                    else {
                                        this.addTransition(state, toState, withNode.getPcData(), withName, rootToPos);
                                    }
                                }
                                else {
                                    this.addTransition(state, toState, withNode.getPcData(), withName, toPos);
                                }
                                withNode = withNode.getNextSibling();
                            }
                        }
                        transitionNode = transitionNode.getNextSibling();
                    }
                }
                stateNode = stateNode.getNextSibling();
            }
        }
        /**
         * The isValidTransition loops through states ArrayList and checks transitions between states. If the actual transition
         * equals to the given transition input, method returns true otherwise returns false.
         *
         * @param transition is used to compare with the actual transition of a state.
         * @return true when the actual transition equals to the transition input, false otherwise.
         */
        isValidTransition(transition) {
            for (let state of this.transitions.keys()) {
                for (let transition1 of this.transitions.get(state)) {
                    if (transition1.toString() != undefined && transition1.toString() == transition) {
                        return true;
                    }
                }
            }
            return false;
        }
        /**
         * the getStates method returns the states in the FiniteStateMachine.
         * @return StateList.
         */
        getStates() {
            return this.states;
        }
        /**
         * The getState method is used to loop through the states {@link Array} and return the state whose name equal
         * to the given input name.
         *
         * @param name is used to compare with the state's actual name.
         * @return state if found any, null otherwise.
         */
        getState(name) {
            for (let state of this.states) {
                if (state.getName() == name) {
                    return state;
                }
            }
            return undefined;
        }
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
        addTransition(fromState, toState, _with, withName, toPos) {
            let newTransition = new Transition_1.Transition(_with, withName, toState, toPos);
            let transitionList;
            if (this.transitions.has(fromState)) {
                transitionList = this.transitions.get(fromState);
            }
            else {
                transitionList = new Array();
            }
            transitionList.push(newTransition);
            this.transitions.set(fromState, transitionList);
        }
        /**
         * The getTransitions method returns the transitions at the given state.
         *
         * @param state State input.
         * @return transitions at given state.
         */
        getTransitions(state) {
            if (this.transitions.has(state)) {
                return this.transitions.get(state);
            }
            else {
                return new Array();
            }
        }
    }
    exports.FiniteStateMachine = FiniteStateMachine;
});
//# sourceMappingURL=FiniteStateMachine.js.map