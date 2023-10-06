/** @jsxImportSource @emotion/react */
import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import {
  css
} from '@emotion/react';
import {
  KanbanCardStyles,
  KanbanCardTitleStyles
} from './CommonStyles'
import AdminContext from '../context/AdminContext';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;

const KanbanTitleStyles = css`
        text-align:right;
        font-size:0.8rem;
        color:#333;
      `;

export default function KanbanCard({ title, status, onDragStart, onRemove }) {
  const [displayTime, setDisplayTime] = useState(status);
  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      let relativeTime = '刚刚';
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
      }
      else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
      }
      else if (DAY <= timePassed) {
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
      }
      setDisplayTime(relativeTime);
    };
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [status]);
  const handleDragStart = (evt) => {
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/plain', title);
    onDragStart && onDragStart(evt);
  };

  const isAdmin = useContext(AdminContext);

  return (
    <li css={KanbanCardStyles} draggable onDragStart={handleDragStart}>
      <div css={KanbanCardTitleStyles}>{title}</div>
      <div css={KanbanTitleStyles} title={status}>
        {displayTime}
        {isAdmin && onRemove && (<button onClick={() => { onRemove({ title, status }) }}>X</button>)}
      </div>
    </li>
  );
}

