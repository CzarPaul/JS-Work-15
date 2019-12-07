window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    function hideTabContent(a){
       for (let i = a; i < tabContent.length; i++) {
           tabContent[i].classList.remove('show');
           tabContent[i].classList.add('hide');
       }
    }
    hideTabContent(1);

    function showTabContent(b){
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show'); 
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

// timer

let deadline = '2019-12-23';
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)) % 60);

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        let t = getTimeRemaining(endtime);
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;

        if(t.hours < 10) {
            hours.textContent = `0${t.hours}`;
        }
        if(t.minutes < 10) {
            minutes.textContent = `0${t.minutes}`;
        }
        if(t.seconds < 10) {
            seconds.textContent = `0${t.seconds}`;
        }

        if (t.total <= 0){
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            
        }
    }
}
setClock('timer', deadline);



// MODAL
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        exit = document.querySelector('.popup-close'),
        btn = document.querySelector('.description-btn');

    more.addEventListener('click', () => {
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    exit.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
    btn.addEventListener('click', () => {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    //FORM

    let message = {
        loading: 'Загрузка...',
        succes: 'Спвсибо! Мы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        formContact = document.getElementById('form');
        statusMessage.classList.add('status');


    function sendData(element){
        element.addEventListener('submit', (event)=>{
            event.preventDefault();
            element.appendChild(statusMessage);
            let formData = new FormData(form);
            let obj = {};
            formData.forEach(function(value, key) {
            obj[key] = value;
        });
            let json = JSON.stringify(obj);
    
            request.send(json);
            for(let i = 0; i < element.length; i++) {
                element[i].value = '';
            }
        },
    


    function httpRequest(){return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.addEventListener('readystatechange', ()=>{
            if (request.readyState < 4) {
                resolve(message.loading);
            } else if (request.readyState === 4 && request.status == 200){
                resolve(message.succes);
            } else {
                reject(message.failure);
            }   
        });
    });
       });
    }
    sendData(form);
    sendData(formContact);
    //---------SLIDER---------- 
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');


        showSlides(slideIndex); 
        function showSlides(n){
            if (n > slides.length){
                slideIndex = 1;
            }

            if (n < 1){
                slideIndex = slides.length;
            }

            slides.forEach((item) => item.style.display = 'none');
       
            dots.forEach((item) => item.classList.remove('dot-active'));

            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }

        function plusSlides(n){
            showSlides(slideIndex += n);
        }


        function currentSlide(n){
            showSlides(slideIndex = n);
        }

        prev.addEventListener('click', () => {
            plusSlides(-1);
        });

        next.addEventListener('click', () => {
            plusSlides(1);
        });

        dotsWrap.addEventListener('click', (event) => {
            for(let i = 0; i < dots.length + 1; i++){
                if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                    currentSlide(i);
                }
            }
        });
    });



