import type { MembershipContent } from './types'

/**
 * TODO: replace the fees, bank details and form link with the association's
 * own. `formUrl` is expected to be a Google Form (or similar) — leaving it
 * undefined hides the button rather than rendering a dead link.
 */
export const membership: MembershipContent = {
  intro:
    'Membership is open to every graduate of Government Ayurveda Medical College, Pariyaram. Joining puts you on the alumni register, brings you the association’s notices, and gives you a vote at the general body.',

  eligibility: [
    'Any graduate of Government Ayurveda Medical College, Pariyaram, of any batch.',
    'Post-graduates and research scholars of the college.',
    'House surgeons and final-year students may enrol as associate members.',
  ],

  benefits: [
    {
      title: 'The register',
      body: 'Find alumni by batch, district or speciality — and be findable yourself when a colleague is looking for someone in your field.',
    },
    {
      title: 'Academic programmes',
      body: 'Priority registration and member rates for CME programmes, seminars and clinical workshops run by the association.',
    },
    {
      title: 'A vote in how it runs',
      body: 'Full members vote at the general body and may stand for the executive committee.',
    },
    {
      title: 'Mentorship, both ways',
      body: 'Be matched with a senior in your field, or take on a junior who is where you once were.',
    },
  ],

  tiers: [
    // TODO: replace with the fees approved by the general body.
    {
      name: 'Annual membership',
      fee: '₹500 / year',
      note: 'Renewed each year before the general body meeting.',
    },
    {
      name: 'Life membership',
      fee: '₹5,000 once',
      note: 'No renewal, ever. The simplest option for most members.',
    },
    {
      name: 'Associate (students)',
      fee: 'Free',
      note: 'For house surgeons and final-year students of the college.',
    },
  ],

  steps: [
    {
      title: 'Fill the membership form',
      body: 'Your batch, current practice location and contact details — this is what goes on the register.',
    },
    {
      title: 'Pay the membership fee',
      body: 'Transfer to the association account using the details below, and note your name and batch in the payment reference.',
    },
    {
      title: 'Confirmation',
      body: 'The secretary confirms your enrolment by email, usually within a week, and you are on the register.',
    },
  ],

  // TODO: replace with the association's own form link, or remove to hide the button.
  formUrl: undefined,

  bankDetails: [
    // TODO: replace with the association's actual account details.
    { label: 'Account name', value: 'Kannur Ayurveda College Alumni Association' },
    { label: 'Account number', value: '0000 0000 0000' },
    { label: 'IFSC', value: 'XXXX0000000' },
    { label: 'Branch', value: 'Pariyaram, Kannur' },
    { label: 'UPI', value: 'khayal@upi' },
  ],
}
