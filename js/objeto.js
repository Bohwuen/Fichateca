/* =========================================================
   FICHATECA - Motor del sistema de objetos
   ========================================================= */

// -----------------------------------------------------------
// CONSTANTES
// -----------------------------------------------------------
const CUALIDADES = [
    "Fuerza", "Destreza", "Inteligencia", "Voluntad",
    "Percepción", "Carisma", "Aguante", "Energía",
    "Armadura", "Velocidad"
];

const TIPOS_DANO = [
    "Físico", "Arcano", "de Frío", "de Fuego",
    "de Naturaleza", "de Sombra", "Sagrado", "Vil"
];

const DADOS = ["D4", "D6", "D8", "D10", "D12", "D20"];

const ESCUELAS = ["Arcano", "Fuego", "Hielo", "Naturaleza", "Sombra", "Sagrado", "Vil"];

const ATRIBUTOS = [
    "Fuerza", "Destreza", "Inteligencia", "Voluntad",
    "Percepción", "Carisma"
];

const ARMAS = [
    "Espadas de una mano", "Espadas de dos manos",
    "Mazas de una mano", "Mazas de dos manos",
    "Hachas de una mano", "Hachas de dos manos",
    "Arcos", "Ballestas", "Armas de fuego",
    "Armas arrojadizas", "Bastones", "Varitas",
    "Dagas", "Armas de puño", "Armas de asta",
    "Gujas de guerra", "Escudo", "Sin armas"
];

const PIEZAS_POR_MATERIAL = {
    tela:       ["cabeza", "pecho", "manos", "pies"],
    cuero:      ["cabeza", "pecho", "manos", "pies"],
    malla:      ["cabeza", "pecho", "manos", "pies"],
    placas:     ["cabeza", "pecho", "manos", "pies"],
    miscelanea: ["cabeza", "cuello", "cinturon", "anillo", "capa", "abalorio"]
};

function piezasDeMaterial(idMaterial) {
    const ids = PIEZAS_POR_MATERIAL[idMaterial] || [];
    if (!Datos) return [];
    const Todas = [
        ...(Datos.casillasArmadura || []),
        ...(Datos.complementosArmadura || [])
    ];
    return ids.map(id => Todas.find(p => p.id === id)).filter(Boolean);
}

const TIPOS_CONTENEDOR = {
    aumento_temporal: {
        nombre: "Aumento temporal",
        params: ["duracion"],
        factor: "duracion",
        disparador: "Uso",
        afijosValidos: [
            "aumento_cualidad", "armadura", "potenciar", "potenciar_magia",
            "res", "precision", "penetracion", "velocidad",
            "fuente_poder", "sanacion_fija"
        ]
    },
    invocacion: {
        nombre: "Invocación",
        params: ["criatura", "poder", "duracion"],
        factor: "duracion",
        disparador: "Al invocar",
        afijosValidos: null
    },
    hechizo_especial: {
        nombre: "Hechizo especial",
        params: ["coste", "duracion"],
        factor: null,
        disparador: "Al lanzar",
        afijosValidos: null
    },
    al_recibir_dano: {
        nombre: "Al recibir daño",
        params: [],
        factor: null,
        disparador: "Al recibir daño",
        afijosValidos: null
    },
    al_matar: {
        nombre: "Al matar",
        params: [],
        factor: null,
        disparador: "Al matar",
        afijosValidos: null
    },
    al_usar: {
        nombre: "Al usar",
        params: [],
        factor: null,
        disparador: "Al usar",
        afijosValidos: null
    },
    pasiva: {
        nombre: "Pasiva",
        params: [],
        factor: null,
        disparador: "Pasivo",
        afijosValidos: [
            "amplificar", "armadura", "potenciar", "potenciar_magia",
            "res", "precision", "penetracion", "velocidad",
            "fuente_poder", "sanacion_fija"
        ]
    }
};

// -----------------------------------------------------------
// ESTRUCTURA
// -----------------------------------------------------------
function objetoEnBlanco() {
    return {
        tipo: "objeto",
        nombre: "",
        calidad: "",
        material: "",
        casilla: "",
        pieza: "",
        tipoArma: "",
        tipoObjeto: "",
        efectos: [],
        contenedores: [],
        requisitos: [],
        descripcion: "",
        accion: "",
        precio: 0,
        peso: 0,
        ligado: false,
        unico: false,
        apilable: false,
        usable: false,
        equipable: false,
        contenedor: false,
        prevent: false,
        stack: 0,
        sonidoCoger: "",
        sonidoSoltar: "",
        tooltipDescription: ""
    };
}

function afijoEnBlanco() {
    return {
        id: "",
        cantidad: 1,
        duracion: 1,
        dado: "",
        tipoDano: "",
        cualidad: "",
        atributo: "",
        arma: "",
        escuela: ""
    };
}

function contenedorEnBlanco(tipo) {
    const def = TIPOS_CONTENEDOR[tipo];
    if (!def) return null;
    const c = { tipo: tipo, afijos: [] };
    if (def.params.includes("duracion"))     c.duracion = 1;
    if (def.params.includes("criatura"))     c.criatura = "";
    if (def.params.includes("poder"))        c.poder = 1;
    if (def.params.includes("coste"))        c.coste = 0;
    // Enfriamiento automático = Z × 2, se calcula al vuelo, no se guarda
    return c;
}

// -----------------------------------------------------------
// CONSULTAS CSV
// -----------------------------------------------------------
function filaEfecto(idEfecto, csvEfectos) {
    if (!csvEfectos) return null;
    return csvEfectos.find(e => e.id === idEfecto) || null;
}

function requiereCampo(fila, campo) {
    if (!fila) return false;
    return fila[campo] === "true";
}

function obtenerCosteRequisito(idRequisito) {
    if (!Datos || !Datos.requisitos) return 0;
    const Fila = Datos.requisitos.find(R => R.id === idRequisito);
    return Fila ? parseInt(Fila.coste, 10) : 0;
}

function obtenerValorCalidad(idCalidad) {
    if (!Datos || !Datos.calidadesObjeto) return 0;
    const Fila = Datos.calidadesObjeto.find(C => C.id === idCalidad);
    return Fila ? parseInt(Fila.valor, 10) : 0;
}

function obtenerCosteDado(idAfijo, dado) {
    if (!Datos || !Datos.costesDado) return null;
    const Fila = Datos.costesDado.find(C => C.afijo_id === idAfijo);
    if (!Fila) return null;
    const Columna = dado.toLowerCase();
    const Valor = parseInt(Fila[Columna], 10);
    return isNaN(Valor) ? null : Valor;
}

// -----------------------------------------------------------
// ANÁLISIS DE AFIJO
// -----------------------------------------------------------
function analizarAfijo(fila) {
    const r = {
        pideCantidad:  fila && fila.requiere_cantidad === "true",
        pideDuracion:  fila && fila.requiere_duracion === "true",
        pideDado:      fila && fila.requiere_dado === "true",
        pideTipo:      fila && fila.requiere_tipo === "true",
        pideCualidad:  false,
        pideAtributo:  false,
        pideTipoDano:  false,
        pideArma:      false,
        pideEscuela:   false,
        pideCriatura:  false
    };
    if (!fila) return r;

    const id = (fila.id || "").toLowerCase();

    if (id === "amplificar" || id === "aumento_cualidad") r.pideCualidad = true;
    if (id === "aumentar") r.pideAtributo = true;
    if (id === "dano" || id === "dano_fijo" || id === "potenciar" ||
        id === "res" || id === "secuela") r.pideTipoDano = true;
    if (id === "potenciar_marcial" || id === "precision_arma") r.pideArma = true;
    if (id === "silencio_escuela") r.pideEscuela = true;
    if (id === "invocacion") r.pideCriatura = true;

    return r;
}

// -----------------------------------------------------------
// COSTES
// -----------------------------------------------------------
function costeAfijo(afijo, csvEfectos) {
    const fila = filaEfecto(afijo.id, csvEfectos);
    if (!fila) return 0;

    let costeBase = parseInt(fila.coste, 10) || 0;

    if (fila.requiere_dado === "true" && afijo.dado) {
        const costeDado = obtenerCosteDado(afijo.id, afijo.dado);
        if (costeDado !== null) costeBase = costeDado;
    }

    const X = (fila.requiere_cantidad === "true")
        ? (parseInt(afijo.cantidad, 10) || 1)
        : 1;

    const Z = (fila.requiere_duracion === "true")
        ? (parseInt(afijo.duracion, 10) || 1)
        : 1;

    return costeBase * X * Z;
}

function costeContenedor(cont, csvEfectos) {
    const def = TIPOS_CONTENEDOR[cont.tipo];
    if (!def) return 0;

    let sub = 0;

    // Suma de afijos internos (ignorando su Z)
    cont.afijos.forEach(af => {
        const afSinZ = Object.assign({}, af, { duracion: 1 });
        sub += costeAfijo(afSinZ, csvEfectos);
    });

    // Factor del contenedor
    if (def.factor === "duracion") {
        const Z = parseInt(cont.duracion, 10) || 1;
        sub = Math.round(sub * (Z / 5));
    }

    return sub;
}

function calcularTotalEfectos(objeto, csvEfectos) {
    if (!csvEfectos) return 0;
    let total = 0;
    objeto.efectos.forEach(af => { total += costeAfijo(af, csvEfectos); });
    (objeto.contenedores || []).forEach(cont => { total += costeContenedor(cont, csvEfectos); });
    return total;
}

function calcularTotalRequisitos(objeto) {
    let total = 0;
    objeto.requisitos.forEach(r => {
        const coste = obtenerCosteRequisito(r.id);
        const mult = parseInt(r.multiplicador, 10) || 0;
        total += coste * mult;
    });
    return total;
}

function calcularBalance(objeto, csvEfectos) {
    const totalEfectos = calcularTotalEfectos(objeto, csvEfectos);
    const totalRequisitos = calcularTotalRequisitos(objeto);
    const calidad = obtenerValorCalidad(objeto.calidad);
    const balance = totalEfectos + totalRequisitos + calidad;

    return {
        totalEfectos,
        totalRequisitos,
        calidad,
        balance,
        esBueno: balance >= 0,
        texto: balance < 0 ? "Objeto OP Nerfealo" : "Objeto Bueno"
    };
}

// -----------------------------------------------------------
// NOMBRES Y TOOLTIPS
// -----------------------------------------------------------
function obtenerNombreRequisito(idRequisito) {
    if (!Datos || !Datos.requisitos) return idRequisito;
    const Fila = Datos.requisitos.find(R => R.id === idRequisito);
    return Fila ? Fila.nombre : idRequisito;
}

function obtenerNombreCalidad(idCalidad) {
    if (!Datos || !Datos.calidadesObjeto) return idCalidad;
    const Fila = Datos.calidadesObjeto.find(C => C.id === idCalidad);
    return Fila ? Fila.nombre : idCalidad;
}

function obtenerNombreMaterial(idMaterial) {
    if (!Datos || !Datos.materialesArmadura) return "";
    const Fila = Datos.materialesArmadura.find(M => M.id === idMaterial);
    return Fila ? Fila.nombre : idMaterial;
}

function obtenerNombreCasilla(idCasilla) {
    if (!Datos) return idCasilla;
    let Fila = (Datos.casillasArmadura || []).find(C => C.id === idCasilla);
    if (!Fila) Fila = (Datos.complementosArmadura || []).find(C => C.id === idCasilla);
    return Fila ? Fila.nombre : idCasilla;
}

function obtenerNombreTipoArma(idTipoArma) {
    if (!Datos || !Datos.armas) return idTipoArma;
    const Fila = Datos.armas.find(A => A.id === idTipoArma);
    return Fila ? Fila.nombre : idTipoArma;
}

function obtenerNombreTipoObjeto(idTipo) {
    if (!Datos || !Datos.tiposObjeto) return idTipo;
    const Fila = Datos.tiposObjeto.find(T => T.id === idTipo);
    return Fila ? Fila.nombre : idTipo;
}

function generarTooltipIzquierdo(objeto) {
    if (objeto.tipo === "arma") return "Arma";
    if (objeto.tipo === "objeto") return "Objeto";
    if (objeto.tipo === "armadura") return obtenerNombreMaterial(objeto.material);
    return "";
}

function generarTooltipDerecho(objeto) {
    if (objeto.tipo === "arma") return obtenerNombreTipoArma(objeto.tipoArma);
    if (objeto.tipo === "objeto") return obtenerNombreTipoObjeto(objeto.tipoObjeto) || "";
    if (objeto.tipo === "armadura") return obtenerNombreCasilla(objeto.pieza);
    return "";
}

// -----------------------------------------------------------
// TEXTO DE EFECTOS
// -----------------------------------------------------------
function resolverNombreAfijo(afijo, csvEfectos) {
    const fila = filaEfecto(afijo.id, csvEfectos);
    if (!fila) return afijo.id;

        let nombre = fila.nombre;

    if (afijo.cualidad)  nombre += " " + afijo.cualidad;
    if (afijo.atributo)  nombre += " " + afijo.atributo;
    if (afijo.tipoDano)  nombre += " " + afijo.tipoDano;
    if (afijo.arma)      nombre += " " + afijo.arma;
    if (afijo.escuela)   nombre += " [" + afijo.escuela + "]";

    if (afijo.dado && afijo.cantidad) {
        nombre += " " + afijo.cantidad + afijo.dado;
    } else if (afijo.cantidad && afijo.cantidad > 1) {
        nombre += " ×" + afijo.cantidad;
    }

    if (afijo.duracion && afijo.duracion > 1) {
        nombre += " (" + afijo.duracion + " turnos)";
    }

    return nombre;
}

function generarTextoEfectos(objeto, csvEfectos) {
    const Lineas = [];
    Lineas.push("Requiere:");

    objeto.requisitos.forEach(r => {
        const Nombre = obtenerNombreRequisito(r.id);
        Lineas.push(Nombre + " " + (r.multiplicador || 1));
    });

    Lineas.push("Efectos:");

    objeto.efectos.forEach(e => {
        const Nombre = resolverNombreAfijo(e, csvEfectos);
        Lineas.push(Nombre);
    });

    // Contenedores
    (objeto.contenedores || []).forEach(cont => {
        const def = TIPOS_CONTENEDOR[cont.tipo];
        if (!def) return;

        const Z = parseInt(cont.duracion, 10) || 1;
        const Enfr = Z * 2;
        const Disparador = def.disparador || "Uso";

        Lineas.push(Disparador + ": durante " + Z + " turnos obtienes:");
        cont.afijos.forEach(af => {
            const Nombre = resolverNombreAfijo(af, csvEfectos);
            Lineas.push("- " + Nombre);
        });
        Lineas.push("(Y " + Enfr + " turnos de enfriamiento)");
    });

    return Lineas.join("\n");
}

// -----------------------------------------------------------
// VISTA PREVIA TRP3
// -----------------------------------------------------------
function generarPreviewTRP3(objeto, csvEfectos) {
    const Nombre = objeto.nombre || "[Sin nombre]";
    const TooltipIzq = generarTooltipIzquierdo(objeto);
    const TooltipDer = generarTooltipDerecho(objeto);
    const Efectos = generarTextoEfectos(objeto, csvEfectos);
    const Desc = objeto.descripcion || "";
    const Accion = objeto.accion || "";
    const Precio = objeto.precio || 0;

    const Lineas = [];
    Lineas.push(Nombre);
    Lineas.push(TooltipIzq + "                         " + TooltipDer);
    Lineas.push('"' + Efectos);

    if (Desc) {
        Lineas.push("");
        Lineas.push(Desc);
    }

    Lineas.push('"');

    if (Accion) Lineas.push("Usar: " + Accion);
    if (Precio) Lineas.push("🪙 " + Precio + " g");

    return Lineas.join("\n");
}

// -----------------------------------------------------------
// RENDERIZADO
// -----------------------------------------------------------
function pintarFilaEfecto(objeto, indice, contenedor, opciones) {
    const Efecto = objeto.efectos[indice];
    const Fila = filaEfecto(Efecto.id, opciones);
    const An = analizarAfijo(Fila);

    const div = document.createElement("div");
    div.className = "fila-efecto";

    let html = "";

    html += '<select data-tipo="efecto" data-indice="' + indice + '">';
    html += '<option value="">—</option>';
    opciones.forEach(op => {
        // Ocultar afijos exclusivos de contenedores
        if (op.id === "aumento_cualidad") return;
        const sel = (op.id === Efecto.id) ? " selected" : "";
        html += '<option value="' + op.id + '"' + sel + '>' + (op.nombre || op.id) + '</option>';
    });
    html += '</select>';

    if (An.pideCantidad) {
        html += ' <label title="Cantidad">X:</label>';
        html += ' <input type="number" min="1" max="99" value="' + (Efecto.cantidad || 1) +
                '" data-tipo="cantidad-efecto" data-indice="' + indice + '" style="width:3em">';
    }

    if (An.pideDuracion) {
        html += ' <label title="Duración en turnos">Z:</label>';
        html += ' <input type="number" min="1" max="99" value="' + (Efecto.duracion || 1) +
                '" data-tipo="duracion-efecto" data-indice="' + indice + '" style="width:3em">';
    }

    if (An.pideDado) {
        html += ' <select data-tipo="dado-efecto" data-indice="' + indice + '">';
        html += '<option value="">—</option>';
        DADOS.forEach(d => {
            const sel = (Efecto.dado === d) ? " selected" : "";
            html += '<option value="' + d + '"' + sel + '>' + d + '</option>';
        });
        html += '</select>';
    }

    if (An.pideTipoDano) {
        html += ' <select data-tipo="tipodano-efecto" data-indice="' + indice + '">';
        html += '<option value="">Tipo…</option>';
        TIPOS_DANO.forEach(t => {
            const sel = (Efecto.tipoDano === t) ? " selected" : "";
            html += '<option value="' + t + '"' + sel + '>' + t + '</option>';
        });
        html += '</select>';
    }

    if (An.pideCualidad) {
        html += ' <select data-tipo="cualidad-efecto" data-indice="' + indice + '">';
        html += '<option value="">Cualidad…</option>';
        CUALIDADES.forEach(c => {
            const sel = (Efecto.cualidad === c) ? " selected" : "";
            html += '<option value="' + c + '"' + sel + '>' + c + '</option>';
        });
        html += '</select>';
    }

            // Atributo
    if (An.pideAtributo) {
        html += ' <select data-tipo="atributo-efecto" data-indice="' + indice + '">';
        html += '<option value="">Atributo…</option>';
        ATRIBUTOS.forEach(a => {
            const sel = (Efecto.atributo === a) ? " selected" : "";
            html += '<option value="' + a + '"' + sel + '>' + a + '</option>';
        });
        html += '</select>';
    }

    // Arma
    if (An.pideArma) {
        html += ' <select data-tipo="arma-efecto" data-indice="' + indice + '">';
        html += '<option value="">Arma…</option>';
        ARMAS.forEach(a => {
            const sel = (Efecto.arma === a) ? " selected" : "";
            html += '<option value="' + a + '"' + sel + '>' + a + '</option>';
        });
        html += '</select>';
    }

    if (An.pideEscuela) {
        html += ' <select data-tipo="escuela-efecto" data-indice="' + indice + '">';
        html += '<option value="">Escuela…</option>';
        ESCUELAS.forEach(e => {
            const sel = (Efecto.escuela === e) ? " selected" : "";
            html += '<option value="' + e + '"' + sel + '>' + e + '</option>';
        });
        html += '</select>';
    }

    const coste = costeAfijo(Efecto, opciones);
    html += ' <span class="coste">' + (coste >= 0 ? "+" : "") + coste + '</span>';

    html += ' <button type="button" data-tipo="borrar-efecto" data-indice="' + indice + '">✕</button>';

    div.innerHTML = html;
    contenedor.appendChild(div);
}

function pintarFilaRequisito(objeto, indice, contenedor, opciones) {
    const Req = objeto.requisitos[indice];

    const div = document.createElement("div");
    div.className = "fila-requisito";
    div.style.marginBottom = "0.3em";

    let html = '<select data-tipo="requisito" data-indice="' + indice + '">';
    html += '<option value="">—</option>';
    opciones.forEach(op => {
        const sel = (op.id === Req.id) ? " selected" : "";
        html += '<option value="' + op.id + '"' + sel + '>' + op.nombre + '</option>';
    });
    html += '</select>';

    html += ' × <select data-tipo="mult-requisito" data-indice="' + indice + '">';
    for (let i = 1; i <= 5; i++) {
        const sel = (parseInt(Req.multiplicador, 10) === i) ? " selected" : "";
        html += '<option value="' + i + '"' + sel + '>' + i + '</option>';
    }
    html += '</select>';

    const coste = obtenerCosteRequisito(Req.id);
    const mult = parseInt(Req.multiplicador, 10) || 0;
    const total = coste * mult;
    html += ' <span class="coste">' + (total >= 0 ? "+" : "") + total + '</span>';

    html += ' <button type="button" data-tipo="borrar-requisito" data-indice="' + indice + '">✕</button>';

    div.innerHTML = html;
    contenedor.appendChild(div);
}

function pintarContenedor(objeto, indice, contenedor, opciones) {
    const cont = objeto.contenedores[indice];
    const def = TIPOS_CONTENEDOR[cont.tipo];
    if (!def) return;

    const caja = document.createElement("div");
    caja.className = "contenedor-afijos";

    let htmlCab = '<div class="cabecera">';

    // Selector de tipo
    htmlCab += '<select data-cont-tipo="tipo" data-cont-indice="' + indice + '">';
    Object.keys(TIPOS_CONTENEDOR).forEach(k => {
        const sel = (cont.tipo === k) ? " selected" : "";
        htmlCab += '<option value="' + k + '"' + sel + '>' + TIPOS_CONTENEDOR[k].nombre + '</option>';
    });
    htmlCab += '</select>';

    // Parámetros del tipo
    if (def.params.includes("duracion")) {
        htmlCab += ' <label>Z:</label>';
        htmlCab += '<input type="number" min="1" max="99" value="' + (cont.duracion || 1) +
                   '" data-cont-tipo="duracion" data-cont-indice="' + indice + '">';
    }

    if (def.params.includes("criatura")) {
        htmlCab += ' <label>Criatura:</label>';
        htmlCab += '<input type="text" value="' + (cont.criatura || "") +
                   '" data-cont-tipo="criatura" data-cont-indice="' + indice + '" style="width:10em">';
    }

    if (def.params.includes("poder")) {
        htmlCab += ' <label>Poder:</label>';
        htmlCab += '<input type="number" min="1" max="99" value="' + (cont.poder || 1) +
                   '" data-cont-tipo="poder" data-cont-indice="' + indice + '">';
    }

    if (def.params.includes("coste")) {
        htmlCab += ' <label>Coste:</label>';
        htmlCab += '<input type="number" min="0" value="' + (cont.coste || 0) +
                   '" data-cont-tipo="coste" data-cont-indice="' + indice + '">';
    }

    // Enfriamiento automático
    if (def.factor === "duracion") {
        const Enfr = (parseInt(cont.duracion, 10) || 1) * 2;
        htmlCab += ' <span class="enfriamiento">Enfr: ' + Enfr + '</span>';
    }

    htmlCab += ' <button type="button" class="btn-quitar" data-cont-borrar="' + indice + '">✕ Quitar contenedor</button>';
    htmlCab += '</div>';

    caja.innerHTML = htmlCab;

    // Afijos internos
    const listaAfijos = document.createElement("div");
    listaAfijos.className = "afijos-internos";
    cont.afijos.forEach((af, j) => {
        pintarFilaAfijoInterno(objeto, indice, j, listaAfijos, opciones, def.afijosValidos, def.factor === "duracion");
    });
    caja.appendChild(listaAfijos);

    // Botón añadir afijo interno
    const btnAdd = document.createElement("button");
    btnAdd.type = "button";
    btnAdd.className = "btn-add-interno";
    btnAdd.textContent = "+ Añadir afijo interno";
    btnAdd.addEventListener("click", () => {
        cont.afijos.push(afijoEnBlanco());
        if (typeof window.refrescar === "function") window.refrescar();
    });
    caja.appendChild(btnAdd);

    contenedor.appendChild(caja);
}

function pintarFilaAfijoInterno(objeto, indCont, indAfijo, contenedor, opciones, idsValidos, ocultarZ) {
    const cont = objeto.contenedores[indCont];
    const af = cont.afijos[indAfijo];
    const Fila = filaEfecto(af.id, opciones);
    const An = analizarAfijo(Fila);

    const div = document.createElement("div");
    div.className = "fila-afijo-interno";

    let html = "";

    html += '<select data-int-tipo="efecto" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '">';
    html += '<option value="">—</option>';
    opciones.forEach(op => {
        if (idsValidos && !idsValidos.includes(op.id)) return;
        const sel = (op.id === af.id) ? " selected" : "";
        html += '<option value="' + op.id + '"' + sel + '>' + (op.nombre || op.id) + '</option>';
    });
    html += '</select>';

    if (An.pideCantidad) {
        html += ' <label>X:</label><input type="number" min="1" max="99" value="' + (af.cantidad || 1) +
                '" data-int-tipo="cantidad" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '" style="width:3em">';
    }

    if (An.pideDuracion && !ocultarZ) {
        html += ' <label>Z:</label><input type="number" min="1" max="99" value="' + (af.duracion || 1) +
                '" data-int-tipo="duracion" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '" style="width:3em">';
    }

    if (An.pideDado) {
        html += ' <select data-int-tipo="dado" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '">';
        html += '<option value="">—</option>';
        DADOS.forEach(d => {
            const sel = (af.dado === d) ? " selected" : "";
            html += '<option value="' + d + '"' + sel + '>' + d + '</option>';
        });
        html += '</select>';
    }

    if (An.pideTipoDano) {
        html += ' <select data-int-tipo="tipodano" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '">';
        html += '<option value="">Tipo…</option>';
        TIPOS_DANO.forEach(t => {
            const sel = (af.tipoDano === t) ? " selected" : "";
            html += '<option value="' + t + '"' + sel + '>' + t + '</option>';
        });
        html += '</select>';
    }

    if (An.pideCualidad) {
        html += ' <select data-int-tipo="cualidad" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '">';
        html += '<option value="">Cualidad…</option>';
        CUALIDADES.forEach(c => {
            const sel = (af.cualidad === c) ? " selected" : "";
            html += '<option value="' + c + '"' + sel + '>' + c + '</option>';
        });
        html += '</select>';
    }

        // Atributo
    if (An.pideAtributo) {
        html += ' <select data-int-tipo="atributo" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '">';
        html += '<option value="">Atributo…</option>';
        ATRIBUTOS.forEach(a => {
            const sel = (af.atributo === a) ? " selected" : "";
            html += '<option value="' + a + '"' + sel + '>' + a + '</option>';
        });
        html += '</select>';
    }

    // Arma
    if (An.pideArma) {
        html += ' <select data-int-tipo="arma" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '">';
        html += '<option value="">Arma…</option>';
        ARMAS.forEach(a => {
            const sel = (af.arma === a) ? " selected" : "";
            html += '<option value="' + a + '"' + sel + '>' + a + '</option>';
        });
        html += '</select>';
    }

    if (An.pideEscuela) {
        html += ' <select data-int-tipo="escuela" data-int-cont="' + indCont + '" data-int-af="' + indAfijo + '">';
        html += '<option value="">Escuela…</option>';
        ESCUELAS.forEach(e => {
            const sel = (af.escuela === e) ? " selected" : "";
            html += '<option value="' + e + '"' + sel + '>' + e + '</option>';
        });
        html += '</select>';
    }

    const coste = costeAfijo(af, opciones);
    html += ' <span>' + (coste >= 0 ? "+" : "") + coste + '</span>';
    html += ' <button type="button" data-int-borrar="' + indAfijo + '" data-int-cont="' + indCont + '">✕</button>';

    div.innerHTML = html;
    contenedor.appendChild(div);
}

function piezasDeMaterial(idMaterial) {
    const ids = PIEZAS_POR_MATERIAL[idMaterial] || [];
    if (!Datos) return [];
    // Combinar casillas y complementos
    const Todas = [
        ...(Datos.casillasArmadura || []),
        ...(Datos.complementosArmadura || [])
    ];
    return ids.map(id => Todas.find(p => p.id === id)).filter(Boolean);
}