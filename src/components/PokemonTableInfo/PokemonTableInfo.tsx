import styled from 'styled-components'

const Wrapper = styled.section``

const Table = styled.table`
  background: #30a7d7;
  border-radius: 3px;
  padding-top: 10px;
  width: 100%;
`

const Column = styled.th`
  color: white;
  font-weight: normal;
`
const Data = styled.td`
  padding: 2px 0;
`

const Row = styled.tr`
  text-align: center;
`

export type PokemonTableColumn = {
  title: string
  data: any
}

export const PokemonTableInfo = ({
  columns,
}: {
  columns: PokemonTableColumn[]
}) => {
  return (
    <Wrapper>
      <Table>
        <tbody>
          <Row>
            {columns.map((col) => (
              <Column key={col.title}>{col.title}</Column>
            ))}
          </Row>
          <Row>
            {columns.map((col, index) => (
              <Data key={index}>{col.data}</Data>
            ))}
          </Row>
        </tbody>
      </Table>
    </Wrapper>
  )
}
