import { auctionSubPages, CharacterTypes, skillsNames, statuses } from "./enums"

export const basicPlayer = { name: '', password: '', status: statuses.offline, wallet: 0 }

export interface Player {
    id?: string
    name: string
    password: string
    status: string
    wallet: number
}

export interface Character {
    id: string
    name: string;
    type: CharacterTypes.pilot | CharacterTypes.doctor | CharacterTypes.engineer | CharacterTypes.trader;
    price: number
}

export interface Pilot extends Character {
    type: CharacterTypes.pilot;
    skills: [{
        attack: number
    }];
}

export interface Doctor extends Character {
    type: CharacterTypes.doctor;
    skills: [{
        cure: number
    }];
}

export interface Engineer extends Character {
    type: CharacterTypes.engineer;
    skills: [{
        intelligence: number
    }];
}

export interface Trader extends Character {
    type: CharacterTypes.trader;
    skills: [{
        eloquence: number
    }];
}

export let characterCategories = [
    { name: 'Pilots', type: CharacterTypes.pilot },
    { name: 'Doctors', type: CharacterTypes.doctor },
    { name: 'Engineers', type: CharacterTypes.engineer },
    { name: 'Traders', type: CharacterTypes.trader }
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
        id: 'pilot-1',
        name: 'Zyra Volantis',
        type: CharacterTypes.pilot,
        skills: [{ attack: 9 }],
        price: 280, // Higher skill, higher price
    },
    {
        id: 'pilot-2',
        name: 'Kade Vortex',
        type: CharacterTypes.pilot,
        skills: [{ attack: 8 }],
        price: 250,
    },
    {
        id: 'pilot-3',
        name: 'Ryn Solaris',
        type: CharacterTypes.pilot,
        skills: [{ attack: 7 }],
        price: 220,
    },
    {
        id: 'pilot-4',
        name: 'Talon Dray',
        type: CharacterTypes.pilot,
        skills: [{ attack: 10 }],
        price: 300, // Highest skill, highest price
    },
    {
        id: 'pilot-5',
        name: 'Vexa Nyx',
        type: CharacterTypes.pilot,
        skills: [{ attack: 6 }],
        price: 190,
    },

    // Doctors
    {
        id: 'doctor-1',
        name: 'Orin Nexa',
        type: CharacterTypes.doctor,
        skills: [{ cure: 9 }],
        price: 280,
    },
    {
        id: 'doctor-2',
        name: 'Draya Zenth',
        type: CharacterTypes.doctor,
        skills: [{ cure: 7 }],
        price: 220,
    },
    {
        id: 'doctor-3',
        name: 'Kel Syntar',
        type: CharacterTypes.doctor,
        skills: [{ cure: 6 }],
        price: 190,
    },
    {
        id: 'doctor-4',
        name: 'Vorin Arkos',
        type: CharacterTypes.doctor,
        skills: [{ cure: 8 }],
        price: 250,
    },
    {
        id: 'doctor-5',
        name: 'Nyra Lumin',
        type: CharacterTypes.doctor,
        skills: [{ cure: 10 }],
        price: 300,
    },

    // Engineers
    {
        id: 'engineer-1',
        name: 'Tark Veldon',
        type: CharacterTypes.engineer,
        skills: [{ intelligence: 9 }],
        price: 280,
    },
    {
        id: 'engineer-2',
        name: 'Serin Qal',
        type: CharacterTypes.engineer,
        skills: [{ intelligence: 7 }],
        price: 220,
    },
    {
        id: 'engineer-3',
        name: 'Zethra Void',
        type: CharacterTypes.engineer,
        skills: [{ intelligence: 8 }],
        price: 250,
    },
    {
        id: 'engineer-4',
        name: 'Lara Krynn',
        type: CharacterTypes.engineer,
        skills: [{ intelligence: 10 }],
        price: 300,
    },
    {
        id: 'engineer-5',
        name: 'Gorath Xeln',
        type: CharacterTypes.engineer,
        skills: [{ intelligence: 6 }],
        price: 190,
    },

    // Traders
    {
        id: 'trader-1',
        name: 'Veyra Quell',
        type: CharacterTypes.trader,
        skills: [{ eloquence: 7 }],
        price: 220,
    },
    {
        id: 'trader-2',
        name: 'Drax Moren',
        type: CharacterTypes.trader,
        skills: [{ eloquence: 9 }],
        price: 280,
    },
    {
        id: 'trader-3',
        name: 'Syla Orik',
        type: CharacterTypes.trader,
        skills: [{ eloquence: 6 }],
        price: 190,
    },
    {
        id: 'trader-4',
        name: 'Xylo Rend',
        type: CharacterTypes.trader,
        skills: [{ eloquence: 10 }],
        price: 300,
    },
    {
        id: 'trader-5',
        name: 'Tira Voss',
        type: CharacterTypes.trader,
        skills: [{ eloquence: 8 }],
        price: 250,
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
