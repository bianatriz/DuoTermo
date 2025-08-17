const estadoDoJogo = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
];

const estadoDoJogo2 = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
];

const palavrasDeCincoLetras = [
['P','E','T','S','I'],
['C','A','S','A','L'],
['L','I','V','R','O'],
['F','O','G','O','S'],
['A','N','D','A','R'],
['P','A','S','T','A'],
['V','E','R','S','O'],
['M','E','S','A','S'],
['L','U','Z','E','S']
];


const palavraSecreta = palavrasDeCincoLetras[Math.floor(Math.random() * 10)];
const palavraSecreta2 = palavrasDeCincoLetras[Math.floor(Math.random() * 10)];

console.log(palavraSecreta +" - "+ palavraSecreta2);

// variaveis globais 
let dicaGasta = false;

let ganhou1jogo = false;
let ganhou2jogo = false;

let tentativaAtual = 0;
let letraAtual = 0;

function bloquearInputsClassificados1(){
    const todasAsLetras = document.querySelectorAll('#grade-do-jogo1 .letra');
    todasAsLetras.forEach(input => {
        if(
            input.classList.contains('correta') ||
            input.classList.contains('espera') ||
            input.classList.contains('presente') ||
            input.classList.contains('ausente') 
        ) {
            input.disabled = true;
        }
        else{
            input.disabled = false;
        }
    });
}

function bloquearInputsClassificados2(){
    const todasAsLetras = document.querySelectorAll('#grade-do-jogo2 .letra');
    todasAsLetras.forEach(input => {
        if(
            input.classList.contains('correta') ||
            input.classList.contains('espera') ||
            input.classList.contains('presente') ||
            input.classList.contains('ausente') 
        ) {
            input.disabled = true;
        }
        else{
            input.disabled = false;
        }
    });
}

document.addEventListener('keydown', (e) =>{
    if(e.key === 'Backspace'){
        e.preventDefault();
        const inputs = document.querySelectorAll(`#L1${tentativaAtual} .letra`);
        const inputs2 = document.querySelectorAll(`#L2${tentativaAtual} .letra`);
        
        for (let i = inputs.length - 1; i >= 0; i--){
           // if (inputs[i].disabled || inputs2[i].disabled) continue;

            if (inputs[i].value !== '' || inputs2[i].value !== '') {
                inputs[i].value = '';
                inputs2[i].value = '';
                if(i!==0) inputs[i-1].focus();
                break;
            }
        }
    }
});

function verificarStatus1(){
    const inputs = document.querySelectorAll(`#L1${tentativaAtual} .letra`);
    let status = [];
    let statusDoJogo = true;

    inputs.forEach((input, index) => {
        const letraDigitada = input.value.toLocaleUpperCase();
        const letraSecreta = palavraSecreta[index];

        if(letraDigitada === letraSecreta){
            input.classList.add('correta');
            status.push('correta');
        }else if(palavraSecreta.includes(letraDigitada)){
            input.classList.add('presente');
            status.push('presente');
            statusDoJogo=false;
        } else{
             input.classList.add('ausente');
             status.push('ausente');
             statusDoJogo = false;
        }
    });

    if(!statusDoJogo){
        estadoDoJogo[tentativaAtual] = status;
    }else {ganhou1jogo=true;}

    return statusDoJogo;
}

function verificarStatus2(){
    const inputs = document.querySelectorAll(`#L2${tentativaAtual} .letra`);
    let status = [];
    let statusDoJogo = true;

    inputs.forEach((input, index) => {
        const letraDigitada = input.value.toLocaleUpperCase();
        const letraSecreta = palavraSecreta2[index];

        if(letraDigitada === letraSecreta){
            input.classList.add('correta');
            status.push('correta');
        }else if(palavraSecreta2.includes(letraDigitada)){
            input.classList.add('presente');
            status.push('presente');
            statusDoJogo=false;
        } else{
             input.classList.add('ausente');
             status.push('ausente');
             statusDoJogo = false;
        }
    });

    if(!statusDoJogo){
        estadoDoJogo2[tentativaAtual] = status;
    }else {ganhou2jogo=true;}

    return statusDoJogo;
}

function reinicializarLinha1(tentativaAtual){
    const inputs = document.querySelectorAll(`#L1${tentativaAtual} .letra`);
    inputs.forEach(input => input.classList.remove('espera'));
}

function reinicializarLinha2(tentativaAtual){
    const inputs = document.querySelectorAll(`#L2${tentativaAtual} .letra`);
    inputs.forEach(input => input.classList.remove('espera'));
}

// Enter
document.addEventListener('keydown', (e) => {

    const inputs = document.querySelectorAll(`#L1${tentativaAtual} .letra`);
    const inputs2 = document.querySelectorAll(`#L2${tentativaAtual} .letra`)
    for (let i=0; i < inputs.length; i++){
        if((inputs[i].value == "" && !inputs[i].disabled) ||(inputs2[i].value == "" && !inputs2[i].disabled)){

            if(e.key.length <= 1){
                if(!inputs[i].disabled)inputs[i].value = e.key;
                if(!inputs2[i].disabled)inputs2[i].value = e.key ;
                inputs[i].focus();
                return;
            }

        }
    }

    if(e.key === 'Enter'){
        e.preventDefault();

        const inputs = document.querySelectorAll(`#L1${tentativaAtual} .letra`);
        const inputs2 = document.querySelectorAll(`#L2${tentativaAtual} .letra`);

        if(
            (inputs[0].value && inputs[1].value && inputs[2].value && inputs[3].value && inputs[4].value) ||
            (inputs2[0].value && inputs2[1].value && inputs2[2].value && inputs2[3].value && inputs2[4].value)
        ){
            verificarStatus1();
            verificarStatus2();

            if(ganhou1jogo && !ganhou2jogo && tentativaAtual < 5){
                tentativaAtual++;
                letraAtual = 0;
                if(!ganhou2jogo) reinicializarLinha2(tentativaAtual);
                bloquearInputsClassificados2();
                const primeiroInput2 = document.querySelector(`#L2${tentativaAtual} .letra:not([disabled])`);
                if (primeiroInput2) primeiroInput2.focus();
                
            } else if (!ganhou1jogo && ganhou2jogo && tentativaAtual < 5 ){
                tentativaAtual++;
                letraAtual = 0;
                if(!ganhou1jogo) reinicializarLinha1(tentativaAtual);
                bloquearInputsClassificados1();
                const primeiroInput1 = document.querySelector(`#L1${tentativaAtual} .letra:not([disabled])`);
                if (primeiroInput1) primeiroInput1.focus();

            } else if(!ganhou1jogo && !ganhou2jogo && tentativaAtual < 5){
                tentativaAtual++;
                letraAtual = 0;
                reinicializarLinha1(tentativaAtual);
                bloquearInputsClassificados1();
                reinicializarLinha2(tentativaAtual);
                bloquearInputsClassificados2();
                const primeiroInput = document.querySelector(`#L1${tentativaAtual} .letra:not([disabled])`) || document.querySelector(`#L2${tentativaAtual} .letra:not([disabled])`);
                if (primeiroInput) primeiroInput.focus();
            } if(ganhou1jogo && ganhou2jogo){
                document.querySelectorAll('.letra').forEach(elemento => elemento.disabled =true);
            }

            const dicas = document.querySelector('#dica');
            dicas.classList.remove('dicaDisponivel');
            dicas.classList.add('dicaGasta');
        }
    }
});

document.addEventListener('DOMContentLoaded', () =>{
    bloquearInputsClassificados1();
    bloquearInputsClassificados2();

    // teclado virtual
    document.querySelectorAll('.teclado').forEach(botao =>{
        botao.addEventListener('click',() => {
            const letra = botao.textContent.trim().toUpperCase();
            const inputs = document.querySelectorAll(`#L1${tentativaAtual} .letra`);
            const inputs2 = document.querySelectorAll(`#L2${tentativaAtual} .letra`);

            for (let i=0; i< inputs.length; i++){
                if((inputs[i].value === '' && !inputs[i].disabled) || (inputs2[i].value === '' && !inputs2[i].disabled)){
                    if(!inputs[i].disabled) inputs[i].value = letra;
                    if(!inputs2[i].disabled) inputs2[i].value = letra;
                    if(i<4) inputs[i].focus();
                    break;
                }
            }
        });
    });

    const dica =  document.querySelector('#dica');
    dica.addEventListener('click', () =>{
        if(!dicaGasta && tentativaAtual<1){
            let iAleatorio = (Math.floor(Math.random() * 5));

            let input1  = document.querySelector(`#grade-do-jogo1 #L10 #L1${iAleatorio}`);
            input1.value = palavraSecreta[iAleatorio];
            input1.disabled = true;
            input1.classList.add('correta');
            
            input2 = document.querySelector(`#grade-do-jogo2 #L20 #L2${iAleatorio}`);
            input2.value = palavraSecreta[iAleatorio]
            if(palavraSecreta[iAleatorio] == palavraSecreta2[iAleatorio] ) input2.classList.add('correta');
            else if(palavraSecreta2.includes(palavraSecreta[iAleatorio]) ) input2.classList.add('presente');
            else input2.classList.add('ausente');
            input2.disabled = true;
            
            dica.classList.remove('dicaDisponivel');
            dica.classList.add('dicaGasta');
            dicaGasta=true;
        }
    });

    const enter= document.querySelector('#teclado-do-jogo .enter');
    if(enter) enter.addEventListener('click', () => {
        const eventoEnter = new KeyboardEvent('keydown',{
            key: 'Enter',
            bubbles: true
        });
        document.dispatchEvent(eventoEnter);
    });

    const deletar = document.querySelector('#teclado-do-jogo .backspace');
    if (deletar) deletar.addEventListener('click', () => {
        const inputs = document.querySelectorAll(`#L1${tentativaAtual} .letra`);
        const inputs2 = document.querySelectorAll(`#L2${tentativaAtual} .letra`);
        for (let i = inputs.length - 1; i >= 0; i--) {
            //if (inputs[i].disabled || inputs2[i].disabled) continue;
            if (inputs[i].value !== '' || inputs2[i].value !== '') {
                inputs[i].value = '';
                inputs2[i].value = '';
                break;
            }
        }
    });

    

});
