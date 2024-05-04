// Criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");


/* Declarando o evento listener para os campos de texto do form. */
nome.addEventListener('focusout', validarNome); // Uma vez o foco do campo inputName mude, será chamada a função validarNome
ano.addEventListener('focusout', validarAno); // Uma vez o foco do campo inputYear mude, será chamada a função validarAno


/* Declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, além de outras propriedades, o objeto que iniciou o evento, neste caso o objeto 'nome' */
function validarNome(e){ 
    // Declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    
    console.log(e); // Impressão em console do objeto evento e
    console.log(e.target.value); // Impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome) == null){
        // Muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Nome inválido. Deve seguir o formato 'Nome Sobrenome'"; 
        nomeHelp.style.color="red";
    }
    else if(e.target.value.trim().length <= 6){
        // Verifica se o comprimento do nome é maior que 6 letras
        nomeHelp.textContent = "Nome inválido. Deve ser ter mais que 6 letras."; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/* Declaração da função validarAno(e) */
function validarAno(e){
    // Declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.value.trim(); // Tirar (trim) espaços em branco antes e depois da string

    console.log(ano.value);

    if(anoTrimado.match(regexAno) == null){
        // Muda o conteúdo e o estilo do objeto anoHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{
        var date = new Date(); // Objeto Date
        console.log(date.getFullYear()); // Obtém o ano atual
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear())-2 ){
            // Muda o conteúdo e o estilo do objeto anoHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()-2}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
            // Muda o conteúdo e o estilo do objeto anoHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}

