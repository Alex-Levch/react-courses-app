/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, {
  useCallback,
  useState,
  useEffect,
} from 'react';
import classNames from 'classnames';
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowRoundBack,
} from 'react-icons/io';
import { FcSearch } from 'react-icons/fc';
import { FaReact } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import coursesFromServer from './api/courses.json';
import { TotalModules } from './components/TotalModules';
import { InProgressList } from './components/InProgressList';
import { SubmittedList } from './components/SubmittedList';
import { ReadyList } from './components/ReadyList';
import { CompleteList } from './components/CompleteList';
import {
  CounterContextProvider,
} from './components/context/CounterContext';

import './app.scss';

export const App = () => {
  const [courses, setCourses] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModuleClicked, setModuleClicked] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedItem, setSelectedItem] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    setCourses([...coursesFromServer]);
  }, []);

  function handleChange(ev) {
    const { value } = ev.target;

    setInputValue(value);
  }

  const inputFilter = course => (
    course.title === null
      ? course.title
      : (course.title.toLocaleLowerCase())
        .includes(inputValue.toLocaleLowerCase())
  );

  const removeSelectedItem = (index) => {
    setSelectedItems(selectedItems.filter((item, i) => i !== index));
  };

  const toggle = (index) => {
    if (isModuleClicked === index) {
      return setModuleClicked(null);
    }

    return setModuleClicked(index);
  };

  const addSelectedItem = (value) => {
    setSelectedItem(value);
    setSelectedItems([...selectedItems, value]);
  };

  const clearAll = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const filteredCourses = courses
    .filter(inputFilter);

  return (
    <CounterContextProvider>
      <div className="app">
        <div className="app__search-field-box">
          <input
            className="app__search-field"
            type="text"
            placeholder="Enter some text"
            value={inputValue}
            onChange={handleChange}
          />
          <div
            className="app__search-field-icon"
          >
            <FcSearch />
          </div>
        </div>
        <div className="app__logo-box">
          <FaReact
            className="app__logo"
          />
        </div>
        <TotalModules />
        <InProgressList
          openSidebar={openSidebar}
          courses={[...filteredCourses]}
          addSelectedItem={addSelectedItem}
          isModuleClicked={isModuleClicked}
          toggle={toggle}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <SubmittedList
          openSidebar={openSidebar}
          courses={[...filteredCourses]}
          addSelectedItem={addSelectedItem}
          isModuleClicked={isModuleClicked}
          toggle={toggle}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <ReadyList
          openSidebar={openSidebar}
          courses={[...filteredCourses]}
          addSelectedItem={addSelectedItem}
          isModuleClicked={isModuleClicked}
          toggle={toggle}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <CompleteList
          openSidebar={openSidebar}
          courses={[...filteredCourses]}
          addSelectedItem={addSelectedItem}
          isModuleClicked={isModuleClicked}
          toggle={toggle}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <div className="app__open-sidebar-box">
          <IoIosArrowRoundBack
            className="app__open-sidebar-button"
            onClick={() => {
              openSidebar();
            }}
            type="button"
          />
        </div>
        <div className={classNames('sidebar', {
          sidebar__opened: isSidebarOpen,
          sidebar__closed: !isSidebarOpen,
        })}
        >
          <h2 className="sidebar__title">
            Courses
          </h2>
          <ul className="sidebar__list">
            {selectedItems.map((item, index) => (
              <li
                key={uuidv4()}
                className={classNames('sidebar__item', {
                  active_module: selectedId === item.id,
                })}
                role="button"
                tabIndex={0}
                onKeyDown={() => null}
                onClick={() => {
                  toggle(index);
                  setSelectedId(item.id);
                }}
              >
                <div>
                  <h3 className="sidebar__selected-title">
                    {`${item.author} course`}
                  </h3>
                  <p className="sidebar__selected-description">
                    {item.description}
                  </p>
                </div>
                {isModuleClicked === index ? (
                  <>
                    <p
                      className="sidebar__selected-info"
                    >
                      {item.moduleInfo}
                    </p>
                    <p
                      className="sidebar__selected-info"
                    >
                      {item.moduleText}
                    </p>
                  </>
                ) : null}
                <div
                  className="sidebar__selected-icon"
                >
                  {isModuleClicked === index
                    ? <IoIosArrowUp />
                    : <IoIosArrowDown />}
                </div>
                <button
                  type="button"
                  className="sidebar__button-remove"
                  onClick={(event) => {
                    removeSelectedItem(index);
                    event.stopPropagation();
                  }}
                />
              </li>
            ))}
          </ul>
          <div className="sidebar__button-close-box">
            <IoIosArrowRoundBack
              className="sidebar__button-close"
              onClick={() => {
                closeSidebar();
              }}
              type="button"
            />
          </div>
          <button
            className="sidebar__button-clear"
            onClick={() => {
              clearAll();
            }}
            type="button"
          >
            Clear All
          </button>
        </div>
      </div>
    </CounterContextProvider>
  );
};
