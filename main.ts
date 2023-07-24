import { Boleto } from "./Boleto";
import { BoliSuerte } from "./BoliSuerte";
import { BoliYapa } from "./BoliYapa";
import { JuegoPrincipal } from "./JuegoPrincipal";
import { ListaEnlazada } from "./ListaEnlazada";
import { Participante } from "./Participante";
 

//  2,1,3,3,4

const MIN_VALUE = 1;
const MAX_VALUE = 5;

function simularJuegos( cantidadParticipantes: number, rangoJuegoPrincipal: { rangoInicial: number; rangoFinal: number }): void {
    const costoJuegoPrincipal = 3.5;
    const costoBoliYapa = 2;
    const costoBoliSuerte = 1.5;
    const premioJuegoPrincipal = 1000000;
    let ingresos = 0;
    const listaEnlazada = new ListaEnlazada();

    for (let i = 0; i < cantidadParticipantes; i++) {
        const juegoPrincipal = new JuegoPrincipal();
        const boliYapa = new BoliYapa(juegoPrincipal);
        const boliSuerte = new BoliSuerte(juegoPrincipal);
        const  costoTotalBoleto = costoJuegoPrincipal + (boliYapa ? costoBoliYapa : 0) + (boliSuerte ? costoBoliSuerte : 0);
        const boleto: Boleto = new Boleto(juegoPrincipal.bolillas, boliYapa.bolilla, boliSuerte.bolilla);
        const participante = new Participante(boleto);
        ingresos= ingresos + costoTotalBoleto;
        listaEnlazada.agregar(participante);
    }

    let ganadoresJuegoPrincipal5 = 0;
    let ganadoresJuegoPrincipal4 = 0;
    let ganadoresJuegoPrincipal3 = 0;
    let ganadoresBoliYapa = 0;
    let ganadoresBoliSuerte = 0;
     let contador=0;
    let premios = 0;

    let nodoActual = listaEnlazada.cabeza;
    while (nodoActual) {

        const boleto = nodoActual.participante.boleto;
        console.log(`boleto (${contador++}) ->${boleto.juegoPrincipal.map(bolilla => bolilla.numero)}`);
        console.log(`boleto.boliYapa ->${boleto.boliYapa?.numero}`);
        console.log(`boleto.boliSuerte ->${boleto.boliSuerte?.numero}`);
        console.log("-----------------------");
        
        const juegoPrincipal = new JuegoPrincipal();
        const aciertosJuegoPrincipal = juegoPrincipal.obtenerAciertosBprincipal(boleto);

        if (aciertosJuegoPrincipal === 5) {
            ganadoresJuegoPrincipal5++;
            premios += premioJuegoPrincipal / ganadoresJuegoPrincipal5;
        } else if (aciertosJuegoPrincipal === 4) {
            ganadoresJuegoPrincipal4++;
            premios += 30000;
        } else if (aciertosJuegoPrincipal === 3) {
            ganadoresJuegoPrincipal3++;
            premios += 10000;
        } else {
            // No ganó el juego principal, verificar Boli Yapa
            const boliYapa = new BoliYapa(juegoPrincipal);
            if (boleto.boliYapa && boliYapa.obtenerAciertos(boleto) === 1) {
                ganadoresBoliYapa++;
                premios += 0.25 * (premioJuegoPrincipal / ganadoresJuegoPrincipal5);
            } else {
                // No ganó la Boli Yapa, verificar Boli Suerte
                const boliSuerte = new BoliSuerte(juegoPrincipal);
                if (boleto.boliSuerte && boliSuerte.obtenerAciertosBsuerte(boleto) === 1) {
                    ganadoresBoliSuerte++;
                    premios += 10000;
                }
            }
        }

        nodoActual = nodoActual.siguiente;
    }

    const utilidad = ingresos - premios;

    console.log("Resultados obtenidos:");
    console.log(`Cantidad de participantes que lograron los 5 aciertos del Juego Principal: ${ganadoresJuegoPrincipal5}`);
    console.log(`Cantidad de participantes que lograron los 4 aciertos del Juego Principal: ${ganadoresJuegoPrincipal4}`);
    console.log(`Cantidad de participantes que lograron los 3 aciertos del Juego Principal: ${ganadoresJuegoPrincipal3}`);
    console.log(`Cantidad de participantes que ganaron con la Boli Yapa: ${ganadoresBoliYapa}`);
    console.log(`Cantidad de participantes que ganaron con la Boli Suerte: ${ganadoresBoliSuerte}`);
    console.log(`Total de premios en Soles repartidos: ${premios}`);
    console.log(`Ingresos de la empresa: ${ingresos}`);
    console.log(`Utilidad de la empresa: ${utilidad}`);
}


simularJuegos(5, { rangoInicial: MIN_VALUE, rangoFinal: MAX_VALUE });
