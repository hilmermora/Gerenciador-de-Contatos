const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputCelular = document.getElementById('celular');
const btnSalvar = document.getElementById('btnSalvar');
const lista = document.getElementById('listaContatos');

let indexEdicao = -1;

function atualizarLista() {
    let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
    lista.innerHTML = ""; 

    agenda.forEach((contato, index) => {
        // Cria o identificador de ordem (Ex: 01, 02, 03...)
        let ordem = (index + 1).toString().padStart(2, '0');

        lista.innerHTML += `
            <div style="border: 1px solid #000; padding: 15px; margin-top: 15px; border-radius: 10px; background: rgba(255,255,255,0.4); position: relative;">
                <span style="position: absolute; top: 10px; right: 15px; font-weight: bold; color: #666;">#${ordem}</span>
                
                <p><strong>Nome:</strong> ${contato.nome}</p>
                <p><strong>E-mail:</strong> ${contato.email || '---'}</p>
                <p><strong>Celular:</strong> ${contato.celular}</p>
                
                <div style="margin-top: 10px;">
                    <button onclick="prepararEdicao(${index})" style="background: #ffc107; padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer;">Editar</button>
                    <button onclick="remover(${index})" style="background: #dc3545; color: white; padding: 5px 10px; border: none; border-radius: 5px; margin-left: 10px; cursor: pointer;">Apagar</button>
                </div>
            </div>
        `;
    });
}

btnSalvar.onclick = function() {
    if (inputNome.value === "" || inputCelular.value === "") {
        alert("Preencha pelo menos Nome e Celular!");
        return;
    }

    let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
    const contato = {
        nome: inputNome.value,
        email: inputEmail.value,
        celular: inputCelular.value
    };

    if (indexEdicao === -1) {
        agenda.push(contato);
    } else {
        agenda[indexEdicao] = contato;
        indexEdicao = -1;
        btnSalvar.innerText = "Salvar";
    }

    localStorage.setItem('agenda', JSON.stringify(agenda));
    limparCampos();
    atualizarLista();
};

window.prepararEdicao = function(index) {
    let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
    const contato = agenda[index];

    inputNome.value = contato.nome;
    inputEmail.value = contato.email;
    inputCelular.value = contato.celular;

    indexEdicao = index;
    btnSalvar.innerText = "Atualizar Dados";
    window.scrollTo(0, 0);
};

window.remover = function(index) {
    if(confirm("Tem certeza que deseja apagar este contato?")) {
        let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        agenda.splice(index, 1);
        localStorage.setItem('agenda', JSON.stringify(agenda));
        atualizarLista();
    }
};

function limparCampos() {
    inputNome.value = "";
    inputEmail.value = "";
    inputCelular.value = "";
}

atualizarLista();
