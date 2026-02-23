// Lógica do Tema (Necessário repetir ou referenciar global)
const themeBtn = document.getElementById('theme-toggle');
document.documentElement.setAttribute('data-theme', localStorage.getItem('pink-theme') || 'light');
themeBtn.onclick = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pink-theme', newTheme);
};

// Busca os produtos
async function carregarProdutos() {
    const container = document.getElementById('lista-produtos');
    try {
        const response = await fetch('http://localhost:3333/produtos');
        const produtos = await response.json();

        if (response.status === 404 || produtos.length === 0) {
            container.innerHTML = "<h3>Ops! Nenhum produto encontrado no momento. 🌸</h3>";
            return;
        }

        container.innerHTML = produtos.map(p => `
            <div class="card">
                <h3>${p.nome}</h3>
                <p><em>${p.categoria}</em></p>
                <p>${p.descricao}</p>
                <p class="preco">R$ ${parseFloat(p.preco).toFixed(2)}</p>
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = "<h3>Erro ao conectar com o servidor. Verifique se o Node está rodando!</h3>";
    }
}
carregarProdutos();