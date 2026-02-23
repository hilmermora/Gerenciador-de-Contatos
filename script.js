// Referências do DOM
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputCelular = document.getElementById('celular');
const btnSalvar = document.getElementById('btnSalvar');
const btnNovo = document.getElementById('btnNovo');
const lista = document.getElementById('listaContatos');

let indexEdicao = -1;

// Função para buscar dados (DRY - Don't Repeat Yourself)
const carregarAgenda = () => JSON.parse(localStorage.getItem('agenda')) || [];

function actualizarLista() {
    const agenda = carregarAgenda();
    lista.innerHTML = ""; 

    agenda.forEach((contato, index) => {
        const ordem = (index + 1).toString().padStart(2, '0');
        
        // Criando o card com funções de Apagar e Editar
        lista.innerHTML += `
            <div class="card-contato" style="border: 1px solid #ccc; padding: 15px; margin-top: 15px; border-radius: 10px; background: white; position: relative;">
                <span style="position: absolute; top: 10px; right: 15px; font-weight: bold; color: #888;">#${ordem}</span>
                <p><strong>Nome:</strong> ${contato.nome}</p>
                <p><strong>E-mail:</strong> ${contato.email || '---'}</p>
                <p><strong>Celular:</strong> ${contato.celular}</p>
                
                <div style="margin-top: 10px;">
                    <button onclick="prepararEdicao(${index})" style="background: #ffc107; border: none; padding: 7px 12px; border-radius: 4px; cursor: pointer;">Editar</button>
                    <button onclick="remover(${index})" style="background: #dc3545; color: white; border: none; padding: 7px 12px; border-radius: 4px; margin-left: 10px; cursor: pointer;">Apagar</button>
                </div>
            </div>
        `;
    });
}


window.remover = function(index) {
    if (confirm("Deseja realmente excluir este contato?")) {
        let agenda = carregarAgenda();
        agenda.splice(index, 1); 
        localStorage.setItem('agenda', JSON.stringify(agenda));
        actualizarLista();
    }
};


window.prepararEdicao = function(index) {
    const agenda = carregarAgenda();
    const contato = agenda[index];

    inputNome.value = contato.nome;
    inputEmail.value = contato.email;
    inputCelular.value = contato.celular;

    indexEdicao = index; 
    btnSalvar.innerText = "Atualizar Dados"; 
    btnSalvar.style.background = "#28a745";
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
};


btnSalvar.onclick = function() {
    const nome = inputNome.value.trim();
    const celular = inputCelular.value.trim();

    if (nome === "" || celular === "") {
        alert("Preencha Nome e Celular!");
        return;
    }

    let agenda = carregarAgenda();
    const contato = { nome, email: inputEmail.value, celular };

    if (indexEdicao === -1) {
        agenda.push(contato); 
    } else {
        agenda[indexEdicao] = contato; 
        indexEdicao = -1;
        btnSalvar.innerText = "Salvar";
        btnSalvar.style.background = ""; 
    }

    localStorage.setItem('agenda', JSON.stringify(agenda));
    limparCampos();
    actualizarLista();
};

btnNovo.onclick = function() {
    limparCampos();
    indexEdicao = -1;
    btnSalvar.innerText = "Salvar";
};

function limparCampos() {
    inputNome.value = "";
    inputEmail.value = "";
    inputCelular.value = "";
}


actualizarLista();
