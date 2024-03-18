var textoIngresado=null; /* texto crudo ingresado por el usuario */
var textoNormalizado=null; /* texto con mayúsculas y tildes quitados */
var textoProcesado=null; /* texto encriptado a partir de "textoNormalizado" */

/* Chequea que haya texto ingresado en la caja de texto, si no lo hay restaura las secciones
ocultas (imagen y título), esconde el botón de pegar y deja un mensaje de error. */
function chequearIngreso(){
  if(Boolean(document.getElementById("texto-ingresado").value)==false){
    document.getElementById("boton-copiar").style.visibility="hidden";
    document.getElementById("imagen-output").style.display="block";
    document.getElementById("titulo-output").style.display="block";
    document.getElementById("titulo-output").innerHTML="Ningún mensaje fue encontrado";
    document.getElementById("titulo-output").style.fontWeight="600";
    document.getElementById("titulo-output").style.color="red";
    document.getElementById("resultado-output").style.gridArea="10 / 2 / 16 / -2";
    document.getElementById("resultado-output").style.placeSelf="start center";
    document.getElementById("resultado-output").style.visibility="visible";
    document.getElementById("resultado-output").style.fontSize = "1rem";
    document.getElementById("parrafo-output").innerHTML="Por favor, ingresa un texto para encriptar o desencriptar";
    document.getElementById("texto-ingresado").focus();
    return false;
  }else{
    return true;
  }
}

/* Toma el texto ingresado, elimina los tildes y reemplaza mayúsculas por minúsculas. */
function limpiarTexto(){
  textoIngresado=document.getElementById("texto-ingresado").value;
  textoNormalizado=textoIngresado.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
    /*  .normalize("NFD") →  decomposición canónica de caracteres unicode. Tiene el efecto de separar
                             los caracteres tildados en dos códigos, el caracter más el tilde.
        .replace(/\p{Diacritic}/gu, "") → en la cadena decompuesta, reemplaza los caracteres de tilde
                                          ("Diacritic") por vacío (""). \p para carácter especial, g 
                                          para reemplazar todos, no sólo el primero, u para señalar
                                          código unicode.
        .toLowerCase() → convierte todas las mayúsculas de la cadena en minúsculas */
  document.getElementById("texto-ingresado").value = textoNormalizado;
}

/* reemplaza las vocales mínusculas por los valores solicitados. */
function encriptarTexto(){
  let cheq=chequearIngreso();
  if (cheq==false){
    return;
  }else{
    limpiarTexto();
    textoProcesado=textoNormalizado
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
    /* g para reemplazar todos los valores en la cadena, no solo el primero encontrado. */
    mostrarOutput(textoProcesado);
  }
}

/* reemplaza los valores solicitados con las vocales originales que reemplazaron */
function desencriptarTexto(){
  let cheq=chequearIngreso();
  if (cheq==false){
    return;
  }else{
  limpiarTexto();
    textoProcesado=textoNormalizado
      .replace(/ufat/g, "u")
      .replace(/ober/g, "o")
      .replace(/ai/g, "a")
      .replace(/imes/g, "i")
      .replace(/enter/g, "e");
    /* g para reemplazar todos los valores en la cadena, no solo el primero encontrado. */
    mostrarOutput(textoProcesado);
  }
}

/* Primero prepara la caja de salida, eliminando la imagen de presentación y el título,
y luego expandiendo el área que muestra el resultado. Finalmente, muestra el resultado
en el área preparada. */
function mostrarOutput(mostrarTexto){
  document.getElementById("imagen-output").style.display="none";
  document.getElementById("titulo-output").style.display="none";
  document.getElementById("resultado-output").style.gridArea="2 / 2 / 16 / -2";
  document.getElementById("resultado-output").style.placeSelf="center center";
  document.getElementById("resultado-output").style.visibility="visible";
  document.getElementById("resultado-output").style.fontSize = "1.5rem";
  document.getElementById("parrafo-output").innerHTML = mostrarTexto;
  document.getElementById("boton-copiar").style.visibility="visible";
  setTimeout(() => {
    document.getElementById("input-grid").reset();
    document.getElementById("texto-ingresado").focus();
  }, 1500);
}

/* Copia el texto escrito por el usuarion el área de ingreso en el portapapeles.*/
function copiarTexto(){
  let copiado=document.getElementById("parrafo-output").innerHTML;
  navigator.clipboard.writeText(copiado);
  document.getElementById("texto-ingresado").focus();
}

/* Oyentes para los botones de la página */
document.getElementById("encriptador").addEventListener("click",encriptarTexto);
document.getElementById("desencriptador").addEventListener("click",desencriptarTexto);
document.getElementById("copiador").addEventListener("click",copiarTexto);