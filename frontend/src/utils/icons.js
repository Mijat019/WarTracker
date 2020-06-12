const battleUrl = require('../assets/defaultIcons/battle.png');
const militaryLeaderUrl = require('../assets/defaultIcons/militaryLeader.png');
export const battleIconOptions = {
    html: `<img style="height: 30px; width: 30px;" src="${battleUrl}" alt="battle-icon"/>`,
    className: 'div-icon',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15],
    popupAnchor: [0, 0],
};

export const militaryLeaderIconOptions = initials => ({
    html: `<span class="initials">${initials}</span>`,
    className: 'avatar-circle',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15],
    popupAnchor: [0, 0],
});

export const customIconOptions = url => ({
    html: `<img style="height: 30px; width: 30px;  border-radius: 50%;" src="${url}" alt="military-icon"/>`,
    className: 'div-icon',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15],
    popupAnchor: [0, 0],
});
