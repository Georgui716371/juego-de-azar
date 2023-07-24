import { Bolilla } from "./Bolilla";

export class Boleto {
    constructor(public juegoPrincipal: Bolilla[], public boliYapa?: Bolilla, public boliSuerte?: Bolilla) { }
}