import PokebolaIcon from '../../assets/pokeball_icon.png'
import BagIcon from '../../assets/bagItems.png'

import styled from 'styled-components'

export type MItem = {
  title: string
  path: string
  icon: JSX.Element
}

const Icon = styled.img`
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
`

export const MenuItem: MItem[] = [
  {
    title: 'Pokedex',
    path: '/pokedex',
    icon: <Icon src={PokebolaIcon}></Icon>,
  },
  {
    title: 'Itens',
    path: '/item',
    icon: <Icon src={BagIcon}></Icon>,
  },
]
