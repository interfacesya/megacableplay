var Template = function(data) { return `<?xml version="1.0" encoding="UTF-8"?>
<document>
	<ratingTemplate>
	    <title id="`+data.id +`" name="rating">`+ data.title +`</title>
	    <ratingBadge value="0.6"></ratingBadge>
	</ratingTemplate>
</document>`
}
