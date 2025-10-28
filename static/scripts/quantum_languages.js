
  // Fade-in sections on load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section').forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
    section.style.animation = 'fadeInSection 1.2s ease-in forwards';
  });
});

// Function to make buttons draggable
function makeDraggable(button) {
  if (!button) {
    console.error('Button element is null or undefined');
    return { getIsDragging: () => false };
  }

  let isDragging = false;

  button.addEventListener('mousedown', function(e) {
    e.preventDefault();
    isDragging = true;
    let shiftX = e.clientX - button.getBoundingClientRect().left;
    let shiftY = e.clientY - button.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      button.style.left = pageX - shiftX + 'px';
      button.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      if (isDragging) {
        moveAt(e.pageX, e.pageY);
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function() {
      if (isDragging) {
        document.removeEventListener('mousemove', onMouseMove);
        isDragging = false;
      }
    });

    button.ondragstart = function() {
      return false;
    };
  }); // Додано відсутню закриваючу дужку

  return { getIsDragging: () => isDragging };
}

// Draggable context button
const contextBtn = document.getElementById('context-btn');
const contextDrag = makeDraggable(contextBtn);

// Toggle sidebar menu on context button click
contextBtn.addEventListener('click', (e) => {
  if (!contextDrag.getIsDragging()) {
    const sidebar = document.getElementById('sidebar-menu');
    sidebar.classList.toggle('hidden');
  }
});

// Draggable book button and modal menu
const bookBtn = document.getElementById('book-btn');
const modal = document.getElementById('modal-menu');
const closeModal = document.getElementById('close-modal');
const bookDrag = makeDraggable(bookBtn);

bookBtn.addEventListener('click', (e) => {
  if (!bookDrag.getIsDragging()) {
    const isVisible = modal.style.display === 'block';
    modal.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
      const rect = bookBtn.getBoundingClientRect();
      modal.style.left = `${rect.left}px`;
      modal.style.top = `${rect.top - modal.offsetHeight - 10}px`;
    }
  }
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Smooth scroll and highlight for menu links
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('highlight');
      });
      target.classList.add('highlight');
      setTimeout(() => {
        target.classList.remove('highlight');
      }, 2000);
      document.getElementById('sidebar-menu').classList.add('hidden');
      modal.style.display = 'none';
    }
  });
});

// Show/hide code blocks on click
document.querySelectorAll('.code-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const codeId = trigger.getAttribute('data-code-id');
    const codeBlock = document.getElementById(`${codeId}-code`);
    codeBlock.style.display = codeBlock.style.display === 'none' ? 'block' : 'none';
  });
});

// Dynamic highlight style

const style = document.createElement('style');
  style.textContent = `
    .highlight {
      background: linear-gradient(45deg, #E0E0E0, #E0E0E0) !important;
      transform: scale(1.02) !important;
      transition: background 0.3s, transform 0.3s;
    }
  `;
  document.head.appendChild(style);




