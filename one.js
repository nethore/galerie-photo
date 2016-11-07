(function(){

  $(document).ready(function() {

    $(".fancybox").fancybox({
        beforeShow : function() {
            var alt = this.element.find('img').attr('alt');

            this.inner.find('img').attr('alt', alt);

            this.title = alt;
        }
    });

    var $grid = $('.grid').imagesLoaded( function() {
      // init Isotope after all images have loaded
      $grid.isotope({
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: '.grid-sizer',
            gutter: 10,
            fitWidth: true
          }
        });
    });

    // filter items on button click
    $('.filter-button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });


    // Ma recherche
    //


    $('input#search').keyup(function(){

      console.log("Keyup");

      var filtre = $('input#search').val();
      var regexSearch = new RegExp(filtre,'i');

      console.log(filtre);
      console.log(regexSearch);


      $grid.isotope({
        // filter element with numbers greater than 50
        filter: function() {
          var filterValue = $(this).find('img').attr('alt');
          // return true to show, false to hide
          return regexSearch.test(filterValue);
        }
      });

    });


    $('input#search').focus(function(){

      var filtre = $('input#search').val();

      if (filtre === "")
      {
        $grid.isotope({
          // filter element with numbers greater than 50
          filter: function() {
              return false;
          }
        });
      }

    });



    var titreOriginal = $('h1').text();

    $('.tlt').textillate({ in: { effect: 'rollIn' } });

    console.log(titreOriginal);

    $('.gallery').find('img').mouseenter(function(){
      // console.log($(this));
      console.log('mouse enter');
      $(this).parents('.grid-item').css('transform', 'scale(1.05)').css('z-index', '1000');
      $('h1').text($(this).attr('alt'));
      $(this).next().find('p').html($(this).attr('alt'));
    });

    $('.gallery').find('img').mouseleave(function(){
      // console.log($(this));
      console.log('mouse leave');
      $(this).parents('.grid-item').css('transform', 'scale(1)').css('z-index', 'inherit');
      $('h1').text(titreOriginal);
    });

  });

})();
