import styled from 'styled-components'

type Props = {
  children: JSX.Element[]
}
const Wrapper = styled.div`
  display: contents;
`

const List = styled.ul`
  align-items: center;
  column-gap: 5px;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: center;
  row-gap: 5px;
`

export const ItemList = (props: Props) => {
  return (
    <Wrapper>
      <List>{props.children}</List>
    </Wrapper>
  )
}
