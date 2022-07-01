import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" className="mainLogo" style={{ marginBottom: 12 }} />
          uclimb.com
        </Header>
        <Header a="h2" inverted context="Wellcome to uclimb.com" />
        <Button as={Link} to="/activities" size="huge" style={{color:'#8c266c'}}>
          Show me
        </Button>
      </Container>
    </Segment>
  );
}
