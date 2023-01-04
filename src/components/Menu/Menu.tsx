import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { MenuItem } from './MenuItem'
import { SubMenu } from './SubMenu'
import MenuImage from '../../assets/menuImage.png'

const Wrapper = styled.div`
  min-width: 410px;
  width: 100%;
`

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SidebarNav = styled('nav')<{ sidebar: boolean }>`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`
const SidebarWrap = styled.div`
  width: 100%;
  
`

const MenuTitle = styled.img`
  height: 70%;
  margin: 20px;
`

export type MenuProps = {
  children: JSX.Element | JSX.Element[]
}

export const Menu = ({ children }: MenuProps) => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <Wrapper>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <MenuTitle src={MenuImage} alt="menu" />
          {/* <h1
            style={{ textAlign: 'right', marginLeft: '50px', color: 'green' }}
          >
            Menu
          </h1> */}
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {MenuItem.map((item, index) => {
              return <SubMenu item={item} key={index} />
            })}
          </SidebarWrap>
        </SidebarNav>
        {children}
      </IconContext.Provider>
    </Wrapper>
  )
}
