import { Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { Menu } from './components/Menu/Menu'
import { Home } from './pages/Home'
import { ItemDetails } from './pages/ItemDetails'
import { Items } from './pages/Items'
import { Pokedex } from './pages/Pokedex'
import { PokemonDetails } from './pages/PokemonDetails'

const Gstyle = createGlobalStyle`
  font-family: "Flexo-Demi",arial,sans-serif;
`

function App() {
  return (
    <Menu>
      <Gstyle />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/pokedex" element={<Pokedex></Pokedex>} />
        <Route path="/pokemon/details/:id" element={<PokemonDetails />} />
        <Route path="/item" element={<Items></Items>} />
        <Route path="/item/details/:id" element={<ItemDetails />} />
      </Routes>
    </Menu>
  )
}

export default App
