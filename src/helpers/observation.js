export const Tabs = {
    ObservationImages: "ObservationImages",
    DateTimeLocation: "DateTimeLocation",
    EquipmentDetails: "EquipmentDetails",
}

export const MultiImageTabs = {
    MultipleImages: "MultipleImages",
    ImageSequence: "ImageSequence"
}

export const imageDetails = {
    Details: "Details",
    Equipment: "Equipment",
    Comments: "Comments",
}

export const obvType = {
    default: "verified",
    verified: "verified",
    unverified: "unverified",
    denied: "denied",
    draft: "draft"
}

export const masonryConfig = (selector, width, gutter, fit = false, transition) => {
    return {
        columnWidth: width,
        gutter: gutter,
        itemSelector: selector,
        fitWidth: false,
        transitionDuration: transition,
    }
}

export const uploadImageDefaultState = (random, baseImage, item, userLocation) => {
    return {
        id: random,
        sameAsFirstMap: false,
        sameAsFirstDate: false,
        image: baseImage,
        lastModified: item?.lastModified,
        name: item?.name,
        item: item,
        latitude: userLocation ? userLocation.latitude : 18.5204303,
        longitude: userLocation ? userLocation.longitude : 73.8567437,
        location: 'Pune,Maharashtra,India',
        country_code: 'IN',
        obs_date: null,
        obs_time: null,
        timezone: 'Asia/Kolkata',
        azimuth: 360,
        time_accuracy: '',
        is_precise_azimuth: 0,
        category_map: {
            category: [],
            is_other: false,
            other_value: ''
        }
    }
}

export const directionValue = [
    { name: 'N', angle: 360, default: true },
    { name: 'NE', angle: 45, default: false },
    { name: 'E', angle: 90, default: false },
    { name: 'SE', angle: 135, default: false },
    { name: 'S', angle: 180, default: false },
    { name: 'SW', angle: 235, default: false },
    { name: 'W', angle: 270, default: false },
    { name: 'NW', angle: 315, default: false },
]

export const getdirectionDegree = (key) => {

    let degree;
    switch (key) {
        case 'N':
            degree = 360;
            break;
        case 'NE':
            degree = 45;
            break;
        case 'E':
            degree = 90;
            break;
        case 'SE':
            degree = 135;
            break;
        case 'S':
            degree = 180;
            break;
        case 'SW':
            degree = 235;
            break;
        case 'W':
            degree = 270;
            break;
        case 'NW':
            degree = 315;
            break;

        default:
            degree = key;
            break;
    }
    return degree
}

export const getdirectionAngle = (key) => {

    let angle;
    switch (key) {
        case 360:
            angle = 'N';
            break;
        case 45:
            angle = 'NE';
            break;
        case 90:
            angle = 'E';
            break;
        case 135:
            angle = 'SE';
            break;
        case 180:
            angle = 'S';
            break;
        case 235:
            angle = 'SW';
            break;
        case 270:
            angle = 'W';
            break;
        case 315:
            angle = 'NW';
            break;

        default:
            angle = 'N';
            break;
    }
    return angle
}