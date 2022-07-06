import { format } from "date-fns";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

type Props = {
  a: Activity;
};

export default function ActivityListItem({ a }: Props) {
  const { activityStore } = useStore();
  const [target, setTarget] = useState("");

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    activityStore.deleteActivity(id);
  }

  return (
    <Segment.Group>
      <Segment>
        {a.isCancelled && (
          <Label attached='top' color='red' content='Cancelled' style={{ textAlign: "center" }} />
        )}
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' style={{marginBottom: 5}} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${a.id}`}>
                {a.title}
              </Item.Header>
              <Item.Description>Hosted by {a.host?.displayName}</Item.Description>
              {a.isHost && (
                <Item.Description>
                  <Label basic color='orange'>
                    You are hosting this activity
                  </Label>
                </Item.Description>
              )}
              {a.isGoing && !a.isHost && (
                <Item.Description>
                  <Label basic color='green'>
                    You are going to this event
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(a.date!, "dd MMM yyyy h:mm aa")}
          <Icon name='marker' /> {a.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={a.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{a.description}</span>
        <Button
          as={Link}
          to={`/activities/${a.id}`}
          floated='right'
          color='purple'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
}
