(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("createPost")), "\n		", Spacebars.include(view.lookupTemplate("posts")) ];
}));

Template.__checkName("createPost");
Template["createPost"] = new Template("Template.createPost", (function() {
  var view = this;
  return HTML.DIV({
    style: "width: 400px; border: 2px solid #ccc; padding: 20px"
  }, HTML.Raw("\n		<h3>Neuen post erstellen:</h3>\n		"), HTML.FORM({
    role: "form"
  }, "\n			", HTML.Raw('<input id="titel" class="form-control" type="text" placeholder="titel">'), HTML.Raw("<br>"), "\n			", HTML.Raw('<input id="text" class="form-control" type="text" placeholder="text">'), HTML.Raw("<br>"), "\n			", HTML.Raw('<input id="bild" class="form-control" type="text" placeholder="Bild URL">'), HTML.Raw("<br>"), "\n			\n			", HTML.Raw('<div class="checkbox">\n				<label>\n					<input id="istAngebot" type="checkbox"> Ist Angebot\n				</label>\n			</div>'), "\n\n\n			", HTML.Raw("<h4>Tags:</h4>"), "\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("possibleTags"));
  }, function() {
    return [ "\n				", HTML.DIV({
      "class": "checkbox"
    }, "\n					", HTML.LABEL(" ", HTML.INPUT({
      "class": "tag",
      id: function() {
        return Spacebars.mustache(view.lookup("tag"));
      },
      type: "checkbox"
    }), " ", Blaze.View("lookup:tag", function() {
      return Spacebars.mustache(view.lookup("tag"));
    }), " "), "\n				"), "\n			" ];
  }), "\n			", HTML.Raw('<input id="submitButton" class="btn btn-success" type="button" value="Submit Post">'), HTML.Raw("<br>"), "\n		"), "\n	");
}));

Template.__checkName("posts");
Template["posts"] = new Template("Template.posts", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("posts"));
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "post",
      style: "border: 2px solid #ccc; margin-top: 10px; padding: 10px"
    }, "\n		", Spacebars.include(view.lookupTemplate("post")), "\n		"), "\n	" ];
  });
}));

Template.__checkName("post");
Template["post"] = new Template("Template.post", (function() {
  var view = this;
  return [ HTML.H3(Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n	", HTML.P(Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n	", HTML.IMG({
    src: function() {
      return [ Spacebars.mustache(view.lookup("bild")), "}" ];
    },
    width: "400"
  }), "\n	", HTML.P({
    style: "color: grey"
  }, " - erstellt von ", Blaze.View("lookup:userName", function() {
    return Spacebars.mustache(view.lookup("userName"));
  })), "\n	", HTML.P("tags: ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("tags"));
  }, function() {
    return [ " ", Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    }), " " ];
  })) ];
}));

})();
