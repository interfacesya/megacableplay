var Template = function(data) {
var generes="";

if (data.genres) {
   for (var i=0; i < data.genres.length; i++)
    {
        genero = data.genres[i].name;
        generes = generes + "<text>" + genero + "</text>" + "\n";
    }
}


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
    <productTemplate>
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
            <title>`+ data.original_title +`</title>
            <subtitle>`+ data.title +`</subtitle>
            <text>`+ data.tagline +`</text>
            <description allowsZooming="true" template="${this.BASEURL}detalleReview.xml.js|`+ data.overview +`" presentation="modalDialogPresenter">`+ data.overview +`</description>
            <row>
                <text>`+ data.release_date +`</text>
                `+ generes +`
            </row>
            <row>
                <buttonLockup id="`+ data.title +`" name="Info">
                    <badge src="resource://button-rate" class="whiteButton" />
                    <title>Vote</title>
                </buttonLockup>
                <buttonLockup id="urlPlay" name="Info">
                    <badge src="resource://button-play" class="whiteButton" />
                    <title>Play</title>
                </buttonLockup>
                <buttonLockup>
                    <badge src="resource://button-add" class="whiteButton" />
                    <title>Lista de deseos</title>
                </buttonLockup>
            </row>
          </stack>
        </banner>
        <shelf>
            <header>
                <title>Relacionados</title>
            </header>
            <section>
                <lockup>
                    <img src="http://localhost:8000/images/pelicula1.png" width="252" height="160"/>
                    <title class="showTextOnHighlight">Title 1</title>
                    <overlay>
                        <progressBar value="0.1" />
                    </overlay>
                    <relatedContent>
                        <infoTable>
                            <header>
                                <title>Info Header 1</title>
                            </header>
                            <info>
                                <header>
                                  <title>Title 1</title>
                                </header>
                                <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
                            </info>
                        </infoTable>
                    </relatedContent>
                </lockup>
                
                <lockup>
                    <img src="http://localhost:8000/images/pelicula2.png" width="252" height="160"/>
                    <title class="showTextOnHighlight">Title 1</title>
                    <overlay>
                        <progressBar value="0.1" />
                    </overlay>
                    <relatedContent>
                        <infoTable>
                            <header>
                                <title>Info Header 2</title>
                            </header>
                            <info>
                                <header>
                                  <title>Title 2</title>
                                </header>
                                <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
                            </info>
                        </infoTable>
                    </relatedContent>
                </lockup>
                <lockup>
                    <img src="http://localhost:8000/images/pelicula3.png" width="252" height="160"/>
                    <title class="showTextOnHighlight">Title 1</title>
                    <overlay>
                        <progressBar value="0.1" />
                    </overlay>
                    <relatedContent>
                        <infoTable>
                            <header>
                                <title>Info Header 3</title>
                            </header>
                            <info>
                                <header>
                                  <title>Title 3</title>
                                </header>
                                <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
                            </info>
                        </infoTable>
                    </relatedContent>
                </lockup>
                <lockup>
                    <img src="http://localhost:8000/images/pelicula4.png" width="252" height="160"/>
                    <title class="showTextOnHighlight">Title 4</title>
                    <overlay>
                        <progressBar value="0.1" />
                    </overlay>
                    <relatedContent>
                        <infoTable>
                            <header>
                                <title>Info Header 4</title>
                            </header>
                            <info>
                                <header>
                                  <title>Title 1</title>
                                </header>
                                <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
                            </info>
                        </infoTable>
                    </relatedContent>
                </lockup>
            </section>
        </shelf>
    </productTemplate>
</document>`
}
