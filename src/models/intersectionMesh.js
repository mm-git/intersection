import GoogleMapsLoader from 'google-maps'

export default class IntersectionMesh {
  constructor(jsonFile) {
    this.jsonFile = jsonFile;
    this.intersection_list = this.fetchMesh();
  }

  fetchMesh() {
    return fetch('static/int/' + this.jsonFile)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json;
      })
  }

  getNearestIntersection(lng, lat) {
    return this.intersection_list
      .then((intersection_list) => {
        let distance_list = intersection_list.map((intersection) =>{
          return google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(lat, lng),
            new google.maps.LatLng(intersection.lat, intersection.lng)
          )
        });
        let nearest = distance_list.indexOf(Math.min(...distance_list));
        return intersection_list[nearest];
      })
  }
}