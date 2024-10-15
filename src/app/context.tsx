import { auctionSubPages, CharacterTypes, skillsNames } from "./enums"

export interface Player {
    id?: string
    name: string
    password: string
    status: string
    wallet: number
}

export interface Character {
    name: string;
    type: CharacterTypes.pilot | CharacterTypes.doctor | CharacterTypes.engineer | CharacterTypes.trader;
}

export interface Pilot extends Character {
    type: CharacterTypes.pilot;
    skills: {
        attack: number
    };
}

export interface Doctor extends Character {
    type: CharacterTypes.doctor;
    skills: {
        cure: number
    };
}

export interface Engineer extends Character {
    type: CharacterTypes.engineer;
    skills: {
        intelligence: number
    };
}

export interface Trader extends Character {
    type: CharacterTypes.trader;
    skills: {
        eloquence: number
    };
}

export let characterCategories = [
    { name: 'Pilots', icon: CharacterTypes.pilot },
    { name: 'Doctors', icon: CharacterTypes.doctor },
    { name: 'Engineers', icon: CharacterTypes.engineer },
    { name: 'Traders', icon: CharacterTypes.trader }
]

export interface Skill {
    name: skillsNames
    value: number
}

export interface SubPage {
    page: auctionSubPages
    characterType?: CharacterTypes
}

export const characters: (Pilot | Doctor | Engineer | Trader)[] = [
    // Pilots
    {
        name: 'Zyra Volantis',
        type: CharacterTypes.pilot,
        skills: { attack: 9 },
    },
    {
        name: 'Kade Vortex',
        type: CharacterTypes.pilot,
        skills: { attack: 8 },
    },
    {
        name: 'Ryn Solaris',
        type: CharacterTypes.pilot,
        skills: { attack: 7 },
    },
    {
        name: 'Talon Dray',
        type: CharacterTypes.pilot,
        skills: { attack: 10 },
    },
    {
        name: 'Vexa Nyx',
        type: CharacterTypes.pilot,
        skills: { attack: 6 },
    },

    // Doctors
    {
        name: 'Orin Nexa',
        type: CharacterTypes.doctor,
        skills: { cure: 9 },
    },
    {
        name: 'Draya Zenth',
        type: CharacterTypes.doctor,
        skills: { cure: 7 },
    },
    {
        name: 'Kel Syntar',
        type: CharacterTypes.doctor,
        skills: { cure: 6 },
    },
    {
        name: 'Vorin Arkos',
        type: CharacterTypes.doctor,
        skills: { cure: 8 },
    },
    {
        name: 'Nyra Lumin',
        type: CharacterTypes.doctor,
        skills: { cure: 10 },
    },

    // Engineers
    {
        name: 'Tark Veldon',
        type: CharacterTypes.engineer,
        skills: { intelligence: 9 },
    },
    {
        name: 'Serin Qal',
        type: CharacterTypes.engineer,
        skills: { intelligence: 7 },
    },
    {
        name: 'Zethra Void',
        type: CharacterTypes.engineer,
        skills: { intelligence: 8 },
    },
    {
        name: 'Lara Krynn',
        type: CharacterTypes.engineer,
        skills: { intelligence: 10 },
    },
    {
        name: 'Gorath Xeln',
        type: CharacterTypes.engineer,
        skills: { intelligence: 6 },
    },

    // Traders
    {
        name: 'Veyra Quell',
        type: CharacterTypes.trader,
        skills: { eloquence: 7 },
    },
    {
        name: 'Drax Moren',
        type: CharacterTypes.trader,
        skills: { eloquence: 9 },
    },
    {
        name: 'Syla Orik',
        type: CharacterTypes.trader,
        skills: { eloquence: 6 },
    },
    {
        name: 'Xylo Rend',
        type: CharacterTypes.trader,
        skills: { eloquence: 10 },
    },
    {
        name: 'Tira Voss',
        type: CharacterTypes.trader,
        skills: { eloquence: 8 },
    },
];


// 0 = setItem
// 1 = deleteItem
export function updateLocalStorage(method: number, itemName: string, data: any) {
    let stringifiedData
    stringifiedData = JSON.stringify(data)
    if (method == 0) localStorage.setItem(itemName, stringifiedData)
    if (method == 1) localStorage.deleteItem(itemName, stringifiedData)
}

// check if the player exists in the db
export async function findPlayer(players: Player[], playerId: string) {
    return players.find((player: any) => player.id == playerId)
}


export function uppercaseInitialLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1)
}
