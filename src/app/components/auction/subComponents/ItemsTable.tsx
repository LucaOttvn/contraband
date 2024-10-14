import React from 'react';
import TextStagger from '../../microComponents/TextStagger';
import { Doctor, Engineer, Pilot, uppercaseInitialLetter, Trader } from '@/app/context';

interface ItemsTableProps {
  list: Pilot[] | Doctor[] | Engineer[] | Trader[];
  title: string;
}

export default function ItemsTable(props: ItemsTableProps) {
  return (
    <div>
      <div className='w-full center mb-5'>
        <TextStagger text={props.title} title={true} />
      </div>
      <div className='flex flex-col items-start gap-2'>
        {props.list.map((item, index) => (
          <div key={index} className='start gap-3'>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              className='custom-checkbox mr-2'
            />
            <label htmlFor={`checkbox-${index}`}>
              <TextStagger text={`- ${item.name}`} title={false} />
            </label>
            <span>|</span>
            <div className='flex flex-col'>
              {Object.entries(item).map(([key, value]) =>
                key !== 'name' && (
                  <TextStagger
                    key={key}
                    text={uppercaseInitialLetter(key) + ': ' + value}
                    title={false}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
