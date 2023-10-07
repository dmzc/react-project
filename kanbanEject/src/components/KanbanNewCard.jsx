
import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  KanbanCardTitleStyles,
  KanbanCardStyles
} from './CommonStyles';

export const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const inputElement = useRef(null);
  useEffect(() => {
    inputElement.current.focus();
  }, []);
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      const newCard = { title, status: new Date().toDateString() }
      onSubmit(newCard);
    }
  };
  return (
    <li css={KanbanCardStyles}>
      <h3>添加新卡片</h3>
      <div css={KanbanCardTitleStyles}>
        <input type='text' value={title} ref={inputElement}
          onChange={handleChange} onKeyDown={handleKeyDown}></input>
      </div>
    </li>
  );
};
