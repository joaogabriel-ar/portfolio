window.validateInput = function validateInput(ev) {
    const nome = document.getElementById("nome");
    const idade = document.getElementById("idade");
    const errorNome = document.getElementById("ErrorMessageNome")
    const errorIdade = document.getElementById("ErrorMessageIdade")
    const errorNota = document.getElementById("ErrorMessageNota")
    const nota1 = document.getElementById("nota1")
    const nota2 = document.getElementById("nota2")
    const nota3 = document.getElementById("nota3")
    const nota4 = document.getElementById("nota4")
    if (nome.value == '' && idade.value == '') {
        ev.preventDefault();
        if (nota1.value > 10 || nota2.value > 10 || nota3.value > 10 || nota4.value > 10) {
            errorNota.innerHTML = "Nota inválida";
            errorNome.innerHTML = "Campo Obrigatório";
            errorIdade.innerHTML = "Campo Obrigatório";
        } else {
            errorNome.innerHTML = "Campo Obrigatório";
            errorIdade.innerHTML = "Campo Obrigatório";
            errorNota.innerHTML = "";

        }

        return false;
    } else if (nome.value == '') {
        ev.preventDefault();
        if (nota1.value > 10 || nota2.value > 10 || nota3.value > 10 || nota4.value > 10) {
            errorNota.innerHTML = "Nota inválida"
            errorNome.innerHTML = "Campo Obrigatório";
            errorIdade.innerHTML = "";
        } else {
            errorNome.innerHTML = "Campo Obrigatório";
            errorIdade.innerHTML = "";
            errorNota.innerHTML = "";
        }

        return false;
    } else if (idade.value == '') {
        ev.preventDefault();
        if (nota1.value > 10 || nota2.value > 10 || nota3.value > 10 || nota4.value > 10) {
            errorNota.innerHTML = "Nota inválida"
            errorIdade.innerHTML = "Campo Obrigatório";
            errorNome.innerHTML = "";
        } else {
            errorIdade.innerHTML = "Campo Obrigatório";
            errorNome.innerHTML = "";
            errorNota.innerHTML = "";
        }


        return false;
    } else if (nota1.value > 10 || nota2.value > 10 || nota3.value > 10 || nota4.value > 10) {
        ev.preventDefault();
        errorNota.innerHTML = "Nota inválida"
        errorIdade.innerHTML = "";
        errorNome.innerHTML = "";
        return false
    }
}

window.validateInputModal = function validateInputModal(ev) {
    const nome = document.getElementById("nomeModal");
    const idade = document.getElementById("idadeModal");
    const errorNome = document.getElementById("ErrorMessageNomeModal")
    const errorIdade = document.getElementById("ErrorMessageIdadeModal")
    const errorNota = document.getElementById("ErrorMessageNotaModal")
    const nota1 = document.getElementById("nota1Modal")
    const nota2 = document.getElementById("nota2Modal")
    const nota3 = document.getElementById("nota3Modal")
    const nota4 = document.getElementById("nota4Modal")

    if (nome.value == '' && idade.value == '') {
        ev.preventDefault();
        if (nota1.value > 10 || nota2.value > 10 || nota3.value > 10 || nota4.value > 10) {
            errorNota.innerHTML = "Nota inválida";
            errorNome.innerHTML = "Campo Obrigatório";
            errorIdade.innerHTML = "Campo Obrigatório";
        } else {
            errorNome.innerHTML = "Campo Obrigatório";
            errorIdade.innerHTML = "Campo Obrigatório";
            errorNota.innerHTML = "";

        }

        return false;
    } else if (nome.value == '') {
        ev.preventDefault();
        if (nota1.value > 10 || nota2.value > 10 || nota3.value > 10 || nota4.value > 10) {
            errorNota.innerHTML = "Nota inválida"
            errorNome.innerHTML = "Campo Obrigatório";
            errorIdade.innerHTML = "";
        } else {
            errorNome.innerHTML = "Campo Obrigatório";
            errorIdade.innerHTML = "";
            errorNota.innerHTML = "";
        }

        return false;
    } else if (idade.value == '') {
        ev.preventDefault();
        if (nota1.value > 10 || nota2.value > 10 || nota3.value > 10 || nota4.value > 10) {
            errorNota.innerHTML = "Nota inválida"
            errorIdade.innerHTML = "Campo Obrigatório";
            errorNome.innerHTML = "";
        } else {
            errorIdade.innerHTML = "Campo Obrigatório";
            errorNome.innerHTML = "";
            errorNota.innerHTML = "";
        }


        return false;
    } else if (nota1.value > 10 || nota2.value > 10 || nota3.value > 10 || nota4.value > 10) {
        ev.preventDefault();
        errorNota.innerHTML = "Nota inválida"
        errorIdade.innerHTML = "";
        errorNome.innerHTML = "";
        return false
    }
}

async function getData() {
    const response = await fetch('/findStudent');
    const data = await response.json();
    const tbody = document.querySelector("tbody");
    const hd1 = document.createElement('th');
    hd1.innerHTML = "Nome";
    const hd2 = document.createElement('th');
    hd2.innerHTML = "Idade";
    const hd3 = document.createElement('th');
    hd3.innerHTML = "Nota 1";
    const hd4 = document.createElement('th');
    hd4.innerHTML = "Nota 2";
    const hd5 = document.createElement('th');
    hd5.innerHTML = "Nota 3";
    const hd6 = document.createElement('th');
    hd6.innerHTML = "Nota 4";
    const hd7 = document.createElement('th');
    hd7.innerHTML = "Situação";
    const hd8 = document.createElement('th');
    hd8.innerHTML = "Ações";
    const thead = document.querySelector('thead');
    thead.appendChild(hd1);
    thead.appendChild(hd2);
    thead.appendChild(hd3);
    thead.appendChild(hd4);
    thead.appendChild(hd5);
    thead.appendChild(hd6);
    thead.appendChild(hd7);
    thead.appendChild(hd8);

    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement("tr");
        tr.setAttribute('id', `${data[i]._id}`);
        tbody.appendChild(tr);
        const nome = document.createElement("td");
        const idade = document.createElement("td");
        const nota1 = document.createElement("td");
        const nota2 = document.createElement("td");
        const nota3 = document.createElement("td");
        const nota4 = document.createElement("td");
        const situacao = document.createElement("td");
        const imgs = document.createElement("td");
        nome.innerHTML = data[i].nome;
        idade.innerHTML = data[i].idade + " anos";
        nota1.innerHTML = data[i].nota1;
        nota2.innerHTML = data[i].nota2;
        nota3.innerHTML = data[i].nota3;
        nota4.innerHTML = data[i].nota4;
        situacao.innerHTML = data[i].situacao;
        const editIcon = document.createElement("img");
        const removeIcon = document.createElement("img");
        editIcon.src = "/imgs/edit-icon.jpg"
        removeIcon.src = "/imgs/remove-icon.jpg"
        editIcon.setAttribute('id', 'editIcon');
        removeIcon.setAttribute('id', 'removeIcon');
        tr.appendChild(nome);
        tr.appendChild(idade);
        tr.appendChild(nota1);
        tr.appendChild(nota2);
        tr.appendChild(nota3);
        tr.appendChild(nota4);
        tr.appendChild(situacao);
        tr.appendChild(imgs)
        imgs.appendChild(editIcon);
        imgs.appendChild(removeIcon);

        removeIcon.addEventListener('click', async (ev) => {
            document.getElementById('confirm-modal').style.display = 'block';
            const confirm = document.getElementById('confirm');
            const deny = document.getElementById('deny');
            confirm.addEventListener('click', async (ev) => {
                ev.preventDefault();
                const parent1 = removeIcon.parentNode;
                const trId = parent1.parentNode.id;
                const data = {
                    trId
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }

                const response = await fetch('/remove', options);
                window.location.reload();
            })
            deny.addEventListener('click', (ev) => {
                ev.preventDefault();
                document.getElementById('confirm-modal').style.display = 'none';
            })
        });

        editIcon.addEventListener('click', async (ev) => {
            ev.preventDefault();
            const parent1 = removeIcon.parentNode;
            const trId = parent1.parentNode.id;
            console.log(trId);
            const data = {
                trId
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response = await fetch('/editStudent', options);
            const dataJsonResponse = await response.json();
            const studentId = document.getElementById('id');
            studentId.value = dataJsonResponse._id;
            const studentSituacao = document.getElementById('situacao');
            studentSituacao.value = dataJsonResponse.situacao;
            const nomeModal = document.getElementById('nomeModal');
            nomeModal.value = dataJsonResponse.nome;
            const idadeModal = document.getElementById('idadeModal');
            idadeModal.value = dataJsonResponse.idade;
            const nota1Modal = document.getElementById('nota1Modal');
            nota1Modal.value = dataJsonResponse.nota1;
            const nota2Modal = document.getElementById('nota2Modal');
            nota2Modal.value = dataJsonResponse.nota1;
            const nota3Modal = document.getElementById('nota3Modal');
            nota3Modal.value = dataJsonResponse.nota3;
            const nota4Modal = document.getElementById('nota4Modal');
            nota4Modal.value = dataJsonResponse.nota4;
            document.getElementsByClassName('modal')[0].style.display = 'block';

            const close = document.getElementById('close');
            close.addEventListener('click', (ev) => {
                ev.preventDefault();
                document.getElementsByClassName('modal')[0].style.display = "none";
            })

        })
    }

    if (tbody.childNodes.length == 1) {
        const emptyTr = document.createElement("tr");
        const vazio = document.createElement("td");
        vazio.innerHTML = "Vazio";
        tbody.appendChild(emptyTr);
        emptyTr.appendChild(vazio);
        document.querySelector('td').style.textAlign = "center";
        document.querySelector('td').colSpan = "8";
    }

    const containerTable = document.getElementById('container-table');
    containerTable.style.display = "flex";
}


getData();