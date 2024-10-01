document.addEventListener('DOMContentLoaded', function () {
    const draggable = document.querySelector('.draggable');
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Quando o mouse começa a arrastar
    draggable.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - draggable.offsetLeft;
        scrollLeft = draggable.scrollLeft;
        draggable.style.cursor = 'grabbing';
    });

    // Quando o mouse se move
    draggable.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - draggable.offsetLeft;
        const walk = (x - startX) * 1; // Reduzido para uma rolagem mais suave
        draggable.scrollLeft = scrollLeft - walk;
    });

    // Quando o mouse para de arrastar
    draggable.addEventListener('mouseup', () => {
        isDragging = false;
        draggable.style.cursor = 'grab';
    });

    // Quando o toque começa a arrastar
    draggable.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - draggable.offsetLeft;
        scrollLeft = draggable.scrollLeft;
    });

    // Quando o toque se move
    draggable.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - draggable.offsetLeft;
        const walk = (x - startX) * 1; // Reduzido para uma rolagem mais suave
        draggable.scrollLeft = scrollLeft - walk;
    });

    // Quando o toque para de arrastar
    draggable.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Suavização com requestAnimationFrame
    let smoothScroll = () => {
        if (isDragging) {
            requestAnimationFrame(smoothScroll);
        }
    };

    draggable.addEventListener('mousedown', () => {
        smoothScroll();
    });

    draggable.addEventListener('touchstart', () => {
        smoothScroll();
    });
});


function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

document.addEventListener('keydown', function(event) {
     if (event.keyCode === 123) {
         event.preventDefault();
     }
     if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
         event.preventDefault();
     }
     if (event.ctrlKey && event.keyCode === 85) {
         event.preventDefault();
     }
});

document.addEventListener("DOMContentLoaded", function() {
    const logoRow = document.querySelector('.logo__row');
    const logos = document.querySelectorAll('.logo__item');
    const logoWidth = logos[0].offsetWidth;
    const logoCount = logos.length;

    // Clonar logos para criar efeito de rotação infinita
    for (let i = 0; i < logoCount; i++) {
        let clone = logos[i].cloneNode(true);
        logoRow.appendChild(clone);
    }

    // Definir largura total do contêiner para acomodar duas vezes o comprimento das logos
    const totalWidth = logoWidth * logoCount;
    logoRow.style.width = `${totalWidth * 2}px`;

    let offset = 0;

    function animate() {
        offset -= 1; // Ajuste a velocidade da rotação
        if (Math.abs(offset) >= totalWidth) {
            offset = 0; // Reinicia o deslocamento
        }
        logoRow.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(animate);
    }

    animate();
});

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