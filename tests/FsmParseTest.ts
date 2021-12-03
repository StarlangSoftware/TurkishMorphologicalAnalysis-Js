import * as assert from "assert";
import {FsmMorphologicalAnalyzer} from "../dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";

describe('FsmParseTest', function() {
    describe('FsmParseTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        let parse1 = fsm.morphologicalAnalysis("açılır").getFsmParse(1);
        let parse2 = fsm.morphologicalAnalysis("koparılarak").getFsmParse(0);
        let parse3 = fsm.morphologicalAnalysis("toplama").getFsmParse(0);
        let parse4 = fsm.morphologicalAnalysis("değerlendirmede").getFsmParse(0);
        let parse5 = fsm.morphologicalAnalysis("soruşturmasının").getFsmParse(0);
        let parse6 = fsm.morphologicalAnalysis("karşılaştırmalı").getFsmParse(1);
        let parse7 = fsm.morphologicalAnalysis("esaslarını").getFsmParse(0);
        let parse8 = fsm.morphologicalAnalysis("güçleriyle").getFsmParse(0);
        let parse9 = fsm.morphologicalAnalysis("bulmayacakları").getFsmParse(0);
        let parse10 = fsm.morphologicalAnalysis("mü").getFsmParse(0);
        it('testGetLastLemmaWithTag', function() {
            assert.strictEqual("açıl", parse1.getLastLemmaWithTag("VERB"));
            assert.strictEqual("koparıl", parse2.getLastLemmaWithTag("VERB"));
            assert.strictEqual("değerlendir", parse4.getLastLemmaWithTag("VERB"));
            assert.strictEqual("soruştur", parse5.getLastLemmaWithTag("VERB"));
            assert.strictEqual("karşı", parse6.getLastLemmaWithTag("ADJ"));
        });
        it('testGetLastLemma', function() {
            assert.strictEqual("açıl", parse1.getLastLemma());
            assert.strictEqual("koparılarak", parse2.getLastLemma());
            assert.strictEqual("değerlendirme", parse4.getLastLemma());
            assert.strictEqual("soruşturma", parse5.getLastLemma());
            assert.strictEqual("karşılaştır", parse6.getLastLemma());
        });
        it('testGetTransitionList', function() {
            assert.strictEqual("aç+VERB^DB+VERB+PASS+POS+AOR+A3SG", parse1.toString());
            assert.strictEqual("kop+VERB^DB+VERB+CAUS^DB+VERB+PASS+POS^DB+ADV+BYDOINGSO", parse2.toString());
            assert.strictEqual("topla+NOUN+A3SG+P1SG+DAT", parse3.toString());
            assert.strictEqual("değer+NOUN+A3SG+PNON+NOM^DB+VERB+ACQUIRE^DB+VERB+CAUS+POS^DB+NOUN+INF2+A3SG+PNON+LOC", parse4.toString());
            assert.strictEqual("sor+VERB+RECIP^DB+VERB+CAUS+POS^DB+NOUN+INF2+A3SG+P3SG+GEN", parse5.toString());
            assert.strictEqual("karşı+ADJ^DB+VERB+BECOME^DB+VERB+CAUS+POS+NECES+A3SG", parse6.toString());
            assert.strictEqual("esas+ADJ^DB+NOUN+ZERO+A3PL+P2SG+ACC", parse7.toString());
            assert.strictEqual("güç+ADJ^DB+NOUN+ZERO+A3PL+P3PL+INS", parse8.toString());
            assert.strictEqual("bul+VERB+NEG^DB+ADJ+FUTPART+P3PL", parse9.toString());
            assert.strictEqual("mi+QUES+PRES+A3SG", parse10.toString());
        });
        it('testWithList', function() {
            assert.strictEqual("aç+Hl+Hr", parse1.getWithList());
            assert.strictEqual("kop+Ar+Hl+yArAk", parse2.getWithList());
            assert.strictEqual("topla+Hm+yA", parse3.getWithList());
            assert.strictEqual("değer+lAn+DHr+mA+DA", parse4.getWithList());
            assert.strictEqual("sor+Hs+DHr+mA+sH+nHn", parse5.getWithList());
            assert.strictEqual("karşı+lAs+DHr+mAlH", parse6.getWithList());
            assert.strictEqual("esas+lAr+Hn+yH", parse7.getWithList());
            assert.strictEqual("güç+lArH+ylA", parse8.getWithList());
            assert.strictEqual("bul+mA+yAcAk+lArH", parse9.getWithList());
        });
        it('testSuffixList', function() {
            assert.strictEqual("VerbalRoot(F5PR)(aç)+PassiveHl(açıl)+OtherTense2(açılır)", parse1.getSuffixList());
            assert.strictEqual("VerbalRoot(F1P1)(kop)+CausativeAr(kopar)+PassiveHl(koparıl)+Adverb1(koparılarak)", parse2.getSuffixList());
            assert.strictEqual("NominalRoot(topla)+Possessive(toplam)+Case1(toplama)", parse3.getSuffixList());
            assert.strictEqual("NominalRoot(değer)+VerbalRoot(F5PR)(değerlen)+CausativeDHr(değerlendir)+NominalRoot(değerlendirme)+Case1(değerlendirmede)", parse4.getSuffixList());
            assert.strictEqual("VerbalRoot(F5PR)(sor)+Reciprocal(soruş)+CausativeDHr(soruştur)+NominalRoot(soruşturma)+Possessive3(soruşturması)+Case1(soruşturmasının)", parse5.getSuffixList());
            assert.strictEqual("AdjectiveRoot(karşı)+VerbalRoot(F5PR)(karşılaş)+CausativeDHr(karşılaştır)+OtherTense(karşılaştırmalı)", parse6.getSuffixList());
            assert.strictEqual("AdjectiveRoot(esas)+Plural(esaslar)+Possessive(esasların)+AccusativeNoun(esaslarını)", parse7.getSuffixList());
            assert.strictEqual("AdjectiveRoot(güç)+Possesive3(güçleri)+Case1(güçleriyle)", parse8.getSuffixList());
            assert.strictEqual("VerbalRoot(F5PW)(bul)+Negativema(bulma)+AdjectiveParticiple(bulmayacak)+Adjective(bulmayacakları)", parse9.getSuffixList());
        });
    });
});
