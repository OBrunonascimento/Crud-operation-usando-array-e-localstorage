let Cadastro = [ 
    ["001001", "Jose da Silva", "jose@email.com", 11999011234],
    ["001002", "Marcio de Souza", "marcio@email.com", 11999021234],
    ["001003", "Mauricio Cruz", "mauricio@email.com", 11999031234],
    ["001004", "Fabiana Dias", "fabiana@email.com", 11999041234],
]

function criaContatos(contatos) {
    var row=`<tr><th>Qtd</th><th>Identificação</th><th>Nome</th><th>Email</th><th>Telefone</th> <th>Ações</th> </tr>`;
    contatos.forEach(function(contato,i)
    { row+=`<tr><td>${i+1}</td> 
    <td>${contato[0]}</td>
    <td>${contato[1]}</td>
    <td>${contato[2]}</td>
    <td>${contato[3]}</td> 
    <td> <a herf='#' onclick=del(${i})><i class='fa fa-trash'></i></a></td> </tr>`})

    document.getElementById("tbl").innerHTML=row;
} 

//LÓGICA PARA A VALIDAÇÃO DO FORMULÁRIO
const form = document.querySelector("#btn-lista");
const codeInput = document.querySelector("#codigo");
const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const telInput = document.querySelector("#tel");

form.addEventListener("click", (e) => {
    e.preventDefault()

        if (codeInput.value === "" ) {
            alert("Por favor, preencha a sua identificação");
            return;
        }

        if (nomeInput.value === "" ) {
            alert("Por favor, preencha o seu nome");
            return;
        }

        if (emailInput.value === "" || !emailvalido(emailInput.value)) {
            alert("Por favor, preencha o seu email corretamente");
            document.getElementById("email").value="";
            return;
        }

        if (!telvalido(telInput.value, 7)) {
            alert("Por favor, preencha corretamente o seu telefone ");
            document.getElementById("email").value="";
            return;
        }
        
    });

function emailvalido(email) {
    const emailRegex = new RegExp (
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,}$/
    );
    if (emailRegex.test(email)) {
        return true;
    } 
    return false;
}

function telvalido(telefone, minDigits) {
    if (telefone.length >= minDigits) {
        return true; 
    }   
    return false;
}

form.addEventListener("click", (e) => {
    const codeInput = document.querySelector("#codigo").value;
    const nomeInput = document.querySelector("#nome").value;
    const emailInput = document.querySelector("#email").value;
    const telInput = document.querySelector("#tel").value;

        let newCadastro = new Array(); 
        if (localStorage.hasOwnProperty("newCadastro")) {
            newCadastro = JSON.parse(localStorage.getItem("newCadastro"));
        }
        newCadastro.push({codigo: codeInput, nome: nomeInput, email:emailInput, telefone: telInput });

        localStorage.setItem("newCadastro" , JSON.stringify(newCadastro));
});

function Addcadastro(e) {
    e.preventDefault()

    let codigo = document.getElementById("codigo").value;
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
    let contato = [codigo, nome, email, tel];

    Cadastro.push(contato); 
    criaContatos(Cadastro);
    Limpaform();
}

function Limpaform() {
    document.getElementById("codigo").value="";
    document.getElementById("nome").value="";
    document.getElementById("email").value="";
    document.getElementById("tel").value="";
}

function del(i) {
   event.preventDefault();
    Cadastro.splice(i, 1);
    criaContatos(Cadastro);
}

document.getElementById("btn-lista").addEventListener("click" , Addcadastro );
criaContatos(Cadastro);

