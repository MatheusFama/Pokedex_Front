import styled from 'styled-components'

type Props = {
  children: JSX.Element[] | undefined
}

const Wrapper = styled.aside`
  display: contents;
`

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 0;
`
export const TypeList = ({ children }: Props) => {
  return (
    <Wrapper>
      <List>{children}</List>
    </Wrapper>
  )
}
