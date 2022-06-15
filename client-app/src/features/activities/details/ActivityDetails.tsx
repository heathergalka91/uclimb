import React from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
}

export default function ActivityDetails({}: Props) {
  const {activityStore} = useStore();
  const {selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;
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
        <Button basic color='blue' content='Edit' onClick={() => openForm(activity.id)}></Button>
        <Button basic color='grey' content='Cancel' onClick={cancelSelectedActivity}></Button>
      </ButtonGroup>
    </Card.Content>
  </Card>
  )
}