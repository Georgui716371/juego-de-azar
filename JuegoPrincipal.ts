import { Boleto } from "./Boleto";
import { Bolilla } from "./Bolilla";

export class JuegoPrincipal {

    bolillas: Bolilla[] = [];
    bolillasGanadoras: Bolilla[] = [new Bolilla(2), new Bolilla(1), new Bolilla(3), new Bolilla(3), new Bolilla(4)];

    constructor() {
        for (let i = 0; i < 5; i++) {
            this.bolillas.push(new Bolilla(Math.floor(Math.random() * 5) + 1));
        }
    }

    obtenerAciertosBprincipal(boleto: Boleto): number {
        const bolillasBoleto = boleto.juegoPrincipal;
        let aciertos = 0;
        for (let i = 0; i < this.bolillas.length; i++) {
            
                console.log(`bolillasGanadoras ->${this.bolillasGanadoras[i].numero}`);
                console.log(`bolillasBoleto ->${bolillasBoleto[i].numero}`);
             
            if (this.bolillasGanadoras[i].numero === bolillasBoleto[i].numero) {

                aciertos++;
            }
        }
        return aciertos;
    }
}