import React from 'react'
import { Link, NavLink, Route } from 'react-router-dom'
import { Container, Grid, Image, Menu } from 'semantic-ui-react'
import BlogListing from './blog/BlogListing'
import AdminMenu from './shared/AdminMenu'

type Props = {}

export default function AdminHome({}: Props) {
  return (
    <Container style={{margin: '1em'}}>
    <Grid>
      <Grid.Column width={3}>
        <AdminMenu/>
      </Grid.Column>
      <Grid.Column width={13}>
      <Route
          path={"/admin/blogs"}
          component={BlogListing}
        />
      </Grid.Column>
    </Grid>
    </Container>
  )
}


