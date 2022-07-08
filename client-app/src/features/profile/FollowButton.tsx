import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
  const {
    profileStore: { updateFollowing, loading },
    userStore,
  } = useStore();

  if (userStore.user?.username === profile.username) return null;

  function handleFollow(e: SyntheticEvent, username: string) {
    e.preventDefault();
    profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
  }

  return (
    <Reveal animated='move'>
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button fluid color='purple' content={profile.following ? 'Following' : 'Not Following'} loading={loading}/>
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button fluid basic color={"purple"} content={profile.following ? "unfollow" : "follow"} onClick={(e) => handleFollow(e, profile.username)} loading={loading} />
      </Reveal.Content>
    </Reveal>
  );
});
