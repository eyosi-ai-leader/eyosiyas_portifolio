// The 5 certificates shown in the "Verified checkpoints" section.
// Put the image files in public/certificates/ and match the file names below
// (use your real names and extensions: .jpg, .png, .webp).
export const certificates = [
  {
    id: "CERT-01",
    type: "technical",
    title: "Full Stack Web Development (MERN)",
    issuer: "Evangadi Inc",
    date: "December 23, 2024",
    description:
      "Certificate of completion for the Full Stack Web Development (MERN) program.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    image: "/certificates/evangadi-mern.jpg",
  },
  {
    id: "CERT-02",
    type: "technical",
    title: "Programming Fundamentals Nanodegree",
    issuer: "Udacity",
    date: "May 12, 2025",
    description:
      "Verified Udacity certificate of Nanodegree program completion in programming fundamentals.",
    tags: ["Programming", "Fundamentals"],
    image: "/certificates/udacity-programming-fundamentals.jpg",
    // from the certificate text; click it once to confirm it opens
    verifyUrl:
      "https://www.udacity.com/certificate/e/d268e16a-170b-11f0-ac32-2b488b75916e",
  },
  {
    id: "CERT-03",
    type: "academic",
    title: "B.Sc. in Information Systems",
    issuer: "Arsi University",
    date: "June 22, 2026",
    description:
      "Temporary certificate of graduation from the College of Business and Economics, issued while the final diploma is being prepared. Very Great Distinction.",
    tags: ["Major GPA 3.84", "CGPA 3.76", "Exit exam 79"],
    image: "/certificates/arsi-university-graduation.jpg",
  },
  {
    id: "CERT-04",
    type: "leadership",
    title: "President, Techno Based Club",
    issuer: "Arsi University",
    date: "2025/2026 academic year",
    description:
      "Certificate of recognition for serving as President and Event Organizer of the ARU Techno Based Club, promoting technology activities and innovation on campus.",
    tags: ["Leadership", "Events", "Community"],
    image: "/certificates/techno-club-president.jpg",
  },
  {
    id: "CERT-05",
    type: "leadership",
    title: "History Makers Leadership Training",
    issuer: "International Leadership Institute",
    date: "March 21-25, 2022",
    description:
      "National-level leadership training held in Addis Ababa in collaboration with EvaSUE.",
    tags: ["Leadership", "Training"],
    image: "/certificates/ili-leadership-training.jpg",
  },
];