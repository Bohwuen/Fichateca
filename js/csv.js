/* =========================================================
   FICHATECA - Lector de CSVs
   ========================================================= */

const CacheCsv = {};

/**
 * Convierte el texto de un CSV en un array de objetos.
 * La primera línea se interpreta como cabecera.
 *
 * Soporta:
 *  - Separador por coma
 *  - Valores entre comillas dobles "..." (con comas dentro)
 *  - Saltos de línea \n o \r\n
 *
 * @param {string} texto
 * @returns {Array<Object>}
 */
function parsearCSV(Texto) {
    const Filas = [];
    let Fila = [];
    let Campo = "";
    let EntreComillas = false;

    for (let Indice = 0; Indice < Texto.length; Indice++) {
        const Caracter = Texto[Indice];

        if (EntreComillas) {
            if (Caracter === '"') {
                if (Texto[Indice + 1] === '"') { Campo += '"'; Indice++; }
                else EntreComillas = false;
            } else {
                Campo += Caracter;
            }
        } else {
            if (Caracter === '"') {
                EntreComillas = true;
            } else if (Caracter === ',') {
                Fila.push(Campo); Campo = "";
            } else if (Caracter === '\n' || Caracter === '\r') {
                if (Caracter === '\r' && Texto[Indice + 1] === '\n') Indice++;
                Fila.push(Campo); Campo = "";
                if (Fila.length > 1 || Fila[0] !== "") Filas.push(Fila);
                Fila = [];
            } else {
                Campo += Caracter;
            }
        }
    }
    // Última fila si no terminó con salto de línea
    if (Campo !== "" || Fila.length > 0) {
        Fila.push(Campo);
        if (Fila.length > 1 || Fila[0] !== "") Filas.push(Fila);
    }

    if (Filas.length === 0) return [];

    const Cabecera = Filas[0].map(Columna => Columna.trim());
    const Resultado = [];

    for (let Indice = 1; Indice < Filas.length; Indice++) {
        const Objeto = {};
        Cabecera.forEach((Columna, IndiceColumna) => {
            Objeto[Columna] = (Filas[Indice][IndiceColumna] || "").trim();
        });
        Resultado.push(Objeto);
    }

    return Resultado;
}

/**
 * Carga un CSV (con caché). Devuelve una promesa con el array de objetos.
 * @param {string} ruta - ruta relativa al CSV
 * @returns {Promise<Array<Object>>}
 */
function cargarCSV(Ruta) {
    if (CacheCsv[Ruta]) {
        return Promise.resolve(CacheCsv[Ruta]);
    }
    return fetch(Ruta)
        .then(Respuesta => {
            if (!Respuesta.ok) throw new Error("No se pudo cargar " + Ruta + " (HTTP " + Respuesta.status + ")");
            return Respuesta.text();
        })
        .then(Texto => {
            const Datos = parsearCSV(Texto);
            CacheCsv[Ruta] = Datos;
            return Datos;
        });
}

/**
 * Carga varios CSVs a la vez.
 * @param {Object} mapa - { clave: "ruta/al/csv.csv", ... }
 * @returns {Promise<Object>} - { clave: [filas], ... }
 */
function cargarVariosCSV(Mapa) {
    const Claves = Object.keys(Mapa);
    return Promise.all(Claves.map(Clave => cargarCSV(Mapa[Clave])))
        .then(Resultados => {
            const Salida = {};
            Claves.forEach((Clave, Indice) => Salida[Clave] = Resultados[Indice]);
            return Salida;
        });
}