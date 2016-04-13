var Template = function(data,data2,data3) {
var bloque1 ,bloque2,bloque3= "";
var baseURL= "http://200.52.193.147:8000/images/";
var regex =/\&/;

for (var i=0; i < data.results.length; i++)
{

    var titulo = data.results[i].title;
    titulo = titulo.replace(regex," ");

    bloque1  = bloque1 +
            '<lockup id="'+ data.results[i].id +'" name="catalogo">\
                <img src="http://image.tmdb.org/t/p/w500' + data.results[i].poster_path +'" width="250" height="376" />\
                <title>' + titulo + '</title>\
             </lockup>';
}

for (var i=0; i < data2.results.length; i++)
{
    var titulo2 = data2.results[i].title;
    titulo2 = titulo2.replace(regex," ");
    bloque2  = bloque2 +
            '<lockup id="'+ data2.results[i].id +'" name="catalogo">\
                <img src="http://image.tmdb.org/t/p/w500' + data2.results[i].poster_path +'" width="250" height="376" />\
                <title>' + titulo2 + '</title>\
             </lockup>';
}

for (var i=0; i < data3.results.length; i++)
{
    var titulo3 = data3.results[i].title;
    titulo3 = titulo3.replace(regex," ");

    bloque3  = bloque3 +
            '<lockup id="'+ data3.results[i].id +'" name="catalogo">\
                <img src="http://image.tmdb.org/t/p/w500' + data3.results[i].poster_path +'" width="250" height="376" />\
                <title>' + titulo3 + '</title>\
             </lockup>';
}


return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
<head>
  <style>
    .customRightTextImage {
      itml-position: right;
      margin: 0 20;
    }
    .customRightText {
      font-size: 26pt;
      font-weight: normal;
      text-align:left;
      color: rgba(0, 0, 0, 0.6);
      itml-text-max-lines: 1;
      margin: 0 20;
    }
    .darkBackgroundColor {
      background-color: #091a2a;
    }

  </style>
</head>
  <stackTemplate name="catalogo">
      <identityBanner>
          <background>
            <img src="` + baseURL +`banner.jpg" width="2000" height="540" />
          </background>
          <title></title>
          <row class="customRightTextImage">
            <text></text>
            <img src=""/>
          </row>
      </identityBanner>
    <collectionList>
        <shelf>
          <header>
            <title>Menu</title>
          </header>
          <section>
            <lockup id="buscar" name="catalogo">\
                <img src="` + baseURL +`buscar.png" width="250" height="250" />
             </lockup>
             <lockup id="config" name="catalogo">\
                 <img src="` + baseURL +`ajustes.png" width="250" height="250" />
              </lockup>
              <lockup >\
                  <img src="` + baseURL +`inicio.png" width="250" height="250" />
               </lockup>
               <lockup >\
                   <img src="` + baseURL +`actualizar.png" width="250" height="250" />
                </lockup>
          </section>
        </shelf>
        <shelf>
            <header>
              <title>Populares</title>
            </header>
            <section> `+ bloque1+`
            </section>
        </shelf>
      <shelf>
        <header>
          <title>Recientes</title>
        </header>
        <section> `+ bloque2+`
        </section>
      </shelf>
      <shelf>
        <header>
          <title>Proximamente</title>
        </header>
        <section> `+ bloque3+`
        </section>
      </shelf>
      <shelf>
        <header>
          <title>Mi Lista</title>
        </header>
        <section>
          <lockup>
              <img src="" width="250" height="376" />
              <title>Title</title>
          </lockup>
        </section>
      </shelf>
    </collectionList>
  </stackTemplate>
</document>`
}
