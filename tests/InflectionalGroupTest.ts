import * as assert from "assert";
import {InflectionalGroup} from "../dist/MorphologicalAnalysis/InflectionalGroup";
import {MorphologicalTag} from "../dist/MorphologicalAnalysis/MorphologicalTag";

describe('InflectionalGroupTest', function() {
    describe('InflectionalGroupTest', function() {
        it('testGetMorphologicalTag', function() {
            assert.strictEqual(InflectionalGroup.getMorphologicalTag("noun"), MorphologicalTag.NOUN);
            assert.strictEqual(InflectionalGroup.getMorphologicalTag("without"), MorphologicalTag.WITHOUT);
            assert.strictEqual(InflectionalGroup.getMorphologicalTag("interj"), MorphologicalTag.INTERJECTION);
            assert.strictEqual(InflectionalGroup.getMorphologicalTag("inf2"), MorphologicalTag.INFINITIVE2);
        });
        it('size', function() {
            let inflectionalGroup1 = new InflectionalGroup("ADJ");
            assert.strictEqual(1, inflectionalGroup1.size());
            let inflectionalGroup2 = new InflectionalGroup("ADJ+JUSTLIKE");
            assert.strictEqual(2, inflectionalGroup2.size());
            let inflectionalGroup3 = new InflectionalGroup("ADJ+FUTPART+P1PL");
            assert.strictEqual(3, inflectionalGroup3.size());
            let inflectionalGroup4 = new InflectionalGroup("NOUN+A3PL+P1PL+ABL");
            assert.strictEqual(4, inflectionalGroup4.size());
            let inflectionalGroup5 = new InflectionalGroup("ADJ+WITH+A3SG+P3SG+ABL");
            assert.strictEqual(5, inflectionalGroup5.size());
            let inflectionalGroup6 = new InflectionalGroup("VERB+ABLE+NEG+FUT+A3PL+COP");
            assert.strictEqual(6, inflectionalGroup6.size());
            let inflectionalGroup7 = new InflectionalGroup("VERB+ABLE+NEG+AOR+A3SG+COND+A1SG");
            assert.strictEqual(7, inflectionalGroup7.size());
        });
        it('containsCase', function() {
            let inflectionalGroup1 = new InflectionalGroup("NOUN+ACTOF+A3PL+P1PL+NOM");
            assert.notStrictEqual(undefined, inflectionalGroup1.containsCase());
            let inflectionalGroup2 = new InflectionalGroup("NOUN+A3PL+P1PL+ACC");
            assert.notStrictEqual(undefined, inflectionalGroup2.containsCase());
            let inflectionalGroup3 = new InflectionalGroup("NOUN+ZERO+A3SG+P3PL+DAT");
            assert.notStrictEqual(undefined, inflectionalGroup3.containsCase());
            let inflectionalGroup4 = new InflectionalGroup("PRON+QUANTP+A1PL+P1PL+LOC");
            assert.notStrictEqual(undefined, inflectionalGroup4.containsCase());
            let inflectionalGroup5 = new InflectionalGroup("NOUN+AGT+A3SG+P2SG+ABL");
            assert.notStrictEqual(undefined, inflectionalGroup5.containsCase());
        });
        it('containsPlural', function() {
            let inflectionalGroup1 = new InflectionalGroup("VERB+NEG+NECES+A1PL");
            assert.ok(inflectionalGroup1.containsPlural());
            let inflectionalGroup2 = new InflectionalGroup("PRON+PERS+A2PL+PNON+NOM");
            assert.ok(inflectionalGroup2.containsPlural());
            let inflectionalGroup3 = new InflectionalGroup("NOUN+DIM+A3PL+P2SG+GEN");
            assert.ok(inflectionalGroup3.containsPlural());
            let inflectionalGroup4 = new InflectionalGroup("NOUN+A3PL+P1PL+GEN");
            assert.ok(inflectionalGroup4.containsPlural());
            let inflectionalGroup5 = new InflectionalGroup("NOUN+ZERO+A3SG+P2PL+INS");
            assert.ok(inflectionalGroup5.containsPlural());
            let inflectionalGroup6 = new InflectionalGroup("PRON+QUANTP+A3PL+P3PL+LOC");
            assert.ok(inflectionalGroup6.containsPlural());
        });
        it('containsTag', function() {
            let inflectionalGroup1 = new InflectionalGroup("NOUN+ZERO+A3SG+P1SG+NOM");
            assert.ok(inflectionalGroup1.containsTag(MorphologicalTag.NOUN));
            let inflectionalGroup2 = new InflectionalGroup("NOUN+AGT+A3PL+P2SG+ABL");
            assert.ok(inflectionalGroup2.containsTag(MorphologicalTag.AGENT));
            let inflectionalGroup3 = new InflectionalGroup("NOUN+INF2+A3PL+P3SG+NOM");
            assert.ok(inflectionalGroup3.containsTag(MorphologicalTag.NOMINATIVE));
            let inflectionalGroup4 = new InflectionalGroup("NOUN+ZERO+A3SG+P1PL+ACC");
            assert.ok(inflectionalGroup4.containsTag(MorphologicalTag.ZERO));
            let inflectionalGroup5 = new InflectionalGroup("NOUN+ZERO+A3SG+P2PL+INS");
            assert.ok(inflectionalGroup5.containsTag(MorphologicalTag.P2PL));
            let inflectionalGroup6 = new InflectionalGroup("PRON+QUANTP+A3PL+P3PL+LOC");
            assert.ok(inflectionalGroup6.containsTag(MorphologicalTag.QUANTITATIVEPRONOUN));
        });
        it('containsPossessive', function() {
            let inflectionalGroup1 = new InflectionalGroup("NOUN+ZERO+A3SG+P1SG+NOM");
            assert.ok(inflectionalGroup1.containsPossessive());
            let inflectionalGroup2 = new InflectionalGroup("NOUN+AGT+A3PL+P2SG+ABL");
            assert.ok(inflectionalGroup2.containsPossessive());
            let inflectionalGroup3 = new InflectionalGroup("NOUN+INF2+A3PL+P3SG+NOM");
            assert.ok(inflectionalGroup3.containsPossessive());
            let inflectionalGroup4 = new InflectionalGroup("NOUN+ZERO+A3SG+P1PL+ACC");
            assert.ok(inflectionalGroup4.containsPossessive());
            let inflectionalGroup5 = new InflectionalGroup("NOUN+ZERO+A3SG+P2PL+INS");
            assert.ok(inflectionalGroup5.containsPossessive());
            let inflectionalGroup6 = new InflectionalGroup("PRON+QUANTP+A3PL+P3PL+LOC");
            assert.ok(inflectionalGroup6.containsPossessive());
        });
    });
});
