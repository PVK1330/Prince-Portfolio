// ─────────────────────────────────────────────────────────────
// Single source of truth for portfolio content.
// Edit values here; components read from this file.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Prince Kanoujiya',
  first: 'Prince',
  last: 'Kanoujiya',
  brand: 'prince-kanoujiya',
  role: 'full-stack developer',
  email: 'pkk22722@gmail.com',
  phone: '+91 84849 44381',
  phoneHref: '+918484944381',
  region: 'Maharashtra, IN',
  experienceYears: '5 years',
  github: 'https://github.com/PVK1330',
  linkedin: 'https://www.linkedin.com/in/kanoujiya-prince-vinjendrakumar-752a461a8',
  resume: '/Prince-Kanoujiya-Resume.pdf',
  thesisLines: [
    'I build secure,',
    { strong: 'multi-tenant SaaS' },
    '— the APIs, automation, and infrastructure that run quietly behind the product.',
  ],
  roleLines: [
    'PHP · Laravel · CodeIgniter 4',
    'Node.js · React.js · REST APIs',
    'WhatsApp Cloud API · Meta Platform',
  ],
}

export const status = [
  { k: 'status', v: 'available', live: true },
  { k: 'experience', v: '5 years' },
  { k: 'region', v: 'Maharashtra, IN' },
  { k: 'mode', v: 'remote / relocation' },
  { k: 'focus', v: 'SaaS · API · automation' },
]

export const about =
  "Full-stack web developer with five years building and scaling secure SaaS platforms across §PHP§ and §JavaScript§ stacks. I've led small teams, architected RESTful APIs, integrated the WhatsApp Cloud API and Meta Developer Platform, and owned delivery from requirement analysis through production. I care about clean, maintainable code, solid authentication and role-based access, and shipping systems that stay fast and reliable under real load."

export const stack = [
  {
    lbl: 'Languages',
    items: ['PHP', 'Core PHP', 'JavaScript (ES6+)', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    lbl: 'Frameworks & Libraries',
    items: ['Laravel', 'CodeIgniter 4', 'Node.js', 'React.js', 'Bootstrap', 'jQuery'],
  },
  {
    lbl: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    lbl: 'APIs & Integrations',
    items: ['REST API design', 'WhatsApp Cloud API', 'Meta Developer Platform', 'Webhooks', 'Payment Gateways'],
  },
  {
    lbl: 'Architecture & Security',
    items: ['MVC', 'OOP / SOLID', 'RBAC', 'Token Auth', 'Multi-tenant SaaS'],
  },
  {
    lbl: 'DevOps & Practices',
    items: ['Server deployment', 'DB optimization & indexing', 'Performance tuning', 'Agile'],
  },
]

export const experience = [
  {
    when: 'May 2025 — Apr 2026',
    badge: 'team lead',
    role: 'Full-Stack Developer',
    company: 'Anantkamal Software Labs',
    meta: 'SaaS & web solutions for B2B clients · India',
    points: [
      'Led a development team delivering multiple web and §SaaS products end-to-end§, from requirement analysis through production deployment.',
      'Architected scalable applications across §Laravel, CodeIgniter 4, Node.js, and React.js§.',
      'Designed and shipped §WhatsApp Cloud API§ solutions — broadcasting, message templates, webhooks, and chatbot automation — on the Meta Developer Platform (Business Manager, System Users, Access Tokens).',
      'Built secure REST APIs with token-based authentication and §role-based access control§.',
      'Owned database optimization, server configuration, and deployment to keep apps fast and reliable.',
    ],
  },
  {
    when: 'Feb 2025 — Apr 2025',
    badge: null,
    role: 'Full-Stack Developer',
    company: 'Hiray Media and Technology Pvt. Ltd',
    meta: 'Enterprise ERP Solutions · Nashik, India',
    points: [
      'Contributed as a Full-Stack Developer on the §Campus360 ERP platform§ (hmtcampus360v2.net), designing portal structures and handling college administrative workflows.',
      'Optimized database queries and structured schemas to improve performance under high concurrent user loads.',
      'Developed responsive user dashboards and administrative control panels using core web technologies.',
    ],
  },
  {
    when: 'Jul 2023 — Feb 2025',
    badge: null,
    role: 'Full-Stack Developer',
    company: 'Techflux Solutions',
    meta: 'Custom web application development · India',
    points: [
      'Developed dynamic, scalable web applications using §Core PHP, Laravel, and CodeIgniter 4§.',
      'Built and integrated §RESTful APIs§ connecting web applications with third-party services.',
      'Applied §MVC architecture and OOP principles§ to deliver maintainable, well-structured code.',
      'Designed responsive interfaces with HTML5, CSS3, Bootstrap, JavaScript, and jQuery.',
      'Optimized MySQL databases through schema design, indexing, and query tuning.',
      'Implemented secure auth and handled testing, deployment, and hosting across concurrent projects.',
    ],
  },
]

export const projects = [
  {
    id: '01',
    featured: true,
    flag: 'flagship',
    title: 'WhatsApp Automation SaaS Platform',
    desc: 'A WhatsApp marketing & automation platform (comparable to AiSensy / WATI) with broadcasting, template management, contact handling, campaign tracking, and a visual chatbot flow builder — all on a scalable multi-tenant architecture.',
    stack: ['Laravel', 'WhatsApp Cloud API', 'Multi-tenant SaaS', 'Webhooks'],
    github: 'https://github.com/PVK1330',
    demo: 'https://github.com/PVK1330',
  },
  {
    id: '02',
    title: 'Nahata Sports — Booking Platform',
    desc: 'A venue and slot-booking platform with real-time availability, online payments, and an admin CMS for managing venues, categories, pricing, and schedules.',
    stack: ['PHP', 'MySQL', 'REST API'],
    github: 'https://github.com/PVK1330',
  },
  {
    id: '03',
    title: 'DreamsToFly — Study Abroad',
    desc: 'A platform helping students explore international universities and programs, with dynamic search & filtering, a custom CMS for listings, and a responsive, lead-focused interface.',
    stack: ['Laravel', 'Custom CMS'],
    github: 'https://github.com/PVK1330',
  },
  {
    id: '04',
    title: 'Hobit — Multi-Channel Booking',
    desc: 'An end-to-end service booking workflow across Web, App, and WhatsApp — covering registration, scheduling, and confirmation — backed by a scalable real-time backend.',
    stack: ['Web', 'App', 'WhatsApp'],
    github: 'https://github.com/PVK1330',
  },
  {
    id: '05',
    title: 'Leaving Certificate Management',
    desc: 'An online system to generate and download certificates as PDFs, with student fee tracking, custom pagination for large datasets, email-based password recovery, and role-based access control.',
    stack: ['PHP', 'MySQL', 'RBAC'],
    github: 'https://github.com/PVK1330',
  },
]

export const education = [
  {
    title: 'B.Tech — Computer Science / Engineering',
    sub: 'Dr. A.P.J. Abdul Kalam Technical University',
    yr: '2019 — 2023',
  },
  {
    title: 'Higher Secondary & Secondary (HSC / SSC)',
    sub: 'Maharashtra State Board',
    yr: '2017 — 2019',
  },
]

export const certs = ['Full Stack Developer', 'MERN Stack Developer']
