
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
    const codeBlock = document.getElementById(`${codeId}`);
    if (codeBlock) {
      codeBlock.style.display = codeBlock.style.display === 'none' ? 'block' : 'none';
    }
  });
});

// Пересувна кнопка контекстного меню
const contextBtn = document.getElementById('context-btn');
contextBtn.addEventListener('mousedown', function(e) {
  e.preventDefault();
  let shiftX = e.clientX - contextBtn.getBoundingClientRect().left;
  let shiftY = e.clientY - contextBtn.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    contextBtn.style.left = pageX - shiftX + 'px';
    contextBtn.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  contextBtn.addEventListener('mouseup', function() {
    document.removeEventListener('mousemove', onMouseMove);
    contextBtn.onmouseup = null;
  });
});

contextBtn.ondragstart = function() {
  return false;
};

// Перемикання видимості бічної панелі
contextBtn.addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.transform = sidebar.style.transform === 'translateX(0px)' ? 'translateX(-310px)' : 'translateX(0px)';
});

// Кнопка для відображення змісту
const tocBtn = document.getElementById('toc-btn');
tocBtn.addEventListener('click', () => {
  const existingToc = document.getElementById('toc-menu');
  if (existingToc) {
    existingToc.remove();
    return;
  }

  const toc = document.createElement('div');
  toc.id = 'toc-menu';
  toc.style.position = 'fixed';
  toc.style.top = '50%';
  toc.style.left = '50%';
  toc.style.transform = 'translate(-50%, -50%)';
  toc.style.background = 'linear-gradient(45deg, #003366, #001233)';
  toc.style.padding = '20px';
  toc.style.borderRadius = '12px';
  toc.style.boxShadow = '0 0 12px rgba(0, 255, 255, 0.6)';
  toc.style.zIndex = '1001';
  toc.style.color = '#ffffff';
  toc.style.maxHeight = '80vh';
  toc.style.overflowY = 'auto';

  const tocList = document.createElement('ul');
  tocList.style.listStyle = 'none';
  tocList.style.padding = '0';
  document.querySelectorAll('.section h2').forEach((h2) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = h2.textContent;
    const targetId = h2.parentElement.id;
    a.href = `#${targetId}`;
    a.style.color = '#00d4ff';
    a.style.textDecoration = 'none';
    a.style.display = 'block';
    a.style.padding = '10px';
    a.style.fontSize = '1.1em';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
      toc.remove();
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Закрити';
  closeBtn.style.background = 'linear-gradient(45deg, #4a90e2, #00d4ff)';
  closeBtn.style.border = 'none';
  closeBtn.style.padding = '10px';
  closeBtn.style.borderRadius = '8px';
  closeBtn.style.color = '#ffffff';
  closeBtn.style.marginTop = '15px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.addEventListener('click', () => toc.remove());

  toc.appendChild(tocList);
  toc.appendChild(closeBtn);
  document.body.appendChild(toc);
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
