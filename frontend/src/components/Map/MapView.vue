<template>
    <v-container
            fluid
            class="ma-0 pa-0"
            style="min-height:100vh;"
    >

        <drop @drop="dropped">
            <template v-slot:drag-image="{data}">
                <v-avatar color="pink" style="transform: translate(-50%, -50%);">
                    <span class="white--text headline">{{determineInitials(data)}}</span>
                </v-avatar>
            </template>
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
        </drop>

    </v-container>
</template>

<script>
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';
    import {mapActions, mapState} from "vuex";
    import {reverseGeoCode} from "../../utils/geoCoding";
    import {battleType, militaryLeaderType} from "../../utils/types";
    import PositionPopup from "./PositionPopup";
    import {Drop} from 'vue-easy-dnd';
    const POPUP_OFFSET = {x: 25, y: 12};
    const militaryLeaderIconUrl = require('../../assets/defaultIcons/militaryLeader.png');
    export default {
        name: "MapView",
        components: {PositionPopup, Drop},
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
            ...mapState('positions', ['militaryLeaderPositions', 'battlePositions']),
            mapObj() {
                return this.$store.state.positions.map;
            }
        },
        watch: {
            mapCode(newCode) {
                this.getMapByName(newCode);
            },
            'militaryLeaderPositions.length'(newLength, oldLength) {
                if (oldLength === 0)
                    this.placeMarkers(this.militaryLeaderPositions, militaryLeaderType);
                else if (newLength > oldLength) { // dodat military leader
                    let added = this.militaryLeaderPositions
                        .filter(el => !((militaryLeaderType.label + el.id) in this.placed)); // nema ga u postavljenim markerima
                    this.placeMarkers(added, militaryLeaderType);
                }
            },

            'battlePositions.length'(newLength, oldLength) {
                if(oldLength === 0)
                    this.placeMarkers(this.battlePositions, battleType);
                else if (newLength > oldLength){
                    let added = this.battlePositions.filter(el => !((battleType.label + el.id) in this.placed));
                    this.placeMarkers(added, battleType);
                }
            }
        },
        methods: {
            ...mapActions('positions',
                [
                    'getMilitaryLeaderPositions',
                    'getBattlePositions',
                    'updateBattlePosition',
                    'updateMilitaryLeaderPosition',
                    'addMilitaryLeaderPosition',
                    'addBattlePosition',
                    'getMapByName'
                ]),
            determineInitials(data) {
                // odredjuju se inicijali za drop
                if (data.type === militaryLeaderType.label) {
                    return `${data.firstName[0].toUpperCase()}${data.lastName[0].toUpperCase()}`
                } else {
                    return `${data.name[0].toUpperCase()}`;
                }
            },
            determineImageUrl(data) {
                // odredjuje se slika
                if (data.type === militaryLeaderType.label) {
                    if (data.imageUrl)
                        return data.imageUrl;
                    else {
                        console.log(militaryLeaderIconUrl);
                        return militaryLeaderIconUrl;
                    }
                } else {
                    if (data.iconUrl)
                        return data.iconUrl;
                    else return "../../assets/defaultIcons/battle.png";
                }
            },
            placeMarkers(positions, type) {
                // postavljaju se markeri za sve pozicije
                for (let position of positions) {
                    this.placeMarker(position, type);
                }
            },
            placeMarker(position, type) {
                // postavimo marker na odredjenu lokaciju sa odredjenom ikonicom
                let marker = L.marker([position.lat, position.lng], {draggable: true});
                marker.setIcon(L.icon(type.determineIcon(position)));
                marker.on('mousedown', () => { this.popup.open = false; });
                marker.on('dragend', e => this.markerMoved(e, position, type));
                marker.on('click', e => this.openPopup(e, position, type));
                marker.addTo(this.map);

                this.placed[type.label + position.id] = marker;
            },
            openPopup(event, position, type) {
                // otvaranje popupa na klik
                let marker = event.target;
                let point = this.map.latLngToContainerPoint(marker.getLatLng()).round();
                this.popup.open = true;
                this.popup.position = position;
                this.popup.type = type;
                this.popup.x = point.x + POPUP_OFFSET.x;
                this.popup.y = point.y + POPUP_OFFSET.y;
            },
            async markerMoved(event, position, type) {
                // na pomeranje markera
                let {lat, lng} = event.target.getLatLng();

                // ako nema adrese onda se vrati na predjasnju lokaciju
                let address = (await reverseGeoCode(lat, lng)).display_name;
                if(!address) {
                    event.target.setLatLng([position.lat, position.lng]);
                    this.$store.commit('snackbar/openSnackbar', 'A marker cannot be placed on water.');
                    return;
                }
                // update pozicija u bazi
                position.lat = lat;
                position.lng = lng;
                if (type.label === battleType.label) {
                    position.battle.place = address;
                    this.updateBattlePosition(position);
                }
                else if (type.label === militaryLeaderType.label) {
                    position.militaryLeader.birthPlace = address;
                    this.updateMilitaryLeaderPosition(position);
                }

            },
            async dropped(event) {
                // kad dropujemo
                let point = L.point(event.position.x, event.position.y);
                let latLng = this.map.containerPointToLatLng(point);
                let address = (await reverseGeoCode(latLng.lat, latLng.lng)).display_name;
                if(!address) {
                    this.$store.commit('snackbar/openSnackbar', 'A marker cannot be placed on water.');
                    return;
                }
                if(event.data.type === militaryLeaderType.label) {
                    let position = {
                        lng: latLng.lng,
                        lat: latLng.lat,
                        map: this.mapObj,
                        militaryLeader: event.data
                    };
                    position.militaryLeader.birthPlace = address;
                    this.addMilitaryLeaderPosition(position);
                } else {
                    let position = {
                        lng: latLng.lng,
                        lat: latLng.lat,
                        map: this.mapObj,
                        battle: event.data
                    };
                    position.battle.place = address;
                    this.addBattlePosition(position);
                }
            },
            resetMap() {

            },
            getPositions() {
                // obe vrste pozicija dobijamo po imenu mape
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
            // Granice skrolovanja
            const corner1 = L.latLng(-90, -180);
            const corner2 = L.latLng(90, 180);
            const maxBounds = L.latLngBounds(corner1, corner2);

            // postavljanje opcija
            let mapOptions = {
                zoomControl: false,
                maxBounds,
                maxBoundsViscosity: 1.0,
                minZoom: 3,
            };

            // kreiranje mape
            this.map = L.map(this.mapId, mapOptions).setView([0, 0], 3);

            // kontrola dolje desno
            this.map.addControl(L.control.zoom({position: 'bottomright'}));

            // gasi se popup kad se zumira ili pritisne nedje
            this.map.on('zoomstart', () => {this.popup.open = false;});
            this.map.on('mousedown', () => {this.popup.open = false;});

            // opcije za tilelayer
            let options = {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                noWrap: true
            };
            this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options)
                .addTo(this.map);
            this.$nextTick(() => this.map.invalidateSize());

            // trazimo mapu
            this.getMapByName(this.mapCode);
            // postavljamo pozicije
            this.getPositions();
        },
        updated() {
            // invalidacija velicine na abdejt
            // this.$nextTick(() => this.map.invalidateSize());
        },

    }
</script>

<style></style>
