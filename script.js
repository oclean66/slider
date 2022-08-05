
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
//
let slide_data = [   
];
//

var url = "https://tawk.help/api/articles?categoryId=62ed4e45cfa19b0970945fa8&propertyId=5ecc2a98c75cbf1769ef3f32&siteId=primary&limit=10";
let slides = [],
    captions = [];

    getJSON(url,
    function (err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            // console.log(data.data.articles);
            var articles = data.data.articles;
            articles.forEach(element => {
                // console.log(data.data.articles);
                var article_url = 'https://tawk.help/api/article?slug=' + element.slug + '&propertyId=5ecc2a98c75cbf1769ef3f32&siteId=primary';
                getJSON(article_url,
                    function (err, data) {
                        if (err !== null) {
                            alert('Something went wrong: ' + err);
                        } else {
                            var ar = data.data.article;
                            var content = ar.contents;
                            var image ='';
                            // console.log(ar);
                            // console.log(content);
                            content.forEach(con => {                                
                                if(con.type==='image'){
                                     image = con.content.url;
                                     var obj =  {
                                        'src': image,
                                        'title': ar.subtitle,                                    
                                    };
                                    slide_data.push(obj);
                                    start();
                                }
                            });
                          
                            // console.log(obj);                            
                        }
                    });
            });
        }
    });



let autoplay = setInterval(function () {
    nextSlide();
}, 5000);

let container = document.getElementById('container');
let leftSlider = document.getElementById('left-col');
let ccontainer = document.getElementById('caption-col');
// console.log(leftSlider);
let down_button = document.getElementById('down_button');
// let caption = document.getElementById('slider-caption');
// let caption_heading = caption.querySelector('caption-heading');

down_button.addEventListener('click', function (e) {
    e.preventDefault();
    clearInterval(autoplay);
    nextSlide();
    autoplay;
});
function start(){
    slides = [];
    captions = [];
    leftSlider.innerHTML = '';
    ccontainer.innerHTML = '';

    for (let i = 0; i < slide_data.length; i++) {
        let slide = document.createElement('div'),
            caption = document.createElement('div'),
            slide_title = document.createElement('div');

        slide.classList.add('slide');
        slide.setAttribute('style', 'background:url(' + slide_data[i].src + ')');
        caption.classList.add('caption');
        slide_title.classList.add('caption-heading');
        slide_title.innerHTML = '<h1>' + slide_data[i].title + '</h1>';

        switch (i) {
            case 0:
                slide.classList.add('current');
                caption.classList.add('current-caption');
                break;
            case 1:
                slide.classList.add('next');
                caption.classList.add('next-caption');
                break;
            case slide_data.length - 1:
                slide.classList.add('previous');
                caption.classList.add('previous-caption');
                break;
            default:
                break;
        }
        caption.appendChild(slide_title);
        // caption.insertAdjacentHTML('beforeend','<div class="caption-subhead"><span>BIENVENIDO A KINGDEPORTES </span></div>');
        slides.push(slide);
        captions.push(caption);
        leftSlider.appendChild(slide);
        ccontainer.appendChild(caption);
        // container.appendChild(caption);
    }
    console.log(slides);
    console.log(captions);
}

function nextSlide() {
    // caption.classList.add('offscreen');

    slides[0].classList.remove('current');
    slides[0].classList.add('previous', 'change');
    slides[1].classList.remove('next');
    slides[1].classList.add('current');
    slides[2].classList.add('next');
    let last = slides.length - 1;
    slides[last].classList.remove('previous');

    captions[0].classList.remove('current-caption');
    captions[0].classList.add('previous-caption', 'change');
    captions[1].classList.remove('next-caption');
    captions[1].classList.add('current-caption');
    captions[2].classList.add('next-caption');
    let last_caption = captions.length - 1;

    // console.log(last);
    captions[last].classList.remove('previous-caption');

    let placeholder = slides.shift();
    let captions_placeholder = captions.shift();
    slides.push(placeholder);
    captions.push(captions_placeholder);
}

let heading = document.querySelector('.caption-heading');


// https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
function whichTransitionEvent() {
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

var transitionEvent = whichTransitionEvent()
caption.addEventListener(transitionEvent, customFunction);

function customFunction(event) {
    caption.removeEventListener(transitionEvent, customFunction);
    console.log('animation ended');

    // Do something when the transition ends
}


