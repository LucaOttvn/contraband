import React, { useEffect } from 'react';
import TextStagger from '../../microComponents/TextStagger';
import { Doctor, Engineer, Pilot, uppercaseInitialLetter, Trader, Player } from '@/app/context';
import gsap from 'gsap';

interface ItemsTableProps {
  list: Pilot[] | Doctor[] | Engineer[] | Trader[];
  title?: string;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  player: Player
  expensesPreview?: number
  setExpensesPreview: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function ItemsTable(props: ItemsTableProps) {

  useEffect(() => {
    props.list.forEach((listItem, listItemIndex) => {
      gsap.set('#' + listItem.id, {
        background: props.selectedItems.includes(listItem.id) ? 'var(--green)' : 'var(--darkerGreen)',
        color: props.selectedItems.includes(listItem.id) ? 'var(--black)' : 'var(--green)'
      })
    })
  }, [props.list]);

  function itemSelection(listItem: Pilot | Doctor | Engineer | Trader) {
    props.selectedItems.includes(listItem.id) ? props.setSelectedItems(props.selectedItems.filter(item => item !== listItem.id)) : props.setSelectedItems((prevState) => [...prevState, listItem.id])

    props.setExpensesPreview(prevState => (prevState || 0) + listItem.price);
  }

  return (
    <div>
      <div className='w-full center mb-5'>
        <TextStagger text={props.title ?? ''} title={true} />
      </div>
      <div className='flex flex-col items-center gap-4'>
        {props.list.map((listItem, index) => (
          <label htmlFor={`checkbox-${index}`} key={index} id={listItem.id} className='w-2/3 flex flex-col items-start itemCard px-3 py-1 generalButton'
            onClick={() => {
              itemSelection(listItem)
            }}
          >
            <div className='w-full flex justify-between'>
              <TextStagger text={listItem.name} title={false} />
              <span>|</span>
              <TextStagger text={'$ ' + listItem.price} title={false} />
            </div>
            <div className='horizontalDivider my-2' style={{ border: props.selectedItems.includes(listItem.id) ? 'dashed 1px var(--darkerGreen)' : 'dashed 1px var(--green)' }}></div>

            <div className='w-full start'>
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
          </label>
        ))}
      </div>
    </div>
  );
}
