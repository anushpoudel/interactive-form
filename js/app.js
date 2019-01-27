$(document).ready(function () {

    /*
    NOTE:
    > Forgot to start jquery variable names with $. (not an error but would have been more readable).
    > Not all elements are selected with jqery. (Just starting out with jquery).
    > $('').attr() was not working for some reason, so used JS to set attributes.
    > Haven't checked for the expiration dates of the cards.
    */

    //basic variables setup
    let selectedJobRole = $('#title option:selected').val(); //default job role
    let name = '';
    let email = '';
    let ccNum = '';
    let cvv = '';
    let zip = '';
    let tshirtSize = $('#size option:selected').val(); //default trshirt size
    let design = $('#design option:selected').text(); //default design
    let color = 'selecttheme';
    let totalPrice = 0;
    let errorCount = 0; //to count for the errors in the document
    let paymentMethod = 'Select Payment Method';
    let all = ''; //used at the end on submission to select all DOM elements.
    $('.activities').after(`<p class="cost"><strong>Total Cost: $${totalPrice}.00</strong></p>`);

    //place holders for credit cards:
    document.querySelector('#cc-num').setAttribute('placeholder', '13-16 DIGITS');
    document.querySelector('#zip').setAttribute('placeholder', '5 DIGITS');
    document.querySelector('#cvv').setAttribute('placeholder', '3 DIGITS');

    //hides tshirt color value unless a theme is selected
    $('#tomato').hide();
    $('#steelblue').hide();
    $('#dimgrey').hide();
    $('#cornflowerblue').hide();
    $('#darkslategrey').hide();
    $('#gold').hide();

    //name validator
    function nameValidator(name) {
        return /^[a-z ,.'-]+$/i.test(name);
    }

    //email validator
    function emailValidator(email) {
        //copied from https://emailregex.com/
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    //credit card validator
    function cardValidator(key, value) { //key is id
        value = parseInt(value);

        if (key == 'cc-num') { //cc-num validator
            return /^(\d{13}|\d{14}|\d{15}|\d{16})$/.test(value);
        } else if (key == 'zip') { //zip code validator
            return /^(\d{5})$/.test(value);
        } else if (key == 'cvv') { //cvv validator
            return /^(\d{3})$/.test(value);
        }

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

    //--------------------------------------//
    // CSS SETTERS //
    //--------------------------------------//
    function setStylesOfName() {
        $('#name').css('border', '2px solid red');
        $('#name').prev().remove();
        $('#name').before('<label for="name">Name: (Invalid)</label>');
        $('#name').prev().css('color', 'red');
    }

    function setStylesOfEmail() {
        $('#mail').css('border', '2px solid red');
        $('#mail').prev().remove();
        $('#mail').before('<label for="mail">Email: (Invalid)</label>');
        $('#mail').prev().css('color', 'red');

    }

    function setStylesOfCcNum() {
        $('#cc-num').css('border', '2px solid red');
        $('#cc-num').prev().remove();
        $('#cc-num').before('<label for="cc-num">Card Number: (Invalid)</label>');
        $('#cc-num').prev().css('color', 'red');

    }

    function setStylesOfZip() {
        $('#zip').css('border', '2px solid red');
        $('#zip').prev().remove();
        $('#zip').before('<label for="zip">Zip Code: (Invalid)</label>');
        $('#zip').prev().css('color', 'red');

    }

    function setStylesOfCvv() {
        $('#cvv').css('border', '2px solid red');
        $('#cvv').prev().remove();
        $('#cvv').before('<label for="cvv">CVV: (Invalid)</label>');
        $('#cvv').prev().css('color', 'red');

    }

    //--------------------------------------//
    // CSS REMOVERS //
    //--------------------------------------//

    function removeStylesOfName() {
        $('#name').prev().remove();
        $('#name').before('<label for="name">Name:</label>');
        $('#name').prev().css('color', '#000');
        $(`#name`).css('border', '0');
    }

    function removeStylesOfEmail() {
        $('#mail').prev().remove();
        $('#mail').before('<label for="name">Email:</label>');
        $('#mail').prev().css('color', '#000');
        $(`#mail`).css('border', '0');

    }

    function removeStylesOfCcNum() {
        $('#cc-num').prev().remove();
        $('#cc-num').before('<label for="cc-num">Card Number:</label>');
        $('#cc-num').prev().css('color', '#000');
        $(`#cc-num`).css('border', '0');

    }

    function removeStylesOfZip() {
        $('#zip').prev().remove();
        $('#zip').before('<label for="zip">Zip Code:</label>');
        $('#zip').prev().css('color', '#000');
        $(`#zip`).css('border', '0');
    }

    function removeStylesOfCvv() {
        $('#cvv').prev().remove();
        $('#cvv').before('<label for="cvv">CVV: </label>');
        $('#cvv').prev().css('color', '#000');
        $(`#cvv`).css('border', '0');
    }

    function removeStylesOfJobRole() {
        $('#title').prev().remove();
        $('#title').before('<label for="title">Job Role </label>');
        $('#title').prev().css('color', '#000');
    }

    function removeStylesOfTshirts() {
        $('.shirt legend').html(`T-Shirt Info `);
        $('.shirt legend').css('color', '#184f68');

    }

    function removeStylesOfPayment() {
        $('.payment-info legend').html('Payment Info ');
        $('.payment-info legend').css('color', '#184f68');
    }


    //Checks the validators and throws error if not valid.
    $('input').on("blur", (e) => {
        let id = e.target.id;

        //if not empty, check for errors.
        if ($(e.target).val() !== '') {
            if (id == 'name') {
                if (nameValidator($(e.target).val()) !== true) {
                    setStylesOfName();
                } else {
                    removeStylesOfName();

                }
            } else if (id == 'mail') {
                if (emailValidator($(e.target).val()) !== true) {
                    setStylesOfEmail();
                } else {
                    removeStylesOfEmail();

                }
            } else if (id == 'cc-num') {
                if (cardValidator('cc-num', $(e.target).val()) !== true) {
                    setStylesOfCcNum();
                } else {
                    removeStylesOfCcNum();

                }
            } else if (id == 'zip') {
                if (cardValidator('zip', $(e.target).val()) !== true) {
                    setStylesOfZip();
                } else {
                    removeStylesOfZip();

                }
            } else if (id == 'cvv') {
                if (cardValidator('cvv', $(e.target).val()) !== true) {
                    setStylesOfCvv();
                } else {
                    removeStylesOfCvv();

                }
            }
        }




    });

    //Job Role

    //Setting other titles display to none initially
    $('#other-title').hide();
    $('#other-title-label').hide();

    $('#title').change(function () {
        $('#other-title').hide();
        $('#other-title-label').hide();
        selectedJobRole = $(this).children('option:selected').val();

        if (selectedJobRole != 'select-a-role') {
            removeStylesOfJobRole();

        }

        if (selectedJobRole == 'other') {
            $('#other-title').show();
            $('#other-title-label').show();

        }

    });

    //sets tshirt size value as selected
    $('#size').change(function () {
        tshirtSize = $('#size').children('option:selected').val();

    });


    //Tshirt Design Section:

    $('#design').change(function () {
        design = $(this).children('option:selected').text();
        if (design == 'Select Theme') {
            $('#selecttheme').text('Please select a T-shirt theme');

            //using vanilla js to set attribute. idk why $('#selecttheme').attr('selected',true); not working.
            document.querySelector('#selecttheme').setAttribute('selected', true);
            $('#tomato').hide();
            $('#steelblue').hide();
            $('#dimgrey').hide();
            $('#cornflowerblue').hide();
            $('#darkslategrey').hide();
            $('#gold').hide();

        }
        if (design.toLowerCase() !== 'select theme') {
            removeStylesOfTshirts();
            $('#selecttheme').text('Please select a T-shirt color');
            if (design == 'Theme - JS Puns') {
                $('#tomato').hide();
                $('#steelblue').hide();
                $('#dimgrey').hide();

                $('#cornflowerblue').show();
                $('#darkslategrey').show();
                $('#gold').show();

            } else if (design == 'Theme - I ♥ JS') {
                $('#cornflowerblue').hide();
                $('#darkslategrey').hide();
                $('#gold').hide();

                $('#tomato').show();
                $('#steelblue').show();
                $('#dimgrey').show();

            }
        }


    });

    //Select the color value.
    $('#color').change(function () {
        color = $('#color').children('option:selected').val();
        if (color !== 'selecttheme') {
            removeStylesOfTshirts();
        }
    });


    //Events handler. (Updates price and hides checkboxes for same time)
    $('input[type=checkbox]').on('click', (e) => {
        if (!$(e.target).attr('checked')) {
            if (e.target.id == 'jsframeworks') {
                $('#express').attr('disabled', true);
            } else if (e.target.id == 'express') {
                $('#jsframeworks').attr('disabled', true);

            } else if (e.target.id == 'jslib') {
                $('#node').attr('disabled', true);
            } else if (e.target.id == 'node') {
                $('#jslib').attr('disabled', true);
            }
            e.target.setAttribute('checked', true);
            totalPrice = totalPrice + parseInt($(e.target).data('price'));

        } else {
            totalPrice = totalPrice - parseInt($(e.target).data('price'));
            if (e.target.id == 'jsframeworks') {
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
    $('#credit-card').hide();

    $('#payment').change(function () {
        paymentMethod = $('#payment').children('option:selected').text();
        if (paymentMethod != 'Select Payment Method') {
            removeStylesOfPayment();
        }
        if (paymentMethod.toLowerCase() == 'credit card') {
            $('#credit-card').show();
        } else {
            $('#credit-card').hide();
        }
    });

    //Button handlers
    //Reset button handler

    //reset function
    function reset() {
        $('form').trigger('reset');
        //navigates to top on reset
        window.scrollTo(0, 0);
        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].removeAttribute('checked');
        }
        totalPrice = 0;
        $('.cost').html(`<p><strong>Total Cost: $${totalPrice}.00</strong></p>`);

        //remove styles of everything of normal
        removeStylesOfName();
        removeStylesOfEmail();
        removeStylesOfCcNum();
        removeStylesOfCvv();
        removeStylesOfZip();
        removeStylesOfJobRole();
        removeStylesOfTshirts();
        removeStylesOfPayment();
    }

    $('button[type=reset]').on('click', () => {
        reset();
    });

    //Submit Button Handler.
    $('button[type=submit]').on('click', (e) => {
        errorCount = 0;
        e.preventDefault();

        //checks if name field is empty
        if ($('#name').val() == '') {
            setStylesOfName();
            errorCount++;
        }

        //checks if email field is empty
        if ($('#mail').val() == '') {
            setStylesOfEmail();
            errorCount++;
        }

        //checks for empty fields inside credit card div only when credit card is selected.
        if (paymentMethod.toLowerCase() == 'credit card') {
            //checks if cc-num field is empty
            if ($('#cc-num').val() == '') {
                setStylesOfCcNum();
                errorCount++;
            }
            //checks if cvv is empty
            if ($('#cvv').val() == '') {
                setStylesOfCvv();
                errorCount++;
            }

            //checks if zip is empty
            if ($('#zip').val() == '') {
                setStylesOfZip();
                errorCount++;
            }
        }

        //checks whether jobrole is selected or not
        if (selectedJobRole == 'select-a-role') {
            $('#title').prev().remove();
            $('#title').before('<label for="title">Title: (Please Select a Job Role)</label>');
            $('#title').prev().css('color', 'red');
            errorCount++;
        }

        //checks whether design and color is selected or not
        if (design == 'Select Theme' || color == 'selecttheme') {
            $('.shirt legend').html(`T-Shirt Info (Please select all the details)`);
            $('.shirt legend').css('color', 'red');
            errorCount++;

        }

        //checks whether paymentMethod is selected or not
        if (paymentMethod == 'Select Payment Method') {
            $('.payment-info legend').html('Payment Info (Please Selecet a valid payment method)');
            $('.payment-info legend').css('color', 'red');
            errorCount++;
        }

        //checks for error count
        if (errorCount == 0) {
            //selects all DOM elements
            all = document.getElementsByTagName("*");

            //loops through all elements to see if color is 'red'. (red=error present).
            for (let i = 0, max = all.length; i < max; i++) {
                if (all[i].style.color == 'red') {
                    errorCount++;
                }
            }

            //errorCount == 0 means form is error free and ready to be submitted
            if (errorCount == 0) {
                //extract all values of valid input fields if later needed.
                //select input fields' options have already been assigned on select during the execution.
                name = $('#name').val();
                email = $('#mail').val();
                ccNum = $('#cc-num').val();
                cvv = $('#cvv').val();
                zip = $('#cvv').val();

                //navigates to top
                window.scrollTo(0, 0);
                alert('Your form has been submitted successfully!');
                //resets the form upon completion
                reset();


            }
        } else {
            //navigates to top
            window.scrollTo(0, 0);
            alert('There were error/s in your form, please recheck!');

        }

    });


});
