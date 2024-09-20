import CharacterCreation from "./components/Login";
import React, { createContext, useState, useContext } from 'react';

export interface Player {
    name: string,
    password: string,
}
