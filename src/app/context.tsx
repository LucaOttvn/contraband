import CharacterCreation from "./components/Login";
import React, { createContext, useState, useContext } from 'react';

export interface Player {
    id?: string,
    name: string,
    password: string,
    skills?: Skill[]
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

export enum ContextEntities {
   Player = "player"
}