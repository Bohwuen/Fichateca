/* =========================================================
   FICHATECA - Creador de Estados (v5 - Estilo Objetos + Duración)
   ========================================================= */

let EstadosBase = []; 
let AfijosDelEstadoActual = []; 

document.addEventListener("DOMContentLoaded", function () {
    pintarMenu("../", "");
    pintarBarraSesion("../");

    const idNombre = document.getElementById("est-nombre");
    const idSubtipo = document.getElementById("est-subtipo");
    const idNotas = document.getElementById("est-notas");
    const selAfijo = document.getElementById("est-selector-afijo");
    const camposDinamicos = document.getElementById("est-campos-dinamicos");
    const btnAddAfijo = document.getElementById("est-btn-add-afijo");
    const listaAfijosHTML = document.getElementById("est-lista-afijos");

    // Duración
    const idDuracionTipo = document.getElementById("est-duracion-tipo");
    const idDuracionValor = document.getElementById("est-duracion-valor");

    // Elementos de la vista previa
    const prevNombre = document.getElementById("prev-nombre");
    const prevTipo = document.getElementById("prev-tipo");
    const prevDuracion = document.getElementById("prev-duracion");
    const prevAfijos = document.getElementById("prev-afijos");
    const prevNotas = document.getElementById("prev-notas");
    const prevTRP3 = document.getElementById("est-preview-trp3");
    const mensaje = document.getElementById("est-mensaje");

    // 1. Cargar el diccionario de estados
    cargarCSV("../datos/buffs_debuffs.csv").then(estados => {
        EstadosBase = estados;
        selAfijo.innerHTML = '<option value="">— Elige una keyword —</option>';
        estados.forEach(est => {
            selAfijo.innerHTML += `<option value="${est.id}">${est.nombre}</option>`;
        });
    }).catch(err => {
        selAfijo.innerHTML = '<option value="">Error al cargar el CSV</option>';
        console.error(err);
    });
   

    // 2. Actualizar categorías (Subtipos)
    window.actualizarSubtipos = function() {
        const familia = document.querySelector('input[name="est-familia"]:checked').value;
        const opcionesPositivas = ["Magia", "Bendición", "Poción"];
        const opcionesNegativas = ["Magia", "Maldición", "Veneno", "Herida", "Enfermedad"];
        
        const opciones = familia === "positivo" ? opcionesPositivas : opcionesNegativas;
        
        idSubtipo.innerHTML = "";
        opciones.forEach(op => {
            idSubtipo.innerHTML += `<option value="${op}">${op}</option>`;
        });
        actualizarVistaPrevia();
    };
    actualizarSubtipos();

    // 2.2 Listener Duración
    idDuracionTipo.addEventListener("change", (e) => {
        if (e.target.value === "indefinido") {
            idDuracionValor.style.display = "none";
            idDuracionValor.value = 1;
        } else {
            idDuracionValor.style.display = "inline-block";
        }
        actualizarVistaPrevia();
    });
    idDuracionValor.addEventListener("input", actualizarVistaPrevia);

    // 3. Al elegir un afijo, preparar los campos dinámicos (estilo objeto)
    selAfijo.addEventListener("change", () => {
        const id = selAfijo.value;
        const divAyuda = document.getElementById("est-ayuda-afijo");

        if (!id) {
            camposDinamicos.style.display = "none";
            btnAddAfijo.style.display = "none";
            if (divAyuda) divAyuda.style.display = "none";
            return;
        }

        const afijoBase = EstadosBase.find(e => e.id === id);
        camposDinamicos.innerHTML = "";
        camposDinamicos.style.display = "flex";
        camposDinamicos.style.flexWrap = "wrap";
        camposDinamicos.style.gap = "0.5em";
        camposDinamicos.style.alignItems = "center";
        btnAddAfijo.style.display = "inline-block";

        // Mostrar la ayuda en su nuevo sitio
        if (divAyuda) {
            if (afijoBase.notas && afijoBase.notas.trim() !== "") {
                divAyuda.innerHTML = `<strong>Ayuda:</strong> ${afijoBase.notas}`;
                divAyuda.style.display = "block";
            } else {
                divAyuda.style.display = "none";
            }
        }

        if (afijoBase.requiere_cantidad === "true") {
            camposDinamicos.innerHTML += `<label>X:</label><input type="number" id="var-X" value="1" min="1" style="width:3em;">`;
        }
        if (afijoBase.requiere_duracion === "true") {
            camposDinamicos.innerHTML += `<label>Z:</label><input type="number" id="var-Z" value="1" min="1" style="width:3em;">`;
        }
        if (afijoBase.requiere_cualidad === "true") {
            camposDinamicos.innerHTML += `<label>Cualidad:</label> 
                <select id="var-Cualidad">
                    <option>Vigor</option><option>Destreza</option><option>Inteligencia</option>
                    <option>Voluntad</option><option>Percepción</option><option>Carisma</option>
                    <option>Aguante</option><option>Energía</option>
                </select>`;
        }
        if (afijoBase.requiere_tipo === "true") {
            camposDinamicos.innerHTML += `<label>Tipo:</label> 
                <select id="var-Tipo">
                    <option>Físico</option><option>Arcano</option><option>de Frío</option>
                    <option>de Fuego</option><option>de Naturaleza</option><option>de Sombra</option>
                    <option>Sagrado</option><option>Vil</option>
                </select>`;
        }
        if (afijoBase.requiere_escuela === "true") {
            camposDinamicos.innerHTML += `<label>Escuela:</label><input type="text" id="var-Escuela" placeholder="Ej: Piromancia" style="width:8em;">`;
        }
        if (afijoBase.requiere_fuente === "true") {
            camposDinamicos.innerHTML += `<label>Fuente:</label><input type="text" id="var-Fuente" value="Energía" style="width:8em;">`;
        }
    });

    // 4. Añadir afijo a la lista
    btnAddAfijo.addEventListener("click", () => {
        const id = selAfijo.value;
        if (!id) return;
        
        const afijoBase = EstadosBase.find(e => e.id === id);
        
        const variables = {
            X: document.getElementById("var-X")?.value || null,
            Z: document.getElementById("var-Z")?.value || null,
            Cualidad: document.getElementById("var-Cualidad")?.value || null,
            Tipo: document.getElementById("var-Tipo")?.value || null,
            Escuela: document.getElementById("var-Escuela")?.value || null,
            Fuente: document.getElementById("var-Fuente")?.value || null
        };

        let nombreResuelto = afijoBase.nombre;
        if (variables.Cualidad) nombreResuelto = nombreResuelto.replace(/\[Cualidad\]/gi, variables.Cualidad);
        if (variables.Tipo)     nombreResuelto = nombreResuelto.replace(/\[Tipo( de daño)?\]/gi, variables.Tipo);
        if (variables.Escuela)  nombreResuelto = nombreResuelto.replace(/\[Escuela\]/gi, variables.Escuela);
        if (variables.Fuente)   nombreResuelto = nombreResuelto.replace(/\[Fuente de poder\]/gi, variables.Fuente);
        if (variables.X)        nombreResuelto = nombreResuelto.replace(/\bX\b/g, variables.X);
        if (variables.Z)        nombreResuelto = nombreResuelto.replace(/\bZ\b/g, variables.Z);

        const afijoInstancia = {
            id_base: id,
            nombre: nombreResuelto,
            variables: variables,
            notas: afijoBase.notas
        };

        AfijosDelEstadoActual.push(afijoInstancia);
        
        selAfijo.value = "";
        selAfijo.dispatchEvent(new Event("change"));
        
        actualizarVistaPrevia();
    });

    // 5. Actualizar la vista previa (HTML y TRP3)
    function actualizarVistaPrevia() {
        const nombreEstado = idNombre.value || "[Sin nombre]";
        const tipoEstado = idSubtipo.value || "[Sin categoría]";
        
        // Lógica de duración
        const durTipo = idDuracionTipo.value;
        const durValor = idDuracionValor.value;
        let textoDuracion = "Indefinido";
        if (durTipo !== "indefinido") {
            textoDuracion = `${durValor} ${durTipo}`;
        }

        // Vista previa visual
        prevNombre.textContent = nombreEstado;
        prevTipo.textContent = tipoEstado;
        prevDuracion.textContent = `Duración: ${textoDuracion}`;
        prevNotas.textContent = idNotas.value.trim();

        listaAfijosHTML.innerHTML = "";
        prevAfijos.innerHTML = "";
        if (AfijosDelEstadoActual.length === 0) {
            prevAfijos.innerHTML = '<p style="color:#888;">Sin afijos añadidos.</p>';
        } else {
            AfijosDelEstadoActual.forEach((af, index) => {
                // En la columna izquierda (editable)
                listaAfijosHTML.innerHTML += `
                    <div class="fila-efecto" style="margin-bottom:0.3em;">
                        <span>• <strong>${af.nombre}</strong></span>
                        <button type="button" class="btn-quitar" style="margin-left:0.5em; padding:0.1em 0.4em; font-size:0.8em;" onclick="eliminarAfijo(${index})">✕</button>
                    </div>
                `;
                // En la columna derecha (preview)
                prevAfijos.innerHTML += `<div style="margin-bottom:0.3em;">• ${af.nombre}</div>`;
            });
        }

        // Vista previa TRP3
        let trp3 = `${nombreEstado}\n`;
        trp3 += `Estado: ${tipoEstado}\n`;
        trp3 += `Duración: ${textoDuracion}\n`;
        trp3 += `"`;
        if (AfijosDelEstadoActual.length > 0) {
            AfijosDelEstadoActual.forEach(af => {
                trp3 += `\n• ${af.nombre}`;
                // Quitamos las notas del diccionario de la vista previa TRP3
            });
        } else {
            trp3 += `\n(Sin efectos mecánicos definidos)`;
        }
        if (idNotas.value.trim()) {
            trp3 += `\n\n${idNotas.value.trim()}`;
        }
        trp3 += `"`;
        
        prevTRP3.textContent = trp3;
    }

    window.eliminarAfijo = function(index) {
        AfijosDelEstadoActual.splice(index, 1);
        actualizarVistaPrevia();
    };

    [idNombre, idNotas, idSubtipo].forEach(el => {
        el.addEventListener("input", actualizarVistaPrevia);
        el.addEventListener("change", actualizarVistaPrevia);
    });

    // 6. Guardar en localStorage Y en Google Sheets (usando Form POST para evitar CORS)
    document.getElementById("est-btn-guardar").addEventListener("click", () => {
        if (!idNombre.value.trim()) {
            alert("El estado necesita un nombre.");
            return;
        }
        if (AfijosDelEstadoActual.length === 0) {
            alert("El estado debe tener al menos un afijo.");
            return;
        }

        const estadoFinal = {
            id: "estado_" + Date.now(),
            nombre: idNombre.value.trim(),
            familia: document.querySelector('input[name="est-familia"]:checked').value,
            subtipo: idSubtipo.value,
            duracion: {
                tipo: idDuracionTipo.value,
                valor: idDuracionTipo.value === "indefinido" ? 0 : parseInt(idDuracionValor.value, 10) || 1
            },
            afijos: AfijosDelEstadoActual,
            notas: idNotas.value.trim(),
            creador: obtenerUsuario() || "Anónimo",
            fecha: new Date().toISOString()
        };

        // Validar duplicados en localStorage
        let listaCustom = JSON.parse(localStorage.getItem("fichateca_estados_custom") || "[]");
        if (listaCustom.some(e => e.nombre.toLowerCase() === estadoFinal.nombre.toLowerCase())) {
            alert("Ya existe un estado con este nombre en tu navegador. Por favor, cámbialo.");
            return;
        }

        const btn = document.getElementById("est-btn-guardar");
        const textoOriginal = btn.textContent;
        btn.disabled = true;
        btn.textContent = "Enviando...";
        mensaje.textContent = "Enviando a Google Sheets...";
        mensaje.className = "aviso-info";

        // --- TRUCO ANTI-CORS: Usar un formulario oculto ---
        // ¡AQUÍ ESTÁ LA URL NUEVA!
        const URL_SHEETS = "https://script.google.com/macros/s/AKfycbz1m2XiUU1N16p2y_P8B3Y9vWnCCNsyg851AIIIE5QjaU2oc1kitWopAobidmcL7MZ5/exec";
        
        const iframeName = "iframe_sheets_" + Date.now();
        const iframe = document.createElement("iframe");
        iframe.name = iframeName;
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        const form = document.createElement("form");
        form.action = URL_SHEETS;
        form.method = "POST";
        form.target = iframeName;
        form.style.display = "none";

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "payload";
        input.value = JSON.stringify(estadoFinal);
        form.appendChild(input);
        document.body.appendChild(form);

        form.submit();

        setTimeout(() => {
            // Guardamos en local pase lo que pase
            listaCustom.push(estadoFinal);
            localStorage.setItem("fichateca_estados_custom", JSON.stringify(listaCustom));
            
            mensaje.innerHTML = '✅ Estado guardado. <a href="../usuario/perfil.html">Volver al perfil</a> · <a href="crear.html">Crear otro</a>';
            mensaje.className = "aviso-info";
            btn.disabled = false;
            btn.textContent = textoOriginal;
            
            setTimeout(() => {
                document.getElementById("est-btn-reset").click();
                // NO borramos el mensaje: el enlace debe quedar visible
            }, 2000);

            document.body.removeChild(form);
            document.body.removeChild(iframe);
        }, 1500);
    });
        
    // 7. Botón de Reset
    document.getElementById("est-btn-reset").addEventListener("click", () => {
        if (!confirm("¿Seguro que quieres vaciar el formulario?")) return;
        idNombre.value = "";
        idNotas.value = "";
        AfijosDelEstadoActual = [];
        document.querySelector('input[name="est-familia"][value="positivo"]').checked = true;
        
        // Reset duración
        idDuracionTipo.value = "indefinido";
        idDuracionValor.style.display = "none";
        idDuracionValor.value = 1;

        actualizarSubtipos();
        selAfijo.value = "";
        selAfijo.dispatchEvent(new Event("change"));
        actualizarVistaPrevia();
    });

    actualizarVistaPrevia();
});