// ensayo.js

// Funciones para gestionar el nivel y puntos de trasfondo
function restarNivel() {
    const nivel = document.getElementById("nivel");
    const pt = document.getElementById("pt");

    if (nivel.value > 1) {
        nivel.value--;
        pt.value = +pt.value - 7;
    }
}

function sumarNivel() {
    const nivel = document.getElementById("nivel");
    const pt = document.getElementById("pt");

    if (nivel.value < 25) {
        nivel.value++;
        pt.value = +pt.value + 7;
    }
}

// Funciones para gestionar razas

document.addEventListener("DOMContentLoaded", function() {

    // Evento onchange para el selector de razas
    document.getElementById("razas").onchange = function() {
        seleccionarRaza();
    };

    function seleccionarRaza() {
        // Obtener el valor seleccionado en el primer selector (razas)
        var razaSeleccionada = document.getElementById("razas").value;
    
        // Obtener el contenedor de subrazas
        var subrazasContainer = document.getElementById("subrazasContainer");
    
        // Obtener el selector de subrazas
        var subrazasSelector = document.getElementById("subrazas");
    
        // Ocultar el contenedor de subrazas por defecto
        subrazasContainer.style.display = "none";
  
    // Utilizar un bloque switch para manejar cada caso
    switch (razaSeleccionada) {
      case "humano":
        // Lógica para la raza Humano
        mostrarSubrazas();
        break;

      case "enano":
        // Lógica para la raza Enano
        mostrarSubrazas();
        break;

      case "gnomo":
        // Lógica para la raza Gnomo
        mostrarSubrazas();
        break;

      case "elfoNoche":
        // Lógica para la raza Elfo de la noche
        mostrarSubrazas();
        break;

      case "altoElfo":
        // Lógica para la raza Alto elfo
        break;

      case "draenei":
        // Lógica para la raza Draenei
        mostrarSubrazas();
        break;

      case "huargen":
        // Lógica para la raza Huargen
        break;

      case "elfoVacío":
        // Lógica para la raza Elfo del vacío
        break;

      case "orco":
        // Lógica para la raza Orco
        mostrarSubrazas();
        break;

      case "trol":
        // Lógica para la raza Trol
        mostrarSubrazas();
        break;

      case "tauren":
        // Lógica para la raza Tauren
        mostrarSubrazas();
        break;

      case "noMuerto":
        // Lógica para la raza No-Muerto
        break;

      case "ogro":
        // Lógica para la raza Ogro
        break;

      case "goblin":
        // Lógica para la raza Goblin
        break;

      case "elfoSangre":
        // Lógica para la raza Elfo de sangre
        break;

      case "nocheterna":
        // Lógica para la raza Nocheterna
        break;

      case "pandaren":
        // Lógica para la raza Pandaren
        break;

     case "vulpera":
        // Lógica para la raza Vulpera
        break;

      case "dracthyr":
        // Lógica para la raza Dracthyr
        break;

      default:
        // Lógica para el caso por defecto (no debería ocurrir)
        break;
    }
  }

  function mostrarSubrazas() {
    // Obtener el valor seleccionado en el primer selector (razas)
    var razaSeleccionada = document.getElementById("razas").value;
  
    // Obtener el contenedor de subrazas
    var subrazasContainer = document.getElementById("subrazasContainer");
  
    // Obtener el selector de subrazas
    var subrazasSelector = document.getElementById("subrazas");
  
    // Limpiar las opciones anteriores
    subrazasSelector.innerHTML = "";
  
    // Obtener el valor seleccionado en el selector de subrazas
    var subrazaSeleccionada = subrazasSelector.value;
  
    // Verificar si se ha seleccionado alguna subraza
    if (subrazaSeleccionada !== "") {
      // Llamar a la función que maneja las opciones de subrazas
      manejarSubraza(subrazaSeleccionada);
    }


    // Verificar la raza seleccionada y agregar opciones correspondientes
    switch (razaSeleccionada) {
      case "humano":
        agregarOpcion(subrazasSelector, "Elegir subraza");
        agregarOpcion(subrazasSelector, "Ventormenta");
        agregarOpcion(subrazasSelector, "Lordaeron");
        agregarOpcion(subrazasSelector, "Dalaran");
        agregarOpcion(subrazasSelector, "Gilneas");
        agregarOpcion(subrazasSelector, "Alterac");
        agregarOpcion(subrazasSelector, "Kul Tiras");
        agregarOpcion(subrazasSelector, "Strom");
        break;

      case "enano":
        agregarOpcion(subrazasSelector, "Elegir subraza");
        agregarOpcion(subrazasSelector, "Barbabronce");
        agregarOpcion(subrazasSelector, "Hierro Negro");
        agregarOpcion(subrazasSelector, "Martillo Salvaje");
        // Agregar más subrazas si es necesario
        break;

      case "elfoNoche":
        agregarOpcion(subrazasSelector, "Elegir subraza");
        agregarOpcion(subrazasSelector, "Darnassiano");
        agregarOpcion(subrazasSelector, "Altonato");
        // Agregar más subrazas si es necesario
        break;

      case "draenei":
        agregarOpcion(subrazasSelector, "Elegir subraza");
        agregarOpcion(subrazasSelector, "Draenei");
        agregarOpcion(subrazasSelector, "Forjaluz");
        agregarOpcion(subrazasSelector, "Manari");
        // Agregar más subrazas si es necesario
        break;

      case "orco":
        agregarOpcion(subrazasSelector, "Elegir subraza");
        agregarOpcion(subrazasSelector, "Durotar");
        agregarOpcion(subrazasSelector, "Magari");
        // Agregar más subrazas si es necesario
        break;

      case "trol":
        agregarOpcion(subrazasSelector, "Elegir subraza");
        agregarOpcion(subrazasSelector, "Lanza Negra");
        agregarOpcion(subrazasSelector, "Zandalari");
        agregarOpcion(subrazasSelector, "Farraki");
        agregarOpcion(subrazasSelector, "Gurubashi");
        agregarOpcion(subrazasSelector, "Amani");
        agregarOpcion(subrazasSelector, "Trol de Hielo");
        agregarOpcion(subrazasSelector, "Drakkari");
        // Agregar más subrazas si es necesario
        break;

      case "tauren":
        agregarOpcion(subrazasSelector, "Elegir subraza");
        agregarOpcion(subrazasSelector, "Mulgore");
        agregarOpcion(subrazasSelector, "Monte Alto");
        // Agregar más subrazas si es necesario
        break;

      case "gnomo":
        agregarOpcion(subrazasSelector, "Elegir subraza");
        agregarOpcion(subrazasSelector, "Gnomeregan");
        agregarOpcion(subrazasSelector, "Mecandria");
        // Agregar más subrazas si es necesario
        break;

      default:
        // Si no se selecciona ninguna raza, ocultar el contenedor de subrazas
        subrazasContainer.style.display = "none";
        return;
    }

    // Mostrar el contenedor de subrazas
    subrazasContainer.style.display = "block";
  }
    
    // Declarar el selector de subrazas en un ámbito más amplio
    var subrazasSelector = document.getElementById("subrazas");

    // Evento onchange para el selector de subrazas
    document.getElementById("subrazas").onchange = function() {
        // Obtener el valor seleccionado en el selector de subrazas
        var subrazaSeleccionada = document.getElementById("subrazas").value;
    
        // Verificar si se ha seleccionado alguna subraza
        if (subrazaSeleccionada !== "") {
        // Llamar a la función que maneja las opciones de subrazas
        manejarSubraza(subrazaSeleccionada);
        }
    };

    function agregarOpcion(selector, valor) {
        var opcion = document.createElement("option");
        opcion.value = valor;
        opcion.text = valor;
        selector.add(opcion);
      }
        // Llamar a mostrarSubrazas después de cargar el DOM
        mostrarSubrazas();

    function reiniciarAtributos(){
        //Poner a 1 los atributos correspondientes.
    }
    // Función que maneja las opciones de subrazas
    function manejarSubraza(subrazaSeleccionada) {
        // Utilizar un bloque switch para manejar cada caso de subraza
        switch (subrazaSeleccionada) {
        case "Ventormenta":
            // Lógica para la subraza Ventormenta de Humanos
            var minimum = document.getElementById('inteligencia');
            minimum.min=parseInt(minimum.min)+1;
            minimum.value=parseInt(minimum.value)+1;
            break;
    
        case "Lordaeron":
            // Lógica para la subraza Lordaeron de Humanos
            break;

        case "Dalaran":
            // Lógica para la subraza
            break;
    
            
        case "Gilneas":
            // Lógica para la subraza
            break;
    
            
        case "Alterac":
            // Lógica para la subraza
            break;
    
            
        case "Kul Tiras":
            // Lógica para la subraza
            break;
    
            
        case "Strom":
            // Lógica para la subraza
            break;
    
            
        case "Barbabronce":
            // Lógica para la subraza
            break;
    
            
        case "Hierro Negro":
            // Lógica para la subraza
            break;
    
            
        case "Martillo Salvaje":
            // Lógica para la subraza
            break;
    
            
        case "Darnassiano":
            // Lógica para la subraza
            break;
    
            
        case "Altonato":
            // Lógica para la subraza
            break;
    
            
        case "Draenei":
            // Lógica para la subraza
            break;
    
            
        case "Forjaluz":
            // Lógica para la subraza
            break;
    
            
        case "Manari":
            // Lógica para la subraza
            break;
    
        case "Durotar":
            // Lógica para la subraza
            break;
            
        case "Magari":
            // Lógica para la subraza
            break;
        
                
        case "Lanza Negra":
            // Lógica para la subraza
            break;
        
                
        case "Zandalari":
            // Lógica para la subraza
            break;
        
                
        case "Farraki":
            // Lógica para la subraza
            break;
        
                
        case "Gurubashi":
            // Lógica para la subraza
            break;
        
                
        case "Amani":
            // Lógica para la subraza
            break;
        
                
        case "Trol de Hielo":
            // Lógica para la subraza
            break;
        
                
        case "Drakkari":
            // Lógica para la subraza
            break;
        
                
        case "Mulgore":
            // Lógica para la subraza
            break;
        
                
        case "Monte ALto":
            // Lógica para la subraza
            break;
        
                
        case "Gnomeregan":
            // Lógica para la subraza
            break;
        
                
        case "Mecandria":
            // Lógica para la subraza
            break;
        

        // Agregar más casos según sea necesario
    
        default:
            // Lógica para el caso por defecto (no debería ocurrir)
            alert("Selecciona una subraza válida");
            break;
        }
    }
});

// Funciones para gestionar clases

document.addEventListener("DOMContentLoaded", function() {

    // Evento onchange para el selector de clases
    document.getElementById("clase").onchange = function() {
        seleccionarClase();
    };

    function seleccionarClase() {
        // Obtener el valor seleccionado en el primer selector (clases)
        var claseSeleccionada = document.getElementById("clase").value;
    
        // Obtener el contenedor de demonios
        var demoniosContainer = document.getElementById("demonioContainer");
    
        // Obtener el selector de demonios
        var demoniosSelector = document.getElementById("demonios");
    
        // Ocultar el contenedor de demonios por defecto
        demoniosContainer.style.display = "none";
  
    // Utilizar un bloque switch para manejar cada caso
    switch (claseSeleccionada) {
        case "guerrero":
            // Lógica para la clase Guerrero
            break;

        case "mago":
            // Lógica para la clase Mago
            break;

        case "cazador":
            // Lógica para la clase Cazador
            break;

        case "druida":
            // Lógica para la clase Druida
            break;

        case "Cabmuerte":
            // Lógica para la clase Caballero de la muerte
            break;

        case "CazDemon":
            // Lógica para la clase Cazador de demonios
            mostrarDemonios();
            break;

        case "brujo":
            // Lógica para la clase Brujo
            break;

        case "picaro":
            // Lógica para la clase Pícaro
            break;

        case "sacerdote":
            // Lógica para la clase Sacerdote
            break;

        case "chaman":
            // Lógica para la clase Chamán
            break;

        case "paladin":
            // Lógica para la clase Paladín
            break;

        case "monje":
            // Lógica para la clase Monje
            break;

        case "evocador":
            // Lógica para la clase Evocador
            break;

        default:
            // Lógica para el caso por defecto (no debería ocurrir)
            alert("Selecciona una clase válida");
            break;
    }
  }

  function mostrarDemonios() {
    // Obtener el valor seleccionado en el primer selector (clases)
    var claseSeleccionada = document.getElementById("clase").value;
  
    // Obtener el contenedor de demonios
    var demoniosContainer = document.getElementById("demonioContainer");
  
    // Obtener el selector de demonios
    var demoniosSelector = document.getElementById("demonios");
  
    // Limpiar las opciones anteriores
    demoniosSelector.innerHTML = "";
  
    // Obtener el valor seleccionado en el selector de demonios
    var demonioSeleccionado = demoniosSelector.value;
  
    // Verificar si se ha seleccionado alguna subraza
    if (demonioSeleccionado !== "") {
      // Llamar a la función que maneja las opciones de demonios
      manejarDemonio(demonioSeleccionado);
    }


    // Verificar la raza seleccionada y agregar opciones correspondientes
    switch (claseSeleccionada) {
      case "CazDemon":
        agregarOpcionD(demoniosSelector, "Elegir demonio");
        agregarOpcionD(demoniosSelector, "Diablillo");
        agregarOpcionD(demoniosSelector, "Sucubo");
        agregarOpcionD(demoniosSelector, "Manafago");
        agregarOpcionD(demoniosSelector, "Guardia vil");
        agregarOpcionD(demoniosSelector, "Guardia de cólera");
        agregarOpcionD(demoniosSelector, "Guardia Apocaliptico");
        agregarOpcionD(demoniosSelector, "Shivarra");
        agregarOpcionD(demoniosSelector, "Guardia Terrorifico");
        agregarOpcionD(demoniosSelector, "Mo´Arg");
        agregarOpcionD(demoniosSelector, "Carcelero");
        agregarOpcionD(demoniosSelector, "Inquisidor");
        agregarOpcionD(demoniosSelector, "Murcielago vil");
        break;

      default:
        // Si no se selecciona ninguna clase, ocultar el contenedor de demonio interior
        demoniosContainer.style.display = "none";
        return;
    }

     // Mostrar el contenedor de demonios
    demoniosContainer.style.display = "block";
}
  
  // Declarar el selector de demonios en un ámbito más amplio
  var demoniosSelector = document.getElementById("demonios");

  // Evento onchange para el selector de demonios
  document.getElementById("demonios").onchange = function() {
      // Obtener el valor seleccionado en el selector de demonios
      var demonioSeleccionado = document.getElementById("demonios").value;
  
      // Verificar si se ha seleccionado alguna subraza
      if (demonioSeleccionado !== "") {
      // Llamar a la función que maneja las opciones de demonios
      manejarDemonio(demonioSeleccionado);
      }
  };

  function agregarOpcionD(selector, valor) {
      var opcion = document.createElement("option");
      opcion.value = valor;
      opcion.text = valor;
      selector.add(opcion);
    }
      // Llamar a mostrarDemonios después de cargar el DOM
      mostrarDemonios();


  // Función que maneja las opciones de demonios
  function manejarDemonio(demonioSeleccionado) {
        // Utilizar un bloque switch para manejar cada caso de demonio
        switch (demonioSeleccionado) {
        case "Elegir demonio":
            // Lógica para la demonio
            break;
    
        case "Diablillo":
            // Lógica para la demonio
            break;

        case "Sucubo":
            // Lógica para la demonio
            break;
    
            
        case "Manafago":
            // Lógica para la demonio
            break;
    
            
        case "Guardia vil":
            // Lógica para la demonio
            break;
    
            
        case "Guardia de cólera":
            // Lógica para la demonio
            break;
    
            
        case "Guardia Apocaliptico":
            // Lógica para la demonio
            break;
    
            
        case "Shivarra":
            // Lógica para la demonio
            break;
    
            
        case "Guardia Terrorifico":
            // Lógica para la demonio
            break;
    
            
        case "Mo´Arg":
            // Lógica para la demonio
            break;
    
            
        case "Carcelero":
            // Lógica para la demonio
            break;
    
            
        case "Inquisidor":
            // Lógica para la demonio
            break;
    
            
        case "Murcielago vil":
            // Lógica para la demonio
            break;
    
        default:
            // Lógica para el caso por defecto (no debería ocurrir)
            alert("Selecciona una demonio válida");
            break;
        }
    }
});

// Funciones para gestionar puntos de atributo
function restarAtributo(atributo) {
    console.log("Restando atributo: " + atributo);

    const atributoElement = document.getElementById(atributo);

    if (puntoatributo.value < 5) {
        if (atributoElement.value > 1) {
            puntoatributo.value++;
            atributoElement.value --;
        }
    } else {
        if (atributoElement.value > 1) {
            atributoElement.value --;
            pt.value = +pt.value + 4;  // Sumar 1 a pt cuando puntoatributo llega a 5
        }
    }

    console.log("puntoAtributo: " + puntoatributo.value);
    console.log(atributo + ": " + atributoElement.value);
    console.log("pt: " + pt.value);
}

function sumarAtributo(atributo) {
    console.log("Sumando atributo: " + atributo);

    const atributoElement = document.getElementById(atributo);

    if (puntoatributo.value > 0 && atributoElement.value < 5) {
        puntoatributo.value--;
        atributoElement.value = +atributoElement.value + 1;
    } else {
        if (pt.value >= 4 && atributoElement.value < 5) {
            atributoElement.value = +atributoElement.value + 1;
            pt.value = +pt.value - 4;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntoAtributo: " + puntoatributo.value);
    console.log(atributo + ": " + atributoElement.value);
    console.log("pt: " + pt.value);
}

// Funciones para gestionar puntos de defensa
function restarDefensa(defensa) {
    console.log("Restando defensa: " + defensa);

    const defensaElement = document.getElementById(defensa);

    if (puntodefensa.value < 3) {
        if (defensaElement.value > 0) {
            puntodefensa.value++;
            defensaElement.value --;
        }
    } else {
        if (defensaElement.value > 0) {
            defensaElement.value --;
            pt.value = pt.value + 3;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntodefensa: " + puntodefensa.value);
    console.log(defensa + ": " + defensaElement.value);
    console.log("pt: " + pt.value);
}

function sumarDefensa(defensa) {
    console.log("Sumando defensa: " + defensa);

    const defensaElement = document.getElementById(defensa);

    if (puntodefensa.value > 0 && defensaElement.value < 3) {
        puntodefensa.value--;
        defensaElement.value = +defensaElement.value + 1;
    } else {
        if (pt.value >= 3 && defensaElement.value < 5) {
            defensaElement.value = +defensaElement.value + 1;
            pt.value = +pt.value - 3;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntodefensa: " + puntodefensa.value);
    console.log(defensa + ": " + defensaElement.value);
    console.log("pt: " + pt.value);
}

// Funciones para gestionar puntos de habilidad
function restarHabilidad(habilidad) {
    console.log("Restando habilidad: " + habilidad);

    const habilidadElement = document.getElementById(habilidad);

    if (puntohabilidad.value < 10) {
        puntohabilidad.value++;
        if (habilidadElement.value > 0) {
            habilidadElement.value = +habilidadElement.value - 1;
        }
    } else {
        if (habilidadElement.value > 0) {
            habilidadElement.value = +habilidadElement.value - 1;
            pt.value = +pt.value + 2;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntohabilidad: " + puntohabilidad.value);
    console.log(habilidad + ": " + habilidadElement.value);
    console.log("pt: " + pt.value);
}

function sumarHabilidad(habilidad) {
    console.log("Sumando habilidad: " + habilidad);

    const habilidadElement = document.getElementById(habilidad);

    if (puntohabilidad.value > 0 && habilidadElement.value < 5) {
        puntohabilidad.value--;
        habilidadElement.value = +habilidadElement.value + 1;
    } else {
        if (pt.value >= 2 && habilidadElement.value < 5) {
            habilidadElement.value = +habilidadElement.value + 1;
            pt.value = +pt.value - 2;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntohabilidad: " + puntohabilidad.value);
    console.log(habilidad + ": " + habilidadElement.value);
    console.log("pt: " + pt.value);
}

// Funciones para gestionar puntos de magia
function restarMagia(magia) {
    console.log("Restando magia: " + magia);

    const magiaElement = document.getElementById(magia);

    if (puntomagia.value < 1) {
        puntomagia.value++;
        if (magiaElement.value > 0) {
            magiaElement.value = +magiaElement.value - 1;
        }
    } else {
        if (magiaElement.value > 0) {
            magiaElement.value = +magiaElement.value - 1;
            pt.value = +pt.value + 3;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntomagia: " + puntomagia.value);
    console.log(magia + ": " + magiaElement.value);
    console.log("pt: " + pt.value);
}

function sumarMagia(magia) {
    console.log("Sumando magia: " + magia);

    const magiaElement = document.getElementById(magia);

    if (puntomagia.value > 0 && magiaElement.value < 5) {
        puntomagia.value--;
        magiaElement.value = +magiaElement.value + 1;
    } else {
        if (pt.value >= 3 && magiaElement.value < 5) {
            magiaElement.value = +magiaElement.value + 1;
            pt.value = +pt.value - 3;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntomagia: " + puntomagia.value);
    console.log(magia + ": " + magiaElement.value);
    console.log("pt: " + pt.value);
}

// Funciones para gestionar puntos de magia y estilos
function restarMye(mye) {
    console.log("Restando mye: " + mye);

    const myeElement = document.getElementById(mye);

    if (puntomye.value < 3) {
        puntomye.value++;
        if (myeElement.value > 0) {
            myeElement.value = +myeElement.value - 1;
        }
    } else {
        if (myeElement.value > 0) {
            myeElement.value = +myeElement.value - 1;
            pt.value = +pt.value + 3;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntomye: " + puntomye.value);
    console.log(mye + ": " + myeElement.value);
    console.log("pt: " + pt.value);
}

function sumarMye(mye) {
    console.log("Sumando mye: " + mye);

    const myeElement = document.getElementById(mye);

    if (puntomye.value > 0 && myeElement.value < 5) {
        puntomye.value--;
        myeElement.value = +myeElement.value + 1;
    } else {
        if (pt.value >= 3 && myeElement.value < 5) {
            myeElement.value = +myeElement.value + 1;
            pt.value = +pt.value - 3;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntomye: " + puntomye.value);
    console.log(mye + ": " + myeElement.value);
    console.log("pt: " + pt.value);
}

// Funciones para gestionar puntos de Habilidades de armas

function restarHa(ha) {
    console.log("Restando ha: " + ha);

    const haElement = document.getElementById(ha);

    if (puntoha.value < 5) {
        puntoha.value++;
        if (haElement.value > 0) {
            haElement.value = +haElement.value - 1;
        }
    } else {
        if (haElement.value > 0) {
            haElement.value = +haElement.value - 1;
            pt.value = +pt.value + 3;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntoha: " + puntoha.value);
    console.log(ha + ": " + haElement.value);
    console.log("pt: " + pt.value);
}

function sumarHa(ha) {
    console.log("Sumando ha: " + ha);

    const haElement = document.getElementById(ha);

    if (puntoha.value > 0 && haElement.value < 5) {
        puntoha.value--;
        haElement.value = +haElement.value + 1;
    } else {
        if (pt.value >= 3 && haElement.value < 5) {
            haElement.value = +haElement.value + 1;
            pt.value = +pt.value - 3;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntoha: " + puntoha.value);
    console.log(ha + ": " + haElement.value);
    console.log("pt: " + pt.value);
}

// Funciones para gestionar puntos Profesiones y oficios

function restarPpo(ppo) {
    console.log("Restando ppo: " + ppo);

    const ppoElement = document.getElementById(ppo);

    if (puntoppo.value < 2) {
        puntoppo.value++;
        if (ppoElement.value > 0) {
            ppoElement.value = +ppoElement.value - 1;
        }
    } else {
        if (ppoElement.value > 0) {
            ppoElement.value = +ppoElement.value - 1;
            pt.value = +pt.value + 2;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntoppo: " + puntoppo.value);
    console.log(ppo + ": " + ppoElement.value);
    console.log("pt: " + pt.value);
}

function sumarPpo(ppo) {
    console.log("Sumando ppo: " + ppo);

    const ppoElement = document.getElementById(ppo);

    if (puntoppo.value > 0 && ppoElement.value < 5) {
        puntoppo.value--;
        ppoElement.value = +ppoElement.value + 1;
    } else {
        if (pt.value >= 2 && ppoElement.value < 5) {
            ppoElement.value = +ppoElement.value + 1;
            pt.value = +pt.value - 2;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntoppo: " + puntoppo.value);
    console.log(ppo + ": " + ppoElement.value);
    console.log("pt: " + pt.value);
}

// Funciones para gestionar puntos de Conocimiento

function restarConocimiento(conocimiento) {
    console.log("Restando conocimiento: " + conocimiento);

    const conocimientoElement = document.getElementById(conocimiento);

    if (puntoconocimiento.value < 4) {
        puntoconocimiento.value++;
        if (conocimientoElement.value > 0) {
            conocimientoElement.value = +conocimientoElement.value - 1;
        }
    } else {
        if (conocimientoElement.value > 0) {
            conocimientoElement.value = +conocimientoElement.value - 1;
            pt.value = +pt.value + 2;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntoconocimiento: " + puntoconocimiento.value);
    console.log(conocimiento + ": " + conocimientoElement.value);
    console.log("pt: " + pt.value);
}

function sumarConocimiento(conocimiento) {
    console.log("Sumando conocimiento: " + conocimiento);

    const conocimientoElement = document.getElementById(conocimiento);

    if (puntoconocimiento.value > 0 && conocimientoElement.value < 5) {
        puntoconocimiento.value--;
        conocimientoElement.value = +conocimientoElement.value + 1;
    } else {
        if (pt.value >= 2 && conocimientoElement.value < 5) {
            conocimientoElement.value = +conocimientoElement.value + 1;
            pt.value = +pt.value - 2;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntoconocimiento: " + puntoconocimiento.value);
    console.log(conocimiento + ": " + conocimientoElement.value);
    console.log("pt: " + pt.value);
}

let ultimoMye = 0;
let ultimoHa = 0;
let ultimoPpo = 0;
let ultimaraza = 0;





/**
 * Recupera el elemento con ID `magesX`, donde `X` equivale a `myeIndex`.
 * 
 * @param {number} myeIndex
 */
function getMye(myeIndex) {
    const grupo = document.getElementById("mages" + myeIndex);
    return grupo;
}

/**
 * Muestra u oculta el elemento `mye` basado en el estado especificado en `estado`.
 * 
 * @param {HTMLElement} mye
 * @param {'mostrar' | 'ocultar'} estado Puede ser 'ocultar' o 'mostrar'
 */
function setEstadoMye(mye, estado) {
    if (estado === 'mostrar') {
        mye.style.display = "block";
    } else if (estado === 'ocultar') {
        mye.style.display = "none";
    }
}

function addmye() {
    const mye = getMye(ultimoMye + 1);
    if (mye != null) { ultimoMye++; }
    else { return; }

    setEstadoMye(mye, 'mostrar');
}

function submye() {
    const mye = getMye(ultimoMye);
    if (mye != null) { ultimoMye--; }
    else { return; }

    setEstadoMye(mye, 'ocultar');
}

function addha() {
    const ha = getha(ultimoHa + 1);
    if (ha != null) { ultimoHa++; }
    else { return; }

    setEstadoha(ha, 'mostrar');
}

function subha() {
    const ha = getha(ultimoHa);
    if (ha != null) { ultimoHa--; }
    else { return; }

    setEstadoha(ha, 'ocultar');
}

/**
 * Recupera el elemento con ID `magesX`, donde `X` equivale a `haIndex`.
 * 
 * @param {number} haIndex
 */
 function getha(haIndex) {
    const grupo = document.getElementById("arma" + haIndex);
    return grupo;
}

/**
 * Muestra u oculta el elemento `ha` basado en el estado especificado en `estado`.
 * 
 * @param {HTMLElement} ha
 * @param {'mostrar' | 'ocultar'} estado Puede ser 'ocultar' o 'mostrar'
 */
function setEstadoha(ha, estado) {
    if (estado === 'mostrar') {
        ha.style.display = "block";
    } else if (estado === 'ocultar') {
        ha.style.display = "none";
    }
}

function addppo() {
    const ppo = getppo(ultimoPpo + 1);
    if (ppo != null) { ultimoPpo++; }
    else { return; }

    setEstadoppo(ppo, 'mostrar');
}

function subppo() {
    const ppo = getppo(ultimoPpo);
    if (ppo != null) { ultimoPpo--; }
    else { return; }

    setEstadoppo(ppo, 'ocultar');
}

/**
 * Recupera el elemento con ID `magesX`, donde `X` equivale a `haIndex`.
 * 
 * @param {number} ppoIndex
 */
 function getppo(ppoIndex) {
    const grupo = document.getElementById("prof" + ppoIndex);
    return grupo;
}

/**
 * Muestra u oculta el elemento `ppo` basado en el estado especificado en `estado`.
 * 
 * @param {HTMLElement} ppo
 * @param {'mostrar' | 'ocultar'} estado Puede ser 'ocultar' o 'mostrar'
 */
function setEstadoppo(ppo, estado) {
    if (estado === 'mostrar') {
        ppo.style.display = "block";
    } else if (estado === 'ocultar') {
        ppo.style.display = "none";
    }
}

// Función para guardar la ficha
function guardarFicha() {
    // Implementa la lógica para guardar la ficha aquí
    alert("Ficha guardada correctamente");
}

// Evento que se dispara cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Inicializar variables globales
    const puntoatributo = document.getElementById("puntoatributo");
    const pt = document.getElementById("pt");
});
