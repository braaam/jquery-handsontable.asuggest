jquery-handsontable.asuggest
============================

[Asuggest](http://imankulov.github.io/asuggest/) plugin for [Handsontable](http://handsontable.com/).

Include in ``<head></head>``:

```html
<script src="jquery.a-tools.js"></script>
<script src="jquery.asuggest.js"></script>
<script src="jquery.handsontable.full.js"></script>
<script src="jquery.handsontable.asuggest.js"></script>
<link rel="stylesheet" href="jquery.handsontable.full.css" media="screen">
```

Usage: 

```html
<div id="example"></div>

<script>
  $("#example").handsontable({
    data: [[''], ['']],
    columns: [{
      editor: 'asuggest',
      options: {
          'endingSymbols': ', ',
          'stopSuggestionKeys': [$.asuggestKeys.RETURN],
          'minChunkSize': 1,
          'delimiters': ', '
      }, 
      source: ["head", "hello", "heart", "health", "horizontal", "horizont", "hormonotherapy"]
    }]
  });
</script>
```
