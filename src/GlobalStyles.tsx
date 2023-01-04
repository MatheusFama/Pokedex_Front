import { createGlobalStyle } from 'styled-components'

export const Title = ({ value }: { value: string | undefined }) => {
  return <h1>{value}</h1>
}

export const Subtitle = ({ value }: { value: string }) => {
  return <h2>{value}</h2>
}

export const CardTitle = ({ value }: { value: string }) => {
  return <h3>{value}</h3>
}

export const Globalstyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro',sans-serif;
  }
`
