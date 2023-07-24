import { Participante } from "./Participante";

export class Nodo {
    constructor(public participante: Participante, public siguiente: Nodo | null = null) { }
}