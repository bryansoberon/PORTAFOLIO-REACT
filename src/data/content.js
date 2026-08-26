/* Contenido del portafolio. Fuente única de verdad — editar aquí, no en los componentes. */

export const translations = {
  en: {
    nav: {
      home: "Home", projects: "Projects", experience: "Experience", education: "Education",
      certifications: "Certifications", stack: "Stack", contact: "Contact",
    },
    header: { available: "Available", role: "Full-Stack Dev" },
    home: {
      greeting: "Hi, I'm",
      subtitle: "Bachelor's degree in Systems Engineering",
      paragraph: "Web development (Front/Back), data analysis and project management with an agile approach.",
      tagline: ["SOPHISTICATED", "ENVIRONMENT"],
      contact: "Contact",
      stats: { projects: "Projects", stacks: "Stacks" },
    },
    projects: {
      headingPrefix: "Featured",
      headingAccent: "Projects",
      viewProject: "View Live Project",
      items: [
        {
          title: "Mailof Peluches - E-commerce",
          desc: "Hybrid Full-Stack ecosystem. High-performance store in Next.js with a separate Admin Panel in Vue 3 for dynamic inventory management.",
          type: "Full-Stack Project",
        },
        {
          title: "ERP Logístico - Fleet & Dashboards",
          desc: "Development of the core fleet and driver management under DDD architecture. Creation of reactive dashboards for real-time operational control.",
          type: "Backend & Architecture",
        },
      ],
    },
    education: {
      headingPrefix: "Education",
      headingAccent: "Timeline",
      items: [
        { year: "2017 – 2019", title: "High School", desc: "IEP Sagrado Divino Maestro - Secondary 3rd to 5th grade" },
        { year: "2021 – 2025", title: "University", desc: "Universidad Señor de Sipán - Systems Engineering. Focus on software development, architecture, analytics and project management." },
      ],
    },
    experience: {
      headingPrefix: "Work",
      headingAccent: "Experience",
      items: [
        {
          year: "Sep 2025 – Dec 2025",
          title: "Pre-professional Intern · Carlos Gabriel Transportes",
          desc: "Implementation of web solutions, automation and business process improvements for fleet management.",
        },
        {
          year: "Jun 2026 – Present",
          title: "Professional Intern · Epsel",
          desc: "Professional internship at Epsel's South Zonal Commercial Office: management and validation of data in administrative systems, digitization and case-file entry, and handling of financial records and current accounts. Built SGD, an internal document management system in Django and PostgreSQL for registering and searching the office's digitised case files.",
        },
      ],
    },
    certifications: {
      headingPrefix: "Licenses &",
      headingAccent: "Certifications",
      subtitle: "Courses and credentials completed on LinkedIn Learning and partner institutions — verifiable and downloadable as PDF.",
      downloadPdf: "Download PDF",
      verify: "Verify credential",
      expLabel: "Exp.",
      items: [
        {
          title: "Python for Data Science, AI & Development",
          issued: "Jul 2026",
          skills: ["Python", "Data Science", "Artificial Intelligence", "IBM"],
          desc: "Certificate issued by IBM and authorized through Coursera, covering Python programming fundamentals applied to data science, artificial intelligence, and development.",
        },
        {
          title: "English – Intermediate Level",
          issued: "Jun 2026",
          skills: ["English"],
          desc: "Certificate issued by the Language Center of Universidad Señor de Sipán, certifying successful completion of the Intermediate English Level (312 academic hours).",
        },
        {
          title: "Project Management Fundamentals under the Scrum Approach + AI",
          issued: "Jan 2026",
          expires: "Feb 2026",
          skills: ["Scrum", "Agile Methodologies"],
          desc: "Certificate issued by the IT Office of Universidad Nacional de Ingeniería (UNI). 18-hour course on the practical application of agile methodologies and the integration of AI tools in Scrum project management.",
        },
        {
          title: "Project Management with Jira",
          issued: "Jun 2026",
          skills: ["JIRA", "Project Management"],
          desc: "PMI-endorsed certification on agile project administration with Jira — from project setup to custom Kanban boards and real-time monitoring dashboards.",
        },
        {
          title: "Azure: Introduction to the Microsoft Cloud",
          issued: "Jun 2026",
          skills: ["Microsoft Azure", "Cloud Computing (IaaS)"],
          desc: "Course covering Microsoft Azure cloud computing fundamentals: infrastructure, storage, serverless services and artificial intelligence.",
        },
      ],
    },
    stack: {
      badge: "Stack",
      heading: "Technologies I Use",
      subtitle: "Tools and technologies I use to develop modern, scalable and well-structured web applications.",
      categories: ["Frontend", "Backend", "Databases", "Tools"],
    },
    contact: {
      headingPrefix: "Contact Me",
      headingAccent: "Now",
      role: "Systems Engineer • Full-Stack",
      githubBtn: "Go to my GitHub",
      form: {
        name: "Full name",
        email: "Email address",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        placeholder: "Tell me what you need...",
        send: "Send",
        sending: "Sending...",
        sent: "Sent ✅",
        sentMsg: "Your message was sent successfully ✅",
        errFill: "Please fill in: name, email, and message.",
        errEmail: "Enter a valid email address.",
        errSend: "Could not send. Please try again in 1 minute.",
      },
    },
    footer: { rights: "All rights reserved." },
  },
  es: {
    nav: {
      home: "Inicio", projects: "Proyectos", experience: "Experiencia", education: "Educación",
      certifications: "Certificaciones", stack: "Stack", contact: "Contacto",
    },
    header: { available: "Disponible", role: "Desarrollador Full-Stack" },
    home: {
      greeting: "Hola, soy",
      subtitle: "Bachiller en Ingeniería de Sistemas",
      paragraph: "Desarrollo web (Front/Back), análisis de datos y gestión de proyectos con un enfoque ágil.",
      tagline: ["ENTORNO", "SOFISTICADO"],
      contact: "Contacto",
      stats: { projects: "Proyectos", stacks: "Stacks" },
    },
    projects: {
      headingPrefix: "Proyectos",
      headingAccent: "Destacados",
      viewProject: "Ver Proyecto en Vivo",
      items: [
        {
          title: "Mailof Peluches - E-commerce",
          desc: "Ecosistema Full-Stack híbrido. Tienda de alto rendimiento en Next.js con un Panel de Administración independiente en Vue 3 para la gestión dinámica de inventario.",
          type: "Proyecto Full-Stack",
        },
        {
          title: "ERP Logístico - Fleet & Dashboards",
          desc: "Desarrollo del núcleo de gestión de flota y choferes bajo arquitectura DDD. Creación de dashboards reactivos para el control operativo en tiempo real.",
          type: "Backend y Arquitectura",
        },
      ],
    },
    education: {
      headingPrefix: "Educación",
      headingAccent: "Cronología",
      items: [
        { year: "2017 – 2019", title: "Secundaria", desc: "IEP Sagrado Divino Maestro" },
        { year: "2021 – 2025", title: "Universidad", desc: "Universidad Señor de Sipán - Ingeniería de Sistemas. Enfoque en desarrollo de software, arquitectura, analítica y gestión de proyectos." },
      ],
    },
    experience: {
      headingPrefix: "Experiencia",
      headingAccent: "Laboral",
      items: [
        {
          year: "Set. 2025 – Dic. 2025",
          title: "Practicante Pre-profesional · Carlos Gabriel Transportes",
          desc: "Implementación de soluciones web, automatización y mejora de procesos de negocio para la gestión de flota.",
        },
        {
          year: "Jun. 2026 – Actualidad",
          title: "Practicante Profesional · Epsel",
          desc: "Práctica profesional en la Oficina Comercial Zonal Sur de Epsel: gestión y validación de datos en sistemas administrativos, digitalización e ingreso de expedientes, y manejo de registros financieros y cuentas corrientes. Desarrollo del SGD, un sistema de gestión documental interno en Django y PostgreSQL para registrar y consultar los expedientes digitalizados de la zonal.",
        },
      ],
    },
    certifications: {
      headingPrefix: "Licencias y",
      headingAccent: "Certificaciones",
      subtitle: "Cursos y credenciales completados en LinkedIn Learning e instituciones asociadas — verificables y descargables en PDF.",
      downloadPdf: "Descargar PDF",
      verify: "Ver credencial",
      expLabel: "Venc.",
      items: [
        {
          title: "Python for Data Science, AI & Development",
          issued: "jul. 2026",
          skills: ["Python", "Data Science", "Inteligencia Artificial", "IBM"],
          desc: "Certificado emitido por IBM y autorizado a través de Coursera, que cubre los fundamentos de la programación en Python aplicados a la ciencia de datos, inteligencia artificial y desarrollo.",
        },
        {
          title: "Inglés – Nivel Intermedio",
          issued: "jun. 2026",
          skills: ["Inglés"],
          desc: "Certificado emitido por el Centro de Idiomas de la Universidad Señor de Sipán que acredita la culminación satisfactoria del Nivel Intermedio del idioma inglés, sumando un total de 312 horas académicas.",
        },
        {
          title: "Fundamentos de Gestión de Proyectos bajo el enfoque Scrum + IA",
          issued: "ene. 2026",
          expires: "feb. 2026",
          skills: ["Scrum", "Metodologías ágiles"],
          desc: "Certificado emitido por la Oficina de Tecnologías de la Información de la Universidad Nacional de Ingeniería (UNI). El curso de 18 horas abarcó la aplicación práctica de metodologías ágiles y la integración de herramientas de Inteligencia Artificial en la gestión de proyectos con Scrum.",
        },
        {
          title: "Gestión de proyectos con Jira",
          issued: "jun. 2026",
          skills: ["JIRA", "Gestión de proyectos"],
          desc: "Certificación avalada por el PMI sobre la administración ágil de proyectos con Jira. Abarca desde la configuración de proyectos hasta la creación de tableros Kanban personalizados y cuadros de mando para el monitoreo en tiempo real.",
        },
        {
          title: "Azure: Introducción a la nube de Microsoft",
          issued: "jun. 2026",
          skills: ["Microsoft Azure", "Cloud Computing (IaaS)"],
          desc: "Curso completado en LinkedIn Learning sobre los fundamentos de la computación en la nube con Microsoft Azure, abarcando infraestructura, almacenamiento, servicios serverless e inteligencia artificial.",
        },
      ],
    },
    stack: {
      badge: "Stack",
      heading: "Tecnologías que Uso",
      subtitle: "Herramientas y tecnologías que uso para desarrollar aplicaciones web modernas, escalables y bien estructuradas.",
      categories: ["Frontend", "Backend", "Bases de Datos", "Herramientas"],
    },
    contact: {
      headingPrefix: "Contáctame",
      headingAccent: "Ahora",
      role: "Ingeniero de Sistemas • Full-Stack",
      githubBtn: "Ir a mi GitHub",
      form: {
        name: "Nombre completo",
        email: "Correo electrónico",
        phone: "Teléfono",
        subject: "Asunto",
        message: "Mensaje",
        placeholder: "Cuéntame qué necesitas...",
        send: "Enviar",
        sending: "Enviando...",
        sent: "Enviado ✅",
        sentMsg: "Tu mensaje fue enviado con éxito ✅",
        errFill: "Por favor completa: nombre, correo y mensaje.",
        errEmail: "Ingresa un correo electrónico válido.",
        errSend: "No se pudo enviar. Intenta de nuevo en 1 minuto.",
      },
    },
    footer: { rights: "Todos los derechos reservados." },
  },
};

export const projectsBase = [
  { tags: ["Next.js", "React", "Vue 3", "Prisma", "PostgreSQL", "Vercel", "neon"], link: "https://mailofcix.shop/" },
  { tags: ["Laravel 12", "Livewire Volt", "DDD", "MySQL", "PHP 8.2"], link: "https://github.com/bryansoberon" },
];

export const certificationsBase = [
  {
    issuer: "IBM (Coursera)",
    credentialId: "TV4D2T7L7BPJ",
    pdf: "Coursera TV4D2T7L7BPJ.pdf",
    downloadName: "Bryan-Soberon-Certificado-Python-Data-Science-AI-IBM-Coursera.pdf",
    verifyUrl: "https://coursera.org/verify/TV4D2T7L7BPJ",
  },
  {
    issuer: "USS – Universidad Señor de Sipán",
    credentialId: null,
    pdf: "Certificado_Ingles_USS.pdf",
    downloadName: "Bryan-Soberon-Certificado-Ingles-Intermedio-USS.pdf",
    verifyUrl: null,
  },
  {
    issuer: "Universidad Nacional de Ingeniería (UNI)",
    credentialId: "018 - 0007110",
    pdf: "Fundamentos de Gestión de Proyectos con Scrum e IA-UNI.pdf",
    downloadName: "Bryan-Soberon-Certificado-Scrum-IA-UNI.pdf",
    verifyUrl: null,
  },
  {
    issuer: "LinkedIn Learning",
    credentialId: "172b884866a90e8d96652fe6301e55a5ccdc2ac42da8f4a33323d0a8aaebf9f1",
    pdf: "CertificadoDeFinalizacion_Gestion de proyectos con Jira.pdf",
    downloadName: "Bryan-Soberon-Certificado-Jira-LinkedIn.pdf",
    verifyUrl: "https://lnkd.in/d--4q_2j",
  },
  {
    issuer: "LinkedIn Learning",
    credentialId: "b8289c4d1f473b60185712ff16d50a9c8ca289e12d20844e57fa2a9c3cf797a1",
    pdf: "CertificadoDeFinalizacion_Azure Introduccion a la nube de Microsoft.pdf",
    downloadName: "Bryan-Soberon-Certificado-Azure-LinkedIn.pdf",
    verifyUrl: "https://lnkd.in/dywjfd8d",
  },
];

export const stackCategoriesBase = [
  { techs: ["Vue.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap"] },
  { techs: ["Django", "Next.js", "Laravel", "Spring Boot"] },
  { techs: ["PostgreSQL", "MySQL", "PgAdmin", "MongoDB", "SQL Server", "SQLite"] },
  { techs: ["Git", "GitHub", "VS Code", "Docker", "Insomnia", "Scrum", "Jira", "Microsoft Azure"] },
];

/* ── Perfil y enlaces ──────────────────────────────── */
export const profile = {
  name: "Bryan Soberón",
  first: "Bryan",
  last: "Soberón",
  email: "bryansoberonq@gmail.com",
  phone: "+51 933 698 031",
  location: "Chiclayo, Perú",
};

export const links = {
  linkedin:  "https://www.linkedin.com/in/bernabe-bryan-sober%C3%B3n-quintana-195437307/",
  github:    "https://github.com/bryansoberon",
  instagram: "https://www.instagram.com/bryansoberon/",
  twitter:   "https://x.com/bryandev333",
  facebook:  "https://www.facebook.com/bernabesoberon",
};


/* Fotogramas del retrato — se generan desde public/hero. */
export const heroFrames = [1, 2, 3, 4, 5].map(
  (n) => `${import.meta.env.BASE_URL}hero/f${n}.webp`
);

/* Fondo de cada fotograma, para que el ciclo también cambie de ambiente. */
export const heroFrameBg = [
  "linear-gradient(180deg, #ffe3ec 0%, #ffd9c2 55%, #f6efe6 100%)",
  "linear-gradient(180deg, #ffd7e6 0%, #f6d5ff 60%, #efe6f6 100%)",
  "linear-gradient(180deg, #dff5e4 0%, #c9ecd8 55%, #eaf4ec 100%)",
  "linear-gradient(180deg, #e8e8e8 0%, #d5d5d5 55%, #efefef 100%)",
  "linear-gradient(180deg, #ffe6cc 0%, #ffd2a8 55%, #f7ece0 100%)",
];

/* Índice de secciones. */
export const sections = [
  { id: "index",          n: "01" },
  { id: "about",          n: "02" },
  { id: "projects",       n: "03" },
  { id: "experience",     n: "04" },
  { id: "education",      n: "05" },
  { id: "certifications", n: "06" },
  { id: "contact",        n: "07" },
];

/* Textos del nuevo layout. */
export const ui = {
  en: {
    availability: "Available for work",
    indexLabel: "Index",
    tagline: "Code x Data x Systems",
    sectionNames: {
      index: "Intro", about: "About", projects: "Selected work",
      experience: "Experience", education: "Education",
      certifications: "Credentials", contact: "Contact",
    },
    heroBlurb:
      "Bryan is a systems engineer & full-stack developer building web products end to end — from the data model to the interface people actually touch.",
    heroStats: [
      { n: "10+", label: "Projects\nshipped" },
      { n: "4+",  label: "Stacks in\nproduction" },
      { n: "5",   label: "Verified\ncredentials" },
    ],
    aboutLabel: "/about",
    aboutStatement:
      "I hold a bachelor's degree in Systems Engineering and I work across the whole stack — building web applications, modelling and analysing data, and running delivery with an agile approach. I like problems where architecture, data and interface all have to agree.",
    dialsLabel: "Where I work",
    weapons: "Weapons of choice:",
    dialCopy: {
      Frontend: "Interfaces that stay fast and legible as they grow. I build with component-driven architectures, typed contracts and design systems that survive more than one sprint.",
      Backend: "The part nobody sees and everybody depends on. Domain modelling, REST APIs, authentication and business rules under layered and DDD architectures.",
      Databases: "Schema design, normalisation, query tuning and migrations. I treat the data model as the real product — the rest is an interface on top of it.",
      Tools: "Version control, containers, agile boards and cloud fundamentals. The scaffolding that turns individual work into something a team can actually ship.",
    },
    scroll: "Scroll",
    liveSite: "Website",
    contactLabel: "/new_project",
    contactBig: "Let's build something special",
    revealEmail: "Reveal\nemail address",
    backTop: "Back to top",
  },
  es: {
    availability: "Disponible para trabajar",
    indexLabel: "Índice",
    tagline: "Código x Datos x Sistemas",
    sectionNames: {
      index: "Intro", about: "Sobre mí", projects: "Trabajo seleccionado",
      experience: "Experiencia", education: "Educación",
      certifications: "Credenciales", contact: "Contacto",
    },
    heroBlurb:
      "Bryan es ingeniero de sistemas y desarrollador full-stack: construye productos web de punta a punta, desde el modelo de datos hasta la interfaz que la gente realmente usa.",
    heroStats: [
      { n: "10+", label: "Proyectos\nentregados" },
      { n: "4+",  label: "Stacks en\nproducción" },
      { n: "5",   label: "Credenciales\nverificadas" },
    ],
    aboutLabel: "/sobre-mi",
    aboutStatement:
      "Soy bachiller en Ingeniería de Sistemas y trabajo en todo el stack: construyo aplicaciones web, modelo y analizo datos, y gestiono la entrega con enfoque ágil. Me interesan los problemas donde la arquitectura, los datos y la interfaz tienen que ponerse de acuerdo.",
    dialsLabel: "Dónde trabajo",
    weapons: "Herramientas:",
    dialCopy: {
      Frontend: "Interfaces que siguen siendo rápidas y legibles a medida que crecen. Construyo con arquitecturas por componentes, contratos tipados y sistemas de diseño que sobreviven a más de un sprint.",
      Backend: "La parte que nadie ve y de la que todos dependen. Modelado de dominio, APIs REST, autenticación y reglas de negocio bajo arquitecturas en capas y DDD.",
      "Bases de Datos": "Diseño de esquemas, normalización, optimización de consultas y migraciones. Trato el modelo de datos como el producto real; lo demás es una interfaz encima.",
      Herramientas: "Control de versiones, contenedores, tableros ágiles y fundamentos de nube. El andamiaje que convierte el trabajo individual en algo que un equipo puede entregar.",
    },
    scroll: "Desliza",
    liveSite: "Ver sitio",
    contactLabel: "/nuevo-proyecto",
    contactBig: "Construyamos algo especial",
    revealEmail: "Mostrar\ncorreo",
    backTop: "Volver arriba",
  },
};
