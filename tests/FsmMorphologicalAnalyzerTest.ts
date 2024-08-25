import * as assert from "assert";
import {FsmMorphologicalAnalyzer} from "../dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {TxtWord} from "nlptoolkit-dictionary/dist/Dictionary/TxtWord";
import {State} from "../dist/MorphologicalAnalysis/State";
import {Transition} from "../dist/MorphologicalAnalysis/Transition";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import * as fs from "fs";

describe('FsmMorphologicalAnalyzerTest', function() {
    describe('FsmMorphologicalAnalyzerTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        it('morphologicalAnalysisGenerateAllParses', function() {
            let testWords = ["göç", "açıkla", "yıldönümü",
                "resim", "hal", "emlak", "git",
                "kavur", "ye", "yemek", "ak",
                "sıska", "yıka", "bul", "cevapla",
                "coş", "böl", "del", "giy",
                "kaydol", "anla", "çök", "çık",
                "doldur", "azal", "göster", "aksa", "cenk", "kalp"]
            for (let testWord of testWords){
                let word = <TxtWord> fsm.getDictionary().getWord(testWord)
                let parsesExpected : Array<string> = []
                let data = fs.readFileSync("parses/" + word.getName() + ".txt", 'utf8')
                let lines = data.split("\n")
                for (let line of lines) {
                    let items = line.split(" ")
                    if (items.length == 2){
                        parsesExpected.push(items[1].trim())
                    }
                }
                let parsesGenerated = fsm.generateAllParses(word, word.getName().length + 5)
                assert.ok(parsesExpected.length == parsesGenerated.length)
                for (let parseGenerated of parsesGenerated){
                    assert.ok(parsesExpected.includes(parseGenerated.toString()))
                }
            }
        });

        it('morphologicalAnalysisSpecialProperNoun', function() {
            assert.ok(fsm.morphologicalAnalysis("Slack'in").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("SPK'ya").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("Stephen'ın").size() != 0);
        });

        it('morphologicalAnalysisNewWords', function() {
            assert.ok(fsm.robustMorphologicalAnalysis("googlecılardan").size() == 6);
            assert.ok(fsm.robustMorphologicalAnalysis("zaptıraplaştırılmayana").size() == 8);
            assert.ok(fsm.robustMorphologicalAnalysis("abzürtleşenmiş").size() == 5);
            assert.ok(fsm.robustMorphologicalAnalysis("vışlığından").size() == 8);
        });

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
                                rootForm = exceptLast2 + 'ç';
                                break;
                            case 'd':
                                rootForm = exceptLast2 + 't';
                                break;
                            case 'ğ':
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
            assert.strictEqual("Şvesterine söyle kazağı güzelmiş", fsm.replaceWord(new Sentence("Hemşirene söyle kazağı güzelmiş"), "hemşire", "şvester").toString());
            assert.strictEqual("Burada çok abartma var", fsm.replaceWord(new Sentence("Burada çok mübalağa var"), "mübalağa", "abartma").toString());
            assert.strictEqual("Bu bina çok kötü şekilsizleştirildi", fsm.replaceWord(new Sentence("Bu bina çok kötü biçimsizleştirildi"), "biçimsizleş", "şekilsizleş").toString());
            assert.strictEqual("Abim geçen yıl ölmüştü gibi", fsm.replaceWord(new Sentence("Abim geçen yıl son yolculuğa çıkmıştı gibi"), "son yolculuğa çık", "öl").toString());
            assert.strictEqual("Hemşirenle evlendim", fsm.replaceWord(new Sentence("Kız kardeşinle evlendim"), "kız kardeş", "hemşire").toString());
            assert.strictEqual("Dün yaptığı güreş maçında yenildi", fsm.replaceWord(new Sentence("Dün yaptığı güreş maçında mağlup oldu"), "mağlup ol", "yenil").toString());
            assert.strictEqual("Abim geçen yıl son yolculuğa çıkmıştı gibi", fsm.replaceWord(new Sentence("Abim geçen yıl ölmüştü gibi"), "öl", "son yolculuğa çık").toString());
            assert.strictEqual("Kız kardeşinle evlendim", fsm.replaceWord(new Sentence("Hemşirenle evlendim"), "hemşire", "kız kardeş").toString());
            assert.strictEqual("Dün yaptığı güreş maçında mağlup oldu", fsm.replaceWord(new Sentence("Dün yaptığı güreş maçında yenildi"), "yenil", "mağlup ol").toString());
            assert.strictEqual("Dün yaptığı güreş maçında alt oldu sanki", fsm.replaceWord(new Sentence("Dün yaptığı güreş maçında mağlup oldu sanki"), "mağlup ol", "alt ol").toString());
            assert.strictEqual("Yemin billah vermişlerdi vazoyu kırmadığına", fsm.replaceWord(new Sentence("Yemin etmişlerdi vazoyu kırmadığına"), "yemin et", "yemin billah ver").toString());
            assert.strictEqual("Yemin etmişlerdi vazoyu kırmadığına", fsm.replaceWord(new Sentence("Yemin billah vermişlerdi vazoyu kırmadığına"), "yemin billah ver", "yemin et").toString());
        });
    });
});
