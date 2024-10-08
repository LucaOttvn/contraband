export interface Player {
    id?: string,
    name: string,
    password: string,
    skills?: Skill[]
    status: string
}

export interface Skill {
    name: string,
    value: number
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

