import { auctionSubPages } from "./enums"

export interface Player {
    id?: string
    name: string
    password: string
    skills?: Skill[]
    status: string
}

export interface SubPage {
    page: auctionSubPages
    characterType?: number
}

export interface Skill {
    name: string
    value: number
}

export interface Pilot {
    name: string
    attack: number
}

export interface Doctor {
    name: string
    cure: number
}

export interface Engineer {
    name: string
    intelligence: number
}

export interface Trader {
    name: string
    eloquence: number
}

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

export let characterCategories = [
    { name: 'Pilots', icon: 'pilot' },
    { name: 'Engineers', icon: 'doctor' },
    { name: 'Doctors', icon: 'engineer' },
    { name: 'Traders', icon: 'trader' }
]

export let characters = [
    [
        { name: 'Xelara', attack: 8 },
        { name: 'Tyran', attack: 6 },
        { name: 'Vorna', attack: 9 },
        { name: 'Krell', attack: 5 },
        { name: 'Zyphon', attack: 7 },
    ] as Pilot[],
    [
        { name: 'Quorin', cure: 6 },
        { name: 'Liora', cure: 8 },
        { name: 'Nyx', cure: 4 },
        { name: 'Selix', cure: 9 },
        { name: 'Draven', cure: 5 },
    ] as Doctor[],
    [
        { name: 'Vexor', intelligence: 9 },
        { name: 'Rhyla', intelligence: 6 },
        { name: 'Zarin', intelligence: 8 },
        { name: 'Kaltor', intelligence: 7 },
        { name: 'Oris', intelligence: 5 },
    ] as Engineer[],
    [
        { name: 'Zorak', eloquence: 7 },
        { name: 'Lazlo', eloquence: 9 },
        { name: 'Xyra', eloquence: 6 },
        { name: 'Farin', eloquence: 5 },
        { name: 'Drax', eloquence: 8 },
    ] as Trader[],
];

export function uppercaseInitialLetter(input:string) {
    return input.charAt(0).toUpperCase() + input.slice(1)
}
