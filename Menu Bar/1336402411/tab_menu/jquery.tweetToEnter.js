(function($){
	
	//Set window var
	var tweet_window = null;
	
	//Create Tweet To Enter Function
	$.fn.tweetToEnter = function(options,callback){

		// Default parameters:
		var defaults = {
			url : 				window.location.href,
			related :			'paulund_',
			via :				'paulund_',
			button_text :	 	'Download'
		};
		
		//Class to add to button
		var download_class = 'tweet_to_enter';
		
		// Default parameters of the tweet popup:
		options = $.extend(defaults, options);
				
		return this.click(function(e){

			//Add pay to download class to the button
			$(this).addClass(download_class);
			
			if(tweet_window){
				// If a popup window is already shown,
				// do nothing;
				e.preventDefault();
				return;
			}
			
			var width	= 550,
				height	= 350,
				top		= (window.screen.height - height)/2,
				left	= (window.screen.width - width)/2; 
			
			var window_options = [
				'scrollbars=yes','resizable=yes','toolbar=no','location=yes',
				'width='+width,'height='+height,'left='+left, 'top='+top
			].join(',');
	
			// Opening a popup window pointing to the twitter intent API:
			tweet_window = window.open('http://twitter.com/intent/tweet?'+$.param(options),
						'TweetToEnter - www.paulund.co.uk',window_options);
			
			// Checking whether the window is closed every 100 milliseconds.
			(function checkWindow(){
				
				try{
					// Opera raises a security exception, so we
					// need to put this code in a try/catch:
					
					if(!tweet_window || tweet_window.closed){
						throw "window_closed";
					}
					else {
						setTimeout(checkWindow,100);
					}
				}
				catch(e){
					// Executing the callback, passed
					// as an argument to the plugin.
					
					tweet_window = null;
					change_button();
				}
				
			})();
			
			e.preventDefault();
		});

		function change_button(){
			$('.' + download_class).addClass('active')
				.text(options.button_text)
				.attr('href',options.button_url)
				.removeClass(download_class)
				.unbind('click');
		}
		
	};
	
})(jQuery);
