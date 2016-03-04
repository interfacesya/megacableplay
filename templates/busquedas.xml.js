var Template = function() {
  return `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <head>
      <style>
        .suggestionListLayout {
          margin: -150 0;
        }
      </style>
    </head>
    <searchTemplate>
      <searchField id="searchField" name="searchField">Busqueda</searchField>
      <collectionList>
        <shelf>
          <header>
            <title>Resultados</title>
          </header>
          <section>
              SIN RESULTADOS
          </section>
        </shelf>
      </collectionList>
    </searchTemplate>
  </document>`
}
