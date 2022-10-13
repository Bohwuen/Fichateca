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
      <fieldset>
      <label><h2>Datos</h2></label>
      <label for="titulo">Titulo: </label>
      <td><input type="text" name="titulo" placeholder=""></td>
      <label for="nombre">Nombre: </label>
      <td><input required type="text" name="nombre" placeholder="" autofocus></td><br>
      <label for="nacimiento">Nacimento: </label>
      <td><input required type="text" name="nacimiento" placeholder=""></td><br>
      <label for="faccion">Facción: </label>
          <select name="faccion" id="">
          <option value="1">Horda</option>
          <option value="2">Alianza</option>
          <option value="3">Neutral</option>
          <option value="4">Independiente</option>
          </select>
      <label for="alineamiento">Alineamiento: </label>
      <td><input required type="text" name="alineamiento" placeholder=""></td><br>
      <label for="raza">Raza: </label>
        <select name="raza" id="">
        <option value="1">Humano</option>
        <option value="2">Enano</option>
        <option value="3">Gnomo</option>
        <option value="4">Elfo de la noche</option>
        <option value="5">Alto elfo</option>
        <option value="6">Draenei</option>
        <option value="7">Huargen</option>
        <option value="8">Elfo de vacio</option>
        <option value="9">Orco</option>
        <option value="10">Troll</option>
        <option value="11">Tauren</option>
        <option value="12">No-Muerto</option>
        <option value="13">Ogro</option>
        <option value="14">Goblin</option>
        <option value="15">Elfo de sangre</option>
        <option value="16">Nocheterna</option>
        <option value="17">Pandaren</option>
        </select>
      <label for="clase">Clase: </label>
        <select name="clase" id="">
        <option value="1">Guerrero</option>
        <option value="2">Mago</option>
        <option value="3">Cazador</option>
        <option value="4">Druida</option>
        <option value="5">Caballero de la muerte</option>
        <option value="6">Cazador de demonios</option>
        <option value="7">Brujo</option>
        <option value="8">Pícaro</option>
        <option value="9">Sacerdote</option>
        <option value="10">Chamán</option>
        <option value="11">Paladín</option>
        <option value="12">Monje</option>
        </select><br>
      <td><label for="nivel">Nivel: </label>
      <input required type="number" id="nivel" name="nivel" default value="1" min="1" max="25" onkeypress="return false"; onchange="calnivel(this)"></td>
      <td><label for="pg">Puntos Gratuitos: </label>
      <input required type="number" id="pg" name="pg" default value="20" min="0" max="999" onkeypress="return false"; onclick="return false";></td>
      </fieldset>
    <!-- ATRIBUTOS -->
      <fieldset>
      <td><label for="atributos"><h2>Atributos:</h2> </label>
      <td><label for="pa">Puntos de atributos: </label>
      <input required type="number" id="pa" name="pa" default value="5" min="0" max="5" onkeypress="return false"; onclick="return false"; ></td><br>
      <td><label for="destreza">Destreza: </label>
      <input required type="number" id="spa" name="destreza" default value="1" min="1" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpa(this)"></td><br>
      <td><label for="percepcion">Percepción: </label>
      <input required type="number" id="spa" name="percepcion" default value="1" min="1" max="5"onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpa(this)"></td><br>
      <td><label for="voluntad">Voluntad: </label>
      <input required type="number" id="spa" name="voluntad" default value="1" min="1" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpa(this)"></td><br>
      <td><label for="vigor">Vigor: </label>
      <input required type="number" id="spa" name="vigor" default value="1" min="1" max="5"onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpa(this)"></td><br>
      <td><label for="inteligencia">Inteligencia: </label>
      <input required type="number" id="spa" name="inteligencia" default value="1" min="1" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpa(this)"></td><br>
      <td><label for="aguante">Aguante: </label>
      <input required type="number" id="spa" name="aguante" default value="1" min="1" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpa(this)"></td><br>
      <td><label for="energia">Energía: </label>
      <input required type="number" id="spa" name="energia" default value="1" min="1" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpa(this)">
      </fieldset>
    <!-- HABILIDADES -->
      <fieldset>
      <td><label for="habilidades"><h2>Habilidades:</h2> </label>
      <td><label for="ph">Puntos de habilidad: </label>
      <input required type="number" id="ph" name="ph" default value="10" min="0" max="10" onkeypress="return false";></td><br>
      <td><label for="atletismo">Atletismo: </label>
      <input required type="number" id="sph" name="atletismo" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="robo">Robo: </label>
      <input required type="number" id="sph" name="robo" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="sigilo">Sigilo: </label>
      <input required type="number" id="sph" name="sigilo" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="forzar_cerraduras">Forzar cerraduras: </label>
      <input required type="number" id="sph" name="forzar_cerraduras" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="supervivencia">Supervivencia: </label>
      <input required type="number" id="sph" name="supervivencia" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="trepar_escalar">Trepar/escalar: </label>
      <input required type="number"id="sph" name="trepar_escalar" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="buscar">Buscar: </label>
      <input required type="number"id="sph" name="buscar" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="alerta">Alerta: </label>
      <input required type="number"id="sph" name="alerta" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="aprendizaje">aprendizaje: </label>
      <input required type="number"id="sph" name="aprendizaje" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="interpretacion">interpretacion: </label>
      <input required type="number"id="sph" name="interpretacion" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="subterfugio">subterfugio: </label>
      <input required type="number"id="sph" name="subterfugio" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="trato_con_animales">Trato con animales: </label>
      <input required type="number"id="sph" name="trato_con_animales" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="intimidacion">intimidacion: </label>
      <input required type="number"id="sph" name="intimidacion" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      <td><label for="carisma">Carisma: </label>
      <input required type="number"id="sph" name="carisma" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calph(this)"></td><br>
      </fieldset>
    <!-- DEFENSAS -->
      <fieldset>
      <td><label for="defensas"><h2>Defensas:</h2> </label>
      <td><label for="pd">Puntos de defensa: </label>
      <input required type="number" id="pd" name="pd" default value="3" min="0" max="3"  onkeypress="return false"; onclick="return false"; onfocus="this.oldvalue = this.value;" onchange="calpd(this)"></td><br>
      <td><label for="parada">Parada: </label>
      <input required type="number" id="spd" name="parada" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpd(this)"></td><br>
      <td><label for="esquivar">Esquivar: </label>
      <input required type="number" id="spd" name="esquivar" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpd(this)"></td><br>
      <td><label for="bloqueo">Bloqueo: </label>
      <input required type="number" id="spd" name="bloqueo" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpd(this)"></td><br>
      <td><label for="metamagia">Metamagia: </label>
      <input required type="number" id="spd" name="metamagia" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpd(this)"></td><br>
      </fieldset>
    <!-- MAGIA -->
      <fieldset>
      <td><label for="magia"><h2>Magia:</h2> </label>
      <td><label for="phm">Puntos de magia: </label>
      <input required type="number" id="phm" name="phm" default value="1" min="0" max="1" onkeypress="return false"; onclick="return false";></td><br>
      <td><label for="taumaturgia">Taumaturgia: </label>
      <input required type="number" name="taumaturgia" default value="0" min="0" max="5"onfocus="this.oldvalue = this.value;" onchange="calcphm(this)"></td><br>
      <td><label for="fe">Fe: </label>
      <input required type="number" name="fe" default value="0" min="0" max="5"onfocus="this.oldvalue = this.value;" onchange="calcphm(this)"></td><br>
      <td><label for="espiritualidad">Espiritualidad: </label>
      <input required type="number" name="espiritualidad" default value="0" min="0" max="5"onfocus="this.oldvalue = this.value;" onchange="calcphm(this)"></td><br>
      <td><label for="naturaleza">Naturaleza: </label>
      <input required type="number" name="naturaleza" default value="0" min="0" max="5"onfocus="this.oldvalue = this.value;" onchange="calcphm(this)"></td><br>
      <td><label for="corrupcion">Corrupcion: </label>
      <input required type="number" name="corrupcion" default value="0" min="0" max="5"onfocus="this.oldvalue = this.value;" onchange="calcphm(this)"></td><br>
      </fieldset>
    <!-- MAGIA Y ESTILOS -->
      <fieldset>
      <td><label for="magia_y_estilos"><h2>Magia y estilos:</h2></label>
      <td><label for="pmye">Puntos de magia y estilos: </label>
      <input required type="number" id="pmye" name="pmye" default value="3" min="0" max="3" onkeypress="return false"; onclick="return false";></td><br>
              <!-- MAGIA Y ESTILOS 1 -->

              <label for="Lmye0">Magia y Estilos: </label>
          <select name="mye0" id="Smye0">
            <option value="0" disabled selected>Seleccionar</option>
            <option value="1">Arcanismo</option>
            <option value="2">Piromancia</option>
            <option value="3">Criomancia</option>
            <option value="4">Nigromancia</option>
            <option value="5">Magia rúnica</option>
            <option value="6">Demonología</option>
            <option value="7">Piromancia vil</option>
            <option value="8">Magia sangrienta</option>
            <option value="9">Magia de la sombra</option>
            <option value="10">Magia druidica: Feral</option>
            <option value="11">Magia druidica: Equilibrio</option>
            <option value="12">Magia druidica: Vida</option>
            <option value="13">Dominio de la luz</option>
            <option value="14">Magia elemental: Agua</option>
            <option value="15">Magia elemental: Fuego</option>
            <option value="16">Magia elemental: Tierra</option>
            <option value="17">Magia elemental: Aire</option>
            <option value="18">Chi</option>
            <option value="19">Maestro de armas</option>
            <option value="20">Furibundo</option>
            <option value="21">Protector</option>
            <option value="22">Puntería</option>
            <option value="23">Supervivencia</option>
            <option value="24">Maestro de bestias</option>
            <option value="25">A.A.M.M. Maestro cervecero</option>
            <option value="26">A.A.M.M. Caminavientos</option>
            <option value="27">Asesinato</option>
            <option value="28">Sutileza</option>
            <option value="29">Forajido</option>
            <option value="30">Protector sagrado</option>
            <option value="31">Represión</option>
            <option value="32">Devastación</option>
            <option value="33">Venganza</option>
            <option value="34">Caballero sangriento</option>
            <option value="35">Caballero de escarcha</option>
            <option value="36">Caballero profano</option>
          </select>
          <input type="number" name="mye0" id="mye0" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcmye(this)"></td>
          <input type="checkbox" name="mye1" id="mye1" onchange="mostrarmye(1)"> Añadir<br>
          

        <!-- MAGIA Y ESTILOS 2 -->
          <div id="mages1" style="display:none;"> 
          <label for="mye1" >Magia y Estilos: </label>
          <select name="mye1" id="Smye1">
          <option value="0" disabled selected>Seleccionar</option>
            <option value="1">Arcanismo</option>
            <option value="2">Piromancia</option>
            <option value="3">Criomancia</option>
            <option value="4">Nigromancia</option>
            <option value="5">Magia rúnica</option>
            <option value="6">Demonología</option>
            <option value="7">Piromancia vil</option>
            <option value="8">Magia sangrienta</option>
            <option value="9">Magia de la sombra</option>
            <option value="10">Magia druidica: Feral</option>
            <option value="11">Magia druidica: Equilibrio</option>
            <option value="12">Magia druidica: Vida</option>
            <option value="13">Dominio de la luz</option>
            <option value="14">Magia elemental: Agua</option>
            <option value="15">Magia elemental: Fuego</option>
            <option value="16">Magia elemental: Tierra</option>
            <option value="17">Magia elemental: Aire</option>
            <option value="18">Chi</option>
            <option value="19">Maestro de armas</option>
            <option value="20">Furibundo</option>
            <option value="21">Protector</option>
            <option value="22">Puntería</option>
            <option value="23">Supervivencia</option>
            <option value="24">Maestro de bestias</option>
            <option value="25">A.A.M.M. Maestro cervecero</option>
            <option value="26">A.A.M.M. Caminavientos</option>
            <option value="27">Asesinato</option>
            <option value="28">Sutileza</option>
            <option value="29">Forajido</option>
            <option value="30">Protector sagrado</option>
            <option value="31">Represión</option>
            <option value="32">Devastación</option>
            <option value="33">Venganza</option>
            <option value="34">Caballero sangriento</option>
            <option value="35">Caballero de escarcha</option>
            <option value="36">Caballero profano</option>
            </select>
          <input type="number" name="mye1" id="mye1"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcmye(this)"></td>
          <input type="checkbox"  id="mye2" name="mye2" onchange="mostrarmye(2)">                
          <label for="mye2" > Añadir </label>                                   
          </div>

        <!-- MAGIA Y ESTILOS 3 -->
          <div id="mages2" style="display:none;"> 
          <label for="mye2" >Magia y Estilos: </label>
          <select name="mye2" id="Smye2">
          <option value="0" disabled selected>Seleccionar</option>
            <option value="1">Arcanismo</option>
            <option value="2">Piromancia</option>
            <option value="3">Criomancia</option>
            <option value="4">Nigromancia</option>
            <option value="5">Magia rúnica</option>
            <option value="6">Demonología</option>
            <option value="7">Piromancia vil</option>
            <option value="8">Magia sangrienta</option>
            <option value="9">Magia de la sombra</option>
            <option value="10">Magia druidica: Feral</option>
            <option value="11">Magia druidica: Equilibrio</option>
            <option value="12">Magia druidica: Vida</option>
            <option value="13">Dominio de la luz</option>
            <option value="14">Magia elemental: Agua</option>
            <option value="15">Magia elemental: Fuego</option>
            <option value="16">Magia elemental: Tierra</option>
            <option value="17">Magia elemental: Aire</option>
            <option value="18">Chi</option>
            <option value="19">Maestro de armas</option>
            <option value="20">Furibundo</option>
            <option value="21">Protector</option>
            <option value="22">Puntería</option>
            <option value="23">Supervivencia</option>
            <option value="24">Maestro de bestias</option>
            <option value="25">A.A.M.M. Maestro cervecero</option>
            <option value="26">A.A.M.M. Caminavientos</option>
            <option value="27">Asesinato</option>
            <option value="28">Sutileza</option>
            <option value="29">Forajido</option>
            <option value="30">Protector sagrado</option>
            <option value="31">Represión</option>
            <option value="32">Devastación</option>
            <option value="33">Venganza</option>
            <option value="34">Caballero sangriento</option>
            <option value="35">Caballero de escarcha</option>
            <option value="36">Caballero profano</option>
            </select>
          <input required type="number" name="mye2" id="mye2"default value="0" min="0" max="5" onkeypress="return false";  onfocus="this.oldvalue = this.value;" onchange="calcmye(this)"></td>
          <input type="checkbox"  id="mye3" name="mye3" onchange="mostrarmye(3)">  
          <label for="mye3" > Añadir </label><br>
          </div>
        <!-- MAGIA Y ESTILOS 4 -->
          <div id="mages3" style="display:none;"> 
          <label for="mye3" >Magia y Estilos: </label>
          <select name="mye3" id="Smye3">
          <option value="0" disabled selected>Seleccionar</option>
            <option value="1">Arcanismo</option>
            <option value="2">Piromancia</option>
            <option value="3">Criomancia</option>
            <option value="4">Nigromancia</option>
            <option value="5">Magia rúnica</option>
            <option value="6">Demonología</option>
            <option value="7">Piromancia vil</option>
            <option value="8">Magia sangrienta</option>
            <option value="9">Magia de la sombra</option>
            <option value="10">Magia druidica: Feral</option>
            <option value="11">Magia druidica: Equilibrio</option>
            <option value="12">Magia druidica: Vida</option>
            <option value="13">Dominio de la luz</option>
            <option value="14">Magia elemental: Agua</option>
            <option value="15">Magia elemental: Fuego</option>
            <option value="16">Magia elemental: Tierra</option>
            <option value="17">Magia elemental: Aire</option>
            <option value="18">Chi</option>
            <option value="19">Maestro de armas</option>
            <option value="20">Furibundo</option>
            <option value="21">Protector</option>
            <option value="22">Puntería</option>
            <option value="23">Supervivencia</option>
            <option value="24">Maestro de bestias</option>
            <option value="25">A.A.M.M. Maestro cervecero</option>
            <option value="26">A.A.M.M. Caminavientos</option>
            <option value="27">Asesinato</option>
            <option value="28">Sutileza</option>
            <option value="29">Forajido</option>
            <option value="30">Protector sagrado</option>
            <option value="31">Represión</option>
            <option value="32">Devastación</option>
            <option value="33">Venganza</option>
            <option value="34">Caballero sangriento</option>
            <option value="35">Caballero de escarcha</option>
            <option value="36">Caballero profano</option>
            </select>
          <input required type="number" name="mye3" id="mye3"default value="0" min="0" max="5" onkeypress="return false";  onfocus="this.oldvalue = this.value;" onchange="calcmye(this)"></td>
          <input type="checkbox"  id="mye4" name="mye4" onchange="mostrarmye(4)">  
          <label for="mye4" > Añadir </label><br>
          </div>

        <!-- MAGIA Y ESTILOS 5 -->
          <div id="mages4" style="display:none;"> 
          <label for="mye4" >Magia y Estilos: </label>
          <select name="mye4" id="Smye4">
          <option value="0" disabled selected>Seleccionar</option>
            <option value="1">Arcanismo</option>
            <option value="2">Piromancia</option>
            <option value="3">Criomancia</option>
            <option value="4">Nigromancia</option>
            <option value="5">Magia rúnica</option>
            <option value="6">Demonología</option>
            <option value="7">Piromancia vil</option>
            <option value="8">Magia sangrienta</option>
            <option value="9">Magia de la sombra</option>
            <option value="10">Magia druidica: Feral</option>
            <option value="11">Magia druidica: Equilibrio</option>
            <option value="12">Magia druidica: Vida</option>
            <option value="13">Dominio de la luz</option>
            <option value="14">Magia elemental: Agua</option>
            <option value="15">Magia elemental: Fuego</option>
            <option value="16">Magia elemental: Tierra</option>
            <option value="17">Magia elemental: Aire</option>
            <option value="18">Chi</option>
            <option value="19">Maestro de armas</option>
            <option value="20">Furibundo</option>
            <option value="21">Protector</option>
            <option value="22">Puntería</option>
            <option value="23">Supervivencia</option>
            <option value="24">Maestro de bestias</option>
            <option value="25">A.A.M.M. Maestro cervecero</option>
            <option value="26">A.A.M.M. Caminavientos</option>
            <option value="27">Asesinato</option>
            <option value="28">Sutileza</option>
            <option value="29">Forajido</option>
            <option value="30">Protector sagrado</option>
            <option value="31">Represión</option>
            <option value="32">Devastación</option>
            <option value="33">Venganza</option>
            <option value="34">Caballero sangriento</option>
            <option value="35">Caballero de escarcha</option>
            <option value="36">Caballero profano</option>
            </select>
          <input required type="number" name="mye4" id="mye4"default value="0" min="0" max="5" onkeypress="return false";  onfocus="this.oldvalue = this.value;" onchange="calcmye(this)"></td>
          <input type="checkbox"  id="mye5" name="mye5" onchange="mostrarmye(5)">  
          <label for="mye5" > Añadir </label><br>
          </div>

        <!-- MAGIA Y ESTILOS 6 -->
          <div id="mages5" style="display:none;">
          <label for="mye5">Magia y Estilos: </label>
          <select name="mye5" id="Smye5">
          <option value="0" disabled selected>Seleccionar</option>
            <option value="1">Arcanismo</option>
            <option value="2">Piromancia</option>
            <option value="3">Criomancia</option>
            <option value="4">Nigromancia</option>
            <option value="5">Magia rúnica</option>
            <option value="6">Demonología</option>
            <option value="7">Piromancia vil</option>
            <option value="8">Magia sangrienta</option>
            <option value="9">Magia de la sombra</option>
            <option value="10">Magia druidica: Feral</option>
            <option value="11">Magia druidica: Equilibrio</option>
            <option value="12">Magia druidica: Vida</option>
            <option value="13">Dominio de la luz</option>
            <option value="14">Magia elemental: Agua</option>
            <option value="15">Magia elemental: Fuego</option>
            <option value="16">Magia elemental: Tierra</option>
            <option value="17">Magia elemental: Aire</option>
            <option value="18">Chi</option>
            <option value="19">Maestro de armas</option>
            <option value="20">Furibundo</option>
            <option value="21">Protector</option>
            <option value="22">Puntería</option>
            <option value="23">Supervivencia</option>
            <option value="24">Maestro de bestias</option>
            <option value="25">A.A.M.M. Maestro cervecero</option>
            <option value="26">A.A.M.M. Caminavientos</option>
            <option value="27">Asesinato</option>
            <option value="28">Sutileza</option>
            <option value="29">Forajido</option>
            <option value="30">Protector sagrado</option>
            <option value="31">Represión</option>
            <option value="32">Devastación</option>
            <option value="33">Venganza</option>
            <option value="34">Caballero sangriento</option>
            <option value="35">Caballero de escarcha</option>
            <option value="36">Caballero profano</option>
          </select>
          <input required type="number" name="mye5" id="mye5"default value="0" min="0" max="5" onkeypress="return false";  onfocus="this.oldvalue = this.value;" onchange="calcmye(this)"></td>
          <input type="checkbox"  id="mye6" name="mye6" onchange="mostrarmye(6)">  
          <label for="mye6" > Añadir </label><br>
          </div>

        <!-- MAGIA Y ESTILOS 7 -->
          <div id="mages6" style="display:none;">
          <label for="mye6">Magia y Estilos: </label>
          <select name="mye6" id="Smye6">
          <option value="0" disabled selected>Seleccionar</option>
            <option value="1">Arcanismo</option>
            <option value="2">Piromancia</option>
            <option value="3">Criomancia</option>
            <option value="4">Nigromancia</option>
            <option value="5">Magia rúnica</option>
            <option value="6">Demonología</option>
            <option value="7">Piromancia vil</option>
            <option value="8">Magia sangrienta</option>
            <option value="9">Magia de la sombra</option>
            <option value="10">Magia druidica: Feral</option>
            <option value="11">Magia druidica: Equilibrio</option>
            <option value="12">Magia druidica: Vida</option>
            <option value="13">Dominio de la luz</option>
            <option value="14">Magia elemental: Agua</option>
            <option value="15">Magia elemental: Fuego</option>
            <option value="16">Magia elemental: Tierra</option>
            <option value="17">Magia elemental: Aire</option>
            <option value="18">Chi</option>
            <option value="19">Maestro de armas</option>
            <option value="20">Furibundo</option>
            <option value="21">Protector</option>
            <option value="22">Puntería</option>
            <option value="23">Supervivencia</option>
            <option value="24">Maestro de bestias</option>
            <option value="25">A.A.M.M. Maestro cervecero</option>
            <option value="26">A.A.M.M. Caminavientos</option>
            <option value="27">Asesinato</option>
            <option value="28">Sutileza</option>
            <option value="29">Forajido</option>
            <option value="30">Protector sagrado</option>
            <option value="31">Represión</option>
            <option value="32">Devastación</option>
            <option value="33">Venganza</option>
            <option value="34">Caballero sangriento</option>
            <option value="35">Caballero de escarcha</option>
            <option value="36">Caballero profano</option>                                    
          </select>
          <input required type="number" name="mye6" id="mye6"default value="0" min="0" max="5" onkeypress="return false";  onfocus="this.oldvalue = this.value;" onchange="calcmye(this)"></td>
          <input type="checkbox"  id="mye7" name="mye7" onchange="mostrarmye(7)">  
          <label for="mye7" > Añadir </label><br>
          </div>

        <!-- MAGIA Y ESTILOS 8 -->
          <div id="mages7" style="display:none;">
          <label for="mye7" >Magia y Estilos: </label>
          <select name="mye7" id="Smye7">
          <option value="0" disabled selected>Seleccionar</option>
            <option value="1">Arcanismo</option>
            <option value="2">Piromancia</option>
            <option value="3">Criomancia</option>
            <option value="4">Nigromancia</option>
            <option value="5">Magia rúnica</option>
            <option value="6">Demonología</option>
            <option value="7">Piromancia vil</option>
            <option value="8">Magia sangrienta</option>
            <option value="9">Magia de la sombra</option>
            <option value="10">Magia druidica: Feral</option>
            <option value="11">Magia druidica: Equilibrio</option>
            <option value="12">Magia druidica: Vida</option>
            <option value="13">Dominio de la luz</option>
            <option value="14">Magia elemental: Agua</option>
            <option value="15">Magia elemental: Fuego</option>
            <option value="16">Magia elemental: Tierra</option>
            <option value="17">Magia elemental: Aire</option>
            <option value="18">Chi</option>
            <option value="19">Maestro de armas</option>
            <option value="20">Furibundo</option>
            <option value="21">Protector</option>
            <option value="22">Puntería</option>
            <option value="23">Supervivencia</option>
            <option value="24">Maestro de bestias</option>
            <option value="25">A.A.M.M. Maestro cervecero</option>
            <option value="26">A.A.M.M. Caminavientos</option>
            <option value="27">Asesinato</option>
            <option value="28">Sutileza</option>
            <option value="29">Forajido</option>
            <option value="30">Protector sagrado</option>
            <option value="31">Represión</option>
            <option value="32">Devastación</option>
            <option value="33">Venganza</option>
            <option value="34">Caballero sangriento</option>
            <option value="35">Caballero de escarcha</option>
            <option value="36">Caballero profano</option>
          </select>
          <input required type="number" name="mye7" id="mye7"default value="0" min="0" max="5" onkeypress="return false";  onfocus="this.oldvalue = this.value;" onchange="calcmye(this)"></td>
          </div>
      </fieldset>


    <!-- HABILIDADES DE ARMAS -->
      <fieldset>
          <td><label for="ha"><h2>Habilidades de armas:</h2> </label>
          <td><label for="pha">Puntos de habilidades de armas: </label>
          <input required type="number" id="pha" name="pha" default value="5" min="0" max="5" onkeypress="return false"; onclick="return false";></td><br>

        <!-- Habilidades de armas 1 -->
          <label for="Lha0">Habilidades de armas: </label>
          <select name="ha0" id="Sha0">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha0" id="ha0"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha1" name="ha1" onchange="mostrarha(1)">                
          <label for="ha1" > Añadir </label>
          </div> 

        <!-- Habilidades de armas 2 -->

          <div id="arma1" style="display:none;"> 
          <label for="Lha1">Habilidades de armas: </label>
          <select name="ha1" id="Sha1">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha1" id="ha1"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha2" name="ha2" onchange="mostrarha(2)">                
          <label for="ha2" > Añadir </label>                                   
          </div>
          
        <!-- Habilidades de armas 3 -->

          <div id="arma2" style="display:none;"> 
          <label for="Lha2">Habilidades de armas: </label>
          <select name="ha2" id="Sha2">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha2" id="ha2"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha3" name="ha3" onchange="mostrarha(3)">                
          <label for="ha3" > Añadir </label>                                   
          </div>

        <!-- Habilidades de armas 4 -->

          <div id="arma3" style="display:none;"> 
          <label for="Lha3">Habilidades de armas: </label>
          <select name="ha3" id="Sha3">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha3" id="ha3"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha4" name="ha4" onchange="mostrarha(4)">                
          <label for="ha4" > Añadir </label>                                   
          </div>

        <!-- Habilidades de armas 5 -->

          <div id="arma4" style="display:none;"> 
          <label for="Lha4">Habilidades de armas: </label>
          <select name="ha4" id="Sha4">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha4" id="ha4"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha5" name="ha5" onchange="mostrarha(5)">                
          <label for="ha5" > Añadir </label>                                   
          </div>
          
        <!-- Habilidades de armas 6 -->

          <div id="arma5" style="display:none;"> 
          <label for="Lha5">Habilidades de armas: </label>
          <select name="ha5" id="Sha5">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha5" id="ha5"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha6" name="ha6" onchange="mostrarha(6)">                
          <label for="ha6" > Añadir </label>                                   
          </div>
                              
        <!-- Habilidades de armas 7 -->

          <div id="arma6" style="display:none;"> 
          <label for="Lha6">Habilidades de armas: </label>
          <select name="ha6" id="Sha6">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha6" id="ha6"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha7" name="ha7" onchange="mostrarha(7)">                
          <label for="ha7" > Añadir </label>                                   
          </div>
                                                  
        <!-- Habilidades de armas 8 -->

          <div id="arma7" style="display:none;"> 
          <label for="Lha7">Habilidades de armas: </label>
          <select name="ha7" id="Sha7">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha7" id="ha7"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha8" name="ha8" onchange="mostrarha(8)">                
          <label for="ha8" > Añadir </label>                                   
          </div>
          
        <!-- Habilidades de armas 9 -->

          <div id="arma8" style="display:none;"> 
          <label for="Lha8">Habilidades de armas: </label>
          <select name="ha8" id="Sha8">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha8" id="ha8"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha9" name="ha9" onchange="mostrarha(9)">                
          <label for="ha9" > Añadir </label>                                   
          </div>
          
        <!-- Habilidades de armas 10 -->

          <div id="arma9" style="display:none;"> 
          <label for="Lha9">Habilidades de armas: </label>
          <select name="ha9" id="Sha9">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha9" id="ha9"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha10" name="ha10" onchange="mostrarha(10)">                
          <label for="ha10" > Añadir </label>                                   
          </div>
          
        <!-- Habilidades de armas 11 -->

          <div id="arma10" style="display:none;"> 
          <label for="Lha10">Habilidades de armas: </label>
          <select name="ha10" id="Sha10">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha10" id="ha10"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha11" name="ha11" onchange="mostrarha(11)">                
          <label for="ha11" > Añadir </label>                                   
          </div>

        <!-- Habilidades de armas 12 -->

          <div id="arma11" style="display:none;"> 
          <label for="Lha11">Habilidades de armas: </label>
          <select name="ha11" id="Sha11">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha1" id="ha1"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha12" name="ha12" onchange="mostrarha(12)">                
          <label for="ha12" > Añadir </label>                                   
          </div>
          
        <!-- Habilidades de armas 13 -->

          <div id="arma12" style="display:none;"> 
          <label for="Lha12">Habilidades de armas: </label>
          <select name="ha12" id="Sha12">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha12" id="ha12"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha13" name="ha13" onchange="mostrarha(13)">                
          <label for="ha13" > Añadir </label>                                   
          </div>

        <!-- Habilidades de armas 14 -->

          <div id="arma13" style="display:none;"> 
          <label for="Lha13">Habilidades de armas: </label>
          <select name="ha13" id="Sha13">
          <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha13" id="ha13"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha14" name="ha14" onchange="mostrarha(14)">                
          <label for="ha14" > Añadir </label>                                   
          </div>

        <!-- Habilidades de armas 15 -->

          <div id="arma14" style="display:none;"> 
          <label for="Lha14">Habilidades de armas: </label>
          <select name="ha14" id="Sha14">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha14" id="ha14"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha15" name="ha15" onchange="mostrarha(15)">                
          <label for="ha15" > Añadir </label>                                   
          </div>
          
        <!-- Habilidades de armas 16 -->

          <div id="arma15" style="display:none;"> 
          <label for="Lha15">Habilidades de armas: </label>
          <select name="ha15" id="Sha15">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha15" id="ha15"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha16" name="ha16" onchange="mostrarha(16)">                
          <label for="ha16" > Añadir </label>                                   
          </div>
                              
        <!-- Habilidades de armas 17 -->

          <div id="arma16" style="display:none;"> 
          <label for="Lha16">Habilidades de armas: </label>
          <select name="ha16" id="Sha16">
            <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha16" id="ha16"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>
          <input type="checkbox"  id="ha17" name="ha17" onchange="mostrarha(17)">                
          <label for="ha17" > Añadir </label>                                   
          </div>
                                                  
        <!-- Habilidades de armas 18 -->

          <div id="arma17" style="display:none;"> 
          <label for="Lha17">Habilidades de armas: </label>
          <select name="ha17" id="Sha17">
          <option value="0" selected disabled>Seleccionar</option>
            <option value="1">Espadas de una mano</option>
            <option value="2">Espadas de dos manos</option>
            <option value="3">Mazas de una mano</option>
            <option value="4">Mazas de dos manos</option>
            <option value="5">Hachas de una mano</option>
            <option value="6">Hachas de dos manos</option>
            <option value="7">Arcos</option>
            <option value="8">Armas de fuego</option>
            <option value="9">Armas arrojadizas</option>
            <option value="10">Ballestas</option>
            <option value="11">Bastones</option>
            <option value="12">Varitas</option>
            <option value="13">Dagas</option>
            <option value="14">Armas de puño</option>
            <option value="15">Armas de asta</option>
            <option value="16">Gujas de guerra</option>
            <option value="17">Escudo</option>
            <option value="18">Sin Armas</option>
          </select>
          <input type="number" name="ha17" id="ha17"default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcha(this)"></td>                     
          </div>
          </fieldset>
    <!-- PROFESIONES -->
        
        <fieldset>
        <td><label for="ppoo"><h2>Profesiones y oficios:</h2> </label>
          <td><label for="ppo">Puntos de profesiones y oficios: </label>
          <input required type="number" id="ppo" name="ppo" default value="2" min="0" max="2" onkeypress="return false"; onclick="return false";></td><br>
          <label for="ppo0">Habilidades de armas: </label>
            <select name="ppo0" id="ppo0">
            <option value="0" selected dicabled>Seleccionar</option>
            <option value="1">Alquimia</option>
            <option value="2">Sastrería</option>
            <option value="3">Desuello</option>
            <option value="4">Carpintería</option>
            <option value="5">Herboristería</option>
            <option value="6">Encantamiento</option>
            <option value="7">Herrería</option>
            <option value="8">Inscripción</option>
            <option value="9">Ingeniería</option>
            <option value="10">Joyeria</option>
            <option value="11">Leñador</option>
            <option value="12">Minería</option>
            <option value="13">Peletería</option>
            <option value="14">Granjero</option>
            <option value="15">Bardo</option>
            <option value="16">Marinero</option>
            <option value="17">Mercader</option>
            <option value="18">Cazarrecompensas</option>
            <option value="19">Criador de animales</option>
            </select>
          <input required type="number" id="sppo" name="sppo0" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcppo(this)"></td>
          <input type="checkbox" name="sppo1" id="sppo1" onchange="mostrarppo(1)"> añadir<br>
                                                                                                                             
      <!-- PROFESION 2 -->
          <div id="prof1" style="display:none;">          
          <label for="sppo1">Habilidades de armas: </label>
          <select name="sppo1" id="sppo1">
            <option value="0" selected dicabled>Seleccionar</option>
            <option value="1">Alquimia</option>
            <option value="2">Sastrería</option>
            <option value="3">Desuello</option>
            <option value="4">Carpintería</option>
            <option value="5">Herboristería</option>
            <option value="6">Encantamiento</option>
            <option value="7">Herrería</option>
            <option value="8">Inscripción</option>
            <option value="9">Ingeniería</option>
            <option value="10">Joyeria</option>
            <option value="11">Leñador</option>
            <option value="12">Minería</option>
            <option value="13">Peletería</option>
            <option value="14">Granjero</option>
            <option value="15">Bardo</option>
            <option value="16">Marinero</option>
            <option value="17">Mercader</option>
            <option value="18">Cazarrecompensas</option>
            <option value="19">Criador de animales</option>
          </select>
          <input required type="number" id="sppo" name="sppo1" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcppo(this)"></td>
          <input type="checkbox" name="sppo2" id="sppo2" onchange="mostrarppo(2)"> añadir<br>
          </div>                                                                                                            
      <!-- PROFESION 3 -->
        <div id="prof2" style="display:none;">                      
        <label for="sppo2">Habilidades de armas: </label>
        <select name="sppo2" id="sppo2">
            <option value="0" selected dicabled>Seleccionar</option>
            <option value="1">Alquimia</option>
            <option value="2">Sastrería</option>
            <option value="3">Desuello</option>
            <option value="4">Carpintería</option>
            <option value="5">Herboristería</option>
            <option value="6">Encantamiento</option>
            <option value="7">Herrería</option>
            <option value="8">Inscripción</option>
            <option value="9">Ingeniería</option>
            <option value="10">Joyeria</option>
            <option value="11">Leñador</option>
            <option value="12">Minería</option>
            <option value="13">Peletería</option>
            <option value="14">Granjero</option>
            <option value="15">Bardo</option>
            <option value="16">Marinero</option>
            <option value="17">Mercader</option>
            <option value="18">Cazarrecompensas</option>
            <option value="19">Criador de animales</option>
        </select>
        <input required type="number" name="ppo2" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calcppo(this)"></td><br>
        </div>
        <!-- CONOCIMIENTOS -->
          <div>
          <td><label for="conocimientos"> <h3>Conocimientos: </h3></label>
          <td><label for="pco">Puntos de conocimientos: </label>
          <input required type="number" id="pco" name="pco" default value="5" min="0" max="5" onkeypress="return false"; onclick="return false";></td><br>
          <td><label for="jinete">Jinete: </label>
          <input required type="number" id="spco" name="jinete" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpco(this)"></td><br>
          <td><label for="pesca">Pesca: </label>
          <input required type="number" id="spco" name="pesca" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpco(this)"></td><br>
          <td><label for="arqueologia">Arqueología: </label>
          <input required type="number" id="spco" name="arqueologia" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpco(this)"></td><br>
          <td><label for="medico">Médico: </label>
          <input required type="number" id="spco" name="medico" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpco(this)"></td><br>
          <td><label for="cocina">Cocina: </label>
          <input required type="number" id="spco" name="cocina" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpco(this)"></td><br>
          <td><label for="con_mag">Conocimiento de magia: </label>
          <input required type="number" id="spco" name="con_mag" default value="0" min="0" max="5" onkeypress="return false"; onfocus="this.oldvalue = this.value;" onchange="calpco(this)"></td><br>
          </fieldset>  
        </div>
          
          <td><input type="submit" name="insertar" value="Crear ficha"></td><br>
          <span><a href="principal.php">VOLVER</a></span>
          <a href="UserProfile.html"> Perfil</a>
        </form>
        

    </body>
    <?php
    echo nfilas($conexion) . " registros en tabla. Conexion OK. ";

    if (isset($_POST["insertar"])){
        
        //verificarFicha ($_POST);
        altaFicha($conexion);
    }


    ?>

<script>
  function mostrarmye(valor){

    var grupo = document.getElementById("mages"+valor);
    var check = document.getElementById("mye"+valor);

    if(check.checked){
      grupo.style.display = "block";
    }else{
      grupo.style.display = "none";
    }

  }
  
  function mostrarha(valor){

    var grupo = document.getElementById("arma"+valor);
    var check = document.getElementById("ha"+valor);

    if(check.checked){
    grupo.style.display = "block";
    }else{
    grupo.style.display = "none";
    }

  }

  function mostrarppo(valor){

    var grupo = document.getElementById("prof"+valor);
    var check = document.getElementById("sppo"+valor);

    if(check.checked){
    grupo.style.display = "block";
    }else{
    grupo.style.display = "none";
    }
  }

function updateTextInput(val) {
    document.getElementById('mye0').value=val;
    document.getElementById('ha0').value=val;  
  }

  function calnivel(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("nivel").value>1)
  {
    document.getElementById("pg").value -7;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("nivel").value>=1)
  {
    document.getElementById("pg").value +7;
  }
}
  
  function calpa(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("pa").value>0)
  {
    document.getElementById("pa").value --;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("pa").value>=0)
  {
    document.getElementById("pa").value ++;
  }
}


function calph(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("ph").value>0)
  {
    document.getElementById("ph").value --;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("ph").value>=0)
  {
    document.getElementById("ph").value ++;
  }
}

function calpd(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("pd").value>0)
  { 
    document.getElementById("pd").value --;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("pd").value>=0)
  {
    document.getElementById("pd").value ++;
  }
}

function calcphm(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("phm").value>0)
  { 
    document.getElementById("phm").value --;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("phm").value>=0)
  {
    document.getElementById("phm").value ++;
  }
}

function calcmye(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("pmye").value>0)
  {
    document.getElementById("pmye").value --;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("pmye").value>=0)
  {
    document.getElementById("pmye").value ++;
  }
}

function calcha(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("pha").value>0)
  {
    document.getElementById("pha").value --;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("pha").value>=0)
  {
    document.getElementById("pha").value ++;
  }
}

function calcppo(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("ppo").value>0)
  {
    document.getElementById("ppo").value --;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("ppo").value>=0)
  {
    document.getElementById("ppo").value ++;
  }
}

function calpco(valor){
  
  
  if(valor.value > valor.oldvalue  && document.getElementById("pco").value>0)
  {
    document.getElementById("pco").value --;
  }
  if(valor.value < valor.oldvalue  && document.getElementById("pco").value>=0)
  {
    document.getElementById("pco").value ++;
  }
}

		</script>
    </html>