import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileActivitesList from "./ProfileActivitesList";

interface Props {}

export default observer(function ProfileActivities({}: Props) {
  const { profileStore } = useStore();
  const tabs = ["Past", "Future", "Host"];
  const panes = [
    { menuItem: "Past Activities", render: () => <ProfileActivitesList /> },
    { menuItem: "Future Activities", render: () => <ProfileActivitesList /> },
    { menuItem: "Hosting Activities", render: () => <ProfileActivitesList/> },
  ];
  useEffect(() => {
    profileStore.loadActivities(tabs[0]);
  });

  return (
    <Tab.Pane>
      <Header icon='calendar' content='Activities' />
      <Tab
        panes={panes}
        onTabChange={(e, data) => {
            profileStore.loadActivities(tabs[data.activeIndex as number]);
        }}
      ></Tab>
    </Tab.Pane>
  );
});
