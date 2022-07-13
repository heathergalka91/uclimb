import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image, Divider } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            className='mainLogo'
            style={{ marginBottom: 12 }}
          />
          uclimb.com
        </Header>

        {userStore.isLoggedIn ? (
          <>
            <Header a='h2' inverted context='Wellcome to uclimb.com' />
            <Button as={Link} to='/activities' size='huge' style={{ color: "purple" }}>
              Go to Activites!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size='huge'
              style={{ color: "#8c266c" }}
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size='huge'
              style={{ color: "#8c266c" }}
            >
              Register
            </Button>
            <Divider horizontal inverted>
              Or
            </Divider>
            <Button
              loading={userStore.fbLoading}
              size='huge'
              inverted
              color='facebook'
              content='Login with Facebook'
              onClick={userStore.facebookLogin}
            />
          </>
        )}
      </Container>
    </Segment>
  );
});
