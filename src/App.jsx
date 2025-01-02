import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import Header from './components/Header'
import Center from './components/Center'
import EmptyBoard from './components/EmptyBoard';
import boardsSlice from "./redux/boardsSlice";


const App = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
      {
        boards.length > 0 
        ?
          <>
            {/* Header Section */}
            <Header isBoardModalOpen = {isBoardModalOpen} setIsBoardModalOpen = {setIsBoardModalOpen}/>

            {/* Center Section */}
            <Center isBoardModalOpen = {isBoardModalOpen} setIsBoardModalOpen = {setIsBoardModalOpen}/>
          </>
        :
          <>
            <EmptyBoard type='add'/>
          </>
      }
      </>
    </div>
  )
}

export default App
