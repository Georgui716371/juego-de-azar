import { Boleto } from "./Boleto";
import { Bolilla } from "./Bolilla";
import { JuegoPrincipal } from "./JuegoPrincipal";


export class BoliYapa {
    bolilla: Bolilla;

    constructor(juegoPrincipal: JuegoPrincipal) {
        this.bolilla = new Bolilla(Math.floor(Math.random() * juegoPrincipal.bolillas.length) + 1);
    }

    obtenerAciertos(boleto: Boleto): number {
        const bolillasBoleto = boleto.boliYapa;
        if (!bolillasBoleto) return 0;
        const bolillaBoliYapa = this.bolilla;
        return bolillasBoleto.numero === bolillaBoliYapa.numero ? 1 : 0;
    }
}
