// Script variables
var timelineConfig = {
	key: '0AvZh5Gsgu1WvdFo5VjB3dnBhSlVzN2hxejdsNmpHTFE',
	sheetName: 'Posts' // change to name of spreadsheet 'sheet' that contains the data
};

var Timeline = function(el, data) {
	this.$el = $(el);
	this.data = data;

	this._render();

	var self = this;

	this.$timeline.imagesLoaded(function(){
		this.isotope({
			itemSelector : '.item',
			transformsEnabled: true,
			layoutMode: 'spineAlign',
			spineAlign:{
				gutterWidth: 56
			},
			getSortData: {
				timestamp: function($elem){
					return parseFloat($elem.find('.timestamp').text());
				}
			},
			sortBy: 'timestamp',
			sortAscending: false,
			itemPositionDataEnabled: true
							});
	});

	// load scripts after all the html has been set
	$.getScript('//static.ak.fbcdn.net/connect.php/js/FB.Share');
	$.getScript('//platform.twitter.com/widgets.js');

	// add open/close buttons to each post
	this.$el.each(function(){
		$(this).find('.inner').append('<a href="#" class="open-close"></a>');
	});

	this.$el.find('.item a.open-close').click(function(e){
		$(this).siblings('.body').slideToggle(function(){
			self.$timeline.isotope('reLayout');
							});
		$(this).parents('.post').toggleClass('closed');
		self.$el.find('.expand-collapse-buttons a').removeClass('active');
		e.preventDefault();
	});

	this.$el.find('.post .share').hover(
		function(){
			$(this).find('.share-trigger').addClass('over');
			$(this).find('.share-popup').show();
		},
		function(){
			$(this).find('.share-trigger').removeClass('over');
			$(this).find('.share-popup').hide();
		}
	);

	this._setupControls();

	this._adjustLine();
	this.$el.resize($.proxy(this._adjustLine, this));
};

Timeline.prototype._render = function() {
	var self = this;

	var direction = 'newest';

	// Add a class to the passed parent el so we can style it
	this.$el.addClass('vertical-timeline');

	// Render the controls
	var controlTemplate = Handlebars.compile($('#controls-template').html());
	this.$el.append(controlTemplate());

	// Render the wrapper for timeline items
	this.$timeline = $('<div class="timeline-items"></div>');
	this.$timeline.appendTo(this.$el);

	// load the Handlebar templates into memory
	var postTemplate  = Handlebars.compile($('#post-template').html());
	var yearMarkerTemplate  = Handlebars.compile($('#year-marker-template').html());

	var years = [];
	$.each(this.data, function(i, val){
		// save the years so we can create year markers
		var year = new Date(val.timestamp).getFullYear();
		if (years.indexOf(year) < 0) {
			years[years.length] = year;
		}

		// combine data & templqate
		var html = postTemplate(val);
		self.$timeline.append(html);
	});

	// add a year marker for each year that has a post
	$.each(years, function(i, val){
		var timestamp;
		if (direction == 'newest') {
			timestamp = self._getTimestamp(val, false);
		}
		else {
			timestamp = self._getTimestamp(val, true);
		}
		var context = {year: val, timestamp: timestamp};
		var html = yearMarkerTemplate(context);
		self.$timeline.append(html);
	});

	var lineTemplate = Handlebars.compile($('#line-template').html());
	this.$el.append(lineTemplate());
};

Timeline.prototype._setupControls = function() {
	var self = this;
	var controls = this.$el.find('.controls');
	controls.find('a.expand-all').click(function(e){
		self.$el.find('.post .body').slideDown(function(){
			self.$timeline.isotope('reLayout');
							});
		self.$el.find('.post').removeClass('closed');
		self.$el.find('.expand-collapse-buttons a').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	controls.find('a.collapse-all').click(function(e){
		self.$el.find('.post .body').slideUp(function(){
			self.$timeline.isotope('reLayout');
		});
		self.$el.find('.post').addClass('closed');
		self.$el.find('.expand-collapse-buttons a').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	controls.find('.sort-buttons a').click(function(e){
							var $this = $(this);
							// don't proceed if already selected
							if ($this.hasClass('active')) {
								return false;
							}

		controls.find('.sort-buttons a').removeClass('active');
							$this.addClass('active');
							var $yearMarkers = $('.year-markers');
							if ($this.hasClass('sort-newest')){
			self._updateYearMarkers(false);
			self.$timeline.isotope('reloadItems').isotope({sortAscending: false});
							}
							else{
			self._updateYearMarkers(true);
			self.$timeline.isotope('reloadItems').isotope({sortAscending: true});
							}
							e.preventDefault();
						});
};

Timeline.prototype._adjustLine = function() {
	var $lastItem = this.$el.find('.item.last');
	var itemPosition = $lastItem.data('isotope-item-position');
	var dateHeight = $lastItem.find('.date').height();
	var dateOffset = $lastItem.find('.date').position();
	var innerMargin = parseInt($lastItem.find('.inner').css('marginTop'));
	var lineHeight = itemPosition.y + innerMargin + dateOffset.top + (dateHeight / 2);
	this.$el.find('.line').height(lineHeight);
};

/**
* Get the timestamp (milliseconds) given the year.
* If beginning is true, timestamp is 1/1/year 12:00:00:000
* If beginning is false, timestamp is 12/31/year 23:59:59:999
*/
Timeline.prototype._getTimestamp = function(year, beginning) {
	if (beginning) {
		return Date.parse('January 1, ' + year);
	}
	else {
		return Date.parse('December 31, ' + year) + 86400000 - 1 ; // plus 1 day, minus 1 millisecond
	}
};

/*
* Set the timestamp of the year markers to either the beginning or end of
* the year
*/
Timeline.prototype._updateYearMarkers = function(beginning) {
	var self = this;
	self.$el.find('.year-marker').each(function(){
		var $this = $(this);
		var year = parseInt($this.find('.year').text());
		var timestamp = self._getTimestamp(year, beginning);
		$this.find('.timestamp').text(timestamp);
	});
}


$(function() {

	/**
	 * get data via Tabletop
	 */
	Tabletop.init({
		key: timelineConfig.key,
		callback: function(data, tabletop) {
			new Timeline('#timeline', tabletop.sheets(timelineConfig.sheetName).all());
		},
		wanted: [timelineConfig.sheetName],
		postProcess: function(el){
			el['timestamp'] = Date.parse(el['date']);
			el['display_date'] = el['displaydate'];
			el['read_more_url'] = el['readmoreurl'];
			el['photo_url'] = el['photourl'];
		}
					});

				});



				/*
				* Isotope custom layout mode spineAlign
				*/

				$.Isotope.prototype._spineAlignReset = function() {
					this.spineAlign = {
						colA: 0,
						colB: 0,
						lastY: -60
					};
				};
				$.Isotope.prototype._spineAlignLayout = function( $elems ) {
					var instance = this,
					props = this.spineAlign,
					gutterWidth = Math.round( this.options.spineAlign && this.options.spineAlign.gutterWidth ) || 0,
					centerX = Math.round(this.element.width() / 2);

					$elems.each(function(i, val){
						var $this = $(this);
						$this.removeClass('last').removeClass('top');
						if (i == $elems.length - 1)
							$this.addClass('last');
							var x, y;
							if ($this.hasClass('year-marker')){
								var width = $this.width();
								x = centerX - (width / 2);
								if (props.colA >= props.colB){
									y = props.colA;
									if (y == 0) $this.addClass('top');
									props.colA += $this.outerHeight(true);
									props.colB = props.colA;
								}
								else{
									y = props.colB;
									if (y == 0) $this.addClass('top');
									props.colB += $this.outerHeight(true);
									props.colA = props.colB;
								}
							}
							else{
								$this.removeClass('left').removeClass('right');
								var isColA = props.colB >= props.colA;
								if (isColA)
									$this.addClass('left');
									else
										$this.addClass('right');
										x = isColA ?
										centerX - ( $this.outerWidth(true) + gutterWidth / 2 ) : // left side
										centerX + (gutterWidth / 2); // right side
										y = isColA ? props.colA : props.colB;
										if (y - props.lastY <= 60){
											var extraSpacing = 60 - Math.abs(y - props.lastY);
											$this.find('.inner').css('marginTop', extraSpacing);
											props.lastY = y + extraSpacing;
										}
										else{
											$this.find('.inner').css('marginTop', 0);
											props.lastY = y;
										}
										props[( isColA ? 'colA' : 'colB' )] += $this.outerHeight(true);
									}
									instance._pushPosition( $this, x, y );
								});
							};
							$.Isotope.prototype._spineAlignGetContainerSize = function() {
								var size = {};
								size.height = this.spineAlign[( this.spineAlign.colB > this.spineAlign.colA ? 'colB' : 'colA' )];
								return size;
							};
							$.Isotope.prototype._spineAlignResizeChanged = function() {
								return true;
							};
