/* =========================================================
   FICHATECA - Motor Lua ↔ JS
   Convierte entre objetos JS y strings de tabla Lua.
   ========================================================= */

// -----------------------------------------------------------
// JS → STRING LUA
// -----------------------------------------------------------

/**
 * Serializa un objeto JS a un string con formato de tabla Lua.
 * Soporta: strings, números, booleanos, arrays, objetos anidados.
 *
 * @param {*} Valor - El valor a serializar.
 * @param {number} [Indentacion] - Nivel de indentación (uso interno).
 * @returns {string}
 */
function jsALua(Valor, Indentacion = 0) {
    const Sangria = "    ".repeat(Indentacion);
    const SangriaInterna = "    ".repeat(Indentacion + 1);

    // Strings
    if (typeof Valor === "string") {
        return '"' + escaparLuaString(Valor) + '"';
    }

    // Números y booleanos
    if (typeof Valor === "number" || typeof Valor === "boolean") {
        return String(Valor);
    }

    // Null / undefined → nil
    if (Valor === null || Valor === undefined) {
        return "nil";
    }

    // Arrays
    if (Array.isArray(Valor)) {
        if (Valor.length === 0) return "{}";
        const Lineas = Valor.map(Elemento =>
            SangriaInterna + jsALua(Elemento, Indentacion + 1)
        );
        return "{\n" + Lineas.join(",\n") + "\n" + Sangria + "}";
    }

    // Objetos
    if (typeof Valor === "object") {
        const Claves = Object.keys(Valor);
        if (Claves.length === 0) return "{}";
        const Lineas = Claves.map(Clave => {
            const ValorLua = jsALua(Valor[Clave], Indentacion + 1);
            return SangriaInterna + '["' + escaparLuaString(Clave) + '"] = ' + ValorLua;
        });
        return "{\n" + Lineas.join(",\n") + "\n" + Sangria + "}";
    }

    // Fallback (no debería pasar)
    return "nil";
}

/**
 * Escapa caracteres especiales para un string Lua.
 */
function escaparLuaString(Texto) {
    return String(Texto)
        .replace(/\\/g, "\\\\")     // \  → \\
        .replace(/"/g, '\\"')        // "  → \"
        .replace(/\n/g, "\\n")       // salto línea → \n
        .replace(/\r/g, "\\r");      // retorno → \r
}


// -----------------------------------------------------------
// BASE64
// -----------------------------------------------------------

/**
 * Codifica un string a Base64 (soporta UTF-8).
 * @param {string} Texto
 * @returns {string}
 */
function base64Encode(Texto) {
    // Convertimos el string a bytes UTF-8, luego a binario, luego a Base64
    const BytesUtf8 = new TextEncoder().encode(Texto);
    let Binario = "";
    BytesUtf8.forEach(Byte => {
        Binario += String.fromCharCode(Byte);
    });
    return btoa(Binario);
}

/**
 * Decodifica un string Base64 a texto (soporta UTF-8).
 * @param {string} Base64
 * @returns {string}
 */
function base64Decode(Base64) {
    const Binario = atob(Base64);
    const Bytes = new Uint8Array(Binario.length);
    for (let i = 0; i < Binario.length; i++) {
        Bytes[i] = Binario.charCodeAt(i);
    }
    return new TextDecoder().decode(Bytes);
}

// -----------------------------------------------------------
// STRING LUA → JS
// -----------------------------------------------------------

/**
 * Convierte un string con formato de tabla Lua a un objeto JS.
 * Soporta: tablas, strings (con escapes), números, booleanos, nil.
 * NO soporta: funciones, expresiones, comentarios largos.
 *
 * @param {string} Texto
 * @returns {*} Objeto JS (o el valor simple si el texto es "5", "true", etc.)
 */
function luaAJs(Texto) {
    const Lector = new LectorLua(Texto);
    const Resultado = Lector.parsearValor();
    return Resultado;
}

class LectorLua {
    constructor(Texto) {
        this.Texto = Texto;
        this.Pos = 0;
    }

    // -------- Utilidades --------

    verActual() {
        return this.Texto[this.Pos];
    }

    avanzar() {
        this.Pos++;
    }

    saltarEspacios() {
        while (this.Pos < this.Texto.length) {
            const C = this.Texto[this.Pos];
            if (C === " " || C === "\t" || C === "\n" || C === "\r") {
                this.Pos++;
            } else {
                break;
            }
        }
    }

    // -------- Parser principal --------

    parsearValor() {
        this.saltarEspacios();
        const C = this.verActual();

        if (C === "{") return this.parsearTabla();
        if (C === '"' || C === "'") return this.parsearString();
        if (C === "-" || (C >= "0" && C <= "9")) return this.parsearNumero();
        if (this.Texto.startsWith("true", this.Pos))  { this.Pos += 4; return true; }
        if (this.Texto.startsWith("false", this.Pos)) { this.Pos += 5; return false; }
        if (this.Texto.startsWith("nil", this.Pos))   { this.Pos += 3; return null; }

        throw new Error("Lua inválido en posición " + this.Pos + ": " + C);
    }

    parsearTabla() {
        this.avanzar(); // consumir {
        const Resultado = {};
        let IndiceArray = 1;
        let EsArray = true;

        while (true) {
            this.saltarEspacios();

            if (this.verActual() === "}") {
                this.avanzar();
                break;
            }

            // Ver si empieza con ["clave"] = ...
            if (this.verActual() === "[") {
                this.avanzar();
                this.saltarEspacios();
                const Clave = this.parsearString();
                this.saltarEspacios();
                if (this.verActual() !== "]") throw new Error("Falta ]");
                this.avanzar();
                this.saltarEspacios();
                if (this.verActual() !== "=") throw new Error("Falta =");
                this.avanzar();
                const Valor = this.parsearValor();
                Resultado[Clave] = Valor;
                EsArray = false;
            } else {
                // Valor suelto → array
                const Valor = this.parsearValor();
                Resultado[IndiceArray] = Valor;
                IndiceArray++;
            }

            this.saltarEspacios();
            if (this.verActual() === ",") {
                this.avanzar();
            }
        }

        // Si era un array puro (claves 1, 2, 3…), convertir a Array de verdad
        if (EsArray) {
            const Claves = Object.keys(Resultado);
            const EsSoloArray = Claves.every(K => /^\d+$/.test(K));
            if (EsSoloArray) {
                return Claves.map(K => Resultado[K]);
            }
        }

        return Resultado;
    }

    parsearString() {
        const Comilla = this.verActual();
        this.avanzar();
        let Resultado = "";

        while (true) {
            const C = this.verActual();
            if (C === undefined) throw new Error("String sin cerrar");

            if (C === "\\") {
                this.avanzar();
                const Sig = this.verActual();
                if (Sig === "n") Resultado += "\n";
                else if (Sig === "r") Resultado += "\r";
                else if (Sig === "t") Resultado += "\t";
                else if (Sig === '"') Resultado += '"';
                else if (Sig === "'") Resultado += "'";
                else if (Sig === "\\") Resultado += "\\";
                else Resultado += Sig;
                this.avanzar();
            } else if (C === Comilla) {
                this.avanzar();
                break;
            } else {
                Resultado += C;
                this.avanzar();
            }
        }

        return Resultado;
    }

    parsearNumero() {
        const Inicio = this.Pos;
        if (this.verActual() === "-") this.avanzar();
        while (this.Pos < this.Texto.length) {
            const C = this.Texto[this.Pos];
            if ((C >= "0" && C <= "9") || C === "." || C === "e" || C === "E" || C === "-" || C === "+") {
                this.Pos++;
            } else {
                break;
            }
        }
        const Numero = this.Texto.substring(Inicio, this.Pos);
        return Number(Numero);
    }
}