import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { CounterContext } from '../context/CounterContext';

import './readyList.scss';

export const ReadyList = ({
  courses,
  addSelectedItem,
  openSidebar,
  selectedId,
  setSelectedId,
}) => {
  const { setTotalModules } = useContext(CounterContext);

  const filteredByReady = modules => modules
    .filter(module => (module.status === 'READY'))
    .map(module => module);

  let lengthOfReadyModules = 0;

  if (courses.length) {
    lengthOfReadyModules = courses.map(course => course.modules
      .filter(module => (module.status === 'READY'))
      .map(module => module).length).reduce((a, b) => a + b);
  }

  useEffect(() => {
    setTotalModules(prevCount => prevCount + lengthOfReadyModules);
  }, [lengthOfReadyModules]);

  return (
    <div className="ready">
      <h2
        className="ready__main-title"
      >
        Ready to submit
        (
        {lengthOfReadyModules}
        )
      </h2>
      <ul className="ready__list">
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
              className="ready__item"
            >
              <h3 className="ready__title">
                {course.title}
              </h3>
              {filteredByReady(course.modules)
                .map(module => (
                  <div
                    key={uuidv4()}
                    className={classNames('ready__item-text', {
                      active_module_ready: selectedId === module.id,
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

ReadyList.propTypes = {
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
