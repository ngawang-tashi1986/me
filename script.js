// ---------------------------
// Mobile nav toggle
// ---------------------------
const header = document.querySelector('.nav');
const hamburger = document.getElementById('hamburger');
const mobilePanel = document.getElementById('mobilePanel');

function setMobile(open){
  header.classList.toggle('nav-open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  mobilePanel.hidden = !open;
}

hamburger?.addEventListener('click', () => {
  const open = !header.classList.contains('nav-open');
  setMobile(open);
});

// Close mobile nav after tapping a link
document.querySelectorAll('a[data-link]').forEach(a => {
  a.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 720px)').matches) setMobile(false);
  });
});

// ---------------------------
// Scroll reveal animations
// ---------------------------
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach(el => {
  // Hero starts visible; the rest will reveal on scroll
  if (!el.closest('.hero')) revealObserver.observe(el);
});

// ---------------------------
// Skill bar animation on scroll
// ---------------------------
const skillsSection = document.getElementById('skills');
const skillBlocks = document.querySelectorAll('[data-skill]');

function setSkillBars(active){
  skillBlocks.forEach(block => {
    const fill = block.querySelector('.fill');
    const bar = block.querySelector('.bar');
    if (!fill || !bar) return;

    const level = fill.getAttribute('data-level') || '0';
    fill.style.width = active ? `${level}%` : '0%';
    bar.setAttribute('aria-valuenow', active ? level : '0');
  });
}

if (skillsSection) {
  const skillSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      setSkillBars(entry.isIntersecting);
    });
  }, { threshold: 0.35 });

  skillSectionObserver.observe(skillsSection);
}

// ---------------------------
// Active nav link highlighting
// ---------------------------
const navLinks = document.querySelectorAll('a[data-link]');
const sections = Array.from(navLinks)
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = `#${entry.target.id}`;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

sections.forEach(s => sectionObserver.observe(s));

// ---------------------------
// Subtle hero parallax effect
// ---------------------------
const hero = document.querySelector('.hero');
let ticking = false;

function onScroll(){
  if (!hero) return;
  if (ticking) return;
  ticking = true;

  window.requestAnimationFrame(() => {
    const y = window.scrollY || 0;
    // Keep it subtle
    const parallax = Math.min(20, y * 0.04);
    hero.style.setProperty('--parallax', `${parallax}px`);
    ticking = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------------------------
// Contact form (front-end only)
// ---------------------------
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = (fd.get('name') || '').toString().trim();

  statusEl.textContent = `Thanks${name ? `, ${name}` : ''}! Your message is ready to send. (This form is demo-only.)`;
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Back to top (robust scroll)
const backToTop = document.getElementById('backToTop');
backToTop?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------------------------
// Project modal (animated from card)
// ---------------------------
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('projectModalTitle');
const modalDesc = document.getElementById('projectModalDesc');
const modalScope = document.getElementById('projectModalScope');
const modalResponsibilities = document.getElementById('projectModalResponsibilities');
const modalTags = document.getElementById('projectModalTags');
const modalModules = document.getElementById('projectModalModules');
const modalModuleList = document.getElementById('projectModalModuleList');
const modalDialog = modal?.querySelector('.project-modal__dialog');
const modalClosers = modal?.querySelectorAll('[data-modal-close]') || [];
const projectCards = document.querySelectorAll('[data-project-id]');

const projectData = {
  integration: {
    title: 'Integration Solution (Project Management)',
    description: 'A centralized project management solution for NPPF that streamlined planning, execution, and monitoring across five integrated systems.',
    scope: [
      'Investment Management System (mFund)',
      'Accounting System (Orion)',
      'HRMS System',
      'Banking Solution (Kastle)',
      'Pension & Provident Fund System (Premia)'
    ],
    responsibilities: [
      'Vendor coordination and alignment meetings',
      'Data correction, migration, and validation planning',
      'Environment setup on Linux and Windows servers',
      'User training and adoption enablement',
      'API integration with major banks'
    ],
    tags: ['Project Management', 'System Integration', 'Linux', 'Windows', 'API Integration', 'Training']
  },
  erp: {
    title: 'In-house ERP Development',
    description: 'Design and development of multiple modules within NPPF’s in-house ERP platform (ERPPF), focused on strengthening financial operations, pension administration, and lending workflows. The system improved accuracy, reduced manual processing, and increased transparency through automation, audit-ready tracking, and integrated reporting across modules.',
    scope: [
      'Automation and audit-ready tracking',
      'Integrated reporting across modules',
      'Financial operations, pension administration, and lending workflows'
    ],
    modules: [
      {
        title: 'Pension Payment System',
        bullets: [
          'Built features to manage pensioner records, benefit calculations, and periodic pension disbursements',
          'Automated key payment processes to ensure timely, accurate payouts with consistent tracking and reporting',
          'Supported operational transparency and reliability for long-term pension administration'
        ]
      },
      {
        title: 'Cheque Management System',
        bullets: [
          'Developed a specialized module to automate cheque creation, issuance tracking, and reconciliation',
          'Improved end-to-end cheque workflows by reducing manual steps and minimizing errors',
          'Integrated cheque processing with other financial workflows to strengthen accountability and reporting'
        ]
      },
      {
        title: 'Business Activity Monitoring (Loan Appraisal)',
        bullets: [
          'Designed and developed the full solution (application + database) to manage and monitor the loan appraisal lifecycle',
          'Automated loan application evaluation workflows, status tracking, and policy compliance checks',
          'Delivered real-time visibility into appraisal progress and performance metrics for better decision-making',
          'Conducted full testing and produced final system documentation for handover and long-term maintenance'
        ]
      },
      {
        title: 'Budget Management System',
        bullets: [
          'Implemented a budgeting solution to support budget preparation, consolidation, approval workflows, and expense monitoring',
          'Enabled real-time oversight of budget utilization through structured reporting and controlled approval flows'
        ]
      },
      {
        title: 'Fund Management System',
        bullets: [
          'Developed a comprehensive module to support fund allocation, investment tracking, approvals, and portfolio reporting',
          'Enabled real-time portfolio monitoring and compliance-focused workflows',
          'Built the module to integrate cleanly with other ERP components while maintaining strong security and scalability'
        ]
      },
      {
        title: 'Lotedh Scheme (Optional Group Insurance)',
        bullets: [
          'Supported the delivery of an optional group insurance scheme module for pensioners',
          'Helped structure and automate scheme-related processes within the ERP environment to ensure consistency and easy administration'
        ]
      }
    ],
    responsibilities: [
      'Automated pension benefit calculations and disbursement tracking',
      'Built cheque creation, issuance, and reconciliation workflows',
      'Developed loan appraisal lifecycle tracking with compliance checks',
      'Implemented budget preparation, approvals, and utilization monitoring',
      'Delivered fund allocation, investment tracking, and portfolio reporting',
      'Tested modules and produced final system documentation'
    ],
    tags: ['Project Management', 'Systems Design', 'AngularJS', 'C# in .NET', '.NET Framework', 'MsSQL', 'API', 'IIS']
  },
  asset: {
    title: 'Government Asset Inventory System',
    description: 'A centralized digital platform that tracks, manages, and optimizes government assets with real-time updates, accurate records, and efficient allocation and maintenance to improve accountability and transparency across agencies.',
    scope: ['Centralized asset inventory', 'Real-time updates and reconciliation', 'Maintenance planning', 'Agency allocation visibility'],
    responsibilities: ['System design and development', 'API integration', 'Jasper reporting setup'],
    tags: ['Systems Design', 'System Development', 'API', 'Java', 'Jasper Reporting']
  },
  inclusion: {
    title: 'Financial Inclusion Reporting System',
    description: 'A reporting system for the Royal Monetary Authority of Bhutan that generates required reports from provided data in HTML, PDF, and Excel, with user/role management and raw text data upload for report generation.',
    scope: ['Multi-format report generation (HTML, PDF, Excel)', 'User and role management', 'Raw text data processing and uploads'],
    responsibilities: ['Conducted System Requirements Study (SRS)', 'Designed and developed the full system and database', 'Prepared and delivered final documentation'],
    tags: ['Project Management', 'Jasper Reports', 'JSP', 'Systems Design', 'Java Web Services', 'System Development', 'MySQL']
  },
  'student-loan': {
    title: 'Student Loan Scheme System',
    description: 'A system for the Department of Adult and Higher Education (DAHE) in Bhutan that automates student loan applications, eligibility assessment, and fund management with transparent loan tracking and communication.',
    scope: ['Application submission automation', 'Eligibility assessment workflows', 'Loan tracking and communications'],
    responsibilities: ['System design and development', 'Workflow automation', 'Integration and reporting'],
    tags: ['Systems Design', 'Tomcat', 'Java Web Services', 'Spring MVC', 'JBoss', 'System Development', 'API', 'MySQL']
  },
  eg2c: {
    title: 'EG2C Service Delivery System',
    description: 'Delivered multiple modules under Bhutan’s EG2C Service Delivery System (Government-to-Citizen) to digitize services with online applications, automated workflows, real-time status tracking, secure records, and structured reporting.',
    scope: [
      'Citizen-facing services digitized across agencies',
      'Automated workflows with real-time status tracking',
      'Secure records management and structured reporting'
    ],
    modules: [
      {
        title: 'Automation of CDB Services (Construction Development Board)',
        bullets: [
          'Digitized architect and contractor registration, licensing, and related workflows',
          'Implemented back-office processing with structured approvals and reliable records',
          'Enabled real-time access to licensing data for transparency and efficiency',
          'Delivered full system/database design, testing, and documentation'
        ]
      },
      {
        title: 'Automation of BCSEA Services (Bhutan Council for School Examinations and Assessments)',
        bullets: [
          'Automated result publication, recheck requests, and online applications',
          'Centralized data and workflow controls to reduce errors and speed delivery',
          'Completed system development, database implementation, and documentation'
        ]
      },
      {
        title: 'Passport System (Department of Protocol)',
        bullets: [
          'Implemented digital workflow for diplomatic, official, and ordinary categories',
          'Supported operational continuity through change management practices',
          'Redesigned and optimized system-generated reports',
          'Strengthened secure document handling and status tracking'
        ]
      },
      {
        title: 'Trade License System (Department of Trade)',
        bullets: [
          'Built licensing platform for applications, processing, and issuance',
          'Implemented automated routing, secure data handling, and status updates',
          'Delivered full-cycle development and final documentation',
          'Improved service accessibility and processing speed'
        ]
      }
    ],
    responsibilities: [
      'Full system and database design, testing, and documentation',
      'Back-office processing with structured approvals',
      'Report redesign and optimization for management reporting',
      'Secure data handling and status tracking'
    ],
    tags: ['Systems Design', 'System Development', 'API', 'JSP', 'Struts', 'Spring MVC', 'JavaScript', 'AJAX', 'J2EE', 'SOAP', 'MySQL', 'Tomcat', 'JBoss', 'CentOS']
  }
};

let lastTrigger = null;

function setModalContent(data){
  if (!data) return;
  modalTitle.textContent = data.title || '';
  modalDesc.textContent = data.description || '';

  modalScope.innerHTML = '';
  (data.scope || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    modalScope.appendChild(li);
  });

  modalResponsibilities.innerHTML = '';
  (data.responsibilities || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    modalResponsibilities.appendChild(li);
  });

  modalTags.innerHTML = '';
  (data.tags || []).forEach(tag => {
    const chip = document.createElement('span');
    chip.textContent = tag;
    modalTags.appendChild(chip);
  });

  if (modalModules && modalModuleList) {
    modalModuleList.innerHTML = '';
    const modules = data.modules || [];
    if (modules.length) {
      modalModules.hidden = false;
      modules.forEach(module => {
        const wrap = document.createElement('div');
        wrap.className = 'project-modal__module';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'project-modal__module-btn';
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = `${module.title || ''}<span aria-hidden="true">+</span>`;
        wrap.appendChild(button);

        const content = document.createElement('div');
        content.className = 'project-modal__module-content';
        const list = document.createElement('ul');
        (module.bullets || []).forEach(bullet => {
          const li = document.createElement('li');
          li.textContent = bullet;
          list.appendChild(li);
        });
        content.appendChild(list);
        wrap.appendChild(content);

        button.addEventListener('click', () => {
          const isOpen = wrap.classList.toggle('is-open');
          button.setAttribute('aria-expanded', String(isOpen));
        });
        modalModuleList.appendChild(wrap);
      });
    } else {
      modalModules.hidden = true;
    }
  }
}

function openModal(trigger){
  if (!modal || !modalDialog) return;
  const id = trigger.getAttribute('data-project-id');
  const data = projectData[id];
  setModalContent(data);

  lastTrigger = trigger;
  document.body.style.overflow = 'hidden';

  const triggerRect = trigger.getBoundingClientRect();
  const modalRect = modalDialog.getBoundingClientRect();
  const dx = triggerRect.left + triggerRect.width / 2 - (modalRect.left + modalRect.width / 2);
  const dy = triggerRect.top + triggerRect.height / 2 - (modalRect.top + modalRect.height / 2);
  const scaleX = Math.max(0.72, triggerRect.width / modalRect.width);
  const scaleY = Math.max(0.72, triggerRect.height / modalRect.height);

  modalDialog.style.setProperty('--offset-x', `${dx}px`);
  modalDialog.style.setProperty('--offset-y', `${dy}px`);
  modalDialog.style.setProperty('--scale-x', scaleX.toFixed(3));
  modalDialog.style.setProperty('--scale-y', scaleY.toFixed(3));
  modalDialog.style.setProperty('--origin-x', `${triggerRect.left + triggerRect.width / 2}px`);
  modalDialog.style.setProperty('--origin-y', `${triggerRect.top + triggerRect.height / 2}px`);
  modal.style.setProperty('--origin-x', `${triggerRect.left + triggerRect.width / 2}px`);
  modal.style.setProperty('--origin-y', `${triggerRect.top + triggerRect.height / 2}px`);

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  // Trigger transition to center
  requestAnimationFrame(() => {
    modalDialog.style.setProperty('--offset-x', '0px');
    modalDialog.style.setProperty('--offset-y', '0px');
    modalDialog.style.setProperty('--scale-x', '1');
    modalDialog.style.setProperty('--scale-y', '1');
  });

  const closeBtn = modal.querySelector('.project-modal__close');
  closeBtn?.focus();
}

function closeModal(){
  if (!modal || !modalDialog) return;
  if (lastTrigger) {
    const triggerRect = lastTrigger.getBoundingClientRect();
    const modalRect = modalDialog.getBoundingClientRect();
    const dx = triggerRect.left + triggerRect.width / 2 - (modalRect.left + modalRect.width / 2);
    const dy = triggerRect.top + triggerRect.height / 2 - (modalRect.top + modalRect.height / 2);
    const scaleX = Math.max(0.72, triggerRect.width / modalRect.width);
    const scaleY = Math.max(0.72, triggerRect.height / modalRect.height);

    modalDialog.style.setProperty('--offset-x', `${dx}px`);
    modalDialog.style.setProperty('--offset-y', `${dy}px`);
    modalDialog.style.setProperty('--scale-x', scaleX.toFixed(3));
    modalDialog.style.setProperty('--scale-y', scaleY.toFixed(3));
  }

  requestAnimationFrame(() => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  });
}

projectCards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(card);
    }
  });
});

modalClosers.forEach(el => {
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
    closeModal();
  }
});
