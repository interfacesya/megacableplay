
var Template = function(data) {
return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <alertTemplate>
    <title>`+data.title+`</title>
    <description>`+ data.overview +`</description>
  </alertTemplate>
</document>`
};
