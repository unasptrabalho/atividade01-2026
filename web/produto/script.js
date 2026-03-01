const themeBtn = document.getElementById('theme-toggle');
document.documentElement.setAttribute('data-theme', localStorage.getItem('pink-theme') || 'light');

themeBtn.onclick = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pink-theme', newTheme);
};

async function carregarProdutos() {
    const container = document.getElementById('lista-produtos');
    try {
        const response = await fetch('http://localhost:3333/produtos');
        
        if (response.status === 404) {
            container.innerHTML = "<h3>Ops! Nenhum produto encontrado no momento. 🌸</h3>";
            return;
        }

        const produtos = await response.json();

        if (produtos.length === 0) {
            container.innerHTML = "<h3>Ops! Nenhum produto encontrado no momento. 🌸</h3>";
            return;
        }

        container.innerHTML = produtos.map(p => `
            <div class="card">
                <h3>${p.nome}</h3>
                <p><em>${p.categoria}</em></p>
                <p>${p.descricao}</p>
                <p class="preco">R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</p>
                <button onclick="apagarProduto(${p.id})" class="btn-delete">🗑️ Apagar</button>
            </div>
        `).join('');
        
    } catch (err) {
        container.innerHTML = "<h3>Erro ao conectar com o servidor. Verifique se o Node está rodando!</h3>";
    }
}

async function apagarProduto(id) {
    const confirmar = confirm("Tem certeza que deseja apagar este produto da PinkStore?");
    
    if (confirmar) {
        try {
            const resposta = await fetch(`http://localhost:3333/produtos/${id}`, { 
                method: 'DELETE' 
            });
            
            if (resposta.ok) {
                alert("Produto apagado com sucesso! 🌸");
                carregarProdutos();
            } else {
                alert("Erro ao apagar o produto. Verifique o console.");
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro de conexão com o servidor ao tentar apagar.");
        }
    }
}

carregarProdutos();