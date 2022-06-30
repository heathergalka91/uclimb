import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

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
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${a.id}`}>
                {a.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {a.date}
          <Icon name="marker" /> {a.venue}
        </span>
      </Segment>
      <Segment secondary>Attendies go here</Segment>
      <Segment clearing>
        <span>{a.description}</span>
        <Button as={Link} to={`/activities/${a.id}`} floated="right" color="purple" content="View" />
      </Segment>
    </Segment.Group>
  );
}
