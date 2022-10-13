<?php
require_once('controladores/funciones.php');

//Conectar con BBDD
$conexion = conectarBD();
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Crear personaje</title>
        <link rel="stylesheet" href="estilo2.css">
        
        
    </head>
    <body>
        
                      <form action="crearficha.php" method="post">
                      <h1>Crear personaje </h1>
                      <?php echo nfilas($conexion) . " registro(s) en tabla FICHA. Conexion OK. "; ?>
                      <div></div>
                        <label for="nombre">nombre: </label>
                          <td><input required type="text" name="nombre" placeholder="" autofocus></td><br>
                          <label for="raza">Raza: </label>
                                    <select name="Raza" id="">
                                    <option value="humano">Humano</option>
                                    <option value="enano">Enano</option>
                                    <option value="gnomo">Gnomo</option>
                                    <option value="elfo de la noche">Elfo de la noche</option>
                                    <option value="alto elfo">Alto elfo</option>
                                    <!-- <option value=""></option> -->
                                    </select><br>
                            <label for="clase">Clase: </label>
                                    <select name="Clase" id="">
                                    <option value="guerrero">Guerrero</option>
                                    <option value="mago">Mago</option>
                                    <option value="cazador">Cazador</option>
                                    <option value="druida">Druida</option>
                                    <option value="dk">Caballero de la muerte</option>
                                    <option value="dh">Cazador de demonios</option>
                                    <option value="brujo">Brujo</option>
                                    <option value="picaro">Pícaro</option>
                                    <option value="sacerdote">Sacerdote</option>
                                    <option value="chaman">Chamán</option>
                                    <option value="paladin">Paladín</option>
                                    <option value="monje">Monje</option>
                                    <!-- <option value=""></option> -->
                                    </select><br>
                          <td><label for="nivel">Nivel: </label>
                          <input required type="number" name="nivel" default value="1" min="1" max="25"></td><br>
                          <td><label for="pg">Puntos Gratuitos: </label>
                          <input required type="number" name="" default value="20" min="0" max="999"></td><br>
                          <td><label for="atributos">ATRIBUTOS: </label><br>
                          <td><label for="pa">Puntos de atributos: </label>
                          <input required type="number" name="" default value="5" min="0" max="5"></td><br>
                          <td><label for="destreza">Destreza: </label>
                          <input required type="number" name="destreza" default value="1" min="1" max="5"></td><br>
                          <td><label for="percepcion">Percepción: </label>
                          <input required type="number" name="percepción" default value="1" min="1" max="5"></td><br>
                          <td><label for="voluntad">Voluntad: </label>
                          <input required type="number" name="voluntad" default value="1" min="1" max="5"></td><br>
                          <td><label for="vigor">Vigor: </label>
                          <input required type="number" name="vigor" default value="1" min="1" max="5"></td><br>
                          <td><label for="inteligencia">Inteligencia: </label>
                          <input required type="number" name="inteligencia" default value="1" min="1" max="5"></td><br>
                          <td><label for="aguante">Aguante: </label>
                          <input required type="number" name="aguante" default value="1" min="1" max="5"></td><br>
                          <td><label for="energia">Energía: </label>
                          <input required type="number" name="energia" default value="1" min="1" max="5"></td><br>
                          <td><input type="submit" name="insertar" value="INSERTAR EN TABLA"></td><br>
                          <span><a href="principal.php">VOLVER</a></span>
                      </form>
                      </body>
    <?php
    echo nfilas($conexion) . " registros en tabla. Conexion OK. ";

    if (isset($_POST["insertar"]))
    {
        var_dump($_POST);
        modificarFicha ($_POST[],$conexion);
        
    }

    ?>
    </html>