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
      console.log(`Costo ${tipo}: "${costo.nombre}" se guardó correctamente.`);
    } catch (error) {
      console.log("Error al guardar el costo: ", error.message);
    }
  }

  mostrarCostos(tipo) {
    const tabla = tipo === "fijo" ? "costos_fijos" : "costos_variables";
    console.log(`-- Costos ${tipo.toUpperCase()}S --`);

    const list = db.prepare(`SELECT * FROM ${tabla}`).all();

    if (list.length === 0) {
      console.log(`No hay costos ${tipo}s guardados.`);
      return;
    }

    list.forEach((costo) => {
      console.log(
        `ID: ${costo.id}. Nombre: ${costo.nombre} | Monto: ${costo.monto} Bs | Categoria: ${costo.categoria} | Fecha: ${costo.fecha}`,
      );
    });
  }

  calcularTotal(tipo) {
    const tabla = tipo === "fijo" ? "costos_fijos" : "costos_variables";

    const resultado = db
      .prepare(`SELECT SUM(monto) AS total FROM ${tabla}`)
      .get();

    const total = resultado.total || 0;
    console.log(`El gasto total ${tipo} es: ${total} Bs.`);
    return total;
  }

  calcularGastototal() {
    const totali = this.calcularTotal(`fijo`) + this.calcularTotal(`variable`);
    console.log(`El gasto total es: ${totali} Bs`);
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
        console.log("❌ Tipo de costo no válido. Usa 'fijo' o 'variable'.");
        return false;
      }

      const costo = db
        .prepare(`SELECT nombre FROM ${tabla} WHERE id = ?`)
        .get(id);

      if (!costo) {
        console.log(`No se encontró ningún costo con el ID ${id} en ${tipo}.`);
        return false;
      }

      db.prepare(`DELETE FROM ${tabla} WHERE id = ?`).run(id);

      console.log(`Costo ${tipo} "${costo.nombre}" se eliminó correctamente.`);
      return true;
    } catch (error) {
      console.log("Error al eliminar el costo:", error.message);
      return false;
    }
  }
}
