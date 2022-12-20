var map = document.getElementById('contacts-map');
var panorama = document.getElementById('panorama');


    ymaps.ready(init);

    var myMap;
    var placemarkCentered = false;
    var initialized = false;

    function init() {
        myMap = new ymaps.Map("contacts-map", {
            center: [55.767798, 37.591395],
            zoom: 17,
            controls: ['zoomControl']
        });
        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects
            .add(new ymaps.Placemark([55.767798, 37.591395], {
                balloonContent: '107078, г. Москва, ул. Новорязанская, дом 18, строение 21, этаж П, помещение 25'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'themes/sellmore/assets/images/map-marker.svg',
                iconImageSize: [40, 57],
                iconImageOffset: [-20, -57],
            }));
        inT();
        function inT(){
            if (window.innerWidth <= 959 && !placemarkCentered) {
                myMap.setBounds(myMap.geoObjects.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 35
                });
                placemarkCentered = true;
            }
            if (window.innerWidth > 959 && placemarkCentered){
                myMap.setBounds([[55.771591, 37.661752],[55.771591, 37.661752]], {
                    checkZoomRange: true,
                    zoomMargin: 17
                });
                placemarkCentered = false;
            }
            if (window.innerWidth <= 768) {
                myMap.behaviors.disable('drag');
            }
        }
        window.addEventListener("resize", function() {
            myMap.container.fitToViewport();
            inT();
        });
    }




