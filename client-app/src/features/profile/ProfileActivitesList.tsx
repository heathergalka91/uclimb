import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardGroup, Image, Placeholder, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import UserActivitiyPlaceholder from "./UserActivitiyPlaceholder";

type Props = {
};

export default observer(function ProfileActivitesList({ }: Props) {
  const {
    profileStore: { userActivities, loading },
  } = useStore();

  if (loading) return <UserActivitiyPlaceholder />;

  return (
    <>
      <CardGroup itemsPerRow={4} style={{ marginTop: "25px" }}>
        {userActivities.map((activity) => (
          <Card
            as={Link}
            to={`/activities/${activity.activityId}`}
            key={activity.activityId}
          >
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
              <Card.Header>{activity.title}</Card.Header>
              <Card.Description>{activity.date ? format(activity.date!, "MM/dd/yy"): null}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </CardGroup>
    </>
  );
});
