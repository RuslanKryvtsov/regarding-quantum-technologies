// Симуляція стійкості PQC
document.getElementById("simulate-pqc-btn").addEventListener("click", () => {
  const rsaBreakTime = "Секунди (з Шором)";
  const pqcBreakTime = "Мільйони років";
  document.getElementById("pqc-simulation-result").innerHTML = `
      RSA: <span style="color: #ff4444">${rsaBreakTime}</span><br>
      Kyber: <span style="color: #00d4ff">${pqcBreakTime}</span>
    `;
  document.getElementById("pqc-simulation-result").style.animation =
    "fadeIn 0.5s";
  setTimeout(() => {
    document.getElementById("pqc-simulation-result").style.animation = "";
  }, 500);
});

// Плавна прокрутка для навігації бічної панелі
document.querySelectorAll(".nav-button").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    target.scrollIntoView({ behavior: "smooth" });
    document
      .querySelectorAll(".section")
      .forEach((sec) => sec.classList.remove("highlight"));
    target.classList.add("highlight");
    setTimeout(() => target.classList.remove("highlight"), 2000);
  });
});

// Показ коду при кліку на ключові слова
document.querySelectorAll(".code-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const codeId = trigger.getAttribute("data-code-id");
    const codeBlock = document.getElementById(`${codeId}-code`);
    codeBlock.style.display =
      codeBlock.style.display === "none" ? "block" : "none";
  });
});

// Функція для перетягування кнопок
function makeDraggable(button) {
  if (!button) {
    console.error("Button element is null or undefined");
    return { getIsDragging: () => false };
  }

  let isDragging = false;

  button.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isDragging = true;
    let shiftX = e.clientX - button.getBoundingClientRect().left;
    let shiftY = e.clientY - button.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      button.style.left = pageX - shiftX + "px";
      button.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(e) {
      if (isDragging) {
        moveAt(e.pageX, e.pageY);
      }
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", function () {
      if (isDragging) {
        document.removeEventListener("mousemove", onMouseMove);
        isDragging = false;
      }
    });

    button.ondragstart = function () {
      return false;
    };
  });

  return { getIsDragging: () => isDragging };
}

// Пересувна кнопка контекстного меню
const contextBtn = document.getElementById("context-btn");
const contextDrag = makeDraggable(contextBtn);

// Перемикання видимості бічної панелі
contextBtn.addEventListener("click", (e) => {
  if (!contextDrag.getIsDragging()) {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
  }
});

// Пересувна кнопка Book та контекстне меню
const bookBtn = document.getElementById("book-btn");
const bookContextMenu = document.getElementById("book-context-menu");
const bookDrag = makeDraggable(bookBtn);

bookBtn.addEventListener("click", (e) => {
  if (!bookDrag.getIsDragging()) {
    const isVisible = bookContextMenu.style.display === "block";
    bookContextMenu.style.display = isVisible ? "none" : "block";
    if (!isVisible) {
      const rect = bookBtn.getBoundingClientRect();
      bookContextMenu.style.left = `${rect.left}px`;
      bookContextMenu.style.top = `${
        rect.top - bookContextMenu.offsetHeight - 10
      }px`;
    }
  }
});

// Плавна прокрутка для пунктів контекстного меню
document.querySelectorAll(".context-menu-item").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    target.scrollIntoView({ behavior: "smooth" });
    document
      .querySelectorAll(".section")
      .forEach((sec) => sec.classList.remove("highlight"));
    target.classList.add("highlight");
    setTimeout(() => target.classList.remove("highlight"), 2000);
    bookContextMenu.style.display = "none"; // Закрити меню після кліку
  });
});

// Закриття контекстного меню при кліку поза ним
document.addEventListener("click", (e) => {
  if (!bookBtn.contains(e.target) && !bookContextMenu.contains(e.target)) {
    bookContextMenu.style.display = "none";
  }
});

// Додавання стилю для підсвічування
const style = document.createElement("style");
style.textContent = `
    .highlight {
      background: linear-gradient(45deg, #003366, #001233) !important;
      transform: scale(1.02) !important;
      transition: background 0.3s, transform 0.3s;
    }
  `;
document.head.appendChild(style);
