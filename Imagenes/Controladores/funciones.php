<?php


//Verificar usuario en BBDD
function VerificarUsuario($mail, $pass, $conexion)
{

    // Consulta segura para evitar inyecciones SQL.
    $SQL = ("SELECT * FROM login WHERE mail = '$mail'");
    $resultado = $conexion->query($SQL);

    $fila = mysqli_fetch_array($resultado);
    // Verificando si el usuario existe en la base de datos.    


    if ($fila["mail"] == $mail && $fila["pass"] == $pass)
    {
        // // Guardo en la sesión el mail del usuario.
        session_start();
        $_SESSION['mail'] = $mail;
        $_SESSION['pass'] = $pass;
        echo "Usuario exite .....ok"; // Redirecciono al usuario a la página principal del sitio.
        // header("HTTP/1.1 302 Moved Temporarily");            
        header("Location: perfil.php");
    }
    else
    {
        echo "'El mail o password es incorrecto, <a href='index.php'>vuelva a intenarlo</a>.<br/>";
    }
}

function nfilas($conexion)
{

    $sql = ("SELECT * FROM usuario");

    $resultado = $conexion->query($sql);

    $nfilas = mysqli_num_rows($resultado);

    echo $nfilas;
}

function ConectarBD()
{
    $nombreServidor = "localhost";
    $nombreUsuario = "root";
    $passwordBaseDeDatos = "";
    $nombreBaseDeDatos = "fichateca";

    // Crear conexión con la base de datos.    

    $conexion = new mysqli($nombreServidor, $nombreUsuario, $passwordBaseDeDatos, $nombreBaseDeDatos);

    if ($conexion->connect_error)
    {
        echo "ERROR BBDD" . $conexion->error;
        die("ERROR CONEXION: " . $conexion->connect_error);

    }
    else
    {
        return $conexion;
    }

}



//Esta función se encarga de validad los datos del formulario de Login
function validarLogin($datos)
{
    $errores = [];
    $mail = trim($datos['mail']);
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL))
    {
        $errores['mail'] = "mail inválido...";
    }
    $password = trim($datos['pass']);
    if (empty($password))
    {
        $errores['pass'] = "El password no puede ser blanco...";
    }
    elseif (!is_numeric($password))
    {
        $errores['pass'] = "El password debe ser numérico...";
    }
    elseif (strlen($password) < 6)
    {
        $errores['pass'] = "El password como mínimo debe tener 6 digitos...";
    }
    return $errores;
}
function validar($datos, $imagen)
{
    //Este representa mi array donde voy a ir almacenando los errores, que luego muestro en la vista al usuario.|
    $errores = [];
    $userName = trim($datos['userName']);
    if (empty($userName))
    {
        $errores['userName'] = "El campo nombre no lo puede dejar en blanco..";
    }
    $mail = trim($datos['mail']);
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL))
    {
        $errores['mail'] = "mail inválido...";
    }
    $password = trim($datos['password']);
    if (empty($password))
    {
        $errores['password'] = "El password no puede ser blanco...";
    }
    elseif (!is_numeric($password))
    {
        $errores['password'] = "El password debe ser numérico...";
    }
    elseif (strlen($password) < 6)
    {
        $errores['password'] = "El password como mínimo debe tener 6 caracteres...";
    }
    $passwordRepeat = trim($datos['passwordRepeat']);
    if ($password != $passwordRepeat)
    {
        $errores['passwordRepeat'] = "Las contraseñas deben ser iguales";
    }
    
    return $errores;

}
function altaFicha($conexion)
{

    var_dump($_POST);


    //Recogemos los datos del formulario
    $titulo= $_POST["titulo"];
    $nombre= $_POST["nombre"];
    $nacimiento= $_POST["nacimiento"];
    $faccion= $_POST["faccion"];
    $alineamiento= $_POST["alineamiento"];
    $raza = $_POST["raza"];
    $clase = $_POST["clase"];
    $nivel = $_POST["nivel"];
    $pg = $_POST["pg"];
    $pa = $_POST["pa"];
    $ph = $_POST["ph"];
    $pd = $_POST["pd"];
    $phm = $_POST["phm"];
    $pmye = $_POST["pmye"];
    $pha = $_POST["pha"];
    $ppa = $_POST["ppo"];
    $pco = $_POST["pco"];
    $destreza = $_POST["destreza"];
    $percepcion = $_POST["percepcion"];
    $voluntad = $_POST["voluntad"];
    $vigor = $_POST["vigor"];
    $inteligencia = $_POST["inteligencia"];
    $aguante = $_POST["aguante"];
    $energia = $_POST["energia"];
    $atletismo = $_POST["atletismo"];
    $robo = $_POST["robo"];
    $sigilo = $_POST["sigilo"];
    $forzar_cerraduras = $_POST["forzar_cerraduras"];
    $supervivencia = $_POST["supervivencia"];
    $trepar_escalar = $_POST["trepar_escalar"];
    $buscar = $_POST["buscar"];
    $alerta = $_POST["alerta"];
    $aprendizaje = $_POST["aprendizaje"];
    $interpretacion = $_POST["interpretacion"];
    $subterfugio = $_POST["subterfugio"];
    $trato_con_animales = $_POST["trato_con_animales"];
    $intimidacion = $_POST["intimidacion"];
    $carisma = $_POST["carisma"];
    $parada = $_POST["parada"];
    $esquivar = $_POST["esquivar"];  
    $bloqueo = $_POST["bloqueo"];  
    $metamagia = $_POST["metamagia"];  
    $taumaturgia = $_POST["taumaturgia"];
    $fe = $_POST["fe"];
    $espiritualidad = $_POST["espiritualidad"]; 
    $naturaleza = $_POST["naturaleza"]; 
    $corrupcion = $_POST["corrupcion"];
    $mye0 = $_POST["mye0"]; 
    $mye1 = $_POST["mye1"]; 
    $mye2 = $_POST["mye2"]; 
    $mye3 = $_POST["mye3"]; 
    $mye4 = $_POST["mye4"]; 
    $mye5 = $_POST["mye5"]; 
    $mye6 = $_POST["mye6"]; 
    $mye7 = $_POST["mye7"]; 
    $ha0 = $_POST["ha0"];
    $ha1 = $_POST["ha1"];
    $ha2 = $_POST["ha2"];
    $ha3 = $_POST["ha3"];
    $ha4 = $_POST["ha4"];
    $ha5 = $_POST["ha5"];
    $ha6 = $_POST["ha6"];
    $ha7 = $_POST["ha7"];
    $ha8 = $_POST["ha8"];
    $ha9 = $_POST["ha9"];
    $ha10 = $_POST["ha10"];
    $ha11 = $_POST["ha11"];
    $ha12 = $_POST["ha12"];
    $ha13 = $_POST["ha13"];
    $ha14 = $_POST["ha14"];
    $ha15 = $_POST["ha15"];
    $ha16 = $_POST["ha16"];
    $ha17 = $_POST["ha17"];
    $ppo0 = $_POST["ppo0"];
    $ppo1 = $_POST["ppo1"];
    $ppo2 = $_POST["ppo2"];
    $jinete = $_POST["jinete"];
    $pesca = $_POST["pesca"];
    $arqueologia = $_POST["arqueologia"];
    $medico = $_POST["medico"];
    $cocina = $_POST["cocina"];
    $con_mag = $_POST["con_mag"]; 

    // $ = $_POST[""];  
    // Creamos una variable con la consulta insert
    $SQL = "INSERT INTO ficha (







    cod_usuario,
    titulo,
    nombre,
    nacimiento,
    cod_faccion,
    alineamiento,
    cod_raza,
    cod_clase,
    nivel,
    pg,
    pa,
    ph,
    pd,
    phm,
    pmye,
    pha,
    ppo,
    pco,
    destreza,
    percepcion,
    voluntad,
    vigor,
    inteligencia,
    aguante,
    energia,
    atletismo,
    robo,
    sigilo,
    forzar_cerraduras,
    supervivencia,
    trepar_escalar,
    buscar,
    alerta,
    aprendizaje,
    interpretacion,
    subterfugio,
    trato_con_animales,
    intimidacion,
    carisma,
    parada,
    esquivar,
    bloqueo,
    metamagia,
    taumaturgia,
    fe,
    espiritualidad,
    naturaleza,
    corrupcion,
    mye0,
    mye1,
    mye2,
    mye3,
    mye4,
    mye5,
    mye6,
    mye7,
    ha0,
    ha1,
    ha2,
    ha3,
    ha4,
    ha5,
    ha6,
    ha7,
    ha8,
    ha9,
    ha10,
    ha11,
    ha12,
    ha13,
    ha14,
    ha15,
    ha16,
    ha17,
    ppo0,
    ppo1,
    ppo2,
    jinete,
    pesca,
    arqueologia,
    medico,
    cocina,
    con_mag)" .
            
    "VALUES (
    '001',
    '$titulo',
    '$nombre',
    '$nacimiento',
    '$faccion',
    '$alineamiento',
    '$raza',
    '$clase',
    '$nivel',
    '$pg',
    '$pa',
    '$ph',
    '$pd',
    '$phm',
    '$pmye',
    '$pha',
    '$ppa',
    '$pco',
    '$destreza',
    '$percepcion',
    '$voluntad',
    '$vigor',
    '$inteligencia',
    '$aguante',
    '$energia',
    '$atletismo',
    '$robo',
    '$sigilo',
    '$forzar_cerraduras',
    '$supervivencia',
    '$trepar_escalar',
    '$buscar',
    '$alerta',
    '$aprendizaje',
    '$interpretacion',
    '$subterfugio',
    '$trato_con_animales',
    '$intimidacion',
    '$carisma',
    '$parada',
    '$esquivar',
    '$bloqueo',
    '$metamagia',
    '$taumaturgia',
    '$fe',
    '$espiritualidad',
    '$naturaleza',
    '$corrupcion',
    '$mye0',
    '$mye1',
    '$mye2',
    '$mye3',
    '$mye4',
    '$mye5',
    '$mye6',
    '$mye7',
    '$ha0',
    '$ha1',
    '$ha2',
    '$ha3',
    '$ha4',
    '$ha5',
    '$ha6',
    '$ha7',
    '$ha8',
    '$ha9',
    '$ha10',
    '$ha11',
    '$ha12',
    '$ha13',
    '$ha14',
    '$ha15',
    '$ha16',
    '$ha17',
    '$ppo0',
    '$ppo1',
    '$ppo2',
    '$jinete',
    '$pesca',
    '$arqueologia',
    '$medico',
    '$cocina',
    '$con_mag')";
    try
    {
    // La ejecutamos en el servidor
    $resultado=$conexion->query($SQL);
    }
    catch (Exception $e)
    {
        $error = $e->getMessage();
        echo $error;
    }
   $estado=true;
    if ($resultado)
    {
        echo "  ficha Añadida";
    }
    else
    {
        echo "Error Añadiendo Contacto : " . $conexion->error;
    } 

    // Refrescamos la pagina para actualizar la informacion.
    // header("refresh: 0;");
    //$conexion->close();


    echo "'<br> '. $nombre ' '. $raza ' '. $clase' '";
}

// function consultaficha($conexion)
// {
// // $SQL=(SELECT `nombre` FROM `ficha` ORDER BY `nombre` ASC);


// $resultado=query->($SQL);
// return $resultado
// }

function validarFicha($datos){





}

function modFicha($datos, $conexion)
{
    $nombre= $_POST["nombre"];
    $raza = $_POST["raza"];
    $clase = $_POST["clase"];
    $nivel = $_POST["nivel"];
    $pg = $_POST["pg"];
    $pa = $_POST["pa"];
    $destreza = $_POST["destreza"];
    $percepcion = $_POST["percepcion"];
    $voluntad = $_POST["voluntad"];
    $vigor = $_POST["vigor"];
    $inteligencia = $_POST["inteligencia"];
    $aguante = $_POST["aguante"];
    $energia = $_POST["energia"];

    $SQL = "UPDATE ficha SET nombre= '$nombre' , direccion='$direccion' , telefono='$telefono' WHERE mail = '$mail'";


    // La ejecutamos en el servidor
    $conexion->query($SQL);

    if ($conexion->query($SQL) === TRUE)
    {
        echo ". Contacto Actualizado";
    }
    else
    {
        echo ". Error actualizando: " . $conexion->error;
    }
    return $mail . $nombre . $direccion . $telefono;
}