import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
export const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const boards = useSelector((state: RootState) => state.boards.boards);

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        {user ? (
          <div className="flex items-center space-x-3 mb-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                {user.name[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
        ) : null}

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase">
            Your Boards
          </h3>
          {boards.map((board) => (
            <button
              key={board.id}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
            >
              {board.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
