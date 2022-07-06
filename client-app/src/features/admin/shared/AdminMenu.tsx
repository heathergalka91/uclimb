import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Icon, Image, Menu } from 'semantic-ui-react'

type Props = {}

export default function AdminMenu({}: Props) {
  return (
    <Menu vertical>
    <Container>
      <Menu.Header as='h1' style={{paddingTop: '10px'}}>
        <Image src='/assets/logo.png' inverted size='mini' floated='left'/> 
        uclimb.com
      </Menu.Header>
      <Menu.Item as={NavLink} to='/admin/blogs' content='Blogs' />
      <Menu.Item as={NavLink} to='/admin/users' content='Users' />
      <Menu.Item as={NavLink} to='/admin/activities' content='Activities' />
      <Menu.Item as={NavLink} to='/admin/contacts' content='Contacts' />
      <Menu.Item as={NavLink} to='/admin/settings' content='Settings' />
    </Container>
  </Menu>
  )
}