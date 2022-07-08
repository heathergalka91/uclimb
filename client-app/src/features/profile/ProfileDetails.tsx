import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Grid, Segment, Tab, Image, Header, Button, Label, Icon } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile, ProfileFormValues } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfileDetails({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const { userStore, profileStore } = useStore();
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          {editMode ? (
            <Formik
              initialValues={{ bio: profile.bio!, displayName: profile.displayName }}
              onSubmit={async (values) => {
                await profileStore.editProfile(values);
                setEditMode(false);
              }}
            >
              {({ handleSubmit, isSubmitting, dirty, isValid }) => (
                <Form className='ui form' onSubmit={handleSubmit}>
                  <MyTextInput placeholder='Display Name' name='displayName' />
                  <MyTextArea rows={5} placeholder='Bio' name='bio' />
                  <Button
                    basic
                    color='green'
                    floated='right'
                    content='Save'
                    loading={isSubmitting}
                    onClick={() => handleSubmit}
                    disabled={isSubmitting}
                  />
                  <Button
                    floated='right'
                    content={"Cancel"}
                    color='red'
                    basic
                    disabled={isSubmitting}
                    onClick={() => setEditMode(false)}
                  />
                </Form>
              )}
            </Formik>
          ) : (
            <Segment.Group>
              <Segment attached='top'>
                <Grid>
                  <Grid.Column width={1}>
                    <Icon size='large' name='user' color='purple' />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <p>{profile.displayName}</p>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid>
                  <Grid.Column width={1}>
                    <Icon size='large' name='info' color='purple' />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid>
                  <Grid.Column width={16}>
                    {userStore.user?.username === profile.username && (
                      <Button
                        floated='left'
                        content={"Edit Profile"}
                        color='purple'
                        basic
                        onClick={() => setEditMode(!editMode)}
                      />
                    )}
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
