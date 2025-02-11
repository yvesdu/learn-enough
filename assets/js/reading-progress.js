document.addEventListener('DOMContentLoaded', function() {
  // Create reading progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
  document.body.appendChild(progressBar);
  
  const progressBarFill = progressBar.querySelector('.reading-progress-bar');
  
  // Update progress bar
  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBarFill.style.width = `${progress}%`;
  }
  
  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  
  // Table of Contents highlighting
  const tocLinks = document.querySelectorAll('#toc-sidebar a');
  const sections = document.querySelectorAll('h2, h3, h4, h5, h6');
  
  function highlightToc() {
    const scrollPos = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.id;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        tocLinks.forEach(link => {
          link.classList.remove('toc-active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('toc-active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightToc);
}); 