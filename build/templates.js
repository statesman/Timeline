this["JST"] = this["JST"] || {};

this["JST"]["controls"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"controls\">\r\n  <div class=\"expand-collapse-buttons\">\r\n    <a class=\"expand-all active\" href=\"#\"><span>EXPAND ALL</span></a>\r\n    <a class=\"collapse-all\" href=\"#\"><span>COLLAPSE ALL</span></a>\r\n  </div>\r\n  <div class=\"sort-buttons\">\r\n    <a class=\"sort-newest active\" href=\"#\"><span>NEWEST FIRST</span></a>\r\n    <a class=\"sort-oldest\" href=\"#\"><span>OLDEST FIRST</span></a>\r\n  </div>\r\n</div>\r\n";
  },"useData":true});



this["JST"]["post"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <img src=\""
    + escapeExpression(((helper = (helper = helpers.photo_url || (depth0 != null ? depth0.photo_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"photo_url","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <div class=\"caption\">("
    + escapeExpression(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"caption","hash":{},"data":data}) : helper)))
    + ")</div>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <div class=\"text\">"
    + escapeExpression(((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"body","hash":{},"data":data}) : helper)))
    + "</div>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <a target=\"_blank\" class=\"more\" href=\""
    + escapeExpression(((helper = (helper = helpers.read_more_url || (depth0 != null ? depth0.read_more_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"read_more_url","hash":{},"data":data}) : helper)))
    + "\">READ MORE</a>\r\n        <div class=\"share\">\r\n          <a href=\"#\" class=\"share-trigger\"></a>\r\n          <div class=\"share-popup\">\r\n            Share:\r\n            <a href=\""
    + escapeExpression(((helpers.fbUrl || (depth0 && depth0.fbUrl) || helperMissing).call(depth0, (depth0 != null ? depth0.read_more_url : depth0), {"name":"fbUrl","hash":{},"data":data})))
    + "\" target=\"_blank\" class=\"share-button facebook-share-button\"><i class=\"fa fa-facebook-square\"></i></a>\r\n            <a href=\""
    + escapeExpression(((helpers.twUrl || (depth0 && depth0.twUrl) || helperMissing).call(depth0, (depth0 != null ? depth0.read_more_url : depth0), {"name":"twUrl","hash":{},"data":data})))
    + "\" target=\"_blank\" class=\"share-button twitter-share-button\"><i class=\"fa fa-twitter\"></i></a>\r\n            <a href=\""
    + escapeExpression(((helpers.gpUrl || (depth0 && depth0.gpUrl) || helperMissing).call(depth0, (depth0 != null ? depth0.read_more_url : depth0), {"name":"gpUrl","hash":{},"data":data})))
    + "\" target=\"_blank\" class=\"share-button gplus-share-button\"><i class=\"fa fa-google-plus\"></i></a>\r\n          </div>\r\n        </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"item post\">\r\n  <div class=\"inner\">\r\n    <div class=\"timestamp\">"
    + escapeExpression(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"timestamp","hash":{},"data":data}) : helper)))
    + "</div>\r\n    <div class=\"title\"><h3>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h3></div>\r\n    <div class=\"date\">"
    + escapeExpression(((helper = (helper = helpers.display_date || (depth0 != null ? depth0.display_date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"display_date","hash":{},"data":data}) : helper)))
    + "</div>\r\n    <div class=\"body\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.photo_url : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.caption : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.body : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <div class=\"clearfix\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.read_more_url : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </div>\r\n    </div>\r\n    <a href=\"#\" class=\"open-close\"></a>\r\n  </div>\r\n</div>\r\n";
},"useData":true});



this["JST"]["year"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"item year-marker\">\r\n  <div class=\"inner\">\r\n    <div class=\"inner2\">\r\n      <div class=\"timestamp\">"
    + escapeExpression(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"timestamp","hash":{},"data":data}) : helper)))
    + "</div>\r\n      <div class=\"year\">"
    + escapeExpression(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"year","hash":{},"data":data}) : helper)))
    + "</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n";
},"useData":true});