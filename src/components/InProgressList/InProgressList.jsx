import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { CounterContext } from '../context/CounterContext';

import './inProgressList.scss';

export const InProgressList = ({
  courses,
  addSelectedItem,
  openSidebar,
  selectedId,
  setSelectedId,
}) => {
  const { setTotalModules } = useContext(CounterContext);

  const filteredByInProgress = modules => modules
    .filter(module => (module.status === 'IN_PROGRESS'))
    .map(module => module);

  let lengthOfProgressModules = 0;

  if (courses.length) {
    lengthOfProgressModules = courses.map(course => course.modules
      .filter(module => (module.status === 'IN_PROGRESS'))
      .map(module => module).length).reduce((a, b) => a + b);
  }

  useEffect(() => {
    setTotalModules(prevCount => prevCount + lengthOfProgressModules);
  }, [lengthOfProgressModules]);

  return (
    <div className="in-progress">
      <h2
        className="in-progress__main-title"
      >
        In Progress
        (
        {lengthOfProgressModules}
        )
      </h2>
      <ul className="in-progress__list">
        {[...courses].map(course => (
          <div
            key={uuidv4()}
            role="button"
            tabIndex={0}
            onKeyDown={() => null}
            onClick={() => (
              openSidebar()
            )}
          >
            <li
              className="in-progress__item"
            >
              <h3
                className="in-progress__title"
              >
                {course.title}
              </h3>
              {filteredByInProgress(course.modules)
                .map(module => (
                  <div
                    key={uuidv4()}
                    className={classNames('in-progress__item-text', {
                      active_module_progress: selectedId === module.id,
                    })
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => null}
                    onClick={() => {
                      addSelectedItem(module);
                      setSelectedId(module.id);
                    }}
                  >
                    <p>
                      {module.description}
                    </p>
                  </div>
                ))}
            </li>
          </div>
        ))
        }
      </ul>
    </div>
  );
};

InProgressList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      modules: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,

  selectedId: PropTypes.number.isRequired,

  addSelectedItem: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  setSelectedId: PropTypes.func.isRequired,
};
