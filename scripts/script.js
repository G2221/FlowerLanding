$(document).ready(function () {

    $('.slick-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        variableWidth: true,
        centerMode: false,
        arrows: true,
        prevArrow: $(".slide-m-prev"),
        nextArrow: $(".slide-m-next"),
        appendDots: $(".slide-m-dots"),
        responsive: [
            {
                breakpoint: 1229,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    centerMode: false,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    centerMode: false,
                }
            }]

    });

    let loader = $('.loader');
    $('#order-submit').click(function () {
        let name = $('#order-name');
        let product = $('#order-product');
        let phone = $('#order-number');
        let hasError = false;
        let checkbox = $('.order-checkbox-terms')

        $('.error-input').hide();

        if (!name.val()) {
            name.next().show();
            hasError = true;
            name.css("border-color", "#c20000");
        } else {
            name.css("border-color", "rgb(255, 255, 255)");
        }

        if (!product.val()) {
            product.next().show();
            hasError = true;
            product.css("border-color", "#c20000");
        } else {
            product.css("border-color", "rgb(255, 255, 255)");
        }

        if (!phone.val()) {
            phone.next().show();
            hasError = true;
            phone.css("border-color", "#c20000");
        } else {
            phone.css("border-color", "rgb(255, 255, 255)");
        }


        if (checkbox[0].checked == false) {
            checkbox.prev().show();
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $('.order-form-background').css('display', 'none');
                        $('.thanks').css('display', 'block');
                        name.val("");
                        product.val("");
                        phone.val("");
                        $("#order-flower-placeholder").css('display', 'block');
                        checkbox[0].checked = false;
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                    }
                    console.log(msg)
                });
        }
    })

    $(window).resize(function () {
            let widthWind = $(this).width();
            let orderFlowerPlaceholder = $("#order-flower-placeholder");

            if (widthWind < 321) {
                orderFlowerPlaceholder.html("Выберите из списка");
                orderFlowerPlaceholder.css("right", "72px");
            }
        }
    );

    $('#order-product').click(function () {
        $("#order-flower-placeholder").css('display', 'none');
    })

    $('#mailing-btn-submit').click(function () {
        let mailing = $('.mailing-input');
        let hasError = false;

        if (!mailing.val()) {
            hasError = true;
            mailing.css("border-color", "#c20000");
        } else {
            mailing.css("border-color", "rgb(214, 117, 21)");
        }

        if (!hasError) {
            if (mailing.val()) {
                $('.mailing-btn').css('display', 'none');
                mailing.css('display', 'none');
                $('.mailing-thanks').css('display', 'block');
            } else {
                alert('Возникла ошибка, попробуйте еще раз')
            }
            console.log(mailing.val())
        };
    })

    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }
    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    })
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }
    $('#close-thanks').click(function () {
        $('.order-form-background').css('display', 'block');
        $('#thanks').css('display', 'none');
        return;
    })

    document.getElementById('see-catalog').onclick = function () {
        document.getElementsByClassName('products')[0].scrollIntoView({behavior: "smooth"});
    }


})