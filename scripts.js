
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

function start() {
    let container = document.getElementById('slideshow-container');
    let slide_data = [];
    // container.innerHTML ='';
    var article_url = 'https://tawk.help/api/article?slug=banner-top&propertyId=5ecc2a98c75cbf1769ef3f32&siteId=primary';
    getJSON(article_url,
        function (err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
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

                console.log(slide_data);
                for (let i = 0; i < slide_data.length; i++) {
                    let slide = document.createElement('div');
                    let img = document.createElement('img');
                    slide.classList.add('mySlides');
                    slide.classList.add('fade');
                    img.setAttribute('src', slide_data[i].src);
                    img.setAttribute('style', "width:100%");
                    slide.appendChild(img);
                    container.appendChild(slide);

                 

                }
                showSlides(slideIndex);
                setInterval(() => {
                    plusSlides(1);
                }, 5000);
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

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    //   let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //   for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    //   }
    slides[slideIndex - 1].style.display = "block";
    //   dots[slideIndex-1].className += " active";
}
start();


