import * as assert from "assert";
import {FsmMorphologicalAnalyzer} from "../dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";

describe('TransitionTest', function() {
    describe('TransitionTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        it('testNumberWithAccusative', function() {
            assert.ok(fsm.morphologicalAnalysis("2'yi").size() != 0);
            assert.strictEqual(0, fsm.morphologicalAnalysis("2'i").size());
            assert.ok(fsm.morphologicalAnalysis("5'i").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("9'u").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("10'u").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("30'u").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("3'ü").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("4'ü").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("100'ü").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("6'yı").size() != 0);
            assert.strictEqual(0, fsm.morphologicalAnalysis("6'ı").size());
            assert.ok(fsm.morphologicalAnalysis("40'ı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("60'ı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("90'ı").size() != 0);
        });
        it('testNumberWithDative', function() {
            assert.ok(fsm.morphologicalAnalysis("6'ya").size() != 0);
            assert.strictEqual(0, fsm.morphologicalAnalysis("6'a").size());
            assert.ok(fsm.morphologicalAnalysis("9'a").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("10'a").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("30'a").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("40'a").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("60'a").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("90'a").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("2'ye").size() != 0);
            assert.strictEqual(0, fsm.morphologicalAnalysis("2'e").size());
            assert.ok(fsm.morphologicalAnalysis("8'e").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("5'e").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("4'e").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("1'e").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("3'e").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("7'ye").size() != 0);
            assert.strictEqual(0, fsm.morphologicalAnalysis("7'e").size());
        });
        it('testPresentTense', function() {
            assert.ok(fsm.morphologicalAnalysis("büyülüyor").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("bölümlüyor").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("buğuluyor").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("bulguluyor").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("açıklıyor").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("çalkalıyor").size() != 0);
        });
        it('testA', function() {
            assert.ok(fsm.morphologicalAnalysis("alkole").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("anormale").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("sakala").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("kabala").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("faika").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("halika").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("kediye").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("eve").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("saatinizi").size() != 0);
        });
        it('testC', function() {
            assert.ok(fsm.morphologicalAnalysis("gripçi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("güllaççı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("gülütçü").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("gülükçü").size() != 0);
        });
        it('testSH', function() {
            assert.ok(fsm.morphologicalAnalysis("altışar").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("yedişer").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("üçer").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("beşer").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("dörder").size() != 0);
        });
        it('testNumberWithD', function() {
            assert.ok(fsm.morphologicalAnalysis("1'di").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("2'ydi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("3'tü").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("4'tü").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("5'ti").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("6'ydı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("7'ydi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("8'di").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("9'du").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("30'du").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("40'tı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("60'tı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("70'ti").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("50'ydi").size() != 0);
        });
        it('testD', function() {
            assert.ok(fsm.morphologicalAnalysis("koştu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("kitaptı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("kaçtı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("evdi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("fraktı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("sattı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("aftı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("kesti").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("ahtı").size() != 0);
        });
        it('testExceptions', function() {
            assert.ok(fsm.morphologicalAnalysis("yiyip").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("sana").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("bununla").size() != 0);
            assert.strictEqual(0, fsm.morphologicalAnalysis("buyla").size());
            assert.ok(fsm.morphologicalAnalysis("onunla").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("şununla").size() != 0);
            assert.strictEqual(0, fsm.morphologicalAnalysis("şuyla").size());
            assert.ok(fsm.morphologicalAnalysis("bana").size() != 0);
        });
        it('testVowelEChangesToIDuringYSuffixation', function() {
            assert.ok(fsm.morphologicalAnalysis("diyor").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("yiyor").size() != 0);
        });
        it('testLastIdropsDuringPassiveSuffixation', function() {
            assert.ok(fsm.morphologicalAnalysis("yoğruldu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("buyruldu").size() != 0);
        });
        it('testShowsSuRegularities', function() {
            assert.ok(fsm.morphologicalAnalysis("karasuyu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("suyu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("suymuş").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("suyuymuş").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("suyla").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("suyuyla").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("suydu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("suyuydu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("suyuna").size() != 0);
        });
        it('testDuplicatesDuringSuffixation', function() {
            assert.ok(fsm.morphologicalAnalysis("tıbbı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("ceddi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("zıddı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("serhaddi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("fenni").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("haddi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("hazzı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("şakkı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("şakı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("halli").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("hali").size() != 0);
        });
        it('testLastIdropsDuringSuffixation', function() {
            assert.ok(fsm.morphologicalAnalysis("hizbi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("kaybı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("ahdi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("nesci").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("zehri").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("zikri").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("metni").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("metini").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("katli").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("katili").size() != 0);
        });
        it('testNounSoftenDuringSuffixation', function() {
            assert.ok(fsm.morphologicalAnalysis("adabı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("amibi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("armudu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("ağacı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("akacı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("arkeoloğu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("filoloğu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("ahengi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("küngü").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("kitaplığı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("küllüğü").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("adedi").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("adeti").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("ağıdı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("ağıtı").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("anotu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("anodu").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("Kuzguncuk'u").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("Leylak'ı").size() != 0);
        });
        it('testVerbSoftenDuringSuffixation', function() {
            assert.ok(fsm.morphologicalAnalysis("cezbediyor").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("ediyor").size() != 0);
            assert.ok(fsm.morphologicalAnalysis("bahsediyor").size() != 0);
        });
    });
});
