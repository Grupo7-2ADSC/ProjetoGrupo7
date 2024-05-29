function cadastrarEmpresa(){
    window.location.href = "../adm/cadastroEmpresa.html";
}
document.addEventListener('DOMContentLoaded', function() {
const userProfile = document.getElementById('user-profile');
const userCard = document.getElementById('user-card');
const logoutBtn = document.getElementById('logout-btn');
const empresasTableBody = document.querySelector('#empresasTable tbody');




userProfile.addEventListener('click', function() {
    userCard.classList.toggle('active');
});

document.addEventListener('click', function(event) {
    if (!userProfile.contains(event.target) && !userCard.contains(event.target)) {
        userCard.classList.remove('active');
    }
});

logoutBtn.addEventListener('click', function() {
    window.location.href = '../site/public/index.html';
});

// Simulação de dados (substitua com chamada AJAX ou fetch API)
const empresas = [
    { id: 1, nome: 'DHL', cnpj: '12345678000123', dataCadastro: '2023-01-01' },
    { id: 2, nome: 'Fedex', cnpj: '98765432000121', dataCadastro: '2023-02-15' },
    { id: 3, nome: 'Sedex', cnpj: '12312312312312', dataCadastro: '2023-03-10' },
];

// Função para preencher a tabela
function preencherTabela(empresas) {
    empresas.forEach(empresa => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${empresa.nome}</td>
            <td>${empresa.cnpj}</td>
            <td>${empresa.dataCadastro}</td>
            <td>
                <button class="edit" onclick="editarEmpresa(${empresa.id})">Editar</button>
                <button class="delete" onclick="deletarEmpresa(${empresa.id})">Deletar</button>
            </td>
        `;
        empresasTableBody.appendChild(row);
    });
}

// Função para editar uma empresa
window.editarEmpresa = function(id) {
    const empresa = empresas.find(emp => emp.id === id);
    if (empresa) {
        const nome = prompt('Editar nome da empresa:', empresa.nome);
        const cnpj = prompt('Editar CNPJ da empresa:', empresa.cnpj);
        if (nome && cnpj) {
            empresa.nome = nome;
            empresa.cnpj = cnpj;
            atualizarTabela();
        }
    }
}

// Função para deletar uma empresa
window.deletarEmpresa = function(id) {
    const index = empresas.findIndex(emp => emp.id === id);
    if (index > -1) {
        empresas.splice(index, 1);
        atualizarTabela();
    }
}

// Função para atualizar a tabela
function atualizarTabela() {
    empresasTableBody.innerHTML = '';
    preencherTabela(empresas);
}

// Preencher a tabela com os dados simulados
preencherTabela(empresas);

});