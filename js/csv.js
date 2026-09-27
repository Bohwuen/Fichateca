/* =========================================================
   FICHATECA - Lector de CSVs
   ========================================================= */

const CACHE_CSV = {};

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
function parsearCSV(texto) {
    const filas = [];
    let fila = [];
    let campo = "";
    let entreComillas = false;

    for (let i = 0; i < texto.length; i++) {
        const c = texto[i];

        if (entreComillas) {
            if (c === '"') {
                if (texto[i + 1] === '"') { campo += '"'; i++; }
                else entreComillas = false;
            } else {
                campo += c;
            }
        } else {
            if (c === '"') {
                entreComillas = true;
            } else if (c === ',') {
                fila.push(campo); campo = "";
            } else if (c === '\n' || c === '\r') {
                if (c === '\r' && texto[i + 1] === '\n') i++;
                fila.push(campo); campo = "";
                if (fila.length > 1 || fila[0] !== "") filas.push(fila);
                fila = [];
            } else {
                campo += c;
            }
        }
    }
    // Última fila si no terminó con salto de línea
    if (campo !== "" || fila.length > 0) {
        fila.push(campo);
        if (fila.length > 1 || fila[0] !== "") filas.push(fila);
    }

    if (filas.length === 0) return [];

    const cabecera = filas[0].map(h => h.trim());
    const resultado = [];

    for (let i = 1; i < filas.length; i++) {
        const obj = {};
        cabecera.forEach((col, idx) => {
            obj[col] = (filas[i][idx] || "").trim();
        });
        resultado.push(obj);
    }

    return resultado;
}

/**
 * Carga un CSV (con caché). Devuelve una promesa con el array de objetos.
 * @param {string} ruta - ruta relativa al CSV
 * @returns {Promise<Array<Object>>}
 */
function cargarCSV(ruta) {
    if (CACHE_CSV[ruta]) {
        return Promise.resolve(CACHE_CSV[ruta]);
    }
    return fetch(ruta)
        .then(resp => {
            if (!resp.ok) throw new Error("No se pudo cargar " + ruta + " (HTTP " + resp.status + ")");
            return resp.text();
        })
        .then(texto => {
            const datos = parsearCSV(texto);
            CACHE_CSV[ruta] = datos;
            return datos;
        });
}

/**
 * Carga varios CSVs a la vez.
 * @param {Object} mapa - { clave: "ruta/al/csv.csv", ... }
 * @returns {Promise<Object>} - { clave: [filas], ... }
 */
function cargarVariosCSV(mapa) {
    const claves = Object.keys(mapa);
    return Promise.all(claves.map(k => cargarCSV(mapa[k])))
        .then(resultados => {
            const salida = {};
            claves.forEach((k, i) => salida[k] = resultados[i]);
            return salida;
        });
}