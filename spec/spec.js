describe('Using ID', function() {

	beforeEach(function() {
	    $('body').append('<div id="mory">Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. Morpheus awakens Neo to the real world, a ravaged wasteland where most of humanity have been captured by a race of machines that live off of the humans body heat and electrochemical energy and who imprison their minds within an artificial reality known as the Matrix. As a rebel against the machines, Neo must return to the Matrix and confront the agents: super-powerful computer programs devoted to snuffing out Neo and the entire human rebellion.</div>');
	});

	afterEach(function() {
		$('#mory').remove();
	});

	it ('should chainable', function() {
		// given
		var $mory		= $('#mory'),
			className	= 'my-class';

		// when
		$mory.mory().addClass(className);

		// then
	    expect($mory).toHaveClass(className);
	});

	it ('element should create all elements', function() {
		// given
		var $mory = $('#mory');

		// when
		$mory.mory();

		// then
	    expect($mory.children('.mory-resume')).toExist();
	    expect($mory.children('.mory-content')).toExist();
	    expect($mory.children('.mory-content')).toBeHidden();
	    expect($mory.children('.mory-reticence')).toExist();
	    expect($mory.children('.mory-reticence')).toHaveHtml('...&nbsp;');

	    var $more	= $mory.children('.mory-more'),
	    	$link	= $more.children('.mory-link');

	    expect($more).toExist();
	    expect($link).toExist();
	    expect($link).toHaveAttr('href', 'javascript:void(0);');
	    expect($link).toHaveAttr('title', 'read more');
	    expect($link).toHaveHtml('read more');
	});

	it ('number should cut the right length', function() {
		// given
		var $mory = $('#mory');

		// when
		$mory.mory();

		// then
	    expect($mory.children('.mory-resume').html().length).toEqual(140);
	});

	it ('number should cut the right length with custom value', function() {
		// given
		var $mory = $('#mory');

		// when
		$mory.mory({ number: 200 });

		// then
	    expect($mory.children('.mory-resume').html().length).toEqual(200);
	});

	it ('content should expand', function() {
		// given
		var $mory = $('#mory');

		// when
		$mory.mory().children('.mory-more').children('a').click();

		// then
		expect($mory.children('.mory-resume')).not.toBeHidden();
	    expect($mory.children('.mory-content')).not.toBeHidden();
	    expect($mory.children('.mory-reticence')).not.toBeHidden();
	    expect($mory.children('.mory-reticence')).toHaveHtml('&nbsp;');

	    var $more	= $mory.children('.mory-more'),
	    	$link	= $more.children('.mory-link');
	
	    expect($link).toHaveAttr('title', 'read less');
	    expect($link).toHaveHtml('read less');
	});

	it ('content should expand and collapse', function() {
		// given
		var $mory = $('#mory');

		// when
		$mory.mory().children('.mory-more').children('a').click().click();

		// then
		expect($mory.children('.mory-resume')).not.toBeHidden();
	    expect($mory.children('.mory-content')).toBeHidden();
	    expect($mory.children('.mory-reticence')).not.toBeHidden();

	    var $more	= $mory.children('.mory-more'),
	    	$link	= $more.children('.mory-link');
	
	    expect($link).toHaveAttr('title', 'read more');
	    expect($link).toHaveHtml('read more');
	});

	it ('reticence should change it', function() {
		// given
		var $mory = $('#mory');

		// when
		$mory.mory({ reticence: '[..]' });

		// then
	    expect($mory.children('.mory-reticence')).toHaveHtml('[..]');
	});

	it ('reticence should remove it', function() {
		// given
		var $mory = $('#mory');

		// when
		$mory.mory({ reticence: '' });

		// then
	    expect($mory.children('.mory-reticence')).toHaveHtml('&nbsp;');
	});

	it ('should not apply readmore when has no lenght for it', function() {
		// given
		var $mory = $('#mory');

		$mory.html($mory.html().substring(0, 140));

		// when
		$mory.mory();

		// then
		expect($mory.children('.mory-resume')).not.toExist();
	    expect($mory.children('.mory-content')).not.toExist();
	    expect($mory.children('.mory-reticence')).not.toExist();
	});

	it ('number should split the right length', function() {
		// given
		var $mory		= $('#mory'),
			expected	= 'Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always';

		// when
		$mory.mory();

		// then
		expect($mory.children('.mory-resume').html()).toEqual(expected);
	});

	it ('should close open tag on resume', function() {
		// given
		var $mory = $('#mory').html('<b>Hello World!</b>');

		// when
		$mory.mory({ number: 5 });

		// then
		expect($mory.children('.mory-resume').html()).toEqual('<b>Hello</b>');
	});

});
