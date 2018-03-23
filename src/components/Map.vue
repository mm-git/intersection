<template>
  <div class="map_frame">
    <div id="map"></div>
    <div class="map_coor">{{lng.toFixed(6)}} / {{lat.toFixed(6)}}</div>
    <div>
      <button @click="search()">近くの交差点</button>
    </div>
    <div>{{ name }}</div>
  </div>
</template>

<script>
  import GoogleMapsLoader from 'google-maps'
  import IntersectionService from '../models/intersectionService'

  let intersectionService = new IntersectionService();

  export default {
    name: "staticmap",
    data() {
      return {
        lng: 135.0,
        lat: 35.0,
        map: null,
        name: ""
      }
    },
    methods: {
      initializeMap: function() {
        GoogleMapsLoader.KEY = "AIzaSyDYS7ABbmUkBcrPPJNitXh4rxASq828E6E";
        GoogleMapsLoader.LANGUAGE = "ja";
        GoogleMapsLoader.LIBRARIES = ['geometry'];

        GoogleMapsLoader.load((google) => {
          let opt = {
            center                 : new google.maps.LatLng(this.lat, this.lng),
            zoom                   : 20,
            scrollwheel            : false,
            disableDoubleClickZoom : false,
            keyboardShortcuts      : false,
            mapTypeId              : google.maps.MapTypeId.ROADMAP,
            mapTypeControl         : false,
            scaleControl           : false,
            navigationControl      : false,
          };
          this.map = new google.maps.Map(document.getElementById("map"), opt);
          this.map.addListener("idle", () => {
            this.onIdle();
          })

        });
      },
      getLocation: function() {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.lng = pos.coords.longitude;
          this.lat = pos.coords.latitude;
          this.initializeMap();
        })
      },
      onIdle: function() {
        let center = this.map.getCenter();
        this.lng = center.lng();
        this.lat = center.lat();
      },
      search: function() {
        intersectionService.getIntersection(this.lng, this.lat)
          .then((intersection) => {
            this.name = intersection.name;
            this.map.setCenter(new google.maps.LatLng(intersection.lat, intersection.lng))
          })
      }
    },
    mounted () {
      this.getLocation()
    }
  }
</script>

<style scoped>
  .map_frame {
    width: 100vw;
    height: 60vh;
  }

  #map {
    width: 100vw;
    height: 60vh;
  }

  .map_coor{
    padding: 4px 8px;
    font-size: 12px;
    text-align: center;
  }

</style>