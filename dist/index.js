"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Corpus/DisambiguatedWord"), exports);
__exportStar(require("./Corpus/DisambiguationCorpus"), exports);
__exportStar(require("./MorphologicalAnalysis/FiniteStateMachine"), exports);
__exportStar(require("./MorphologicalAnalysis/FsmMorphologicalAnalyzer"), exports);
__exportStar(require("./MorphologicalAnalysis/FsmParse"), exports);
__exportStar(require("./MorphologicalAnalysis/FsmParseList"), exports);
__exportStar(require("./MorphologicalAnalysis/InflectionalGroup"), exports);
__exportStar(require("./MorphologicalAnalysis/MetamorphicParse"), exports);
__exportStar(require("./MorphologicalAnalysis/MorphologicalParse"), exports);
__exportStar(require("./MorphologicalAnalysis/MorphologicalTag"), exports);
__exportStar(require("./MorphologicalAnalysis/State"), exports);
__exportStar(require("./MorphologicalAnalysis/Transition"), exports);
//# sourceMappingURL=index.js.map