let selectedJobRole = 'Select a Job Role';
let name = '';
let email = '';
let tshirtSize = $('#size').children('option:selected').val(); //default trshirt size
let design = 'Select Theme';
let color = 'selecttheme';
let totalPrice = 0;
let paymentMethod = 'Select Payment Method';
$('.activities').after(`<p class="cost"><strong>Total Cost: $${totalPrice}.00</strong></p>`);
//hides tshirt color value unless a theme is selected
$('#tomato').css('display','none');
$('#steelblue').css('display','none');
$('#dimgrey').css('display','none');
$('#cornflowerblue').css('display','none');
$('#darkslategrey').css('display','none');
$('#gold').css('display','none');
//name validator
function nameValidator(name) {
    return /^[a-z ,.'-]+$/i.test(name);
}

//email validator
function emailValidator(email) {
    //copied from https://emailregex.com/
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

//Changes focus to next form field on 'Enter' and prevents default 'submit'.
$('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $(e.target).blur();
        $(e.target).next().focus();
        return false;
    }
});

//Checks the validators and throws error if not valid.
$('input').on("blur", (e) => {
    let id = e.target.id;
//    $(`#${id}`).css('border', '0');
    //if not empty, check for errors.
    if ($(e.target).val() !== ''){
        if (id == 'name'){
            if (nameValidator($(e.target).val()) !== true ){
                $('#name').css('border', '2px solid red');
                $('#name').prev().remove();
                $('#name').before('<label for="name">Name: (Invalid)</label>');
                $('#name').prev().css('color','red');


            } else {
                $('#name').prev().remove();
                $('#name').before('<label for="name">Name:</label>');
                $('#name').prev().css('color','#184f68');
                $(`#name`).css('border', '0');
            }
        }    else if (id == 'mail') {
                if (emailValidator($(e.target).val()) !== true ){
                    $('#mail').css('border', '2px solid red');
                    $('#mail').prev().remove();
                    $('#mail').before('<label for="mail">Email: (Invalid)</label>');
                    $('#mail').prev().css('color','red');


                } else {
                    $('#mail').prev().remove();
                    $('#mail').before('<label for="name">Email:</label>');
                    $('#mail').prev().css('color','#184f68');
                    $(`#mail`).css('border', '0');
                }
        } else if (id == 'other-title') {
            selectedJobRole = $('#other-title').val();

        }
    }
    name = $('#name').val();
    email = $('#mail').val();


});
//Setting other titles display to none initially
$('#other-title').css('display', 'none');
$('#other-title-label').css('display', 'none');

$('#title').change(function () {
    $('#other-title').css('display', 'none');
    $('#other-title-label').css('display', 'none');
    selectedJobRole = $(this).children('option:selected').val();

    if (selectedJobRole != 'Select a Job Role'){
        $('#title').prev().remove();
        $('#title').before('<label for="title">Title: </label>');
        $('#title').prev().css('color','#184f68');
    }

    if (selectedJobRole.toLowerCase() == 'other'){
        $('#other-title').css('display', 'block');
        $('#other-title-label').css('display', 'block');

    }

});

//sets tshirt size value as selected
$('#size').change(function () {
    tshirtSize = $('#size').children('option:selected').val();

});

//design
$('#design').change(function () {
    design = $(this).children('option:selected').text();
    if (design == 'Select Theme'){
        $('#selecttheme').text('Please select a T-shirt theme');
        $('#tomato').css('display','none');
        $('#steelblue').css('display','none');
        $('#dimgrey').css('display','none');
        $('#cornflowerblue').css('display','none');
        $('#darkslategrey').css('display','none');
        $('#gold').css('display','none');

    }
    if (design.toLowerCase() !== 'select theme' ) {
        $('.shirt legend').html(`T-Shirt Info: `);
        $('.shirt legend').css('color','#184f68');
        $('#selecttheme').text('Please select a T-shirt color');
        if (design == 'Theme - JS Puns'){
            $('#tomato').css('display','none');
            $('#steelblue').css('display','none');
            $('#dimgrey').css('display','none');

            $('#cornflowerblue').css('display','block');
            $('#darkslategrey').css('display','block');
            $('#gold').css('display','block');

        } else  {
            $('#cornflowerblue').css('display','none');
            $('#darkslategrey').css('display','none');
            $('#gold').css('display','none');

            $('#tomato').css('display','block');
            $('#steelblue').css('display','block');
            $('#dimgrey').css('display','block');

        }
    }


});

//Select the color value.
$('#color').change(function () {
    color = $('#color').children('option:selected').val();
});


//updates the price based on clicks
$('input[type=checkbox]').on('click', (e) => {
    if (!$(e.target).attr('checked')){
        if (e.target.id == 'jsframeworks'){
            $('#express').attr('disabled', true);
        } else if (e.target.id == 'express') {
            $('#jsframeworks').attr('disabled', true);

        } else if (e.target.id == 'jslib') {
            $('#node').attr('disabled', true);
        } else if (e.target.id == 'node') {
            $('#jslib').attr('disabled', true);
        }
        e.target.setAttribute('checked',true);
            totalPrice = totalPrice + parseInt($(e.target).data('price'));

    } else {
        totalPrice = totalPrice - parseInt($(e.target).data('price'));
        if (e.target.id == 'jsframeworks'){
            $('#express').attr('disabled', false);
        } else if (e.target.id == 'express') {
            $('#jsframeworks').attr('disabled', false);

        } else if (e.target.id == 'jslib') {
            $('#node').attr('disabled', false);
        } else if (e.target.id == 'node') {
            $('#jslib').attr('disabled', false);
        }
    }

   $('.cost').html(`<p><strong>Total Cost: $${totalPrice}.00</strong></p>`);


});

//Payment info
$('#credit-card').css('display','none');

$('#payment').change(function () {
    paymentMethod = $('#payment').children('option:selected').text();
    if (paymentMethod != 'Select Payment Method'){
        $('.payment-info legend').html('Payment Info ');
        $('.payment-info legend').css('color','#184f68');
    }
    if (paymentMethod.toLowerCase() == 'credit card' ){
        $('#credit-card').css('display','block');
    } else {
        $('#credit-card').css('display','none');
    }
});
//Button handlers
$('button[type=reset]').on('click', () => {
    $('form').trigger('reset');
    //navigates to top on reset
    window.scrollTo(0,0);
});

$('button[type=submit]').on('click', (e) => {
    e.preventDefault();
    //checks if name or email field is empty
    if ($('#name').val() == ''){
        $('#name').css('border', '2px solid red');
        $('#name').prev().remove();
        $('#name').before('<label for="name">Name: (Invalid)</label>');
        $('#name').prev().css('color','red');
    }
    if ($('#mail').val() == ''){
        $('#mail').css('border', '2px solid red');
        $('#mail').prev().remove();
        $('#mail').before('<label for="name">Name: (Invalid)</label>');
        $('#mail').prev().css('color','red');
    }

    if (selectedJobRole == 'Select a Job Role'){
        $('#title').prev().remove();
        $('#title').before('<label for="title">Title: (Please Select a Job Role)</label>');
        $('#title').prev().css('color','red');
    }

    if (design == 'Select Theme' || color == 'selecttheme') {
        $('.shirt legend').html(`T-Shirt Info (Please select all the details)`);
        $('.shirt legend').css('color','red');

    }

    if (paymentMethod = 'Select Payment Method') {
        $('.payment-info legend').html('Payment Info (Please Selecet a valid payment method)');
        $('.payment-info legend').css('color','red');
    }
    //navigates to top on reset
    window.scrollTo(0,0);
});

//last thing to do, check the credit card validity
