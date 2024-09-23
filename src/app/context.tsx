import CharacterCreation from "./components/Login";
import React, { createContext, useState, useContext } from 'react';

export interface Player {
    name: string,
    password: string,
    skills?: Skill[]
}

export interface Skill {
    name: string,
    value: number
}
