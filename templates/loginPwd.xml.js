var Template = function () { return `<?xml version="1.0" encoding="UTF-8" ?>
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
         <img src="http://localhost:8000/images/logo.png" width="800" height="400"/>
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