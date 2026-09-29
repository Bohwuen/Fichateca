<?php


//Verificar usuario en BBDD
function VerificarUsuario($Mail, $Pass, $Conexion)
{

    // Consulta segura para evitar inyecciones SQL.
    $Sql = ("SELECT * FROM login WHERE mail = '$Mail'");
    $Resultado = $Conexion->query($Sql);

    $Fila = mysqli_fetch_array($Resultado);
    // Verificando si el usuario existe en la base de datos.    


    if ($Fila["mail"] == $Mail && $Fila["pass"] == $Pass)
    {
        // // Guardo en la sesión el mail del usuario.
        session_start();
        $_SESSION['mail'] = $Mail;
        $_SESSION['pass'] = $Pass;
        echo "Usuario exite .....ok"; // Redirecciono al usuario a la página principal del sitio.
        // header("HTTP/1.1 302 Moved Temporarily");            
        header("Location: perfil.php");
    }
    else
    {
        echo "'El mail o password es incorrecto, <a href='index.php'>vuelva a intenarlo</a>.<br/>";
    }
}

function nfilas($Conexion)
{

    $Sql = ("SELECT * FROM usuario");

    $Resultado = $Conexion->query($Sql);

    $NumeroFilas = mysqli_num_rows($Resultado);

    echo $NumeroFilas;
}

function ConectarBD()
{
    $NombreServidor = "localhost";
    $NombreUsuario = "root";
    $PasswordBaseDeDatos = "";
    $NombreBaseDeDatos = "fichateca";

    // Crear conexión con la base de datos.    

    $Conexion = new mysqli($NombreServidor, $NombreUsuario, $PasswordBaseDeDatos, $NombreBaseDeDatos);

    if ($Conexion->connect_error)
    {
        echo "ERROR BBDD" . $Conexion->error;
        die("ERROR CONEXION: " . $Conexion->connect_error);

    }
    else
    {
        return $Conexion;
    }

}



//Esta función se encarga de validad los datos del formulario de Login
function validarLogin($Datos)
{
    $Errores = [];
    $Mail = trim($Datos['mail']);
    if (!filter_var($Mail, FILTER_VALIDATE_EMAIL))
    {
        $Errores['mail'] = "mail inválido...";
    }
    $Password = trim($Datos['pass']);
    if (empty($Password))
    {
        $Errores['pass'] = "El password no puede ser blanco...";
    }
    elseif (!is_numeric($Password))
    {
        $Errores['pass'] = "El password debe ser numérico...";
    }
    elseif (strlen($Password) < 6)
    {
        $Errores['pass'] = "El password como mínimo debe tener 6 digitos...";
    }
    return $Errores;
}
function validar($Datos, $Imagen)
{
    //Este representa mi array donde voy a ir almacenando los errores, que luego muestro en la vista al usuario.|
    $Errores = [];
    $UserName = trim($Datos['userName']);
    if (empty($UserName))
    {
        $Errores['userName'] = "El campo nombre no lo puede dejar en blanco..";
    }
    $Mail = trim($Datos['mail']);
    if (!filter_var($Mail, FILTER_VALIDATE_EMAIL))
    {
        $Errores['mail'] = "mail inválido...";
    }
    $Password = trim($Datos['password']);
    if (empty($Password))
    {
        $Errores['password'] = "El password no puede ser blanco...";
    }
    elseif (!is_numeric($Password))
    {
        $Errores['password'] = "El password debe ser numérico...";
    }
    elseif (strlen($Password) < 6)
    {
        $Errores['password'] = "El password como mínimo debe tener 6 caracteres...";
    }
    $PasswordRepeat = trim($Datos['passwordRepeat']);
    if ($Password != $PasswordRepeat)
    {
        $Errores['passwordRepeat'] = "Las contraseñas deben ser iguales";
    }
    
    return $Errores;

}
function altaFicha($Conexion)
{

    var_dump($_POST);


    //Recogemos los datos del formulario
    $Titulo = $_POST["titulo"];
    $Nombre = $_POST["nombre"];
    $Nacimiento = $_POST["nacimiento"];
    $Faccion = $_POST["faccion"];
    $Alineamiento = $_POST["alineamiento"];
    $Raza = $_POST["raza"];
    $Clase = $_POST["clase"];
    $Nivel = $_POST["nivel"];
    $Pg = $_POST["pg"];
    $Pa = $_POST["pa"];
    $Ph = $_POST["ph"];
    $Pd = $_POST["pd"];
    $Phm = $_POST["phm"];
    $Pmye = $_POST["pmye"];
    $Pha = $_POST["pha"];
    $Ppa = $_POST["ppo"];
    $Pco = $_POST["pco"];
    $Destreza = $_POST["destreza"];
    $Percepcion = $_POST["percepcion"];
    $Voluntad = $_POST["voluntad"];
    $Vigor = $_POST["vigor"];
    $Inteligencia = $_POST["inteligencia"];
    $Aguante = $_POST["aguante"];
    $Energia = $_POST["energia"];
    $Atletismo = $_POST["atletismo"];
    $Robo = $_POST["robo"];
    $Sigilo = $_POST["sigilo"];
    $ForzarCerraduras = $_POST["forzar_cerraduras"];
    $Supervivencia = $_POST["supervivencia"];
    $TreparEscalar = $_POST["trepar_escalar"];
    $Buscar = $_POST["buscar"];
    $Alerta = $_POST["alerta"];
    $Aprendizaje = $_POST["aprendizaje"];
    $Interpretacion = $_POST["interpretacion"];
    $Subterfugio = $_POST["subterfugio"];
    $TratoConAnimales = $_POST["trato_con_animales"];
    $Intimidacion = $_POST["intimidacion"];
    $Carisma = $_POST["carisma"];
    $Parada = $_POST["parada"];
    $Esquivar = $_POST["esquivar"];
    $Bloqueo = $_POST["bloqueo"];
    $Metamagia = $_POST["metamagia"];
    $Taumaturgia = $_POST["taumaturgia"];
    $Fe = $_POST["fe"];
    $Espiritualidad = $_POST["espiritualidad"];
    $Naturaleza = $_POST["naturaleza"];
    $Corrupcion = $_POST["corrupcion"];
    $Mye0 = $_POST["mye0"];
    $Mye1 = $_POST["mye1"];
    $Mye2 = $_POST["mye2"];
    $Mye3 = $_POST["mye3"];
    $Mye4 = $_POST["mye4"];
    $Mye5 = $_POST["mye5"];
    $Mye6 = $_POST["mye6"];
    $Mye7 = $_POST["mye7"];
    $Ha0 = $_POST["ha0"];
    $Ha1 = $_POST["ha1"];
    $Ha2 = $_POST["ha2"];
    $Ha3 = $_POST["ha3"];
    $Ha4 = $_POST["ha4"];
    $Ha5 = $_POST["ha5"];
    $Ha6 = $_POST["ha6"];
    $Ha7 = $_POST["ha7"];
    $Ha8 = $_POST["ha8"];
    $Ha9 = $_POST["ha9"];
    $Ha10 = $_POST["ha10"];
    $Ha11 = $_POST["ha11"];
    $Ha12 = $_POST["ha12"];
    $Ha13 = $_POST["ha13"];
    $Ha14 = $_POST["ha14"];
    $Ha15 = $_POST["ha15"];
    $Ha16 = $_POST["ha16"];
    $Ha17 = $_POST["ha17"];
    $Ppo0 = $_POST["ppo0"];
    $Ppo1 = $_POST["ppo1"];
    $Ppo2 = $_POST["ppo2"];
    $Jinete = $_POST["jinete"];
    $Pesca = $_POST["pesca"];
    $Arqueologia = $_POST["arqueologia"];
    $Medico = $_POST["medico"];
    $Cocina = $_POST["cocina"];
    $ConMag = $_POST["con_mag"];

    // $ = $_POST[""];  
    // Creamos una variable con la consulta insert
    $Sql = "INSERT INTO ficha (







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
    '$Titulo',
    '$Nombre',
    '$Nacimiento',
    '$Faccion',
    '$Alineamiento',
    '$Raza',
    '$Clase',
    '$Nivel',
    '$Pg',
    '$Pa',
    '$Ph',
    '$Pd',
    '$Phm',
    '$Pmye',
    '$Pha',
    '$Ppa',
    '$Pco',
    '$Destreza',
    '$Percepcion',
    '$Voluntad',
    '$Vigor',
    '$Inteligencia',
    '$Aguante',
    '$Energia',
    '$Atletismo',
    '$Robo',
    '$Sigilo',
    '$ForzarCerraduras',
    '$Supervivencia',
    '$TreparEscalar',
    '$Buscar',
    '$Alerta',
    '$Aprendizaje',
    '$Interpretacion',
    '$Subterfugio',
    '$TratoConAnimales',
    '$Intimidacion',
    '$Carisma',
    '$Parada',
    '$Esquivar',
    '$Bloqueo',
    '$Metamagia',
    '$Taumaturgia',
    '$Fe',
    '$Espiritualidad',
    '$Naturaleza',
    '$Corrupcion',
    '$Mye0',
    '$Mye1',
    '$Mye2',
    '$Mye3',
    '$Mye4',
    '$Mye5',
    '$Mye6',
    '$Mye7',
    '$Ha0',
    '$Ha1',
    '$Ha2',
    '$Ha3',
    '$Ha4',
    '$Ha5',
    '$Ha6',
    '$Ha7',
    '$Ha8',
    '$Ha9',
    '$Ha10',
    '$Ha11',
    '$Ha12',
    '$Ha13',
    '$Ha14',
    '$Ha15',
    '$Ha16',
    '$Ha17',
    '$Ppo0',
    '$Ppo1',
    '$Ppo2',
    '$Jinete',
    '$Pesca',
    '$Arqueologia',
    '$Medico',
    '$Cocina',
    '$ConMag')";
    try
    {
    // La ejecutamos en el servidor
    $Resultado = $Conexion->query($Sql);
    }
    catch (Exception $Excepcion)
    {
        $Error = $Excepcion->getMessage();
        echo $Error;
    }
   $Estado=true;
    if ($Resultado)
    {
        echo "  ficha Añadida";
    }
    else
    {
        echo "Error Añadiendo Contacto : " . $Conexion->error;
    } 

    // Refrescamos la pagina para actualizar la informacion.
    // header("refresh: 0;");
    //$conexion->close();


    echo "'<br> '. $Nombre ' '. $Raza ' '. $Clase' '";
}

// function consultaficha($conexion)
// {
// // $SQL=(SELECT `nombre` FROM `ficha` ORDER BY `nombre` ASC);


// $resultado=query->($SQL);
// return $resultado
// }

function validarFicha($Datos){





}

function modFicha($Datos, $Conexion)
{
    $Nombre = $_POST["nombre"];
    $Raza = $_POST["raza"];
    $Clase = $_POST["clase"];
    $Nivel = $_POST["nivel"];
    $Pg = $_POST["pg"];
    $Pa = $_POST["pa"];
    $Destreza = $_POST["destreza"];
    $Percepcion = $_POST["percepcion"];
    $Voluntad = $_POST["voluntad"];
    $Vigor = $_POST["vigor"];
    $Inteligencia = $_POST["inteligencia"];
    $Aguante = $_POST["aguante"];
    $Energia = $_POST["energia"];

    $Sql = "UPDATE ficha SET nombre= '$Nombre' , direccion='$Direccion' , telefono='$Telefono' WHERE mail = '$Mail'";


    // La ejecutamos en el servidor
    $Conexion->query($Sql);

    if ($Conexion->query($Sql) === TRUE)
    {
        echo ". Contacto Actualizado";
    }
    else
    {
        echo ". Error actualizando: " . $Conexion->error;
    }
    return $Mail . $Nombre . $Direccion . $Telefono;
}