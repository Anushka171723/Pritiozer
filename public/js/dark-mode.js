// const toggleButton = document.getElementById('darkModeToggle');
// const body = document.body;

// // Load saved mode from localStorage
// const currentMode = localStorage.getItem('theme');
// if (currentMode === 'dark') {
//   body.classList.add('dark-mode');
//   toggleButton.textContent = 'Switch to Light Mode';
// }

// // Toggle dark mode on button click
// toggleButton.addEventListener('click', () => {
//   body.classList.toggle('dark-mode');

//   // Update button text
//   if (body.classList.contains('dark-mode')) {
//     toggleButton.textContent = 'Switch to Light Mode';
//     localStorage.setItem('theme', 'dark');
//   } else {
//     toggleButton.textContent = 'Switch to Dark Mode';
//     localStorage.setItem('theme', 'light');
//   }
// });



// Check for previously saved mode
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const savedMode = localStorage.getItem('darkMode');

  if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
});
