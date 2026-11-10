import { AppState, Exam, Subject, Question, StudyTask, Achievement, Reward, UserProfile } from '../types';

export const initialProfile: UserProfile = {
  displayName: 'BA English Literature Scholar',
  course: 'B.A. English Literature',
  college: 'Kamban College of Arts and Science',
  location: 'Tiruvannamalai, Tamil Nadu',
  university: 'Thiruvalluvar University',
  preparationStatus: 'Not started / Untouched syllabus',
  wakeUpTime: '08:00',
  dailyStudyTargetMinutes: 330, // 5.5 hours
  targetOption: '5.5',
  currentCommitments: 'Study holidays. Dedicated full-time exam quest.',
  learningPreferences: [
    'Handwritten notes',
    'Watching explanations',
    'Reading prescribed literary works',
    'Practising written answers',
    'Self-assessment and revision',
  ],
};

export const initialExams: Exam[] = [
  {
    id: 'exam-1',
    subjectId: 'sub-ww',
    subjectName: "Women's Writing",
    date: '2026-11-20',
    session: 'FN',
    status: 'upcoming',
    paperCode: 'BAENG501',
    notes: 'First examination. High focus on prescribed authors, essays, and critical analysis.',
  },
  {
    id: 'exam-2',
    subjectId: 'sub-fl',
    subjectName: 'Introduction to Folk Literature',
    date: '2026-11-23',
    session: 'FN',
    status: 'upcoming',
    paperCode: 'BAENG502',
    notes: 'Folklore motifs, Propp, Dundes, Keats ballad traditions, and Hayavadana.',
  },
  {
    id: 'exam-3',
    subjectId: 'sub-iwt',
    subjectName: 'Indian Writing in Translation',
    date: '2026-11-28',
    session: 'FN',
    status: 'upcoming',
    paperCode: 'BAENG503',
    notes: 'Bharathiyar, Silappathikaaram, Tagore, Kolatkar, Karnad, and Phaniyamma.',
  },
  {
    id: 'exam-4',
    subjectId: 'sub-lf',
    subjectName: 'Literary Forms (Elective V)',
    date: '2026-12-01',
    session: 'FN',
    status: 'upcoming',
    paperCode: 'BAENG504E',
    notes: 'Poetry forms, essay classifications, dramatic genres, and novel categories.',
  },
  {
    id: 'exam-5',
    subjectId: 'sub-ve',
    subjectName: 'Value Education',
    date: '2026-12-14',
    session: 'FN',
    status: 'upcoming',
    paperCode: 'VE101',
    notes: 'Syllabus to be confirmed from college department. Final challenge.',
  },
  {
    id: 'exam-tba-1',
    subjectId: 'sub-pv',
    subjectName: 'Project with Viva Voce',
    date: null,
    session: 'TBA',
    status: 'tba',
    notes: 'Academic requirement. Date will be updated once announced by Kamban College.',
  },
  {
    id: 'exam-tba-2',
    subjectId: 'sub-si',
    subjectName: 'Summer Internship / Industrial / Field Visit',
    date: null,
    session: 'TBA',
    status: 'tba',
    notes: 'Documentation and report viva. Date TBA.',
  },
  {
    id: 'exam-tba-3',
    subjectId: 'sub-es',
    subjectName: 'Employability Skills',
    date: null,
    session: 'TBA',
    status: 'tba',
    notes: 'Soft skills & interview readiness evaluation. Date TBA.',
  },
];

export const initialSubjects: Subject[] = [
  {
    id: 'sub-ww',
    name: "Women's Writing",
    code: 'BAENG501',
    isTBA: false,
    examDate: '2026-11-20',
    session: 'FN',
    color: '#829A88', // Sage green
    textColor: '#1B2634',
    bgLight: '#F0F5F1',
    badgeBg: '#DCE7DE',
    handwrittenNotesStatus: 'In Progress',
    mockExamStatus: 'Not Started',
    personalRemarks: 'Priority #1 for first phase. Focus on Kamala Das, Maya Angelou, and Virginia Woolf.',
    prescribedNovelOrText: 'Prescribed Novel (Title to be confirmed from college syllabus)',
    units: [
      {
        id: 'u-ww-1',
        unitNumber: 1,
        unitTitle: 'Poetry: Kamala Das, Maya Angelou, Imtiaz Dharker',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-ww-1', title: 'Kamala Das – "An Introduction" (Self-assertion & Confessional Mode)', completed: false },
          { id: 't-ww-2', title: 'Maya Angelou – "Still I Rise" (Resilience & Defiance)', completed: false },
          { id: 't-ww-3', title: 'Imtiaz Dharker – "Purdah" (Gender, Religion & Identity)', completed: false },
        ],
      },
      {
        id: 'u-ww-2',
        unitNumber: 2,
        unitTitle: 'Prose & Essays: Woolf and Alice Walker',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-ww-4', title: "Virginia Woolf – A Room of One's Own (Shakespeare's Sister)", completed: false },
          { id: 't-ww-5', title: 'Alice Walker – The Black Writer and the Southern Experience', completed: false },
          { id: 't-ww-6', title: 'Three Waves of Feminism: Historical progression & core tenets', completed: false },
        ],
      },
      {
        id: 'u-ww-3',
        unitNumber: 3,
        unitTitle: 'Drama: Mahasweta Devi – Bayen',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-ww-7', title: 'Bayen – Chandidasi and Social Exclusion', completed: false },
          { id: 't-ww-8', title: 'Superstition, Motherhood & Patriarchal Violence', completed: false },
        ],
      },
      {
        id: 'u-ww-4',
        unitNumber: 4,
        unitTitle: 'Short Fiction: Ambai & Prescribed Novel',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-ww-9', title: 'Ambai – "In a Forest, A Deer" (Feminist Eco-criticism & Freedom)', completed: false },
          { id: 't-ww-10', title: 'Prescribed Novel – Plot, Character Arc, Feminist Analysis', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-fl',
    name: 'Introduction to Folk Literature',
    code: 'BAENG502',
    isTBA: false,
    examDate: '2026-11-23',
    session: 'FN',
    color: '#D58C75', // Terracotta
    textColor: '#FFFFFF',
    bgLight: '#FCF4F1',
    badgeBg: '#F5DDD5',
    handwrittenNotesStatus: 'Not Started',
    mockExamStatus: 'Not Started',
    personalRemarks: 'Focus on theoretical approaches (Propp, Dundes) and texts like Hayavadana.',
    prescribedNovelOrText: 'Girish Karnad – Hayavadana',
    units: [
      {
        id: 'u-fl-1',
        unitNumber: 1,
        unitTitle: 'Folklore Fundamentals: Definitions & Approaches',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-fl-1', title: 'Origin, development & oral transmission of Folklore', completed: false },
          { id: 't-fl-2', title: 'Propp’s Morphology of the Folktale & Alan Dundes Motif Index', completed: false },
          { id: 't-fl-3', title: 'Historical, Anthropological & Psychoanalytic Approaches', completed: false },
        ],
      },
      {
        id: 'u-fl-2',
        unitNumber: 2,
        unitTitle: 'Genres of Folk Literature',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-fl-4', title: 'Distinction: Myths, Legends, Ballads, and Folktales', completed: false },
          { id: 't-fl-5', title: 'Supernatural elements, riddles, proverbs and charms', completed: false },
        ],
      },
      {
        id: 'u-fl-3',
        unitNumber: 3,
        unitTitle: 'Literary Adaptations & Folk Poetry',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-fl-6', title: 'John Keats – "La Belle Dame Sans Merci" as folk ballad adaptation', completed: false },
          { id: 't-fl-7', title: 'John Keats – Folk and supernatural motifs in "The Eve of St Agnes"', completed: false },
        ],
      },
      {
        id: 'u-fl-4',
        unitNumber: 4,
        unitTitle: 'Tales and Folk Drama',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-fl-8', title: 'Analysis of folk narrative: "The Soothsayer’s Son"', completed: false },
          { id: 't-fl-9', title: 'Girish Karnad – Hayavadana (Themes, Yakshagana, Identity)', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-iwt',
    name: 'Indian Writing in Translation',
    code: 'BAENG503',
    isTBA: false,
    examDate: '2026-11-28',
    session: 'FN',
    color: '#3B6E8C', // Slate blue
    textColor: '#FFFFFF',
    bgLight: '#F0F6FA',
    badgeBg: '#D7E7F2',
    handwrittenNotesStatus: 'Not Started',
    mockExamStatus: 'Not Started',
    personalRemarks: 'Rich regional tapestry: Tamil, Bengali, Marathi, and Kannada masterpieces.',
    prescribedNovelOrText: 'M. K. Indira – Phaniyamma',
    units: [
      {
        id: 'u-iwt-1',
        unitNumber: 1,
        unitTitle: 'Translation Theory & Tamil Classics',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-iwt-1', title: 'Significance of translation in Indian pluralistic culture', completed: false },
          { id: 't-iwt-2', title: 'Bharathiyar – "Kaatru Veliyidai" (Mysticism and Freedom)', completed: false },
          { id: 't-iwt-3', title: 'Silappathikaaram – "The Book of Vanci" (Kannagi deification)', completed: false },
        ],
      },
      {
        id: 'u-iwt-2',
        unitNumber: 2,
        unitTitle: 'Poetry & Subaltern Voices',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-iwt-4', title: 'Rabindranath Tagore – "Far Below Flowed Jumna"', completed: false },
          { id: 't-iwt-5', title: 'Arun Kolatkar – "An Old Woman" (Khandoba pilgrimage, poverty)', completed: false },
          { id: 't-iwt-6', title: 'P. Sivakami – "Land: Women’s Breadth and Speech" (Dalit Feminism)', completed: false },
        ],
      },
      {
        id: 'u-iwt-3',
        unitNumber: 3,
        unitTitle: 'Prose & Drama',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-iwt-7', title: 'Cultural identity in "Vanishing Landmarks"', completed: false },
          { id: 't-iwt-8', title: 'Girish Karnad – "The Wedding Album" (Modern Indian Family & Media)', completed: false },
        ],
      },
      {
        id: 'u-iwt-4',
        unitNumber: 4,
        unitTitle: 'Fiction & Social Critique',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-iwt-9', title: 'M. K. Indira – Phaniyamma (Brahmin widowhood, autonomy, endurance)', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-lf',
    name: 'Literary Forms (Elective V)',
    code: 'BAENG504E',
    isTBA: false,
    examDate: '2026-12-01',
    session: 'FN',
    color: '#8A628B', // Muted mauve
    textColor: '#FFFFFF',
    bgLight: '#F7F2F8',
    badgeBg: '#EDDEEF',
    handwrittenNotesStatus: 'Not Started',
    mockExamStatus: 'Not Started',
    personalRemarks: 'Systematic study of genres: Definitions, historical shifts, and distinguishing features.',
    units: [
      {
        id: 'u-lf-1',
        unitNumber: 1,
        unitTitle: 'Poetic Forms',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-lf-1', title: 'Lyric, Sonnet (Petrarchan & Shakespearean), Elegy, and Ode', completed: false },
          { id: 't-lf-2', title: 'Epic, Mock-Epic, Ballad, and Dramatic Monologue', completed: false },
        ],
      },
      {
        id: 'u-lf-2',
        unitNumber: 2,
        unitTitle: 'The Essay & Non-Fiction',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-lf-3', title: 'Personal vs Impersonal essays (Montaigne vs Bacon)', completed: false },
          { id: 't-lf-4', title: 'Aphoristic essay and Periodical essay (Addison & Steele)', completed: false },
          { id: 't-lf-5', title: 'Short story, Biography, and Autobiography', completed: false },
        ],
      },
      {
        id: 'u-lf-3',
        unitNumber: 3,
        unitTitle: 'Dramatic Forms',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-lf-6', title: 'Tragedy (Aristotelian, Revenge, Modern) vs Comedy', completed: false },
          { id: 't-lf-7', title: 'Melodrama, Farce, Masque, and Absurd Theatre', completed: false },
        ],
      },
      {
        id: 'u-lf-4',
        unitNumber: 4,
        unitTitle: 'The Novel & Modern Classifications',
        handwrittenNotesDone: false,
        topics: [
          { id: 't-lf-8', title: 'Rise of the Novel (Defoe, Richardson, Fielding)', completed: false },
          { id: 't-lf-9', title: 'Picaresque, Epistolary, Gothic, and Historical Novel', completed: false },
          { id: 't-lf-10', title: 'Science Fiction, Stream-of-Consciousness, and Modernist Fiction', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-ve',
    name: 'Value Education',
    code: 'VE101',
    isTBA: false,
    examDate: '2026-12-14',
    session: 'FN',
    color: '#628B75', // Deep sage
    textColor: '#FFFFFF',
    bgLight: '#F2F7F4',
    badgeBg: '#DDECE3',
    handwrittenNotesStatus: 'Not Started',
    mockExamStatus: 'Not Started',
    personalRemarks: 'Official syllabus pending from college. Add units as soon as syllabus is received.',
    units: [], // User can easily paste/add units
  },
  {
    id: 'sub-pv',
    name: 'Project with Viva Voce',
    isTBA: true,
    examDate: null,
    session: 'TBA',
    color: '#B57A42', // Warm amber-brown
    textColor: '#FFFFFF',
    bgLight: '#FAF5EE',
    badgeBg: '#F3E5D4',
    handwrittenNotesStatus: 'Not Started',
    mockExamStatus: 'Not Started',
    personalRemarks: 'Undergraduate project thesis and oral viva. Date will be entered once college announces it.',
    units: [],
  },
  {
    id: 'sub-si',
    name: 'Summer Internship / Industrial Visit / Field Visit',
    isTBA: true,
    examDate: null,
    session: 'TBA',
    color: '#64748B', // Cool slate
    textColor: '#FFFFFF',
    bgLight: '#F3F4F6',
    badgeBg: '#E2E8F0',
    handwrittenNotesStatus: 'Not Started',
    mockExamStatus: 'Not Started',
    personalRemarks: 'Documentation, internship completion letter, and viva evaluation. Date TBA.',
    units: [],
  },
  {
    id: 'sub-es',
    name: 'Employability Skills',
    isTBA: true,
    examDate: null,
    session: 'TBA',
    color: '#475569', // Dark slate
    textColor: '#FFFFFF',
    bgLight: '#F1F5F9',
    badgeBg: '#E2E8F0',
    handwrittenNotesStatus: 'Not Started',
    mockExamStatus: 'Not Started',
    personalRemarks: 'Resume building, group discussions, and English communication viva. Date TBA.',
    units: [],
  },
];

export const initialQuestions: Question[] = [
  // ---------------- WOMEN'S WRITING (9 questions, Priority A) ----------------
  {
    id: 'q-ww-1',
    subjectId: 'sub-ww',
    unit: 2,
    questionText: 'Explain the three waves of feminism, from the Suffragettes to the Grrls movement.',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    sourceReference: 'BA English Sem 5 Core Curriculum',
    personalNotes: 'Emphasize 1st wave (suffrage/legal rights), 2nd wave (patriarchy/personal is political), and 3rd wave (intersectionality/queer/riot grrrl).',
  },
  {
    id: 'q-ww-2',
    subjectId: 'sub-ww',
    unit: 1,
    questionText: 'Critically analyse Kamala Das’s poem "An Introduction" as a feminist poem.',
    type: 'Critical analysis',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Focus on language choice, rejection of patriarchal categorizations ("Dress in sarees, be girl, be wife"), and universal female identity.',
  },
  {
    id: 'q-ww-3',
    subjectId: 'sub-ww',
    unit: 1,
    questionText: 'Discuss Maya Angelou’s "Still I Rise" as a poem of resistance and self-assertion.',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Key metaphors: oil wells, gold mines, oceans. Intersection of race, gender, and historical trauma of slavery.',
  },
  {
    id: 'q-ww-4',
    subjectId: 'sub-ww',
    unit: 1,
    questionText: 'Examine the representation of gender and identity in Imtiaz Dharker’s "Purdah".',
    type: 'Critical analysis',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Purdah as both physical cloth and psychological containment; alienation and internal surveillance.',
  },
  {
    id: 'q-ww-5',
    subjectId: 'sub-ww',
    unit: 2,
    questionText: 'Discuss Virginia Woolf’s "A Room of One’s Own", particularly the concept of Shakespeare’s Sister (Judith Shakespeare).',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Material conditions of literature: £500 a year and a room of one\'s own. Judith\'s thwarted genius and tragic suicide.',
  },
  {
    id: 'q-ww-6',
    subjectId: 'sub-ww',
    unit: 3,
    questionText: 'Analyse Mahasweta Devi’s "Bayen" with reference to gender and social exclusion.',
    type: 'Character analysis',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Chandidasi branded as a child-eating witch (Bayen). Superstition weaponized against marginalized Dalit women; ultimate martyrdom.',
  },
  {
    id: 'q-ww-7',
    subjectId: 'sub-ww',
    unit: 2,
    questionText: 'Discuss Alice Walker’s views in "The Black Writer and the Southern Experience".',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Southern roots as literary nourishment; womanism vs white-centric feminism; communal memory.',
  },
  {
    id: 'q-ww-8',
    subjectId: 'sub-ww',
    unit: 4,
    questionText: 'Analyse Ambai’s "In a Forest, A Deer" exploring feminist eco-criticism and personal liberation.',
    type: 'Literary interpretation',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Journey into nature, shedding marital and societal expectations, myth of Sita reframed.',
  },
  {
    id: 'q-ww-9',
    subjectId: 'sub-ww',
    unit: 4,
    questionText: 'Prepare a critical analysis of the prescribed novel in the syllabus (Themes, Characterization, and Narrative Structure).',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Editable field: update with specific novel title (e.g., Toni Morrison / Shashi Deshpande / Anita Desai) once verified.',
  },

  // ---------------- INTRODUCTION TO FOLK LITERATURE (9 questions, Priority A) ----------------
  {
    id: 'q-fl-1',
    subjectId: 'sub-fl',
    unit: 1,
    questionText: 'Define folk literature and explain its origin, development and core characteristics.',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Oral transmission, community authorship, fluidity of versions, cultural preservation.',
  },
  {
    id: 'q-fl-2',
    subjectId: 'sub-fl',
    unit: 2,
    questionText: 'Explain the major forms and genres of folk literature.',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Folk songs, proverbs, riddles, myths, legends, fairy tales, folk drama.',
  },
  {
    id: 'q-fl-3',
    subjectId: 'sub-fl',
    unit: 2,
    questionText: 'Differentiate between myths, legends, ballads and folk tales with suitable literary examples.',
    type: 'Comparison',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Sacred vs secular, historical kernels vs timeless narrative functions, poetic musical ballads.',
  },
  {
    id: 'q-fl-4',
    subjectId: 'sub-fl',
    unit: 1,
    questionText: 'Discuss the contribution of Vladimir Propp (Morphology of the Folktale) and Alan Dundes to folklore studies.',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Propp’s 31 narrative functions and dramatis personae. Dundes’ motifemic analysis and contextual folklore.',
  },
  {
    id: 'q-fl-5',
    subjectId: 'sub-fl',
    unit: 1,
    questionText: 'Explain the historical, anthropological and psychological approaches to folklore analysis.',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Grimm brothers diffusionism, Frazer’s Golden Bough ritual theory, Jungian archetypes.',
  },
  {
    id: 'q-fl-6',
    subjectId: 'sub-fl',
    unit: 3,
    questionText: 'Analyse John Keats’s "La Belle Dame Sans Merci" as a literary adaptation of folk-ballad traditions.',
    type: 'Literary interpretation',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Ballad stanza, supernatural seductress (femme fatale), medieval chivalric motif, refrain and melancholy.',
  },
  {
    id: 'q-fl-7',
    subjectId: 'sub-fl',
    unit: 3,
    questionText: 'Discuss the folk and supernatural elements in Keats’s "The Eve of St Agnes".',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'St. Agnes eve folklore ritual for young maidens, visionary dreams, contrasting cold castle vs warm chamber.',
  },
  {
    id: 'q-fl-8',
    subjectId: 'sub-fl',
    unit: 4,
    questionText: 'Analyse the story "The Soothsayer’s Son" exploring destiny, moral ethics, and folklore wisdom.',
    type: 'Critical analysis',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Indian folk narrative structure, astrological prophecy vs human virtue.',
  },
  {
    id: 'q-fl-9',
    subjectId: 'sub-fl',
    unit: 4,
    questionText: 'Discuss the major themes, folk theatre conventions and folk motifs in Girish Karnad’s "Hayavadana".',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Transposition of heads from Kathasaritsagara, Yakshagana chorus and Bhagavata, human search for completeness.',
  },

  // ---------------- INDIAN WRITING IN TRANSLATION (9 questions, Priority A) ----------------
  {
    id: 'q-iwt-1',
    subjectId: 'sub-iwt',
    unit: 1,
    questionText: 'Explain the significance and politics of translation in preserving and sharing Indian literary traditions.',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Pan-Indian unity in diversity, bhasha literatures, negotiating postcolonial hegemony of English.',
  },
  {
    id: 'q-iwt-2',
    subjectId: 'sub-iwt',
    unit: 1,
    questionText: 'Critically analyse Subramania Bharati’s (Bharathiyar’s) "Kaatru Veliyidai" (In the Air Space).',
    type: 'Literary interpretation',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Mystical communion with Kannamma, cosmic imagery, romantic lyricism combined with revolutionary fervor.',
  },
  {
    id: 'q-iwt-3',
    subjectId: 'sub-iwt',
    unit: 1,
    questionText: 'Discuss "The Book of Vanci" from the ancient Tamil epic "Silappathikaaram".',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Ilango Adigal’s depiction of Chera King Senguttuvan, consecration of Kannagi as Pattini (goddess of chastity).',
  },
  {
    id: 'q-iwt-4',
    subjectId: 'sub-iwt',
    unit: 2,
    questionText: 'Analyse the themes and imagery in Rabindranath Tagore’s poem "Far Below Flowed Jumna".',
    type: 'Literary interpretation',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Guru Govind Singh, spiritual renunciation vs material attachment, river imagery.',
  },
  {
    id: 'q-iwt-5',
    subjectId: 'sub-iwt',
    unit: 2,
    questionText: 'Discuss Arun Kolatkar’s portrayal of poverty, commercialization and old age in "An Old Woman".',
    type: 'Critical analysis',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Jejuri cycle, fifty paise demand, cracks around her eyes mirroring the ruined hills.',
  },
  {
    id: 'q-iwt-6',
    subjectId: 'sub-iwt',
    unit: 2,
    questionText: 'Examine the representation of women and Dalit identity in P. Sivakami’s "Land: Women’s Breadth and Speech".',
    type: 'Critical analysis',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Interlocking systems of caste oppression and domestic patriarchy, reclaim of bodily autonomy.',
  },
  {
    id: 'q-iwt-7',
    subjectId: 'sub-iwt',
    unit: 3,
    questionText: 'Discuss the significance of cultural identity and transformation in "Vanishing Landmarks".',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Erosion of traditional heritage, urbanization, loss of indigenous spaces.',
  },
  {
    id: 'q-iwt-8',
    subjectId: 'sub-iwt',
    unit: 3,
    questionText: 'Analyse the major themes in Girish Karnad’s play "The Wedding Album".',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Arranged marriage negotiations in the internet age, cyber voyeurism, bourgeois hypocrisy in contemporary India.',
  },
  {
    id: 'q-iwt-9',
    subjectId: 'sub-iwt',
    unit: 4,
    questionText: 'Discuss the major character arc and social critique in M. K. Indira’s novel "Phaniyamma".',
    type: 'Character analysis',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Child widowhood in orthodox Brahmin society, endurance without bitterness, quiet subversion of caste/gender orthodoxy.',
  },

  // ---------------- LITERARY FORMS (10 questions, Priority A) ----------------
  {
    id: 'q-lf-1',
    subjectId: 'sub-lf',
    unit: 1,
    questionText: 'Explain the characteristics of Lyric, Sonnet, Elegy and Ode with canonical examples.',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Personal subjectivity of lyric, 14-line sonnet structural shifts (volta), pastoral mourning in elegy, elevated praise in ode.',
  },
  {
    id: 'q-lf-2',
    subjectId: 'sub-lf',
    unit: 1,
    questionText: 'Differentiate between Ballad, Epic, Satire and Dramatic Monologue.',
    type: 'Comparison',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Narrative folk ballad vs heroic grand epic; Horatian/Juvenalian satire; Browning’s silent auditor in dramatic monologue.',
  },
  {
    id: 'q-lf-3',
    subjectId: 'sub-lf',
    unit: 2,
    questionText: 'Define the essay and explain the characteristics of personal and impersonal essays.',
    type: 'Definition',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Montaigne’s introspective intimacy vs Francis Bacon’s utilitarian aphorisms.',
  },
  {
    id: 'q-lf-4',
    subjectId: 'sub-lf',
    unit: 2,
    questionText: 'Discuss the development of the aphoristic essay and the 18th-century periodical essay.',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Bacon’s compact pithy sentences; Addison and Steele’s The Tatler and The Spectator moralizing coffee-house society.',
  },
  {
    id: 'q-lf-5',
    subjectId: 'sub-lf',
    unit: 2,
    questionText: 'Explain the characteristics of short stories, biographies and autobiographies.',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Poe’s single effect in short stories; objective historical portrayal vs subjective self-construction in autobiography.',
  },
  {
    id: 'q-lf-6',
    subjectId: 'sub-lf',
    unit: 3,
    questionText: 'Differentiate between Tragedy and Comedy with reference to Classical and Renaissance drama.',
    type: 'Comparison',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Aristotelian hamartia, catharsis, peripeteia vs comic resolution, social integration, and romantic comedy.',
  },
  {
    id: 'q-lf-7',
    subjectId: 'sub-lf',
    unit: 3,
    questionText: 'Explain the distinctive characteristics of Melodrama, Farce and Masque.',
    type: 'Definition',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Sensational moral polarization in melodrama; physical slapstick in farce; Jacobean courtly spectacles in masque.',
  },
  {
    id: 'q-lf-8',
    subjectId: 'sub-lf',
    unit: 4,
    questionText: 'Discuss the rise, historical development and structural characteristics of the Novel.',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Rise of middle class, printing press, individualism, Defoe, Richardson, and Fielding.',
  },
  {
    id: 'q-lf-9',
    subjectId: 'sub-lf',
    unit: 4,
    questionText: 'Explain the Picaresque, Epistolary and Gothic novel genres.',
    type: 'Long answer',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Roguish episodic journey (picaro); letter format intimacy (Pamela); haunted ruins and sublime terror (Castle of Otranto).',
  },
  {
    id: 'q-lf-10',
    subjectId: 'sub-lf',
    unit: 4,
    questionText: 'Discuss Science-Fiction and the Stream-of-Consciousness novel techniques.',
    type: 'Essay',
    priority: 'A',
    preparationStatus: 'Not Started',
    sourceClassification: 'Syllabus-based suggestion',
    personalNotes: 'Speculative technological imagination (Wells, Shelley); psychological flux, interior monologue (Joyce, Woolf).',
  },
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-l1',
    name: 'First Steps',
    description: 'Unlocked by completing your very first academic study mission.',
    icon: '🌱',
    thresholdXP: 10,
    levelNumber: 1,
    unlocked: false,
  },
  {
    id: 'ach-l2',
    name: 'Getting Serious',
    description: 'Earned 100 XP. Momentum is building!',
    icon: '🔥',
    thresholdXP: 100,
    levelNumber: 2,
    unlocked: false,
  },
  {
    id: 'ach-l3',
    name: 'Consistency Champion',
    description: 'Earned 250 XP. Your study habits are turning into a rock-solid habit.',
    icon: '⚡',
    thresholdXP: 250,
    levelNumber: 3,
    unlocked: false,
  },
  {
    id: 'ach-l4',
    name: 'Academic Warrior',
    description: 'Earned 500 XP. Halfway to the Semester Survivor milestone!',
    icon: '⚔️',
    thresholdXP: 500,
    levelNumber: 4,
    unlocked: false,
  },
  {
    id: 'ach-l5',
    name: 'Exam Master',
    description: 'Earned 750 XP. Elite command over your subjects and writing.',
    icon: '👑',
    thresholdXP: 750,
    levelNumber: 5,
    unlocked: false,
  },
  {
    id: 'ach-l6',
    name: 'Semester Survivor',
    description: 'Reached the glorious 1,000 XP pinnacle! You have conquered the quest.',
    icon: '🏆',
    thresholdXP: 1000,
    levelNumber: 6,
    unlocked: false,
  },
  {
    id: 'ach-first-mission',
    name: 'First Mission Completed',
    description: 'Crossed the threshold of procrastination by finishing a study session.',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'ach-notes-ninja',
    name: 'Notes Ninja',
    description: 'Completed handwritten notes for an entire unit.',
    icon: '✍️',
    unlocked: false,
  },
  {
    id: 'ach-quiz-master',
    name: 'Quiz Master',
    description: 'Scored 4/5 or better in a literary recall quiz.',
    icon: '💡',
    unlocked: false,
  },
  {
    id: 'ach-streak-3',
    name: 'Three-Day Study Streak',
    description: 'Studied for 3 consecutive days without breaking the chain.',
    icon: '🌟',
    unlocked: false,
  },
  {
    id: 'ach-streak-7',
    name: 'Seven-Day Study Streak',
    description: 'A full week of uninterrupted academic dedication.',
    icon: '🚀',
    unlocked: false,
  },
  {
    id: 'ach-mock-champ',
    name: 'Mock Exam Champion',
    description: 'Completed a full mock examination with rigorous self-grading.',
    icon: '📜',
    unlocked: false,
  },
  {
    id: 'ach-subject-done',
    name: 'Subject Completed',
    description: 'Finished 100% of preparation questions for any subject.',
    icon: '📚',
    unlocked: false,
  },
  {
    id: 'ach-revision-spec',
    name: 'Revision Specialist',
    description: 'Revised 5 different questions across your subjects.',
    icon: '🔄',
    unlocked: false,
  },
  {
    id: 'ach-1000-champ',
    name: '1,000 XP Champion',
    description: 'Achieved the ultimate 1,000 XP target for the Semester Survival quest.',
    icon: '💎',
    thresholdXP: 1000,
    unlocked: false,
  },
];

export const initialRewards: Reward[] = [
  {
    id: 'rew-100',
    title: 'Milestone 1 Reward',
    description: 'Add your reward here.',
    xpThreshold: 100,
    status: 'locked',
  },
  {
    id: 'rew-250',
    title: 'Milestone 2 Reward',
    description: 'Add your reward here.',
    xpThreshold: 250,
    status: 'locked',
  },
  {
    id: 'rew-500',
    title: 'Milestone 3 Reward',
    description: 'Add your reward here.',
    xpThreshold: 500,
    status: 'locked',
  },
  {
    id: 'rew-750',
    title: 'Milestone 4 Reward',
    description: 'Add your reward here.',
    xpThreshold: 750,
    status: 'locked',
  },
  {
    id: 'rew-1000',
    title: 'Grand Finale Reward',
    description: 'Add your reward here.',
    xpThreshold: 1000,
    status: 'locked',
  },
];

/**
 * Generate comprehensive date-wise study tasks across all 7 phases:
 * Phase 1: 11 Nov – 14 Nov (Women's Writing priority)
 * Phase 2: 15 Nov – 17 Nov (Women's Writing + Folk Lit + IWT + Literary Forms)
 * Phase 3: 18 Nov – 19 Nov (Mock exam + Final revision)
 * 20 Nov: Exam Day!
 * Phase 4: 21 Nov – 22 Nov (Folk Literature focus)
 * 23 Nov: Exam Day!
 * Phase 5: 24 Nov – 27 Nov (Indian Writing focus + Literary Forms)
 * 28 Nov: Exam Day!
 * Phase 6: 29 Nov – 30 Nov (Literary Forms dedicated)
 * 01 Dec: Exam Day!
 * Phase 7: 02 Dec – 13 Dec (Value Education + Project/Viva/Internship)
 * 14 Dec: Exam Day!
 */
export function generateInitialTasks(): StudyTask[] {
  const tasks: StudyTask[] = [];

  // Helper to add tasks easily
  const addTask = (
    id: string,
    title: string,
    subjectId: string,
    scheduledDate: string,
    sessionNumber: 1 | 2 | 3 | 4,
    estimatedMinutes: number,
    xpValue: number,
    priority: 'A' | 'B' | 'C',
    category: 'session1' | 'session2' | 'session3' | 'session4' | 'mock' | 'notes',
    description?: string,
    isExamDayTask: boolean = false
  ) => {
    tasks.push({
      id,
      title,
      description,
      subjectId,
      scheduledDate,
      sessionNumber,
      estimatedMinutes,
      xpValue,
      priority,
      status: 'pending',
      category,
      isExamDayTask,
    });
  };

  // 10 Nov: Orientation & Planning Setup Day
  addTask('t-10nov-1', 'Orientation: Set up handwritten notebook for Women\'s Writing', 'sub-ww', '2026-11-10', 1, 90, 10, 'A', 'session1', 'Assemble syllabus copy, define paper layout, write key syllabus topics');
  addTask('t-10nov-2', 'Read Kamala Das "An Introduction" text and mark key stanzas', 'sub-ww', '2026-11-10', 2, 90, 10, 'A', 'session2', 'Underline lines showing confessional mode and patriarchal defiance');
  addTask('t-10nov-3', 'Folk Literature survey: Review definitions of myth, legend and folktale', 'sub-fl', '2026-11-10', 3, 75, 10, 'B', 'session3', 'Read foundational notes and write down key contrasts');
  addTask('t-10nov-4', 'Study schedule review & initial question bank walkthrough', 'sub-ww', '2026-11-10', 4, 75, 10, 'A', 'session4', 'Walk through the 9 Priority A questions and set goals');

  // PHASE 1: 11 Nov – 14 Nov
  // 11 Nov:
  addTask('t-11nov-1', 'Three Waves of Feminism: Suffragettes to Riot Grrls', 'sub-ww', '2026-11-11', 1, 90, 10, 'A', 'session1', 'Deep reading & conceptual timeline');
  addTask('t-11nov-2', 'Prepare handwritten notes for Three Waves of Feminism', 'sub-ww', '2026-11-11', 2, 90, 20, 'A', 'notes', 'Complete unit summary and quotation list');
  addTask('t-11nov-3', 'Folk Literature: Origins & Oral Transmission', 'sub-fl', '2026-11-11', 3, 75, 10, 'B', 'session3', 'Characteristics of oral culture and community memory');
  addTask('t-11nov-4', 'Indian Writing in Translation: Significance of translation', 'sub-iwt', '2026-11-11', 4, 75, 10, 'B', 'session4', 'Translation as bridge in multilingual India; short answer practice');

  // 12 Nov:
  addTask('t-12nov-1', 'Kamala Das "An Introduction": Critical analysis & themes', 'sub-ww', '2026-11-12', 1, 90, 10, 'A', 'session1', 'Detailed stanza-by-stanza analysis');
  addTask('t-12nov-2', 'Handwritten answer: Kamala Das as a feminist voice', 'sub-ww', '2026-11-12', 2, 90, 10, 'A', 'session2', 'Write timed 5-page answer with textual citations');
  addTask('t-12nov-3', 'Folk Literature: Vladimir Propp’s 31 Functions', 'sub-fl', '2026-11-12', 3, 75, 10, 'A', 'session3', 'Morphology of the Folktale core structure');
  addTask('t-12nov-4', 'Bharathiyar "Kaatru Veliyidai": Imagery and Mysticism', 'sub-iwt', '2026-11-12', 4, 75, 10, 'B', 'session4', 'Romanticism and cosmic space');

  // 13 Nov:
  addTask('t-13nov-1', 'Maya Angelou "Still I Rise" & Imtiaz Dharker "Purdah"', 'sub-ww', '2026-11-13', 1, 90, 10, 'A', 'session1', 'Compare poetic resistance and veil symbolism');
  addTask('t-13nov-2', 'Handwritten notes: Poetry Unit (Das, Angelou, Dharker)', 'sub-ww', '2026-11-13', 2, 90, 20, 'A', 'notes', 'Finish complete Unit 1 notes');
  addTask('t-13nov-3', 'Folk Literature: Keats "La Belle Dame Sans Merci" as folk ballad', 'sub-fl', '2026-11-13', 3, 75, 10, 'A', 'session3', 'Ballad meter and folklore fairy maiden motif');
  addTask('t-13nov-4', 'Silappathikaaram "The Book of Vanci": Kannagi deification', 'sub-iwt', '2026-11-13', 4, 75, 10, 'A', 'session4', 'Tamil epic cultural context and chastity cult');

  // 14 Nov:
  addTask('t-14nov-1', 'Virginia Woolf "A Room of One’s Own": Judith Shakespeare', 'sub-ww', '2026-11-14', 1, 90, 10, 'A', 'session1', 'Material conditions of art & intellectual freedom');
  addTask('t-14nov-2', 'Mahasweta Devi "Bayen": Chandidasi and social exclusion', 'sub-ww', '2026-11-14', 2, 90, 10, 'A', 'session2', 'Dalit motherhood and witchcraft persecution');
  addTask('t-14nov-3', 'Folk Literature: "The Soothsayer’s Son" & Folktale structure', 'sub-fl', '2026-11-14', 3, 75, 10, 'B', 'session3', 'Themes of fate, intelligence and oral storytelling');
  addTask('t-14nov-4', 'Tagore "Far Below Flowed Jumna": Spiritual renunciation', 'sub-iwt', '2026-11-14', 4, 75, 10, 'B', 'session4', 'Textual analysis & recall quiz practice');

  // PHASE 2: 15 Nov – 17 Nov
  // 15 Nov:
  addTask('t-15nov-1', 'Alice Walker "The Black Writer and the Southern Experience"', 'sub-ww', '2026-11-15', 1, 90, 10, 'A', 'session1', 'Womanism and southern oral heritage');
  addTask('t-15nov-2', 'Ambai "In a Forest, A Deer": Eco-feminism & liberation', 'sub-ww', '2026-11-15', 2, 60, 10, 'A', 'session2', 'Tamil feminist fiction and nature imagery');
  addTask('t-15nov-3', 'Folk Literature: Girish Karnad "Hayavadana" introduction', 'sub-fl', '2026-11-15', 3, 75, 10, 'A', 'session3', 'Yakshagana conventions and head-swapping motif');
  addTask('t-15nov-4', 'Literary Forms: Lyric, Sonnet, Elegy and Ode definitions', 'sub-lf', '2026-11-15', 4, 30, 10, 'B', 'session4', 'First dive into poetic forms and stanza rules');

  // 16 Nov:
  addTask('t-16nov-1', 'Women\'s Writing: Prescribed Novel critical reading', 'sub-ww', '2026-11-16', 1, 90, 10, 'A', 'session1', 'Character dynamics, feminist perspectives and key quotes');
  addTask('t-16nov-2', 'Women\'s Writing: Handwritten essay practice on Novel & Woolf', 'sub-ww', '2026-11-16', 2, 60, 10, 'A', 'session2', 'Write two 10-mark answers under 40 minutes');
  addTask('t-16nov-3', 'Indian Writing: Arun Kolatkar "An Old Woman" & P. Sivakami', 'sub-iwt', '2026-11-16', 3, 75, 10, 'A', 'session3', 'Sivakami\'s Dalit feminism & Kolatkar\'s gritty imagery');
  addTask('t-16nov-4', 'Literary Forms: Ballad, Epic, Satire and Dramatic Monologue', 'sub-lf', '2026-11-16', 4, 30, 10, 'B', 'session4', 'Compare epic hero vs ballad protagonist');

  // 17 Nov:
  addTask('t-17nov-1', 'Women\'s Writing: Comprehensive rapid revision of Units 1 & 2', 'sub-ww', '2026-11-17', 1, 90, 10, 'A', 'session1', 'Review all quotations, years, and thesis arguments');
  addTask('t-17nov-2', 'Women\'s Writing: Rapid revision of Drama and Short Stories', 'sub-ww', '2026-11-17', 2, 60, 10, 'A', 'session2', 'Bayen and In a Forest, A Deer key themes');
  addTask('t-17nov-3', 'Folk Literature: Dundes & Propp comparative table notes', 'sub-fl', '2026-11-17', 3, 75, 20, 'A', 'notes', 'Create clean summary sheet');
  addTask('t-17nov-4', 'Literary Forms: Essay genres (Bacon vs Montaigne)', 'sub-lf', '2026-11-17', 4, 30, 10, 'B', 'session4', 'Personal vs impersonal essay styles');

  // PHASE 3: 18 Nov – 19 Nov (Mock & Final Revision)
  // 18 Nov:
  addTask('t-18nov-1', 'FULL MOCK EXAM: Women\'s Writing (3-hour timed paper)', 'sub-ww', '2026-11-18', 1, 135, 50, 'A', 'mock', 'Simulate university conditions: 10 short, 5 medium, 3 essay questions');
  addTask('t-18nov-2', 'Self-Assessment & Grading of Women\'s Writing Mock', 'sub-ww', '2026-11-18', 2, 45, 10, 'A', 'session2', 'Check introduction clarity, textual citations and marks');
  addTask('t-18nov-3', 'Folk Literature & Indian Writing: 1-hour combined revision', 'sub-fl', '2026-11-18', 3, 75, 10, 'B', 'session3', 'Quick recall cards on Hayavadana and Phaniyamma');
  addTask('t-18nov-4', 'Literary Forms: Tragedy and Comedy fundamentals', 'sub-lf', '2026-11-18', 4, 45, 10, 'B', 'session4', 'Aristotle’s Poetics concepts: Hamartia and Catharsis');

  // 19 Nov:
  addTask('t-19nov-1', 'Light Revision: Women\'s Writing High-Yield Quotations', 'sub-ww', '2026-11-19', 1, 90, 10, 'A', 'session1', 'Memorize key lines from Kamala Das, Angelou, and Woolf');
  addTask('t-19nov-2', 'Mental Map & Exam Hall Strategy for Women\'s Writing', 'sub-ww', '2026-11-19', 2, 45, 10, 'A', 'session2', 'Time budgeting: 25 mins per essay, 10 mins per short answer');
  addTask('t-19nov-3', 'Folk Literature light overview & relaxation', 'sub-fl', '2026-11-19', 3, 75, 10, 'B', 'session3', 'Review folk motifs without cramming');
  addTask('t-19nov-4', 'Stationery check, Hall ticket prep & early night rest', 'sub-ww', '2026-11-19', 4, 45, 10, 'A', 'session4', 'Pens, pencil, hall ticket, calm mindset');

  // 20 Nov: EXAM DAY 1!
  addTask('t-20nov-exam', 'EXAM DAY: Women\'s Writing (Forenoon Session)', 'sub-ww', '2026-11-20', 1, 180, 50, 'A', 'session1', 'Deliver your best in the examination hall! You\'ve prepared for this.', true);
  addTask('t-20nov-rest', 'Post-Exam Rest, Refreshment & Debrief', 'sub-ww', '2026-11-20', 3, 120, 10, 'A', 'session3', 'Unwind after the first exam. No heavy studying today.', true);

  // PHASE 4: 21 Nov – 22 Nov (Folk Literature sprint)
  // 21 Nov:
  addTask('t-21nov-1', 'Folk Literature: Deep dive into Hayavadana themes', 'sub-fl', '2026-11-21', 1, 90, 10, 'A', 'session1', 'Identity, mind vs body, Bhagavata chorus, Yakshagana');
  addTask('t-21nov-2', 'Folk Literature: Written essay on Propp & Dundes', 'sub-fl', '2026-11-21', 2, 90, 10, 'A', 'session2', 'Write complete essay on 31 narrative functions');
  addTask('t-21nov-3', 'Indian Writing in Translation: Karnad\'s "The Wedding Album"', 'sub-iwt', '2026-11-21', 3, 75, 10, 'B', 'session3', 'Modern Indian family dynamics');
  addTask('t-21nov-4', 'Literary Forms: Melodrama, Farce, and Masque', 'sub-lf', '2026-11-21', 4, 75, 10, 'B', 'session4', 'Definitions, distinctions and dramatic devices');

  // 22 Nov:
  addTask('t-22nov-1', 'Folk Literature: Full Mock & Answer Writing Practice', 'sub-fl', '2026-11-22', 1, 90, 50, 'A', 'mock', 'Timed writing practice on Keats and Hayavadana');
  addTask('t-22nov-2', 'Folk Literature: Review all definitions & folk terms', 'sub-fl', '2026-11-22', 2, 90, 10, 'A', 'session2', 'Myths, ballads, riddles, charms, legends');
  addTask('t-22nov-3', 'Indian Writing: M.K. Indira "Phaniyamma" overview', 'sub-iwt', '2026-11-22', 3, 75, 10, 'B', 'session3', 'Brahmin widowhood and social endurance');
  addTask('t-22nov-4', 'Exam-eve light review & Folk Literature readiness check', 'sub-fl', '2026-11-22', 4, 75, 10, 'A', 'session4', 'Calm preparation for tomorrow’s forenoon exam');

  // 23 Nov: EXAM DAY 2!
  addTask('t-23nov-exam', 'EXAM DAY: Introduction to Folk Literature (Forenoon Session)', 'sub-fl', '2026-11-23', 1, 180, 50, 'A', 'session1', 'Conquer Exam 2 with your folklore knowledge!', true);
  addTask('t-23nov-rest', 'Post-Exam Rest & Light Preview of Indian Writing', 'sub-iwt', '2026-11-23', 3, 120, 10, 'B', 'session3', 'Rest well, then read Bharati and Silappathikaaram notes gently', true);

  // PHASE 5: 24 Nov – 27 Nov (Indian Writing sprint + Literary Forms)
  // 24 Nov:
  addTask('t-24nov-1', 'Indian Writing: Bharathiyar & Silappathikaaram master notes', 'sub-iwt', '2026-11-24', 1, 90, 20, 'A', 'notes', 'Handwritten quotes and contextual analysis');
  addTask('t-24nov-2', 'Indian Writing: Tagore "Far Below Flowed Jumna" & Kolatkar', 'sub-iwt', '2026-11-24', 2, 90, 10, 'A', 'session2', 'Spiritual detachment vs urban poverty');
  addTask('t-24nov-3', 'Literary Forms: Development of the Novel & Picaresque genre', 'sub-lf', '2026-11-24', 3, 75, 10, 'A', 'session3', 'Defoe, Fielding, and episodic rogue narratives');
  addTask('t-24nov-4', 'Literary Forms: Epistolary & Gothic novels', 'sub-lf', '2026-11-24', 4, 75, 10, 'A', 'session4', 'Pamela, Dracula, Frankenstein, uncanny motifs');

  // 25 Nov:
  addTask('t-25nov-1', 'Indian Writing: P. Sivakami\'s Dalit feminist perspective', 'sub-iwt', '2026-11-25', 1, 90, 10, 'A', 'session1', 'Land: Women’s Breadth and Speech critical analysis');
  addTask('t-25nov-2', 'Indian Writing: Karnad "The Wedding Album" critical essay', 'sub-iwt', '2026-11-25', 2, 90, 10, 'A', 'session2', 'Write 5-page timed answer');
  addTask('t-25nov-3', 'Literary Forms: Science Fiction and Stream of Consciousness', 'sub-lf', '2026-11-25', 3, 75, 10, 'A', 'session3', 'Virginia Woolf & James Joyce interior monologue');
  addTask('t-25nov-4', 'Literary Forms: Short story and biographical forms', 'sub-lf', '2026-11-25', 4, 75, 10, 'B', 'session4', 'Autobiography vs biography criteria');

  // 26 Nov:
  addTask('t-26nov-1', 'Indian Writing: M. K. Indira "Phaniyamma" in-depth', 'sub-iwt', '2026-11-26', 1, 90, 10, 'A', 'session1', 'Rebellion within tradition; character study');
  addTask('t-26nov-2', 'Indian Writing: "Vanishing Landmarks" & cultural memory', 'sub-iwt', '2026-11-26', 2, 90, 10, 'A', 'session2', 'Theme of vanishing heritage and modernization');
  addTask('t-26nov-3', 'Indian Writing: Complete unit notes compilation', 'sub-iwt', '2026-11-26', 3, 75, 20, 'A', 'notes', 'Consolidate all 4 units into revision booklet');
  addTask('t-26nov-4', 'Literary Forms: Poetic terms & meter quick flashcards', 'sub-lf', '2026-11-26', 4, 75, 10, 'B', 'session4', 'Stanzas, feet, rhyming schemes');

  // 27 Nov:
  addTask('t-27nov-1', 'FULL MOCK EXAM: Indian Writing in Translation', 'sub-iwt', '2026-11-27', 1, 135, 50, 'A', 'mock', '3-hour mock paper covering all translated texts');
  addTask('t-27nov-2', 'Self-grading & Weak Area Correction for Indian Writing', 'sub-iwt', '2026-11-27', 2, 45, 10, 'A', 'session2', 'Identify where citations or arguments were thin');
  addTask('t-27nov-3', 'Final Review: Indian Writing key quotations & names', 'sub-iwt', '2026-11-27', 3, 75, 10, 'A', 'session3', 'Bharati, Ilango Adigal, Sivakami, Indira');
  addTask('t-27nov-4', 'Relaxation & calm mindset for Indian Writing exam', 'sub-iwt', '2026-11-27', 4, 75, 10, 'A', 'session4', 'Mental rehearsal and early sleep');

  // 28 Nov: EXAM DAY 3!
  addTask('t-28nov-exam', 'EXAM DAY: Indian Writing in Translation (Forenoon Session)', 'sub-iwt', '2026-11-28', 1, 180, 50, 'A', 'session1', 'Conquer Exam 3! You are over halfway through!', true);
  addTask('t-28nov-rest', 'Post-Exam Rest & Literary Forms Orientation', 'sub-lf', '2026-11-28', 3, 120, 10, 'A', 'session3', 'Celebrate Exam 3 completion, then organize Literary Forms notes', true);

  // PHASE 6: 29 Nov – 30 Nov (Literary Forms full throttle: 5.5 hours dedicated)
  // 29 Nov:
  addTask('t-29nov-1', 'Literary Forms: Poetry & Drama complete master revision', 'sub-lf', '2026-11-29', 1, 90, 10, 'A', 'session1', 'Lyric, ode, elegy, sonnet, epic, tragedy, comedy');
  addTask('t-29nov-2', 'Literary Forms: Hand-written notes on Novel classifications', 'sub-lf', '2026-11-29', 2, 90, 20, 'A', 'notes', 'Gothic, Picaresque, Epistolary, Sci-Fi, Stream of Consciousness');
  addTask('t-29nov-3', 'Literary Forms: Distinctions drill (Tragedy vs Comedy, Farce vs Melodrama)', 'sub-lf', '2026-11-29', 3, 75, 10, 'A', 'session3', '10 rapid comparison answers');
  addTask('t-29nov-4', 'Literary Forms: Essay evolution (Aphoristic & Periodical)', 'sub-lf', '2026-11-29', 4, 75, 10, 'A', 'session4', 'Addison, Steele, Lamb, Hazlitt, Bacon');

  // 30 Nov:
  addTask('t-30nov-1', 'FULL MOCK EXAM: Literary Forms (Timed 3 Hours)', 'sub-lf', '2026-11-30', 1, 135, 50, 'A', 'mock', 'Simulate full question paper with definition questions');
  addTask('t-30nov-2', 'Self-grading & Glossary of 50 Literary Terms', 'sub-lf', '2026-11-30', 2, 45, 10, 'A', 'session2', 'Review definitions: Soliloquy, Aside, Hamartia, Foil, Volta');
  addTask('t-30nov-3', 'Final high-yield review of all 10 Priority A questions', 'sub-lf', '2026-11-30', 3, 75, 10, 'A', 'session3', 'Go over each question on the syllabus');
  addTask('t-30nov-4', 'Peace of mind & setup for Literary Forms Forenoon exam', 'sub-lf', '2026-11-30', 4, 75, 10, 'A', 'session4', 'Confidence check & early rest');

  // 01 Dec: EXAM DAY 4!
  addTask('t-01dec-exam', 'EXAM DAY: Literary Forms Elective V (Forenoon Session)', 'sub-lf', '2026-12-01', 1, 180, 50, 'A', 'session1', 'Exam 4 done! Elective mastered!', true);
  addTask('t-01dec-rest', 'Major Milestone Celebration & Victory Rest', 'sub-lf', '2026-12-01', 3, 120, 10, 'A', 'session3', '4 of 5 core exams conquered! Take the evening off.', true);

  // PHASE 7: 02 Dec – 13 Dec (Value Education + Academic requirements: 1 hr reserve)
  // Seed sample editable placeholder tasks for Value Education
  const veDates = [
    '2026-12-02', '2026-12-03', '2026-12-04', '2026-12-05',
    '2026-12-06', '2026-12-07', '2026-12-08', '2026-12-09',
    '2026-12-10', '2026-12-11', '2026-12-12', '2026-12-13'
  ];

  veDates.forEach((dateStr, idx) => {
    const dayNum = idx + 1;
    addTask(
      `t-ve-${dateStr}-1`,
      `Value Education Day ${dayNum}: Collect notes & study prescribed unit`,
      'sub-ve',
      dateStr,
      1,
      90,
      10,
      'A',
      'session1',
      'Study moral philosophy, human values, social ethics from college syllabus'
    );
    addTask(
      `t-ve-${dateStr}-2`,
      `Value Education Day ${dayNum}: Prepare handwritten notes and definitions`,
      'sub-ve',
      dateStr,
      2,
      90,
      20,
      'A',
      'notes',
      'Summarize key value principles into handwritten revision book'
    );
    addTask(
      `t-ve-${dateStr}-3`,
      `Academic Requirements: Project Viva / Employability / Internship docs`,
      'sub-pv',
      dateStr,
      3,
      75,
      10,
      'B',
      'session3',
      'Reserve 1+ hour daily for project report writing, viva preparation, or field visit documentation'
    );
    addTask(
      `t-ve-${dateStr}-4`,
      `Value Education Day ${dayNum}: Practice short & long answer writing`,
      'sub-ve',
      dateStr,
      4,
      75,
      10,
      'A',
      'session4',
      'Write timed responses to ethical scenarios and value education essays'
    );
  });

  // 14 Dec: FINAL EXAM DAY!
  addTask('t-14dec-exam', 'FINAL EXAM: Value Education (Forenoon Session)', 'sub-ve', '2026-12-14', 1, 180, 50, 'A', 'session1', 'THE GRAND FINALE! You are officially the Semester Survivor!', true);
  addTask('t-14dec-rest', 'VICTORY CELEBRATION: Quest Complete!', 'sub-ve', '2026-12-14', 3, 120, 100, 'A', 'session3', 'You conquered your semester with flying colors!', true);

  return tasks;
}

export const initialAppState: AppState = {
  schemaVersion: 1,
  profile: initialProfile,
  exams: initialExams,
  subjects: initialSubjects,
  questions: initialQuestions,
  tasks: generateInitialTasks(),
  daySchedules: {},
  xpLedger: [],
  achievements: initialAchievements,
  rewards: initialRewards,
  focusSessions: [],
  mockExams: [],
  recallQuizzes: [],
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
  },
};

