import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function ContinentStats({ continents }: { continents: any }) {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Country</Th>
            <Th isNumeric>Cases</Th>
          </Tr>
        </Thead>
        <Tbody>
          {continents?.map((continent: any, index: number) => (
            <Tr key={index}>
              <Td>{continent.continent}</Td>
              <Td isNumeric>
                {continent.cases
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ContinentStats;
