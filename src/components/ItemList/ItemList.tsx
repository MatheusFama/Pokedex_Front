import styled from 'styled-components'

type Props = {
  children: JSX.Element[]
}
const Wrapper = styled.div`
  display: contents;
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`

export const ItemList = (props: Props) => {
  return (
    <Wrapper>
      <List>{props.children}</List>
    </Wrapper>
  )
}
