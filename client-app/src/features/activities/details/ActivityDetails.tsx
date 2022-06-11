import React from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  handleFormOpen: (id: string) => void;
}

export default function ActivityDetails({activity, cancelSelectActivity, handleFormOpen }: Props) {
  return (
    <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.date}</Card.Header>
      <Card.Meta>
        <span>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ButtonGroup widths='2'>
        <Button basic color='blue' content='Edit' onClick={() => handleFormOpen(activity.id)}></Button>
        <Button basic color='grey' content='Cancel' onClick={cancelSelectActivity}></Button>
      </ButtonGroup>
    </Card.Content>
  </Card>
  )
}