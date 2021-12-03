import {DisambiguationCorpus} from "../dist/Corpus/DisambiguationCorpus";
import * as assert from "assert";

describe('DisambiguationCorpusTest', function() {
    describe('DisambiguationCorpusTest', function() {
        it('testCorpus', function() {
            let corpus = new DisambiguationCorpus("penntreebank.txt");
            assert.strictEqual(19109, corpus.sentenceCount());
            assert.strictEqual(170211, corpus.numberOfWords());
        });
    });
});
