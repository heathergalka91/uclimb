import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

type Props = {};

export default function ActivityFilters({}: Props) {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="purple" content="Filters" />
        <Menu.Item content="All Activites" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm gosting" />
      </Menu>
      <Header></Header>
      <Calendar/>
    </>
  );
}
