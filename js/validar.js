/* Lívia Fausto Cárnio - 13838346
 * https://liviafausto.github.io/dev-web-desafio-js/ */


/* Criando os objetos dos elementos de texto do form */
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaMeter = document.querySelector("#passStrengthMeter");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var senhaResult = document.querySelector("#inputResult");


/* Declarando o evento listener para os campos de texto do form. */
nome.addEventListener('focusout', validarNome); // Uma vez o foco do campo inputName mude, será chamada a função validarNome
ano.addEventListener('focusout', validarAno); // Uma vez o foco do campo inputYear mude, será chamada a função validarAno
email.addEventListener('focusout', validarEmail); // Uma vez o foco do campo inputEmail mude, será chamada a função validarEmail
senha.addEventListener('focusout', validarSenha); // Uma vez o foco do campo inputPassword mude, será chamada a função validarSenha

/* Declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, além de outras propriedades, o objeto que iniciou o evento, neste caso o objeto 'nome' */
function validarNome(e){ 
    // Declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^([A-Z][a-z]*\s)*[A-Z][a-z]*$/;
    
    console.log(e); // Impressão em console do objeto evento e
    console.log(e.target.value); // Impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome) == null || e.target.value.trim().length < 6){
        // Verifica se o nome do usuário somente contém letras e se tem comprimento maior ou igual a 6
        nomeHelp.textContent = "Nome inválido"; 
        nomeHelp.style.color = "red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

function validarAno(){
    // Declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.value.trim(); // Tirar (trim) espaços em branco antes e depois da string

    console.log(ano.value);

    if(anoTrimado.match(regexAno) == null){
        // Verifica se a string de ano é formada por apenas 4 números
        anoHelp.textContent = "Ano inválido";
        anoHelp.style.color = "red";
    }
    else{
        var date = new Date(); // Objeto Date
        console.log(date.getFullYear()); // Obtém o ano atual
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear())-2 ){
            // Verifica se o ano inserido é maior que 2022
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()-2}.`;
            anoHelp.style.color = "red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
            // Muda o conteúdo e o estilo do objeto anoHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color = "red";
        }
        else{
            anoHelp.textContent = "";
        }        
        
    }
}

function validarEmail(){
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+(?:br|com|net|org)$/; // Formato de um email válido

    console.log(email.value);

    if(email.value.trim().match(regexEmail) == null){
        emailHelp.textContent = "Formato de email inválido.";
        emailHelp.style.color = "red";
    }
    else{
        emailHelp.textContent = "";
    }

}

function validarSenha(){
    const senhaInserida = senha.value.trim();

    if(tamanhoInvalido(senhaInserida) || temOcorrenciasFaltando(senhaInserida) || contemNomeOuAnoUsuario(senhaInserida)){
        senhaHelp.textContent = "Senha inválida.";
        senhaHelp.style.color = "red";
        senhaResult.textContent = "";
        passStrengthMeter.value = 0;
        return false;
    }
    
    senhaHelp.textContent = "";
    const nivelSeguranca = calcularNivelSeguranca(senhaInserida);
    senhaResult.textContent = `${nivelSeguranca}`;

    if(nivelSeguranca == "Fraca"){
        senhaResult.style.color = "rgb(255, 149, 0)";
        passStrengthMeter.value = 10;
    }
    else if(nivelSeguranca == "Moderada"){
        senhaResult.style.color = "rgb(255, 196, 0)";
        passStrengthMeter.value = 20;
    }
    else if(nivelSeguranca == "Forte"){
        senhaResult.style.color = "rgb(45, 181, 45)";
        passStrengthMeter.value = 30;
    }

    return true;
}

// Validar tamanho da senha
function tamanhoInvalido(senha){
    return senha.length < 6 || senha.length > 20;
}

// Validar se a senha tem pelo menos uma ocorrência de letra, número e caractere especial
function temOcorrenciasFaltando(senha){
    const regexCaractereEspecial = /[@#%&!+]/; // Regex de caracteres especiais
    const regexNumero = /[0-9]/; // Regex de números
    const regexLetra = /[a-zA-Z]/; // Regex de letras

    return !regexCaractereEspecial.test(senha) 
        || !regexNumero.test(senha)
        || !regexLetra.test(senha);
}

// Validar se a senha contém o nome ou o ano de nascimento do usuário
function contemNomeOuAnoUsuario(senha){
    const nomeUsuario = nome.value.trim().replace(/\s+/g, ''); // Remove os espaços em branco entre as palavras
    const anoNascimentoUsuario = ano.value.trim();

    return senha.toLowerCase().includes(nomeUsuario.toLowerCase())
        || senha.includes(anoNascimentoUsuario);
}


// Retorna o nível de segurança de uma senha válida
function calcularNivelSeguranca(senha){
    const regexCaractereEspecial = /[@#%&!+]/g; // Regex de caracteres especiais
    const regexNumero = /[0-9]/g; // Regex de números
    const regexLetraMaiuscula = /[A-Z]/g; // Regex de letras

    // Contar ocorrências
    const qtdEspeciais = senha.match(regexCaractereEspecial).length;
    const qtdNumeros = senha.match(regexNumero).length;
    const qtdMaiusculas = (senha.match(regexLetraMaiuscula) || []).length; // Maísculas não são obrigatórias, então senha.match() pode retornar null
    
    // Lembrando que todas as senhas válidas já contém pelo menos um caractere especial, um número e uma letra
    console.log(`Caracteres especiais: ${qtdEspeciais}`);
    console.log(`Números: ${qtdNumeros}`);
    console.log(`Letras maiúsculas: ${qtdMaiusculas}`);

    if(senha.length > 12 && qtdEspeciais > 1 && qtdNumeros > 1 && qtdMaiusculas > 1){
        return "Forte";
    }
    else if(senha.length > 8 && qtdMaiusculas >= 1){
        return "Moderada";
    }
    else{
        return "Fraca";
    }

}