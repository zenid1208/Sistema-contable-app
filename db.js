import Database from "better-sqlite3";

const db = new Database("contabilidad.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS costos_fijos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    monto REAL NOT NULL,
    categoria TEXT NOT NULL,
    fecha TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS costos_variables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    monto REAL NOT NULL,
    categoria TEXT NOT NULL,
    fecha TEXT NOT NULL
  )
`);

export default db;
