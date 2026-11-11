import db from "./db.js";

export class GestorDeCostos {
  constructor() {}

  agregarCosto(tipo, costo) {
    try {
      const tabla = tipo === "fijo" ? "costos_fijos" : "costos_variables";
      const stmt = db.prepare(
        `INSERT INTO ${tabla} (nombre, monto, categoria, fecha) VALUES (?, ?, ?, ?)`,
      );
      stmt.run(
        costo.nombre,
        costo.monto,
        costo.categoria,
        costo.fecha.toISOString(),
      );
      return {
        success: true,
        message: `Costo ${tipo}: "${costo.nombre}" se guardó correctamente.`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  mostrarCostos(tipo) {
    const tabla = tipo === "fijo" ? "costos_fijos" : "costos_variables";

    const list = db.prepare(`SELECT * FROM ${tabla}`).all();

    return list;
  }

  calcularTotal(tipo) {
    const tabla = tipo === "fijo" ? "costos_fijos" : "costos_variables";

    const resultado = db
      .prepare(`SELECT SUM(monto) AS total FROM ${tabla}`)
      .get();

    const total = resultado.total || 0;
    return total;
  }

  calcularGastototal() {
    const totali = this.calcularTotal(`fijo`) + this.calcularTotal(`variable`);
    return totali;
  }

  eliminarCosto(tipo, id) {
    try {
      const tabla =
        tipo === "fijo"
          ? "costos_fijos"
          : tipo === "variable"
            ? "costos_variables"
            : null;

      if (!tabla) {
        return {
          success: false,
          message: `No hay datos guardados.`,
        };
      }

      const costo = db
        .prepare(`SELECT nombre FROM ${tabla} WHERE id = ?`)
        .get(id);

      if (!costo) {
        return {
          success: false,
          message: `No hay costos guardados.`,
        };
      }

      db.prepare(`DELETE FROM ${tabla} WHERE id = ?`).run(id);

      return {
        success: true,
        message: `El costo: ${costo.nombre} se elimino correctamente.`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
