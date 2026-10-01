/* =========================================================
   FICHATECA - Generadores de traits para DiceMaster
   ========================================================= */

// -----------------------------------------------------------
// TRAIT BASE (estructura común a todos los traits)
// -----------------------------------------------------------
function generarTraitBase(Nombre, Icono, Descripcion) {
    return {
        secret1Enabled: false,
        secret1Active: false,
        icon: Icono,
        usage: "PASSIVE",
        castTime: "NONE",
        effects: {
            removebuff: {
                name: "",
                count: 1
            },
            buff: {
                range: 0,
                blank: true,
                desc: "",
                cancelable: true,
                duration: 1,
                name: "",
                target: true,
                aoe: false,
                stackable: false,
                icon: "Interface/Icons/inv_misc_questionmark",
                skillRank: 0,
                statAmount: 0,
                stat: ""
            }
        },
        range: "NONE",
        desc: Descripcion,
        secret3Active: false,
        secret2Active: false,
        secret3Enabled: false,
        name: Nombre,
        approved: false,
        cooldown: "NONE",
        secret2Enabled: false
    };
}

// -----------------------------------------------------------
// TRAIT: RASGOS DE RAZA
// -----------------------------------------------------------
function generarTraitRaza(Ficha) {
    // 1. Averiguar el origen racial (subraza si existe, si no raza)
    const OrigenId = Ficha.subraza || Ficha.raza;
    if (!OrigenId) return null;

    // 2. Buscar el nombre visible del origen
    const NombreVisible = nombreVisibleDeOrigen(OrigenId);

    // 3. Sacar la descripción de raciales_especiales.csv
    const DescripcionBruta = racialesEspecialesDe(OrigenId) || "Sin raciales especiales.";

    // 4. Formatear la descripción con el estilo DiceMaster
    const DescripcionFormateada = formatearDescripcionTrait(
        "Características raciales",
        DescripcionBruta
    );

    // 5. Nombre del trait
    const NombreTrait = "Rasgos de Raza: " + NombreVisible;

    // 6. Icono
    const Icono = "Interface/Icons/ability_defend";

    // 7. Devolver el trait completo
    return generarTraitBase(NombreTrait, Icono, DescripcionFormateada);
}


// -----------------------------------------------------------
// UTILIDADES
// -----------------------------------------------------------

/**
 * Devuelve el nombre visible de una raza/subraza dado su id.
 */
function nombreVisibleDeOrigen(OrigenId) {
    if (!Datos) return OrigenId;

    // Buscar en razas
    const Raza = Datos.razas.find(R => R.id === OrigenId);
    if (Raza) return Raza.nombre;

    // Buscar en subrazas
    const Subraza = Datos.subrazas.find(S => S.id === OrigenId);
    if (Subraza) {
        // Devolver "Raza Subraza" para que quede claro
        const RazaPadre = Datos.razas.find(R => R.id === Subraza.raza_id);
        if (RazaPadre) return RazaPadre.nombre + " de " + Subraza.nombre;
        return Subraza.nombre;
    }

    return OrigenId;
}

/**
 * Formatea una descripción al estilo DiceMaster.
 * Añade el <color=ffffff>, el título, y separa por saltos de línea.
 */
function formatearDescripcionTrait(Titulo, Texto) {
    // Separar por " | " que es lo que usamos en raciales_especiales.csv
    const Partes = Texto
        .split(" | ")
        .map(P => P.trim())
        .filter(P => P.length > 0);

    let Desc = "<color=ffffff>" + Titulo + ":\n\n";

    Partes.forEach(Parte => {
        Desc += "<*> " + Parte + "\n";
    });

    Desc += "</color>";
    return Desc;
}

// -----------------------------------------------------------
// TRAIT: RASGOS DE CLASE
// -----------------------------------------------------------
function generarTraitClase(Ficha) {
    if (!Ficha.clase) return null;

    const NombreClase = nombreVisibleDeClase(Ficha.clase);
    const NombreTrait = "Rasgos de Clase: " + NombreClase;

    // Descripción ficticia por ahora
    const Descripcion = "<color=ffffff>Características de Clase:\n\n<*> Habilidad característica de " + NombreClase + "\n</color>";

    const Icono = iconoDeClase(Ficha.clase);

    return generarTraitBase(NombreTrait, Icono, Descripcion);
}

// -----------------------------------------------------------
// TRAIT: ESTADÍSTICAS
// -----------------------------------------------------------
function generarTraitEstadisticas(Ficha) {
    const NombreTrait = "Estadísticas";
    const Descripcion = "<color=ffffff>Sin datos.</color>";
    const Icono = "Interface/Icons/70_professions_scroll_03";

    return generarTraitBase(NombreTrait, Icono, Descripcion);
}

// -----------------------------------------------------------
// TRAIT: PROFESIONES Y CONOCIMIENTOS
// -----------------------------------------------------------
function generarTraitProfesiones(Ficha) {
    const NombreTrait = "Profesiones y conocimientos";
    const Descripcion = "<color=ffffff>Sin datos.</color>";
    const Icono = "Interface/Icons/achievement_guildperk_workingovertime";

    return generarTraitBase(NombreTrait, Icono, Descripcion);
}

// -----------------------------------------------------------
// TRAIT: CONOCIMIENTO EN MAGIA Y ESTILOS
// -----------------------------------------------------------
function generarTraitMagiaEstilos(Ficha) {
    const NombreTrait = "Conocimiento en Magia y estilos de combate";
    const Descripcion = "<color=ffffff>Sin datos.</color>";
    const Icono = "Interface/Icons/spell_holy_arcaneintellect";

    return generarTraitBase(NombreTrait, Icono, Descripcion);
}

// -----------------------------------------------------------
// UTILIDADES DE CLASE
// -----------------------------------------------------------

function nombreVisibleDeClase(ClaseId) {
    if (!Datos) return ClaseId;
    const Clase = Datos.clases.find(C => C.id === ClaseId);
    return Clase ? Clase.nombre : ClaseId;
}

const ICONOS_CLASE = {
    guerrero:         "Interface/Icons/classicon_warrior",
    cazador:          "Interface/Icons/classicon_hunter",
    chaman:           "Interface/Icons/classicon_shaman",
    mago:             "Interface/Icons/classicon_mage",
    brujo:            "Interface/Icons/classicon_warlock",
    sacerdote:        "Interface/Icons/classicon_priest",
    paladin:          "Interface/Icons/classicon_paladin",
    picaro:           "Interface/Icons/classicon_rogue",
    druida:           "Interface/Icons/classicon_druid",
    caballero_muerte: "Interface/Icons/spell_deathknight_classicon",
    cazador_demonios: "Interface/Icons/classicon_demonhunter",
    evocador:         "Interface/Icons/classicon_evoker",
    monje:            "Interface/Icons/classicon_monk"
};

function iconoDeClase(ClaseId) {
    return ICONOS_CLASE[ClaseId] || "Interface/Icons/inv_misc_questionmark";
}