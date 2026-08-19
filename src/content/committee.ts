import type { CommitteeContent } from './types'

/**
 * TODO: every name, role and batch below is a placeholder. Replace them with
 * the elected committee. To add a photo, drop the file in `public/committee/`
 * and set `photo: '/committee/filename.jpg'`; without one the card falls back
 * to the member's initials, which is a deliberate, complete state — not a gap.
 */
export const committee: CommitteeContent = {
  term: '2025 – 2027',

  officeBearers: [
    { name: 'Dr. A. Nair', role: 'President', batch: 'BAMS 2004', place: 'Kannur' },
    { name: 'Dr. S. Menon', role: 'Vice President', batch: 'BAMS 2007', place: 'Kozhikode' },
    { name: 'Dr. R. Krishnan', role: 'General Secretary', batch: 'BAMS 2010', place: 'Kannur' },
    { name: 'Dr. P. Thomas', role: 'Joint Secretary', batch: 'BAMS 2013', place: 'Thalassery' },
    { name: 'Dr. M. Devi', role: 'Treasurer', batch: 'BAMS 2009', place: 'Payyanur' },
  ],

  executiveMembers: [
    { name: 'Dr. K. Raghavan', role: 'Executive Member', batch: 'BAMS 1998', place: 'Kannur' },
    { name: 'Dr. L. Suresh', role: 'Executive Member', batch: 'BAMS 2002', place: 'Bengaluru' },
    { name: 'Dr. N. Fathima', role: 'Executive Member', batch: 'BAMS 2006', place: 'Kasaragod' },
    { name: 'Dr. V. Anand', role: 'Executive Member', batch: 'BAMS 2011', place: 'Thrissur' },
    { name: 'Dr. G. Priya', role: 'Executive Member', batch: 'BAMS 2014', place: 'Kochi' },
    { name: 'Dr. H. Basheer', role: 'Executive Member', batch: 'BAMS 2016', place: 'Mangaluru' },
    { name: 'Dr. T. Lakshmi', role: 'Executive Member', batch: 'BAMS 2018', place: 'Pariyaram' },
    { name: 'Dr. J. Varghese', role: 'Executive Member', batch: 'BAMS 2020', place: 'Kannur' },
  ],

  note: 'The committee is elected by the general body and serves a two-year term.',
}
