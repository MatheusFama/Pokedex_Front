import styled from 'styled-components'
import { IEvolutionCard } from '../../models/Pokemons/IEvolution'
import { EvolutionNode } from './EvolutionNodes'

const Tree = styled.ul`
  display: inline-block;
  flex-wrap: wrap;
`
const Node = styled.li`
  float: left;
  border: none;
  outline: none;

  button {
    background-color: inherit;
    height: 100%;
    border: none;
  }

  img {
    min-width: 130px;
    max-width: 130px;
    min-height: 130px;
    max-height: 130px;
    cursor: pointer;
  }

  h3 {
    font-weight: normal;
  }
`
export const EvolutionTree = ({
  EvolutionChain,
}: {
  EvolutionChain: IEvolutionCard[]
}) => {
  return (
    <Tree>
      {EvolutionChain.map((node) => (
        <li></li>
      ))}
      {/* <EvolutionNode EvolutionChain={EvolutionChain}/> */}
    </Tree>
  )
}
