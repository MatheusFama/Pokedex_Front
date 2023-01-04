import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CardTitle } from '../../GlobalStyles'
import { IPokemon } from '../../models/Pokemons/IPokemon'
import { IPokemonCard } from '../../models/Pokemons/IPokemonCard'
import PokemonService from '../../services/pokemon.api'
import { TypeItem } from './TypeList/TypeItem'
import { TypeList } from './TypeList/TypeList'

const Wrapper = styled.section`
  align-items: center;
  background-color: rgb(231, 231, 231);
  border-radius: 10%;
  display: flex;
  height: 300px;
  position: relative;
  justify-content: center;
  width: 290px;

  &:hover {
    transform: matrix(1, 0, 0, 1, 0, -3);
    transition: 0.5s;
  }
`

const Item = styled.li`
  border: none;
  display: inline-block;
  outline: none;
  position: relative;
`

const Image = styled.button`
  background-color: inherit;
  border: none;
  outline: none;

  img {
    width: 60%;
    height: 60%;
    cursor: pointer;
  }
`

const PokemonNumber = styled.p`
  color: #616161;
  font-weight: bold;
  margin-left: 15%;
  margin-bottom: 0;
  position: relative;
  text-align: left;
`

export const PokemonItem = ({ pokemon }: { pokemon: IPokemon }) => {
  const [pokemonCard, setPokemonCard] = useState<IPokemonCard>()
  const navigate = useNavigate()
  useEffect(() => {
    PokemonService.getPokemonById(pokemon.id).then((response) => {
      setPokemonCard(response)
    })
  }, [pokemon.id])

  const onClick = (id: number) => {
    navigate(`/pokemon/details/${id}`, {
      state: {
        id: id,
      },
    })
  }

  return (
    <Wrapper>
      <Item>
        <CardTitle value={pokemon.name} />
        <Image type="submit" onClick={() => onClick(pokemon.id)}>
          <img
            src={pokemonCard?.sprites.other['official-artwork'].front_default}
            alt="pokemon"
          />
        </Image>
        <PokemonNumber>
          Nº {pokemon.id.toString().padStart(3, '0')}
        </PokemonNumber>
        <TypeList>
          {pokemonCard?.types.map((item, index) => (
            <TypeItem type={item} key={index} />
          ))}
        </TypeList>
      </Item>
    </Wrapper>
  )
}
