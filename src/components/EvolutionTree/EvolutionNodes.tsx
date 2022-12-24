import styled from 'styled-components'
import { IEvolutionCard } from '../../models/Pokemons/IEvolution'
import { EvolutionTree } from './EvolutionTree'

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

const NodeChilds = styled.ul``

export const EvolutionNode = ({
  EvolutionChain,
}: {
  EvolutionChain: IEvolutionCard[]
}) => {
  return (
    <Node>
      {EvolutionChain.map((node) => (
        <NodeChilds key={node.id}>
          <h3>{node.name}</h3>
          <button type="submit">
            <img src={node.default_image} alt="pokemon" />
          </button>
          <EvolutionTree EvolutionChain={node.evolvesTo ?? []} />
        </NodeChilds>
      ))}
    </Node>
  )
}
