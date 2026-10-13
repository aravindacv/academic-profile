/**
 * Site-wide profile information. Edit this file to change the header,
 * biography, metrics and links. Lists (publications, projects, grants,
 * positions) live in the JSON files next to this one.
 */
export const profile = {
  name: 'Aravinda C. V.',
  honorific: 'Dr',
  title: 'Tenure-Track Faculty in Computer Science',
  department: 'Department of Computer Science',
  institution: 'Coventry University Kazakhstan',
  location: 'Astana, Kazakhstan',
  // Contact emails shown on the site. A personal phone number is intentionally not published.
  email: 'ae7378@coventry.ac.uk',            // university (official enquiries, students)
  personalEmail: 'aravinda.cv@gmail.com',    // personal (collaboration, direct contact)
  // Photo lives in public/. Set to null to show initials instead.
  photo: 'photo.png' as string | null,

  ids: {
    orcid: '0000-0003-4588-4105',
    scopus: '36599892200',
    scholar: 'vclqSkkAAAAJ',
  },

  orcidUrl: 'https://orcid.org/0000-0003-4588-4105',
  scopusUrl: 'https://www.scopus.com/authid/detail.uri?authorId=36599892200',
  scholarUrl: 'https://scholar.google.com/citations?user=vclqSkkAAAAJ',

  /**
   * Google Scholar citations, h-index and i10-index update AUTOMATICALLY every week
   * (see scripts/fetch-scholar-metrics.mjs and src/data/scholar-metrics.json).
   *
   * Scopus figures below are updated by hand. `scopusAsOf` is shown next to them.
   * scopusDocuments: the "Documents" figure on your Scopus page (null hides it).
   */
  metrics: {
    scopusHIndex: 18,
    scopusDocuments: null as number | null,
    scopusAsOf: 'October 2026',
  },

  links: [
    { label: 'Scopus', href: 'https://www.scopus.com/authid/detail.uri?authorId=36599892200' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=vclqSkkAAAAJ' },
    { label: 'ORCID', href: 'https://orcid.org/0000-0003-4588-4105' },
    { label: 'GitHub', href: 'https://github.com/aravindacv' },
  ],

  biography: [
    'Dr Aravinda C. V. is Tenure-Track Faculty in the Department of Computer Science at Coventry University Kazakhstan, Astana. He joined in September 2026 after positions at Middle East College, Oman (affiliated to Coventry University, UK), N.M.A.M. Institute of Technology, NITTE University, and S.J.B. Institute of Technology in India. He completed a postdoctoral fellowship in quantum machine learning for medical image analysis at Multimedia University, Malaysia (2025–2026), and was a research fellow on a JSPS KAKENHI project at Ritsumeikan University, Japan (2020).',
    'His research focuses on trustworthy AI for medical imaging: explainable deep learning, vision transformers, self-supervised and active learning, and hybrid quantum–classical models, evaluated with attention to generalisation across sites and clinically meaningful explanations. Earlier work centred on handwritten and historical character recognition for South Indian and East Asian scripts, the subject of his Ph.D. from Visvesvaraya Technological University.',
    'He has guided 6 postdoctoral researchers and 3 Ph.D. scholars, has led funded projects as Principal Investigator in Oman and India, has authored three practical textbooks on neural networks, MLOps and prompt engineering, and builds open teaching platforms used in his own courses.',
  ],

  researchInterests: [
    'Explainable AI (XAI)',
    'Deep Learning for Medical Image Analysis',
    'Quantum Machine Learning',
    'Vision Transformers',
    'Self-Supervised and Active Learning',
    'Cross-Domain Generalisation',
    'Federated Learning',
    'Retrieval-Augmented Generation',
    'Character Recognition',
  ],

  /** Research supervision. Shown on the Teaching page and in the biography. */
  supervision: {
    postdoc: 6,
    phd: 3,
    students: '30+', // undergraduate and postgraduate
  },

  teachingAreas: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Explainable AI',
    'Large Language Models and Prompt Engineering',
    'Digital Image Processing',
    'Information Security',
  ],

  awards: [
    { title: 'Best Paper Award', detail: 'ACT 2023', year: null },
    { title: 'Certificate of Appreciation', detail: 'IEEE Access', year: null },
    { title: 'Faculty Start-up Award', detail: 'AICTE–IIT Madras National Competition', year: null },
  ],

  memberships: [
    { org: 'IEEE', since: 'Jan 2021' },
    { org: 'ACM, Professional Member', since: 'Aug 2020' },
    { org: 'IAENG', since: 'Mar 2019' },
  ],

  languages: ['English', 'Kannada', 'Hindi'],
} as const;

export type Profile = typeof profile;
