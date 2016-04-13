var Template = function () {
var baseURL= "http://200.52.193.147:8000/images/";

return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
    <head>
        <style>
        .longDescriptionLayout {
          max-width: 1280;
        }
        </style>
    </head>
   <formTemplate>
      <banner>
         <img src="`+baseURL+`logo.png" width="800" height="400"/>
         <description class="longDescriptionLayout">Contraseña</description>
      </banner>
      <textField id="email" name="loginPwd" secure="true"></textField>
      <footer>
         <button id="submit" name="loginPwd">
            <text>Enviar</text>
         </button>
      </footer>
   </formTemplate>
</document>`
}
