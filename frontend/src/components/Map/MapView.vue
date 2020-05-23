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
    import {mapActions, mapState} from "vuex";
    import {reverseGeoCode} from "../../utils/geoCoding";

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
            mapCode: {
                type: String,
                default() {
                    return 'map1';
                }
            }
        },
        computed: {
            ...mapState('positions', ['militaryLeaderPositions', 'battlePositions'])
        },
        watch: {
            militaryLeaderPositions(newPositions, oldPositions) {
                if(!oldPositions || oldPositions.length === 0)
                    this.placeMarkers(newPositions, 'militaryLeader');
            },
            battlePositions(newPositions, oldPositions) {
                if(!oldPositions || oldPositions.length === 0)
                    this.placeMarkers(newPositions, 'battle');
            }
        },
        methods: {
            ...mapActions('positions', ['getMilitaryLeaderPositions', 'getBattlePositions']),


            placeMarkers(positions, type) {
                for (let position of positions) {
                    this.placeMarker(position, type);
                }
            },
            placeMarker(position, type) {
                let marker = L.marker([position.lat, position.lng], {draggable: true});
                marker.setIcon(this.determineIcon(position, type));
                marker.on('dragend', e => this.markerMoved(e, position));
                marker.addTo(this.map);
                this.placed[position.id] = marker;
            },
            determineIcon(position, type) {
                let iconOptions;
                if (position.iconUrl) {
                    iconOptions = customIconOptions(position.iconUrl);
                } else if (type === 'battle') {
                    iconOptions = battleIconOptions;
                } else if (type === 'militaryLeader') {
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
                position.militaryLeader.birthPlace = reverseGeoCode(lat, lng);
                console.log(position);
            },

            getPositions() {
                this.getMilitaryLeaderPositions(this.mapCode);
                this.getBattlePositions(this.mapCode);
            }
        },
        mounted() {
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
                iconUrl: require("leaflet/dist/images/marker-icon.png"),
                shadowUrl: require("leaflet/dist/images/marker-shadow.png")
            });
            const corner1 = L.latLng(-90, -180);
            const corner2 = L.latLng(90, 180);
            const maxBounds = L.latLngBounds(corner1, corner2);
            let mapOptions = {
                zoomControl: false,
                maxBounds,
                maxBoundsViscosity: 1.0,
                minZoom: 3,
            };
            this.map = L.map(this.mapId, mapOptions).setView([0, 0], 3);
            this.map.addControl(L.control.zoom({position: 'bottomright'}));
            let options = {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                noWrap: true
            };
            this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options)
                .addTo(this.map);
            this.$nextTick(() => this.map.invalidateSize());

            this.getPositions();
        },
        updated() {
            this.$nextTick(() => this.map.invalidateSize());
        },

    }
</script>

<style></style>
