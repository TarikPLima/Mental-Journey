// Dropdown Menu
document.getElementById('toggleDropdown').addEventListener('click', function(event) {
    event.preventDefault();
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show');
  });

  // Fechar o dropdown se o usuário clicar fora dele
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };