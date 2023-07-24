import { Nodo } from "./Nodo";
import { Participante } from "./Participante";

export class ListaEnlazada {
    cabeza: Nodo | null = null;
    cola: Nodo | null = null;

    agregar(participante: Participante) {
        const nuevoNodo = new Nodo(participante);

        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            this.cola!.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }
    }

    obtenerCantidadDeNodos(): number {
        let contador = 0;
        let nodoActual = this.cabeza;

        while (nodoActual) {
            contador++;
            nodoActual = nodoActual.siguiente;
        }

        return contador;
    }

    obtenerParticipantes(): Participante[] {
        const participantes: Participante[] = [];
        let nodoActual = this.cabeza;

        while (nodoActual) {
            participantes.push(nodoActual.participante);
            nodoActual = nodoActual.siguiente;
        }

        return participantes;
    }

   
    
}