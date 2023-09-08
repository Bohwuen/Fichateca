-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 13-10-2022 a las 21:03:22
-- Versión del servidor: 8.0.27
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fichateca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficio`
--

DROP TABLE IF EXISTS `beneficio`;
CREATE TABLE IF NOT EXISTS `beneficio` (
  `cod_beneficio` int NOT NULL,
  `nombre` int NOT NULL,
  `tipo` int NOT NULL,
  `efecto` int NOT NULL,
  `duracion` int NOT NULL,
  `beneficio/perjuicio_cod_ben_per` int NOT NULL,
  PRIMARY KEY (`cod_beneficio`,`beneficio/perjuicio_cod_ben_per`),
  KEY `fk_beneficio_beneficio/perjuicio1_idx` (`beneficio/perjuicio_cod_ben_per`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficio/perjuicio`
--

DROP TABLE IF EXISTS `beneficio/perjuicio`;
CREATE TABLE IF NOT EXISTS `beneficio/perjuicio` (
  `cod_ben_per` int NOT NULL,
  `cod_usuario` int NOT NULL,
  `Beneficio o perjuicio` int NOT NULL,
  `usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_ben_per`,`usuario_cod_usuario`),
  KEY `fk_beneficio/perjuicio_usuario1_idx` (`usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase armadura`
--

DROP TABLE IF EXISTS `clase armadura`;
CREATE TABLE IF NOT EXISTS `clase armadura` (
  `cod_armadura` int NOT NULL,
  `tela` int NOT NULL,
  `cuero` int NOT NULL,
  `malla` int NOT NULL,
  `placas` int NOT NULL,
  `cod_ficha` int DEFAULT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_armadura`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `fk_clase armadura_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

DROP TABLE IF EXISTS `clases`;
CREATE TABLE IF NOT EXISTS `clases` (
  `cod_clase` int NOT NULL,
  `guerrero` int NOT NULL,
  `mago` int NOT NULL,
  `cazador` int NOT NULL,
  `druida` int NOT NULL,
  `monje` int NOT NULL,
  `brujo` int NOT NULL,
  `picaro` int NOT NULL,
  `sacerdote` int NOT NULL,
  `paladin` int NOT NULL,
  `chaman` int NOT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  `ficha_usuario_cod_usuario1` int NOT NULL,
  `ficha_ficha_cod_ficha` int NOT NULL,
  `ficha_ficha_usuario_cod_usuario` int NOT NULL,
  `ficha_ficha_usuario_cod_usuario1` int NOT NULL,
  `ficha_ficha_cod_ficha1` int NOT NULL,
  `ficha_ficha_usuario_cod_usuario2` int NOT NULL,
  `ficha_ficha_usuario_cod_usuario11` int NOT NULL,
  `ficha_ficha_ficha_cod_ficha` int NOT NULL,
  `ficha_ficha_ficha_usuario_cod_usuario` int NOT NULL,
  `ficha_ficha_ficha_usuario_cod_usuario1` int NOT NULL,
  PRIMARY KEY (`cod_clase`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`,`ficha_usuario_cod_usuario1`,`ficha_ficha_cod_ficha`,`ficha_ficha_usuario_cod_usuario`,`ficha_ficha_usuario_cod_usuario1`,`ficha_ficha_cod_ficha1`,`ficha_ficha_usuario_cod_usuario2`,`ficha_ficha_usuario_cod_usuario11`,`ficha_ficha_ficha_cod_ficha`,`ficha_ficha_ficha_usuario_cod_usuario`,`ficha_ficha_ficha_usuario_cod_usuario1`),
  KEY `cod_clase` (`cod_clase`),
  KEY `fk_clases_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`,`ficha_usuario_cod_usuario1`,`ficha_ficha_cod_ficha`,`ficha_ficha_usuario_cod_usuario`,`ficha_ficha_usuario_cod_usuario1`,`ficha_ficha_cod_ficha1`,`ficha_ficha_usuario_cod_usuario2`,`ficha_ficha_usuario_cod_usuario11`,`ficha_ficha_ficha_cod_ficha`,`ficha_ficha_ficha_usuario_cod_usuario`,`ficha_ficha_ficha_usuario_cod_usuario1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conocimientos`
--

DROP TABLE IF EXISTS `conocimientos`;
CREATE TABLE IF NOT EXISTS `conocimientos` (
  `cod_conocimientos` int NOT NULL,
  `jinete` int NOT NULL,
  `pesca` int NOT NULL,
  `arqueologia` int NOT NULL,
  `medicina` int NOT NULL,
  `cocina` int NOT NULL,
  `con_magia` int NOT NULL,
  `cod_ficha` int NOT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_conocimientos`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `cod_conocimientos` (`cod_conocimientos`),
  KEY `fk_conocimientos_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criatura`
--

DROP TABLE IF EXISTS `criatura`;
CREATE TABLE IF NOT EXISTS `criatura` (
  `cod_criatura` int NOT NULL,
  `cod_usuario` int NOT NULL,
  `Nombre` varchar(75) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `categoria` int NOT NULL,
  `salud` int NOT NULL,
  `ataque` int NOT NULL,
  `poder_magico` int NOT NULL,
  `dif_interaccion` int NOT NULL,
  `defensa` int NOT NULL,
  `tipo` int NOT NULL,
  `descripcion` int NOT NULL,
  `habilidades` int NOT NULL,
  `usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_criatura`,`usuario_cod_usuario`),
  KEY `cod_criatura` (`cod_criatura`),
  KEY `cod_usuario` (`cod_usuario`),
  KEY `fk_criatura_usuario1_idx` (`usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `defensas`
--

DROP TABLE IF EXISTS `defensas`;
CREATE TABLE IF NOT EXISTS `defensas` (
  `cod_defensas` int NOT NULL,
  `parada` int NOT NULL,
  `esquivar` int NOT NULL,
  `bloqueo` int NOT NULL,
  `metamagia` int NOT NULL,
  `cod_ficha` int DEFAULT NULL,
  `defensascol` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_defensas`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `cod_defensas` (`cod_defensas`),
  KEY `fk_defensas_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `draenei`
--

DROP TABLE IF EXISTS `draenei`;
CREATE TABLE IF NOT EXISTS `draenei` (
  `cod_draenei` int NOT NULL,
  `draenei` int NOT NULL,
  `forjaluz` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  `razas_cod_raza1` int NOT NULL,
  PRIMARY KEY (`cod_draenei`,`razas_cod_raza`,`razas_cod_raza1`),
  KEY `cod_draenei` (`cod_draenei`),
  KEY `fk_draenei_razas1_idx` (`razas_cod_raza`),
  KEY `fk_draenei_razas1_idx1` (`razas_cod_raza1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elfos de la noche`
--

DROP TABLE IF EXISTS `elfos de la noche`;
CREATE TABLE IF NOT EXISTS `elfos de la noche` (
  `cod_elfo_de_la_noche` int NOT NULL,
  `darnassus` int NOT NULL,
  `eldre_talas` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  `razas_cod_raza1` int NOT NULL,
  PRIMARY KEY (`cod_elfo_de_la_noche`,`razas_cod_raza`,`razas_cod_raza1`),
  KEY `cod_elfo_de_la_noche` (`cod_elfo_de_la_noche`),
  KEY `fk_elfos de la noche_razas1_idx` (`razas_cod_raza`),
  KEY `fk_elfos de la noche_razas1_idx1` (`razas_cod_raza1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enanos`
--

DROP TABLE IF EXISTS `enanos`;
CREATE TABLE IF NOT EXISTS `enanos` (
  `cod_enanos` int NOT NULL,
  `barbabronce` int NOT NULL,
  `martillo_salvaje` int NOT NULL,
  `hierro_negro` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  `razas_cod_raza1` int NOT NULL,
  PRIMARY KEY (`cod_enanos`,`razas_cod_raza`,`razas_cod_raza1`),
  KEY `cod_enanos` (`cod_enanos`),
  KEY `fk_enanos_razas1_idx` (`razas_cod_raza`),
  KEY `fk_enanos_razas1_idx1` (`razas_cod_raza1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ficha`
--

DROP TABLE IF EXISTS `ficha`;
CREATE TABLE IF NOT EXISTS `ficha` (
  `cod_ficha` int NOT NULL AUTO_INCREMENT,
  `cod_usuario` int NOT NULL,
  `titulo` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nacimiento` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `alineamiento` varchar(75) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cod_raza` int NOT NULL,
  `cod_clase` int NOT NULL,
  `nivel` int NOT NULL,
  `cod_faccion` int NOT NULL,
  `pg` int NOT NULL,
  `pa` int NOT NULL,
  `ph` int NOT NULL,
  `pd` int NOT NULL,
  `phm` int NOT NULL,
  `pmye` int NOT NULL,
  `pha` int NOT NULL,
  `ppo` int NOT NULL,
  `pco` int DEFAULT NULL,
  `destreza` int NOT NULL,
  `percepcion` int NOT NULL,
  `voluntad` int NOT NULL,
  `vigor` int NOT NULL,
  `inteligencia` int NOT NULL,
  `aguante` int NOT NULL,
  `energia` int NOT NULL,
  `atletismo` int DEFAULT NULL,
  `robo` int DEFAULT NULL,
  `sigilo` int DEFAULT NULL,
  `forzar_cerraduras` int DEFAULT NULL,
  `supervivencia` int DEFAULT NULL,
  `trepar_escalar` int DEFAULT NULL,
  `buscar` int DEFAULT NULL,
  `alerta` int DEFAULT NULL,
  `aprendizaje` int DEFAULT NULL,
  `interpretacion` int DEFAULT NULL,
  `subterfugio` int DEFAULT NULL,
  `trato_con_animales` int DEFAULT NULL,
  `intimidacion` int DEFAULT NULL,
  `carisma` int DEFAULT NULL,
  `parada` int NOT NULL,
  `esquivar` int NOT NULL,
  `bloqueo` int NOT NULL,
  `metamagia` int NOT NULL,
  `taumaturgia` int DEFAULT NULL,
  `fe` int DEFAULT NULL,
  `espiritualidad` int DEFAULT NULL,
  `naturaleza` int DEFAULT NULL,
  `corrupcion` int DEFAULT NULL,
  `mye0` int DEFAULT NULL,
  `mye1` int DEFAULT NULL,
  `mye2` int DEFAULT NULL,
  `mye3` int DEFAULT NULL,
  `mye4` int DEFAULT NULL,
  `mye5` int DEFAULT NULL,
  `mye6` int DEFAULT NULL,
  `mye7` int DEFAULT NULL,
  `ha0` int DEFAULT NULL,
  `ha1` int DEFAULT NULL,
  `ha2` int DEFAULT NULL,
  `ha3` int DEFAULT NULL,
  `ha4` int DEFAULT NULL,
  `ha5` int DEFAULT NULL,
  `ha6` int DEFAULT NULL,
  `ha7` int DEFAULT NULL,
  `ha8` int DEFAULT NULL,
  `ha9` int DEFAULT NULL,
  `ha10` int DEFAULT NULL,
  `ha11` int DEFAULT NULL,
  `ha12` int DEFAULT NULL,
  `ha13` int DEFAULT NULL,
  `ha14` int DEFAULT NULL,
  `ha15` int DEFAULT NULL,
  `ha16` int DEFAULT NULL,
  `ha17` int DEFAULT NULL,
  `ppo0` int DEFAULT NULL,
  `ppo1` int DEFAULT NULL,
  `ppo2` int DEFAULT NULL,
  `jinete` int DEFAULT NULL,
  `pesca` int DEFAULT NULL,
  `arqueologia` int DEFAULT NULL,
  `medico` int DEFAULT NULL,
  `cocina` int DEFAULT NULL,
  `con_mag` int DEFAULT NULL,
  `usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_ficha`,`usuario_cod_usuario`),
  KEY `cod_ficha` (`cod_ficha`),
  KEY `cod_usuario` (`cod_usuario`),
  KEY `cod_raza` (`cod_raza`),
  KEY `cod_clase` (`cod_clase`),
  KEY `cod_faccion` (`cod_faccion`),
  KEY `fk_ficha_usuario1_idx` (`usuario_cod_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gnomos`
--

DROP TABLE IF EXISTS `gnomos`;
CREATE TABLE IF NOT EXISTS `gnomos` (
  `cod_gnomos` int NOT NULL,
  `gnomeregan` int NOT NULL,
  `mecandria` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  `razas_cod_raza1` int NOT NULL,
  PRIMARY KEY (`cod_gnomos`,`razas_cod_raza`,`razas_cod_raza1`),
  KEY `cod_gnomos` (`cod_gnomos`),
  KEY `fk_gnomos_razas1_idx` (`razas_cod_raza`),
  KEY `fk_gnomos_razas1_idx1` (`razas_cod_raza1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `goblin`
--

DROP TABLE IF EXISTS `goblin`;
CREATE TABLE IF NOT EXISTS `goblin` (
  `cod_goblin` int NOT NULL,
  `goblin` int NOT NULL,
  `gilgoblin` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  `razas_cod_raza1` int NOT NULL,
  PRIMARY KEY (`cod_goblin`,`razas_cod_raza`,`razas_cod_raza1`),
  KEY `cod_goblin` (`cod_goblin`),
  KEY `fk_goblin_razas1_idx` (`razas_cod_raza`),
  KEY `fk_goblin_razas1_idx1` (`razas_cod_raza1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidad`
--

DROP TABLE IF EXISTS `habilidad`;
CREATE TABLE IF NOT EXISTS `habilidad` (
  `cod_habilidad` int NOT NULL,
  `cod_usuario` int NOT NULL,
  `nombre` varchar(75) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `escuela` int NOT NULL,
  `requisito` int NOT NULL,
  `coste` int NOT NULL,
  `tiempo reutilizacion` int NOT NULL,
  `efectos` int NOT NULL,
  `usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_habilidad`,`usuario_cod_usuario`),
  KEY `cod_habilidad` (`cod_habilidad`),
  KEY `cod_usuario` (`cod_usuario`),
  KEY `fk_habilidad_usuario1_idx` (`usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidades`
--

DROP TABLE IF EXISTS `habilidades`;
CREATE TABLE IF NOT EXISTS `habilidades` (
  `cod_habilidades` int NOT NULL,
  `atletismo` int NOT NULL,
  `robo` int NOT NULL,
  `sigilo` int NOT NULL,
  `forzar_cerraduras` int NOT NULL,
  `supervivencia` int NOT NULL,
  `trepar/escalar` int NOT NULL,
  `buscar` int NOT NULL,
  `alerta` int NOT NULL,
  `aprendizaje` int NOT NULL,
  `interpretacion` int NOT NULL,
  `subterfugio` int NOT NULL,
  `trato_animales` int NOT NULL,
  `intimidacion` int NOT NULL,
  `carisma` int NOT NULL,
  `cod_ficha` int NOT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_habilidades`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `cod_habilidades` (`cod_habilidades`),
  KEY `fk_habilidades_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidades de armas`
--

DROP TABLE IF EXISTS `habilidades de armas`;
CREATE TABLE IF NOT EXISTS `habilidades de armas` (
  `cod_hab_armas` int NOT NULL,
  `espadas_1m` int NOT NULL,
  `espadas_2m` int NOT NULL,
  `mazas_1m` int NOT NULL,
  `mazas_2m` int NOT NULL,
  `hachas_1m` int NOT NULL,
  `hachas_2m` int NOT NULL,
  `arcos` int NOT NULL,
  `armas_de_fuego` int NOT NULL,
  `armas_arrojadizas` int NOT NULL,
  `ballestas` int NOT NULL,
  `bastones` int NOT NULL,
  `varitas` int NOT NULL,
  `dagas` int NOT NULL,
  `armas_de_puño` int NOT NULL,
  `armas_de_asta` int NOT NULL,
  `gujas_de_guerra` int NOT NULL,
  `escudo` int NOT NULL,
  `sin_armas` int NOT NULL,
  `cod_ficha` int NOT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_hab_armas`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `cod_hab_armas` (`cod_hab_armas`),
  KEY `fk_habilidades de armas_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidades magicas`
--

DROP TABLE IF EXISTS `habilidades magicas`;
CREATE TABLE IF NOT EXISTS `habilidades magicas` (
  `cod_hab_magic` int NOT NULL,
  `Taumaturgia` int NOT NULL,
  `fe` int NOT NULL,
  `espiritualidad` int NOT NULL,
  `naturaleza` int NOT NULL,
  `corrupcion` int NOT NULL,
  `cod_ficha` int DEFAULT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_hab_magic`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `cod_hab_magic` (`cod_hab_magic`),
  KEY `fk_habilidades magicas_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `humanos`
--

DROP TABLE IF EXISTS `humanos`;
CREATE TABLE IF NOT EXISTS `humanos` (
  `cod_humano` int NOT NULL,
  `ventormenta` int NOT NULL,
  `lordaeron` int NOT NULL,
  `kul_tiras` int NOT NULL,
  `gilneas` int NOT NULL,
  `dalaran` int NOT NULL,
  `alterac` int NOT NULL,
  `strom` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  `razas_cod_raza1` int NOT NULL,
  PRIMARY KEY (`cod_humano`,`razas_cod_raza`,`razas_cod_raza1`),
  KEY `cod_humano` (`cod_humano`),
  KEY `fk_humanos_razas1_idx` (`razas_cod_raza`),
  KEY `fk_humanos_razas1_idx1` (`razas_cod_raza1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `magia y estilos`
--

DROP TABLE IF EXISTS `magia y estilos`;
CREATE TABLE IF NOT EXISTS `magia y estilos` (
  `cod_magia_estilos` int NOT NULL,
  `arcanismo` int NOT NULL,
  `piromancia` int NOT NULL,
  `criomancia` int NOT NULL,
  `nigromancia` int NOT NULL,
  `magia_runica` int NOT NULL,
  `demonologia` int NOT NULL,
  `piromancia_vil` int NOT NULL,
  `magia_sangrienta` int NOT NULL,
  `magia_sombra` int NOT NULL,
  `mag_dru_feral` int NOT NULL,
  `mag_dru_eq` int NOT NULL,
  `mag_dru_vida` int NOT NULL,
  `luz` int NOT NULL,
  `mag_ele_agua` int NOT NULL,
  `mag_ele_fuego` int NOT NULL,
  `mag_ele_tierra` int NOT NULL,
  `mag_ele_aire` int NOT NULL,
  `chi` int NOT NULL,
  `maestro_armas` int NOT NULL,
  `furibundo` int NOT NULL,
  `protector` int NOT NULL,
  `punteria` int NOT NULL,
  `supervivencia` int NOT NULL,
  `maestro_bestias` int NOT NULL,
  `A.A.M.M_maestro_cervecero` int NOT NULL,
  `A.A.M.M_caminavientos` int NOT NULL,
  `asesinato` int NOT NULL,
  `sutileza` int NOT NULL,
  `forajido` int NOT NULL,
  `protector_sagrado` int NOT NULL,
  `represion` int NOT NULL,
  `devastacion` int NOT NULL,
  `venganza` int NOT NULL,
  `caballero_sangriento` int NOT NULL,
  `caballero_escarcha` int NOT NULL,
  `caballero_profano` int NOT NULL,
  `cod_ficha` int NOT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_magia_estilos`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `cod_magia_estilos` (`cod_magia_estilos`),
  KEY `fk_magia y estilos_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `no-muertos`
--

DROP TABLE IF EXISTS `no-muertos`;
CREATE TABLE IF NOT EXISTS `no-muertos` (
  `cod_no-muerto` int NOT NULL,
  `renegado` int NOT NULL,
  `no_muerto` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  `razas_cod_raza1` int NOT NULL,
  PRIMARY KEY (`cod_no-muerto`,`razas_cod_raza`,`razas_cod_raza1`),
  KEY `cod_no-muerto` (`cod_no-muerto`),
  KEY `fk_no-muertos_razas1_idx` (`razas_cod_raza`),
  KEY `fk_no-muertos_razas1_idx1` (`razas_cod_raza1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objeto`
--

DROP TABLE IF EXISTS `objeto`;
CREATE TABLE IF NOT EXISTS `objeto` (
  `cod_objeto` int NOT NULL,
  `cod_usuario` int NOT NULL,
  `nombre` varchar(75) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `calidad` int NOT NULL,
  `tipo` int NOT NULL,
  `condiciones` int NOT NULL,
  `caracteristicas` int NOT NULL,
  `precio` int NOT NULL,
  `usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`usuario_cod_usuario`),
  KEY `cod_usuario` (`cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficios`
--

DROP TABLE IF EXISTS `oficios`;
CREATE TABLE IF NOT EXISTS `oficios` (
  `cod_oficios` int NOT NULL,
  `bardo` int NOT NULL,
  `marinero` int NOT NULL,
  `mercader` int NOT NULL,
  `cazarrecompensas` int NOT NULL,
  `cria_animales` int NOT NULL,
  `cod_ficha` int NOT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_oficios`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `cod_oficios` (`cod_oficios`),
  KEY `fk_oficios_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orcos`
--

DROP TABLE IF EXISTS `orcos`;
CREATE TABLE IF NOT EXISTS `orcos` (
  `cod_orco` int NOT NULL,
  `orco` int NOT NULL,
  `orco_mag_har` int NOT NULL,
  `orco_vil` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  `razas_cod_raza1` int NOT NULL,
  PRIMARY KEY (`cod_orco`,`razas_cod_raza`,`razas_cod_raza1`),
  KEY `cod_orco` (`cod_orco`),
  KEY `fk_orcos_razas1_idx` (`razas_cod_raza`),
  KEY `fk_orcos_razas1_idx1` (`razas_cod_raza1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perjuicios`
--

DROP TABLE IF EXISTS `perjuicios`;
CREATE TABLE IF NOT EXISTS `perjuicios` (
  `cod_perjuicio` int NOT NULL,
  `nombre` int NOT NULL,
  `tipo` int NOT NULL,
  `efecto` int NOT NULL,
  `duracion` int NOT NULL,
  `beneficio/perjuicio_cod_ben_per` int NOT NULL,
  PRIMARY KEY (`cod_perjuicio`,`beneficio/perjuicio_cod_ben_per`),
  KEY `fk_perjuicios_beneficio/perjuicio1_idx` (`beneficio/perjuicio_cod_ben_per`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesiones`
--

DROP TABLE IF EXISTS `profesiones`;
CREATE TABLE IF NOT EXISTS `profesiones` (
  `cod_profesiones` int NOT NULL,
  `alquimia` int NOT NULL,
  `sastreria` int NOT NULL,
  `desuello` int NOT NULL,
  `carpinteria` int NOT NULL,
  `herboristeria` int NOT NULL,
  `encantamiento` int NOT NULL,
  `herreria` int NOT NULL,
  `inscripcion` int NOT NULL,
  `ingenieria` int NOT NULL,
  `joyeria` int NOT NULL,
  `leñador` int NOT NULL,
  `mineria` int NOT NULL,
  `peleteria` int NOT NULL,
  `granjero` int NOT NULL,
  `cod_ficha` int NOT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_profesiones`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `cod_profesiones` (`cod_profesiones`),
  KEY `fk_profesiones_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

DROP TABLE IF EXISTS `razas`;
CREATE TABLE IF NOT EXISTS `razas` (
  `cod_raza` int NOT NULL,
  `cod_ficha` int NOT NULL,
  `cod_humanos` int NOT NULL,
  `cod_enanos` int NOT NULL,
  `cod_gnomos` int NOT NULL,
  `cod_elfo_de_la_noche` int NOT NULL,
  `alto_elfo` int NOT NULL,
  `cod_orco` int NOT NULL,
  `cod_troll` int NOT NULL,
  `cod_tauren` int NOT NULL,
  `cod_no-muerto` int NOT NULL,
  `ogro` int NOT NULL,
  `cod_goblin` int NOT NULL,
  `elfo_sangre` int NOT NULL,
  `cod_draenei` int NOT NULL,
  `huargen` int NOT NULL,
  `pandaren` int NOT NULL,
  `nocheterna` int NOT NULL,
  `elfo_vacio` int NOT NULL,
  PRIMARY KEY (`cod_raza`),
  KEY `cod_draenei` (`cod_draenei`),
  KEY `cod_goblin` (`cod_goblin`),
  KEY `cod_no-muerto` (`cod_no-muerto`),
  KEY `cod_tauren` (`cod_tauren`),
  KEY `cod_troll` (`cod_troll`),
  KEY `cod_orco` (`cod_orco`),
  KEY `cod_elfo_de_la_noche` (`cod_elfo_de_la_noche`),
  KEY `cod_gnomos` (`cod_gnomos`),
  KEY `cod_enanos` (`cod_enanos`),
  KEY `cod_humanos` (`cod_humanos`),
  KEY `cod_ficha` (`cod_ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resistencias`
--

DROP TABLE IF EXISTS `resistencias`;
CREATE TABLE IF NOT EXISTS `resistencias` (
  `cod_resistencias` int NOT NULL,
  `resistencia_fisica` int NOT NULL,
  `resistencia_arcana` int NOT NULL,
  `resistencia_fuego` int NOT NULL,
  `resistencia_frio` int NOT NULL,
  `resistencia_sombra` int NOT NULL,
  `resistencia_naturaleza` int NOT NULL,
  `resistencia_luz` int NOT NULL,
  `ficha_cod_ficha` int NOT NULL,
  `ficha_usuario_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cod_resistencias`,`ficha_cod_ficha`,`ficha_usuario_cod_usuario`),
  KEY `fk_resistencias_ficha1_idx` (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tauren`
--

DROP TABLE IF EXISTS `tauren`;
CREATE TABLE IF NOT EXISTS `tauren` (
  `cod_tauren` int NOT NULL,
  `mulgore` int NOT NULL,
  `monte_alto` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  PRIMARY KEY (`cod_tauren`,`razas_cod_raza`),
  KEY `fk_tauren_razas1_idx` (`razas_cod_raza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trols`
--

DROP TABLE IF EXISTS `trols`;
CREATE TABLE IF NOT EXISTS `trols` (
  `cod_trol` int NOT NULL,
  `lanza_negra` int NOT NULL,
  `zandalari` int NOT NULL,
  `gurubashi` int NOT NULL,
  `amani` int NOT NULL,
  `drakkari` int NOT NULL,
  `farraki` int NOT NULL,
  `razas_cod_raza` int NOT NULL,
  PRIMARY KEY (`cod_trol`,`razas_cod_raza`),
  KEY `fk_trols_razas1_idx` (`razas_cod_raza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `cod_usuario` int NOT NULL,
  `nombre_usuario` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `mail` varchar(75) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `pass` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `permisos` int DEFAULT NULL,
  `cod_ficha` int DEFAULT NULL,
  `cod_objeto` int DEFAULT NULL,
  `cod_hab` int DEFAULT NULL,
  `cod_ben_per` int DEFAULT NULL,
  `cod_criatura` int DEFAULT NULL,
  PRIMARY KEY (`cod_usuario`),
  KEY `cod_usuario` (`cod_usuario`),
  KEY `cod_usuario_2` (`cod_usuario`),
  KEY `cod_ficha` (`cod_ficha`),
  KEY `cod_objeto` (`cod_objeto`),
  KEY `cod_hab` (`cod_hab`),
  KEY `cod_ben_per` (`cod_ben_per`),
  KEY `cod_criatura` (`cod_criatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `beneficio`
--
ALTER TABLE `beneficio`
  ADD CONSTRAINT `fk_beneficio_beneficio/perjuicio1` FOREIGN KEY (`beneficio/perjuicio_cod_ben_per`) REFERENCES `beneficio/perjuicio` (`cod_ben_per`);

--
-- Filtros para la tabla `beneficio/perjuicio`
--
ALTER TABLE `beneficio/perjuicio`
  ADD CONSTRAINT `fk_beneficio/perjuicio_usuario1` FOREIGN KEY (`usuario_cod_usuario`) REFERENCES `usuario` (`cod_usuario`);

--
-- Filtros para la tabla `clase armadura`
--
ALTER TABLE `clase armadura`
  ADD CONSTRAINT `fk_clase armadura_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`cod_clase`) REFERENCES `ficha` (`cod_clase`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `criatura`
--
ALTER TABLE `criatura`
  ADD CONSTRAINT `fk_criatura_usuario1` FOREIGN KEY (`usuario_cod_usuario`) REFERENCES `usuario` (`cod_usuario`);

--
-- Filtros para la tabla `defensas`
--
ALTER TABLE `defensas`
  ADD CONSTRAINT `fk_defensas_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `draenei`
--
ALTER TABLE `draenei`
  ADD CONSTRAINT `fk_draenei_razas1` FOREIGN KEY (`razas_cod_raza1`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `elfos de la noche`
--
ALTER TABLE `elfos de la noche`
  ADD CONSTRAINT `fk_elfos de la noche_razas1` FOREIGN KEY (`razas_cod_raza1`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `enanos`
--
ALTER TABLE `enanos`
  ADD CONSTRAINT `fk_enanos_razas1` FOREIGN KEY (`razas_cod_raza1`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `ficha`
--
ALTER TABLE `ficha`
  ADD CONSTRAINT `fk_ficha_usuario1` FOREIGN KEY (`usuario_cod_usuario`) REFERENCES `usuario` (`cod_usuario`);

--
-- Filtros para la tabla `gnomos`
--
ALTER TABLE `gnomos`
  ADD CONSTRAINT `fk_gnomos_razas1` FOREIGN KEY (`razas_cod_raza1`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `goblin`
--
ALTER TABLE `goblin`
  ADD CONSTRAINT `fk_goblin_razas1` FOREIGN KEY (`razas_cod_raza1`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `habilidad`
--
ALTER TABLE `habilidad`
  ADD CONSTRAINT `fk_habilidad_usuario1` FOREIGN KEY (`usuario_cod_usuario`) REFERENCES `usuario` (`cod_usuario`);

--
-- Filtros para la tabla `habilidades`
--
ALTER TABLE `habilidades`
  ADD CONSTRAINT `fk_habilidades_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `habilidades de armas`
--
ALTER TABLE `habilidades de armas`
  ADD CONSTRAINT `fk_habilidades de armas_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `habilidades magicas`
--
ALTER TABLE `habilidades magicas`
  ADD CONSTRAINT `fk_habilidades magicas_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `humanos`
--
ALTER TABLE `humanos`
  ADD CONSTRAINT `fk_humanos_razas1` FOREIGN KEY (`razas_cod_raza1`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `magia y estilos`
--
ALTER TABLE `magia y estilos`
  ADD CONSTRAINT `fk_magia y estilos_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `no-muertos`
--
ALTER TABLE `no-muertos`
  ADD CONSTRAINT `fk_no-muertos_razas1` FOREIGN KEY (`razas_cod_raza1`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `objeto`
--
ALTER TABLE `objeto`
  ADD CONSTRAINT `fk_objeto_usuario1` FOREIGN KEY (`usuario_cod_usuario`) REFERENCES `usuario` (`cod_usuario`);

--
-- Filtros para la tabla `oficios`
--
ALTER TABLE `oficios`
  ADD CONSTRAINT `fk_oficios_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `orcos`
--
ALTER TABLE `orcos`
  ADD CONSTRAINT `fk_orcos_razas1` FOREIGN KEY (`razas_cod_raza1`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `perjuicios`
--
ALTER TABLE `perjuicios`
  ADD CONSTRAINT `fk_perjuicios_beneficio/perjuicio1` FOREIGN KEY (`beneficio/perjuicio_cod_ben_per`) REFERENCES `beneficio/perjuicio` (`cod_ben_per`);

--
-- Filtros para la tabla `profesiones`
--
ALTER TABLE `profesiones`
  ADD CONSTRAINT `fk_profesiones_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `razas`
--
ALTER TABLE `razas`
  ADD CONSTRAINT `razas_ibfk_1` FOREIGN KEY (`cod_raza`) REFERENCES `ficha` (`cod_raza`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `resistencias`
--
ALTER TABLE `resistencias`
  ADD CONSTRAINT `fk_resistencias_ficha1` FOREIGN KEY (`ficha_cod_ficha`,`ficha_usuario_cod_usuario`) REFERENCES `ficha` (`cod_ficha`, `usuario_cod_usuario`);

--
-- Filtros para la tabla `tauren`
--
ALTER TABLE `tauren`
  ADD CONSTRAINT `fk_tauren_razas1` FOREIGN KEY (`razas_cod_raza`) REFERENCES `razas` (`cod_raza`);

--
-- Filtros para la tabla `trols`
--
ALTER TABLE `trols`
  ADD CONSTRAINT `fk_trols_razas1` FOREIGN KEY (`razas_cod_raza`) REFERENCES `razas` (`cod_raza`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
