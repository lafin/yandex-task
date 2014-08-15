// YandexTask
// Kuvakin Sergey (https://github.com/lafin)

// 4.   Реализуйте систему для показа презентаций. Подумайте, как реализовать переключение слайдов и навигацию. Предусмотрите возможность размещения нескольких презентаций на одной странице. Рекомендуется использование jQuery.

/*global $:false*/

var slideShow = function (el, search) {

    // private
    var slides = null,
        current = 0,
        element;

    // constructor
    (function (el, search) {
        element = el;
        var collect = [];
        $.ajax({
            type: 'GET',
            url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=100&format=json&nojsoncallback=1',
            data: {
                api_key: '7ea5f7d926eb81fa86e008de05ef627e',
                tags: search
            },
            dataType: 'json',
            success: function (data) {
                var photos = data.photos.photo;
                for (var i in photos) {
                    if (photos.hasOwnProperty(i)) {
                        collect.push({
                            title: photos[i].title,
                            photo: 'http://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg'
                        });
                    }
                }
            },
            complete: function () {
                current = 0;
                slides = collect;
                var photo = collect[current].photo;
                var title = collect[current].title;
                el.append('<div class="title">' + title + '</div>');
                el.append('<img src="' + photo + '" title="' + title + '">');
                init();
            }
        });
    })(el, search);

    function preloadImage(url) {
        var img = new Image();
        img.src = url;
    }

    function init() {
        element.find('.pager > .previous').on('click', function (e) {
            e.preventDefault();
            prev();
        });
        element.find('.pager > .next').on('click', function (e) {
            e.preventDefault();
            next();
        });
    }

    function changeSlide() {
        element.find('img').attr('src', slides[current].photo).attr('title', slides[current].title);
        element.find('div.title').text(slides[current].title);
        preloadImage(slides[current + 1].photo);
    }

    function next() {
        if (current !== slides.length) {
            ++current;
            changeSlide();
        }
    }

    function prev() {
        if (current) {
            --current;
            changeSlide();
        }
    }

    // public
    return {
        next: next,
        prev: prev
    };
};

// фантазировать можно бесконечно...

slideShow($('#slideshow1'), 'yandex');
slideShow($('#slideshow2'), 'flowers');
