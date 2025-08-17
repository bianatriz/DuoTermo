const estadoDoJogo = [
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

let dicaGasta=false;

let tentativaAtual = 0;
let letraAtual = 0;

function bloquearInputsClassificados(){
    const todasAsLetras= document.querySelectorAll('.letra');
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
        console.log(input);
    });
}

document.addEventListener('keyup', (e) =>{
    const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);
    for (let i=0; i < inputs.length; i++){
        if(inputs[i].value == "" && !inputs[i].disabled){
            //inputs[i].value = e.key;
            inputs[i].focus();
            return;
        }
    }
})

function verificarStatus(){
    const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);

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
    }

    return statusDoJogo;
}

function reinicializarLinha(tentativaAtual){
    const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);

    inputs.forEach((input, index) => {
        input.classList.remove('espera');
    });
}

document.addEventListener('keydown', (e) =>{
    if(e.key === 'Backspace'){
        e.preventDefault();
        const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);
        
        for (let i = inputs.length - 1; i >= 0; i--){
           // if (inputs[i].disabled || inputs2[i].disabled) continue;

            if (inputs[i].value !== '') {
                inputs[i].value = '';
                if(i!==0) inputs[i-1].focus();
                break;
            }
        }
    }
});

document.addEventListener('keydown', (e) => {
    if(e.key ==='Enter'){
        const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);

        if(
            inputs[0].value !== '' &&
            inputs[1].value !== '' &&
            inputs[2].value !== '' &&
            inputs[3].value !== '' &&
            inputs[4].value !== '' 
        ){
            let  statusDoJogo = verificarStatus();

            if(statusDoJogo){
                document.querySelectorAll('.letra').forEach(elemento => elemento.disabled =true);
                return;
            }
            
            if(tentativaAtual < 5){
                tentativaAtual++;
                letraAtual = 0;
                reinicializarLinha(tentativaAtual);
                bloquearInputsClassificados();
                let d = document.querySelector(`#L${tentativaAtual} .letra`);
                d.focus();
            }
        }
    }
})

document.addEventListener('DOMContentLoaded', () =>{
    
    bloquearInputsClassificados();

    document.querySelectorAll('.teclado').forEach(botao =>{
        botao.addEventListener('click',() => {
            const letra = botao.textContent.trim().toUpperCase();
            const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);

            for (let i=0; i< inputs.length; i++){
                if(inputs[i].value === '' && !inputs[i].disabled){
                    inputs[i].value = letra;
                    inputs[i+1].focus();
                    console.log(i+1);
                    break;
                }
            }
        });
    });

    const enter= document.querySelector('#teclado-do-jogo .enter');
    if(enter) enter.addEventListener('click', () => {

        const eventoEnter = new KeyboardEvent('keydown',{
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which:13,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(eventoEnter);
    });

     const deletar = document.querySelector('#teclado-do-jogo .backspace');
    if (deletar) deletar.addEventListener('click', () => {

        const inputs = document.querySelectorAll(`#L${tentativaAtual} .letra`);
        for (let i = inputs.length - 1; i >= 0; i--) {
            if (inputs[i].disabled) continue;

            if (inputs[i].value !== '') {
                inputs[i].value = '';
                break;
            }
        }
    });


        const dica =  document.querySelector('#dica');
    dica.addEventListener('click', () =>{
        if(!dicaGasta && tentativaAtual<1){
            let iAleatorio = (Math.floor(Math.random() * 5));

            let input1  = document.querySelector(`#grade-do-jogo #L0 #L${iAleatorio}`);
            input1.value = palavraSecreta[iAleatorio];
            input1.disabled = true;
            input1.classList.add('correta');
            
            dica.classList.remove('dicaDisponivel');
            dica.classList.add('dicaGasta');
            dicaGasta=true;
        }
    });

});

