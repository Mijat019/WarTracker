<template>
    <v-container
            fluid
            class="ma-0 pa-0"
            style="min-height:100vh;"
    >
        <div :id="mapId"
             style="min-width: 100vh; min-height: 100vh; z-index: 0;"
        >
            <position-popup
                    v-model="popup.open"
                    :position-x="popup.x"
                    :position-y="popup.y"
                    :position="popup.position"
                    :type="popup.type"
            />
        </div>

    </v-container>
</template>

<script>
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';
    import {mapActions, mapState} from "vuex";
    import {reverseGeoCode} from "../../utils/geoCoding";
    import {battleType, militaryLeaderType} from "../../utils/types";
    import PositionPopup from "./PositionPopup";
    const POPUP_OFFSET = {x: 40, y: 20};
    export default {
        name: "MapView",
        components: {PositionPopup},
        data: () => ({
            map: null,
            tileLayer: null,
            placed: {},
            popup: {
                open: false,
                x: 0,
                y: 0,
                position: null,
                type: null
            },
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
                    this.placeMarkers(newPositions, militaryLeaderType);
            },
            battlePositions(newPositions, oldPositions) {
                if(!oldPositions || oldPositions.length === 0)
                    this.placeMarkers(newPositions, battleType);
            }
        },
        methods: {
            ...mapActions('positions',
                [
                    'getMilitaryLeaderPositions',
                    'getBattlePositions',
                    'updateBattlePosition',
                    'updateMilitaryLeaderPosition'
                ]),

            placeMarkers(positions, type) {
                for (let position of positions) {
                    this.placeMarker(position, type);
                }
            },
            placeMarker(position, type) {
                let marker = L.marker([position.lat, position.lng], {draggable: true});
                marker.setIcon(L.icon(type.determineIcon(position)));
                marker.on('mousedown', () => { this.popup.open = false; })
                marker.on('dragend', e => this.markerMoved(e, position, type));
                marker.on('click', e => this.openPopup(e, position, type));
                marker.addTo(this.map);

                this.placed[position.id] = marker;
            },
            openPopup(event, position, type) {
                console.log(this.map);
                let marker = event.target;
                let point = this.map.latLngToContainerPoint(marker.getLatLng()).round();
                this.popup.open = true;
                this.popup.position = position;
                this.popup.type = type;
                this.popup.x = point.x + POPUP_OFFSET.x;
                this.popup.y = point.y + POPUP_OFFSET.y;
            },
            async markerMoved(event, position, type) {
                let {lat, lng} = event.target.getLatLng();
                position.lat = lat;
                position.lng = lng;
                if (type.label === battleType.label) {
                    position.battle.place = (await reverseGeoCode(lat, lng)).display_name;
                    this.updateBattlePosition(position);
                }
                else if (type.label === militaryLeaderType.label) {
                    position.militaryLeader.birthPlace = (await reverseGeoCode(lat, lng)).display_name;
                    this.updateMilitaryLeaderPosition(position);
                }

            },
            resetMap() {

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
            this.map.on('zoomstart', () => {this.popup.open = false;});

            this.map.on('mousedown', () => {this.popup.open = false;});
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
