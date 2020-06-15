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
                <position-popup/>
            </div>
        </drop>

    </v-container>
</template>

<script>
    require('leaflet/dist/leaflet.css');
    import L from 'leaflet';
    import 'leaflet.markercluster/dist/leaflet.markercluster';
    import {mapActions, mapMutations, mapState} from "vuex";
    import {reverseGeoCode} from "../../utils/geoCoding";
    import {battleType, militaryLeaderType} from "../../utils/types";
    import PositionPopup from "./PositionPopup";
    import {Drop} from 'vue-easy-dnd';
    import Vue from 'vue';

    require('leaflet.markercluster/dist/MarkerCluster.css');
    require('leaflet.markercluster/dist/MarkerCluster.Default.css');
    const POPUP_OFFSET = {x: 25, y: 12};
    export default {
        name: "MapView",
        components: {PositionPopup, Drop},
        data: () => ({
            mapOptions: null,
            tileLayer: null,
            placed: {},
            markerCluster: null,
            line: {
                militaryLeader: null,
                battle: null,
                elementMilitaryLeader: null,
                elementBattle: null
            },
            disconnectLine: {
                militaryLeader: null,
                battle: null,
                elementMilitaryLeader: null,
                elementBattle: null
            },
        }),
        props: {
            mapId: {
                type: String,
                default() {
                    return 'map';
                }
            }
        },
        computed: {
            ...mapState('positions',
                [
                    'militaryLeaderPositions',
                    'battlePositions',
                    'updatedMilitaryLeader',
                    'updatedBattle',
                ]),
            ...mapState('militaryLeaderBattles', ['militaryLeaderBattles']),
            ...mapState('map',
                [
                    'mapCode',
                    'mapObj',
                    'lineAdding',
                    'lineRemoving',
                    'searchQuery'
                ]),
            ...mapState('positionPopup', ['popup']),

            map: {
                get() {
                    return this.$store.state.map.map;
                },
                set(val) {
                    this.$store.commit('map/setMap', val);
                }
            }
        },
        watch: {
            mapCode(newCode) {
                this.getMapByName(newCode);
            },
            mapObj(newVal, oldVal) {
                if(!oldVal || !newVal) return;
                console.info("CLEARING THE MAP");
                this.clearMap();
                this.setup();
            },
            searchQuery(val) {
                console.info("CLEARING MAP");
                this.clearMap();
                if(val) {
                    this.setup(val);
                } else {
                    this.setup();
                }
            },
            updatedMilitaryLeader(newVal) {
                if (!newVal) return;
                let marker = this.placed[militaryLeaderType.label + newVal.militaryLeader.id].marker;
                this.markerCluster.removeLayer(marker);
                marker.remove();
                let oldEdges = this.placed[militaryLeaderType.label + newVal.militaryLeader.id].edges;
                this.placeMarker(newVal, militaryLeaderType);
                this.placed[militaryLeaderType.label + newVal.militaryLeader.id].edges = oldEdges;
                this.$store.commit('positions/resetUpdatedMilitaryLeader');
            },
            updatedBattle(newVal) {
                if (!newVal) return;
                let marker = this.placed[battleType.label + newVal.battle.id].marker;
                this.markerCluster.removeLayer(marker);
                marker.remove();
                let oldEdges = this.placed[battleType.label + newVal.battle.id].edges;
                this.placeMarker(newVal, battleType);
                this.placed[battleType.label + newVal.battle.id].edges = oldEdges;
                this.$store.commit('positions/resetUpdatedBattle')
            },
            lineAdding(val) {
                if(!val) {
                    this.line.elementMilitaryLeader?.classList.remove('outlined');
                    this.line.elementBattle?.classList.remove('outlined');
                    this.line = {
                        militaryLeader: null,
                        battle: null,
                        elementMilitaryLeader: null,
                        elementBattle: null
                    };
                }
            },
            lineRemoving(val) {
                if(!val) {
                    this.disconnectLine.elementMilitaryLeader?.classList.remove('outlined');
                    this.disconnectLine.elementBattle?.classList.remove('outlined');
                    this.disconnectLine = {
                        militaryLeader: null,
                        battle: null,
                        elementMilitaryLeader: null,
                        elementBattle: null
                    };
                }
            },
            'militaryLeaderPositions.length'(newLength, oldLength) {
                // Proverava velicinu pozicija i na taj nacin se abdejtuje
                if (oldLength === 0)
                    this.placeMarkers(this.militaryLeaderPositions, militaryLeaderType);
                else if (newLength === 0 && !this.$store.state.positions.recentlyDeleted) {
                    return;
                }
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
                else if (newLength === 0 && !this.$store.state.positions.recentlyDeleted) {
                    return;
                }
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
                else if (newLength === 0 && !this.$store.state.militaryLeaderBattles.recentlyDeleted) {
                    return;
                }
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
            ...mapMutations('positions', ['clearAllPositions']),
            ...mapMutations('militaryLeaderBattles', ['clearAllMilitaryLeaderBattles']),
            ...mapMutations('existingPositionDialog', ['setEntity', 'setShowDialog']),
            ...mapMutations('positionPopup', ['setPopup', 'setOpenPopup']),
            ...mapActions('positions',
                [
                    'getMilitaryLeaderPositions',
                    'getBattlePositions',
                    'updateBattlePosition',
                    'updateMilitaryLeaderPosition',
                    'addMilitaryLeaderPosition',
                    'addBattlePosition',
                    'searchPositions'
                ]),
            ...mapActions('militaryLeaderBattles',
                [
                    'getMilitaryLeaderBattlesByMap',
                    'addMilitaryLeaderBattle',
                    'deleteMilitaryLeaderBattle',
                    'searchMilitaryLeaderBattles'
                ]),
            ...mapActions('map',
                [
                    'getMapByName'
                ]),


            determineInitials(data) {
                // odredjuju se inicijali za drop
                if (data.type.label === militaryLeaderType.label) {
                    return `${data.firstName[0].toUpperCase()}${data.lastName[0].toUpperCase()}`
                } else {
                    return `${data.name[0].toUpperCase()}`;
                }
            },
            determineImageUrl(data) {
                // odredjuje se slika
                if (data.type.label === militaryLeaderType.label) {
                    if (data.imageUrl)
                        return data.imageUrl;
                } else {
                    if (data.iconUrl)
                        return data.iconUrl;
                    else return "../../assets/defaultIcons/battle.png";
                }
            },
            clicked(event, position, type) {
                if (this.lineRemoving) {
                    this.disconnectTwo(event, position, type)
                } else if (this.lineAdding) {
                    this.connectTwo(event, position, type);
                } else if (event.originalEvent.altKey && event.originalEvent.ctrlKey) {
                    this.disconnectTwo(event, position, type)
                } else if (event.originalEvent.ctrlKey) {
                    this.connectTwo(event, position, type);
                } else this.openPopup(event, position, type);
            },
            disconnectTwo(event, position, type) {
                if(type.label === militaryLeaderType.label) {
                    this.disconnectLine.militaryLeader = position;
                    this.disconnectLine.elementMilitaryLeader?.classList.remove('outlined');
                    let element = event.target.getElement();
                    element.classList.add('outlined');
                    this.disconnectLine.elementMilitaryLeader = element;
                    event.target.update();
                } else {
                    this.disconnectLine.battle = position;
                    this.disconnectLine.elementBattle?.classList.remove('outlined');
                    let element = event.target.getElement();
                    element.classList.add('outlined');
                    this.disconnectLine.elementBattle = element;
                    event.target.update();
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

                    this.disconnectLine.elementMilitaryLeader?.classList.remove('outlined');
                    this.disconnectLine.elementBattle?.classList.remove('outlined');

                    this.disconnectLine = {
                        militaryLeader: null,
                        battle: null,
                        elementMilitaryLeader: null,
                        elementBattle: null
                    };
                }
            },
            connectTwo(event, position, type) {
                if (type.label === militaryLeaderType.label) {
                    this.line.militaryLeader = position;
                    this.line.elementMilitaryLeader?.classList.remove('outlined');
                    let element = event.target.getElement();
                    element.classList.add('outlined');
                    this.line.elementMilitaryLeader = element;
                    event.target.update();
                } else if (type.label === battleType.label) {
                    this.line.battle = position;
                    this.line.elementBattle?.classList.remove('outlined');
                    let element = event.target.getElement();
                    element.classList.add('outlined');
                    this.line.elementBattle = element;
                    event.target.update();

                }
                if (this.line.militaryLeader && this.line.battle) {

                    // todo: ovo ne znam hoce li trebat
                    const connection = {
                        battleId: this.line.battle.battle.id,
                        militaryLeaderId: this.line.militaryLeader.militaryLeader.id
                    };
                    this.addMilitaryLeaderBattle(connection);

                    // anuliranje

                    this.line.elementMilitaryLeader?.classList.remove('outlined');
                    this.line.elementBattle?.classList.remove('outlined');

                    this.line = {
                        militaryLeader: null,
                        battle: null,
                        elementMilitaryLeader: null,
                        elementBattle: null
                    };
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
                // marker.on('mousedown', () => { this.setOpenPopup(false); });
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
                this.setPopup({
                    open: true,
                    position,
                    type,
                    x: point.x + POPUP_OFFSET.x,
                    y: point.y + POPUP_OFFSET.y
                });
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
            async checkDrop(data) {
                try {
                    const {data: existing} = await Vue.$axios.get(`${data.type.label}MapPosition/check/${data.id}/mapNot/${this.mapObj.id}`);
                    return existing;
                } catch(err) {
                    return null;
                }
            },
            async dropped(event) {
                let existing = await this.checkDrop(event.data);
                let point = L.point(event.position.x, event.position.y);
                let latLng = this.map.containerPointToLatLng(point);
                let address = (await reverseGeoCode(latLng.lat, latLng.lng)).display_name;
                if(existing) {
                    let oldPosition = {
                        lng: existing.lng,
                        lat: existing.lat,
                        map: this.mapObj,
                    };
                    let newPosition = {
                        lng: latLng.lng,
                        lat: latLng.lat,
                        map: this.mapObj,
                        address: address,
                    };
                    if(event.data.type.label === militaryLeaderType.label) {
                        oldPosition.address = event.data.birthPlace;
                        oldPosition.militaryLeader = event.data;
                        newPosition.militaryLeader = event.data;
                    } else {
                        oldPosition.address = event.data.place;
                        oldPosition.battle = event.data;
                        newPosition.battle = event.data;
                    }
                    this.setEntity({
                        entity: event.data,
                        type: event.data.type,
                        newPosition,
                        oldPosition
                    });
                    this.setShowDialog(true);
                    return;
                }

                if(event.data.type.label === militaryLeaderType.label) {
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
            async getPositions() {
                // obe vrste pozicija dobijamo po imenu mape
                await this.getMilitaryLeaderPositions(this.mapCode);
                await this.getBattlePositions(this.mapCode);
            },
            async getConnections() {
                await this.getMilitaryLeaderBattlesByMap(this.mapObj.id)
            },
            async setup(searchQuery) {
                if (!searchQuery){
                    await this.getPositions();
                    await this.getConnections();
                } else {
                    await this.searchPositions({mapCode: this.mapCode, searchQuery});
                    const militaryLeaderIds = this.militaryLeaderPositions.map(mlp => mlp.militaryLeader.id);
                    const battleIds = this.battlePositions.map(bp => bp.battle.id);
                    await this.searchMilitaryLeaderBattles({mapId: this.mapObj.id, militaryLeaderIds, battleIds});
                }
            },
            createMap() {
                if(!this.mapOptions) {
                    console.error("There aren't any map options defined");
                    return;
                }

                // kreiranje mape
                this.map = L.map(this.mapId, this.mapOptions).setView([0, 0], 3);

                // kontrola dolje desno
                // this.map.addControl(L.control.zoom({position: 'bottomright'}));

                // gasi se popup kad se zumira ili pritisne nedje
                this.map.on('zoomstart', () => {this.setOpenPopup(false);});
                // this.map.on('mousedown', () => {this.setOpenPopup(false);}); // odradjeno u cijeloj aplikaciji

                // opcije za tilelayer
                let options = {
                    maxZoom: 19,
                    noWrap: true
                };
                this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options)
                    .addTo(this.map);
            },
            clearMap() {
                this.clearMapLayer();
                this.clearAllPositions();
                this.clearAllMilitaryLeaderBattles();
            },
            clearMapLayer() {
                this.placed = {};
                this.markerCluster.clearLayers();
                this.map.remove();
                this.createMap();
                this.map.addLayer(this.markerCluster);
            }

        },
        created() {
            window.addEventListener('keyup', e => {
                if(e.code === 'ControlLeft') {
                    this.line.elementMilitaryLeader?.classList.remove('outlined');
                    this.line.elementBattle?.classList.remove('outlined');
                    this.disconnectLine.elementMilitaryLeader?.classList.remove('outlined');
                    this.disconnectLine.elementBattle?.classList.remove('outlined');
                    this.line = {
                        militaryLeader: null,
                        battle: null,
                        elementMilitaryLeader: null,
                        elementBattle: null
                    };
                    this.disconnectLine = {
                        militaryLeader: null,
                        battle: null,
                        elementMilitaryLeader: null,
                        elementBattle: null
                    };
                } else if (e.code === 'AltLeft') {
                    this.disconnectLine.elementMilitaryLeader?.classList.remove('outlined');
                    this.disconnectLine.elementBattle?.classList.remove('outlined');
                    this.disconnectLine = {
                        militaryLeader: null,
                        battle: null,
                        elementMilitaryLeader: null,
                        elementBattle: null
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
            this.mapOptions = {
                attributionControl: false,
                zoomControl: false,
                maxBounds,
                maxBoundsViscosity: 1.0,
                minZoom: 3,
            };

            this.createMap();

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
    .avatar-circle {
        background-color: rebeccapurple;
        text-align: center;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
    }
    .initials {
        position: relative;
        /*posto su velicine ionako zakucane za ikonice*/
        top: 8px; /* 25% of parent */
        font-size: 15px; /* 50% of parent */
        line-height: 15px; /* 50% of parent */
        color: #fff;
    }
    @media screen and (max-width: 750px) {
        .leaflet-control-zoom {
            display: none;
        }
    }
    .leaflet-marker-icon {
        outline: none;
        transition: all .5s;
        transition-property: height, width, left, top;
    }
    .leaflet-marker-icon > img {
        transition: all .5s;

    }
    .leaflet-marker-icon > .initials {
        transition: all .5s;

    }
    .outlined {
        height: 40px !important;
        width: 40px !important;
        left: -5px;
        top: -5px;
        transition: all .5s;
        transition-property: height, width, left, top;

    }
    .outlined > .initials {
        top: 13px;
        transition: all .5s;
    }
    .outlined > img {
        height: 40px !important;
        width: 40px !important;
        transition: all .5s;
    }
</style>
