var Template = function(data, data2) {
var generes="";
var bloque1="";
var companias ="";
var idioma = "";
var favorito ="button-add";
var leyendaAdd ="Añadir";
var regex =/\&/;
var edo=true;

  if (data.genres) {
     for (var i=0; i < data.genres.length; i++)
      {
          genero = data.genres[i].name;
          generes = generes + "<text>" + genero + "</text>" + "\n";
      }
  }
  var changedObjects = sessionStorage.getItem("changedObjects");

  if (changedObjects !== undefined)
  {
     changedObjects = JSON.parse(changedObjects);
     for (var key in changedObjects)
     {
        if(key.toString() === data.id.toString())
        {

          var obj = changedObjects[key];

          if (obj['favorite'] === 1)
          {
            favorito="button-remove";
            leyendaAdd ="Quitar";
            edo=false;
          }
          else
          {
            favorito="button-add";
            leyendaAdd ="Añadir";
            edo=true;
          }
        }
     }
  }
  else {
    favorito="button-add";
    leyendaAdd ="Añadir";
  }


   for (var y=0; y < data2.results.length; y++)
   {

      var titulo = data2.results[y].title;
      titulo = titulo.replace(regex," y ");
      if (data2.results[y].overview !== undefined)
      {
        var overview = data2.results[y].overview;
        if (overview !== null)
          overview = overview.replace(regex," y ");
        else {
          overview ="";
        }
      }


       bloque1  = bloque1 + '<lockup name="detalle" id="' + data2.results[y].id +'">\
           <img src="http://image.tmdb.org/t/p/w500' + data2.results[y].poster_path +'" width="250" height="376" />\
           <title class="showTextOnHighlight">' + titulo + '</title>' +
           '<overlay>\
               <progressBar value="0.1" />\
           </overlay>\
           <relatedContent>\
               <infoTable>\
                   <header>\
                       <title>' + titulo + '</title>' +
                   '</header>\
                   <info>\
                       <header>\
                         <title> ' + titulo + '</title>' +
                       '</header>\
                       <description> ' + overview +'</description>' +
                   '</info>\
               </infoTable>\
           </relatedContent>\
       </lockup>' + '\n' ;
   }

  for (z=0; z < data.production_companies.length;z++)
  {
     var comp = data.production_companies[z].name;
     comp = comp.replace(regex, " y ");
     companias = companias +  + comp;
  }
  for (z=0; z < data.spoken_languages.length;z++)
  {
     idioma = idioma + data.spoken_languages[z].name + " ";
  }

  var title0 = data.original_title;
  title0 = title0.replace(regex," y ");

  var title = data.title;
  title = title.replace(regex," y ");

  var over =data.overview;
  over = over.replace(regex," y ");

  var tagline = data.tagline;
  tagline = tagline.replace(regex," y ");

return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
    <head>
      <style>
      .showTextOnHighlight {
        tv-text-highlight-style: show-on-highlight;
      }
      .whiteButton {
        tv-tint-color: rgb(255, 255, 255);
      }
      .shelfLayout {
        padding: 40 90;
      }
      </style>
    </head>
    <productBundleTemplate>
        <background>
          <img src="http://image.tmdb.org/t/p/w500` + data.backdrop_path +`" />
        </background>
        <banner>
            <infoList>
               <info>
                  <header>
                     <title>Director</title>
                  </header>
                  <text>John Appleseed</text>
               </info>
               <info>
                  <header>
                     <title>Actors</title>
                  </header>
                  <text>Anne Johnson</text>
                  <text>Tom Clark</text>
                  <text>Maria Ruiz</text>
               </info>
            </infoList>
          <stack>
            <title>`+ title0 +`</title>
            <subtitle>`+ title +`</subtitle>
            <text>`+ tagline +`</text>
            <description allowsZooming="true" template="${this.BASEURL}detalleReview.xml.js" presentation="modalDialogPresenter"
                           name ="detalleReview" id="`+ data.id +`">`+ over +`</description>
            <row>
                <text>`+ data.release_date +`</text>
                `+ generes +`
            </row>
            <row>"\n"</row>
            <row>
                <buttonLockup id="`+ data.id +`" name="Info">
                <badge src="resource://button-rate" class="whiteButton" />
                    <title>Vote</title>
                </buttonLockup>
                <buttonLockup id="urlPlay" name="Info">
                    <badge src="resource://button-play" class="whiteButton" />
                    <title>Play</title>
                </buttonLockup>
                <buttonLockup toggle="`+ edo +`" id="`+ data.id +`" name="add">
                    <badge src="resource://`+ favorito +`" class="whiteButton" />
                    <title>`+ leyendaAdd + `</title>
                </buttonLockup>
            </row>
          </stack>
        </banner>
        <shelf>
            <header>
                <title>Relacionados</title>
            </header>
            <section> `+ bloque1 + `</section>
        </shelf>

        <shelf>
           <header>
              <title>calificaciones y Criticas</title>
           </header>
           <section>
              <ratingCard>
                   <title>`+ data.vote_average +`</title>
                   <ratingBadge value="0.7"></ratingBadge>
                   <description>Promedio de `+ data.vote_count +` calificaciones de usuarios y criticas.</description>
              </ratingCard>
              <ratingCard>
                 <title><badge src="resource://tomato-fresh" />%</title>
                 <text>Jitomatometro</text>
                 <infoTable>
                      <info>
                           <header>
                              <title>175</title>
                           </header>
                           <text>Criticas</text>
                      </info>
                    <info>
                        <header>
                           <title>173</title>
                        </header>
                        <text>Buenas</text>
                    </info>
                    <info>
                       <header>
                          <title>2</title>
                       </header>
                       <text>Malas</text>
                    </info>
                 </infoTable>
            </ratingCard>
         </section>
      </shelf>

      <shelf>
         <header>
            <title>Reparto y Equipo</title>
         </header>
         <section>
            <monogramLockup>
               <monogram firstName="Anne" lastName="Johnson"/>
               <title>Anne Johnson</title>
               <subtitle>Actor</subtitle>
            </monogramLockup>
            <monogramLockup>
               <monogram firstName="Tom" lastName="Clark"/>
               <title>Tom Clark</title>
               <subtitle>Actor</subtitle>
            </monogramLockup>
            <monogramLockup>
                <monogram firstName="Maria" lastName="Ruiz"/>
                <title>Maria Ruiz</title>
                <subtitle>Actor</subtitle>
            </monogramLockup>
         </section>
      </shelf>
      <productInfo>
         <infoTable>
            <header>
               <title>Informacion</title>
            </header>
            <info>
               <header>
                  <title>Compañia Produtora</title>
               </header>
               <text>`+ companias +`</text>
            </info>
            <info>
               <header>
                  <title>Duracion</title>
               </header>
               <text>`+ data.runtime + `</text>
            </info>
            <info>
               <header>
                  <title>Formato</title>
               </header>
               <text>Widescreen</text>
            </info>
         </infoTable>
         <infoTable>
            <header>
               <title>Idiomas</title>
            </header>
            <info>
               <header>
                  <title>Principal</title>
               </header>
               <text>`+ idioma +`</text>
            </info>
            <info>
               <header>
                  <title>Adicionales</title>
               </header>
               <text>NA</text>
            </info>
         </infoTable>
         <infoTable style="tv-line-spacing:10;">
            <header>
               <title>Accesibilidad</title>
            </header>
            <info>
               <header>
                  <textBadge>SDH</textBadge>
               </header>
               <text>Subtitles for the deaf and Hard of Hearing (SDH) refer to subtitles in the original lanuage with the addition of relevant non-dialog information.</text>
            </info>
         </infoTable>
      </productInfo>
    </productBundleTemplate>
</document>`
}
