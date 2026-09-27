/* =========================================================
   FICHATECA - Motor de reglas
   ========================================================= */

// -----------------------------------------------------------
// RUTAS DE CSVs
// -----------------------------------------------------------
const RUTAS_CSV = {
    razas:               "datos/razas.csv",
    subrazas:            "datos/subrazas.csv",
    clases:              "datos/clases.csv",
    demonios:            "datos/demonios.csv",
    bonosRaciales:       "datos/bonos_raciales.csv",
    bonosClase:          "datos/bonos_clase.csv",
    bonosTransformacion: "datos/bonos_transformacion.csv",
    racialesEspeciales:  "datos/raciales_especiales.csv",
    magias:              "datos/magias.csv",
    armasHabilidades:    "datos/armas_habilidades.csv",
    profesiones:         "datos/profesiones.csv",
    conocimientos:       "datos/conocimientos.csv",
};

// -----------------------------------------------------------
// COSTES (constantes del sistema)
// -----------------------------------------------------------
const COSTES = {
    atributo:     4,
    defensa:      3,
    habilidad:    2,
    magia:        3,
    mye:          3,
    habilidadArma:3,
    profesion:    2,
    conocimiento: 2,
    nivel:        7      // puntos de trasfondo por subir nivel
};

const PT_INICIAL = 20;

// -----------------------------------------------------------
// CARGA INICIAL
// -----------------------------------------------------------
let DATOS = null;

function cargarDatosMotor() {
    // Ajustamos rutas al prefijo (para subcarpetas)
    const prefijo = window.RUTA_BASE || "";
    const mapa = {};
    for (const clave in RUTAS_CSV) {
        mapa[clave] = prefijo + RUTAS_CSV[clave];
    }
    return cargarVariosCSV(mapa).then(d => {
        DATOS = d;
        return d;
    });
}

// -----------------------------------------------------------
// CONSULTAS SOBRE CSVs
// -----------------------------------------------------------

/**
 * Devuelve las subrazas de una raza dada.
 */
function subrazasDe(razaId) {
    if (!DATOS) return [];
    return DATOS.subrazas.filter(s => s.raza_id === razaId);
}

/**
 * Devuelve los bonos aplicables a una ficha concreta.
 * @param {Object} ficha - { raza, subraza, clase, transformacion }
 * @returns {Object} - { columna: valorTotal }
 */
function calcularBonos(ficha) {
    const acumulado = {};

    function sumar(filas) {
        filas.forEach(f => {
            const col = f.columna;
            const val = parseInt(f.valor, 10);
            if (!col || isNaN(val)) return;
            acumulado[col] = (acumulado[col] || 0) + val;
        });
    }

    // Origen racial: si hay subraza, se usa subraza; si no, la raza.
    const origenRacial = ficha.subraza || ficha.raza;
    if (origenRacial) {
        sumar(DATOS.bonosRaciales.filter(b => b.origen_id === origenRacial));
    }

    // Bonos de clase
    if (ficha.clase) {
        sumar(DATOS.bonosClase.filter(b => b.clase_id === ficha.clase));
    }

    // Bonos de transformación activa
    if (ficha.transformacion) {
        sumar(DATOS.bonosTransformacion.filter(b => b.transformacion_id === ficha.transformacion));
    }

    return acumulado;
}

/**
 * Devuelve la descripción de raciales especiales de una raza/subraza.
 */
function racialesEspecialesDe(origenId) {
    if (!DATOS) return "";
    const fila = DATOS.racialesEspeciales.find(r => r.origen_id === origenId);
    return fila ? fila.descripcion : "";
}

// -----------------------------------------------------------
// ESTADO DE LA FICHA (localStorage)
// -----------------------------------------------------------

const CLAVE_FICHAS = "fichateca_fichas";

/**
 * Devuelve todas las fichas guardadas como array.
 */
function obtenerFichas() {
    const txt = localStorage.getItem(CLAVE_FICHAS);
    return txt ? JSON.parse(txt) : [];
}

/**
 * Guarda o actualiza una ficha. Si lleva `id`, reemplaza; si no, crea.
 * Devuelve el id.
 */
function guardarFicha(ficha) {
    const fichas = obtenerFichas();
    if (!ficha.id) {
        ficha.id = "f_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        ficha.fechaCreacion = new Date().toISOString();
        fichas.push(ficha);
    } else {
        const i = fichas.findIndex(f => f.id === ficha.id);
        if (i >= 0) fichas[i] = ficha;
        else fichas.push(ficha);
    }
    localStorage.setItem(CLAVE_FICHAS, JSON.stringify(fichas));
    return ficha.id;
}

/**
 * Devuelve una ficha por id, o null.
 */
function obtenerFicha(id) {
    return obtenerFichas().find(f => f.id === id) || null;
}

/**
 * Borra una ficha por id.
 */
function borrarFicha(id) {
    const fichas = obtenerFichas().filter(f => f.id !== id);
    localStorage.setItem(CLAVE_FICHAS, JSON.stringify(fichas));
}

/**
 * Crea una ficha en blanco con valores por defecto.
 */
function fichaEnBlanco() {
    return {
        id: null,
        nombre: "",
        apellidos: "",
        titulo: "",
        nacimiento: "",
        faccion: "",
        alineamiento: "",
        raza: "",
        subraza: "",
        clase: "",
        nivel: 1,
        experiencia: 0,
        pt: PT_INICIAL,
        atributos: {
            vigor: 1, destreza: 1, inteligencia: 1, voluntad: 1,
            percepcion: 1, aguante: 1, energia: 1
        },
        defensas: {
            parada: 0, esquivar: 0, bloqueo: 0, metamagia: 0
        },
        habilidades: {
            atletismo: 0, robo: 0, sigilo: 0, forzar_cerraduras: 0,
            subsistencia: 0, trepar_escalar: 0, buscar: 0, alerta: 0,
            aprendizaje: 0, interpretacion: 0, subterfugio: 0,
            trato_con_animales: 0, intimidacion: 0, carisma: 0
        },
        magia: {
            taumaturgia: 0, fe: 0, espiritualidad: 0, naturaleza: 0, caos: 0
        },
        mye: [],
        armasHabilidades: [],
        profesiones: [],
        conocimientos: [],
        resistencias: {
            res_fisica: 0, res_arcana: 0, res_fuego: 0, res_frio: 0,
            res_vil: 0, res_sombra: 0, res_naturaleza: 0, res_luz: 0
        },
        actual: {
            salud: 0, armadura: 0, velocidad: 0,
            tipoArmadura: "", escudo: false,
            yelmo: "", torso: "", manos: "", pies: "", capa: "", escudoNombre: ""
        },
        descripcion: "",
        trasfondo: "",
        inventario: "",
        dinero: { oro: 0, plata: 0, cobre: 0 }
    };
}