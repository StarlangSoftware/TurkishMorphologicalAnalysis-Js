import * as assert from "assert";
import {FsmMorphologicalAnalyzer} from "../dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";

describe('FsmParseTest', function() {
    describe('FsmParseTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        let parse1 = fsm.morphologicalAnalysis("açılır");
        let parse2 = fsm.morphologicalAnalysis("koparılarak");
        let parse3 = fsm.morphologicalAnalysis("toplama");
        let parse4 = fsm.morphologicalAnalysis("değerlendirmede");
        let parse5 = fsm.morphologicalAnalysis("soruşturmasının");
        let parse6 = fsm.morphologicalAnalysis("karşılaştırmalı");
        let parse7 = fsm.morphologicalAnalysis("esaslarını");
        let parse8 = fsm.morphologicalAnalysis("güçleriyle");
        let parse9 = fsm.morphologicalAnalysis("bulmayacakları");
        let parse10 = fsm.morphologicalAnalysis("kitabı");
        let parse11 = fsm.morphologicalAnalysis("kitapları");
        let parse12 = fsm.morphologicalAnalysis("o");
        let parse13 = fsm.morphologicalAnalysis("arabası");
        let parse14 = fsm.morphologicalAnalysis("sana");
        it('testSize', function() {
            assert.strictEqual(2, parse1.size());
            assert.strictEqual(2, parse2.size());
            assert.strictEqual(6, parse3.size());
            assert.strictEqual(4, parse4.size());
            assert.strictEqual(5, parse5.size());
            assert.strictEqual(12, parse6.size());
            assert.strictEqual(8, parse7.size());
            assert.strictEqual(6, parse8.size());
            assert.strictEqual(5, parse9.size());
            assert.strictEqual(4, parse14.size());
        });
        it('testRootWords', function() {
            assert.strictEqual("aç", parse1.rootWords());
            assert.strictEqual("kop$kopar", parse2.rootWords());
            assert.strictEqual("topla$toplam$toplama", parse3.rootWords());
            assert.strictEqual("değer$değerlen$değerlendir$değerlendirme", parse4.rootWords());
            assert.strictEqual("sor$soru$soruş$soruştur$soruşturma", parse5.rootWords());
            assert.strictEqual("karşı$karşıla$karşılaş$karşılaştır$karşılaştırma$karşılaştırmalı", parse6.rootWords());
            assert.strictEqual("esas", parse7.rootWords());
            assert.strictEqual("güç", parse8.rootWords());
            assert.strictEqual("bul", parse9.rootWords());
        });
        it('testGetParseWithLongestRootWord', function() {
            assert.strictEqual("kopar", parse2.getParseWithLongestRootWord().getWord().getName());
            assert.strictEqual("toplama", parse3.getParseWithLongestRootWord().getWord().getName());
            assert.strictEqual("değerlendirme", parse4.getParseWithLongestRootWord().getWord().getName());
            assert.strictEqual("soruşturma", parse5.getParseWithLongestRootWord().getWord().getName());
            assert.strictEqual("karşılaştırmalı", parse6.getParseWithLongestRootWord().getWord().getName());
        });
        it('testReduceToParsesWithSameRootAndPos', function() {
            parse2.reduceToParsesWithSameRootAndPos(new Word("kop+VERB"));
            assert.strictEqual(1, parse2.size());
            parse3.reduceToParsesWithSameRootAndPos(new Word("topla+VERB"));
            assert.strictEqual(2, parse3.size());
            parse6.reduceToParsesWithSameRootAndPos(new Word("karşıla+VERB"));
            assert.strictEqual(2, parse6.size());
        });
        it('testReduceToParsesWithSameRoot', function() {
            parse2.reduceToParsesWithSameRoot("kop");
            assert.strictEqual(1, parse2.size());
            parse3.reduceToParsesWithSameRoot("topla");
            assert.strictEqual(3, parse3.size());
            parse6.reduceToParsesWithSameRoot("karşı");
            assert.strictEqual(4, parse6.size());
            parse7.reduceToParsesWithSameRoot("esas");
            assert.strictEqual(8, parse7.size());
            parse8.reduceToParsesWithSameRoot("güç");
            assert.strictEqual(6, parse8.size());
        });
        it('testConstructParseListForDifferentRootWithPos', function() {
            assert.strictEqual(1, parse1.constructParseListForDifferentRootWithPos().length);
            assert.strictEqual(2, parse2.constructParseListForDifferentRootWithPos().length);
            assert.strictEqual(5, parse3.constructParseListForDifferentRootWithPos().length);
            assert.strictEqual(4, parse4.constructParseListForDifferentRootWithPos().length);
            assert.strictEqual(5, parse5.constructParseListForDifferentRootWithPos().length);
            assert.strictEqual(7, parse6.constructParseListForDifferentRootWithPos().length);
            assert.strictEqual(2, parse7.constructParseListForDifferentRootWithPos().length);
            assert.strictEqual(2, parse8.constructParseListForDifferentRootWithPos().length);
            assert.strictEqual(1, parse9.constructParseListForDifferentRootWithPos().length);
        });
        it('testParsesWithoutPrefixAndSuffix', function() {
            assert.strictEqual("P3SG+NOM$PNON+ACC", parse10.parsesWithoutPrefixAndSuffix());
            assert.strictEqual("A3PL+P3PL+NOM$A3PL+P3SG+NOM$A3PL+PNON+ACC$A3SG+P3PL+NOM", parse11.parsesWithoutPrefixAndSuffix());
            assert.strictEqual("DET$PRON+DEMONSP+A3SG+PNON+NOM$PRON+PERS+A3SG+PNON+NOM", parse12.parsesWithoutPrefixAndSuffix());
            assert.strictEqual("NOUN+A3SG+P3SG+NOM$NOUN^DB+ADJ+ALMOST", parse13.parsesWithoutPrefixAndSuffix());
        });
    });
});
