$(document).ready(function(){
    $( window ).scroll( function() {
        if ( $( this ).scrollTop() > 300 ) {
            $( '.top' ).fadeIn();
            $('.header-wrap').addClass('nav-back')
        } else {
            $( '.top' ).fadeOut();
            $('.header-wrap').removeClass('nav-back')
        }
    });
    $( '.top' ).click( function() {
        $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
        return false;
    });
});