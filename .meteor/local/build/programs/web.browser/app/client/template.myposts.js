(function(){
Template.__checkName("myposts");
Template["myposts"] = new Template("Template.myposts", (function() {
  var view = this;
  return [ HTML.Raw("<h3>Meine Posts</h3>\n	"), Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  }), "\n	", Blaze.Each(function() {
    return Spacebars.call(view.lookup("posts"));
  }, function() {
    return [ "\n		", HTML.P("stuff"), "\n		", Spacebars.include(view.lookupTemplate("mypost")), "\n	" ];
  }) ];
}));

Template.__checkName("mypost");
Template["mypost"] = new Template("Template.mypost", (function() {
  var view = this;
  return HTML.Raw("<p>My post</p>");
}));

})();
