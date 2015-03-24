(function(){
Template.__checkName("detailView");
Template["detailView"] = new Template("Template.detailView", (function() {
  var view = this;
  return [ HTML.H3(Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n	", HTML.P(Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n	Kategorie: ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("tags"));
  }, function() {
    return [ " ", Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    }), " " ];
  }), "\n	", HTML.P({
    style: "color: grey"
  }, " - erstellt von ", Blaze.View("lookup:userEmail", function() {
    return Spacebars.mustache(view.lookup("userEmail"));
  })), HTML.Raw('\n\n	<button id="interesseButton" class="btn btn-success"> Interesse Melden </button>\n\n	<h3>Fragen &amp; Antworten:</h3>\n	'), Blaze.Each(function() {
    return Spacebars.call(view.lookup("discussion"));
  }, function() {
    return [ "\n\n		", Blaze.If(function() {
      return Spacebars.call(view.lookup("published"));
    }, function() {
      return [ "\n			", HTML.DIV({
        "class": "panel panel-success"
      }, "\n				", HTML.DIV({
        "class": "panel-heading"
      }, "Frage: ", Blaze.View("lookup:question", function() {
        return Spacebars.mustache(view.lookup("question"));
      })), "\n				", HTML.DIV({
        "class": "panel-body"
      }, "\n					", HTML.P(Blaze.View("lookup:answer", function() {
        return Spacebars.mustache(view.lookup("answer"));
      })), "\n				"), "\n			"), "\n		" ];
    }), "\n	" ];
  }), "\n	", Spacebars.include(view.lookupTemplate("createPostQuestion")) ];
}));

Template.__checkName("createPostQuestion");
Template["createPostQuestion"] = new Template("Template.createPostQuestion", (function() {
  var view = this;
  return HTML.Raw('<div style="width: 400px; border: 2px solid #ccc; padding: 20px">\n		<h3>Etwas fragen zum Post:</h3>\n		<form role="form">\n			<input id="text" class="form-control" type="text" placeholder="text"><br>\n			<input id="submitButton" class="btn btn-success" type="submit" value="Frage stellen"><br>\n		</form>\n	</div>');
}));

})();
