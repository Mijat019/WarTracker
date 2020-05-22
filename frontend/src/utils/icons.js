const battleIconUrl = require("../assets/defaultIcons/battle.png");
const militaryLeaderIconUrl = require("../assets/defaultIcons/militaryLeader.png");

export const battleIconOptions = {
    iconUrl: battleIconUrl,
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15],
    popupAnchor: [0, 0],
};

export const militaryLeaderIconOptions = {
    iconUrl: militaryLeaderIconUrl,
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15],
    popupAnchor: [0, 0],
};

export const customIconOptions = url => ({
    iconUrl: require('../assets/defaultIcons/' + url),
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15],
    popupAnchor: [0, 0],
});
