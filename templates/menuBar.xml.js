var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <menuBarTemplate>
    <menuBar>
      <menuItem template="${this.BASEURL}templates/salidaAlerta.xml.js" presentation="menuBarItemPresenter">
        <title>Cerrar Sesion</title>
      </menuItem>
      <menuItem template="${this.BASEURL}templates/template1.xml.js" presentation="menuBarItemPresenter">
        <title>Principal</title>
      </menuItem><menuItem template="${this.BASEURL}templates/busquedas.xml.js" presentation="menuBarItemPresenter">
        <title>Busquedas</title>
      </menuItem>
    </menuBar>
  </menuBarTemplate>
</document>`
}
