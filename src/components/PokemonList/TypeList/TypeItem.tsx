import { TypesLabel, TypeLabel } from '../../../assets/TypesLabel'
import styled from 'styled-components'
import { IType } from '../../../models/Pokemons/IPokemonCard'

//background: linear-gradient(${labelStyle?.background_primary_color} 50%, ${labelStyle?.background_secondary_color} 50%);

const Wrapper = styled.div`
  max-width: 80px;
  min-width: 80px;
  padding: 5px;
`

const Item = styled('li')<{ labelStyle: TypeLabel }>`
  border-radius: 10px;
  margin-bottom: 10px;
  background: ${({ labelStyle }) =>
    `linear-gradient(${labelStyle.background_primary_color} 50%, ${labelStyle.background_secondary_color} 50%)`};
  button {
    background: none;
    border: none;
    color: ${({ labelStyle }) => labelStyle.font_color};
    font-size: 11px;
  }
`

export const TypeItem = ({ type }: { type: IType }) => {
  const labelStyle = TypesLabel[type.type.name]

  return (
    <Wrapper>
      <Item labelStyle={labelStyle}>
        <button>{type.type.name}</button>
      </Item>
    </Wrapper>
  )
}
