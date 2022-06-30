import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

type Props = {}

export default function NotFound({}: Props) {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Whipppppppppppppeerrrrr - we've looked everywhere and cnould not figure out what you want to do.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary> Return to uclimb.com</Button>
      </Segment.Inline>
    </Segment>
  )
}