/* =========================================================
   FICHATECA - Utilidades comunes
   ========================================================= */

// -----------------------------------------------------------
// LOGIN FICTICIO (localStorage)
// -----------------------------------------------------------

const CLAVE_SESION = "fichateca_usuario";

/**
 * Devuelve el nombre del usuario logueado, o null si no hay sesión.
 */
function obtenerUsuario() {
    return localStorage.getItem(CLAVE_SESION);
}

/**
 * Guarda el usuario en sesión.
 */
function iniciarSesion(nombre) {
    localStorage.setItem(CLAVE_SESION, nombre);
}

/**
 * Cierra la sesión.
 */
function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}

/**
 * Comprueba si hay sesión. Si no la hay, redirige a login.
 * @param {string} rutaLogin - ruta relativa al signin (por defecto login/signin.html)
 */
function exigirSesion(rutaLogin = "login/signin.html") {
    if (!obtenerUsuario()) {
        window.location.href = rutaLogin;
    }
}

// -----------------------------------------------------------
// BARRA DE SESIÓN (login / nombre usuario)
// -----------------------------------------------------------

/**
 * Rellena el elemento con id="barra-sesion" con:
 *  - "Inicia sesión" si no hay usuario
 *  - Nombre + botón cerrar sesión si lo hay
 * @param {string} rutaBase - prefijo relativo a la raíz del proyecto ("" en raíz, "../" en subcarpetas)
 */
function pintarBarraSesion(rutaBase = "") {
    const cont = document.getElementById("barra-sesion");
    if (!cont) return;

    const usuario = obtenerUsuario();

    if (usuario) {
        cont.innerHTML =
            `<span>Hola, <a href="${rutaBase}usuario/perfil.html">${usuario}</a></span>` +
            `<a href="#" id="btn-cerrar-sesion">Cerrar sesión</a>`;
        document.getElementById("btn-cerrar-sesion").addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
            window.location.href = rutaBase + "index.html";
        });
    } else {
        cont.innerHTML = `<a href="${rutaBase}login/signin.html">Inicia sesión</a>`;
    }
}

// -----------------------------------------------------------
// NAVEGACIÓN
// -----------------------------------------------------------

/**
 * Genera el menú principal y lo inserta en el elemento con id="nav-principal".
 * @param {string} rutaBase - prefijo relativo a la raíz ("" o "../" etc.)
 * @param {string} activo - id de la sección activa: 'inicio' | 'manual' | 'addon' | 'foro'
 */
function pintarMenu(rutaBase = "", activo = "") {
    const cont = document.getElementById("nav-principal");
    if (!cont) return;

    const enlaces = [
        { id: "inicio", texto: "Inicio",  href: rutaBase + "index.html" },
        { id: "manual", texto: "Manual",  href: rutaBase + "manual/index.html" },
        { id: "addon",  texto: "Addon",   href: rutaBase + "addon/index.html" },
        { id: "foro",   texto: "Foro",    href: rutaBase + "foro/index.html" }
    ];

    const html =
        `<ul>` +
        enlaces.map(e =>
            `<li><a href="${e.href}"${e.id === activo ? ' class="activo"' : ''}>${e.texto}</a></li>`
        ).join("") +
        `</ul>`;

    cont.innerHTML = html;
}

// -----------------------------------------------------------
// UTILIDADES
// -----------------------------------------------------------

/**
 * Crea un elemento HTML con atributos y contenido.
 */
function crear(tag, atributos = {}, contenido = "") {
    const el = document.createElement(tag);
    for (const k in atributos) {
        if (k === "clase") el.className = atributos[k];
        else el.setAttribute(k, atributos[k]);
    }
    if (contenido) el.innerHTML = contenido;
    return el;
}

/**
 * Escapa HTML para evitar inyección al pintar texto de usuario.
 */
function escapar(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}