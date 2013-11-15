(function (Handsontable) {
  var AsuggestEditor = Handsontable.editors.HandsontableEditor.prototype.extend();

  AsuggestEditor.prototype.beginEditing = function () {
    Handsontable.editors.HandsontableEditor.prototype.beginEditing.apply(this, arguments);
    var that = this;

    var options = this.cellProperties.options;

    if (typeof this.cellProperties.source == 'function'){
      this.cellProperties.source(query, function(choices){
        this.$textarea.asuggest(choices, options);
      });

    } else if (Handsontable.helper.isArray(this.cellProperties.source)) {
      var choices;
      choices = this.cellProperties.source;
      this.$textarea.asuggest(choices, options);
    } else {
      return;
    }

    this.$htContainer.handsontable('updateSettings', {
      'colWidths': [this.wtDom.outerWidth(this.TEXTAREA) - 2]
    });
  };

  var onBeforeKeyDownInner;

  AsuggestEditor.prototype.open = function () {
    var parent = this;

    onBeforeKeyDownInner = function (event) {
      var instance = this;

      if (event.keyCode == Handsontable.helper.keyCode.ARROW_UP){
        if (instance.getSelected() && instance.getSelected()[0] == 0){
          instance.deselectCell();
          parent.instance.listen();
          parent.focus();
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }

    };

    this.$htContainer.handsontable('getInstance').addHook('beforeKeyDown', onBeforeKeyDownInner);
    Handsontable.editors.HandsontableEditor.prototype.open.apply(this, arguments);

    this.$textarea[0].style.visibility = 'visible';
    parent.focus();
  };

  AsuggestEditor.prototype.close = function () {
    this.$htContainer.handsontable('getInstance').removeHook('beforeKeyDown', onBeforeKeyDownInner);
    Handsontable.editors.HandsontableEditor.prototype.close.apply(this, arguments);
  };

  Handsontable.editors.AsuggestEditor = AsuggestEditor;
  Handsontable.editors.registerEditor('asuggest', AsuggestEditor);

  Handsontable.AsuggestCell = {
    editor: 'asuggest',
    renderer: Handsontable.TextRenderer
  };

  Handsontable.cellTypes.asuggest = Handsontable.AsuggestCell;
  Handsontable.cellLookup.renderer.asuggest = Handsontable.TextRenderer;
  
})(Handsontable);