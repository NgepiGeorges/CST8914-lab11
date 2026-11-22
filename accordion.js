// Lab 11: accessible accordion (based on the ARIA APG accordion pattern)

const accordionBtns = document.querySelectorAll(".accordion");

// Open or close one panel, and keep aria-expanded correct
function togglePanel(button) {
  const content = document.getElementById(button.getAttribute("aria-controls"));
  const isOpen = button.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    // the panel is open, so we close it
    button.setAttribute("aria-expanded", "false");
    button.classList.remove("is-open");
    content.classList.remove("is-open");
    content.style.maxHeight = null;
  } else {
    // the panel is closed, so we open it
    button.setAttribute("aria-expanded", "true");
    button.classList.add("is-open");
    content.classList.add("is-open");
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

accordionBtns.forEach((button, index) => {
  // Mouse click, Enter and Space all fire "click" on a real <button>
  button.addEventListener("click", () => togglePanel(button));

  // Missing keyboard interaction: arrow keys, Home and End move between the accordion headers
  button.addEventListener("keydown", (event) => {
    let target = null;
    const last = accordionBtns.length - 1;

    if (event.key === "ArrowDown") {
      target = accordionBtns[index === last ? 0 : index + 1]; // next header, or back to the first
    } else if (event.key === "ArrowUp") {
      target = accordionBtns[index === 0 ? last : index - 1]; // previous header, or go to the last
    } else if (event.key === "Home") {
      target = accordionBtns[0]; // first header
    } else if (event.key === "End") {
      target = accordionBtns[last]; // last header
    }

    if (target) {
      event.preventDefault(); // stop the page from scrolling
      target.focus();
    }
  });
});
