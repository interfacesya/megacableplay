
var Template = function(data) {
return `<?xml version="1.0" encoding="UTF-8" ?>
<document>  <alertTemplate>
    <title>¿Confirmas que deseas salir de la session?</title>
    <description></description>
    <button id="SI" name="salida">
      <text>SI</text>
    </button>
    <button id="NO" name="salida">
      <text>CANCEL</text>
    </button>
  </alertTemplate>
</document>`
};
