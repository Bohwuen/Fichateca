/* =========================================================
   FICHATECA - Generador de Skill Sheet para DiceMaster
   ========================================================= */

// -----------------------------------------------------------
// GENERADOR DE GUIDS
// -----------------------------------------------------------
const GUID_PREFIJO = "05F1C282";
const GUID_INICIAL = 0x16E78D29;   // Número hex del primer guid
let guidContador = GUID_INICIAL;

function reiniciarGuids() {
    guidContador = GUID_INICIAL;
}

function nuevoGuid() {
    const hex = guidContador.toString(16).toUpperCase();
    guidContador++;
    return GUID_PREFIJO + "_" + hex;
}

// -----------------------------------------------------------
// GENERADOR DEL SKILL SHEET
// -----------------------------------------------------------

/**
 * Genera el array completo del skill sheet listo para DiceMaster.
 * @param {Object} Ficha - La ficha actual.
 * @returns {Array} Array de 54 entradas.
 */
function generarSkillSheet(Ficha) {
    if (!Datos || !Datos.skillsDicemaster) return [];

    reiniciarGuids();

    const Skills = Datos.skillsDicemaster;
    const Resultado = [];

    // 1ª pasada: construir todos los skills y guardar sus guids
    const mapaGuids = {};   // { "Fuerza": "F1CHA7EC_16E78D29", ... }

    Skills.forEach(Fila => {
        const EsHeader = Fila.header === "1";

        if (EsHeader) {
            Resultado.push({
                skillPosition: parseInt(Fila.skillPosition, 10),
                type: "header",
                name: Fila.name,
                author: "Fichateca"
            });
            return;
        }

        const Guid = nuevoGuid();
        mapaGuids[Fila.name] = Guid;

        const RankCalculado = calcularRankSkill(Fila.name, Ficha);

        // Velocidad: rank y maxRank = velocidad actual (informativo, no editable arriba)
        const MaxRankCalculado = (Fila.name === "Velocidad")
            ? RankCalculado
            : 5;

        const Skill = {
            skillModifiers: {},
            skillPosition: parseInt(Fila.skillPosition, 10),
            guid: Guid,
            author: "Fichateca",
            maxRank: MaxRankCalculado,
            desc: Fila.desc,
            type: Fila.type,
            name: Fila.name,
            showOnMenu: Fila.showOnMenu === "1",
            canEdit: Fila.canEdit === "1",
            icon: parsearIcono(Fila.icon),
            expanded: true,
            rank: RankCalculado
        };

        Resultado.push(Skill);
    });

    // 2ª pasada: rellenar los skillModifiers con los guids ya generados
    Resultado.forEach(Skill => {
        if (Skill.type === "header") return;

        const Fila = Skills.find(F => F.name === Skill.name);
        if (!Fila || !Fila.skillModifierTarget) return;

        const GuidObjetivo = mapaGuids[Fila.skillModifierTarget];
        if (GuidObjetivo) {
            Skill.skillModifiers = {};
            Skill.skillModifiers["1"] = GuidObjetivo;
        }
    });

    return Resultado;
}

// -----------------------------------------------------------
// MAPA DE RANKS
// Relaciona el nombre del skill (Dicemaster) con su valor en la ficha.
// -----------------------------------------------------------
function calcularRankSkill(NombreSkill, Ficha) {
    // ----- Atributos -----
    if (NombreSkill === "Vigor")        return Ficha.atributos.vigor;
    if (NombreSkill === "Destreza")     return Ficha.atributos.destreza;
    if (NombreSkill === "Inteligencia") return Ficha.atributos.inteligencia;
    if (NombreSkill === "Voluntad")     return Ficha.atributos.voluntad;
    if (NombreSkill === "Percepción")   return Ficha.atributos.percepcion;
    if (NombreSkill === "Carisma")      return Ficha.atributos.carisma;
    if (NombreSkill === "Aguante")      return Ficha.atributos.aguante;
    if (NombreSkill === "Energía")      return Ficha.atributos.energia;

    // ----- Especiales -----
    if (NombreSkill === "Armadura")     return Ficha.actual.armadura || 0;
    if (NombreSkill === "Velocidad")    return velocidadDe(Ficha);

    // ----- Habilidades -----
    if (NombreSkill === "Atletismo")           return Ficha.habilidades.atletismo;
    if (NombreSkill === "Sigilo")              return Ficha.habilidades.sigilo;
    if (NombreSkill === "Juego de Manos")      return Ficha.habilidades.juego_de_manos;
    if (NombreSkill === "Subsistencia")        return Ficha.habilidades.subsistencia;
    if (NombreSkill === "Acrobacias")          return Ficha.habilidades.acrobacias;
    if (NombreSkill === "Buscar")              return Ficha.habilidades.buscar;
    if (NombreSkill === "Alerta")              return Ficha.habilidades.alerta;
    if (NombreSkill === "Aprendizaje")         return Ficha.habilidades.aprendizaje;
    if (NombreSkill === "Interpretación")      return Ficha.habilidades.interpretacion;
    if (NombreSkill === "Subterfugio")         return Ficha.habilidades.subterfugio;
    if (NombreSkill === "Trato con animales")  return Ficha.habilidades.trato_con_animales;
    if (NombreSkill === "Intimidación")        return Ficha.habilidades.intimidacion;
    if (NombreSkill === "Diplomacia")          return Ficha.habilidades.diplomacia;

    // ----- Magia -----
    if (NombreSkill === "Taumaturgia")    return Ficha.magia.taumaturgia;
    if (NombreSkill === "Fe")             return Ficha.magia.fe;
    if (NombreSkill === "Espiritualidad") return Ficha.magia.espiritualidad;
    if (NombreSkill === "Naturaleza")     return Ficha.magia.naturaleza;
    if (NombreSkill === "Caos")           return Ficha.magia.caos;

    // ----- Defensas -----
    if (NombreSkill === "Parada y Bloqueo")      return Ficha.defensas.parada_bloqueo;
    if (NombreSkill === "Esquivar")              return Ficha.defensas.esquivar;
    if (NombreSkill === "Abjuración/Metamagia")  return Ficha.defensas.metamagia;

    // ----- Armas -----
    const MapaArmas = {
        "Espadas de una mano":  "espadas_1m",
        "Espadas de dos manos": "espadas_2m",
        "Mazas de una mano":    "mazas_1m",
        "Mazas de dos manos":   "mazas_2m",
        "Hachas de una mano":   "hachas_1m",
        "Hachas de dos manos":  "hachas_2m",
        "Arcos":                "arcos",
        "Armas de fuego":       "armas_fuego",
        "Armas Arrojadizas":    "armas_arrojadizas",
        "Ballestas":            "ballestas",
        "Bastones":             "bastones",
        "Varitas":              "varitas",
        "Dagas":                "dagas",
        "Armas de puño":        "armas_puno",
        "Armas de Asta":        "armas_asta",
        "Gujas de Guerra":      "gujas_guerra",
        "Escudo":               "escudo",
        "Sin Armas":            "sin_armas"
    };

    if (MapaArmas[NombreSkill]) {
        const IdArma = MapaArmas[NombreSkill];
        const Entrada = (Ficha.armasHabilidades || []).find(E => E.id === IdArma);
        return Entrada ? (Entrada.valor || 0) : 0;
    }

    // Si no hay mapa, devolvemos 0
    return 0;
}

// -----------------------------------------------------------
// UTILIDADES
// -----------------------------------------------------------

/**
 * Convierte el campo icono del CSV al formato correcto:
 *  - Si es numérico → número.
 *  - Si es texto → string.
 */
function parsearIcono(Icono) {
    if (!Icono) return 134400;   // icono por defecto (question mark)
    if (/^\d+$/.test(Icono)) return parseInt(Icono, 10);
    return Icono;
}