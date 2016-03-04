
var Template = function (data) {
var totBloque1 =0, totBloque2=0, bloque1 = "", bloque2="";

    totBloque1 = data.results.length
    for (var i=0; i < data.results.length; i++)
    {
        bloque1  = bloque1 +
                '<lockup id="'+ data.results[i].id +'" name="catalogo">\
                    <img src="http://image.tmdb.org/t/p/w500' + data.results[i].poster_path +'" width="250" height="376" />\
                    <title>' + data.results[i].title + '</title>\
                 </lockup>';
    }
    return `<?xml version="1.0" encoding="UTF-8" ?>
            <document>
                <catalogTemplate theme='light'>
                   <banner>
                      <title font-size='38'>Movies</title>
                   </banner>
                   <list>
                      <section>
                         <listItemLockup>
                            <title font-size='12'>Populares</title>
                            <decorationLabel>`+ totBloque1 +`</decorationLabel>
                            <relatedContent>
                               <grid>
                                  <section> ` + bloque1 +
                                 `</section>
                               </grid>
                            </relatedContent>
                         </listItemLockup>
                         <listItemLockup>
                            <title font-size='12'>Mejor Calificadas</title>
                            <decorationLabel>`+ totBloque2 +`</decorationLabel>
                            <relatedContent>
                               <grid>
                                  <section> ` + bloque2 + `
                                  </section>
                               </grid>
                            </relatedContent>
                         </listItemLockup>
                      </section>
                   </list>
                </catalogTemplate>
             </document>`
}
