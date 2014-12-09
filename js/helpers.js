Handlebars.registerHelper('fbUrl', function(url) {
  return 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(url);
});

Handlebars.registerHelper('twUrl', function(url) {
  return 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url);
});

Handlebars.registerHelper('gpUrl', function(url) {
  return 'https://plus.google.com/share?url=' + encodeURIComponent(url);
});
