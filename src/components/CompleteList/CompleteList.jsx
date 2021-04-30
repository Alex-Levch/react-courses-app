import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { CounterContext } from '../context/CounterContext';

import './completeList.scss';

export const CompleteList = ({
  courses,
  addSelectedItem,
  openSidebar,
  selectedId,
  setSelectedId,
}) => {
  const { setTotalModules } = useContext(CounterContext);

  const filteredByComplete = modules => modules
    .filter(module => (module.status === 'COMPLETE'))
    .map(module => module);

  let lengthOfCompletedModules = 0;

  if (courses.length) {
    lengthOfCompletedModules = courses.map(course => course.modules
      .filter(module => (module.status === 'COMPLETE'))
      .map(module => module).length).reduce((a, b) => a + b);
  }

  useEffect(() => {
    setTotalModules(prevCount => prevCount + lengthOfCompletedModules);
  }, [lengthOfCompletedModules]);

  return (
    <div className="complete">
      <h2
        className="complete__main-title"
      >
        Completed
        (
        {lengthOfCompletedModules}
        )
      </h2>
      <ul className="complete__list">
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
              className="complete__item"
            >
              <h3 className="complete__title">
                {course.title}
              </h3>
              {filteredByComplete(course.modules)
                .map(module => (
                  <div
                    key={uuidv4()}
                    className={classNames('complete__item-text', {
                      active_module_complete: selectedId === module.id,
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
        ))}
      </ul>
    </div>
  );
};

CompleteList.propTypes = {
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
