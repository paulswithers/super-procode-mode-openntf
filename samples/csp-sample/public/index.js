const initPage = () => {
  // Initialize the page
  document.getElementById('jsAdventure').addEventListener('click', (event) => {
    event.preventDefault();
    alert('js clicked from script');
  });
  console.log('Page initialized');
};

// Run it
if (document.readyState != 'loading') {
  initPage();
} else {
  document.addEventListener('DOMContentLoaded', initPage);
}
