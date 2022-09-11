export declare enum MorphologicalTag {
    /**
     * Noun : Alengir
     */
    NOUN = 0,
    /**
     * Adverb : Alelacele
     */
    ADVERB = 1,
    /**
     * Adjective : Alengirli
     */
    ADJECTIVE = 2,
    /**
     * Verb : Alıkoy
     */
    VERB = 3,
    /**
     * 1st person singular agreement : Ben gelirim
     */
    A1SG = 4,
    /**
     * 2nd person singular agreement : Sen gelirsin
     */
    A2SG = 5,
    /**
     * 3rd person singular agreement : O gelir
     */
    A3SG = 6,
    /**
     * 1st person plural agreement : Biz geliriz
     */
    A1PL = 7,
    /**
     * 2nd person plural agreement : Siz gelirsiniz
     */
    A2PL = 8,
    /**
     * 3rd person plural agreement : Onlar gelirler
     */
    A3PL = 9,
    /**
     * 1st person singular possessive : Benim
     */
    P1SG = 10,
    /**
     * 2nd person singular possessive :Senin
     */
    P2SG = 11,
    /**
     * 3rd person singular possessive : Onun
     */
    P3SG = 12,
    /**
     * 1st person plural possessive :  Bizim
     */
    P1PL = 13,
    /**
     * 2nd person plural possessive : Sizin
     */
    P2PL = 14,
    /**
     * 3rd person plural possessive : Onların
     */
    P3PL = 15,
    /**
     * Proper noun : John
     */
    PROPERNOUN = 16,
    /**
     * None possessive : Ev
     */
    PNON = 17,
    /**
     * Nominative Case : Kedi uyuyor.
     */
    NOMINATIVE = 18,
    /**
     * With : Kalemle
     */
    WITH = 19,
    /**
     * Without : Dikişsiz
     */
    WITHOUT = 20,
    /**
     * Accusatıve : Beni
     */
    ACCUSATIVE = 21,
    /**
     * Dative case : Bana
     */
    DATIVE = 22,
    /**
     * Genitive : Benim
     */
    GENITIVE = 23,
    /**
     * Ablative : Okuldan
     */
    ABLATIVE = 24,
    /**
     * Perosnal pronoun : O
     */
    PERSONALPRONOUN = 25,
    /**
     * Zero Derivation : Kırmızıydı
     */
    ZERO = 26,
    /**
     * Ability, possibility : Olabilir
     */
    ABLE = 27,
    /**
     * Negative : Yapama
     */
    NEGATIVE = 28,
    /**
     * Past tense : Gitti
     */
    PASTTENSE = 29,
    /**
     * Conjunction or disjunction : Ama, ise
     */
    CONJUNCTION = 30,
    /**
     * Determiner : Birtakım
     */
    DETERMINER = 31,
    /**
     * Duplication : Çıtır çıtır
     */
    DUPLICATION = 32,
    /**
     * Interjection : Agucuk
     */
    INTERJECTION = 33,
    /**
     * Number : bir
     */
    NUMBER = 34,
    /**
     * Post posıtıon : Atfen
     */
    POSTPOSITION = 35,
    /**
     * Punctuation : +
     */
    PUNCTUATION = 36,
    /**
     * Question : Mı
     */
    QUESTION = 37,
    /**
     * Agent : Toplayıcı
     */
    AGENT = 38,
    /**
     * By doing so : Zıplayarak
     */
    BYDOINGSO = 39,
    /**
     * Cardinal : yüz, bin
     */
    CARDINAL = 40,
    /**
     * Causative Form : Pişirmek
     */
    CAUSATIVE = 41,
    /**
     * Demonstrative pronoun : Bu, şu
     */
    DEMONSTRATIVEPRONOUN = 42,
    /**
     * Distributive : altışar
     */
    DISTRIBUTIVE = 43,
    /**
     * Fit for : Ahmetlik
     */
    FITFOR = 44,
    /**
     * Future participle : Gülecek
     */
    FUTUREPARTICIPLE = 45,
    /**
     * Infinitive : Biri
     */
    INFINITIVE = 46,
    /**
     * Ness : Ağırbaşlılık
     */
    NESS = 47,
    /**
     * Ordinal Number : Altıncı
     */
    ORDINAL = 48,
    /**
     * Passive : Açıldı
     */
    PASSIVE = 49,
    /**
     * Past participle : Kırılmış
     */
    PASTPARTICIPLE = 50,
    /**
     * Present partıcıple : Sarılan
     */
    PRESENTPARTICIPLE = 51,
    /**
     * Question pronoun : Kim
     */
    QUESTIONPRONOUN = 52,
    /**
     * Quantitative pronoun : Each
     */
    QUANTITATIVEPRONOUN = 53,
    /**
     * Range : 1 - 3
     */
    RANGE = 54,
    /**
     * Ratio : 1/2
     */
    RATIO = 55,
    /**
     * Real : 1.0
     */
    REAL = 56,
    /**
     * Reciprocal verb : Görüşmek
     */
    RECIPROCAL = 57,
    /**
     * Reflexive : Kendi
     */
    REFLEXIVE = 58,
    /**
     * Reflexive pronoun : Kendim
     */
    REFLEXIVEPRONOUN = 59,
    /**
     * Time : 14:28
     */
    TIME = 60,
    /**
     * When : Okuyunca
     */
    WHEN = 61,
    /**
     * While : Gelirken
     */
    WHILE = 62,
    /**
     * Without having done so : Çaktırmadan
     */
    WITHOUTHAVINGDONESO = 63,
    /**
     * PC ablative : Başka
     */
    PCABLATIVE = 64,
    /***
     * PC accusative : Takiben
     */
    PCACCUSATIVE = 65,
    /**
     * PC dative : İlişkin
     */
    PCDATIVE = 66,
    /**
     * PC genitive : Yanısıra
     */
    PCGENITIVE = 67,
    /**
     * PC instrumental : Birlikte
     */
    PCINSTRUMENTAL = 68,
    /**
     * PC nominative
     */
    PCNOMINATIVE = 69,
    /**
     * Acquire : Kazanılan
     */
    ACQUIRE = 70,
    /**
     * Act of : Aldatmaca
     */
    ACTOF = 71,
    /**
     * After doing so : Yapıp
     */
    AFTERDOINGSO = 72,
    /**
     * Almost : Dikensi
     */
    ALMOST = 73,
    /**
     * As : gibi
     */
    AS = 74,
    /**
     * As if : Yaşarmışcasına
     */
    ASIF = 75,
    /**
     * Become : Abideleş
     */
    BECOME = 76,
    /**
     * Ever since : Çıkagel
     */
    EVERSINCE = 77,
    /**
     * Projection : Öpülesi
     */
    FEELLIKE = 78,
    /**
     * Hastility : Yapıver
     */
    HASTILY = 79,
    /**
     * In between : Arasında
     */
    INBETWEEN = 80,
    /**
     * Just like : Destansı
     */
    JUSTLIKE = 81,
    /**
     * -LY : Akıllıca
     */
    LY = 82,
    /**
     * Related to : Davranışsal
     */
    RELATED = 83,
    /**
     * Continuous : Yapadur
     */
    REPEAT = 84,
    /**
     * Since doing so : Amasyalı
     */
    SINCE = 85,
    /**
     * Since doing so : Amasyalı
     */
    SINCEDOINGSO = 86,
    /**
     * Start : Alıkoy
     */
    START = 87,
    /**
     * Stay : Bakakal
     */
    STAY = 88,
    /**
     * Equative : Öylece
     */
    EQUATIVE = 89,
    /**
     * Instrumental : Kışın, arabayla
     */
    INSTRUMENTAL = 90,
    /**
     * Aorist Tense : Her hafta sonunda futbol oynarlar.
     */
    AORIST = 91,
    /**
     * Desire/Past Auxiliary : Çıkarsa
     */
    DESIRE = 92,
    /**
     * Future : Yağacak
     */
    FUTURE = 93,
    /**
     * Imperative : Otur!
     */
    IMPERATIVE = 94,
    /**
     * Narrative Past Tense : Oluşmuş
     */
    NARRATIVE = 95,
    /**
     * Necessity : Yapmalı
     */
    NECESSITY = 96,
    /**
     * Optative : Doğanaya
     */
    OPTATIVE = 97,
    /**
     * Past tense : Gitti
     */
    PAST = 98,
    /**
     * Present partıcıple : Sarılan
     */
    PRESENT = 99,
    /**
     * Progressive : Görüyorum
     */
    PROGRESSIVE1 = 100,
    /**
     * Progressive : Görmekteyim
     */
    PROGRESSIVE2 = 101,
    /**
     * Conditional : Gelirse
     */
    CONDITIONAL = 102,
    /**
     * Copula : Mavidir
     */
    COPULA = 103,
    /**
     * Positive : Gittim
     */
    POSITIVE = 104,
    /**
     * Pronoun : Ben
     */
    PRONOUN = 105,
    /**
     * Locative : Aşağıda
     */
    LOCATIVE = 106,
    /**
     * Relative : Gelenin
     */
    RELATIVE = 107,
    /**
     * Demonstrative : Bu
     */
    DEMONSTRATIVE = 108,
    /**
     * Infinitive2 : Gitme
     */
    INFINITIVE2 = 109,
    /**
     * Infinitive3 : Gidiş
     */
    INFINITIVE3 = 110,
    /**
     * Sentence beginning header
     */
    BEGINNINGOFSENTENCE = 111,
    /**
     * Sentence ending header
     */
    ENDOFSENTENCE = 112,
    /**
     * Title beginning header
     */
    BEGINNINGOFTITLE = 113,
    /**
     * Title ending header
     */
    ENDOFTITLE = 114,
    /**
     * Document beginning header
     */
    BEGINNINGOFDOCUMENT = 115,
    /**
     * Document ending header
     */
    ENDOFDOCUMENT = 116,
    /**
     * As long as : Yaşadıkça
     */
    ASLONGAS = 117,
    /**
     * Adamantly
     */
    ADAMANTLY = 118,
    /**
     * Percent : 15%
     */
    PERCENT = 119,
    /**
     * Without being able to have done so: kararlamadan
     */
    WITHOUTBEINGABLETOHAVEDONESO = 120,
    /**
     * Dimension : Küçücük
     */
    DIMENSION = 121,
    /**
     * Notable state : Anlaşılmazlık
     */
    NOTABLESTATE = 122,
    /**
     * Fraction : 1/2
     */
    FRACTION = 123,
    /**
     * Hash tag : #
     */
    HASHTAG = 124,
    /**
     * E-mail : @
     */
    EMAIL = 125,
    /**
     * Date : 11/06/2018
     */
    DATE = 126,
    /**
     * Code : i7-9700K
     */
    CODE = 127,
    /**
     * Metric : 6cmx7cmx8cm
     */
    METRIC = 128
}
