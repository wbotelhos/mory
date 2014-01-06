/*!
 * jQuery Mory - A Read More Plugin - http://wbotelhos.com/mory
 * ------------------------------------------------------------------------
 *
 * jQuery Mory is a plugin to resume texts along with a read more link.
 *
 * Licensed under The MIT License
 *
 * @version        0.1.0
 * @since          2012.01.07
 * @author         Washington Botelho
 * @documentation  http://wbotelhos.com/mory
 * @twitter        http://twitter.com/wbotelhos
 *
 * Usage with default values:
 * ------------------------------------------------------------------------
 * $('#text').mory();
 *
 * <div id="text"></div>
 *
 */

;(function($) {

	var methods = {
		init: function(options) {
			return this.each(function() {

				var self	= this,
					$this	= $(self),
					text	= $.trim($this.html());

				self.opt = $.extend({}, $.fn.mory.defaults, options);

				if ($this.data('mory') || text.length <= self.opt.size) {
					return;
				}

				$this.data('mory', true);

				var size	= methods.getLength.call(this, text),
					resume	= text.slice(0, size);

				text = text.slice(size); 

				self.resume	= $('<span />', { 'class': 'mory-resume', html: resume });
				self.content = $('<span />', { 'class': 'mory-content', html: text }).hide();
				self.reticence = $('<span />', { 'class': 'mory-reticence' });
				self.link = $('<a />', { 'class': 'mory-link', href: 'javascript:void(0);', title: self.opt.expandText, html: self.opt.expandText });
				self.moreLess = $('<span />', { 'class': 'mory-more' }).append(self.link).wrap('<span/>');

				if (self.opt.reticence) {
					self.reticence.html(self.opt.reticence.replace(' ', '&#160;'));
				} else {
					self.reticence.html('&#160;');
				}

				$this.html(self.resume).append(self.content, self.reticence, self.moreLess);

				methods.bindAction.call(this);
			});
		}, bindAction: function() {
			var self = this;

			self.link.toggle(function() {
				$(this).html(self.opt.collapseText).attr('title', self.opt.collapseText);

				if (self.opt.expandEffect == 'fadein') {
					self.content
					.css({ display: 'inline', opacity: 0 })
					.animate({ opacity: 100 }, {
						duration	: self.opt.expandSpeed,
						queue		: false
					});
				} else {
					self.content.css({ 'display': 'inline', 'opacity': 100 });
				}

				self.reticence.html('&#160;');
			}, function() {
				$(this).html(self.opt.expandText).attr('title', self.opt.expandText);

				if (self.opt.collapseEffect == 'fadeout') {
					self.content.animate({ opacity: 0 }, {
						duration	: self.opt.collapseSpeed,
						queue		: false,
						complete	: function() {
							$(this).hide();
							self.resume.css('display', 'inline');
							self.reticence.html(self.opt.reticence);
						}
					});
				} else {
					self.content.hide();
					self.reticence.html(self.opt.reticence);
				}

			});
		}, getLength: function(text) {
			var open	= text.match(this.opt.openTag),
				close	= text.match(this.opt.closeTag),
				single	= text.match(this.opt.singleTag);

			var sum = (open && open.join('').length || 0) + (close && close.join('').length || 0) + (single && single.join('').length || 0);

			return this.opt.size + sum; 
		}, set: function(options) {
			return this.each(function() {
				this.opt = $.extend({}, $.fn.chrony.defaults, $(this).data('options'), options);
			});
		}
	};

	$.fn.mory = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist!');
		} 
	};

	$.fn.mory.defaults = {
		collapseEffect	: undefined,
		collapseSpeed	: 150,
		collapseText	: 'read less',
		expandEffect	: undefined,
		expandSpeed		: 2000,
		expandText		: 'read more',
		reticence		: '... ',
		size			: 140,
		openTag			: /(<)([a-zA-Z]+)([^>]*)(>)/g,
		closeTag		: /<(\/)([a-zA-Z])>/g,
		singleTag		: /(<)([a-zA-Z]+)(\s*)(\/>)/g
	};

})(jQuery);
