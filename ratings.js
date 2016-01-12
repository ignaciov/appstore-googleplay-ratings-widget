if ( !Date.now ) {
    Date.now = function() { return new Date().getTime(); }
}

(function ( $ ) {

	function createLink( type, appId ) {
		if (type == 'appstore') {
			return 'https://itunes.apple.com/ar/app/idoctus/id' + appId;
		} else {
			return 'https://play.google.com/store/apps/details?id=' + appId;
		}
	}

	function renderRatingContainer( type, appId ) {
		var link = createLink(type, appId);
		var logoUrl = type == 'appstore' ? 'img/logo-appstore.png' : 'img/logo-google-play.png';

		var html = '<div class="store" id="' + type + '">';
		html += '<a href="' + link + '" target="_blank"><img src="' + logoUrl + '"></a>';
		html += '<div class="rating">';
		html += '</div>';
		html += '</div>';

		return html;	
	}

	function renderRatingWidget( data ) {
		if ( data.stars === undefined || data.count === undefined ) {
			return '';
		}

		var html = '<ul class="stars clearfix">';

		for ( i = 0; i < 5; i++ ) {
			var starClass = i >= data.stars ? 'off' : 'on';
			html += '<li class="' + starClass + '"></li>';
		}

		html += '</ul>';
		html += '<p>Based on ' + data.count + ' rating</p>';

		return html;
	}

	function renderWidgetApple() {

	}
 
    $.fn.ratings = function( options ) {
    	var settings = $.extend({
            cache: true,
        }, options );

		var idApple = settings.idApple;
		var idAndroid = settings.idAndroid;
		var mattersApiToken = settings.mattersApiToken;
		var containerId = '#' + this.attr( 'id' );

		this.addClass( 'ratings-container' );
		var html = '';

		if ( !( settings.idApple === undefined )) {
			var htmlRatingContainer = renderRatingContainer( 'appstore', idApple );

			this.append( htmlRatingContainer );

			var localStorageKey = 'appstore_data_app_' + idApple;
			var data = localStorage.getItem(localStorageKey);

			if ( settings.cache == true && data != null ) {
				var jsonData = JSON.parse( data );	
				var htmlStars = renderRatingWidget( jsonData );

				$(containerId + " #appstore .rating").html( htmlStars );
			} else {

				$.ajax({
				   type: 'GET',
					url: 'https://itunes.apple.com/lookup?id=' + idApple + '&country=es',
					async: true,
					contentType: "application/json",
					dataType: 'jsonp',
					success: function(result) {

						if ( result.results.length > 0) {
							var item = result.results[0];
							
							var data = {
								stars 		: item.averageUserRating,
								count 		: item.userRatingCount,
								timestamp	: Date.now() 
							};

							localStorage.setItem(localStorageKey, JSON.stringify(data));

							var htmlStars = renderRatingWidget(data);
							$(containerId + " #appstore .rating").html(htmlStars);
						}
					}
				});	
			}
		}

		if ( !( settings.idAndroid === undefined ) && !( settings.mattersApiToken === undefined )) {
			var htmlRatingContainer = renderRatingContainer( 'googleplay',idAndroid );
			this.append( htmlRatingContainer );

			var localStorageKey = 'googleplay_data_app_' + idApple;
			var data = localStorage.getItem(localStorageKey);

			if ( settings.cache == true && data != null ) {
				var jsonData = JSON.parse( data );	
				var htmlStars = renderRatingWidget( jsonData );

				$(containerId + " #googleplay .rating").html( htmlStars );
			} else {

				$.ajax({
				   type: 'GET',
					url: 'https://42matters.com/api/1/apps/lookup.json?access_token=' + mattersApiToken + '&p=' + idAndroid + '&callback=jsonCallback',
					async: true,
					contentType: "application/json;charset=ISO-8859-15",
					dataType: 'jsonp',
					success: function( result ) {
						var data = {
							stars: result.rating,
							count: result.number_ratings,
							timestamp: Date.now()
						};

						localStorage.setItem( localStorageKey, JSON.stringify( data ));

						var htmlStars = renderRatingWidget(data);
						$( containerId + " #googleplay .rating" ).html( htmlStars );
					}
				});
			}
		}

        return this;
    };
 
}( jQuery ));