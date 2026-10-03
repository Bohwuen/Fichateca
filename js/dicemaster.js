/* =========================================================
   FICHATECA - Generador de Skill Sheet para DiceMaster
   ========================================================= */

// -----------------------------------------------------------
// GENERADOR DE GUIDS
// -----------------------------------------------------------
// -----------------------------------------------------------
// GUIDS REALES DEL ADDON (temporal para pruebas)
// -----------------------------------------------------------
const GUIDS_REALES = {
    "Vigor":               "05F1C282_16E78D29",
    "Destreza":            "05F1C282_16E78DCD",
    "Inteligencia":        "05F1C282_16E78E0A",
    "Voluntad":            "05F1C282_16E78E3C",
    "Percepción":          "05F1C282_16E7940D",
    "Carisma":             "05F1C282_18352A4B",
    "Aguante":             "05F1C282_16E78FC3",
    "Energía":             "05F1C282_16E79015",
    "Armadura":            "05F1C282_16E790F6",
    "Velocidad":           "05F1C282_16E79099",
    "Atletismo":           "05F1C282_16E7925F",
    "Sigilo":              "05F1C282_16E79544",
    "Juego de Manos":      "05F1C282_18352CB2",
    "Subsistencia":        "05F1C282_16E796D3",
    "Acrobacias":          "05F1C282_1836FF21",
    "Buscar":              "05F1C282_16E797D7",
    "Alerta":              "05F1C282_16E7985A",
    "Aprendizaje":         "05F1C282_16E799A1",
    "Interpretación":      "05F1C282_16E79909",
    "Subterfugio":         "05F1C282_18352E9D",
    "Trato con animales":  "05F1C282_18352B87",
    "Intimidación":        "05F1C282_16E7A0F9",
    "Diplomacia":          "05F1C282_18370027",
    "Taumaturgia":         "05F1C282_16E792FD",
    "Fe":                  "05F1C282_16F4F0B2",
    "Espiritualidad":      "05F1C282_16F4F14E",
    "Naturaleza":          "05F1C282_16F4F1AA",
    "Caos":                "05F1C282_16F4F1E7",
    "Parada y Bloqueo":    "05F1C282_183700C4",
    "Esquivar":            "05F1C282_16F4F3F5",
    "Abjuración/Metamagia": "05F1C282_16F4F587",
    "Espadas de una mano": "05F1C282_16F50092",
    "Espadas de dos manos": "05F1C282_16F50025",
    "Mazas de una mano":   "05F1C282_16F50131",
    "Mazas de dos manos":  "05F1C282_16F4FF83",
    "Hachas de una mano":  "05F1C282_16F500FE",
    "Hachas de dos manos": "05F1C282_16F4FE67",
    "Arcos":               "05F1C282_16F4FE37",
    "Armas de fuego":      "05F1C282_16F4FE07",
    "Armas Arrojadizas":   "05F1C282_16F4FD8F",
    "Ballestas":           "05F1C282_16F4FD31",
    "Bastones":            "05F1C282_16F4FD07",
    "Varitas":             "05F1C282_16F4FCC1",
    "Dagas":               "05F1C282_16F4FC79",
    "Armas de puño":       "05F1C282_16F4FBBB",
    "Armas de Asta":       "05F1C282_16F4FB94",
    "Gujas de Guerra":     "05F1C282_16F4FB0D",
    "Escudo":              "05F1C282_16F4FAD3",
    "Sin Armas":           "05F1C282_1837CFCE"
};

// -----------------------------------------------------------
// GENERADOR DE GUIDS
// -----------------------------------------------------------
const GUID_PREFIJO = "05F1C282";
const GUID_INICIAL = 0x16E78D29;
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

        const Guid = GUIDS_REALES[Fila.name] || nuevoGuid();
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
            Skill.skillModifiers[1] = GuidObjetivo;
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