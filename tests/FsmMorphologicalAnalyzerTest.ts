import * as assert from "assert";
import {FsmMorphologicalAnalyzer} from "../dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {TxtWord} from "nlptoolkit-dictionary/dist/Dictionary/TxtWord";
import {State} from "../dist/MorphologicalAnalysis/State";
import {Transition} from "../dist/MorphologicalAnalysis/Transition";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";

describe('FsmMorphologicalAnalyzerTest', function() {
    describe('FsmMorphologicalAnalyzerTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        it('morphologicalAnalysisDataTimeNumber', function() {
            assert.ok(fsm.morphologicalAnalysis("3/4").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("3\\/4").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("4/2/1973").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("14/2/1993").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("14/12/1933").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("6/12/1903").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("%34.5").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("%3").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("%56").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("2:3").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("12:3").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("4:23").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("11:56").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("1:2:3").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("3:12:3").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("5:4:23").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("7:11:56").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("12:2:3").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("10:12:3").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("11:4:23").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("22:11:56").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("45").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("34.23").size() != 0);
        });
        it('morphologicalAnalysisProperNoun', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < 30000; i++){
                let word = <TxtWord> dictionary.getWord(Math.floor(Math.random() * dictionary.size()));
                if (word.isProperNoun()){
                    assert.ok(fsm.morphologicalAnalysis(word.getName().toLocaleUpperCase("tr")).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisNounSoftenDuringSuffixation', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isNominal() && word.nounSoftenDuringSuffixation()){
                    let transitionState = new State("Possessive", false, false);
                    let startState = new State("NominalRoot", true, false);
                    let transition = new Transition("yH", "ACC", transitionState);
                    let surfaceForm = transition.makeTransition(word, word.getName(), startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisVowelAChangesToIDuringYSuffixation', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isVerb() && word.vowelAChangesToIDuringYSuffixation()){
                    let transitionState = new State("VerbalStem", false, false);
                    let startState = new State("VerbalRoot", true, false);
                    let transition = new Transition("Hyor", "PROG1", transitionState);
                    let surfaceForm = transition.makeTransition(word, word.getName(), startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisIsPortmanteau', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isNominal() && word.isPortmanteau() && !word.isPlural() && !word.isPortmanteauFacedVowelEllipsis()){
                    let transitionState = new State("CompoundNounRoot", true, false);
                    let startState = new State("CompoundNounRoot", true, false);
                    let transition = new Transition("lArH", "A3PL+P3PL", transitionState);
                    let exceptLast2 = word.getName().substring(0, word.getName().length - 2);
                    let exceptLast = word.getName().substring(0, word.getName().length - 1);
                    let rootForm
                    if (word.isPortmanteauFacedSoftening()){
                        switch (word.getName().charAt(word.getName().length - 2)) {
                            case 'b':
                                rootForm = exceptLast2 + 'p';
                                break;
                            case 'c':
                                rootForm = exceptLast2 + '??';
                                break;
                            case 'd':
                                rootForm = exceptLast2 + 't';
                                break;
                            case '??':
                                rootForm = exceptLast2 + 'k';
                                break;
                            default:
                                rootForm = exceptLast;
                        }
                    } else {
                        if (word.isPortmanteauEndingWithSI()){
                            rootForm = exceptLast2;
                        } else {
                            rootForm = exceptLast;
                        }
                    }
                    let surfaceForm = transition.makeTransition(word, rootForm, startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisNotObeysVowelHarmonyDuringAgglutination', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isNominal() && word.notObeysVowelHarmonyDuringAgglutination()){
                    let transitionState = new State("Possessive", false, false);
                    let startState = new State("NominalRoot", true, false);
                    let transition = new Transition("yH", "ACC", transitionState);
                    let surfaceForm = transition.makeTransition(word, word.getName(), startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisLastIdropsDuringSuffixation', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isNominal() && word.lastIdropsDuringSuffixation()){
                    let transitionState = new State("Possessive", false, false);
                    let startState = new State("NominalRoot", true, false);
                    let transition = new Transition("yH", "ACC", transitionState);
                    let surfaceForm = transition.makeTransition(word, word.getName(), startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisVerbSoftenDuringSuffixation', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isVerb() && word.verbSoftenDuringSuffixation()){
                    let transitionState = new State("VerbalStem", false, false);
                    let startState = new State("VerbalRoot", true, false);
                    let transition = new Transition("Hyor", "PROG1", transitionState);
                    let surfaceForm = transition.makeTransition(word, word.getName(), startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisDuplicatesDuringSuffixation', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isNominal() && word.duplicatesDuringSuffixation()){
                    let transitionState = new State("Possessive", false, false);
                    let startState = new State("NominalRoot", true, false);
                    let transition = new Transition("yH", "ACC", transitionState);
                    let surfaceForm = transition.makeTransition(word, word.getName(), startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisEndingKChangesIntoG', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isNominal() && word.endingKChangesIntoG()){
                    let transitionState = new State("Possessive", false, false);
                    let startState = new State("NominalRoot", true, false);
                    let transition = new Transition("yH", "ACC", transitionState);
                    let surfaceForm = transition.makeTransition(word, word.getName(), startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('morphologicalAnalysisLastIdropsDuringPassiveSuffixation', function() {
            let dictionary = fsm.getDictionary();
            for (let i = 0; i < dictionary.size(); i++){
                let word = <TxtWord> dictionary.getWord(i);
                if (word.isVerb() && word.lastIdropsDuringPassiveSuffixation()){
                    let transitionState = new State("VerbalStem", false, false);
                    let startState = new State("VerbalRoot", true, false);
                    let transition = new Transition("Hl", "^DB+VERB+PASS", transitionState);
                    let surfaceForm = transition.makeTransition(word, word.getName(), startState);
                    assert.ok(fsm.morphologicalAnalysis(surfaceForm).size() != 0);
                }
            }
        });
        it('testReplaceWord', function() {
            assert.strictEqual("??vesterine s??yle kaza???? g??zelmi??", fsm.replaceWord(new Sentence("Hem??irene s??yle kaza???? g??zelmi??"), "hem??ire", "??vester").toString());
            assert.strictEqual("Burada ??ok abartma var", fsm.replaceWord(new Sentence("Burada ??ok m??bala??a var"), "m??bala??a", "abartma").toString());
            assert.strictEqual("Bu bina ??ok k??t?? ??ekilsizle??tirildi", fsm.replaceWord(new Sentence("Bu bina ??ok k??t?? bi??imsizle??tirildi"), "bi??imsizle??", "??ekilsizle??").toString());
            assert.strictEqual("Abim ge??en y??l ??lm????t?? gibi", fsm.replaceWord(new Sentence("Abim ge??en y??l son yolculu??a ????km????t?? gibi"), "son yolculu??a ????k", "??l").toString());
            assert.strictEqual("Hem??irenle evlendim", fsm.replaceWord(new Sentence("K??z karde??inle evlendim"), "k??z karde??", "hem??ire").toString());
            assert.strictEqual("D??n yapt?????? g??re?? ma????nda yenildi", fsm.replaceWord(new Sentence("D??n yapt?????? g??re?? ma????nda ma??lup oldu"), "ma??lup ol", "yenil").toString());
            assert.strictEqual("Abim ge??en y??l son yolculu??a ????km????t?? gibi", fsm.replaceWord(new Sentence("Abim ge??en y??l ??lm????t?? gibi"), "??l", "son yolculu??a ????k").toString());
            assert.strictEqual("K??z karde??inle evlendim", fsm.replaceWord(new Sentence("Hem??irenle evlendim"), "hem??ire", "k??z karde??").toString());
            assert.strictEqual("D??n yapt?????? g??re?? ma????nda ma??lup oldu", fsm.replaceWord(new Sentence("D??n yapt?????? g??re?? ma????nda yenildi"), "yenil", "ma??lup ol").toString());
            assert.strictEqual("D??n yapt?????? g??re?? ma????nda alt oldu sanki", fsm.replaceWord(new Sentence("D??n yapt?????? g??re?? ma????nda ma??lup oldu sanki"), "ma??lup ol", "alt ol").toString());
            assert.strictEqual("Yemin billah vermi??lerdi vazoyu k??rmad??????na", fsm.replaceWord(new Sentence("Yemin etmi??lerdi vazoyu k??rmad??????na"), "yemin et", "yemin billah ver").toString());
            assert.strictEqual("Yemin etmi??lerdi vazoyu k??rmad??????na", fsm.replaceWord(new Sentence("Yemin billah vermi??lerdi vazoyu k??rmad??????na"), "yemin billah ver", "yemin et").toString());
        });
    });
});
