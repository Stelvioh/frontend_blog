// Carregar o menu dinamicamente
function carregarMenu() {
    fetch('menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menuPlaceholder').outerHTML = data;
    });
}

// Chama a função quando o dom estiver pronto
document.addEventListener('DOMContentLoaded', carregarMenu);
