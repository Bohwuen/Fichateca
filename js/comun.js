/* =========================================================
   FICHATECA - Utilidades comunes
   ========================================================= */

// -----------------------------------------------------------
// LOGIN FICTICIO (localStorage)
// -----------------------------------------------------------

const ClaveSesion = "fichateca_usuario";

/**
 * Devuelve el nombre del usuario logueado, o null si no hay sesión.
 */
function obtenerUsuario() {
    return localStorage.getItem(ClaveSesion);
}

/**
 * Guarda el usuario en sesión.
 */
function iniciarSesion(Nombre) {
    localStorage.setItem(ClaveSesion, Nombre);
}

/**
 * Cierra la sesión.
 */
function cerrarSesion() {
    localStorage.removeItem(ClaveSesion);
}

/**
 * Comprueba si hay sesión. Si no la hay, redirige a login.
 * @param {string} rutaLogin - ruta relativa al signin (por defecto login/signin.html)
 */
function exigirSesion(RutaLogin = "login/signin.html") {
    if (!obtenerUsuario()) {
        window.location.href = RutaLogin;
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
function pintarBarraSesion(RutaBase = "") {
    const Cont = document.getElementById("barra-sesion");
    if (!Cont) return;

    const Usuario = obtenerUsuario();

    if (Usuario) {
        Cont.innerHTML =
            `<span>Hola, <a href="${RutaBase}usuario/perfil.html">${Usuario}</a></span>` +
            `<a href="#" id="btn-cerrar-sesion">Cerrar sesión</a>`;
        document.getElementById("btn-cerrar-sesion").addEventListener("click", (Evento) => {
            Evento.preventDefault();
            cerrarSesion();
            window.location.href = RutaBase + "index.html";
        });
    } else {
        Cont.innerHTML = `<a href="${RutaBase}login/signin.html">Inicia sesión</a>`;
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
function pintarMenu(RutaBase = "", Activo = "") {
    const Cont = document.getElementById("nav-principal");
    if (!Cont) return;

    const Enlaces = [
        { id: "inicio", texto: "Inicio",  href: RutaBase + "index.html" },
        { id: "manual", texto: "Manual",  href: RutaBase + "manual/index.html" },
        { id: "addon",  texto: "Addon",   href: RutaBase + "addon/index.html" },
        { id: "foro",   texto: "Foro",    href: RutaBase + "foro/index.html" }
    ];

    const Html =
        `<ul>` +
        Enlaces.map(Enlace =>
            `<li><a href="${Enlace.href}"${Enlace.id === Activo ? ' class="activo"' : ''}>${Enlace.texto}</a></li>`
        ).join("") +
        `</ul>`;

    Cont.innerHTML = Html;
}

// -----------------------------------------------------------
// UTILIDADES
// -----------------------------------------------------------

/**
 * Crea un elemento HTML con atributos y contenido.
 */
function crear(Tag, Atributos = {}, Contenido = "") {
    const Elemento = document.createElement(Tag);
    for (const Clave in Atributos) {
        if (Clave === "clase") Elemento.className = Atributos[Clave];
        else Elemento.setAttribute(Clave, Atributos[Clave]);
    }
    if (Contenido) Elemento.innerHTML = Contenido;
    return Elemento;
}

/**
 * Escapa HTML para evitar inyección al pintar texto de usuario.
 */
function escapar(Texto) {
    return String(Texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

        // ---------------------------------------------------
        // MODAL DE PDFs
        // ---------------------------------------------------
        const modal = document.getElementById("modal-pdf");
        const iframe = document.getElementById("modal-iframe");
        const tituloModal = document.getElementById("modal-titulo");

        document.querySelectorAll(".btn-guia").forEach(btn => {
            btn.addEventListener("click", () => {
                const ruta = btn.dataset.pdf;
                const titulo = btn.textContent.trim();
                tituloModal.textContent = titulo;
                iframe.src = ruta;
                modal.showModal();
            });
        });

        document.getElementById("btn-cerrar-modal").addEventListener("click", () => {
            iframe.src = "";
            modal.close();
        });

        // Cerrar al hacer click fuera del modal
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                iframe.src = "";
                modal.close();
            }
        });