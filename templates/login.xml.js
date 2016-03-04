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
         <img src="http://10.42.0.12:8000/images/logo.png" width="800" height="400"/>
         <description class="longDescriptionLayout">Registrar Usuario</description>
      </banner>
      <textField id="email" name="login"></textField>
      <footer>
         <button id="submit" name="login">
            <text>Enviar</text>
         </button>
      </footer>
   </formTemplate>
</document>`
}
