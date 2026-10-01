/* =========================================================
   FICHATECA - Motor de reglas
   ========================================================= */

// -----------------------------------------------------------
// RUTAS DE CSVs
// -----------------------------------------------------------
const RutasCsv = {
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
    skillsDicemaster: "datos/skills_dicemaster.csv",
};

// -----------------------------------------------------------
// COSTES (constantes del sistema)
// -----------------------------------------------------------
const Costes = {
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

const PtInicial = 20;

// -----------------------------------------------------------
// CARGA INICIAL
// -----------------------------------------------------------
let Datos = null;

function cargarDatosMotor() {
    // Ajustamos rutas al prefijo (para subcarpetas)
    const Prefijo = window.RUTA_BASE || "";
    const Mapa = {};
    for (const Clave in RutasCsv) {
        Mapa[Clave] = Prefijo + RutasCsv[Clave];
    }
    return cargarVariosCSV(Mapa).then(DatosCargados => {
        Datos = DatosCargados;
        return DatosCargados;
    });
}

// -----------------------------------------------------------
// CONSULTAS SOBRE CSVs
// -----------------------------------------------------------

/**
 * Devuelve las subrazas de una raza dada.
 */
function subrazasDe(RazaId) {
    if (!Datos) return [];
    return Datos.subrazas.filter(Subraza => Subraza.raza_id === RazaId);
}

/**
 * Devuelve los bonos aplicables a una ficha concreta.
 * @param {Object} ficha - { raza, subraza, clase, transformacion }
 * @returns {Object} - { columna: valorTotal }
 */
function calcularBonos(Ficha) {
    const Acumulado = {};

    function sumar(Filas) {
        Filas.forEach(Fila => {
            const Columna = Fila.columna;
            const Valor = parseInt(Fila.valor, 10);
            if (!Columna || isNaN(Valor)) return;
            Acumulado[Columna] = (Acumulado[Columna] || 0) + Valor;
        });
    }

    // Origen racial: si hay subraza, se usa subraza; si no, la raza.
    const OrigenRacial = Ficha.subraza || Ficha.raza;
    if (OrigenRacial) {
        sumar(Datos.bonosRaciales.filter(Bono => Bono.origen_id === OrigenRacial));
    }

    // Bonos de clase
    if (Ficha.clase) {
        sumar(Datos.bonosClase.filter(Bono => Bono.clase_id === Ficha.clase));
    }

    // Bonos de transformación activa
    if (Ficha.transformacion) {
        sumar(Datos.bonosTransformacion.filter(Bono => Bono.transformacion_id === Ficha.transformacion));
    }

    return Acumulado;
}

/**
 * Devuelve la descripción de raciales especiales de una raza/subraza.
 */
function racialesEspecialesDe(OrigenId) {
    if (!Datos) return "";
    const Fila = Datos.racialesEspeciales.find(Racial => Racial.origen_id === OrigenId);
    return Fila ? Fila.descripcion : "";
}

// -----------------------------------------------------------
// ESTADO DE LA FICHA (localStorage)
// -----------------------------------------------------------

const ClaveFichas = "fichateca_fichas";

/**
 * Devuelve todas las fichas guardadas como array.
 */
function obtenerFichas() {
    const Texto = localStorage.getItem(ClaveFichas);
    return Texto ? JSON.parse(Texto) : [];
}

/**
 * Guarda o actualiza una ficha. Si lleva `id`, reemplaza; si no, crea.
 * Devuelve el id.
 */
function guardarFicha(Ficha) {
    const Fichas = obtenerFichas();
    if (!Ficha.id) {
        Ficha.id = "f_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        Ficha.fechaCreacion = new Date().toISOString();
        Fichas.push(Ficha);
    } else {
        const Indice = Fichas.findIndex(Elemento => Elemento.id === Ficha.id);
        if (Indice >= 0) Fichas[Indice] = Ficha;
        else Fichas.push(Ficha);
    }
    localStorage.setItem(ClaveFichas, JSON.stringify(Fichas));
    return Ficha.id;
}

/**
 * Devuelve una ficha por id, o null.
 */
function obtenerFicha(Id) {
    return obtenerFichas().find(Ficha => Ficha.id === Id) || null;
}

/**
 * Borra una ficha por id.
 */
function borrarFicha(Id) {
    const Fichas = obtenerFichas().filter(Ficha => Ficha.id !== Id);
    localStorage.setItem(ClaveFichas, JSON.stringify(Fichas));
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
        transformacion: "",
        clase: "",
        nivel: 1,
        experiencia: 0,
        pt: PtInicial,
        pools: {
            pa: 5, pd: 3, ph: 10, phm: 1,
            pmye: 3, pha: 5, ppo: 2, pco: 5
        },
        atributos: {
            vigor: 1, destreza: 1, inteligencia: 1, voluntad: 1,
            percepcion: 1, carisma: 1, aguante: 1, energia: 1
        },
        defensas: {
            parada_bloqueo: 0, esquivar: 0, metamagia: 0
        },
        habilidades: {
            atletismo: 0, sigilo: 0, juego_de_manos: 0,
            subsistencia: 0, acrobacias: 0, buscar: 0, alerta: 0,
            aprendizaje: 0, interpretacion: 0, subterfugio: 0,
            trato_con_animales: 0, intimidacion: 0, diplomacia: 0
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
            saludExtra: 0,
            energiaExtra: 0,
            armadura: 0,
            tipoArmadura: "",
            escudo: false,
            yelmo: "", torso: "", manos: "", pies: "", capa: "", escudoNombre: ""
        },
        descripcion: "",
        trasfondo: "",
        inventario: "",
        dinero: { oro: 0, plata: 0, cobre: 0 }
    };
}

/**
 * Devuelve la velocidad de la ficha (subraza si existe, si no raza).
 */
function velocidadDe(Ficha) {
    if (!Ficha) return 0;

    // 1. Transformación activa (sobrescribe todo)
    if (Ficha.transformacion && Datos && Datos.razas) {
        const Transformacion = Datos.razas.find(Raza => Raza.id === Ficha.transformacion);
        if (Transformacion && Transformacion.velocidad) return parseInt(Transformacion.velocidad, 10) || 0;
    }

    // 2. Subraza
    if (Ficha.subraza) {
        const Subraza = subrazasDe(Ficha.raza).find(Elemento => Elemento.id === Ficha.subraza);
        if (Subraza && Subraza.velocidad) return parseInt(Subraza.velocidad, 10) || 0;
    }

    // 3. Raza
    if (Ficha.raza && Datos) {
        const Raza = Datos.razas.find(Elemento => Elemento.id === Ficha.raza);
        if (Raza && Raza.velocidad) return parseInt(Raza.velocidad, 10) || 0;
    }

    return 0;
}