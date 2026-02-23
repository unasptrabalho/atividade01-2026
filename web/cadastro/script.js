// Lógica do Tema
const themeBtn = document.getElementById('theme-toggle');
document.documentElement.setAttribute('data-theme', localStorage.getItem('pink-theme') || 'light');
themeBtn.onclick = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pink-theme', newTheme);
};

// Lógica de Envio
document.getElementById('form-cadastro').onsubmit = async (e) => {
    e.preventDefault();
    
    const produto = {
        nome: document.getElementById('nome').value,
        preco: document.getElementById('preco').value,
        categoria: document.getElementById('categoria').value,
        descricao: document.getElementById('descricao').value
    };

    try {
        const res = await fetch('http://localhost:3333/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (res.ok) {
            alert('Sucesso! Produto adicionado à vitrine rosa.');
            window.location.href = '../produtos/index.html';
        } else {
            alert('Erro ao cadastrar. Verifique os campos.');
        }
    } catch (err) {
        alert('Servidor offline!');
    }
};