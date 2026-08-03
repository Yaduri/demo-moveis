/**
 * ATELIÊ LINHA CASA - Core Interactive Scripts
 * Pure Vanilla JavaScript implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Initial check

  // 2. Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('active');
    mobileNavBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('active');
    mobileNavBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // 3. Smooth Scroll Navigation with Active Link Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. Project Modal Lightbox Data & Logic
  const projectsData = {
    '1': {
      title: 'Cozinha Contemporânea',
      category: 'Cozinhas',
      image: 'images/env_cozinhas.jpg',
      description: 'Projeto de cozinha planejada integrada que harmoniza marcenaria em lâmina de carvalho natural com armários suspensos em acabamento grafite fosco. Solução inteligente com calha úmida, despenseiro oculta e ilha central com cooktop.',
      specs: [
        { label: 'Materiais', value: 'MDF 18mm, Lâmina Carvalho, Laca Grafite' },
        { label: 'Ferragens', value: 'Dobradiças com amortecimento pneumático' },
        { label: 'Iluminação', value: 'Perfis de LED 3000K embutidos nos nichos' },
        { label: 'Espaço', value: 'Residência Unifamiliar — 24 m²' }
      ]
    },
    '2': {
      title: 'Suíte Master & Closet',
      category: 'Quartos',
      image: 'images/env_quartos.jpg',
      description: 'Armário planejado do piso ao teto com cabeceira estofada integrada e painéis ripados laterais. Closet planejado com iluminação interna automatizada por sensor de presença e portas com perfil de alumínio slim.',
      specs: [
        { label: 'Materiais', value: 'MDF Freijó, Vidro Reflecta Bronze, Alumínio' },
        { label: 'Organização', value: 'Gaveteiros com divisórias aveludadas' },
        { label: 'Iluminação', value: 'Fita LED aquecida integrada às prateleiras' },
        { label: 'Espaço', value: 'Apartamento — 32 m²' }
      ]
    },
    '3': {
      title: 'Sala Integrada & Home Theater',
      category: 'Salas',
      image: 'images/env_salas.jpg',
      description: 'Painel para TV em marcenaria ripada com passa-cabos invisível e rack flutuante com acabamento chanfrado. Divisória estilizada em estante vazada integrando o hall de entrada à sala de estar com elegância.',
      specs: [
        { label: 'Materiais', value: 'MDF Carvalho Americano, Laca Off-White' },
        { label: 'Diferencial', value: 'Sistema de gestão de cabos e acústica' },
        { label: 'Acabamento', value: 'Bordas em fita de PVC com colagem PUR' },
        { label: 'Espaço', value: 'Cobertura — 45 m²' }
      ]
    },
    '4': {
      title: 'Executive Home Office',
      category: 'Home Office',
      image: 'images/env_homeoffice.jpg',
      description: 'Espaço de trabalho ergonomicamente desenhado para produtividade e reuniões por vídeo. Mesa suspensa em madeira nobre com tomadas embutidas e painel acústico ripado nas paredes.',
      specs: [
        { label: 'Materiais', value: 'MDF Louro Freijó, Estrutura metálica' },
        { label: 'Recursos', value: 'Calha para fiação e iluminação direta/indireta' },
        { label: 'Armazenamento', value: 'Armários superiores com abertura fecho-toque' },
        { label: 'Espaço', value: 'Estúdio — 16 m²' }
      ]
    },
    '5': {
      title: 'Banheiro Spa & Vanity',
      category: 'Banheiros',
      image: 'images/env_banheiros.jpg',
      description: 'Gabinete de banheiro suspenso com marcenaria ripada em tom de madeira e gavetas ocultas. Espelho sob medida com moldura retroiluminada criando uma atmosfera relaxante.',
      specs: [
        { label: 'Materiais', value: 'MDF Naval (resistente à umidade), Laca' },
        { label: 'Ferragens', value: 'Gavetas com corrediças invisíveis Soft-Close' },
        { label: 'Iluminação', value: 'LED difuso 2700K ao redor do espelho' },
        { label: 'Espaço', value: 'Residência — 8 m²' }
      ]
    },
    '6': {
      title: 'Recepção Corporativa',
      category: 'Espaços Comerciais',
      image: 'images/env_cozinhas.jpg', // Fallback or architectural image
      description: 'Balcão de recepção exclusivo com geometria curvilínea em marcenaria artesanal e nichos de atendimento integrados. Alinhamento perfeito com a identidade visual contemporânea da marca.',
      specs: [
        { label: 'Materiais', value: 'MDF Curvável, Lâmina Natural, Corian' },
        { label: 'Funcionalidade', value: 'Passagem interna de rede e conectividade' },
        { label: 'Acabamento', value: 'Verniz poliuretano fosco de alta resistência' },
        { label: 'Espaço', value: 'Sede Empresarial — 60 m²' }
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalImage = document.getElementById('modal-image');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalSpecsContainer = document.getElementById('modal-specs');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalTag.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;

    // Render Specs
    modalSpecsContainer.innerHTML = data.specs.map(spec => `
      <div class="modal-spec-item">
        <span class="modal-spec-label">${spec.label}</span>
        <span class="modal-spec-value">${spec.value}</span>
      </div>
    `).join('');

    // Pre-fill WhatsApp action
    const waText = encodeURIComponent(`Olá! Vi o projeto "${data.title}" no site do Ateliê Linha Casa e gostaria de um orçamento semelhante.`);
    modalWhatsappBtn.href = `https://wa.me/5511999999999?text=${waText}`;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Add click events to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // 5. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other active items (accordion behavior)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 6. Contact Form to WhatsApp Interactivity
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nome = document.getElementById('form-nome').value.trim();
      const whatsapp = document.getElementById('form-whatsapp').value.trim();
      const ambiente = document.getElementById('form-ambiente').value;
      const mensagem = document.getElementById('form-mensagem').value.trim();

      if (!nome || !whatsapp) {
        alert('Por favor, preencha seu nome e telefone/WhatsApp.');
        return;
      }

      let text = `Olá! Meu nome é ${nome}.\n`;
      text += `Gostaria de solicitar um orçamento para o ambiente: *${ambiente}*.\n`;
      if (mensagem) {
        text += `Detalhes do projeto: ${mensagem}\n`;
      }
      text += `Meu WhatsApp para contato: ${whatsapp}`;

      const waUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  }

  // 7. Scroll Reveal Animation using Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.01,
    rootMargin: '150px 0px 150px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
