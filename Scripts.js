let ultimoMye = 0;
let ultimoHa = 0;
let ultimoPpo = 0;
let ultimaraza = 0;

// VARIABLES

titulo = 0;
nombre = 0;
apellidos = 0;
nacimiento = 0;
faccion = 0;
alineamiento = 0;
raza = 0;
subraza = 0;
clase = 0;
nivel = 0;
experiencia = 0;
pg = 0;
pa = 0;
destreza = 0;
percepcion = 0;
voluntad = 0;
vigor = 0;
inteligencia = 0;
aguante = 0;
energia = 0;
pd = 0;
parada = 0;
esquivar = 0;
bloqueo = 0;
metamagia = 0;
ph = 0;
atletismo = 0;
robo = 0;
sigilo = 0;
forcer = 0;
subsist = 0;
escalar = 0;
buscar = 0;
alerta = 0;
aprend = 0;
interp = 0;
subter = 0;
tratanim = 0;
intimidacion = 0;
carisma = 0;
saludact = 0;
armadact = 0;
velact = 0;
tipoarmadura = 0;
yelmo = 0;
torso = 0;
pies = 0;
escudo = 0;
escudo1 = 0;
ResFis = 0;
ResArc = 0;
ResSomb = 0;
ResFu = 0;
ResNat = 0;
ResFri = 0;
ResLuz = 0;
phm = 0;
taumaturgia = 0;
fe = 0;
espiritu = 0;
naturaleza = 0;
corrupcion = 0;
DañoArmaPrim = 0;
DañoArmaSec = 0;
DañoMag = 0;
mye0 = 0;
mye1 = 0;
mye2 = 0;
mye3 = 0;
mye4 = 0;
mye5 = 0;
mye6 = 0;
mye7 = 0;
ha0 = 0;
ha1 = 0;
ha2 = 0;
ha3 = 0;
ha4 = 0;
ha5 = 0;
ha6 = 0;
ha7 = 0;
ha8 = 0;
ha9 = 0;
ha10 = 0;
ha11 = 0;
ha12 = 0;
ha13 = 0;
ha14 = 0;
ha15 = 0;
ha16 = 0;
ha17 = 0;
ppo = 0;
sppo0 = 0;
sppo1 = 0;
sppo2 = 0;
pco = 0;
jinete = 0;
pesca = 0;
arquologia = 0;
PrimerosAuxilios = 0;
cocina = 0;
ConMag = 0;
desc = 0;
trans = 0;
inventario = 0;
oro = 0;
plata = 0;
cobre = 0;

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


function updateTextInput(val) {
    document.getElementById('mye0').value = val;
    document.getElementById('ha0').value = val;
}

function calnivel(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("nivel").value > 1) {
        document.getElementById("pg").value - 7;
    }
    if (valor.value < valor.oldvalue && document.getElementById("nivel").value >= 1) {
        document.getElementById("pg").value + 7;
    }
}

function calpa(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("pa").value > 0) {
        document.getElementById("pa").value--;
    }
    if (valor.value < valor.oldvalue && document.getElementById("pa").value >= 0) {
        document.getElementById("pa").value++;
    }
}


function calph(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("ph").value > 0) {
        document.getElementById("ph").value--;
    }
    if (valor.value < valor.oldvalue && document.getElementById("ph").value >= 0) {
        document.getElementById("ph").value++;
    }
}

function calpd(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("pd").value > 0) {
        document.getElementById("pd").value--;
    }
    if (valor.value < valor.oldvalue && document.getElementById("pd").value >= 0) {
        document.getElementById("pd").value++;
    }
}

function calcphm(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("phm").value > 0) {
        document.getElementById("phm").value--;
    }
    if (valor.value < valor.oldvalue && document.getElementById("phm").value >= 0) {
        document.getElementById("phm").value++;
    }
}

function calcmye(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("pmye").value > 0) {
        document.getElementById("pmye").value--;
    }
    if (valor.value < valor.oldvalue && document.getElementById("pmye").value >= 0) {
        document.getElementById("pmye").value++;
    }
}

function calcha(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("pha").value > 0) {
        document.getElementById("pha").value--;
    }
    if (valor.value < valor.oldvalue && document.getElementById("pha").value >= 0) {
        document.getElementById("pha").value++;
    }
}

function calcppo(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("ppo").value > 0) {
        document.getElementById("ppo").value--;
    }
    if (valor.value < valor.oldvalue && document.getElementById("ppo").value >= 0) {
        document.getElementById("ppo").value++;
    }
}

function calpco(valor) {


    if (valor.value > valor.oldvalue && document.getElementById("pco").value > 0) {
        document.getElementById("pco").value--;
    }
    if (valor.value < valor.oldvalue && document.getElementById("pco").value >= 0) {
        document.getElementById("pco").value++;
    }
}

// JQUERY

$(function(){
    $("#raza").change(function(){
        var raza=$(this).val();
        //alert(valor);
        $("#id2").each(function(){
            var raza2=$(this).attr("id");
            //alert(valor2);
            if(raza2.indexOf(raza)>=0)
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
                
            
        var raza=$(this).val();
        
            switch(raza){
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
        var subraza=$(this).val();
        //alert(valor);
        $("#id2").each(function(){
            var subraza2=$(this).attr("id");
            //alert(valor2);
            if(subraza2.indexOf(subraza)>=0)
            $(this).show();
            else $(this).hide();
        });
    });
});

$(function(){
    $("#subraza").change(function(){
        
                
            
        var subraza=$(this).val();
        
            switch(subraza){
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
        var clase=$(this).val();
        $("#id2").each(function(){
            var clase2=$(this).attr("id");
            if(clase2.indexOf(clase)>=0)
            $(this).show();
            else $(this).hide();
        });
    });
});

$(function(){
    $("#clase").change(function(){
        
                
            
        var clase=$(this).val();
        
            switch(clase){
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