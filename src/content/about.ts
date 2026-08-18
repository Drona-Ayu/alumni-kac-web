import type { AboutContent } from './types'

/**
 * TODO: the association's own history, mission wording and figures.
 * The copy below is placeholder written to the right length and tone so the
 * layout is honest about how much text each slot holds.
 */
export const about: AboutContent = {
  intro: [
    'The Kannur Ayurveda College Alumni Association — KhAyAL — brings together the graduates of Government Ayurveda Medical College, Pariyaram. It was registered in 2024 under registration number KNR/CA/355/2024.',
    'What began as batch groups keeping in touch has become a single body: a way for physicians, researchers, teachers and students of this college to find each other, learn from each other, and give back to the institution that trained them.',
  ],

  mission:
    'To keep the graduates of Government Ayurveda Medical College, Pariyaram connected to one another and to the college — through academic exchange, mentorship, and service to the community.',

  vision:
    'An alumni body that every graduate turns to first: for a colleague to consult, a junior to guide, and a place to contribute.',

  objectives: [
    {
      title: 'Keep the network findable',
      body: 'Maintain a current register of alumni across batches, so a graduate anywhere can find a colleague in their district, their speciality, or their year.',
    },
    {
      title: 'Continue the learning',
      body: 'Run CME programmes, clinical seminars and case discussions that keep practising physicians current in both classical and contemporary Ayurveda.',
    },
    {
      title: 'Mentor the students behind us',
      body: 'Pair senior alumni with current students and house surgeons for guidance on clinical practice, post-graduate entrance, and career decisions.',
    },
    {
      title: 'Support the college',
      body: 'Contribute to the departments, the library and the hospital, and support students who need help continuing their studies.',
    },
    {
      title: 'Serve the public',
      body: 'Organise medical camps and public-health awareness work in and around Kannur, in the tradition the college teaches.',
    },
    {
      title: 'Hold the record',
      body: "Document the college's history, its teachers and its milestones, so each batch inherits more than it was given.",
    },
  ],

  milestones: [
    // TODO: replace with the association's actual timeline.
    {
      year: '2024',
      title: 'Registered as an association',
      body: 'KhAyAL is formally registered under registration number KNR/CA/355/2024, giving the alumni body a legal identity of its own.',
    },
    {
      year: '2024',
      title: 'First general body meeting',
      body: 'Alumni across batches meet on campus to adopt the constitution and elect the first executive committee.',
    },
    {
      year: '2025',
      title: 'Alumni register opened',
      body: 'A batch-wise register begins, collecting contact details and practice locations from graduates across India and abroad.',
    },
    {
      year: '2025',
      title: 'First CME programme',
      body: 'The association hosts its first continuing medical education programme for practising alumni on the college campus.',
    },
  ],

  stats: [
    // TODO: replace with real figures before publishing — these are placeholders.
    { value: '900+', label: 'Graduates on the register' },
    { value: '25', label: 'Batches represented' },
    { value: '12', label: 'Programmes held' },
    { value: '2024', label: 'Year registered' },
  ],

  college: {
    heading: 'Government Ayurveda Medical College, Pariyaram',
    body: [
      'The college at Pariyaram in Kannur district is one of Kerala’s government institutions for Ayurveda medical education, offering the BAMS undergraduate programme along with a teaching hospital that serves the surrounding region.',
      'Its graduates practise across Kerala and well beyond it — in clinics and hospitals, in teaching, in research, and in public health. KhAyAL exists to keep that dispersed body in one conversation.',
    ],
  },
}
