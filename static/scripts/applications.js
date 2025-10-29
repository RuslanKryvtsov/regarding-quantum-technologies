
  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Highlight the section temporarily
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('highlight'));
        target.classList.add('highlight');
        setTimeout(() => target.classList.remove('highlight'), 2000);
        // Close modal if clicking from modal menu
        const modal = document.getElementById('modal-menu');
        if (modal.style.display === 'block') {
          modal.style.display = 'none';
        }
      }
    });
  });

  // Draggable context button for toggling sidebar
  const contextBtn = document.getElementById('context-btn');
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;

  contextBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
    isDragging = true;
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      contextBtn.style.left = currentX + 'px';
      contextBtn.style.top = currentY + 'px';
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });

  contextBtn.ondragstart = function() {
    return false;
  };

  // Initialize position
  contextBtn.style.position = 'fixed';
  currentX = window.innerWidth - 25; // Adjust for right: 25px
  currentY = window.innerHeight - 25; // Adjust for bottom: 25px
  contextBtn.style.left = currentX + 'px';
  contextBtn.style.top = currentY + 'px';

  // Toggle sidebar visibility
  contextBtn.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar-menu');
    sidebar.classList.toggle('hidden');
  });

  // Modal menu for book button
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

  // Highlight style
  const style = document.createElement('style');
  style.textContent = `
    .highlight {
      background: linear-gradient(45deg, #E0E0E0, #E0E0E0) !important;
      transform: scale(1.02) !important;
      transition: background 0.3s, transform 0.3s;
    }
  `;
  document.head.appendChild(style);

