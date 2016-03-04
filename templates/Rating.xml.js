var Template = function(data) { return `<?xml version="1.0" encoding="UTF-8"?>
<document>
	<ratingTemplate class="template">
	    <title id="`+data.id +`">`+ data.title +`</title>
	    <ratingBadge value="" name="rating"></ratingBadge>
	</ratingTemplate>
</document>`
}
