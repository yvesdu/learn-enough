document.addEventListener('DOMContentLoaded', function() {
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle nav-link';
  themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  themeToggle.innerHTML = `
    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
    </svg>
    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
    </svg>
  `;
  
  // Insert toggle button in navbar
  const navbar = document.querySelector('.navbar-nav');
  if (navbar) {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.appendChild(themeToggle);
    navbar.appendChild(li);
  }
  
  // Theme handling
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icons visibility
    if (theme === 'dark') {
      document.querySelector('.sun-icon').style.display = 'none';
      document.querySelector('.moon-icon').style.display = 'block';
    } else {
      document.querySelector('.sun-icon').style.display = 'block';
      document.querySelector('.moon-icon').style.display = 'none';
    }
    
    // Update button aria-label
    themeToggle.setAttribute('aria-label', 
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
  
  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);
  
  // Toggle theme
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}); 