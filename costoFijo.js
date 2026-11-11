import { normalize } from "path";

export class CostoFijo {
  #nombre;
  #monto;
  #categoria;
  #fecha;

  constructor(nombre, monto, categoria, fecha = null) {
    if (
      !nombre ||
      typeof nombre !== "string" ||
      nombre.trim() === "" ||
      !isNaN(Number(nombre))
    ) {
      throw new Error("El nombre que ingresaste no es valido");
    }
    if (typeof monto !== "number" || monto <= 0 || isNaN(monto)) {
      throw new TypeError("El monto ingresado no es valido");
    }
    this.#nombre = nombre;
    this.#monto = monto;
    this.#categoria = categoria;
    this.#fecha = fecha ? new Date(fecha) : new Date();
  }

  descripcion() {
    return `Nombre: ${this.#nombre} - Monto: ${this.#monto} Bs. - categoria: ${this.#categoria} - Fecha: ${this.#fecha.toLocaleDateString()}.`;
  }

  get monto() {
    return this.#monto;
  }
  get nombre() {
    return this.#nombre;
  }
  get categoria() {
    return this.#categoria;
  }
  get fecha() {
    return this.#fecha;
  }
}
