const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputCelular = document.getElementById('celular');
const btnSalvar = document.getElementById('btnSalvar');
const btnNovo = document.getElementById('btnNovo');
const lista = document.getElementById('listaContatos');

let indexEdicao = -1;


function actualizarLista() {
    let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
    lista.innerHTML = ""; 

    agenda.forEach((contato, index) => {
        let ordem = (index + 1).toString().padStart(2, '0');

        lista.innerHTML += `
            <div class="card-contato" style="border: 1px solid #ccc; padding: 15px; margin-top: 15px; border-radius: 10px; background: rgba(255,255,255,0.7); position: relative;">
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
    const confirmar = confirm("¿Estás seguro de que deseas eliminar este contacto?");
    
    if (confirmar) {
        let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        agenda.splice(index, 1);
        localStorage.setItem('agenda', JSON.stringify(agenda));
        actualizarLista();
    }
};


btnSalvar.onclick = function() {
    if (inputNome.value.trim() === "" || inputCelular.value.trim() === "") {
        alert("¡Nombre y Celular son obligatorios!");
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
    actualizarLista();
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