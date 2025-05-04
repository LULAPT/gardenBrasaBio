document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe para controlar a animação inicial
    document.body.classList.add('loaded');
    
    // Configurações do IntersectionObserver
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    // Função que será executada quando os elementos entrarem na viewport
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adiciona um pequeno delay baseado no index para criar efeito cascata
          const delay = entry.target.dataset.animationDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, delay);
          
          // Parar de observar o elemento após a animação
          observer.unobserve(entry.target);
        }
      });
    };
  
    // Criar o observer
    const observer = new IntersectionObserver(handleIntersect, options);
  
    // Elementos a serem animados na página do Garden Brasa
    const animatedElements = [
      '.avatar',
      'h1',
      'p',
      '.button-stack .button',
      '.whatsapp-contact-box',
      '.location-box'
    ];
  
    // Função para adicionar delay incremental para efeito cascata
    function setupAnimations() {
      let delay = 0;
      const increment = 100; // Incremento de 100ms entre elementos
  
      // Selecionar todos os elementos a serem animados
      animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
          // Adicionar classe para controlar animação
          element.classList.add('animate-item');
          
          // Configurar delay personalizado
          if (selector === '.button-stack .button' || 
              selector === '.whatsapp-contact-box' || 
              selector === '.location-box') {
            // Para botões e boxes, queremos um delay incremental
            element.dataset.animationDelay = delay;
            delay += increment;
          } else {
            // Para outros elementos, queremos um delay baseado no tipo
            element.dataset.animationDelay = index * increment;
          }
          
          // Adicionar ao observer
          observer.observe(element);
        });
      });
    }
  
    // Iniciar configuração de animações
    setupAnimations();
  });