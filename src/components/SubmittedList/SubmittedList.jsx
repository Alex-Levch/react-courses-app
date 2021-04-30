import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { CounterContext } from '../context/CounterContext';

import './submittedList.scss';

export const SubmittedList = ({
  courses,
  addSelectedItem,
  openSidebar,
  selectedId,
  setSelectedId,
}) => {
  const { setTotalModules } = useContext(CounterContext);

  const filteredBySubmitted = modules => modules
    .filter(module => (module.status === 'SUBMITTED'))
    .map(module => module);

  let lengthOfSubmittedModules = 0;

  if (courses.length) {
    lengthOfSubmittedModules = courses.map(course => course.modules
      .filter(module => (module.status === 'SUBMITTED'))
      .map(module => module).length).reduce((a, b) => a + b);
  }

  useEffect(() => {
    setTotalModules(prevCount => prevCount + lengthOfSubmittedModules);
  }, [lengthOfSubmittedModules]);

  return (
    <div className="submitted">
      <h2
        className="submitted__main-title"
      >
        Submitted
        (
        {lengthOfSubmittedModules}
        )
      </h2>
      <ul className="submitted__list">
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
              className="submitted__item"
            >
              <h3 className="submitted__title">
                {course.title}
              </h3>
              {filteredBySubmitted(course.modules)
                .map((module, index) => (
                  <div
                    key={uuidv4()}
                    className={classNames('submitted__item-text', {
                      active_module_submitted: selectedId === module.id,
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

SubmittedList.propTypes = {
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
