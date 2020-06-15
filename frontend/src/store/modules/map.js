import Vue from "vue";

const MapModule = {
    namespaced: true,
    state: {
        mapObj: null,
        map: null,
        mapCode: "map1",
        lineAdding: false,
        lineRemoving: false,
        searchQuery: "",
        filterOptions: null
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
        },
        zoomOut(state) {
            state.map.zoomOut();
        },
        zoomIn(state) {
            state.map.zoomIn();
        },
        setLineAdding(state, val) {
            state.lineAdding = val;
            if (val) state.lineRemoving = !val;
        },
        setLineRemoving(state, val) {
            state.lineRemoving = val;
            if (val) state.lineAdding = !val;
        },
        setSearch(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setFilter(state, filterObj) {
            state.filterOptions = filterObj;
        }
    },
    actions: {
        async getMapByName({ commit }, mapCode) {
            try {
                let { data: map } = await Vue.$axios.get(
                    `/map/mapName=${mapCode}`
                );
                commit("setMapObj", map);
            } catch (err) {
                console.log(`An error occurred getting map by name: ${err}`);
            }
        },
    },
    getters: {
        isMaxZoom(state) {
            if (!state.map) return false;
            return state.map.getZoom() === state.map.getMaxZoom();
        },
        isMinZoom(state) {
            if (!state.map) return false;
            return state.map.getZoom() === state.map.getMinZoom();
        },

        mapObj: (state) => state.mapObj,

        getSearch: (state) => state.searchQuery,
    },
};

export default MapModule;
