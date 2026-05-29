import { Users, Award, Target, Wind, HeartHandshake, Infinity, Compass, Scale, Brain } from "lucide-react";

export const BRAND_CONFIG = {
  name: "REKHA CHOUDHARY",
  subName: "SPIRITUAL COACH",
  description: "Rekha Choudhary is an author, coach, and certified hypnotherapist who helps individuals move from emotional confusion to conscious living through structured spiritual and mental practices.",
  email: "anchorrekhachoudhary@gmail.com",
  phone: "+91 83088 44240"
};

// =========================================================================
// GOOGLE FORM EXTERNAL LINKS
// Adjust these URLs to directly link to your live Google Forms.
// Clicking any CTA button on the website will open the corresponding link.
// =========================================================================
export const GOOGLE_FORM_LINKS = {
  enroll: "https://docs.google.com/forms/d/e/1FAIpQLSfXXXXXXXXXXXXX/viewform?usp=sf_link",
  demo: "https://docs.google.com/forms/d/e/1FAIpQLSfXXXXXXXXXXXXX/viewform?usp=sf_link",
  review: "https://docs.google.com/forms/d/e/1FAIpQLSfXXXXXXXXXXXXX/viewform?usp=sf_link",
  contact: "https://docs.google.com/forms/d/e/1FAIpQLSfXXXXXXXXXXXXX/viewform?usp=sf_link"
};

export const IMAGES = {
  logo: "/logo.png",
  heroPreview: "/rekha_portrait.png",
  aboutUs: "/awaken_book.png"
};

export const stats = [
  { label: "Individuals Guided", value: "2,500+", icon: Users },
  { label: "Global Book Readers", value: "10,000+", icon: Award },
  { label: "Client Success Rate", value: "98%", icon: Target },
];

export const masteryPrograms = [
  {
    title: "1. Awaken: The Shift to Awareness",
    desc: "Focuses on stepping out of autopilot through Recognition, Deep Desire discovery, Breath awareness, and the practice of Silence.",
    highlight: "Pillar One",
    icon: Wind,
    colorStyle: "from-[#5C8075]/10 to-[#E3EEF0]/40 border-[#5C8075]/20 hover:border-[#5C8075]/40 text-[#5C8075]"
  },
  {
    title: "2. Heal: Becoming Whole",
    desc: "A process of responding to oneself with compassion using Self-Love, Affirmations, Gratitude, Mirror Work, Salt Therapy, and Prayer.",
    highlight: "Pillar Two",
    icon: HeartHandshake,
    colorStyle: "from-[#7B5A79]/10 to-[#F0EAEF]/40 border-[#7B5A79]/20 hover:border-[#7B5A79]/40 text-[#7B5A79]"
  },
  {
    title: "3. Relate: Conscious Living in Action",
    desc: "Bringing awareness to the real world through the Law of Attraction, the Law of Giving, Visualization, Goal Setting, and Energy Management.",
    highlight: "Pillar Three",
    icon: Infinity,
    colorStyle: "from-[#B39255]/10 to-[#F2ECE1]/40 border-[#B39255]/20 hover:border-[#B39255]/40 text-[#B39255]"
  },
];

export const courses = [
  {
    title: "7-Day Return to Yourself Experience (Demo Pass)",
    duration: "7 Days",
    desc: "Attend guided trial sessions, experience guided Pranayama breathwork, and explore our diagnostics risk-free for 7 days.",
    image: "/clarity_demo.png",
    syllabus: ["Introductory Methodology Tour", "Live Guided Morning Pranayama", "Subconscious Block Diagnostics", "Daily Silence Quest Basics", "1-on-1 Clarity Consult Call"],
    target: "Individuals wanting to experience Rekha's teaching and hypnotherapy style before formal enrollment.",
    schedule: "Flexible booking times via portal"
  },
  {
    title: "21-Day Morning Sadhana Challenge",
    duration: "21 Days",
    desc: "A high-discipline program featuring live guided Pranayama, meditation, and energy alignment held during the sacred early morning hours.",
    image: "/sadhana_meditation.png",
    syllabus: ["Guided Pranayama Breathwork", "Deep Guided Meditation", "Chakra Energy Alignment", "Silent Mindfulness Practice", "Daily Intentional Goal Setting"],
    target: "Individuals seeking morning discipline, energy alignment, and breathing practices.",
    schedule: "Daily (5:30 AM - 6:30 AM)"
  },
  {
    title: "Personal Mastery Program",
    duration: "6 Months",
    desc: "A comprehensive 6-month journey including 1:1 sessions, life diagnostics, and deep dives into the Awaken-Heal-Relate curriculum.",
    image: "/personal_mastery.png",
    syllabus: ["Holistic Life Diagnostics", "Custom 1:1 Coaching Sessions", "Hypnotherapy Clearings", "Goal & Intentionality Roadmap", "Daily Energy Management"],
    target: "Anyone looking for deep personal transformation and direct 1-on-1 coaching.",
    schedule: "Weekly 1:1 Booking Slots"
  }
];

export const krishnaPerspective = {
  title: "The \"Krishna\" Perspective in Coaching",
  desc: "Rekha views the coach's role as providing the perspective and grounding needed to face inner conflicts, similar to Krishna's guidance to Arjun.",
  image: "/krishna_guidance.png",
  duration: "Ongoing Series",
  schedule: "Bi-Weekly Sessions",
  syllabus: ["Gita Leadership Principles", "Resolving Core Inner Conflicts", "Perspective & Detached Action", "Grounding Under Intense Pressure"],
  target: "Leaders and professionals dealing with intense decision-making and ethical dilemma challenges."
};

export const features = [
  { name: "Hypnotherapy for Deep Desire", desc: "Rekha utilizes hypnotherapy to help clients bypass the conscious mind and uncover authentic longings versus conditioned wants.", icon: Compass },
  { name: "Emotional Stability", desc: "Clients experience a shift from being easily triggered to remaining steady within their emotions under any pressure.", icon: Scale },
  { name: "Reduced Overthinking", desc: "Structured practices like Pranayama and Silence help calm mental noise, clear thoughts, and restore inner clarity.", icon: Brain },
];

export const testimonials = [
  { name: "Nisha Sen", role: "Executive Client", review: "Working with Rekha has been life-changing. The hypnotherapy sessions helped me bypass my conscious blocks and uncover my true purpose.", rating: 5, avatar: "NS" },
  { name: "Amit Sharma", role: "Sadhana Participant", review: "The 21-Day Morning Sadhana completely transformed my daily focus. I feel centered, calm, and ready to face my days.", rating: 5, avatar: "AS" },
  { name: "Rohan Verma", role: "Workshop Student", review: "Her book 'Awaken • Heal • Relate' provides the perfect framework. I moved from deep emotional confusion to a clear, conscious life.", rating: 5, avatar: "RV" },
];
