const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;

// Load saved mode from localStorage
const currentMode = localStorage.getItem('theme');
if (currentMode === 'dark') {
  body.classList.add('dark-mode');
  toggleButton.textContent = 'Switch to Light Mode';
}

// Toggle dark mode on button click
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  // Update button text
  if (body.classList.contains('dark-mode')) {
    toggleButton.textContent = 'Switch to Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleButton.textContent = 'Switch to Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});
