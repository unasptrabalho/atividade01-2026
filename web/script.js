const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('pink-theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pink-theme', newTheme);
});