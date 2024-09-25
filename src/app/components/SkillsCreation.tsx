import React, { useEffect, useState } from 'react';
import TextStagger from './TextStagger';
import { Player, Skill, updateLocalStorage } from '../context';
import NumberSelector from './microComponents/NumberSelector';

interface SkillsCreationProps {
    player: Player
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
    setUpdatingSkills: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SkillsCreation(props: SkillsCreationProps) {

    const [userSkills, setUserSkills] = useState<Skill[]>([{ name: 'Strength', value: 0 }, { name: 'Eloquence', value: 0 }, { name: 'Science', value: 0 }, { name: 'Luck', value: 0 }])

    const [currentTotal, setCurrentTotal] = useState(10)

    async function update() {
        if (currentTotal == 0) {
            props.setPlayer(prevState => ({ ...prevState, skills: userSkills }))
            props.setUpdatingSkills(false)
        }
        else {
            alert('You still have some points to spend!')
        }
    }

    return (
        <div className='start flex-col gap-10'>
            <TextStagger text={props.player.name + "'s skills setup"} title={true} />

            <div className='flex flex-col items-start gap-5'>
                <div><TextStagger text={'- Available points: ' + currentTotal} title={false} /></div>
                <div className='w-full center flex-wrap gap-10' >
                    {
                        userSkills.map((skill, skillIndex) => {
                            return (
                                <div key={'skill' + skillIndex} className='center flex-col'>
                                    <span>{skill.name}</span>
                                    <NumberSelector currentTotal={currentTotal} setCurrentTotal={setCurrentTotal} setUserSkills={setUserSkills} index={skillIndex} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='w-full center'>
                <div className='generalButton' onClick={update}>Save</div>
            </div>
        </div>
    );
}