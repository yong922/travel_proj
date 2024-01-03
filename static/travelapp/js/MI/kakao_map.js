document.addEventListener('DOMContentLoaded', function() {
    var mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(33.3846, 126.5535),
        level: 3
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    var geocoder = new kakao.maps.services.Geocoder();

    var address = document.getElementById('address').innerHTML;
    var placeName = document.getElementById('placeName').innerHTML;

    geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">' + placeName + '</div>'
            });
            infowindow.open(map, marker);

            map.setCenter(coords);
        }
    });
});
