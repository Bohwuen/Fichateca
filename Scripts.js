let UltimoMye = 0;
let UltimoHa = 0;
let UltimoPpo = 0;
let UltimaRaza = 0;

// VARIABLES

Titulo = 0;
Nombre = 0;
Apellidos = 0;
Nacimiento = 0;
Faccion = 0;
Alineamiento = 0;
Raza = 0;
Subraza = 0;
Clase = 0;
Nivel = 0;
Experiencia = 0;
Pg = 0;
Pa = 0;
Destreza = 0;
Percepcion = 0;
Voluntad = 0;
Vigor = 0;
Inteligencia = 0;
Aguante = 0;
Energia = 0;
Pd = 0;
Parada = 0;
Esquivar = 0;
Bloqueo = 0;
Metamagia = 0;
Ph = 0;
Atletismo = 0;
Robo = 0;
Sigilo = 0;
Forcer = 0;
Subsist = 0;
Escalar = 0;
Buscar = 0;
Alerta = 0;
Aprend = 0;
Interp = 0;
Subter = 0;
Tratanim = 0;
Intimidacion = 0;
Carisma = 0;
SaludAct = 0;
ArmadAct = 0;
VelAct = 0;
TipoArmadura = 0;
Yelmo = 0;
Torso = 0;
Pies = 0;
Escudo = 0;
Escudo1 = 0;
ResFis = 0;
ResArc = 0;
ResSomb = 0;
ResFu = 0;
ResNat = 0;
ResFri = 0;
ResLuz = 0;
Phm = 0;
Taumaturgia = 0;
Fe = 0;
Espiritu = 0;
Naturaleza = 0;
Corrupcion = 0;
DanoArmaPrim = 0;
DanoArmaSec = 0;
DanoMag = 0;
Mye0 = 0;
Mye1 = 0;
Mye2 = 0;
Mye3 = 0;
Mye4 = 0;
Mye5 = 0;
Mye6 = 0;
Mye7 = 0;
Ha0 = 0;
Ha1 = 0;
Ha2 = 0;
Ha3 = 0;
Ha4 = 0;
Ha5 = 0;
Ha6 = 0;
Ha7 = 0;
Ha8 = 0;
Ha9 = 0;
Ha10 = 0;
Ha11 = 0;
Ha12 = 0;
Ha13 = 0;
Ha14 = 0;
Ha15 = 0;
Ha16 = 0;
Ha17 = 0;
Ppo = 0;
Sppo0 = 0;
Sppo1 = 0;
Sppo2 = 0;
Pco = 0;
Jinete = 0;
Pesca = 0;
Arquologia = 0;
PrimerosAuxilios = 0;
Cocina = 0;
ConMag = 0;
Desc = 0;
Trans = 0;
Inventario = 0;
Oro = 0;
Plata = 0;
Cobre = 0;

function cambiarNivel(Id, PtId, Incremento) {
        var Nivel = document.getElementById(Id);
        var Pt = document.getElementById(PtId);
        var Num = parseInt(Nivel.value);
        var PtNum = parseInt(Pt.value);

        if ((Incremento === -1 && Num > 1) || (Incremento === 1 && Num < 25)) {
            Num += Incremento;
            Nivel.value = Num;

      // Ajusta pt según el incremento
    PtNum += Incremento * 7;
    Pt.value = PtNum;

      // Habilita o deshabilita botones según el valor de pt
    habilitarDeshabilitarBotones(PtNum);
    }
  }

function modificarAtributo(Id, PtId, Resta, Incremento) {
    var Campo = document.getElementById(Id);
    var Pt = document.getElementById(PtId);
    var Num = parseInt(Campo.value);
    var PtNum = parseInt(Pt.value);

    // Verifica si es posible modificar el atributo
    if (PtNum >= 4 && ((Incremento === -1 && Num > 1) || (Incremento === 1 && Num < 5))) {
        Num += Incremento;
        Campo.value = Num;

        // Resta o suma 4 a pt según el incremento
        PtNum += Resta * Incremento;
        Pt.value = PtNum;
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


function updateTextInput(Valor) {
    document.getElementById('mye0').value = Valor;
    document.getElementById('ha0').value = Valor;
}


function calcphm(Valor) {


    if (Valor.value > Valor.oldvalue && document.getElementById("phm").value > 0) {
        document.getElementById("phm").value--;
    }
    if (Valor.value < Valor.oldvalue && document.getElementById("phm").value >= 0) {
        document.getElementById("phm").value++;
    }
}

function calcmye(Valor) {


    if (Valor.value > Valor.oldvalue && document.getElementById("pmye").value > 0) {
        document.getElementById("pmye").value--;
    }
    if (Valor.value < Valor.oldvalue && document.getElementById("pmye").value >= 0) {
        document.getElementById("pmye").value++;
    }
}

function calcha(Valor) {


    if (Valor.value > Valor.oldvalue && document.getElementById("pha").value > 0) {
        document.getElementById("pha").value--;
    }
    if (Valor.value < Valor.oldvalue && document.getElementById("pha").value >= 0) {
        document.getElementById("pha").value++;
    }
}

function calcppo(Valor) {


    if (Valor.value > Valor.oldvalue && document.getElementById("ppo").value > 0) {
        document.getElementById("ppo").value--;
    }
    if (Valor.value < Valor.oldvalue && document.getElementById("ppo").value >= 0) {
        document.getElementById("ppo").value++;
    }
}

function calpco(Valor) {


    if (Valor.value > Valor.oldvalue && document.getElementById("pco").value > 0) {
        document.getElementById("pco").value--;
    }
    if (Valor.value < Valor.oldvalue && document.getElementById("pco").value >= 0) {
        document.getElementById("pco").value++;
    }
}

// JQUERY

$(function(){
    $("#raza").change(function(){
        var RazaSeleccionada=$(this).val();
        //alert(valor);
        $("#id2").each(function(){
            var RazaElemento=$(this).attr("id");
            //alert(valor2);
            if(RazaElemento.indexOf(RazaSeleccionada)>=0)
            $(this).show();
            else $(this).hide();
        });
    });
});

$(function(){
    $("#raza").change(function(){
        
                $("#humano").hide();
                $("#enano").hide();
                $("#gnomo").hide();
                $("#kaldorei").hide();
                $("#draenei").hide();
                $("#orco").hide();
                $("#trol").hide();
                $("#tauren").hide();
                
            
        var RazaSeleccionada=$(this).val();
        
            switch(RazaSeleccionada){
                case "1": $("#humano").show();break;
                case "2": $("#enano").show();break;
                case "3": $("#gnomo").show();break;
                case "4": $("#kaldorei").show();break;
                case "5": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "6": $("#draenei").show();break;
                case "7": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "8": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "9": $("#orco").show();break;
                case "10": $("#trol").show();break;
                case "11": $("#tauren").show();break;
                case "12": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "13": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "14": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "15": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "16": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "17": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
                case "18": $("#humano #enano #kaldorei #draenei #orco #trol #tauren").hide();break;
            }
        });                                                                              
    });

$(function(){
    $("#subraza").change(function(){
        var SubrazaSeleccionada=$(this).val();
        //alert(valor);
        $("#id2").each(function(){
            var SubrazaElemento=$(this).attr("id");
            //alert(valor2);
            if(SubrazaElemento.indexOf(SubrazaSeleccionada)>=0)
            $(this).show();
            else $(this).hide();
        });
    });
});

$(function(){
    $("#subraza").change(function(){
        
                
            
        var SubrazaSeleccionada=$(this).val();
        
            switch(SubrazaSeleccionada){
                case "1": $("#")();break;
                case "2": $("#")();break;
                case "3": $("#")();break;
                case "4": $("#")();break;
                case "5": $("#")();break;
                case "6": $("#")();break;
                case "7": $("#")();break;
                case "8": $("#")();break;
                case "9": $("#")();break;
                case "10": $("#")();break;
                case "11": $("#")();break;
                case "12": $("#")();break;
                case "13": $("#")();break;
                case "14": $("#")();break;
                case "15": $("#")();break; 
                case "16": $("#")();break; 
                case "17": $("#")();break; 
                case "18": $("#")();break; 
                case "19": $("#")();break; 
                case "20": $("#")();break; 
                case "21": $("#")();break; 
                case "22": $("#")();break;                  
            }
        });                                                                              
    });

$(function(){
    $("#clase").change(function(){
        var ClaseSeleccionada=$(this).val();
        $("#id2").each(function(){
            var ClaseElemento=$(this).attr("id");
            if(ClaseElemento.indexOf(ClaseSeleccionada)>=0)
            $(this).show();
            else $(this).hide();
        });
    });
});

$(function(){
    $("#clase").change(function(){
        
                
            
        var ClaseSeleccionada=$(this).val();
        
            switch(ClaseSeleccionada){
                case "1": $("#")();break;
                case "2": $("#")();break;
                case "3": $("#")();break;
                case "4": $("#")();break;
                case "5": $("#")();break;
                case "6": $("#")();break;
                case "7": $("#")();break;
                case "8": $("#")();break;
                case "9": $("#")();break;
                case "10": $("#")();break;
                case "11": $("#")();break;
                case "12": $("#")();break;
                case "13": $("#")();break;                
            }
        });                                                                              
    });