const div = document.querySelector(".main-title");
const cursor = document.createElement("span");
cursor.classList.add("cursor");
div.appendChild(cursor);
const texts = [
  "Welcome to AThenics",
  "This is where it all starts",
  "Made by Aim Cosa"
];

let textIndex = 0; // track which text we are on

function textTypingEffect(element, text, i = 0) {
  element.textContent += text[i];

  if (i === text.length - 1) {
    // finished typing, start deleting after a pause
    setTimeout(() => textDeletingEffect(element, text, text.length - 1), 1000);
    return;
  }

  setTimeout(() => textTypingEffect(element, text, i + 1), 100);
}

function textDeletingEffect(element, text, i) {
  element.textContent = text.substring(0, i);

  if (i === 0) {
    // move to next text
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(() => textTypingEffect(element, texts[textIndex], 0), 1000);
    return;
  }

  setTimeout(() => textDeletingEffect(element, text, i - 1), 100);
}

// start animation
textTypingEffect(div, texts[textIndex]);