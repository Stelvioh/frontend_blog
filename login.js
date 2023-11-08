document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('formularioLogin');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Impede a submissão padrão do formulário

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const apiUrl = 'http://localhost:5000/usuario/login';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: senha
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
        
                localStorage.setItem('token', data.token);
                window.location.href = '/usuarios.html';  
            } else {
                alert('Erro no login. Por favor, verifique suas credenciais.');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Tente novamente mais tarde.');
        });
    });
});
