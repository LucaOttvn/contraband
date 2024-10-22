import React, { useEffect } from 'react';
import TextStagger from '../../microComponents/TextStagger';
import { Doctor, Engineer, Pilot, uppercaseInitialLetter, Trader } from '@/app/context';

interface ItemsTableProps {
  list: Pilot[] | Doctor[] | Engineer[] | Trader[];
  title?: string;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ItemsTable(props: ItemsTableProps) {

  return (
    <div>
      <div className='w-full center mb-5'>
        <TextStagger text={props.title ?? ''} title={true} />
      </div>
      <div className='flex flex-col items-center gap-2'>
        {props.list.map((listItem, index) => (
          <label htmlFor={`checkbox-${index}`} key={index} className='w-2/3 start gap-3 itemCard px-3 py-1 generalButton'>

            <input
              type="checkbox"
              id={`checkbox-${index}`}
              onChange={()=>{
                props.selectedItems.includes(listItem.id) ? props.setSelectedItems(props.selectedItems.filter(item => item !== listItem.id)) : props.setSelectedItems((prevState)=>[...prevState, listItem.id])
                
              }}
            />

            <div className='flex flex-col'>
              <div className='start'>
                <TextStagger text={listItem.name} title={false} />
              </div>
              <div className='ps-2'>
                {listItem.skills.map((skill, skillIndex) => (
                  <div key={'skill' + skillIndex}>
                    {Object.entries(skill).map(([key, value]) =>
                    (key != 'type' && key !== 'name' && <TextStagger
                      key={key + skillIndex}
                      text={uppercaseInitialLetter(key) + ': ' + value}
                      title={false}
                    />)
                    )}
                  </div>
                ))}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
