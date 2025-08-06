'use strict'

const navigationBtn = document.querySelector('#navigation-button');
const navigation = document.querySelector('#navigation');
const overlay = document.querySelector('#overlay');

const cartsContainer = document.querySelector('#carts-container');
const viewMoreCardsBtn = document.querySelector('#view-more-cards-button');

const nameInp = document.querySelector('#name-input');
const emailInp = document.querySelector('#email-input');
const companyNameInp = document.querySelector('#company-name-input');
const phoneNoInp = document.querySelector('#phone-no-input');
const contactFormSubmitBtn = document.querySelector('#contact-form-submit-button');

const newsletterEmailInp = document.querySelector('#newsletter-email-input');
const newsletterSubmitBtn = document.querySelector('#newsletter-submit-button');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const showError = (input, message) => {
    input.classList.add('border-red-500');
    input.nextElementSibling.innerText = message;
    input.nextElementSibling.classList.remove('hidden');
};

const removeError = (input) => {
    input.classList.remove('border-red-500');
    input.nextElementSibling.classList.add('hidden');
};

const validateForm = () => {

    const nameRegex = /^[A-Za-z]{3,}$/;
    const companyNameRegex = /^$|^[a-zA-Z0-9_]{3,20}$/;
    const phoneRegex = /^[+]?[\d\s\-]{10,15}$/;

    const userName = nameInp.value.trim();
    const email = emailInp.value.trim();
    const companyName = companyNameInp.value.trim();
    const phoneNo = phoneNoInp.value.trim();
    let isValid = true;

    removeError(nameInp);
    removeError(emailInp);
    removeError(companyNameInp);
    removeError(phoneNoInp);
    removeError(contactFormSubmitBtn)


    if (!nameRegex.test(userName)) {
        showError(nameInp, 'The name must be at least 3 letters and contain only English letters.');
        isValid = false;
        
    }

    if (!emailRegex.test(email)) {
        showError(emailInp, 'The email entered is not valid.');
        isValid = false;

    }

    if (!companyNameRegex.test(companyName)) {
        showError(companyNameInp, 'The entered value is not valid.');
        isValid = false;

    }
    
    if (!phoneRegex.test(phoneNo)) {
        showError(phoneNoInp, 'The phone number entered is not correct.');
        isValid = false;

    }

    if (isValid) {
        return {
            isValid,
            formData: { name: userName, email, companyName, phoneNo }
        };
    } 

    return {
        isValid: false,
        formData: {}
    }
};

const submitForm = (formData, onSuccess) => {

    const CONTACT_API_URL = '';

    contactFormSubmitBtn.disabled = true;

    fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(data => data.json())
    .then(res => onSuccess(res))
    .catch(err => {
        console.error(`Error submitting form: ${err}`);
        contactFormSubmitBtn.nextElementSibling.innerText = `Something went wrong. Please try again.${CONTACT_API_URL ? '' : ' (API not connected in demo)'}`;
        contactFormSubmitBtn.nextElementSibling.classList.remove('hidden');
    })
    .finally(() => contactFormSubmitBtn.disabled = false);

};

const onSuccess = (res) => {
    emptyForm();
};

const emptyForm = () => {
    nameInp.value = '';
    emailInp.value = '';
    companyNameInp.value = '';
    phoneNoInp.value = '';
};

const validateNewsletterEmail = () => {
    const email = newsletterEmailInp.value.trim();
    console.log(email);
    
    removeError(newsletterEmailInp);

    if (!emailRegex.test(email)) {
        showError(newsletterEmailInp, 'Please enter a valid email address.');
        return false;
    }

    return true;
};

const submitNewsletter = () => {
    const email = newsletterEmailInp.value.trim();
    const NEWSLETTER_API_URL = '';

    newsletterSubmitBtn.disabled = true;

    fetch(NEWSLETTER_API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({email})
    })
    .then(res => res.json())
    .then(() => {
        newsletterEmailInp.value = '';
    })
    .catch(err => {
        console.error('Newsletter submit error:', err);
        showError(newsletterEmailInp, `Something went wrong. Please try again.${NEWSLETTER_API_URL ? '' : ' (API not connected in demo)'}`);;
    })
    .finally(() => {
        newsletterSubmitBtn.disabled = false;
    });
};

navigationBtn.addEventListener('click', () => {
    navigation.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('scroll-disabled');

});

overlay.addEventListener('click', () => {
    navigation.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('scroll-disabled');

});

viewMoreCardsBtn.addEventListener('click', () => {
    cartsContainer.classList.toggle('h-85.5');
    cartsContainer.classList.toggle('tablet:h-170');
    cartsContainer.classList.toggle('desktop:h-172.5');
    viewMoreCardsBtn.innerHTML = viewMoreCardsBtn.innerHTML.includes('View more') ?
    viewMoreCardsBtn.innerHTML.replace('View more', 'View less') :
    viewMoreCardsBtn.innerHTML.replace('View less', 'View more');

});

contactFormSubmitBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    const {isValid, formData} = validateForm();
    if (isValid) submitForm(formData, onSuccess);

});

newsletterSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateNewsletterEmail()) submitNewsletter();
});
