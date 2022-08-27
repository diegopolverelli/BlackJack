
/*
2C = 2 de treboles
2D = 2 de diamantes
2H = 2 de corazones
2S = 2 de espadas
*/

let deck = [];
const tipos=['C','D','S','H'];
const especiales=['A','J','Q','K'];

let puntosJugador=0;
let puntosComputadora=0;
// referencias HTML:
const bntPedir=document.querySelector('#btnPedir');
const bntDetener=document.querySelector('#btnDetener');
const bntNuevo=document.querySelector('#btnNuevo');

const puntosHTML=document.querySelectorAll('small');
const divCartasJugador=document.querySelector('#jugador-cartas')
const divCartasComputadora=document.querySelector('#computadora-cartas')

// esta función crea la baraja nueva
const crearDeck=()=>{
    for(let i=2;i<=10;i++){
        for (let tipo of tipos){
            deck.push(i+tipo)
        }
    }

    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push(esp+tipo);
        }
    }

    // console.log(deck);
    deck=_.shuffle(deck);
    // console.log(deck);
    return deck;
}

crearDeck();


// esta funcion me permite pedir una carta
const pedirCarta = ()=>{

    if (deck.length===0){
        throw 'No hay más cartas en el mazo';
    }
    const carta=deck.pop();

    // console.log(deck); // debe estar en la baraja, y borrarla del array
    // console.log(carta); // debe estar en la baraja, y borrarla del array
    return carta;
}

// for (i=0;i<200;i++){
//     pedirCarta();
// };

//pedirCarta();

const valorCarta= (carta)=>{
    //const valor=carta[0];
    const valor=carta.substring(0,carta.length-1);

    return (isNaN(valor)) ?
           ( valor==='A') ? 11 : 10
           : valor*1;

/*
    console.log({valor});

    if (isNaN(valor)){
        puntos=(valor==='A') ? 11 : 10;
    }else{
        puntos=valor*1; // multiplico por 1 para pasarlo a number
    }
    console.log(puntos);
*/
}

// Lógica de la computadora:
const turnoComputadora = ( puntosMinimos )=>{

    do {
        const carta=pedirCarta();

        puntosComputadora=puntosComputadora+valorCarta(carta);
        console.log(puntosComputadora);
    
        puntosHTML[1].innerHTML=puntosComputadora;
        
        const imgCarta=document.createElement('img');
        imgCarta.src=`./assets/cartas/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos>21){
            break; // si el jugador se pasó, ejecuto solo una vez y salgo (porque ya gané con cualquier cosa... la compu)
        }
    
    }while((puntosComputadora <= puntosMinimos) && puntosMinimos<=21)

    setTimeout(()=>{  // si lo hago sin setTimeout, muestra el alerta antes que las cartas de la computadora
        if(puntosComputadora===puntosMinimos){
            alert('Empate...!!!');
        } else if(puntosMinimos>21){
            alert('La computadora gana');
        } else if (puntosComputadora>21) {
            alert('Jugador gana...!!!');
        } else {alert('La computadora gana');}
    }, 1500);

}

//turnoComputadora(16);

// Eventos:
bntPedir.addEventListener('click',function(){
    const carta=pedirCarta();

    puntosJugador=puntosJugador+valorCarta(carta);
    console.log(puntosJugador);

    puntosHTML[0].innerHTML=puntosJugador;
    
    const imgCarta=document.createElement('img');
    imgCarta.src=`./assets/cartas/${carta}.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador>21){
        console.warn("I'm sorry, fierita... cagassssstessss...!!!");
        bntPedir.disabled=true;
        bntDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador===21){
        console.warn('21, mostro...!!! que culo por favor...!!!');
        bntPedir.disabled=true;
        bntDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }

});

bntDetener.addEventListener('click',function(){
    bntPedir.disabled=true;
    bntDetener.disabled=true;
    turnoComputadora(puntosJugador);

});

bntNuevo.addEventListener('click',function(){
    deck=[];
    crearDeck();

    bntPedir.disabled=false;
    bntDetener.disabled=false;
    puntosComputadora=0;
    puntosJugador=0;
    puntosHTML[0].innerHTML=puntosJugador;
    puntosHTML[1].innerHTML=puntosComputadora;

    // let cartasParaBorrar = Array.prototype.slice.call(document.getElementsByClassName("carta"), 0);
  
    // for(element of cartasParaBorrar){
    //   console.log(element);
    //   element.remove();
    // }

    divCartasComputadora.innerHTML='';
    divCartasJugador.innerHTML='';

    console.clear();

});
