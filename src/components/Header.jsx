import React from 'react'
import { useState } from 'react'
import logo from '../assets/logo-mobile.svg'
import iconUp from '../assets/icon-chevron-up.svg'
import iconDown from '../assets/icon-chevron-down.svg'
import elipsis from '../assets/icon-vertical-ellipsis.svg'
import HeaderDropDown from './HeaderDropDown'
import AddEditBoardModal from '../modals/AddEditBoardModal'
import AddEditTaskModal from '../modals/AddEditTaskModal'
import DeleteModal from '../modals/DeleteModal'
import { useDispatch, useSelector } from "react-redux";
import ElipsisMenu from './ElipsisMenu'
import boardsSlice
 from '../redux/boardsSlice'

const Header = ({isBoardModalOpen, setIsBoardModalOpen}) => {
  const[openDropdown, setOpenDropdown] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown(!openDropdown)
  }

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  }

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };


  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={logo} alt=" logo " className=" h-6 w-6" />
          <h3 className=" md:text-4xl  hidden md:inline-block font-bold  font-sans">
            kanban
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
              {board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>
        
        {/* Right Side */}
        <div className='flex space-x-4 items-center md:space-x-6'>
          <button 
            className=' hidden md:block button'
            onClick={()=>{
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button 
            className=" button py-1 px-3 md:hidden"
            onClick={()=>{
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            +
          </button>

          <img src={elipsis} alt="elipses"               className='cursor-pointer h-6'
          onClick={()=>{
            setBoardType("edit")
            setOpenDropdown(false)
            setIsElipsisMenuOpen((prevState) => !prevState);
          }}
          />

          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && <HeaderDropDown setOpenDropdown={setOpenDropdown} setIsBoardModalOpen={setIsBoardModalOpen}/>}
      </header>

      {/* Board Models */}
      {isBoardModalOpen && (
          <AddEditBoardModal 
            setBoardType={setBoardType}
            type={boardType}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
      )}

      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}

    </div>
  )
}

export default Header;