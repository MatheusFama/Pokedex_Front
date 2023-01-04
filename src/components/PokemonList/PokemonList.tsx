import styled from 'styled-components'

type Props = {
  children: JSX.Element[]
}

const Wrapper = styled.div`
  display: contents;
`
const List = styled.ul`
  align-items: center;
  column-gap: 15px;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: center;
  row-gap: 15px;
`

export const PokemonList = (props: Props) => {
  return (
    <Wrapper>
      <List>{props.children}</List>
    </Wrapper>
  )
}
