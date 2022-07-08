import { observer } from "mobx-react-lite";
import React from "react";
import { CardGroup, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

interface Props {}

export default observer(function ProfileFollowings({}: Props) {
  const { profileStore } = useStore();
  const { profile, followings, loadingFollowings, activeTab } = profileStore;

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={activeTab === 3 ?`People following ${profile?.displayName}` : `${profile?.displayName} is following`} />
        </Grid.Column>
        <Grid.Column width={16}>
          <CardGroup itemsPerRow={4}>
            {followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </CardGroup>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
