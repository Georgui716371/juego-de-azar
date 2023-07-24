import { Boleto } from "./Boleto";
import { Bolilla } from "./Bolilla";
import {JuegoPrincipal} from "./JuegoPrincipal";

export class BoliSuerte {
    bolilla: Bolilla;
    constructor(juegoPrincipal: JuegoPrincipal) {
        const sumaMinima =this.sumaMaximaArreglo(juegoPrincipal.bolillas.map(bolilla => bolilla.numero));
        const sumaMaxima = this.sumaMinimaArreglo(juegoPrincipal.bolillas.map(bolilla => bolilla.numero));
        this.bolilla = new Bolilla(Math.floor(Math.random() * (sumaMaxima - sumaMinima + 1)) + sumaMinima);
    }

    obtenerAciertosBsuerte(boleto: Boleto): number {
        const bolillasBoleto = boleto.boliSuerte;
        if (!bolillasBoleto) return 0;
        const bolillaBoliSuerte = this.bolilla;
        return bolillasBoleto.numero === bolillaBoliSuerte.numero ? 1 : 0;
    }
    
     sumaMaximaArreglo(arr: number[]): number {
        let maxCurrent: number = arr[0];
        let maxGlobal: number = arr[0];
    
        for (let i = 1; i < arr.length; i++) {
            maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
            maxGlobal = Math.max(maxGlobal, maxCurrent);
        }
        return maxGlobal;
    }

    sumaMinimaArreglo(arr: number[]): number {
        let minCurrent: number = arr[0];
        let minGlobal: number = arr[0];
    
        for (let i = 1; i < arr.length; i++) {
            minCurrent = Math.min(arr[i], minCurrent + arr[i]);
            minGlobal = Math.min(minGlobal, minCurrent);
        }
        return minGlobal;
    }
}