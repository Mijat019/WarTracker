<template>
    <v-container
            fluid
            class="ma-0 pa-0"
            style="min-height:100vh;"
    >
        <div :id="mapId"
             style="min-width: 100vh; min-height: 100vh; z-index: 0;"
        ></div>
    </v-container>

</template>

<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import {battleIconOptions, customIconOptions, militaryLeaderIconOptions} from "../../utils/icons";

  export default {
    name: "MapView",
    data: () => ({
      map: null,
      tileLayer: null,
      placed: {}
    }),
    props: {
      mapId: {
        type: String,
        default() {
          return 'map';
        }
      },
      positions: {  // TODO UMESTO OVOGA IZ VUEXA
        type: Array,
        default() {
          return new Array();
        }
      }
    },
    methods: {
      placeMarkers() {
        for(let position of this.positions) {
          this.placeMarker(position);
        }
      },
      placeMarker(position) {
        let marker = L.marker([position.lat, position.lng], {draggable: true});
        marker.setIcon(this.determineIcon(position));
        marker.on('dragend', e => this.markerMoved(e, position));
        marker.addTo(this.map);
        this.placed[position.id] = marker;
      },
      determineIcon(position) {
        let iconOptions;
        if(position.iconUrl) {
          iconOptions = customIconOptions(position.iconUrl);
        } else if (position.type === 'battle') {
          iconOptions = battleIconOptions;
        } else if (position.type === 'militaryLeader') {
          iconOptions = militaryLeaderIconOptions;
        }
        let i = L.icon(iconOptions);
        console.log(i);
        return i;
      },
      markerMoved(event, position) {
        let {lat, lng} = event.target.getLatLng();
        position.lat = lat;
        position.lng = lng;
        this.$emit('moved', position); // TODO UMESTO OVOGA U VUEX
        this.reverseGeoCode(lat, lng);
      },
      async reverseGeoCode(lat, lng) {
        try {
          let query = `reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
          let {data} = await this.$axios.get(`https://nominatim.openstreetmap.org/${query}`);
          console.log(data.display_name);
          return data;
        } catch (err){
          return null;
        }
      },
      geoCode(address) {
        let query = `?q=${address}&format=jsonv2&addressdetails=1&limit=6`;
        return this.$axios.get(`https://nominatim.openstreetmap.org/${query}`);
      },

    },
    mounted() {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      });
      this.map = L.map(this.mapId, { zoomControl: false }).setView([0, 0], 2);
      this.map.addControl(L.control.zoom({position: 'bottomright'}));
      let options = {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      };
      this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options)
              .addTo(this.map);
      this.placeMarkers();
      this.$nextTick(() => this.map.invalidateSize());


      // TODO jedan marker za mokap i proveru

      let positionMock = {
        id: 1,
        lng: 20.3390452152851,
        lat: 42.9906443,
        type: 'militaryLeader'
      };
      this.placeMarker(positionMock);

    },
    updated() {
      this.$nextTick(() => this.map.invalidateSize());
    },

  }
</script>

<style></style>
