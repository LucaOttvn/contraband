import React, { useEffect, useState } from 'react';
import DurationSelector from './microComponents/NumberSelector';
import TextStagger from './TextStagger';
import { Player, Skill } from '../context';

interface SkillsCreationProps {
    player: Player
    userSkills: Skill[]
    setUserSkills?: React.Dispatch<React.SetStateAction<Skill[]>>
}

export default function SkillsCreation(props: SkillsCreationProps) {

   

    const [currentTotal, setCurrentTotal] = useState(10)

    return (
        <div className='start flex-col gap-10'>
            <TextStagger text={props.player.name + "'s skills setup"} title={true} />

            <div className='flex flex-col items-start gap-5'>
                <div><TextStagger text={'- Available points: ' + currentTotal} title={false} /></div>
                <div className='w-full center flex-wrap gap-10' >
                    {
                        props.userSkills.map((skill, skillIndex) => {
                            return (
                                <div key={'skill' + skillIndex} className='center flex-col'>
                                    <span>{skill.name}</span>
                                    <DurationSelector currentTotal={currentTotal} setCurrentTotal={setCurrentTotal} setUserSkills={props.setUserSkills} index={skillIndex}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}