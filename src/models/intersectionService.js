import IntersectionMesh from './intersectionMesh'

export default class IntersectionService {
  constructor() {
    this.area = this.fetchArea();
    this.mesh_list = {}
  }

  fetchArea() {
    return fetch('static/int/area.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.area;
      })
  }

  getIntersection(lng, lat) {
    return this.area
      .then((area) => {
        let jsonFile = IntersectionService.nsew(parseInt(lng), parseInt(lat));
        if (!area.includes(jsonFile)) {
          return {}
        }

        if (!this.mesh_list.hasOwnProperty(jsonFile)) {
          this.mesh_list[jsonFile] = new IntersectionMesh(jsonFile);
        }

        return this.mesh_list[jsonFile].getNearestIntersection(lng, lat);
      })
  }

  static nsew(lng, lat) {
    let NS, EW;
    if (lat >= 0) {
      NS = "N" + ("00" + lat).slice(-3);
    }
    else {
      NS = "S" + ("00" + (-lat)).slice(-3);
    }

    if (lng >= 0) {
      EW = "E" + ("00" + lng).slice(-3)
    }
    else {
      EW = "W" + ("00" + (-lng)).slice(-3)
    }

    return NS + EW + ".json"
  }

}
