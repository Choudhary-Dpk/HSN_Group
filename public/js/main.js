(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    // slider
    $('.carousel .carousel-item').each(function(){
    var minPerSlide = 4;
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (var i=0;i<minPerSlide;i++) {
        next=next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        
        next.children(':first-child').clone().appendTo($(this));
    }
});

})(jQuery);

$('#bologna-list a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
  const queryForm = document.getElementById('query-form');
  const contactForm = document.getElementById('contact-form');

  if (queryForm) {
      queryForm.addEventListener('submit', handleSubmit);
  }

  if (contactForm) {
      contactForm.addEventListener('submit', handleSubmit);
  }
function handleSubmit (event) {
    console.log("testtttt");
    event.preventDefault();

    const form = event.target;
    const formElements = this.elements;
    const formData = {};
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name) {
            formData[element.name] = element.value;
        }
    }
    console.log(127, formData);

    fetch('/send-email', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.text())
    .then(data => {
        //alert(data)
        form.style.display = 'none'; // Hide the form
        if (form.id === 'query-form') {
            document.getElementById('thank-you-query').style.display = 'block';
        } else if (form.id === 'contact-form') {
            document.getElementById('thank-you-contact').style.display = 'block';
        }
        })
    .catch(error => console.error('Error:', error));
}
 /* document.getElementById('query-form').addEventListener('submit', handleSubmit);
  document.getElementById('contact-form').addEventListener('submit', handleSubmit);

  function handleSubmit(event) {
      console.log("testtttt");
    event.preventDefault();
    const formElements = this.elements;
    const formData = {};
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name) {
            formData[element.name] = element.value;
        }
    }
    console.log(127, formData);
    fetch('/send-email', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.text())
    .then(data => {
        alert(data)
        // form.style.display = 'none'; // Hide the form
        // if (form.id === 'query-form') {
        //     document.getElementById('thank-you-query').style.display = 'block';
        // } else if (form.id === 'contact-form') {
        //     document.getElementById('thank-you-contact').style.display = 'block';
        // }
    })
    .catch(error => console.error('Error:', error));
  };*/


