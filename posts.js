const url_base = "http://127.0.0.1:5000/post";

async function buscarTodosOsPosts() {
    const resposta = await fetch(`${url_base}/`);
    const posts = await resposta.json();
    const corpoTabela = document.getElementById('tabelaPosts').getElementsByTagName('tbody')[0];

    // Limpar linhas existentes
    corpoTabela.innerHTML = '';

    posts.forEach(post => {
        const novaLinha = corpoTabela.insertRow();
        novaLinha.insertCell(0).innerText = post.post_id;
        novaLinha.insertCell(1).innerText = post.title;
        novaLinha.insertCell(2).innerText = post.content;
        novaLinha.insertCell(3).innerText = post.user ? post.user.name : "Desconhecido";
    
        // Botões de ação
        const colunaAcoes = novaLinha.insertCell(4);
        const btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.onclick = () => editarPost(post.post_id);
        colunaAcoes.appendChild(btnEditar);
    
        const btnRemover = document.createElement("button");
        btnRemover.innerText = "Remover";
        btnRemover.onclick = () => removerPost(post.post_id);
        colunaAcoes.appendChild(btnRemover);
    });
}

async function adicionarPost(evento) {
    evento.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;
    const user_id = document.getElementById('user_id').value;

    const resposta = await fetch(`${url_base}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: titulo, content: conteudo, user_id: user_id })
    });

    if (resposta.status === 201) {
        // Limpar o formulário e buscar todos os posts novamente para atualizar a tabela
        document.getElementById('formularioAdicionarPost').reset();
        buscarTodosOsPosts();
    } else {
        console.error('Falha ao adicionar post. Servidor respondeu com', resposta.status);
    }
}

async function editarPost(postID) {
    const titulo = prompt("Novo título:");
    const conteudo = prompt("Novo conteúdo:");

    if (titulo && conteudo) {
        const resposta = await fetch(`${url_base}/${postID}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: titulo, content: conteudo })
        });

        if (resposta.status === 200) {
            buscarTodosOsPosts();
        } else {
            console.error('Falha ao editar post. Servidor respondeu com', resposta.status);
        }
    }
}

async function removerPost(postID) {
    const confirmacao = confirm("Tem certeza que deseja remover este post?");
    if (confirmacao) {
        const resposta = await fetch(`${url_base}/${postID}/`, {
            method: 'DELETE'
        });

        if (resposta.status === 200) {
            buscarTodosOsPosts();
        } else {
            console.error('Falha ao remover post. Servidor respondeu com', resposta.status);
        }
    }
}

document.getElementById('formularioAdicionarPost').addEventListener('submit', adicionarPost);
buscarTodosOsPosts();
