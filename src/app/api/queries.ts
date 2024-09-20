import { addPlayer } from '../../../utils/firestoreQueries';
import { Player } from '../context';


export async function createPlayer(player: Player) {
    try {
        const newPlayer = await addPlayer(player); // Call addPlayer directly
        console.log('New player added:', newPlayer);
    } catch (err) {
        console.error(err);
    }
}