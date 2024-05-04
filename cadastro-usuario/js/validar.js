//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");


/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}
);

