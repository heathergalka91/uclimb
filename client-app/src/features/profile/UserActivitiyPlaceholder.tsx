import React from "react";
import { Card, Placeholder } from "semantic-ui-react";

type Props = {};

export default function UserActivitiyPlaceholder({}: Props) {
  return (
    <Card.Group itemsPerRow={4}>
      <Card>
        <Card.Content>
          <Placeholder>
            <Placeholder.Image rectangular />
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Placeholder>
            <Placeholder.Image rectangular />
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Placeholder>
            <Placeholder.Image rectangular />
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Placeholder>
            <Placeholder.Image rectangular />
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}
