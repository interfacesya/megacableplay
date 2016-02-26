
var Template = function(data) {
return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <alertTemplate>
    <title></title>
    <description>`+ data +`</description>
    <button>
      <text>OK</text>
    </button>
    <button>
      <text>CANCEL</text>
    </button>
  </alertTemplate>
</document>`
};
