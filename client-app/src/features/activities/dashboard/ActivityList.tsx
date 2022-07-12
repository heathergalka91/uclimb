import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

interface Props {}

export default observer(function ActivityList({}: Props) {
  const {activityStore}= useStore();


  return (
    <>
      {activityStore.groupedActivites.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="purple">
            {group}
          </Header>
          {activities.map((a) => (
            <ActivityListItem key={a.id} a={a} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
