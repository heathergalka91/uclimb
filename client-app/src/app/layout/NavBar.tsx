import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface Props {
}

export default function NavBar({}: Props) {
    const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}></img>
                uclimb.com
            </Menu.Item>
            <Menu.Item name="Activities"/>
            <Menu.Item>
                <Button positive content="Create Activity" onClick={() => activityStore.openForm()} />
            </Menu.Item>
        </Container>
    </Menu>
    );
}
