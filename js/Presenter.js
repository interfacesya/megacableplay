/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
Templates can be displayed to the user via three primary means:
- pushing a document on the stack
- associating a document with a menu bar item
- presenting a modal
This class shows examples for each one.
*/


var Presenter = {

    defaultPresenter: function(xml)
    {

        if(this.loadingIndicatorVisible) {
            navigationDocument.replaceDocument(xml, this.loadingIndicator);
            this.loadingIndicatorVisible = false;
        } else {
            navigationDocument.pushDocument(xml);
        }
    },

    modalDialogPresenter: function(xml)
    {
        navigationDocument.presentModal(xml);
    },

    menuBarItemPresenter: function(xml, ele)
    {
        var feature = ele.parentNode.getFeature("MenuBarDocument");

        if (feature) {

            if (!currentDoc) {
                feature.setDocument(xml, ele);
            }
        }
    },

    makeDocument:function(resource)
    {
        if (!Presenter.parser) {
            Presenter.parser = new DOMParser();
        }

        var doc = Presenter.parser.parseFromString(resource, "application/xml");
        return doc;
    },

    listarStack:function()
    {
        var stack=navigationDocument.documents();
        return stack;
    },

    removeDocument:function(xml)
    {
        navigationDocument.removeDocument(xml);
    },

    pushDocument:function(xml)
    {
        navigationDocument.pushDocument(xml);
    },

    replaceDocument:function(xmlNew,xmlOld)
    {
        navigationDocument.replaceDocument (xmlNew,xmlOld);
    },

    popDocument:function()
    {
        navigationDocument.popDocument();
    },

    cargaTemplate:function(template,datos,datos2,datos3)
    {
        var baseURL= "http://200.52.193.147:8000/templates/";

        resourceLoader = new ResourceLoader(baseURL);
		    resourceLoader.loadResource( baseURL + template,function(resource)
        {
            var doc = Presenter.makeDocument(resource);
            if (template == "busquedas.xml.js")
            {
              var searchField = doc.getElementById("searchField"); //get the searchField element
              var keyboard = searchField.getFeature("Keyboard");  // get the keyboard of the searchField
                      keyboard.onTextChange = function () {
                        console.log(keyboard.text)  // register listener on event onTextChange
                        Presenter.busqueda(keyboard.text,doc);     // do something with the current text
                  };
            }
            doc.addEventListener("load",Presenter.load.bind(Presenter));
            doc.addEventListener("select",Presenter.load.bind(Presenter));
            doc.addEventListener("change",Presenter.load.bind(Presenter));
            doc.addEventListener("highlight",Presenter.load.bind(Presenter));
            doc.addEventListener("appear",Presenter.load.bind(Presenter));
            Presenter.pushDocument(doc);
            return doc;

        },datos,datos2,datos3);
    },

    load: function(event)
    {
        var self = this,
        ele          = event.target,
        templateURL  = ele.getAttribute("template"),
        presentation = ele.getAttribute("presentation"),
        template    =  ele.getAttribute("name"),
        nodo        =  ele.getAttribute("id"),
        toggle      =  ele.getAttribute("toggle"),
        videoURL    =  ele.getAttribute("videoURL");

        console.log("evento:" + event.type + " forma:" + template + " valor:" + nodo)
        if (templateURL)
        {
            if (event.type == "select" && (template == "detalleReview") && !isNaN(nodo)) {
                var urlFind = 'http://api.themoviedb.org/3/movie/'+nodo+'?api_key=ff743742b3b6c89feb59dfc138b4c12f';
                Presenter.jsonRequest({ url: urlFind,
                    callback: function(err, data) {
                    Presenter.cargaTemplate("detalleReview.xml.js",data,"") }
                });
            }
        }
        else
        {
            if (event.type == "select" && template == "login")
            {
                Presenter.validaUsuario(ele)
            }
            if (event.type == "select" && template == "loginPwd")
            {
                Presenter.validaPwd(ele);
            }
            if(event.type == "select" && template == "catalogo" && !isNaN(nodo))
            {
                Presenter.cargaDetalle(nodo)
            }
            if (event.type == "select" && template == "detalle" && !isNaN(nodo))
            {
               Presenter.cargaDetalle(nodo)
            }
            if (event.type == "select" && template == "Info" && !isNaN(nodo))
            {
                var urlFind = 'http://api.themoviedb.org/3/movie/'+nodo+'?api_key=ff743742b3b6c89feb59dfc138b4c12f';
                Presenter.jsonRequest({ url: urlFind,
                    callback: function(err, data) {
                    Presenter.cargaTemplate("Rating.xml.js",data,"")}
                });
            }
            if (event.type == "select" && template == "Info" && nodo =="urlPlay")
            {
               var url=["http://www.nacentapps.com/m3u8/index.m3u8",
                    "http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
                    "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
                    "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
                    "http://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch1/appleman.m3u8",
                    "http://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch2/appleman.m3u8",
                    "http://cdn-fms.rbs.com.br/vod/hls_sample1_manifest.m3u8",
                    "http://cdn-fms.rbs.com.br/hls-vod/sample1_1500kbps.f4v.m3u8",
                    "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8"];

               var indice=Math.random() * 8;
               indice =Math.round(indice); 
               console.log("indice:" + indice);

                Presenter.reproduce(url[indice]);
            }
            if (event.type == "change" && template == "rating")
            {
                Presenter.obtenRatin(ele);
            }
            if (event.type == "select" && template == "catalogo" && nodo == "buscar")
            {
                Presenter.cargaTemplate("busquedas.xml.js","")
            }
            if (event.type == "select" && template == "add" && !isNaN(nodo) && toggle)
            {
                var isTrueSet = (toggle === 'true');
                var obj={};
                obj['favorite']=0;

                console.log("clic:"+ isTrueSet);

                var changedObjects = sessionStorage.getItem("changedObjects");
                if (changedObjects === undefined)
                    changedObjects={};
                else {
                   changedObjects = JSON.parse(changedObjects);
                }

                var badge = ele.getElementsByTagName("badge").item(0);
                var leyenda =ele.getElementsByTagName("title").item(0);

                if (isTrueSet == true)
                {
                  badge.setAttribute('src', 'resource://button-remove');
                  leyenda.textContent='Quitar';
                  obj['favorite']=1;
                  ele.setAttribute('toggle', "false");
                } else {
                  badge.setAttribute('src', 'resource://button-add');
                  leyenda.textContent='Añadir';
                  ele.setAttribute('toggle', "true");
                  obj['favorite']=0;
                }


                var eleID = nodo;
                changedObjects[eleID] = obj;
                sessionStorage.setItem("changedObjects", JSON.stringify(changedObjects));
            }
            if (event.type == "select" && template == "salida")
            {
              if ( nodo == "SI")
              {
                  console.log("salir de sistema:si");
                  sessionStorage.removeItem("changedObjects");
                  sessionStorage.removeItem("activo");
                  App.reload();
              }
              else
              {
                  console.log("salir del sistema:no");
                  Presenter.cargaCatalogo();
              }
            }

            if (event.type == "select" && template == "catalogo" && nodo=="config")
            {
              Presenter.cargaTemplate("salidaAlerta.xml.js");
            }
            if (event.type == "appear" && template == "catalogo")
            {
              Presenter.actualizaLista();
            }
        }
    },
    showLoadingIndicator: function(presentation)
    {
       if (!this.loadingIndicator) {
            this.loadingIndicator = this.makeDocument(this.loadingTemplate);
        }

        if (!this.loadingIndicatorVisible && presentation != "modalDialogPresenter" && presentation != "menuBarItemPresenter") {
            navigationDocument.pushDocument(this.loadingIndicator);
            this.loadingIndicatorVisible = true;
        }
    },
    removeLoadingIndicator: function()
    {
        if (this.loadingIndicatorVisible) {
            navigationDocument.removeDocument(this.loadingIndicator);
            this.loadingIndicatorVisible = false;
        }
    },
    validaUsuario:function(ele)
    {
        var formTemplate = ele.parentNode.parentNode; // your formTemplate button
        var children = formTemplate.childNodes;
        var textField = children.item(1); // replace "1" with the index of "textField" element in your template
        var keyboard = textField.getFeature("Keyboard"); // get the textField's Keyboard element
        var userValue = keyboard.text
        keyboard.onTextChange = function () {
            console.log("onTextChange "+keyboard.text)
          }

        if ( userValue == "abc") {
            console.log("usuario:" +  userValue);
            sessionStorage.setItem("usuario",userValue);
            Presenter.cargaTemplate("LoginPwd.xml.js")
        }
        else
        {
            Presenter.cargaTemplate("templateE.xml.js","")
        }
    },
    validaPwd:function(ele)
    {
        var formTemplate = ele.parentNode.parentNode; // your formTemplate button
        var children = formTemplate.childNodes;
        var textField = children.item(1); // replace "1" with the index of "textField" element in your template
        var keyboard = textField.getFeature("Keyboard"); // get the textField's Keyboard element
        var userValue = keyboard.text
        keyboard.onTextChange = function () {
            console.log("onTextChange "+keyboard.text)
          }
        console.log("pwd:" +  userValue);

        if ( userValue == "123") {

            sessionStorage.setItem("activo","verdadero");
            navigationDocument.clear();
            Presenter.cargaCatalogo();
        }
    },
    cargaCatalogo:function()
    {
        var urlPopular = 'http://api.themoviedb.org/3/movie/popular?api_key=ff743742b3b6c89feb59dfc138b4c12f';
        var urlRecient = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ff743742b3b6c89feb59dfc138b4c12f';
        var urlUpComin = 'http://api.themoviedb.org/3/movie/upcoming?api_key=ff743742b3b6c89feb59dfc138b4c12f';

        Presenter.jsonRequest({ url: urlPopular,
                            callback: function(err, catalogo) {
                            console.log(catalogo);
                            Presenter.jsonRequest({ url: urlRecient,
                                                callback: function(err, reciente) {
                                                console.log(reciente);
                                                Presenter.jsonRequest({ url: urlUpComin,
                                                                    callback: function(err, porvenir) {
                                                                    console.log(porvenir);
                                                                    Presenter.cargaTemplate("stack.xml.js",catalogo,reciente,porvenir) } });
                                                } });
                            } });
    },
    cargaDetalle: function (indice)
    {
        console.log(indice);
        var urlFind    = 'http://api.themoviedb.org/3/movie/'+indice +'?api_key=ff743742b3b6c89feb59dfc138b4c12f';
        var urlSimilar = 'http://api.themoviedb.org/3/movie/'+indice +'/similar?api_key=ff743742b3b6c89feb59dfc138b4c12f';

        Presenter.jsonRequest({ url: urlFind,
                    callback: function(err, data) {
                    //console.log(data);

                        Presenter.jsonRequest({ url: urlSimilar,
                            callback: function(err, dataSimilar) {
                            //console.log(dataSimilar);
                            Presenter.cargaTemplate("detalle.xml.js",data,dataSimilar) ;
                        }});
        }});
    },
    reproduce:function(videoURL)
    {
        if (videoURL) {
            var player = new Player();
            var playlist = new Playlist();
            var mediaItem = new MediaItem("video",videoURL);

            player.playlist = playlist;
            player.playlist.push(mediaItem);
            player.present();
            player.pause();
            player.play();
        }
    },
    jsonRequest: function (options)
    {
        var url = options.url;
        var method = options.method || 'GET';
        var headers = options.headers || {} ;
        var body = options.body || '';
        var callback = options.callback || function(err, data) {
            console.error("options.callback was missing for this request");
        };

        if (!url) {
            throw 'loadURL requires a url argument';
        }

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
            try {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        callback(null, JSON.parse(xhr.responseText));
                    } else {
                        callback(new Error("Error [" + xhr.status + "] making http request: " + url));
                    }
                }
            } catch (err) {
                console.error('Aborting request ' + url + '. Error: ' + err);
                xhr.abort();
                callback(new Error("Error making request to: " + url + " error: " + err));
            }
        };

        xhr.open(method, url, true);

        Object.keys(headers).forEach(function(key) {
            xhr.setRequestHeader(key, headers[key]);
        });

        xhr.send();

        return xhr;
    },
    obtenRatin:function (ele)
    {
        valorRate    =  ele.getAttribute("value");
        console.log("rate:" +  valorRate)
        Presenter.popDocument();
    },
    busqueda:function(searchText,doc)
    {
        var urlPopular = 'http://api.themoviedb.org/3/movie/popular?api_key=ff743742b3b6c89feb59dfc138b4c12f';
        var resultados ="";

        Presenter.jsonRequest({ url: urlPopular,
          callback: function(err, data) {
                var domImplementation = doc.implementation;
                var lsParser = domImplementation.createLSParser(1, null);
                var lsInput = domImplementation.createLSInput();
                var resultados ="";

                //simple filter and helper function
                var regExp = new RegExp(searchText, "i");
                var matchesText = function(value) {
                    return regExp.test(value);
                }

                //set default template fragment to display no results
                lsInput.stringData = `<list>
                  <section>
                    <header>
                      <title>SIN RESULTADOS</title>
                    </header>
                  </section>
                </list>`;


                  encabezado = `<shelf><header><title>RESULTADOS</title></header><section id="Results">`
                  for (var i=0; i < data.results.length; i++)
                  {
                      var titulo = data.results[i].title;

                      if (matchesText(titulo))
                      {
                          resultados  +=
                            '<lockup id="'+ data.results[i].id +'" name="catalogo">\
                                <img src="http://image.tmdb.org/t/p/w500' + data.results[i].poster_path +'" width="250" height="376" />\
                                <title>' + data.results[i].title  + '</title>\
                             </lockup>';
                     }
                   }
                   resultados += `</section></shelf>`;
                   if (resultados !="") lsInput.stringData = encabezado + resultados;

                 //add the new input element to the document by providing the newly created input, the context,
                 //and the operator integer flag (1 to append as child, 2 to overwrite existing children)
                 lsParser.parseWithContext(lsInput, doc.getElementsByTagName("collectionList").item(0), 2);
                }});
    },
    actualizaLista:function()
    {
          console.log("actualiza mi lista");
          var urlPopular = 'http://api.themoviedb.org/3/movie/popular?api_key=ff743742b3b6c89feb59dfc138b4c12f';
          var urlRecient = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ff743742b3b6c89feb59dfc138b4c12f';
          var urlUpComin = 'http://api.themoviedb.org/3/movie/upcoming?api_key=ff743742b3b6c89feb59dfc138b4c12f';

          var resultados ="";
          var doc = getActiveDocument();
          var domImplementation = doc.implementation;
          var lsParser = domImplementation.createLSParser(1, null);
          var lsInput = domImplementation.createLSInput();

          Presenter.jsonRequest({ url: urlPopular,
                              callback: function(err, catalogo) {
                              Presenter.jsonRequest({ url: urlRecient,
                                                  callback: function(err, reciente) {
                                                  Presenter.jsonRequest({ url: urlUpComin,
                                                                      callback: function(err, porvenir) {
                                                                        var changedObjects = sessionStorage.getItem("changedObjects");
                                                                        if (changedObjects === undefined) changedObjects = {};
                                                                        lsInput.stringData ='<header><title>Mi Lista</title></header><section>';
                                                                        if (Object.keys(changedObjects).length)
                                                                        {
                                                                           changedObjects = JSON.parse(changedObjects);
                                                                           for (var key in changedObjects)
                                                                           {
                                                                               var obj = changedObjects[key];
                                                                               for (var i=0; i < catalogo.results.length; i++)
                                                                               {
                                                                                   if ( obj['favorite'] === 1 && key.toString() === catalogo.results[i].id.toString())
                                                                                   {
                                                                                       lsInput.stringData +=
                                                                                       '<lockup id="'+ catalogo.results[i].id +'" name="catalogo">\
                                                                                           <img src="http://image.tmdb.org/t/p/w500' + catalogo.results[i].poster_path +'" width="250" height="376" />\
                                                                                           <title>' + catalogo.results[i].title + '</title>\
                                                                                        </lockup>';
                                                                                        break;
                                                                                   }
                                                                               } // fin for en resultados

                                                                               for (var i=0; i < reciente.results.length; i++)
                                                                               {
                                                                                 if ( obj['favorite'] === 1 && key.toString() === reciente.results[i].id.toString())
                                                                                 {
                                                                                     lsInput.stringData +=
                                                                                     '<lockup id="'+ reciente.results[i].id +'" name="catalogo">\
                                                                                         <img src="http://image.tmdb.org/t/p/w500' + reciente.results[i].poster_path +'" width="250" height="376" />\
                                                                                         <title>' + reciente.results[i].title + '</title>\
                                                                                      </lockup>';
                                                                                      break;
                                                                                 }
                                                                               } // fin for en resultados

                                                                               for (var i=0; i < porvenir.results.length; i++)
                                                                               {
                                                                                 if ( obj['favorite'] === 1 && key.toString() === porvenir.results[i].id.toString())
                                                                                 {
                                                                                     lsInput.stringData +=
                                                                                     '<lockup id="'+ porvenir.results[i].id +'" name="catalogo">\
                                                                                         <img src="http://image.tmdb.org/t/p/w500' + porvenir.results[i].poster_path +'" width="250" height="376" />\
                                                                                         <title>' + porvenir.results[i].title + '</title>\
                                                                                      </lockup>';
                                                                                      break;
                                                                                 }
                                                                               } // fin for en resultados

                                                                           } // fin for en object
                                                                         } // fin if object
                                                                         lsInput.stringData +='</section>';
                                                                         //console.log(lsInput.stringData);
                                                                         //console.log(doc.getElementsByTagName("shelf").item(2).innerHTML);
                                                                         lsParser.parseWithContext(lsInput, doc.getElementsByTagName("shelf").item(4), 2);
                                                              }});
                                                  } });
                              } });


    }
}
