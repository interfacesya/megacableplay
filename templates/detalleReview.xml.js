
var Template = function(data) {

var regex =/\&/;
var title = data.title;
title = title.replace(regex," y ");

var over =data.overview;
over = over.replace(regex," y ");

return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
<head>
  <style>
  .whiteText {
    color: rgb(255,255,255);
  }
  </style>
</head>
  <alertTemplate>
    <title class="whiteText">`+ title+`</title>
    <description class="whiteText">`+ over +`</description>
  </alertTemplate>
</document>`
};
