'use strict';
$(document).foundation();

// array of icon images
let images;

// get fetch error handler
const handleErrors = (res) => {
    if (!res.ok) {
        console.error(response.statusText);
    }
    return res.json();
};

// fetch icon images from teamtreehouse
fetch('https://teamtreehouse.com/adelak.json')
    .then(handleErrors)
    .then((data) => {
        // map icons url
        images = data.badges.map((img) => img.icon_url);
    })
    .catch((err) => console.error(err));

// every 10 sec change the image of the background
setInterval(() => {
    const randomNumber = Math.floor(Math.random() * images.length);
    $('#bg').fadeOut(2000);
    // to improve image animation setTimeout and change image source to a random url from images array
    setTimeout(() => {
        $('#bg').attr('src', `${images[randomNumber]}`);
    }, 1700);
    $('#bg').fadeIn(2000);
}, 10000);

// post fetch error handler
// const checkStatus = (response) => {
//     if (response.ok) {
//         return Promise.resolve(response);
//     } else {
//         return Promise.reject(new Error(response.statusText));
//     }
// };

const reportButton = document.querySelector('button.large');

// to avoid error in console check for reportButton then add EventListener if its true
if (reportButton) {
    const name = document.querySelector('input[name="username"]');
    const mail = document.querySelector('input[name="usermail"]');
    const text = document.querySelector('textarea');
    reportButton.addEventListener('click', () => {
        // const postOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username: name.value, usermail: mail.value, message: text.value }),
        // };

        // // post input values to report path
        // fetch('/report', postOptions)
        //     .then(checkStatus)
        //     .catch((err) => console.log(err));
        // // empty from once
        // name.value = '';
        // mail.value = '';
        // text.value = '';
        // eslint-disable-next-line require-jsdoc
        function tester() {
            const firebaseConfig = {
                apiKey: 'AIzaSyDg0Yq4tClp8AxZQhV2FfsTfBk70qqwRtI',
                authDomain: 'ad3lak.firebaseapp.com',
                databaseURL: 'https://ad3lak.firebaseio.com',
                projectId: 'ad3lak',
                storageBucket: 'ad3lak.appspot.com',
                messagingSenderId: '507666554242',
                appId: '1:507666554242:web:340a0e55bc9a399a',
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);

            const fbr = firebase.database().ref();
            fbr.child(name.value).set({ usermail: mail.value, message: text.value });
        }
        tester();
        $('#message')
            .slideDown()
            .delay(2500)
            .slideUp();
    });
}
