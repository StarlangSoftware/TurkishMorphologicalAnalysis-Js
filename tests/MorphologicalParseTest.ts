import * as assert from "assert";
import {MorphologicalParse} from "../dist/MorphologicalAnalysis/MorphologicalParse";

describe('MorphologicalParseTest', function() {
    describe('MorphologicalParseTest', function() {
        let parse1 = new MorphologicalParse("bayan+NOUN+A3SG+PNON+NOM");
        let parse2 = new MorphologicalParse("yaşa+VERB+POS^DB+ADJ+PRESPART");
        let parse3 = new MorphologicalParse("serbest+ADJ");
        let parse4 = new MorphologicalParse("et+VERB^DB+VERB+PASS^DB+VERB+ABLE+NEG+AOR+A3SG");
        let parse5 = new MorphologicalParse("sür+VERB^DB+VERB+CAUS^DB+VERB+PASS+POS^DB+NOUN+INF2+A3SG+P3SG+NOM");
        let parse6 = new MorphologicalParse("değiş+VERB^DB+VERB+CAUS^DB+VERB+PASS+POS^DB+VERB+ABLE+AOR^DB+ADJ+ZERO");
        let parse7 = new MorphologicalParse("iyi+ADJ^DB+VERB+BECOME^DB+VERB+CAUS^DB+VERB+PASS+POS^DB+VERB+ABLE^DB+NOUN+INF2+A3PL+P3PL+ABL");
        let parse8 = new MorphologicalParse("değil+ADJ^DB+VERB+ZERO+PAST+A3SG");
        let parse9 = new MorphologicalParse("hazır+ADJ^DB+VERB+ZERO+PAST+A3SG");
        it('testGetTransitionList', function() {
            assert.strictEqual("NOUN+A3SG+PNON+NOM", parse1.getMorphologicalParseTransitionList());
            assert.strictEqual("VERB+POS+ADJ+PRESPART", parse2.getMorphologicalParseTransitionList());
            assert.strictEqual("ADJ", parse3.getMorphologicalParseTransitionList());
            assert.strictEqual("VERB+VERB+PASS+VERB+ABLE+NEG+AOR+A3SG", parse4.getMorphologicalParseTransitionList());
            assert.strictEqual("VERB+VERB+CAUS+VERB+PASS+POS+NOUN+INF2+A3SG+P3SG+NOM", parse5.getMorphologicalParseTransitionList());
            assert.strictEqual("VERB+VERB+CAUS+VERB+PASS+POS+VERB+ABLE+AOR+ADJ+ZERO", parse6.getMorphologicalParseTransitionList());
            assert.strictEqual("ADJ+VERB+BECOME+VERB+CAUS+VERB+PASS+POS+VERB+ABLE+NOUN+INF2+A3PL+P3PL+ABL", parse7.getMorphologicalParseTransitionList());
            assert.strictEqual("ADJ+VERB+ZERO+PAST+A3SG", parse8.getMorphologicalParseTransitionList());
        });
        it('testGetTag', function() {
            assert.strictEqual("A3SG", parse1.getTag(2));
            assert.strictEqual("PRESPART", parse2.getTag(4));
            assert.strictEqual("serbest", parse3.getTag(0));
            assert.strictEqual("AOR", parse4.getTag(7));
            assert.strictEqual("P3SG", parse5.getTag(10));
            assert.strictEqual("ABLE", parse6.getTag(8));
            assert.strictEqual("ABL", parse7.getTag(15));
        });
        it('testGetTagSize', function() {
            assert.strictEqual(5, parse1.tagSize());
            assert.strictEqual(5, parse2.tagSize());
            assert.strictEqual(2, parse3.tagSize());
            assert.strictEqual(9, parse4.tagSize());
            assert.strictEqual(12, parse5.tagSize());
            assert.strictEqual(12, parse6.tagSize());
            assert.strictEqual(16, parse7.tagSize());
            assert.strictEqual(6, parse8.tagSize());
        });
        it('testSize', function() {
            assert.strictEqual(1, parse1.size());
            assert.strictEqual(2, parse2.size());
            assert.strictEqual(1, parse3.size());
            assert.strictEqual(3, parse4.size());
            assert.strictEqual(4, parse5.size());
            assert.strictEqual(5, parse6.size());
            assert.strictEqual(6, parse7.size());
            assert.strictEqual(2, parse8.size());
        });
        it('testGetRootPos', function() {
            assert.strictEqual("NOUN", parse1.getRootPos());
            assert.strictEqual("VERB", parse2.getRootPos());
            assert.strictEqual("ADJ", parse3.getRootPos());
            assert.strictEqual("VERB", parse4.getRootPos());
            assert.strictEqual("VERB", parse5.getRootPos());
            assert.strictEqual("VERB", parse6.getRootPos());
            assert.strictEqual("ADJ", parse7.getRootPos());
            assert.strictEqual("ADJ", parse8.getRootPos());
        });
        it('testGetPos', function() {
            assert.strictEqual("NOUN", parse1.getPos());
            assert.strictEqual("ADJ", parse2.getPos());
            assert.strictEqual("ADJ", parse3.getPos());
            assert.strictEqual("VERB", parse4.getPos());
            assert.strictEqual("NOUN", parse5.getPos());
            assert.strictEqual("ADJ", parse6.getPos());
            assert.strictEqual("NOUN", parse7.getPos());
            assert.strictEqual("VERB", parse8.getPos());
        });
        it('testGetWordWithPos', function() {
            assert.strictEqual("bayan+NOUN", parse1.getWordWithPos().getName());
            assert.strictEqual("yaşa+VERB", parse2.getWordWithPos().getName());
            assert.strictEqual("serbest+ADJ", parse3.getWordWithPos().getName());
            assert.strictEqual("et+VERB", parse4.getWordWithPos().getName());
            assert.strictEqual("sür+VERB", parse5.getWordWithPos().getName());
            assert.strictEqual("değiş+VERB", parse6.getWordWithPos().getName());
            assert.strictEqual("iyi+ADJ", parse7.getWordWithPos().getName());
            assert.strictEqual("değil+ADJ", parse8.getWordWithPos().getName());
        });
        it('testLastIGContainsCase', function() {
            assert.strictEqual("NOM", parse1.lastIGContainsCase());
            assert.strictEqual("NULL", parse2.lastIGContainsCase());
            assert.strictEqual("NULL", parse3.lastIGContainsCase());
            assert.strictEqual("NULL", parse4.lastIGContainsCase());
            assert.strictEqual("NOM", parse5.lastIGContainsCase());
            assert.strictEqual("NULL", parse6.lastIGContainsCase());
            assert.strictEqual("ABL", parse7.lastIGContainsCase());
        });
        it('testLastIGContainsPossessive', function() {
            assert.ok(!parse1.lastIGContainsPossessive());
            assert.ok(!parse2.lastIGContainsPossessive());
            assert.ok(!parse3.lastIGContainsPossessive());
            assert.ok(!parse4.lastIGContainsPossessive());
            assert.ok(parse5.lastIGContainsPossessive());
            assert.ok(!parse6.lastIGContainsPossessive());
            assert.ok(parse7.lastIGContainsPossessive());
        });
        it('testIsPlural', function() {
            assert.ok(!parse1.isPlural());
            assert.ok(!parse2.isPlural());
            assert.ok(!parse3.isPlural());
            assert.ok(!parse4.isPlural());
            assert.ok(!parse5.isPlural());
            assert.ok(!parse6.isPlural());
            assert.ok(parse7.isPlural());
        });
        it('testIsAuxiliary', function() {
            assert.ok(!parse1.isAuxiliary());
            assert.ok(!parse2.isAuxiliary());
            assert.ok(!parse3.isAuxiliary());
            assert.ok(parse4.isAuxiliary());
            assert.ok(!parse5.isAuxiliary());
            assert.ok(!parse6.isAuxiliary());
            assert.ok(!parse7.isAuxiliary());
        });
        it('testIsNoun', function() {
            assert.ok(parse1.isNoun());
            assert.ok(parse5.isNoun());
            assert.ok(parse7.isNoun());
        });
        it('testIsAdjective', function() {
            assert.ok(parse2.isAdjective());
            assert.ok(parse3.isAdjective());
            assert.ok(parse6.isAdjective());
        });
        it('testIsVerb', function() {
            assert.ok(parse4.isVerb());
            assert.ok(parse8.isVerb());
        });
        it('testIsRootVerb', function() {
            assert.ok(parse2.isRootVerb());
            assert.ok(parse4.isRootVerb());
            assert.ok(parse5.isRootVerb());
            assert.ok(parse6.isRootVerb());
        });
        it('testGetTreePos', function() {
            assert.strictEqual("NP", parse1.getTreePos());
            assert.strictEqual("ADJP", parse2.getTreePos());
            assert.strictEqual("ADJP", parse3.getTreePos());
            assert.strictEqual("VP", parse4.getTreePos());
            assert.strictEqual("NP", parse5.getTreePos());
            assert.strictEqual("ADJP", parse6.getTreePos());
            assert.strictEqual("NP", parse7.getTreePos());
            assert.strictEqual("NEG", parse8.getTreePos());
            assert.strictEqual("NOMP", parse9.getTreePos());
        });
    });
});