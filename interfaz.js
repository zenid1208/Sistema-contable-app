import readline from "readline";
import { CostoFijo } from "./costoFijo.js";
import { CostoVariable } from "./costoVariable.js";
import { GestorDeCostos } from "./gestorDeCostos.js";
import { normalize } from "path";

const gestor = new GestorDeCostos();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pedirDatosCosto = (tipo) => {
  const pedirNombre = () => {
    rl.question(`Nombre: `, (nombre) => {
      if (!nombre || nombre.trim() === "" || !isNaN(Number(nombre))) {
        console.log("El nombre ingresado no es valido.");
        return pedirNombre();
      }
      pedirMonto(nombre);
    });
  };
  const pedirMonto = (nombre) => {
    rl.question("Monto: ", (monto) => {
      const montoNumerico = parseFloat(monto);
      if (montoNumerico < 0 || isNaN(montoNumerico)) {
        console.log("El monto ingreasado no es valido.");
        return pedirMonto(nombre);
      }
      pedirCategoria(nombre, montoNumerico);
    });
  };
  const pedirCategoria = (nombre, montoNumerico) => {
    rl.question("Categoria: ", (categoria) => {
      if (!categoria || categoria.trim() === "" || !isNaN(Number(categoria))) {
        console.log("La categoria ingresada no es valida.");
        return pedirCategoria(nombre, montoNumerico);
      }

      try {
        const nuevoCosto =
          tipo === "fijo"
            ? new CostoFijo(nombre, montoNumerico, categoria)
            : new CostoVariable(nombre, montoNumerico, categoria);

        gestor.agregarCosto(tipo, nuevoCosto);
      } catch (error) {
        console.log(`Error al agregar el costo`, error.message);
      }
      mostrarMenu();
    });
  };
  pedirNombre();
};

const eliminarDatosCosto = (tipo) => {
  gestor.mostrarCostos(tipo);

  rl.question(`Que dato ${tipo} quieres eliminar: `, (id) => {
    if (id === "salir") {
      return mostrarMenu();
    }
    const idUsuario = parseFloat(id);
    if (!idUsuario || isNaN(idUsuario) || idUsuario <= 0) {
      console.log(`Ingresa un valor valido.`);
      return eliminarDatosCosto(tipo);
    }
    const exito = gestor.eliminarCosto(tipo, idUsuario);

    if (exito) {
      return mostrarMenu();
    } else {
      console.log(`Asegurate de que los datos que ingresaste sean correctos.`);
      return eliminarDatosCosto(tipo);
    }
  });
};
const mostrarMenu = () => {
  console.log("---SISTEMA CONTABLE---");
  console.log("1. Agregar costo fijo---");
  console.log("2. Agregar costo variable---");
  console.log("3. Mostrar costos fijos---");
  console.log("4. Mostrar costos variables---");
  console.log("5. Eliminar costo fijo---");
  console.log("6. Eliminar costo variable---");
  console.log("7. Calcular costo fijo---");
  console.log("8. Calcular costo variable---");
  console.log("9. Calcular costo total---");

  rl.question(">", (respuesta) => {
    if (respuesta === "1") {
      return pedirDatosCosto("fijo");
    }
    if (respuesta === "2") {
      return pedirDatosCosto("variable");
    }
    if (respuesta === "3") {
      gestor.mostrarCostos("fijo");
      return mostrarMenu();
    }
    if (respuesta === "4") {
      gestor.mostrarCostos("variable");
      return mostrarMenu();
    }
    if (respuesta === "5") {
      return eliminarDatosCosto("fijo");
    }
    if (respuesta === "6") {
      return eliminarDatosCosto("variable");
    }
    if (respuesta === "7") {
      gestor.calcularTotal("fijo");
      return mostrarMenu();
    }
    if (respuesta === "8") {
      gestor.calcularTotal("variable");
      return mostrarMenu();
    }
    if (respuesta === "9") {
      gestor.calcularGastototal();
      return mostrarMenu();
    } else {
      console.log("Opcion invalida!");
      return mostrarMenu();
    }
  });
};
mostrarMenu();
