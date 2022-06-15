import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
}

export default observer(function ActivityList({}: Props) {
    const{ activityStore }= useStore()
    const [target, setTarget] = useState('');

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        activityStore.deleteActivity(id);
  }
    return (
    <Segment>
        <Item.Group divided>
            {activityStore.activitiesByDate.map(a => (
                <Item key={a.id}>
                    <Item.Content>
                        <Item.Header>{a.title}</Item.Header>
                        <Item.Meta>{a.date}</Item.Meta>
                        <Item.Description>
                            <div>{a.description}</div>
                            <div>{a.city}, {a.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated='right' content='View' color='purple' onClick={() => activityStore.selectActivity(a.id)}/>
                            <Button name={a.id} floated='right' content='Delete' color='red' onClick={(e) => handleActivityDelete(e, a.id)} loading={activityStore.loading && target === a.id}/>
                            <Label basic content={a.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
  )
})