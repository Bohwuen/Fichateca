// ensayo.js

// Funciones para gestionar el nivel y puntos de trasfondo
function restarNivel() {
    const Nivel = document.getElementById("nivel");
    const Pt = document.getElementById("pt");

    if (Nivel.value > 1) {
        Nivel.value--;
        Pt.value = +Pt.value - 7;
    }
}

function sumarNivel() {
    const Nivel = document.getElementById("nivel");
    const Pt = document.getElementById("pt");

    if (Nivel.value < 25) {
        Nivel.value++;
        Pt.value = +Pt.value + 7;
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
        var RazaSeleccionada = document.getElementById("razas").value;
    
        // Obtener el contenedor de subrazas
        var SubrazasContainer = document.getElementById("subrazasContainer");
    
        // Obtener el selector de subrazas
        var SubrazasSelector = document.getElementById("subrazas");
    
        // Ocultar el contenedor de subrazas por defecto
        SubrazasContainer.style.display = "none";
  
    // Utilizar un bloque switch para manejar cada caso
    switch (RazaSeleccionada) {
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
        var RazaSeleccionada = document.getElementById("razas").value;
  
    // Obtener el contenedor de subrazas
        var SubrazasContainer = document.getElementById("subrazasContainer");
  
    // Obtener el selector de subrazas
        var SubrazasSelector = document.getElementById("subrazas");
  
    // Limpiar las opciones anteriores
        SubrazasSelector.innerHTML = "";
  
    // Obtener el valor seleccionado en el selector de subrazas
        var SubrazaSeleccionada = SubrazasSelector.value;
  
    // Verificar si se ha seleccionado alguna subraza
    if (SubrazaSeleccionada !== "") {
      // Llamar a la función que maneja las opciones de subrazas
      manejarSubraza(SubrazaSeleccionada);
    }


    // Verificar la raza seleccionada y agregar opciones correspondientes
    switch (RazaSeleccionada) {
      case "humano":
        agregarOpcion(SubrazasSelector, "Elegir subraza");
        agregarOpcion(SubrazasSelector, "Ventormenta");
        agregarOpcion(SubrazasSelector, "Lordaeron");
        agregarOpcion(SubrazasSelector, "Dalaran");
        agregarOpcion(SubrazasSelector, "Gilneas");
        agregarOpcion(SubrazasSelector, "Alterac");
        agregarOpcion(SubrazasSelector, "Kul Tiras");
        agregarOpcion(SubrazasSelector, "Strom");
        break;

      case "enano":
        agregarOpcion(SubrazasSelector, "Elegir subraza");
        agregarOpcion(SubrazasSelector, "Barbabronce");
        agregarOpcion(SubrazasSelector, "Hierro Negro");
        agregarOpcion(SubrazasSelector, "Martillo Salvaje");
        // Agregar más subrazas si es necesario
        break;

      case "elfoNoche":
        agregarOpcion(SubrazasSelector, "Elegir subraza");
        agregarOpcion(SubrazasSelector, "Darnassiano");
        agregarOpcion(SubrazasSelector, "Altonato");
        // Agregar más subrazas si es necesario
        break;

      case "draenei":
        agregarOpcion(SubrazasSelector, "Elegir subraza");
        agregarOpcion(SubrazasSelector, "Draenei");
        agregarOpcion(SubrazasSelector, "Forjaluz");
        agregarOpcion(SubrazasSelector, "Manari");
        // Agregar más subrazas si es necesario
        break;

      case "orco":
        agregarOpcion(SubrazasSelector, "Elegir subraza");
        agregarOpcion(SubrazasSelector, "Durotar");
        agregarOpcion(SubrazasSelector, "Magari");
        // Agregar más subrazas si es necesario
        break;

      case "trol":
        agregarOpcion(SubrazasSelector, "Elegir subraza");
        agregarOpcion(SubrazasSelector, "Lanza Negra");
        agregarOpcion(SubrazasSelector, "Zandalari");
        agregarOpcion(SubrazasSelector, "Farraki");
        agregarOpcion(SubrazasSelector, "Gurubashi");
        agregarOpcion(SubrazasSelector, "Amani");
        agregarOpcion(SubrazasSelector, "Trol de Hielo");
        agregarOpcion(SubrazasSelector, "Drakkari");
        // Agregar más subrazas si es necesario
        break;

      case "tauren":
        agregarOpcion(SubrazasSelector, "Elegir subraza");
        agregarOpcion(SubrazasSelector, "Mulgore");
        agregarOpcion(SubrazasSelector, "Monte Alto");
        // Agregar más subrazas si es necesario
        break;

      case "gnomo":
        agregarOpcion(SubrazasSelector, "Elegir subraza");
        agregarOpcion(SubrazasSelector, "Gnomeregan");
        agregarOpcion(SubrazasSelector, "Mecandria");
        // Agregar más subrazas si es necesario
        break;

      default:
        // Si no se selecciona ninguna raza, ocultar el contenedor de subrazas
        SubrazasContainer.style.display = "none";
        return;
    }

    // Mostrar el contenedor de subrazas
    SubrazasContainer.style.display = "block";
  }
    
    // Declarar el selector de subrazas en un ámbito más amplio
    var SubrazasSelector = document.getElementById("subrazas");

    // Evento onchange para el selector de subrazas
    document.getElementById("subrazas").onchange = function() {
        // Obtener el valor seleccionado en el selector de subrazas
        var SubrazaSeleccionada = document.getElementById("subrazas").value;
    
        // Verificar si se ha seleccionado alguna subraza
        if (SubrazaSeleccionada !== "") {
        // Llamar a la función que maneja las opciones de subrazas
        manejarSubraza(SubrazaSeleccionada);
        }
    };

    function agregarOpcion(Selector, Valor) {
        var Opcion = document.createElement("option");
        Opcion.value = Valor;
        Opcion.text = Valor;
        Selector.add(Opcion);
      }
        // Llamar a mostrarSubrazas después de cargar el DOM
        mostrarSubrazas();

    function reiniciarAtributos(){
        //Poner a 1 los atributos correspondientes.
    }
    // Función que maneja las opciones de subrazas
    function manejarSubraza(SubrazaSeleccionada) {
        // Utilizar un bloque switch para manejar cada caso de subraza
        switch (SubrazaSeleccionada) {
        case "Ventormenta":
            // Lógica para la subraza Ventormenta de Humanos
            var Minimo = document.getElementById('inteligencia');
            Minimo.min=parseInt(Minimo.min)+1;
            Minimo.value=parseInt(Minimo.value)+1;
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
        var ClaseSeleccionada = document.getElementById("clase").value;
    
        // Obtener el contenedor de demonios
        var DemoniosContainer = document.getElementById("demonioContainer");
    
        // Obtener el selector de demonios
        var DemoniosSelector = document.getElementById("demonios");
    
        // Ocultar el contenedor de demonios por defecto
        DemoniosContainer.style.display = "none";
  
    // Utilizar un bloque switch para manejar cada caso
    switch (ClaseSeleccionada) {
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
    var ClaseSeleccionada = document.getElementById("clase").value;
  
    // Obtener el contenedor de demonios
    var DemoniosContainer = document.getElementById("demonioContainer");
  
    // Obtener el selector de demonios
    var DemoniosSelector = document.getElementById("demonios");
  
    // Limpiar las opciones anteriores
    DemoniosSelector.innerHTML = "";
  
    // Obtener el valor seleccionado en el selector de demonios
    var DemonioSeleccionado = DemoniosSelector.value;
  
    // Verificar si se ha seleccionado alguna subraza
    if (DemonioSeleccionado !== "") {
      // Llamar a la función que maneja las opciones de demonios
      manejarDemonio(DemonioSeleccionado);
    }


    // Verificar la raza seleccionada y agregar opciones correspondientes
    switch (ClaseSeleccionada) {
      case "CazDemon":
        agregarOpcionD(DemoniosSelector, "Elegir demonio");
        agregarOpcionD(DemoniosSelector, "Diablillo");
        agregarOpcionD(DemoniosSelector, "Sucubo");
        agregarOpcionD(DemoniosSelector, "Manafago");
        agregarOpcionD(DemoniosSelector, "Guardia vil");
        agregarOpcionD(DemoniosSelector, "Guardia de cólera");
        agregarOpcionD(DemoniosSelector, "Guardia Apocaliptico");
        agregarOpcionD(DemoniosSelector, "Shivarra");
        agregarOpcionD(DemoniosSelector, "Guardia Terrorifico");
        agregarOpcionD(DemoniosSelector, "Mo´Arg");
        agregarOpcionD(DemoniosSelector, "Carcelero");
        agregarOpcionD(DemoniosSelector, "Inquisidor");
        agregarOpcionD(DemoniosSelector, "Murcielago vil");
        break;

      default:
        // Si no se selecciona ninguna clase, ocultar el contenedor de demonio interior
        DemoniosContainer.style.display = "none";
        return;
    }

     // Mostrar el contenedor de demonios
    DemoniosContainer.style.display = "block";
}
  
  // Declarar el selector de demonios en un ámbito más amplio
    var DemoniosSelector = document.getElementById("demonios");

  // Evento onchange para el selector de demonios
  document.getElementById("demonios").onchange = function() {
      // Obtener el valor seleccionado en el selector de demonios
    var DemonioSeleccionado = document.getElementById("demonios").value;
  
      // Verificar si se ha seleccionado alguna subraza
    if (DemonioSeleccionado !== "") {
      // Llamar a la función que maneja las opciones de demonios
    manejarDemonio(DemonioSeleccionado);
      }
  };

  function agregarOpcionD(Selector, Valor) {
    var Opcion = document.createElement("option");
    Opcion.value = Valor;
    Opcion.text = Valor;
    Selector.add(Opcion);
    }
      // Llamar a mostrarDemonios después de cargar el DOM
      mostrarDemonios();


  // Función que maneja las opciones de demonios
  function manejarDemonio(DemonioSeleccionado) {
        // Utilizar un bloque switch para manejar cada caso de demonio
        switch (DemonioSeleccionado) {
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
function restarAtributo(Atributo) {
    console.log("Restando atributo: " + Atributo);

    const ElementoAtributo = document.getElementById(Atributo);
    const PuntoAtributo = document.getElementById("puntoatributo");
    const Pt = document.getElementById("pt");

    if (PuntoAtributo.value < 5) {
        if (ElementoAtributo.value > 1) {
            PuntoAtributo.value++;
            ElementoAtributo.value --;
        }
    } else {
        if (ElementoAtributo.value > 1) {
            ElementoAtributo.value --;
            Pt.value = +Pt.value + 4;  // Sumar 1 a pt cuando puntoatributo llega a 5
        }
    }

    console.log("puntoAtributo: " + PuntoAtributo.value);
    console.log(Atributo + ": " + ElementoAtributo.value);
    console.log("pt: " + Pt.value);
}

function sumarAtributo(Atributo) {
    console.log("Sumando atributo: " + Atributo);

    const ElementoAtributo = document.getElementById(Atributo);
    const PuntoAtributo = document.getElementById("puntoatributo");
    const Pt = document.getElementById("pt");

    if (PuntoAtributo.value > 0 && ElementoAtributo.value < 5) {
        PuntoAtributo.value--;
        ElementoAtributo.value = +ElementoAtributo.value + 1;
    } else {
        if (Pt.value >= 4 && ElementoAtributo.value < 5) {
            ElementoAtributo.value = +ElementoAtributo.value + 1;
            Pt.value = +Pt.value - 4;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntoAtributo: " + PuntoAtributo.value);
    console.log(Atributo + ": " + ElementoAtributo.value);
    console.log("pt: " + Pt.value);
}

// Funciones para gestionar puntos de defensa
function restarDefensa(Defensa) {
    console.log("Restando defensa: " + Defensa);

    const ElementoDefensa = document.getElementById(Defensa);
    const PuntoDefensa = document.getElementById("puntodefensa");
    const Pt = document.getElementById("pt");

    if (PuntoDefensa.value < 3) {
        if (ElementoDefensa.value > 0) {
            PuntoDefensa.value ++;
            ElementoDefensa.value --;
        }
    } else {
        if (ElementoDefensa.value > 0) {
            ElementoDefensa.value --;
            Pt.value +3;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntodefensa: " + PuntoDefensa.value);
    console.log(Defensa + ": " + ElementoDefensa.value);
    console.log("pt: " + Pt.value);
}

function sumarDefensa(Defensa) {
    console.log("Sumando defensa: " + Defensa);

    const ElementoDefensa = document.getElementById(Defensa);
    const PuntoDefensa = document.getElementById("puntodefensa");
    const Pt = document.getElementById("pt");

    if (PuntoDefensa.value > 0 && ElementoDefensa.value < 3) {
        PuntoDefensa.value--;
        ElementoDefensa.value = +ElementoDefensa.value + 1;
    } else {
        if (Pt.value >= 3 && ElementoDefensa.value < 5) {
            ElementoDefensa.value = +ElementoDefensa.value + 1;
            Pt.value = +Pt.value - 3;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntodefensa: " + PuntoDefensa.value);
    console.log(Defensa + ": " + ElementoDefensa.value);
    console.log("pt: " + Pt.value);
}

// Funciones para gestionar puntos de habilidad
function restarHabilidad(Habilidad) {
    console.log("Restando habilidad: " + Habilidad);

    const ElementoHabilidad = document.getElementById(Habilidad);
    const PuntoHabilidad = document.getElementById("puntohabilidad");
    const Pt = document.getElementById("pt");

    if (PuntoHabilidad.value < 10) {
        if (ElementoHabilidad.value > 0) {
            PuntoHabilidad.value ++;
            ElementoHabilidad.value --;
        }
    } else {
        if (ElementoHabilidad.value > 0) {
            ElementoHabilidad.value --;
            Pt.value = +Pt.value + 2;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntohabilidad: " + PuntoHabilidad.value);
    console.log(Habilidad + ": " + ElementoHabilidad.value);
    console.log("pt: " + Pt.value);
}

function sumarHabilidad(Habilidad) {
    console.log("Sumando habilidad: " + Habilidad);

    const ElementoHabilidad = document.getElementById(Habilidad);
    const PuntoHabilidad = document.getElementById("puntohabilidad");
    const Pt = document.getElementById("pt");

    if (PuntoHabilidad.value > 0 && ElementoHabilidad.value < 5) {
        PuntoHabilidad.value--;
        ElementoHabilidad.value = +ElementoHabilidad.value + 1;
    } else {
        if (Pt.value >= 2 && ElementoHabilidad.value < 5) {
            ElementoHabilidad.value = +ElementoHabilidad.value + 1;
            Pt.value = +Pt.value - 2;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntohabilidad: " + PuntoHabilidad.value);
    console.log(Habilidad + ": " + ElementoHabilidad.value);
    console.log("pt: " + Pt.value);
}

// Funciones para gestionar puntos de magia
function restarMagia(Magia) {
    console.log("Restando magia: " + Magia);

    const ElementoMagia = document.getElementById(Magia);
    const PuntoMagia = document.getElementById("puntomagia");
    const Pt = document.getElementById("pt");

    if (PuntoMagia.value < 1) {
        if (ElementoMagia.value > 0) {
            PuntoMagia.value ++;
            ElementoMagia.value --;
        }
    } else {
        if (ElementoMagia.value > 0) {
            ElementoMagia.value --;
            Pt.value = +Pt.value + 3;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntomagia: " + PuntoMagia.value);
    console.log(Magia + ": " + ElementoMagia.value);
    console.log("pt: " + Pt.value);
}

function sumarMagia(Magia) {
    console.log("Sumando magia: " + Magia);

    const ElementoMagia = document.getElementById(Magia);
    const PuntoMagia = document.getElementById("puntomagia");
    const Pt = document.getElementById("pt");

    if (PuntoMagia.value > 0 && ElementoMagia.value < 5) {
        PuntoMagia.value--;
        ElementoMagia.value = +ElementoMagia.value + 1;
    } else {
        if (Pt.value >= 3 && ElementoMagia.value < 5) {
            ElementoMagia.value = +ElementoMagia.value + 1;
            Pt.value = +Pt.value - 3;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntomagia: " + PuntoMagia.value);
    console.log(Magia + ": " + ElementoMagia.value);
    console.log("pt: " + Pt.value);
}

// Funciones para gestionar puntos de magia y estilos
function restarMye(Mye) {
    console.log("Restando mye: " + Mye);

    const ElementoMye = document.getElementById(Mye);
    const PuntoMye = document.getElementById("puntomye");
    const Pt = document.getElementById("pt");

    if (PuntoMye.value < 3) {
        if (ElementoMye.value > 0) {
            PuntoMye.value ++;
            ElementoMye.value --;
        }
    } else {
        if (ElementoMye.value > 0) {
            ElementoMye.value --;
            Pt.value = +Pt.value + 3;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntomye: " + PuntoMye.value);
    console.log(Mye + ": " + ElementoMye.value);
    console.log("pt: " + Pt.value);
}

function sumarMye(Mye) {
    console.log("Sumando mye: " + Mye);

    const ElementoMye = document.getElementById(Mye);
    const PuntoMye = document.getElementById("puntomye");
    const Pt = document.getElementById("pt");

    if (PuntoMye.value > 0 && ElementoMye.value < 5) {
        PuntoMye.value--;
        ElementoMye.value = +ElementoMye.value + 1;
    } else {
        if (Pt.value >= 3 && ElementoMye.value < 5) {
            ElementoMye.value = +ElementoMye.value + 1;
            Pt.value = +Pt.value - 3;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntomye: " + PuntoMye.value);
    console.log(Mye + ": " + ElementoMye.value);
    console.log("pt: " + Pt.value);
}

// Funciones para gestionar puntos de Habilidades de armas

function restarHa(Ha) {
    console.log("Restando ha: " + Ha);

    const ElementoHa = document.getElementById(Ha);
    const PuntoHa = document.getElementById("puntoha");
    const Pt = document.getElementById("pt");

    if (PuntoHa.value < 5) {

        if (ElementoHa.value > 0) {
            PuntoHa.value ++;
            ElementoHa.value --;
        }
    } else {
        if (ElementoHa.value > 0) {
            ElementoHa.value --;
            Pt.value = +Pt.value + 3;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntoha: " + PuntoHa.value);
    console.log(Ha + ": " + ElementoHa.value);
    console.log("pt: " + Pt.value);
}

function sumarHa(Ha) {
    console.log("Sumando ha: " + Ha);

    const ElementoHa = document.getElementById(Ha);
    const PuntoHa = document.getElementById("puntoha");
    const Pt = document.getElementById("pt");

    if (PuntoHa.value > 0 && ElementoHa.value < 5) {
        PuntoHa.value--;
        ElementoHa.value = +ElementoHa.value + 1;
    } else {
        if (Pt.value >= 3 && ElementoHa.value < 5) {
            ElementoHa.value = +ElementoHa.value + 1;
            Pt.value = +Pt.value - 3;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntoha: " + PuntoHa.value);
    console.log(Ha + ": " + ElementoHa.value);
    console.log("pt: " + Pt.value);
}

// Funciones para gestionar puntos Profesiones y oficios

function restarPpo(Ppo) {
    console.log("Restando ppo: " + Ppo);

    const ElementoPpo = document.getElementById(Ppo);
    const PuntoPpo = document.getElementById("puntoppo");
    const Pt = document.getElementById("pt");

    if (PuntoPpo.value < 2) {

        if (ElementoPpo.value > 0) {
            PuntoPpo.value++;
            ElementoPpo.value --;
        }
    } else {
        if (ElementoPpo.value > 0) {
            ElementoPpo.value --;
            Pt.value = +Pt.value + 2;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntoppo: " + PuntoPpo.value);
    console.log(Ppo + ": " + ElementoPpo.value);
    console.log("pt: " + Pt.value);
}

function sumarPpo(Ppo) {
    console.log("Sumando ppo: " + Ppo);

    const ElementoPpo = document.getElementById(Ppo);
    const PuntoPpo = document.getElementById("puntoppo");
    const Pt = document.getElementById("pt");

    if (PuntoPpo.value > 0 && ElementoPpo.value < 5) {
        PuntoPpo.value--;
        ElementoPpo.value = +ElementoPpo.value + 1;
    } else {
        if (Pt.value >= 2 && ElementoPpo.value < 5) {
            ElementoPpo.value = +ElementoPpo.value + 1;
            Pt.value = +Pt.value - 2;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntoppo: " + PuntoPpo.value);
    console.log(Ppo + ": " + ElementoPpo.value);
    console.log("pt: " + Pt.value);
}

// Funciones para gestionar puntos de Conocimiento

function restarConocimiento(Conocimiento) {
    console.log("Restando conocimiento: " + Conocimiento);

    const ElementoConocimiento = document.getElementById(Conocimiento);
    const PuntoConocimiento = document.getElementById("puntoconocimiento");
    const Pt = document.getElementById("pt");

    if (PuntoConocimiento.value < 4) {

        if (ElementoConocimiento.value > 0) {
            PuntoConocimiento.value ++;
            ElementoConocimiento.value --;
        }
    } else {
        if (ElementoConocimiento.value > 0) {
            ElementoConocimiento.value --;
            Pt.value = +Pt.value + 2;  // Sumar 1 a pt cuando puntodefensa llega a 3
        }
    }

    console.log("puntoconocimiento: " + PuntoConocimiento.value);
    console.log(Conocimiento + ": " + ElementoConocimiento.value);
    console.log("pt: " + Pt.value);
}

function sumarConocimiento(Conocimiento) {
    console.log("Sumando conocimiento: " + Conocimiento);

    const ElementoConocimiento = document.getElementById(Conocimiento);
    const PuntoConocimiento = document.getElementById("puntoconocimiento");
    const Pt = document.getElementById("pt");

    if (PuntoConocimiento.value > 0 && ElementoConocimiento.value < 5) {
        PuntoConocimiento.value--;
        ElementoConocimiento.value = +ElementoConocimiento.value + 1;
    } else {
        if (Pt.value >= 2 && ElementoConocimiento.value < 5) {
            ElementoConocimiento.value = +ElementoConocimiento.value + 1;
            Pt.value = +Pt.value - 2;  // Restar 1 a pt cuando puntoatributo es 0
        }
    }

    console.log("puntoconocimiento: " + PuntoConocimiento.value);
    console.log(Conocimiento + ": " + ElementoConocimiento.value);
    console.log("pt: " + Pt.value);
}

let UltimoMye = 0;
let UltimoHa = 0;
let UltimoPpo = 0;
let UltimaRaza = 0;





/**
 * Recupera el elemento con ID `magesX`, donde `X` equivale a `myeIndex`.
 * 
 * @param {number} myeIndex
 */
function getMye(MyeIndex) {
    const Grupo = document.getElementById("mages" + MyeIndex);
    return Grupo;
}

/**
 * Muestra u oculta el elemento `mye` basado en el estado especificado en `estado`.
 * 
 * @param {HTMLElement} mye
 * @param {'mostrar' | 'ocultar'} estado Puede ser 'ocultar' o 'mostrar'
 */
function setEstadoMye(Mye, Estado) {
    if (Estado === 'mostrar') {
        Mye.style.display = "block";
    } else if (Estado === 'ocultar') {
        Mye.style.display = "none";
    }
}

function addmye() {
    const Mye = getMye(UltimoMye + 1);
    if (Mye != null) { UltimoMye++; }
    else { return; }

    setEstadoMye(Mye, 'mostrar');
}

function submye() {
    const Mye = getMye(UltimoMye);
    if (Mye != null) { UltimoMye--; }
    else { return; }

    setEstadoMye(Mye, 'ocultar');
}

function addha() {
    const Ha = getha(UltimoHa + 1);
    if (Ha != null) { UltimoHa++; }
    else { return; }

    setEstadoha(Ha, 'mostrar');
}

function subha() {
    const Ha = getha(UltimoHa);
    if (Ha != null) { UltimoHa--; }
    else { return; }

    setEstadoha(Ha, 'ocultar');
}

/**
 * Recupera el elemento con ID `magesX`, donde `X` equivale a `haIndex`.
 * 
 * @param {number} haIndex
 */
 function getha(HaIndex) {
     const Grupo = document.getElementById("arma" + HaIndex);
     return Grupo;
}

/**
 * Muestra u oculta el elemento `ha` basado en el estado especificado en `estado`.
 * 
 * @param {HTMLElement} ha
 * @param {'mostrar' | 'ocultar'} estado Puede ser 'ocultar' o 'mostrar'
 */
function setEstadoha(Ha, Estado) {
    if (Estado === 'mostrar') {
        Ha.style.display = "block";
    } else if (Estado === 'ocultar') {
        Ha.style.display = "none";
    }
}

function addppo() {
    const Ppo = getppo(UltimoPpo + 1);
    if (Ppo != null) { UltimoPpo++; }
    else { return; }

    setEstadoppo(Ppo, 'mostrar');
}

function subppo() {
    const Ppo = getppo(UltimoPpo);
    if (Ppo != null) { UltimoPpo--; }
    else { return; }

    setEstadoppo(Ppo, 'ocultar');
}

/**
 * Recupera el elemento con ID `magesX`, donde `X` equivale a `haIndex`.
 * 
 * @param {number} ppoIndex
 */
 function getppo(PpoIndex) {
     const Grupo = document.getElementById("prof" + PpoIndex);
     return Grupo;
}

/**
 * Muestra u oculta el elemento `ppo` basado en el estado especificado en `estado`.
 * 
 * @param {HTMLElement} ppo
 * @param {'mostrar' | 'ocultar'} estado Puede ser 'ocultar' o 'mostrar'
 */
function setEstadoppo(Ppo, Estado) {
    if (Estado === 'mostrar') {
        Ppo.style.display = "block";
    } else if (Estado === 'ocultar') {
        Ppo.style.display = "none";
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
    const PuntoAtributo = document.getElementById("puntoatributo");
    const Pt = document.getElementById("pt");
});
