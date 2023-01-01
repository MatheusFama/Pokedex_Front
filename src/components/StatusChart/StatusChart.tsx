import styled, { keyframes } from 'styled-components'
import { Status } from '../../models/Pokemons/IPokemonDescription'

const COLUMN_HEIGHT = 15
const MIN_ANIMATION_TIME = 5

const Panel = styled.div`
  background-color: #a4a4a4;
  border-radius: 10px;
  width: 100%;
  padding-top: 1px;
  padding-left: 30px;
  padding-right: 30px;

  min-width: 340px;

`

const Table = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 10px;
  padding-left: 0;
  margin-bottom: 1.5em;
  position: relative;
  width: 100%;
  padding: 0;
`

const Column = styled.li`
  width: 12.95%;
  display: inline-block;
  padding-right: 1%;
`

const ColumnData = styled.ul`
  position: relative;
  list-style: none;
  width: 100%;
  text-align: center;
  overflow: visible;
  padding: 0;
`

const animation = keyframes`
 from {background-color: white;}
  to {background-color: #30a7d7;}
`
const Data = styled.li<{ index: number; power: number }>`
  background: ${({ index, power }) => (index <= power ? '#30a7d7' : 'white')};
  min-width: 1ch;
  min-height: 1ch;
  margin-bottom: 10px;
  align-items: center;
  animation: ${({ index, power }) => (index <= power ? animation : '')} ${({ index }) => index > MIN_ANIMATION_TIME ? `${MIN_ANIMATION_TIME}s` : `${index}s`};

  ::before {
    background: blue;
    color: #fff;
    border-radius: 3px;
    padding: 3px 4px;
    font-size: 14px;
    position: absolute;
    pointer-events: none;
  }
  &:hover::before {
    content: '${({ power }) => power * 10}';
    float: left;
  }
`

const ColumnName = styled.span`
  font-size: smaller;
  width: 12.95%;


`

const Title = styled.h3`
  text-align: center;
`

export const StatusChart = ({ status }: { status: Status[] }) => {
  return (
    <Panel>
      <Title>Stats</Title>
      <Table>
        <Column>
          <ColumnData key={'hp'}>
            {Array.from(Array(COLUMN_HEIGHT).keys()).map((index) => (
              <Data
                key={index}
                index={COLUMN_HEIGHT - index}
                power={status.find((s) => s.name === 'hp')?.base_stat ?? 0}
              />
            ))}
            <ColumnName>HP</ColumnName>
          </ColumnData>
        </Column>

        <Column>
          <ColumnData key={'atk'}>
            {Array.from(Array(COLUMN_HEIGHT).keys()).map((index) => (
              <Data
                key={'atk' + index}
                index={COLUMN_HEIGHT - index}
                power={status.find((s) => s.name === 'attack')?.base_stat ?? 0}
              />
            ))}
            <ColumnName>Atk</ColumnName>
          </ColumnData>
        </Column>

        <Column>
          <ColumnData key={'def'}>
            {Array.from(Array(COLUMN_HEIGHT).keys()).map((index) => (
              <Data
                key={'def' + index}
                index={COLUMN_HEIGHT - index}
                power={status.find((s) => s.name === 'defense')?.base_stat ?? 0}
              />
            ))}
            <ColumnName>Def</ColumnName>
          </ColumnData>
        </Column>

        <Column>
          <ColumnData key={'specatk'}>
            {Array.from(Array(COLUMN_HEIGHT).keys()).map((index) => (
              <Data
                key={'specatk' + index}
                index={COLUMN_HEIGHT - index}
                power={
                  status.find((s) => s.name === 'special-attack')?.base_stat ??
                  0
                }
              />
            ))}
            <ColumnName>Spec.Atk</ColumnName>
          </ColumnData>
        </Column>

        <Column>
          <ColumnData key={'specdef'}>
            {Array.from(Array(COLUMN_HEIGHT).keys()).map((index) => (
              <Data
                key={'specdef' + index}
                index={COLUMN_HEIGHT - index}
                power={
                  status.find((s) => s.name === 'special-defense')?.base_stat ??
                  0
                }
              />
            ))}
            <ColumnName>Spec.Def</ColumnName>
          </ColumnData>
        </Column>

        <Column>
          <ColumnData key={'speed'}>
            {Array.from(Array(COLUMN_HEIGHT).keys()).map((index) => (
              <Data
                key={'speed' + index}
                index={COLUMN_HEIGHT - index}
                power={status.find((s) => s.name === 'speed')?.base_stat ?? 0}
              />
            ))}
            <ColumnName>Speed</ColumnName>
          </ColumnData>
        </Column>
      </Table>
    </Panel>
  )
}
