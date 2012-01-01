/*
	January 1, 2012
	Originally written by Max Vilimpoc, this file is released to the public domain.
	All copyright rights are hereby disclaimed.

	This is a simple client-side Javascript function that shows what 
	SOPA and PROTECT-IP will make the Internet look like.

	http://en.wikipedia.org/wiki/SOPA
	http://en.wikipedia.org/wiki/PROTECT_IP_Act

	Send a letter to your Congressman or Senator:
	https://action.eff.org/o/9042/p/dia/action/public/?action_KEY=8173

	Requirements to use this:

	Zepto or jQuery, loaded before this script.

	Styling information for users:

	div.blackoutOverlay { background-color: #000; color: #fff; z-index: 1000; opacity: 1; }

	  Mutable: background-color, color, z-index, opacity
	Immutable: position, overflow

	div.blackoutOverlay a { color: red; }

	  Mutable: all CSS properties (though you probably don't want to mess with anything other
	           than the color and pseudo-classes)
	
	Exempting certain DIVs from being blacked out:

	Make sure they have the CSS class "blackoutExempt" set.
 */

 var TRANSLATIONS = {
	"en": { "warnText": "" +
		'"We\'re sorry, but this content is not available in your area, because it may or may not contain infringing content."' +
		"<br/><br/>" +
		'If the <a href="http://en.wikipedia.org/wiki/SOPA">SOPA</a> and <a href="http://en.wikipedia.org/wiki/PROTECT_IP_Act">PROTECT-IP</a> bills are passed, this is what the Internet will look like <em>everywhere</em>.' +
		"<br/><br/>" +
		"Help stop these bad bills from becoming law:" +
		"<br/>" +
		'<a href="https://action.eff.org/o/9042/p/dia/action/public/?action_KEY=8173">Contact your Congressman or Senator today.</a>' +
		"<br/><br/>" +
		'Click anywhere in this blocked box to show what was "censored".' },
	"de": { "warnText": "" +
		'"Dieses Video ist in Deutschland leider nicht verf&uuml;gbar, da es m&ouml;glicherweise Musik enth&auml;lt, f&uuml;r die die erforderlichen Musikrechte von der GEMA nicht einger&auml;umt wurden."' +
		"<br/><br/>" +
		'Die Internet könnte &uuml;berall so aussehen wie blockierte Youtube Videos, wenn die US-Amerikanische Gesetzentw&uuml;rfe <a href="http://en.wikipedia.org/wiki/SOPA">SOPA</a> und <a href="http://en.wikipedia.org/wiki/PROTECT_IP_Act">PROTECT-IP</a> gebilligt w&auml;ren.' +
		"<br/><br/>" +
		'<a href="https://action.eff.org/o/9042/p/dia/action/public/?action_KEY=8173">Contact a Congressman or Senator today.</a>' +
		"<br/><br/>" +
		'Einfach klicken um "Zensierte" Inh&auml;lte zu zeigen.' }
};

/**
	This function will create blackout overlays across a random selection of DIVs on the
	page. It can be run multiple times, with varying levels of specificity.

	Go ahead, black it out, you know you want to.

	@param parameters  It's an object hash with the parameter keys below.

	@param selectors   Can be a string, which is any valid jQuery or Zepto selector.

	                   Default: 'div'

	@param percentage  Value between 0 and 100 representing the percentage of selectors
	                   that should be blacked out.

	                   Default: 100

	@param language    What language do you want to show? Options are in the TRANSLATIONS
	                   object above.

	                   Default: 'en'
 */
var simulateBlackout = function(parameters) {
	var selectors;
	var percentage;
	var language;

	if (!parameters || !parameters["selectors"])  selectors  = 'div'; else selectors  = parameters["selectors"];
	if (!parameters || !parameters["percentage"]) percentage = 100;   else percentage = parameters["percentage"];
	if (!parameters || !parameters["language"])   language   = 'en';  else language   = parameters["language"];

	// Used as a counter to determine when to blackout an element.
	var shouldBlock = 0;

	$(selectors).each(function(index, element) {
		// Determine whether this element is exempt.
		if ($(element).hasClass('blackoutExempt')) return;

		// Determine whether to blackout this one.
		shouldBlock += percentage;

		// Do nothing if we haven't reached 100%.
		if (100 > shouldBlock) return;
		else shouldBlock -= 100;

		// Go to each element, overlay it with a black DIV and the warning text.
		var div = $('<div/>').addClass('blackoutOverlay');

		// Set default CSS properties.
		div.css('position', 'relative');
		div.css('overflow', 'hidden');

		// Create warning text block from TRANSLATIONS table.
		var p   = $('<p/>').html(TRANSLATIONS[language]["warnText"]);
		p.css('margin', '15px');
		p.width($(element).width() - 30);
		p.height($(element).height() - 30);
		div.append(p);

		// Match overlay to underlay dimensions.
		div.width($(element).outerWidth());
		div.height($(element).outerHeight());

		// Render it.
		$(element).append(div);

		// Calculate offsets to align overlay with underlay.
		var elementOffset = $(element).offset();
		var divOffset     = div.offset();

		// Move overlay.
		div.css('top',  '' + (elementOffset.top  - divOffset.top)  + 'px');
		div.css('left', '' + (elementOffset.left - divOffset.left) + 'px');

		// Attach click handler to it.
		div.click(function() {
			$(this).hide();
		})
	});
};
