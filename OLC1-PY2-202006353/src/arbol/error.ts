
export class Error {
  tipo: string;
  descripcion: string;
  linea: string;
  columna: string;

  constructor({ numero, tipo, descripcion, linea, columna }: { numero: string, tipo: string, descripcion: string, linea: string, columna: string }) {
    const valor = linea;
    const valor2 = columna;
    const valor3 = numero;
    Object.assign(this, {numero: valor3.toString(), tipo, descripcion, linea: valor.toString(), columna: valor2.toString()})
  }
}