import * as assert from "assert";
import {FiniteStateMachine} from "../dist/MorphologicalAnalysis/FiniteStateMachine";
import {CounterHashMap} from "nlptoolkit-datastructure/dist/CounterHashMap";

describe('FiniteStateMachineTest', function() {
    describe('FiniteStateMachineTest', function() {
        let fsm = new FiniteStateMachine("turkish_finite_state_machine.xml");
        let stateList = fsm.getStates();
        it('testStateCount', function() {
            assert.strictEqual(139, stateList.length);
        });
        it('testStartEndStates', function() {
            let endStateCount = 0;
            for (let state of stateList){
                if (state.isEndState()){
                    endStateCount++;
                }
            }
            assert.strictEqual(35, endStateCount);
            let posCounts = new CounterHashMap<string>();
            for (let state of stateList){
                posCounts.put(state.getPos());
            }
            assert.strictEqual(1, posCounts.get("HEAD"));
            assert.strictEqual(6, posCounts.get("PRON"));
            assert.strictEqual(1, posCounts.get("PROP"));
            assert.strictEqual(8, posCounts.get("NUM"));
            assert.strictEqual(7, posCounts.get("ADJ"));
            assert.strictEqual(1, posCounts.get("INTERJ"));
            assert.strictEqual(1, posCounts.get("DET"));
            assert.strictEqual(1, posCounts.get("ADVERB"));
            assert.strictEqual(1, posCounts.get("QUES"));
            assert.strictEqual(1, posCounts.get("CONJ"));
            assert.strictEqual(26, posCounts.get("VERB"));
            assert.strictEqual(1, posCounts.get("POSTP"));
            assert.strictEqual(1, posCounts.get("DUP"));
            assert.strictEqual(11, posCounts.get("NOUN"));
        });
        it('testTransitionCount', function() {
            let transitionCount = 0;
            for (let state of stateList){
                transitionCount += fsm.getTransitions(state).length;
            }
            assert.strictEqual(779, transitionCount);
        });
        it('testTransitionWith', function() {
            let transitionCounts = new CounterHashMap<string>();
            for (let state of stateList){
                let transitions = fsm.getTransitions(state);
                for (let transition of transitions){
                    transitionCounts.put(transition.toString());
                }
            }
            let topList = transitionCounts.topN(5);
            assert.strictEqual("0", topList[0][0]);
            assert.strictEqual(111, topList[0][1]);
            assert.strictEqual("lAr", topList[1][0]);
            assert.strictEqual(37, topList[1][1]);
            assert.strictEqual("DHr", topList[2][0]);
            assert.strictEqual(28, topList[2][1]);
            assert.strictEqual("Hn", topList[3][0]);
            assert.strictEqual(24, topList[3][1]);
            assert.strictEqual("lArH", topList[4][0]);
            assert.strictEqual(23, topList[4][1]);
        });
        it('testTransitionWithName', function() {
            let transitionCounts = new CounterHashMap<string>();
            for (let state of stateList){
                let transitions = fsm.getTransitions(state);
                for (let transition of transitions){
                    transitionCounts.put(transition.getWith());
                }
            }
            let topList = transitionCounts.topN(5);
            assert.strictEqual("", topList[0][0]);
            assert.strictEqual(52, topList[0][1]);
            assert.strictEqual("^DB+VERB+CAUS", topList[1][0]);
            assert.strictEqual(33, topList[1][1]);
            assert.strictEqual("^DB+VERB+PASS", topList[2][0]);
            assert.strictEqual(31, topList[2][1]);
            assert.strictEqual("A3PL", topList[3][0]);
            assert.strictEqual(28, topList[3][1]);
            assert.strictEqual("LOC", topList[4][0]);
            assert.strictEqual(24, topList[4][1]);
        });
    });
});