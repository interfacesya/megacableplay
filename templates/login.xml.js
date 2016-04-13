var Template = function () {

var baseURL= "http://200.52.193.147:8000/images/";
return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
    <head>
        <style>
        .longDescriptionLayout {
          max-width: 1280;
        }
        .darkBackgroundColor {
          background-color: #091a2a;
        }
        </style>
    </head>
   <formTemplate theme="dark" class="darkBackgroundColor">
      <banner>
         <img src="${this.BASEURL}/images/logo.png" width="800" height="400"/>
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
