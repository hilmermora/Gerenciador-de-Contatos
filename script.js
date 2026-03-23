// 1. Mapeamento de Elementos (Organização visual)
const dom = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    celular: document.getElementById('celular'),
    btnSalvar: document.getElementById('btnSalvar'),
    btnNovo: document.getElementById('btnNovo'),
    lista: document.getElementById('listaContatos')
};

let indexEdicao = -1;

// 2. Operações de Dados (LocalStorage)
const agendaDB = {
    get: () => JSON.parse(localStorage.getItem('agenda')) || [],
    save: (dados) => localStorage.setItem('agenda', JSON.stringify(dados))
};

// 3. Lógica de Interface (UI)
const ui = {
    limparFormulario() {
        dom.nome.value = "";
        dom.email.value = "";
        dom.celular.value = "";
        indexEdicao = -1;
        dom.btnSalvar.innerText = "Salvar";
        dom.btnSalvar.style.background = "";
    },

    renderizar() {
        const agenda = agendaDB.get();
        dom.lista.innerHTML = agenda.map((contato, index) => {
            const ordem = (index + 1).toString().padStart(2, '0');
            return `
                <div class="card-contato" style="border: 1px solid #ccc; padding: 15px; margin-top: 15px; border-radius: 10px; background: white; position: relative;">
                    <span style="position: absolute; top: 10px; right: 15px; font-weight: bold; color: #888;">#${ordem}</span>
                    <p><strong>Nome:</strong> ${contato.nome}</p>
                    <p><strong>E-mail:</strong> ${contato.email || '---'}</p>
                    <p><strong>Celular:</strong> ${contato.celular}</p>
                    <div style="margin-top: 10px;">
                        <button onclick="prepararEdicao(${index})" style="background: #ffc107; border: none; padding: 7px 12px; border-radius: 4px; cursor: pointer;">Editar</button>
                        <button onclick="remover(${index})" style="background: #dc3545; color: white; border: none; padding: 7px 12px; border-radius: 4px; margin-left: 10px; cursor: pointer;">Apagar</button>
                    </div>
                </div>`;
        }).join('');
    }
};

// 4. Ações Globais (Expostas para o HTML)
window.remover = (index) => {
    if (confirm("Deseja realmente excluir este contato?")) {
        const agenda = agendaDB.get();
        agenda.splice(index, 1);
        agendaDB.save(agenda);
        ui.renderizar();
    }
};

window.prepararEdicao = (index) => {
    const contato = agendaDB.get()[index];
    dom.nome.value = contato.nome;
    dom.email.value = contato.email;
    dom.celular.value = contato.celular;

    indexEdicao = index;
    dom.btnSalvar.innerText = "Atualizar Dados";
    dom.btnSalvar.style.background = "#28a745";
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 5. Event Listeners
dom.btnSalvar.onclick = () => {
    const nome = dom.nome.value.trim();
    const celular = dom.celular.value.trim();

    if (!nome || !celular) return alert("Preencha Nome e Celular!");

    const agenda = agendaDB.get();
    const novoContato = { nome, email: dom.email.value, celular };

    if (indexEdicao === -1) {
        agenda.push(novoContato);
    } else {
        agenda[indexEdicao] = novoContato;
    }

    agendaDB.save(agenda);
    ui.limparFormulario();
    ui.renderizar();
};

dom.btnNovo.onclick = ui.limparFormulario;

// Inicialização
ui.renderizar();
