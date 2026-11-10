export interface AICoachTip {
  subjectId: string;
  subjectName: string;
  examinerInsight: string;
  highYieldThemes: string[];
  goldenQuotes: { author: string; work: string; quote: string; analysisContext: string }[];
  scoringFormula: string;
  commonPitfallsToAvoid: string[];
}

export const aiExaminerAnalysis: Record<string, AICoachTip> = {
  'sub-ww': {
    subjectId: 'sub-ww',
    subjectName: "Women's Writing",
    examinerInsight:
      'Thiruvalluvar University examiners award distinction marks when candidates contrast patriarchal containment with psychological liberation rather than just summarizing the plot. Always cite Virginia Woolf’s material conditions argument and Kamala Das’s linguistic defiance.',
    highYieldThemes: [
      'The Three Waves of Feminism (Suffrage -> The Personal is Political -> Intersectionality)',
      'Confessional poetry as female resistance (Kamala Das)',
      'Subversion of the patriarchal gaze and racial resilience (Maya Angelou)',
      'Superstition as gender violence in Indian caste dynamics (Mahasweta Devi\'s Bayen)',
      'Eco-feminism and bodily freedom (Ambai)',
    ],
    goldenQuotes: [
      {
        author: 'Virginia Woolf',
        work: "A Room of One's Own",
        quote: 'A woman must have money and a room of her own if she is to write fiction.',
        analysisContext: 'Materialist feminist critique: literature requires economic freedom and physical autonomy, not just raw talent.',
      },
      {
        author: 'Kamala Das',
        work: 'An Introduction',
        quote: 'The language I speak / Becomes mine, its distortions, its queernesses / All mine, mine alone.',
        analysisContext: 'Rejection of linguistic colonization and patriarchal control over the female body and tongue.',
      },
      {
        author: 'Maya Angelou',
        work: 'Still I Rise',
        quote: 'You may write me down in history / With your bitter, twisted lies / You may trod me in the very dirt / But still, like dust, I\'ll rise.',
        analysisContext: 'Defiance against both racial slavery and gender subjugation; rhythmic resilience.',
      },
      {
        author: 'Mahasweta Devi',
        work: 'Bayen',
        quote: 'I am not a Bayen. I gave suck to Bhagirath... My breasts are dry now.',
        analysisContext: 'Maternal grief weaponized by superstitious community; marginalization of Dalit motherhood.',
      },
    ],
    scoringFormula: 'Context & Historical Wave -> Stanza/Line Citation -> Critical Theory -> Modern Feminist Relevance',
    commonPitfallsToAvoid: [
      'Merely narrating Maya Angelou’s life without analyzing literary devices (metaphors of oil wells, diamonds, tides).',
      'Forgetting to mention Judith Shakespeare when discussing Virginia Woolf.',
      'Failing to connect Chandidasi’s branding to caste and property greed in Bayen.',
    ],
  },
  'sub-fl': {
    subjectId: 'sub-fl',
    subjectName: 'Introduction to Folk Literature',
    examinerInsight:
      'Examiners look for rigorous structural frameworks. You must clearly cite Vladimir Propp’s 31 narrative functions and Alan Dundes’ motifeme analysis. When discussing Hayavadana, emphasize how Karnad adapts the folk Yakshagana Bhagavata conventions.',
    highYieldThemes: [
      'Distinction between Myth (Sacred/Creation), Legend (Historical kernel), and Folktale (Fictional/Timeless)',
      'Vladimir Propp’s Morphology of the Folktale & Dramatis Personae',
      'Keats\'s Romantic ballad adaptations (La Belle Dame Sans Merci & The Eve of St Agnes)',
      'The Head-Swapping motif and incomplete humanity in Girish Karnad’s Hayavadana',
      'Oral transmission fluidity versus written canon rigidity',
    ],
    goldenQuotes: [
      {
        author: 'Vladimir Propp',
        work: 'Morphology of the Folktale',
        quote: 'Functions of characters serve as stable, constant elements in a tale, independent of how and by whom they are fulfilled.',
        analysisContext: 'Structuralist folklore theory: 31 universal functions govern traditional fairy and folk tales.',
      },
      {
        author: 'John Keats',
        work: 'La Belle Dame Sans Merci',
        quote: 'I met a Lady in the Meads, / Full beautiful, a fairy\'s child, / Her hair was long, her foot was light, / And her eyes were wild.',
        analysisContext: 'Folk ballad tradition of the enchanting otherworldly maiden who leaves mortals in withered solitude.',
      },
      {
        author: 'Girish Karnad',
        work: 'Hayavadana',
        quote: 'The head is the sign of the man. The head rules the body. How can the body change the head?',
        analysisContext: 'Philosophical dilemma adapted from Kathasaritsagara: duality of intellect versus physical vigor.',
      },
    ],
    scoringFormula: 'Folklore Taxonomy -> Propp/Dundes Framework -> Textual Motif -> Performance/Ritual Function',
    commonPitfallsToAvoid: [
      'Confusing Myth with Legend (Myths deal with gods/cosmology; Legends feature human heroes rooted in pseudo-history).',
      'Neglecting the chorus (Bhagavata) and masks in Karnad’s theatre.',
    ],
  },
  'sub-iwt': {
    subjectId: 'sub-iwt',
    subjectName: 'Indian Writing in Translation',
    examinerInsight:
      'Examiners appreciate understanding the politics of translation: translation is not a mechanical copy, but a cultural negotiation that preserves regional bhasha voices in the pan-Indian landscape.',
    highYieldThemes: [
      'Kannagi’s apotheosis as Pattini in Silappathikaaram (Book of Vanci)',
      'Subramania Bharati\'s cosmic romanticism and revolutionary spiritualism',
      'Dalit feminist subversion in P. Sivakami’s writing',
      'Arun Kolatkar\'s gritty demythologization of religious pilgrimage in Jejuri',
      'Endurance and patriarchal orthodoxy in M.K. Indira’s Phaniyamma',
    ],
    goldenQuotes: [
      {
        author: 'Subramania Bharati',
        work: 'Kaatru Veliyidai',
        quote: 'In the vast expanse of wind, Kannamma, I saw your boundless grace; in the light of the stars, your eternal radiance.',
        analysisContext: 'Mystic union with the divine feminine; romantic lyricism transforming traditional Tamil love poetry.',
      },
      {
        author: 'Arun Kolatkar',
        work: 'An Old Woman',
        quote: 'You look right at the sky through the bullet holes / she has for eyes.',
        analysisContext: 'Raw poetic shock: turning a beggar woman at the Khandoba shrine into an indomitable monument of history and poverty.',
      },
      {
        author: 'M. K. Indira',
        work: 'Phaniyamma',
        quote: 'She lived in the world without touching its poison, enduring widowhood with dignity that silenced the priests.',
        analysisContext: 'Gentle yet radical resistance against orthodox Brahminical widow customs.',
      },
    ],
    scoringFormula: 'Regional Cultural Root -> Translation Loss/Gain -> Character Arc -> Social Critique',
    commonPitfallsToAvoid: [
      'Treating translations as Western English literature; you must emphasize Tamil/Kannada/Marathi regional socio-cultural roots.',
    ],
  },
  'sub-lf': {
    subjectId: 'sub-lf',
    subjectName: 'Literary Forms (Elective V)',
    examinerInsight:
      'This paper requires precision. Definitions must include origin centuries, key stylistic traits, rhyming schemes, and canonical examples. For instance, clearly distinguish Petrarchan sonnet (Octave + Sestet, volta at line 9) from Shakespearean (3 Quatrains + Couplet).',
    highYieldThemes: [
      'Poetic Forms: Lyric, Sonnet (Petrarchan vs Shakespearean), Elegy (Pastoral), Ode (Pindaric/Horatian)',
      'Drama Classifications: Classical Aristotle Tragedy vs Modern Revenge; Farce vs Melodrama',
      'The Essay: Montaigne\'s personal introspection vs Bacon\'s aphoristic pragmatism',
      'Novel Sub-genres: Picaresque, Epistolary, Gothic, Stream-of-Consciousness',
    ],
    goldenQuotes: [
      {
        author: 'Francis Bacon',
        work: 'Of Studies',
        quote: 'Studies serve for delight, for ornament, and for ability... Some books are to be tasted, others to be swallowed, and some few to be chewed and digested.',
        analysisContext: 'Aphoristic essay benchmark: compact, pragmatic wisdom delivered through parallel balanced clauses.',
      },
      {
        author: 'Aristotle',
        work: 'Poetics',
        quote: 'Tragedy is an imitation of an action that is serious, complete, and of a certain magnitude... effecting through pity and fear the catharsis of such emotions.',
        analysisContext: 'Foundational dramatic definition: hamartia (tragic error), peripeteia (reversal), anagnorisis (recognition).',
      },
    ],
    scoringFormula: 'Etymology & Definition -> Structural Characteristics -> Rhyme/Meter/Plot Mechanism -> Canonical Examples',
    commonPitfallsToAvoid: [
      'Mixing up Aphoristic essays (Bacon) with Periodical essays (Addison & Steele).',
      'Failing to provide exact examples for each novel subgenre (e.g. Frankenstein for Gothic, Pamela for Epistolary).',
    ],
  },
};

export const catchupStrategySteps = [
  {
    step: 1,
    title: 'The 70/30 High-Yield Triage',
    desc: 'Do not panic about reading every commentary page. 70% of exam marks come from the top 5 recurring thematic questions. Master Priority A questions first!',
    badge: 'Triage 🎯',
  },
  {
    step: 2,
    title: 'Handwritten Anchor Retention',
    desc: 'Writing notes by hand engages psychomotor memory. Every 90-minute session must end with at least 2 pages of handwritten summary and 3 verbatim quotes.',
    badge: 'Retention ✍️',
  },
  {
    step: 3,
    title: 'Spaced Retrieval Cadence',
    desc: 'Day 1: Read text & mark quotes -> Day 3: Recall without looking -> Day 7: Write a timed 5-page answer.',
    badge: 'Spaced Rep 🔄',
  },
  {
    step: 4,
    title: 'The 4:45 PM Guilt-Free Rest',
    desc: 'Burnout destroys exam confidence. Once the 4 study sessions conclude at 04:45 PM, enjoy your evening completely guilt-free.',
    badge: 'Rest Well ☕',
  },
];
