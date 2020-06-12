import Vue from "vue";

const MapModule = {
    namespaced: true,
    state: {
        mapObj: null,
        map: null,
        mapCode: 'map1'
    },

    mutations: {
        setMapObj(state, mapObj) {
            state.mapObj = mapObj;
        },
        setMap(state, map) {
            state.map = map;
        },
        setMapCode(state, mapCode) {
            state.mapCode = mapCode;
        }
    },
    actions: {
        async getMapByName({ commit }, mapCode) {
            try {
                let {data: map} = await Vue.$axios.get(`/map/mapName=${mapCode}`);
                commit("setMapObj", map);
            } catch(err) {
                console.log(`An error occurred getting map by name: ${err}`);
            }
        },
    },
    getters: {
        mapNumber(state) {
            return state.map.name;
        }
    }
};

export default MapModule;
