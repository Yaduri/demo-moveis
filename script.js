/**
 * ATELIÊ LINHA CASA - Redesign Script
 * High-End Interior Store & Customizer Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    hamburger.classList.add('active');
    mobileNav.classList.add('active');
    mobileNavBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileNavBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active');
      if (isOpen) closeMobileNav();
      else openMobileNav();
    });
  }

  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // 2. Hero Interactive Room Thumbnail Switcher
  const heroThumbBtns = document.querySelectorAll('.hero-thumb-btn');
  const heroMainImg = document.getElementById('hero-main-img');
  const heroRoomTitle = document.getElementById('hero-room-title');
  const heroRoomDesc = document.getElementById('hero-room-desc');
  const heroRoomBadge = document.getElementById('hero-room-badge');

  heroThumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      heroThumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const img = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const badge = btn.getAttribute('data-badge');

      if (heroMainImg) heroMainImg.src = img;
      if (heroRoomTitle) heroRoomTitle.textContent = title;
      if (heroRoomDesc) heroRoomDesc.textContent = desc;
      if (heroRoomBadge) heroRoomBadge.textContent = badge;
    });
  });

  // 3. Interactive Room Customizer Widget ("Monte Seu Projeto")
  let customState = {
    comodo: 'Cozinha Planejada',
    acabamento: 'Carvalho Natural & Grafite',
    ferragem: 'Sistema Soft-Close com Amortecimento'
  };

  const setupStepButtons = (stepContainerId, stateKey) => {
    const container = document.getElementById(stepContainerId);
    if (!container) return;
    const buttons = container.querySelectorAll('.customizer-option-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('selected');
          b.querySelector('span:last-child').textContent = '';
        });
        btn.classList.add('selected');
        btn.querySelector('span:last-child').textContent = '✓';
        
        customState[stateKey] = btn.getAttribute('data-value');
        updateCustomizerSummary();
      });
    });
  };

  setupStepButtons('custom-step-1', 'comodo');
  setupStepButtons('custom-step-2', 'acabamento');
  setupStepButtons('custom-step-3', 'ferragem');

  const updateCustomizerSummary = () => {
    const titleEl = document.getElementById('custom-summary-title');
    const descEl = document.getElementById('custom-summary-desc');
    const btnEl = document.getElementById('customizer-send-btn');

    if (titleEl) titleEl.textContent = `Projeto: ${customState.comodo} em ${customState.acabamento.split('&')[0].trim()}`;
    if (descEl) descEl.textContent = `Linha: ${customState.acabamento} • Ferragens: ${customState.ferragem}`;

    const text = `Olá! Montei uma simulação no site do Ateliê Linha Casa:\n` +
                 `• Cômodo: *${customState.comodo}*\n` +
                 `• Acabamento: *${customState.acabamento}*\n` +
                 `• Ferragens: *${customState.ferragem}*\n` +
                 `Gostaria de receber uma estimativa para esse projeto!`;

    if (btnEl) btnEl.href = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
  };

  updateCustomizerSummary();

  // 4. Project Modal Lightbox
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
      image: 'images/about.jpg',
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

    modalSpecsContainer.innerHTML = data.specs.map(spec => `
      <div class="modal-spec-item">
        <span class="modal-spec-label">${spec.label}</span>
        <span class="modal-spec-value">${spec.value}</span>
      </div>
    `).join('');

    const waText = encodeURIComponent(`Olá! Vi o projeto "${data.title}" no site do Ateliê Linha Casa e gostaria de um orçamento semelhante.`);
    modalWhatsappBtn.href = `https://wa.me/5511999999999?text=${waText}`;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      openProjectModal(card.getAttribute('data-project'));
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

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 6. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nome = document.getElementById('form-nome').value.trim();
      const whatsapp = document.getElementById('form-whatsapp').value.trim();
      const ambiente = document.getElementById('form-ambiente').value;
      const mensagem = document.getElementById('form-mensagem').value.trim();

      if (!nome || !whatsapp) {
        alert('Por favor, preencha seu nome e WhatsApp.');
        return;
      }

      let text = `Olá! Meu nome é ${nome}.\n`;
      text += `Gostaria de solicitar um orçamento para o ambiente: *${ambiente}*.\n`;
      if (mensagem) text += `Detalhes do projeto: ${mensagem}\n`;
      text += `Meu WhatsApp para contato: ${whatsapp}`;

      window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  // 7. Scroll Reveal Observer
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
    rootMargin: '100px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
