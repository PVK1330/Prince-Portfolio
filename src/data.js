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

export const aboutStats = [
  { n: '5+', label: 'Years Experience' },
  { n: '20+', label: 'Projects Delivered' },
  { n: '3', label: 'Core Tech Stacks' },
  { n: '100+', label: 'APIs Shipped' },
]

export const services = [
  {
    id: '01',
    icon: 'api',
    title: 'Backend API Development',
    desc: 'RESTful APIs with token-based auth, RBAC, and clean endpoint design across Laravel, CodeIgniter 4, and Node.js — built for scale, security, and maintainability from day one.',
    tags: ['Laravel', 'Node.js', 'REST API', 'RBAC'],
  },
  {
    id: '02',
    icon: 'saas',
    title: 'SaaS Platform Architecture',
    desc: 'Multi-tenant platforms with isolated tenants, shared infrastructure, per-tenant configuration, and secure data boundaries that scale without per-customer overhead.',
    tags: ['Multi-tenant', 'Laravel', 'MySQL', 'OOP / SOLID'],
  },
  {
    id: '03',
    icon: 'whatsapp',
    title: 'WhatsApp Cloud API Integration',
    desc: 'End-to-end WhatsApp automation — broadcast campaigns, message templates, webhook handlers, chatbot flows, and Meta Business Platform verification from scratch.',
    tags: ['WhatsApp Cloud API', 'Webhooks', 'Meta Platform'],
  },
  {
    id: '04',
    icon: 'db',
    title: 'Database Design & Optimization',
    desc: 'Schema design, indexing strategies, query tuning, and migration planning for MySQL, PostgreSQL, and MongoDB — engineered for performance under real concurrent load.',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Performance'],
  },
  {
    id: '05',
    icon: 'fullstack',
    title: 'Full-Stack Web Development',
    desc: 'Complete web applications from React frontends to PHP/Node backends — responsive, accessible, performant, and maintainable. Delivered end-to-end, not handed off.',
    tags: ['React.js', 'PHP', 'JavaScript', 'Bootstrap'],
  },
  {
    id: '06',
    icon: 'team',
    title: 'Team Leadership & Delivery',
    desc: 'Leading dev teams through requirement analysis, sprint planning, code review, and production deployment using Agile practices — on time and to specification.',
    tags: ['Agile', 'Team Lead', 'Code Review', 'Deployment'],
  },
]

export const blogs = [
  {
    id: '01',
    date: 'May 2025',
    readTime: '6 min read',
    tag: 'Architecture',
    title: 'Building Multi-Tenant SaaS with Laravel: Isolation Without Overhead',
    excerpt: 'How I structure shared-database, shared-schema multi-tenancy with per-tenant config, scoped queries, and zero cross-contamination — without a separate database per customer.',
    body: [
      {
        type: 'lead',
        text: "Multi-tenancy is one of those architecture decisions that sounds straightforward until you're debugging a cross-tenant data leak at 2 AM. Here's the approach I've refined across three SaaS products.",
      },
      {
        type: 'h2',
        text: 'Picking the Right Strategy',
      },
      {
        type: 'p',
        text: 'Three common approaches exist: separate databases per tenant, separate schemas, and shared schema with a tenant_id discriminator. I use shared-database, shared-schema. It has the most operational simplicity — one migration touches all tenants, connection pooling is straightforward, and horizontal scaling works without per-customer database clusters.',
      },
      {
        type: 'h2',
        text: 'Automatic Scoping with a Global Scope Trait',
      },
      {
        type: 'p',
        text: 'The critical requirement: tenant scoping must be automatic, not opt-in. If a developer can forget to apply a scope, eventually they will. I implement a BelongsToTenant trait with an Eloquent global scope that every tenant-aware model uses.',
      },
      {
        type: 'code',
        lang: 'php',
        text: `trait BelongsToTenant
{
    protected static function bootBelongsToTenant(): void
    {
        static::addGlobalScope('tenant', function (Builder $query) {
            $query->where('tenant_id', app('tenant')->id);
        });

        static::creating(function (Model $model) {
            $model->tenant_id ??= app('tenant')->id;
        });
    }
}`,
      },
      {
        type: 'h2',
        text: 'Resolving the Tenant per Request',
      },
      {
        type: 'p',
        text: "Tenant resolution happens in a middleware that runs before every authenticated request. I resolve from the subdomain (acme.myapp.com) for web clients and from a JWT claim for API clients. Both paths bind the same app('tenant') singleton.",
      },
      {
        type: 'code',
        lang: 'php',
        text: `class ResolveTenant
{
    public function handle(Request $request, Closure $next): Response
    {
        $host   = $request->getHost();     // e.g. acme.myapp.com
        $slug   = explode('.', $host)[0];
        $tenant = Tenant::where('slug', $slug)->firstOrFail();

        app()->instance('tenant', $tenant);

        return $next($request);
    }
}`,
      },
      {
        type: 'h2',
        text: 'The Failure Modes',
      },
      {
        type: 'p',
        text: 'Raw DB::select() calls bypass Eloquent and therefore bypass the global scope. I enforce a rule in code review: raw queries in tenant-aware controllers must include an explicit tenant_id WHERE clause and a comment explaining why the model scope was bypassed.',
      },
      {
        type: 'p',
        text: "Queued jobs are the other trap. The tenant context is resolved from the HTTP request, but jobs run without one. I serialize the tenant ID in the job constructor and re-resolve it in handle(), wrapping the job body inside a withTenant() helper that reinstates the scope for the duration of the job.",
      },
      {
        type: 'callout',
        text: "This architecture has been running in production for 18 months across three products without a cross-tenant data incident. The global scope does the heavy lifting; disciplined code review handles the edges.",
      },
    ],
  },
  {
    id: '02',
    date: 'Mar 2025',
    readTime: '8 min read',
    tag: 'Integration',
    title: 'WhatsApp Cloud API in Production: Webhooks, Templates & Rate Limits',
    excerpt: "A practical guide to going live with the WhatsApp Business API — verifying webhooks, managing message templates, handling delivery statuses, and staying inside Meta's rate windows.",
    body: [
      {
        type: 'lead',
        text: "Going live with the WhatsApp Cloud API is more operational than it is code. Most of the complexity is in Meta's verification process, webhook delivery guarantees, and rate limit behaviour — not the API calls themselves.",
      },
      {
        type: 'h2',
        text: 'Webhook Verification',
      },
      {
        type: 'p',
        text: 'Meta sends a GET request to your webhook URL with a hub.challenge token when you first configure it in Business Manager. You verify the token matches your secret and echo the challenge back. The catch: this must happen within seconds of clicking Save, so your endpoint must be publicly reachable and live before you open Business Manager.',
      },
      {
        type: 'code',
        lang: 'php',
        text: `Route::get('/webhook', function (Request $request) {
    $mode      = $request->query('hub_mode');
    $token     = $request->query('hub_verify_token');
    $challenge = $request->query('hub_challenge');

    if ($mode === 'subscribe' && $token === config('whatsapp.verify_token')) {
        return response($challenge, 200);
    }
    return response('Forbidden', 403);
});`,
      },
      {
        type: 'h2',
        text: 'Handling Incoming Events',
      },
      {
        type: 'p',
        text: 'POST events arrive as a deeply nested JSON structure. Always validate that entry[0].changes[0].value exists before traversing it. Meta sends both inbound messages and delivery status updates (sent, delivered, read, failed) through the same webhook endpoint, so your handler must branch on the event type before processing.',
      },
      {
        type: 'h2',
        text: 'Template Messages and Approval',
      },
      {
        type: 'p',
        text: "Template messages are the only way to initiate a conversation outside a 24-hour customer service window. Templates must be pre-approved by Meta — usually minutes for simple text, up to 24 hours for media templates. Keep templates generic enough to reuse across campaigns; every rejected template costs review time and may affect your quality rating.",
      },
      {
        type: 'h2',
        text: 'Rate Limits and Quality Rating',
      },
      {
        type: 'p',
        text: "Rate limits are per-phone-number, not per-account. A Tier 1 number starts at 1,000 business-initiated conversations per 24 hours and scales with usage and quality rating. The quality rating is the silent killer: too many user blocks or reports and your tier drops — sometimes mid-campaign. I query it via the Graph API daily in production and alert on any downgrade.",
      },
      {
        type: 'h2',
        text: 'Tracking Delivery Status',
      },
      {
        type: 'p',
        text: "Webhooks deliver status events asynchronously and occasionally out of order. I store each outbound message with a UUID, update status on each webhook event, and treat 'read' as the final positive state. For broadcasts I aggregate these into per-campaign delivery dashboards — open rate, failed rate, block rate — that the client team can query without touching the API.",
      },
      {
        type: 'callout',
        text: "The Meta dashboard Quality Rating widget is updated with a 48-hour lag. Build your own real-time monitor against the Graph API — by the time the dashboard shows a drop, you may have already burned through your send quota.",
      },
    ],
  },
  {
    id: '03',
    date: 'Jan 2025',
    readTime: '5 min read',
    tag: 'Backend',
    title: 'REST API Design Patterns I Actually Use',
    excerpt: "Token auth, versioning, RBAC middleware, consistent error envelopes, and pagination — the patterns that appear in every API I ship and why I've converged on them.",
    body: [
      {
        type: 'lead',
        text: "I've shipped APIs for booking platforms, SaaS dashboards, WhatsApp automation, and ERP portals. After maintaining them under real traffic, certain patterns stick and others get refactored out. Here's what survives.",
      },
      {
        type: 'h2',
        text: 'Consistent Error Envelopes',
      },
      {
        type: 'p',
        text: 'Nothing wastes more frontend time than inconsistent error shapes. Every error, from every endpoint, has the same structure: status, message, a machine-readable code, and optionally a field-level errors map for validation failures.',
      },
      {
        type: 'code',
        lang: 'json',
        text: `{
  "status": 422,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": {
    "email": ["The email has already been taken."],
    "phone": ["Invalid phone number format."]
  }
}`,
      },
      {
        type: 'h2',
        text: 'Token Auth with Refresh Rotation',
      },
      {
        type: 'p',
        text: 'Short-lived access tokens (15–60 min) with long-lived refresh tokens stored httpOnly. On each refresh, the old refresh token is rotated — invalidated and a new one issued. If the old token is presented again, that signals a replay attack; I invalidate the entire token family for that user immediately.',
      },
      {
        type: 'h2',
        text: 'RBAC at the Middleware Layer',
      },
      {
        type: 'p',
        text: 'Role-based access control belongs in middleware, not scattered across controller methods. I define permissions as dot-notation strings (posts.create, reports.export) and check them in a Permission middleware. Controllers never ask "can this user do this?" — that question is answered before the request arrives.',
      },
      {
        type: 'code',
        lang: 'php',
        text: `Route::middleware(['auth:api', 'permission:posts.create'])
    ->post('/posts', [PostController::class, 'store']);

Route::middleware(['auth:api', 'permission:reports.export'])
    ->get('/reports/export', [ReportController::class, 'export']);`,
      },
      {
        type: 'h2',
        text: 'Cursor Pagination over Offset',
      },
      {
        type: 'p',
        text: 'Offset pagination breaks on large datasets — LIMIT 20 OFFSET 10000 does a full index scan to the offset point. For high-volume endpoints I use cursor pagination (keyset) based on the last seen ID. The cursor is an opaque base64 string to the client and decoded server-side. This gives consistent performance regardless of page depth.',
      },
      {
        type: 'h2',
        text: 'URL Versioning',
      },
      {
        type: 'p',
        text: 'I version via URL prefix (/api/v1/, /api/v2/) rather than Accept headers. Headers are cleaner in theory but harder to test in a browser, harder to cache via CDN, and invisible in logs. I never break a published version — I add to it or cut a new one. The old version stays live until traffic drops to zero.',
      },
      {
        type: 'callout',
        text: "The pattern I've removed: response wrapping everything in a data key. It felt RESTful but made simple endpoints verbose. A 200 with a flat object body is fine; add the envelope only when the response genuinely has metadata alongside the payload.",
      },
    ],
  },
]
