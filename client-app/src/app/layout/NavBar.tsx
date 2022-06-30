import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface Props {
}

export default function NavBar({}: Props) {
    const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} to='/' exact header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}></img>
                uclimb.com
            </Menu.Item>
            <Menu.Item as={NavLink} to='/activities' name="Activities"/>
            <Menu.Item as={NavLink} to='/createActivity'>
                <Button positive content="Create Activity" />
            </Menu.Item>
        </Container>
    </Menu>
    );
}