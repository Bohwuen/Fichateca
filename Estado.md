# ESTADO DEL PROYECTO — FICHATECA

> Última actualización: [pon la fecha cuando lo guardes]
> Este archivo sirve para retomar el desarrollo sin depender de chats antiguos.

---

## 1. QUÉ ES FICHATECA

Web de rol de World of Warcraft (WoW JdR) que permite:
- Crear fichas de personaje
- Crear objetos (objetos, armaduras, armas)
- Crear estados (buffs/debuffs)
- Crear hechizos (pendiente)
- Exportar todo al addon DiceMaster dentro del juego (Base64)

**Sin servidor.** Todo se guarda en `localStorage` del navegador.
**Login ficticio.** Solo guarda el nombre en `localStorage`. No hay cuentas reales.

---

## 2. REPO Y ENTORNO

- Repo: `Bohwuen/Fichateca`, rama `dev`
- Sheet BBDD: `1BcL153fDA_5eC5ngoiYC36SBGyJhdAsrNHvPgkngopg`
- Entorno: VS Code + Live Server (`http://127.0.0.1:5500/`)
- Aviso: Live Server recarga con Ctrl+S. A veces hay que forzar Ctrl+Shift+R.
- Sin frameworks. JavaScript vanilla. Rutas relativas con `window.RUTA_BASE`.
- CSVs en UTF-8. `id` sin tildes ni ñ. `nombre` con tildes y ñ.
- Estilo de trabajo: bloques cortos, uno a uno, confirmar antes de pasar al siguiente.

---

## 3. LO QUE YA FUNCIONA (cerrado)

### Ficha web
- `usuario/ficha/ficha.html` + `lista.html` → 100%
- Pools con costes "primera vez", historial, reset, sincronización
- Exportación a DiceMaster (5 traits + skill sheet) → 100%

### Guías y enlaces
- Modal de PDFs en `addon/index.html` y `manual/index.html`
- Enlaces a GitHub (releases, repo addon, repo sistema)

### Creador de Objetos (`objetos/crear.html`)
- 3 pestañas: Objeto, Armadura, Arma
- Pestaña Objeto: 100% (incluye envío a Google Sheets)
- Pestaña Armadura: funciona, pero **NO envía a Sheets** (solo valida balance)
- Pestaña Arma: funciona, pero **NO envía a Sheets** (solo valida balance)

### Creador de Estados (`estados/crear.html` + `js/estado.js`)
- Funciona: carga `buffs_debuffs.csv`, pinta afijos con variables, guarda en `localStorage` y Google Sheets
- **Pendiente:** rehacer `buffs_debuffs.csv` desde el diccionario (no confirmado si el actual está completo)

### Navegación (cerrada en esta revisión)
- `index.html` (raíz) → 5 tarjetas: Manual, Addon, Discord, Foro, Herramientas ✅
- `manual/index.html` → 3 PDFs + índice con enlaces reales ✅
- `addon/index.html` → herramientas relacionadas + aviso instalación ✅
- `foro/index.html` → GitHub Issues + Discord ✅
- `usuario/perfil.html` → enlaces corregidos (hechizos → crear.html, objetos → crear.html) ✅
- `login/signin.html` y `signup.html` → login ficticio OK ✅
- `usuario/ficha/lista.html` → HTML válido (sin button dentro de a) ✅
- `hechizos/crear.html` → placeholder "en obras" con navegación ✅

---

## 4. LO QUE ESTÁ A MEDIO

### Botón "Enviar" en Armadura y Arma
- En Objeto ya envía a Google Sheets ✅
- En Armadura y Arma, el botón existe pero **solo valida el balance, no envía**
- **Pendiente:** añadir `enviarAGoogleSheetsArmadura` y `enviarAGoogleSheetsArma`

### Validaciones específicas en `efectos_armas.csv`
- Afijos como `armadura`, `escudo`, `res` solo deberían permitirse si el arma es **Escudo**
- Ahora mismo no se valida

---

## 5. LO QUE QUEDA PENDIENTE (grande)

### Orden lógico de trabajo
1. **Rehacer `buffs_debuffs.csv`** desde el diccionario (estados completos)
2. **Reformar `objetos/crear.html`** para que aplique estados (`estadoId` ya existe en `objeto.js`, falta pulir)
3. **Hacer `hechizos/crear.html` de verdad** (depende de 1 y 2)
4. **Rehacer `efectos_hechizos.csv`** desde el diccionario
5. **Crear `escuelas_magicas.csv`** (opcional: `objeto.js` ya tiene la lista hardcodeada)

### Creador de Hechizos (`hechizos/crear.html`)
Actualmente es un placeholder "en obras". Cuando se haga:
- Tipo: Hechizo / Habilidad
- Escuela de magia (Arcano, Fuego, Hielo, Naturaleza, Sombra, Sagrado, Vil)
- Rango de maestría (`rangos_hechizo.csv`): Aprendiz (1) a Genio (6). Restringe lanzamiento, no da puntos.
- Coste en maná = Σ(coste_base × X × Z)
- Afijos desde `efectos_hechizos.csv`
- Contenedores: mismos tipos que objetos + específicos (canalizado, consume_combo)
- Sin campos TRP3 de objetos (peso, sonidos, etc.)

### Creador de Beneficios y Perjuicios (`estados/crear.html`)
Ya existe y funciona. Pendiente:
- Rehacer `buffs_debuffs.csv` desde el diccionario
- Añadir campos: Aplicación (al objetivo, al lanzador, en área), Apilable (sí/no)

---

## 6. SISTEMA DE AFIJOS (reglas fijadas)

### Nomenclatura
| Símbolo | Significado |
|---|---|
| X | multiplicador / cantidad de veces |
| Z | turnos / duración |
| XDZ | X dados de Z caras |
| DZ | dado de Z caras (D4, D6, D8, D10, D12, D20) |

### Balance

Debe ser ≥ 0. Verde si ≥ 0, rojo si < 0.

### Calidad (`calidades_objeto.csv`)
| Calidad | Valor |
|---|---|
| Basura | 0 |
| Común | 1 |
| Poco común | 2 |
| Raro | 3 |
| Épico | 4 |
| Legendario | 5 |

### Coste de afijo

- Si tiene dado, `coste_base` se sustituye por el valor del dado en `costes_dado.csv`
- Si no tiene X, X=1. Si no tiene Z, Z=1.

### Coste de contenedor

Redondeo a entero al final.

### Enfriamiento de contenedor

### Esquema de CSVs de efectos
- `id`: sin tildes ni ñ, minúsculas
- `nombre`: con tildes y ñ, sin placeholders (se resuelven al pintar)
- `tipo`: efecto, requisito, modificador, neutral
- `coste`: entero (negativo resta, positivo suma)
- `requiere_*`: true/false
- `notas`: texto libre

### Placeholders
| Placeholder | Se resuelve a |
|---|---|
| `[Cualidad]` | Cualidad (Amplificar, Aumento temporal) |
| `[Atributo]` | Atributo (Aumentar) |
| `[Habilidad]` | Habilidad (Potenciar) |
| `[Arma]` | Tipo de arma (Potenciar arma, Precisión con arma) |
| `[Tipo de daño]` | Tipo de daño (Potenciar, Daño, Secuela, Resistencia) |
| `[Fuente de poder]` | Ya no se usa; siempre "Energía" |
| `[Escuela]` | Escuela mágica (Silencio [Escuela]) |

### Listas
- **Tipos de daño:** Físico, Arcano, de Frío, de Fuego, de Naturaleza, de Sombra, Sagrado, Vil
- **Atributos:** Fuerza, Destreza, Inteligencia, Voluntad, Percepción, Carisma, Aguante, Energía
- **Armas:** Espadas 1m/2m, Mazas 1m/2m, Hachas 1m/2m, Arcos, Ballestas, Armas de fuego, Armas arrojadizas, Bastones, Varitas, Dagas, Armas de puño, Armas de asta, Gujas de guerra, Escudo, Sin armas
- **Dados:** D4, D6, D8, D10, D12, D20
- **Escuelas:** Arcano, Fuego, Hielo, Naturaleza, Sombra, Sagrado, Vil

### Fuente de poder
Un único recurso: **Energía**. Cada clase lo tematiza (Maná, Rabia, Chi, Foco, Runicidad…). En CSVs siempre "Energía".

### Tipos de contenedor
| Tipo | Parámetros propios | Factor | Disparador |
|---|---|---|---|
| `aumento_temporal` | Z | × Z | Uso |
| `invocacion` | Criatura, Poder, Z | × Z | Al invocar |
| `hechizo_especial` | Coste | × 1 | Al lanzar |
| `al_recibir_dano` | — | × 1 | Al recibir daño |
| `al_matar` | — | × 1 | Al matar |
| `al_usar` | — | × 1 | Al usar |
| `pasiva` | — | × 1 | Pasivo |

### Lista blanca de afijos internos
- `aumento_temporal`: `aumento_cualidad`, `armadura`, `potenciar`, `potenciar_magia`, `res`, `precision`, `penetracion`, `velocidad`, `fuente_poder`, `sanacion_fija`
- `pasiva`: `amplificar`, `armadura`, `potenciar`, `potenciar_magia`, `res`, `precision`, `penetracion`, `velocidad`, `fuente_poder`, `sanacion_fija`
- Los demás contenedores: sin filtro

---

## 7. ESTRUCTURA DE CÓDIGO

### `js/motor.js`
- `RutasCsv` con todas las rutas (usando `window.RUTA_BASE`)
- `cargarDatosMotor()` → carga todos los CSVs y devuelve `Datos`
- `subrazasDe`, `calcularBonos`, `racialesEspecialesDe`, `velocidadDe`
- Fichas en `localStorage` (`obtenerFichas`, `guardarFicha`, `borrarFicha`, `fichaEnBlanco`)

### `js/objeto.js`
- `objetoEnBlanco()`, `afijoEnBlanco()`, `contenedorEnBlanco(tipo)`
- `analizarAfijo(fila)` → qué campos pide cada afijo
- `costeAfijo(afijo, csvEfectos)`, `costeContenedor(cont, csvEfectos)`
- `calcularTotalEfectos`, `calcularTotalRequisitos`, `calcularBalance`
- `pintarFilaEfecto`, `pintarFilaAfijoInterno`, `pintarContenedor`, `pintarFilaRequisito`
- `resolverNombreAfijo`, `generarTooltipIzquierdo/Derecho`, `generarTextoEfectos`, `generarPreviewTRP3`
- `piezasDeMaterial(idMaterial)` + `PIEZAS_POR_MATERIAL`
- Constantes: `CUALIDADES`, `TIPOS_DANO`, `ATRIBUTOS`, `ARMAS`, `DADOS`, `ESCUELAS`, `TIPOS_CONTENEDOR`
- `cargarCatalogoEstados()` → lee `fichateca_estados_custom` de `localStorage`

### `js/estado.js`
- Carga `buffs_debuffs.csv`
- Pinta afijos con variables dinámicas
- Guarda en `localStorage` + Google Sheets (POST oculto)

### `js/csv.js`, `js/comun.js`, `js/lua.js`, `js/dicemaster.js`, `js/traits.js`
- Sin cambios recientes. Funcionan.

---

## 8. FLUJO DE TRABAJO DEL CREADOR DE OBJETOS

1. Rellenar nombre, calidad, subtipo (o material/pieza, o tipo de arma)
2. Añadir afijos externos: cada afijo muestra sus campos según `analizarAfijo`
3. Añadir contenedores: cabecera con parámetros propios + lista de afijos internos
4. Añadir requisitos
5. Balance se recalcula en cada cambio
6. Vista previa TRP3 se regenera en cada cambio
7. Botón Enviar se habilita si balance ≥ 0
8. Reset vacía todo

---

## 9. COSAS A RECORDAR

- CSVs en UTF-8
- `id` sin tildes ni ñ. `nombre` con tildes y ñ.
- Sin frameworks. JavaScript vanilla.
- Estilo: bloques cortos, uno a uno, confirmar antes de pasar al siguiente.
- El usuario no programa: dar bloques enteros listos para pegar.
- Al cambiar un CSV, recargar con Ctrl+Shift+R.
- Las funciones de `objeto.js` reciben el CSV de efectos como parámetro (`csvEfectos`)
- El nombre final de un afijo se resuelve con `resolverNombreAfijo`
- En contenedores, el Z del contenedor manda sobre el Z de los afijos internos
- Al cambiar el tipo de un contenedor, se descartan los afijos internos
- El enfriamiento del contenedor se calcula como Z × 2

---

## 10. ÚLTIMA TAREA QUE SE ESTABA HACIENDO

- Creador de objetos terminado (3 pestañas: Objeto, Armadura, Arma) ✅
- Pendiente menor: botón Enviar en Armadura y Arma ❌
- Próximos pasos: rehacer `buffs_debuffs.csv` → reformar objetos para aplicar estados → creador de Hechizos → rehacer `efectos_hechizos.csv`

---

## 11. DICCIONARIO DE AFIJOS

Está en un archivo aparte (el diccionario completo). Es la fuente de verdad para rehacer los CSVs.
Contiene afijos de objetos, armas, armaduras, hechizos, beneficios y perjuicios, con sus descripciones y notas.

---

## 12. CÓMO RETOMAR (checklist)

1. Abrir `Fichateca` en VS Code
2. Live Server en `index.html`
3. Probar navegación: Inicio → Herramientas → login → perfil → crear ficha/objeto/estado
4. Si todo funciona, siguiente tarea: **rehacer `buffs_debuffs.csv` desde el diccionario**
5. Si algo falla, revisar la sección correspondiente de este archivo

---

Fin del estado.