
var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
// console.log(urlParams);
const style = urlParams.get('style') || 'banner-top-prematch-dark'
// console.log(style);

function start() {
    let container = document.getElementById('swiper-wrapper');
    let slide_data = [];
    // container.innerHTML ='';
    var article_url = 'https://tawk.help/api/article?slug='+style.toLowerCase()+'&propertyId=5ecc2a98c75cbf1769ef3f32&siteId=primary';
    getJSON(article_url,
        function (err, data) {
            if (err !== null) {
                console.log('Something went wrong: ' + err);                
            } else {
                var ar = data.data.article;
                var content = ar.contents;
                var image = '';
                // console.log(ar);
                // console.log(content);
                content.forEach(con => {
                    if (con.type === 'image') {
                        image = con.content.url;
                        var obj = {
                            'src': image,
                            'title': ar.subtitle,
                        };
                        slide_data.push(obj);
                        // start();
                    }
                });

                // console.log(slide_data);
                for (let i = 0; i < slide_data.length; i++) {
                    let slide = document.createElement('div');
                    let img = document.createElement('img');
                    slide.classList.add('swiper-slide');
                    // slide.classList.add('fade');
                    img.setAttribute('src', slide_data[i].src);
                    img.setAttribute('style', "width:100%");
                    slide.appendChild(img);
                    container.appendChild(slide);                 
                }
                // showSlides(slideIndex);
                // setInterval(() => {
                //     plusSlides(1);
                // }, 5000);
                const swiper = new Swiper('.swiper', {
                    // Optional parameters
                    // direction: 'vertical',
                    loop: true,
                    spaceBetween: 30,
                    effect: "fade",
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    // If we need pagination
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true,
                    },
                    autoHeight: true,
                    // Navigation arrows
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
              
                    // And if we need scrollbar
                    // scrollbar: {
                    //   el: '.swiper-scrollbar',
                    // },
                  });
            }
        });


}



let slideIndex = 1;


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     //   let dots = document.getElementsByClassName("dot");
//     if (n > slides.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = slides.length }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     //   for (i = 0; i < dots.length; i++) {
//     //     dots[i].className = dots[i].className.replace(" active", "");
//     //   }
//     slides[slideIndex - 1].style.display = "block";
//     //   dots[slideIndex-1].className += " active";
// }
start();


