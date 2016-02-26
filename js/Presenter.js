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


    defaultPresenter: function(xml) {

        if(this.loadingIndicatorVisible) {
            navigationDocument.replaceDocument(xml, this.loadingIndicator);
            this.loadingIndicatorVisible = false;
        } else {
            navigationDocument.pushDocument(xml);
        }
    },
    
    searchPresenter: function(xml) {

        this.defaultPresenter.call(this, xml);
        var doc = xml;

        var searchField = doc.getElementsByTagName("searchField").item(0);
        var keyboard = searchField.getFeature("Keyboard");

        keyboard.onTextChange = function() {
            var searchText = keyboard.text;
            console.log('search text changed: ' + searchText);
            buildResults(doc, searchText);
        }
    },    
    
    modalDialogPresenter: function(xml) {
        navigationDocument.presentModal(xml);
    },

    menuBarItemPresenter: function(xml, ele) {
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
        navigationDocumento.replaceDocument (xmlNew,xmlOld);
    },
    cargaTemplate:function(template,datos)
    {
        var baseURL= "http://localhost:8000/templates/"
        
        resourceLoader = new ResourceLoader(baseURL);
		resourceLoader.loadResource(baseURL + template,function(resource)
        {
            var doc = Presenter.makeDocument(resource);
            doc.addEventListener("select",Presenter.load.bind(Presenter));
            Presenter.pushDocument(doc);
            return doc;
        },datos);
    },
    load: function(event)
    {
        
        var self = this,
            ele          = event.target,
            templateURL  = ele.getAttribute("template"),
            presentation = ele.getAttribute("presentation"),
            template    =  ele.getAttribute("name"),
            nodo        =  ele.getAttribute("id"),
            videoURL    =  ele.getAttribute("videoURL");

        var baseURL= "http://localhost:8000/templates/";
        /*
        Check if the selected element has a 'template' attribute. If it does then we begin
        the process to present the template to the user.
        */
        if (templateURL) {
            //self.showLoadingIndicator(presentation);
            if (event.type == "select" && (templateURL== baseURL + "detalleReview.xml.js") && !isNaN(nodo)) {
                var urlFind = 'http://api.themoviedb.org/3/movie/'+nodo+'?api_key=ff743742b3b6c89feb59dfc138b4c12f';
                Presenter.jsonRequest({ url: urlFind,
                    callback: function(err, data) {
                    Presenter.cargaTemplate("detalleReview.xml.js",data) }
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
            if(event.type == "select" && template == "template1")
            {
                Presenter.cargaDetalle(nodo)
            }
            if (event.type == "select" && template == "Info" && !isNaN(nodo))
            {
                
                var urlFind = 'http://api.themoviedb.org/3/movie/'+nodo+'?api_key=ff743742b3b6c89feb59dfc138b4c12f';
                Presenter.jsonRequest({ url: urlFind,
                    callback: function(err, data) {
                    Presenter.cargaTemplate("Rating.xml.js",data)}
                });
                
            }
            if (event.type == "select" && template == "Info" && nodo =="urlPlay")
            {
                Presenter.reproduce("http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8");
            }
        }
    },
    showLoadingIndicator: function(presentation) {
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
            Presenter.cargaCatalogo();
        }
    },
    cargaCatalogo:function()
    {
        var urlPopular = 'http://api.themoviedb.org/3/movie/popular?api_key=ff743742b3b6c89feb59dfc138b4c12f';
        Presenter.jsonRequest({ url: urlPopular,
                                    callback: function(err, catalogo) {
                                    //console.log(data);
                                    Presenter.cargaTemplate("template1.xml.js",catalogo) } });
        
    },
    cargaDetalle: function (indice)
    {
        var urlFind = 'http://api.themoviedb.org/3/movie/'+indice+'?api_key=ff743742b3b6c89feb59dfc138b4c12f';
        var info;
            Presenter.jsonRequest({ url: urlFind,
                    callback: function(err, data) {
                    //console.log(data);
                    Presenter.cargaTemplate("template2.xml.js",data) }
            });
                
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
    }

    
}
