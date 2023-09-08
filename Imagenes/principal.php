<?php

require_once('controladores/funciones.php');


//Conectar con BBDD
$conexion = conectarBD();



?>
<html>
  <head>
    <title>FICHATECA</title>
    <link rel="stylesheet" href="estilo2.css"> 
    <meta charset="utf-8">
     
  </head>
             
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <h1>FICHATECA</h1>

   <?php echo nfilas($conexion) . " registro(s) en tabla CLIENTE. Conexion OK"; ?>
    
    <div class="inset">
    <p>
    <label for="alta">CREAR FICHA</label>
    <span><a href="crearficha.php">DAR DE ALTA UNA FICHA</a></span>
    </p>
    <p>
    <label for="modificar">MODIFICAR FICHA</label>
    <span><a href="modificarFicha.php">MODIFICAR UNA FICHA</a></span>
    </p> 
    <p>
    <label for="buscar">BUSCAR FICHA</label>
    <span><a href="buscarregistro.php">BUSCAR UNA FICHA</a></span>
    </p> 
    <p>
    <!-- <label for="baja">BAJA FICHA</label>
    <input  type="text" name="baja" id="baja" placeholder="MAIL"> -->
    </p>
   
        
    <p class="p-container">
        <input  type="submit" name="ok" value="OK">
        <button type="submit" name="salir" value="salir">SALIR</button>
    </p>
   
    </form>
    
    <?php

    if (isset($_POST["baja"]))
    {

      $baja = $_POST["baja"];
     
      baja($baja, $conexion);
      echo "Contacto dado de baja";
    //   $archivoActual = $_SERVER['PHP_SELF'];
    //   header("refresh:1;url=" . $archivoActual);

    }


    if (isset($_POST["salir"]))
    {

      echo "salir";

    }
    ?>
    
  </body>
</html>