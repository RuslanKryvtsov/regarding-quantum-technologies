  // Симуляція алгоритму Гровера
  document.getElementById('simulate-grover-btn').addEventListener('click', () => {
    const outcome = Math.random() > 0.5 ? '11' : '00'; // Спрощена симуляція
    const resultDiv = document.getElementById('grover-simulation-result');
    resultDiv.textContent = `Знайдено елемент: |${outcome}>`;
    resultDiv.style.animation = 'fadeIn 0.5s';
    setTimeout(() => {
      resultDiv.style.animation = '';
    }, 500);
  });

  // Плавна прокрутка для навігації бічної панелі
  document.querySelectorAll('.nav-button').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      target.scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll('.section').forEach(sec => sec.classList.remove('highlight'));
      target.classList.add('highlight');
      setTimeout(() => target.classList.remove('highlight'), 2000);
    });
  });

  // Показ коду при кліку на ключові слова
  document.querySelectorAll('.code-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const codeId = trigger.getAttribute('data-code-id');
      const codeBlock = document.getElementById(`${codeId}-code`);
      codeBlock.style.display = codeBlock.style.display === 'none' ? 'block' : 'none';
    });
  });

  // Пересувна кнопка для контекстного меню
  const contextBtn = document.getElementById('context-btn');
  let isDragging = false;

  contextBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    isDragging = true;
    let shiftX = e.clientX - contextBtn.getBoundingClientRect().left;
    let shiftY = e.clientY - contextBtn.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      contextBtn.style.left = pageX - shiftX + 'px';
      contextBtn.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      if (isDragging) {
        moveAt(e.pageX, e.pageY);
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function() {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
  });

  contextBtn.ondragstart = function() {
    return false;
  };

  // Перемикання видимості бічної панелі
  contextBtn.addEventListener('click', () => {
    if (!isDragging) {
      const sidebar = document.querySelector('.sidebar');
      sidebar.style.left = sidebar.style.left === '0px' ? '-330px' : '0px';
    }
  });

  // Кнопка книжечки для модального меню
  const bookBtn = document.getElementById('book-btn');
  const modal = document.getElementById('modal-menu');
  const closeModal = document.getElementById('close-modal');

  bookBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Додавання стилю для підсвічування
  const style = document.createElement('style');
  style.textContent = `
    .highlight {
      background: linear-gradient(45deg, #E0E0E0, #E0E0E0) !important;
      transform: scale(1.02) !important;
      transition: background 0.3s, transform 0.3s;
    }
  `;
  document.head.appendChild(style);



