interface Provider {
    name: string;
    url?: string;
    offline: boolean;
    supportedLanguages: string[];
}
export interface DefinitionProvider extends Provider {
    requestDefinitions(query: string, lang: string): Promise<DictionaryWord>;
}

export interface SynonymProvider extends Provider {
    requestSynonyms(query: string, lang: string, pos?: PartOfSpeech): Promise<Synonym[]>;
}

export interface PartOfSpeechProvider extends Provider {
    requestPartOfSpeech(word: string, leftContext: string, rightContext: string, lang: string): Promise<PartOfSpeech>;
}

export enum PartOfSpeech {
    Noun,
    Verb,
    Adjective,
    Adverb,
}
export interface DictionaryWord {
    word: string;
    origin?: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
}

export interface Definition {
    definition: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
}

export interface Synonym {
    word: string;
    partsOfSpeech?: string[];
    description?: string;
}

export interface Phonetic {
    text: string;
    audio?: string;
}

//Offline Dic:

export interface OfflineDic {
    star:     string;
    readings: string[];
    defs:     OfflineDef[];
}

export interface OfflineDef {
    pos_cn: Pos_cn;
    def_cn: string;
    pos_en: Pos_en;
    ext:    OfflineEx[];
    def_en: string;
}

export interface OfflineEx {
    ext_cn: string;
    ext_en: string;
}

export enum Pos_cn {
    Adj = "ADJ",
    COMBInADJ = "COMB in ADJ",
    Empty = "",
    不可数名词 = "不可数名词",
    不可数名词复数名词 = "不可数名词；复数名词",
    不可数名词感叹词 = "不可数名词；感叹词",
    不可数集合名词 = "不可数集合名词",
    不定代词 = "不定代词",
    不定副词 = "不定副词",
    与副词构成的词 = "与副词构成的词",
    与动词构成的词 = "与动词构成的词",
    与名词构成的词 = "与名词构成的词",
    与形容词可数名词构成的词 = "与形容词，可数名词构成的词",
    与形容词名词构成的词 = "与形容词，名词构成的词",
    与形容词构成的词 = "与形容词构成的词",
    与数量词构成的词 = "与数量词构成的词",
    与颜色词构成的词 = "与颜色词构成的词",
    专有名词 = "专有名词",
    专有名词可数名词 = "专有名词；可数名词",
    专有名词称呼名词 = "专有名词；称呼名词",
    专有复数名词 = "专有复数名词",
    专有集合名词 = "专有集合名词",
    介词 = "介词",
    代词 = "代词",
    作者名 = "作者名",
    关系代词 = "关系代词",
    分数词 = "分数词",
    前缀 = "前缀",
    前置限定词 = "前置限定词",
    副词 = "副词",
    副词最高级形式 = "副词最高级形式",
    副词比较级形式 = "副词比较级形式",
    动词 = "动词",
    助动词 = "助动词",
    单数名词 = "单数名词",
    单数名词声音词 = "单数名词；声音词",
    单数名词头衔名词 = "单数名词；头衔名词",
    单数型代词 = "单数型代词",
    单数集合名词 = "单数集合名词",
    单数集合名词专有集合名词 = "单数集合名词；专有集合名词",
    及物不及物动词 = "及物/不及物动词",
    反身代词 = "反身代词",
    可变名词 = "可变名词",
    可变名词名称名词 = "可变名词；名称名词",
    可变集合名词 = "可变集合名词",
    可数名词 = "可数名词",
    可数名词专有名词 = "可数名词；专有名词",
    可数名词名称名词 = "可数名词；名称名词",
    可数名词声音词 = "可数名词；声音词",
    可数名词头衔名词 = "可数名词；头衔名词",
    可数名词头衔名词称呼名词 = "可数名词；头衔名词；称呼名词",
    可数名词称呼名词 = "可数名词；称呼名词",
    可数集合名词 = "可数集合名词",
    可数集合名词名称名词 = "可数集合名词；名称名词",
    名称名词 = "名称名词",
    名称名词名称名词 = "名称名词；名称名词",
    后缀 = "后缀",
    否定不定代词 = "否定不定代词",
    否定不定副词 = "否定不定副词",
    否定副词 = "否定副词",
    否定词 = "否定词",
    否定限定词 = "否定限定词",
    声音词 = "声音词",
    复数名词 = "复数名词",
    复数名词名称名词 = "复数名词；名称名词",
    复数型代词 = "复数型代词",
    复数数量词 = "复数数量词",
    头衔名词 = "头衔名词",
    头衔名词可数名词 = "头衔名词；可数名词",
    头衔名词可数名词称呼名词 = "头衔名词；可数名词；称呼名词",
    头衔名词称呼名词 = "头衔名词；称呼名词",
    头衔名词称呼名词可数名词 = "头衔名词；称呼名词；可数名词",
    家庭成员名词 = "家庭成员名词",
    家庭成员名词头衔名词 = "家庭成员名词；头衔名词",
    广义否定结构副词 = "广义否定结构副词",
    序数词 = "序数词",
    强调代词 = "强调代词",
    强调反身代词 = "强调反身代词",
    形容词 = "形容词",
    形容词最高级形式 = "形容词最高级形式",
    形容词比较级形式 = "形容词比较级形式",
    形容词通常用于名词前 = "形容词  通常用于名词前",
    情态动词 = "情态动词",
    情态动词短语 = "情态动词短语",
    惯用语 = "惯用语",
    感叹词不可数名词 = "感叹词；不可数名词",
    感叹语 = "感叹语",
    所有格代词 = "所有格代词",
    所有格限定词 = "所有格限定词",
    数词 = "数词",
    数量词 = "数量词",
    构词成分 = "构词成分",
    物质名词 = "物质名词",
    疑问词 = "疑问词",
    相互代词 = "相互代词",
    相互动词 = "相互动词",
    相互动词习语 = "相互动词习语",
    相互动词短语 = "相互动词短语",
    相互短语 = "相互短语",
    短语 = "短语",
    短语介词 = "短语介词",
    短语动词 = "短语动词",
    称呼名词 = "称呼名词",
    称呼名词专有名词 = "称呼名词；专有名词",
    称呼名词单数名词 = "称呼名词；单数名词",
    称呼名词可数名词 = "称呼名词；可数名词",
    称呼名词复数名词 = "称呼名词；复数名词",
    称呼名词头衔名词可数名词 = "称呼名词；头衔名词；可数名词",
    能被表示程度的副词或介词词组修饰的形容词 = "能被表示程度的副词或介词词组修饰的形容词",
    表示说话时的语气或感情 = "表示说话时的语气或感情",
    被动代词习语 = "被动代词习语",
    被动动词 = "被动动词",
    被动动词短语 = "被动动词短语",
    被动相互动词 = "被动相互动词",
    論壇 = "論壇",
    连系动词 = "连系动词",
    连系动词及物不及物 = "连系动词（及物/不及物）",
    连系动词短语 = "连系动词短语",
    连词 = "连词",
    限定词 = "限定词",
    颜色词 = "颜色词",
}

export enum Pos_en {
    ADJUsuADJN = "ADJ usu ADJ n",
    ADVAsReply = "ADV as reply",
    Adj = "ADJ",
    AdjCompar = "ADJ-COMPAR",
    AdjGraded = "ADJ-GRADED",
    AdjSuperl = "ADJ-SUPERL",
    AdjUngraded = "ADJ-UNGRADED",
    Adv = "ADV",
    AdvBrdNeg = "ADV-BRD-NEG",
    AdvCompar = "ADV-COMPAR",
    AdvGraded = "ADV-GRADED",
    AdvIndef = "ADV-INDEF",
    AdvIndefNeg = "ADV-INDEF-NEG",
    AdvNeg = "ADV-NEG",
    AdvSuperl = "ADV-SUPERL",
    Author = "AUTHOR",
    Aux = "AUX",
    COMBInADJ = "COMB in ADJ",
    COMBInADJAndN = "COMB in ADJ and N",
    COMBInADJAndNCOUNT = "COMB in ADJ and N-COUNT",
    COMBInADJGRADED = "COMB in ADJ-GRADED",
    COMBInADV = "COMB in ADV",
    COMBInCOLOUR = "COMB in COLOUR",
    COMBInN = "COMB in N",
    COMBInNCOUNT = "COMB in N-COUNT",
    COMBInNCOUNTCOMBInADJ = "COMB in N-COUNT, COMB in ADJ",
    COMBInNUNCOUNT = "COMB in N-UNCOUNT",
    COMBInNUNCOUNTADJ = "COMB in N-UNCOUNT, ADJ",
    COMBInQUANT = "COMB in QUANT",
    COMBInVERB = "COMB in VERB",
    Colour = "COLOUR",
    Comb = "COMB",
    ConjCoord = "CONJ-COORD",
    ConjCoordNeg = "CONJ-COORD-NEG",
    ConjSubord = "CONJ-SUBORD",
    Convention = "CONVENTION",
    Det = "DET",
    DetNeg = "DET-NEG",
    DetPoss = "DET-POSS",
    Exclam = "EXCLAM",
    ExclamNUncount = "EXCLAM; N-UNCOUNT",
    Forum = "FORUM",
    Fraction = "FRACTION",
    Interj = "INTERJ",
    Modal = "MODAL",
    NCOUNTAlsoNINNAMES = "N-COUNT; also N-IN-NAMES",
    NCOUNTAlsoNVOC = "N-COUNT; also N-VOC",
    NCount = "N-COUNT",
    NCountColl = "N-COUNT-COLL",
    NCountCollNInNames = "N-COUNT-COLL; N-IN-NAMES",
    NCountNInNames = "N-COUNT; N-IN-NAMES",
    NCountNProper = "N-COUNT; N-PROPER",
    NCountNTitle = "N-COUNT; N-TITLE",
    NCountNTitleNVoc = "N-COUNT; N-TITLE; N-VOC",
    NCountNVoc = "N-COUNT; N-VOC",
    NCountSound = "N-COUNT; SOUND",
    NFamily = "N-FAMILY",
    NFamilyNTitle = "N-FAMILY; N-TITLE",
    NInNames = "N-IN-NAMES",
    NMass = "N-MASS",
    NPROPERAlsoNCOUNT = "N-PROPER; also N-COUNT",
    NPlural = "N-PLURAL",
    NPluralNInNames = "N-PLURAL; N-IN-NAMES",
    NProper = "N-PROPER",
    NProperColl = "N-PROPER-COLL",
    NProperNVoc = "N-PROPER; N-VOC",
    NProperPlural = "N-PROPER-PLURAL",
    NSing = "N-SING",
    NSingColl = "N-SING-COLL",
    NSingCollNProperColl = "N-SING-COLL; N-PROPER-COLL",
    NSingNTitle = "N-SING; N-TITLE",
    NSingSound = "N-SING; SOUND",
    NTitle = "N-TITLE",
    NTitleNCount = "N-TITLE; N-COUNT",
    NTitleNCountNVoc = "N-TITLE; N-COUNT; N-VOC",
    NTitleNVoc = "N-TITLE; N-VOC",
    NTitleNVocNCount = "N-TITLE; N-VOC; N-COUNT",
    NUNCOUNTAlsoEXCLAM = "N-UNCOUNT, also EXCLAM",
    NUNCOUNTAlsoNPLURAL = "N-UNCOUNT; also N-PLURAL",
    NUncount = "N-UNCOUNT",
    NUncountColl = "N-UNCOUNT-COLL",
    NUncountExclam = "N-UNCOUNT; EXCLAM",
    NVARNum = "N-VAR num",
    NVar = "N-VAR",
    NVarColl = "N-VAR-COLL",
    NVarNInNames = "N-VAR; N-IN-NAMES",
    NVoc = "N-VOC",
    NVocNCount = "N-VOC; N-COUNT",
    NVocNPlural = "N-VOC; N-PLURAL",
    NVocNProper = "N-VOC; N-PROPER",
    NVocNSing = "N-VOC; N-SING",
    NVocNTitleNCount = "N-VOC; N-TITLE; N-COUNT",
    Neg = "NEG",
    Num = "NUM",
    Ord = "ORD",
    PHRWithCl = "PHR with cl",
    PhrConjCoord = "PHR-CONJ-COORD",
    PhrConjSubord = "PHR-CONJ-SUBORD",
    PhrErg = "PHR-ERG",
    PhrModal = "PHR-MODAL",
    PhrRecip = "PHR-RECIP",
    PhrVLink = "PHR-V-LINK",
    PhrVPassive = "PHR-V-PASSIVE",
    PhrVRecip = "PHR-V-RECIP",
    PhrasalVerb = "PHRASAL VERB",
    PhrasalVerbErg = "PHRASAL VERB-ERG",
    PhrasalVerbPassive = "PHRASAL VERB-PASSIVE",
    PhrasalVerbRecip = "PHRASAL VERB-RECIP",
    PhrasalVerbRecipErg = "PHRASAL VERB-RECIP-ERG",
    Phrase = "PHRASE",
    Predet = "PREDET",
    Prefix = "PREFIX",
    Prep = "PREP",
    PrepPhrase = "PREP-PHRASE",
    Pron = "PRON",
    PronEmph = "PRON-EMPH",
    PronIndef = "PRON-INDEF",
    PronIndefNeg = "PRON-INDEF-NEG",
    PronPlural = "PRON-PLURAL",
    PronPoss = "PRON-POSS",
    PronRecip = "PRON-RECIP",
    PronRefl = "PRON-REFL",
    PronReflEmph = "PRON-REFL-EMPH",
    PronRel = "PRON-REL",
    PronSing = "PRON-SING",
    Quant = "QUANT",
    QuantPlural = "QUANT-PLURAL",
    Quest = "QUEST",
    Sound = "SOUND",
    Suffix = "SUFFIX",
    ToInf = "to inf",
    VERBNoPassive = "VERB: no passive",
    VErg = "V-ERG",
    VLink = "V-LINK",
    VLinkErg = "V-LINK-ERG",
    VLinkWorthAmount = "v-link worth amount",
    VLinkWorthIng = "v-link worth -ing",
    VLinkWorthNIng = "v-link worth n/-ing",
    VPassive = "V-PASSIVE",
    VPhr = "V PHR",
    VRecip = "V-RECIP",
    VRecipErg = "V-RECIP-ERG",
    VRecipPassive = "V-RECIP-PASSIVE",
    Verb = "VERB",
}