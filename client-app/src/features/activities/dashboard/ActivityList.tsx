import React from 'react'
import { Button, Item, ItemGroup, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity'

interface Props {
    activites: Activity[];
    selectActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
}

export default function ActivityList({activites, selectActivity, handleDeleteActivity}: Props) {
  return (
    <Segment>
        <Item.Group divided>
            {activites.map(a => (
                <Item key={a.id}>
                    <Item.Content>
                        <Item.Header>{a.title}</Item.Header>
                        <Item.Meta>{a.date}</Item.Meta>
                        <Item.Description>
                            <div>{a.description}</div>
                            <div>{a.city}, {a.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated='right' content='View' color='purple' onClick={() => selectActivity(a.id)}/>
                            <Button floated='right' content='Delete' color='red' onClick={() => handleDeleteActivity(a.id)}/>
                            <Label basic content={a.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
  )
}