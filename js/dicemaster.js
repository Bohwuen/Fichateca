/* =========================================================
   FICHATECA - Generador de Skill Sheet para DiceMaster
   ========================================================= */

// -----------------------------------------------------------
// GENERADOR DE GUIDS
// -----------------------------------------------------------
const GUID_PREFIJO = "F1CHA7EC";
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

        const Skill = {
            skillModifiers: {},
            skillPosition: parseInt(Fila.skillPosition, 10),
            guid: Guid,
            author: "Fichateca",
            maxRank: 5,
            desc: Fila.desc,
            type: Fila.type,
            name: Fila.name,
            showOnMenu: Fila.showOnMenu === "1",
            canEdit: Fila.canEdit === "1",
            icon: parsearIcono(Fila.icon),
            expanded: true,
            rank: 0
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
            Skill.skillModifiers = { "1": GuidObjetivo };
        }
    });

    return Resultado;
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