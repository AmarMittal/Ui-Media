
$(document).ready(function() {
    var speed = 5000;
    var run = setInterval('rotate()', speed);   
    var item_width = $('.sildes li').outerWidth(); 
    var left_value = item_width * (-1); 
    $('.sildes li:first').before($('.sildes li:last'));
    $('.sildes ul').css({'left' : left_value});   
    $('.prev').click(function() {    
        var left_indent = parseInt($('.sildes ul').css('left')) + item_width;          
        $('.sildes ul').animate({'left' : left_indent}, 500,function(){                  
            $('.sildes li:first').before($('.sildes li:last'));           
            $('.sildes ul').css({'left' : left_value});
         
        });           
        return false;
             
    });
 
    $('.next').click(function() {
        var left_indent = parseInt($('.sildes ul').css('left')) - item_width;

        $('.sildes ul').animate({'left' : left_indent}, 500, function () {
            $('.sildes li:last').after($('.sildes li:first'));                  
            $('.sildes ul').css({'left' : left_value});
         
        });
        return false;
         
    }); 
    $('.sildes').hover(
         
        function() {
            clearInterval(run);
        }, 
        function() {
            run = setInterval('rotate()', speed);   
        }
    ); 
         
});
function rotate() {
    $('.next').click();
}
