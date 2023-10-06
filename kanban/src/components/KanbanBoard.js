/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { KanbanColumn } from './KanbanColumn';

export const DATA_STORE_KEY = "kanban-data-store";
export const COLUMN_KEY_TODO = 'todo';
export const COLUMN_KEY_ONGOING = 'ongoing';
export const COLUMN_KEY_DONE = 'done';

const KanbanboardStyles = css`
    flex:10;
    display:flex;
    flex-direction:row;
    gap:1rem;
    margin:0 1rem 1rem;
  `;

const COLUMN_BG_COLORS = {
  loading: "#E3E3E3",
  todo: "#C9AF97",
  ongoning: "#FFE799",
  done: "#C0E8BA"
}

export default function KanbanBoard({
  isLoding = true,
  todoList,
  ongoningList,
  doneList,
  onAdd,
  onRemove
}) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);

  const handleDrop = (evt) => {
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return;
    }
    dragSource && onRemove(dragSource, draggedItem);
    dragTarget && onAdd(dragTarget, draggedItem);
  }
  return (
    <main className='kanban-board' css={KanbanboardStyles}>
      {isLoding ? (<KanbanColumn title='读取中...' bgColor={COLUMN_BG_COLORS.loading} />) :
        (<React.Fragment>
          <KanbanColumn
            canAddNew
            bgColor={COLUMN_BG_COLORS.todo}
            title='待处理'
            setDraggedItem={setDraggedItem}
            setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
            setIsDragTarget={(isSrc) => setDragTarget(isSrc ? COLUMN_KEY_TODO : null)}
            onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
            onDrop={handleDrop}
            onRemove={onRemove.bind(null, COLUMN_KEY_TODO)}
            cardList={todoList}
          />
          <KanbanColumn
            bgColor={COLUMN_BG_COLORS.ongoning}
            title='进行中'
            setDraggedItem={setDraggedItem}
            setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
            setIsDragTarget={(isSrc) => setDragTarget(isSrc ? COLUMN_KEY_ONGOING : null)}
            onDrop={handleDrop}
            onRemove={onRemove.bind(null, COLUMN_KEY_ONGOING)}
            cardList={ongoningList}
          />
          <KanbanColumn
            bgColor={COLUMN_BG_COLORS.done}
            title='已完成'
            setDraggedItem={setDraggedItem}
            setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
            setIsDragTarget={(isSrc) => setDragTarget(isSrc ? COLUMN_KEY_DONE : null)}
            onRemove={onRemove.bind(null, COLUMN_KEY_DONE)}
            onDrop={handleDrop}
            cardList={doneList}
          />
        </ React.Fragment>)}
    </main>
  );
}

