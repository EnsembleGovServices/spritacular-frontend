import Images from "../static/images";

export const Tabs = {
    ObservationImages : "ObservationImages",
    DateTimeLocation : "DateTimeLocation",
    EquipmentDetails : "EquipmentDetails",
}
export const MultiImageTabs = {
    MultipleImages: "MultipleImages",
    ImageSequence: "ImageSequence"
}

export const imageDetails = {
    Details : "Details",
    Equipment : "Equipment",
    Comments : "Comments",
}
export const CategoryList = [
    {
        id: 1,
        name: 'Sprite',
        image: Images.SpriteOb
    },
    {
        id: 2,
        name: 'Blue jet',
        image: Images.Bluejet
    },
    {
        id: 3,
        name: 'Elve',
        image: Images.Elev
    },
    {
        id: 4,
        name: 'Halo',
        image: Images.Halo
    },
    {
        id: 5,
        name: 'Gigantic Jet',
        image: Images.GiganticJet
    },
    {
        id: 6,
        name: 'Secondary Jet',
        image: Images.SecondaryJet
    },

]

export const directionValue = [
    {name: 'N', angle: 360, default : true},
    {name: 'NE', angle: 45, default : false},
    {name: 'E', angle: 90, default : false},
    {name: 'SE', angle: 135, default : false},
    {name: 'S', angle: 180, default : false},
    {name: 'SW', angle: 235, default : false},
    {name: 'W', angle: 270, default : false},
    {name: 'NW', angle: 315, default : false},
]