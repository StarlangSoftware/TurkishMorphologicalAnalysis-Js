(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.State = void 0;
    class State {
        /**
         * First constructor of the {@link State} class which takes 3 parameters String name, boolean startState,
         * and boolean endState as input and initializes the private variables of the class also leaves pos as null.
         *
         * @param name       String input.
         * @param startState boolean input.
         * @param endState   boolean input.
         * @param pos        String input.
         */
        constructor(name, startState, endState, pos) {
            this.name = name;
            this.startState = startState;
            this.endState = endState;
            this.pos = pos;
        }
        /**
         * Getter for the name.
         *
         * @return String name.
         */
        getName() {
            return this.name;
        }
        /**
         * Getter for the pos.
         *
         * @return String pos.
         */
        getPos() {
            return this.pos;
        }
        /**
         * The isEndState method returns endState's value.
         *
         * @return boolean endState.
         */
        isEndState() {
            return this.endState;
        }
        /**
         * Overridden toString method which  returns the name.
         *
         * @return String name.
         */
        toString() {
            return this.name;
        }
    }
    exports.State = State;
});
//# sourceMappingURL=State.js.map