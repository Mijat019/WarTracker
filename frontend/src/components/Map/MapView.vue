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
    require('leaflet/dist/leaflet.css');
    import L from 'leaflet';
    require('leaflet.markercluster/dist/MarkerCluster.css');
    require('leaflet.markercluster/dist/MarkerCluster.Default.css');
    import 'leaflet.markercluster/dist/leaflet.markercluster';
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
            markerCluster: null,
            popup: {
                open: false,
                x: 0,
                y: 0,
                position: null,
                type: null
            },
            line: {
                militaryLeader: null,
                battle: null
            },
            disconnectLine: {
                militaryLeader: null,
                battle: null
            }
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
            ...mapState('militaryLeaderBattles', ['militaryLeaderBattles']),
            mapObj() {
                return this.$store.state.positions.map;
            }
        },
        watch: {
            mapCode(newCode) {
                // Nalazi mapu u bazi po zadatom imenu mape
                this.getMapByName(newCode);
            },
            'militaryLeaderPositions.length'(newLength, oldLength) {
                // Proverava velicinu pozicija i na taj nacin se abdejtuje
                if (oldLength === 0)
                    this.placeMarkers(this.militaryLeaderPositions, militaryLeaderType);
                else if (newLength > oldLength) { // dodat military leader
                    let added = this.$store.state.positions.newlyAdded;
                    this.placeMarkers([].concat(added), militaryLeaderType);
                    this.$store.commit('positions/resetAdded');
                } else if (oldLength > newLength) {
                    let deleted = this.$store.state.positions.recentlyDeleted;
                    this.removeMarker(deleted, militaryLeaderType);
                    this.$store.commit('positions/resetDeleted');
                }
            },

            'battlePositions.length'(newLength, oldLength) {
                // Proverava velicinu pozicija i na taj nacin se abdejtuje
                if(oldLength === 0)
                    this.placeMarkers(this.battlePositions, battleType);
                else if (newLength > oldLength){
                    let added = this.$store.state.positions.newlyAdded;
                    this.placeMarkers([].concat(added), battleType);
                    this.$store.commit('positions/resetAdded');
                } else if (oldLength > newLength) {
                    let deleted = this.$store.state.positions.recentlyDeleted;
                    this.removeMarker(deleted, battleType);
                    this.$store.commit('positions/resetDeleted');
                }
            },
            'militaryLeaderBattles.length'(newLength, oldLength) {
                if(oldLength === 0)
                    this.placeLines(this.militaryLeaderBattles);
                else if (newLength > oldLength) {
                    let added = this.$store.state.militaryLeaderBattles.newlyAdded;
                    this.placeLines([].concat(added));
                    this.$store.commit('militaryLeaderBattles/resetAdded');
                } else if (oldLength > newLength) {
                    let deleted = this.$store.state.militaryLeaderBattles.recentlyDeleted;
                    this.removeLines([].concat(deleted));
                    this.$store.commit('militaryLeaderBattles/resetDeleted');
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
            ...mapActions('militaryLeaderBattles',
                [
                    'getMilitaryLeaderBattlesByMap',
                    'addMilitaryLeaderBattle',
                    'deleteMilitaryLeaderBattle'
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
            clicked(event, position, type) {
                if (event.originalEvent.altKey && event.originalEvent.ctrlKey) {
                    this.disconnectTwo(event, position, type)
                } else if (event.originalEvent.ctrlKey) {
                    this.connectTwo(event, position, type);
                } else this.openPopup(event, position, type);
            },
            disconnectTwo(event, position, type) {
                if(type.label === militaryLeaderType.label) {
                    this.disconnectLine.militaryLeader = position;
                } else {
                    this.disconnectLine.battle = position;
                }
                if (this.disconnectLine.militaryLeader && this.disconnectLine.battle) {
                    let { edges } = this.placed[militaryLeaderType.label + this.disconnectLine.militaryLeader.militaryLeader.id];
                    let edge = edges.find(edge => edge.to.id === this.disconnectLine.battle.id);
                    if(!edge) {
                        this.$store.commit('snackbar/openSnackbar',
                            {text: `There isn't any connection between selected entities`, color: 'error'});
                    } else {
                        this.deleteMilitaryLeaderBattle(edge);
                    }
                    // for the sake of equality and standard, we are gonna do it like this
                    // even though it's slower and more complicated

                    this.disconnectLine.militaryLeader = null;
                    this.disconnectLine.battle = null;
                }
            },
            connectTwo(event, position, type) {
                if (type.label === militaryLeaderType.label) {
                    this.line.militaryLeader = position;
                } else if (type.label === battleType.label) {
                    this.line.battle = position;
                }
                if (this.line.militaryLeader && this.line.battle) {

                    // todo: ovo ne znam hoce li trebat
                    const connection = {
                        battleId: this.line.battle.battle.id,
                        militaryLeaderId: this.line.militaryLeader.militaryLeader.id
                    };
                    this.addMilitaryLeaderBattle(connection);

                    // anuliranje
                    this.line.militaryLeader = null;
                    this.line.battle = null;
                }
            },
            removeLines(militaryLeaderBattles) {
                for(let militaryLeaderBattle of militaryLeaderBattles) {
                    this.removeLine(militaryLeaderBattle);
                }
            },
            removeLine(militaryLeaderBattle) {
                let leaderPlaced = this.placed[militaryLeaderType.label + militaryLeaderBattle.militaryLeaderId];
                for (let [i, edge] of leaderPlaced.edges.entries()) {
                    if (edge.id === militaryLeaderBattle.id) {
                        edge.line.remove(this.map);
                        leaderPlaced.edges.splice(i, 1);
                        break;
                    }
                }
                let battlePlaced =  this.placed[battleType.label + militaryLeaderBattle.battleId];
                for (let [i, edge] of battlePlaced.edges.entries()) {
                    if (edge.id === militaryLeaderBattle.id) {
                        battlePlaced.edges.splice(i, 1);
                        break;
                    }
                }
            },
            placeLines(militaryLeaderBattles) {
                for (let militaryLeaderBattle of militaryLeaderBattles) {
                    let mlPlaced = this.placed[militaryLeaderType.label + militaryLeaderBattle.militaryLeaderId].element;
                    let baPlaced = this.placed[battleType.label + militaryLeaderBattle.battleId].element;
                    this.placeLine(militaryLeaderBattle.id, mlPlaced, baPlaced);
                }
            },
            placeLine(id, militaryLeaderPosition, battlePosition) {
                let line = L.polyline([
                    [militaryLeaderPosition.lat, militaryLeaderPosition.lng], // nulti je ml
                    [battlePosition.lat, battlePosition.lng] // prvi je bitka
                ]);
                line.addTo(this.map);
                this.placed[battleType.label + battlePosition.battle.id].edges.push({
                    id,
                    line,
                    to: militaryLeaderPosition
                });
                this.placed[militaryLeaderType.label + militaryLeaderPosition.militaryLeader.id].edges.push({
                    id,
                    line,
                    to: battlePosition
                });
            },
            removeMarker(position, type) {
                let id = type.label === battleType.label ? position.battle.id : position.militaryLeader.id;
                let placed = this.placed[type.label + id];
                this.markerCluster.removeLayer(placed.marker);
                this.$store.commit('militaryLeaderBattles/deleteMultiple', placed.edges);
                delete placed[type.label + id];
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
                marker.setIcon(L.divIcon(type.determineIcon(position)));
                marker.on('mousedown', () => { this.popup.open = false; });
                marker.on('dragend', e => this.markerMoved(e, position, type));
                marker.on('drag', e => this.markerMoving(e, position, type));
                marker.on('click', e => this.clicked(e, position, type));
                this.markerCluster.addLayer(marker);
                // marker.addTo(this.map);
                let id = type.label === battleType.label ? position.battle.id : position.militaryLeader.id;
                this.placed[type.label + id] = {
                    element: position,
                    marker,
                    edges: []
                };
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
            setEdgesCoordinates(position, type, lat, lng){
                let id = type.label === battleType.label ? position.battle.id : position.militaryLeader.id;

                this.placed[type.label + id].edges.forEach(edge => {
                    let line = edge.line;
                    let latLngs = line.getLatLngs();
                    let index = type.label === militaryLeaderType.label ? 0 : 1;
                    latLngs[index] = [lat, lng];
                    line.setLatLngs(latLngs);
                });
            },
            markerMoving(event, position, type) {
                let {lat, lng} = event.target.getLatLng();
                this.setEdgesCoordinates(position, type, lat, lng);
            },
            async markerMoved(event, position, type) {
                // na pomeranje markera
                let {lat, lng} = event.target.getLatLng();
                let [oldLat, oldLng] = [position.lat, position.lng];
                // ako nema adrese onda se vrati na predjasnju lokaciju
                let address = (await reverseGeoCode(lat, lng)).display_name;

                this.setEdgesCoordinates(position, type, lat, lng);
                if (type.label === battleType.label) {
                    // update pozicija u bazi
                    position.lat = lat;
                    position.lng = lng;
                    if(!address) {
                        address = 'Ocean';
                        this.$store.commit('snackbar/openSnackbar', {
                            text: 'Warning: Battle was placed on international waters.',
                            color: 'deep-orange'
                        });
                    }
                    position.battle.place = address;
                    this.updateBattlePosition(position);
                }
                else if (type.label === militaryLeaderType.label) {
                    if(!address) {
                        event.target.setLatLng([oldLat, oldLng]);
                        this.setEdgesCoordinates(position, type, oldLat, oldLng);
                        this.$store.commit('snackbar/openSnackbar', {text: 'A military leader cannot be placed on international waters.', color: 'error'});
                        return;
                    }
                    // update pozicija u bazi
                    position.lat = lat;
                    position.lng = lng;
                    position.militaryLeader.birthPlace = address;
                    this.updateMilitaryLeaderPosition(position);
                }

            },
            async dropped(event) {
                // kad dropujemo
                let point = L.point(event.position.x, event.position.y);
                let latLng = this.map.containerPointToLatLng(point);
                let address = (await reverseGeoCode(latLng.lat, latLng.lng)).display_name;
                if(event.data.type === militaryLeaderType.label) {
                    if(!address) {
                        this.$store.commit('snackbar/openSnackbar', {text: 'A military leader cannot be placed on international waters.', color: 'error'});
                        return;
                    }
                    let position = {
                        lng: latLng.lng,
                        lat: latLng.lat,
                        map: this.mapObj,
                        militaryLeader: event.data
                    };
                    position.militaryLeader.birthPlace = address;
                    this.addMilitaryLeaderPosition(position);
                } else {
                    if(!address) {
                        this.$store.commit('snackbar/openSnackbar', {text: 'Warning: Battle was placed on international waters.', color: 'dark-orange'});
                    }
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
            async getPositions() {
                // obe vrste pozicija dobijamo po imenu mape
                await this.getMilitaryLeaderPositions(this.mapCode);
                await this.getBattlePositions(this.mapCode);
            },
            async getConnections() {
                await this.getMilitaryLeaderBattlesByMap(this.mapObj.id)
            },
            async setup() {
                await this.getPositions();
                await this.getConnections();
            }

        },
        created() {
            window.addEventListener('keyup', e => {
                if(e.code === 'ControlLeft') {
                    this.line = {
                        militaryLeader: null,
                        battle: null
                    };
                    this.disconnectLine = {
                        militaryLeader: null,
                        battle: null
                    };
                } else if (e.code === 'AltLeft') {
                    this.disconnectLine = {
                        militaryLeader: null,
                        battle: null
                    }
                }
            });
        },
        mounted() {

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

            this.markerCluster = L.markerClusterGroup({
                maxClusterRadius: 30
            });

            this.map.addLayer(this.markerCluster);

            this.$nextTick(() => this.map.invalidateSize());

            // trazimo mapu
            this.getMapByName(this.mapCode);
            // postavljamo pozicije

            this.setup();
        },
        updated() {
            // invalidacija velicine na abdejt
            // this.$nextTick(() => this.map.invalidateSize());
        },
        destroyed() {
        }
    }
</script>

<style>
    .div-icon {
    }
</style>
