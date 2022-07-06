import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

type Props = {};

export default function BlogListing({}: Props) {
  const blogs = [
    {
      title: "Title1",
      date: "Date1",
      category: "Category1",
      summary: "Sumary1",
      blogStatus: "blogStatus1",
    },
    {
      title: "Title2",
      date: "Date2",
      category: "Category2",
      summary: "Sumary2",
      blogStatus: "blogStatus2",
    },
    {
      title: "Title3",
      date: "Date3",
      category: "Category3",
      summary: "Sumary3",
      blogStatus: "blogStatus3",
    },
    {
      title: "Title4",
      date: "Date4",
      category: "Category4",
      summary: "Sumary4",
      blogStatus: "blogStatus4",
    },
    {
      title: "Title5",
      date: "Date5",
      category: "Category5",
      summary: "Sumary5",
      blogStatus: "blogStatus5",
    },
  ];
  return (
    <Container>
      <Table className='adminTable'>
        <TableHeader>
          <TableHeaderCell></TableHeaderCell>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Summary</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {blogs.map((b) => (
            <TableRow>
              <TableCell width={4}>
                <Button as={NavLink} to={`/admin/blogs/${1111}`} inverted color='purple'>
                  <Icon name='edit' />
                </Button>
                <Button as={NavLink} to={`/admin/blogs/${1111}`} inverted color='purple'>
                  <Icon name='copy' />
                </Button>
                <Button as={NavLink} to={`/admin/blogs/delete/${1111}`} inverted color='purple'>
                  <Icon name='trash' />
                </Button>
              </TableCell>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.date}</TableCell>
              <TableCell>{b.category}</TableCell>
              <TableCell>{b.summary}</TableCell>
              <TableCell>{b.blogStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
