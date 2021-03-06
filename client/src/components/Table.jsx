import React from "react";
import { Table } from "semantic-ui-react";

const DataTable = ({ loading, data }) => {
  return (
    <Table celled compact="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Original url</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={3}>
            Shortened
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>
            Been used
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!loading &&
          data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <a href={item.original_url}>{item.original_url}</a>
              </Table.Cell>
              <Table.Cell width={3}>
                <a href={`http://localhost:5000/${item.shortened_url}`}>
                  {item.shortened_url}
                </a>
              </Table.Cell>
              <Table.Cell width={2}>{item.times_used} times</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export { DataTable };
