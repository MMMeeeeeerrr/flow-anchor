import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Plus,
  Trash2,
  GripVertical,
  Check,
  Sparkles,
  Layout,
  MoreVertical,
  X,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- 工具函数 ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Google 风格的标签颜色 (Pastel chips)
const CHIP_COLORS = [
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-violet-100 text-violet-700 border-violet-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
  'bg-orange-100 text-orange-800 border-orange-200',
];

// --- 组件：Google 风格的待办条目 ---
const TodoItem = ({ item, onToggle, onDelete, onUpdate, onEnterPress }) => {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 py-1.5 px-2 rounded transition-colors',
        item.completed ? 'opacity-50' : 'hover:bg-gray-100/50'
      )}
    >
      {/* 复选框：模拟 Material Design 的方框/圆角 */}
      <button
        onClick={() => onToggle(item.id)}
        className={cn(
          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 shrink-0',
          item.completed
            ? 'bg-blue-600 border-blue-600'
            : 'border-gray-400 hover:border-blue-600 bg-white'
        )}
      >
        {item.completed && (
          <Check size={14} className="text-white" strokeWidth={3} />
        )}
      </button>

      {/* 输入框：类似 Prompt 的感觉 */}
      <input
        type="text"
        value={item.text}
        onChange={(e) => onUpdate(item.id, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnterPress(item.id);
          if (e.key === 'Backspace' && item.text === '') onDelete(item.id);
        }}
        placeholder="输入下一步安排..."
        className={cn(
          'flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 font-sans text-[15px]',
          item.completed && 'line-through text-gray-400'
        )}
      />

      {/* 删除按钮：隐形，悬停显示 */}
      <button
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// --- 组件：Material 3 风格的任务卡片 ---
const TaskCard = ({ task, index, updateTask, deleteTask }) => {
  const total = task.items.length;
  const completed = task.items.filter((i) => i.completed).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  // 随机分配一个 Chip 颜色
  const colorIndex = task.id.charCodeAt(0) % CHIP_COLORS.length;
  const chipStyle = CHIP_COLORS[colorIndex];

  const addItem = (afterId = null) => {
    const newItem = { id: uuidv4(), text: '', completed: false };
    const newItems = [...task.items];
    if (afterId) {
      const idx = newItems.findIndex((i) => i.id === afterId);
      newItems.splice(idx + 1, 0, newItem);
    } else {
      newItems.push(newItem);
    }
    updateTask(task.id, { items: newItems });
  };

  const updateItem = (itemId, text) => {
    const newItems = task.items.map((i) =>
      i.id === itemId ? { ...i, text } : i
    );
    updateTask(task.id, { items: newItems });
  };

  const toggleItem = (itemId) => {
    const newItems = task.items.map((i) =>
      i.id === itemId ? { ...i, completed: !i.completed } : i
    );
    updateTask(task.id, { items: newItems });
  };

  const deleteItem = (itemId) => {
    const newItems = task.items.filter((i) => i.id !== itemId);
    updateTask(task.id, { items: newItems });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            'group bg-white rounded-2xl border transition-all duration-300 mb-6',
            snapshot.isDragging
              ? 'shadow-2xl border-blue-200 rotate-1 z-50'
              : 'border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
          )}
        >
          {/* 卡片头部 */}
          <div className="flex items-start justify-between p-5 pb-2">
            <div className="flex gap-3 flex-1 min-w-0">
              <div
                {...provided.dragHandleProps}
                className="mt-1.5 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 transition-colors shrink-0"
              >
                <GripVertical size={20} />
              </div>
              <div className="flex-1 space-y-1">
                <input
                  value={task.title}
                  onChange={(e) =>
                    updateTask(task.id, { title: e.target.value })
                  }
                  className="text-lg font-medium text-gray-900 bg-transparent outline-none w-full placeholder-gray-300"
                  placeholder="任务名称"
                />
                <div className="flex items-center gap-2">
                  <input
                    value={task.category}
                    onChange={(e) =>
                      updateTask(task.id, { category: e.target.value })
                    }
                    className={cn(
                      'text-[11px] font-medium px-2 py-0.5 rounded border outline-none w-auto inline-block',
                      chipStyle
                    )}
                    placeholder="分类"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-4">
              {/* 环形进度 (模拟 Google Fit/Activity 风格) */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#1a73e8"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={88}
                    strokeDashoffset={88 - (88 * progress) / 100}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute text-[9px] font-bold text-gray-600">
                  {progress}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-300 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* 描述区域 */}
          <div className="px-5 pb-2">
            <textarea
              value={task.description}
              onChange={(e) =>
                updateTask(task.id, { description: e.target.value })
              }
              className="w-full text-sm text-gray-500 bg-transparent outline-none resize-none overflow-hidden hover:bg-gray-50 rounded px-2 py-1 transition-colors border border-transparent focus:border-gray-200"
              placeholder="添加描述..."
              rows={1}
            />
          </div>

          {/* 列表区域 */}
          <div className="px-3 pb-4 space-y-0.5 mt-1">
            {task.items.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onToggle={toggleItem}
                onDelete={deleteItem}
                onUpdate={updateItem}
                onEnterPress={() => addItem(item.id)}
              />
            ))}

            <button
              onClick={() => addItem()}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 mt-2 px-3 py-2 rounded-full transition-colors w-max"
            >
              <Plus size={16} />
              <span className="text-xs">Add step</span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

// --- 主应用组件 ---
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('mind-anchor-data');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setTasks([
        {
          id: uuidv4(),
          title: 'Project: Gemini Style',
          category: 'Design',
          description: 'Make it look like Google AI Studio.',
          items: [
            {
              id: uuidv4(),
              text: 'Use plenty of white space',
              completed: true,
            },
            {
              id: uuidv4(),
              text: 'Use "Google Blue" (#1a73e8) for accents',
              completed: true,
            },
            {
              id: uuidv4(),
              text: 'Keep borders subtle and gray',
              completed: false,
            },
          ],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mind-anchor-data', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const newTask = {
      id: uuidv4(),
      title: '',
      category: 'New',
      description: '',
      items: [],
    };
    setTasks([newTask, ...tasks]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateTask = (id, updates) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  const deleteTask = (id) => {
    if (window.confirm('Delete this task?'))
      setTasks(tasks.filter((t) => t.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  // 侧边栏使用的选中状态模拟
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="flex h-screen w-full bg-[#f0f4f9] text-gray-800 font-sans overflow-hidden">
      {/* 侧边栏：Google 风格通常是浅灰或白色，非常干净 */}
      <div className="w-64 bg-[#f0f4f9] flex flex-col shrink-0 border-r border-transparent md:border-r-0">
        <div className="p-5 pb-2">
          <div className="flex items-center gap-2 text-gray-700 mb-6">
            <span className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white p-1 rounded">
              <Sparkles size={16} />
            </span>
            <h1 className="text-lg font-medium tracking-tight">FlowAnchor</h1>
          </div>

          <button
            onClick={addTask}
            className="w-full py-3 px-4 bg-[#c2e7ff] hover:bg-[#b3dffc] text-[#001d35] rounded-2xl text-sm font-semibold flex items-center gap-3 transition-colors mb-4 shadow-sm"
          >
            <Plus size={20} />
            <span className="tracking-wide">New task</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          <div className="text-[11px] font-medium text-gray-500 px-3 py-2 uppercase tracking-wider">
            Your Flow
          </div>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                document
                  .getElementById(`task-${task.id}`)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setActiveId(task.id);
              }}
              className={cn(
                'px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors truncate flex items-center gap-2',
                activeId === task.id
                  ? 'bg-[#d3e3fd] text-[#041e49]'
                  : 'text-gray-600 hover:bg-gray-200'
              )}
            >
              <Layout
                size={14}
                className={
                  activeId === task.id ? 'text-blue-700' : 'text-gray-500'
                }
              />
              <span className="truncate">{task.title || 'Untitled'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 主区域：模拟圆角矩形的容器 */}
      <div className="flex-1 p-2 md:py-2 md:pr-2 overflow-hidden">
        <div className="h-full bg-white rounded-[24px] shadow-sm overflow-y-auto overflow-x-hidden relative scroll-smooth border border-gray-100">
          <div className="max-w-3xl mx-auto p-6 md:p-12 pb-40">
            {/* 移动端Header */}
            <div className="md:hidden flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-gray-800">
                <Sparkles size={18} className="text-blue-600" />
                <span className="font-medium">FlowAnchor</span>
              </div>
              <button
                onClick={addTask}
                className="bg-blue-600 text-white p-2 rounded-full shadow-lg"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* 欢迎语：Gemini 风格 */}
            <div className="mb-8">
              <h2 className="text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 inline-block mb-2">
                Hello, Explorer.
              </h2>
              <p className="text-gray-500 text-lg">
                Ready to organize your thoughts?
              </p>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="tasks-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                      <div key={task.id} id={`task-${task.id}`}>
                        <TaskCard
                          task={task}
                          index={index}
                          updateTask={updateTask}
                          deleteTask={deleteTask}
                        />
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {tasks.length === 0 && (
              <div className="text-center py-20 text-gray-300">
                <p>Click "New task" to start.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
