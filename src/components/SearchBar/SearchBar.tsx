import styled from 'styled-components'
import * as FaIcons from 'react-icons/fa'
import { ISearchData } from '../../models/IPaginacao'
import { useEffect, useRef, useState } from 'react'

const Wrapper = styled.section`
  border-radius: 24px;
  background: #fff;
  width: 100%;
  border: 5px solid #fff;
  position: relative;
`
const Form = styled.form`
  display: flex;
  position: relative;
`
const TextBox = styled.input`
  position: relative;
  vertical-align: top;
  width: 90%;
  height: 100%;
  border: none;

  .input {
    width: 100%;
    height: 100%;
  }

  &:focus {
    outline: none;
  }
`
const SearchIcon = styled(FaIcons.FaSearch)`
  cursor: pointer;
`
const Span = styled.span`
  clear: both;
  margin-top: 0.325em;
  margin-right: 1px;
  background-color: #fff;
  width: 90%;
`
const SearchButton = styled.button`
  background: #fff;
  border: none;
  height: 100%;
  border-radius: 24px;
  position: absolute;
  right: 0;
`
const DataResult = styled.div`
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  z-index: 1;
  background: #fff;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`
const ItemResult = styled.div<{ isFocusItem: Boolean }>`
  cursor: pointer;
  position: static;
  background: ${({ isFocusItem }) => (isFocusItem ? '#e9e9e9' : '')};
  &:hover {
    background: #e9e9e9;
  }
  .p {
    font-size: 50px;
  }
`
const Label = styled.label``

export const SearchBar = ({
  handleSearch,
  searchData,
}: {
  handleSearch: (searchValue: string) => void
  searchData: ISearchData[]
}) => {
  const [filteredList, setFilteredList] = useState<ISearchData[]>([])
  const [visible, setVisible] = useState<Boolean>(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [searchName, setSearchName] = useState<string>('')
  const searchItem = useRef<HTMLDivElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    const { key } = event
    let nextIndexCount = 0

    //Down
    if (key === 'ArrowUp')
      nextIndexCount =
        (focusedIndex + filteredList.length - 1) % filteredList.length

    //Down
    if (key === 'ArrowDown') {
      nextIndexCount = (focusedIndex + 1) % filteredList.length
    }

    //Enter
    if (key === 'Enter') {
      event.preventDefault()
      const name =
        searchName.trim() === '' ? '' : filteredList[focusedIndex].title

      setSearchName(name)
      handleSearch(name)
      setVisible(false)
    }

    setFocusedIndex(nextIndexCount)
  }

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(true)
    setSearchName(event.target.value.toString())
  }

  const handleOnClickSearchItem = (value: string) => {
    setSearchName(value)
    setVisible(false)
    setFilteredList([])
  }

  useEffect(() => {
    if (searchName === '') setFilteredList([])

    setFilteredList(
      searchData.filter((i) =>
        i.title.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
      )
    )
  }, [searchName])

  useEffect(() => {
    if (!searchItem.current) return
    searchItem.current.scrollIntoView({
      block: 'center',
    })
  }, [focusedIndex])

  return (
    <Wrapper>
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          handleSearch(searchName)
        }}
      >
        <Span>
          <Label>
            <TextBox
              type="text"
              placeholder="Name..."
              onChange={handleOnChangeInput}
              onKeyDown={handleKeyDown}
              value={searchName}
              onFocus={() => setVisible(true)}
            />
          </Label>
        </Span>
        <SearchButton type="submit">
          <SearchIcon></SearchIcon>
        </SearchButton>
      </Form>
      {searchName.length > 0 && visible && (
        <DataResult>
          {filteredList.map((item, index) => (
            <ItemResult
              isFocusItem={index === focusedIndex}
              key={item.id}
              ref={index === focusedIndex ? searchItem : null}
              onClick={() => {
                handleOnClickSearchItem(item.title)
              }}
            >
              <p>{item.title}</p>
            </ItemResult>
          ))}
        </DataResult>
      )}
    </Wrapper>
  )
}
