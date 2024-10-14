import React, { useState } from "react";
import { getInitials, stringToColor } from "../utils/app/Avatar";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { MdPerson } from "react-icons/md";

export default function ExpandModal({
  isOpen,
  onClose,
  onDeleteMember,
  task,
  memberStatus,
  onLeaveTask,
  onSaveStatusChange,
}) {
  if (!isOpen) return null;

  const user = useSelector((state) => state.persisted.user.user);
  const [hasChanged, setHasChanged] = useState(false);
  const [memberStatuses, setMemberStatuses] = useState(
    task.members.map((member) => ({
      memberId: member.member._id,
      status: member.memberStatus,
    }))
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMemberStatusColor = (status) => {
    switch (status) {
      case "To-do":
        return "font-semibold text-gray-800";
      case "in progress":
        return "font-semibold text-blue-400";
      case "completed":
        return "font-semibold text-green-800";
      default:
        return "font-semibold text-gray-800";
    }
  };

  const handleStatusChange = (memberId, newStatus) => {
    const currentStatus = memberStatuses.find(
      (m) => m.memberId === memberId
    )?.status;

    if (currentStatus === "completed") {
      return;
    }

    setHasChanged(true);
    setMemberStatuses((prevStatuses) =>
      prevStatuses.map((memberStatus) =>
        memberStatus.memberId === memberId
          ? { ...memberStatus, status: newStatus }
          : memberStatus
      )
    );
  };

  const handleSave = () => {
    const updatedStatuses = memberStatuses
      .filter(
        (member) =>
          member.status !==
          task.members.find((m) => m.member._id === member.memberId)
            ?.memberStatus
      )
      .map((member) => ({
        memberId: member.memberId,
        status: member.status,
      }));

    if (updatedStatuses.length > 0) {
      onSaveStatusChange(updatedStatuses);
    }

    setHasChanged(false);
    onClose();
  };

  const isOwner = task.owner._id === user._id;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded shadow-lg max-w-4xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-center mb-4">
            Task Members
          </h2>
          <div className="flex justify-between mb-4">
            <div>
              <span className="font-bold text-gray-500">Task Title: </span>
              <span className="font-semibold ">{task.title}</span>
            </div>
            <div>
              <span className="font-bold text-gray-500">Priority: </span>
              <span className={`${getPriorityColor(task?.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Task State</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {task.members.map((member) => (
                <tr key={member.member?._id} className="border-t">
                  <td className="px-3 py-2 flex items-center">
                    {member?.member ? (
                      member.member.avatar ? (
                        <img
                          src={member.member.avatar}
                          alt={member.member.username}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 flex items-center justify-center rounded-full"
                          style={{
                            backgroundColor: stringToColor(
                              member.member?.username || "Unknown"
                            ),
                          }}
                        >
                          <span className="text-white font-bold">
                            {getInitials(member?.member?.username)}
                          </span>
                        </div>
                      )
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full">
                        <span className="text-white font-bold">N/A</span>
                      </div>
                    )}
                    <span className="ml-4">
                      {user._id === member.member._id
                        ? "You"
                        : member.member?.username || "Unknown"}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-2 ${getMemberStatusColor(
                      member.memberStatus
                    )}`}
                  >
                    {user._id === member.member._id ? (
                      <select
                        id="taskState"
                        className="border rounded px-2 py-1"
                        value={
                          memberStatuses.find(
                            (m) => m.memberId === member.member._id
                          )?.status
                        }
                        onChange={(e) =>
                          handleStatusChange(member.member._id, e.target.value)
                        }
                      >
                        {memberStatus.length > 0 &&
                          memberStatus.map((status, index) => (
                            <option key={index} value={status}>
                              {status}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <span>{member.memberStatus}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isOwner && user._id === member.member._id ? (
                      <span className="text-OwnerColor flex items-center">
                        <MdPerson className="mr-1" /> Owner
                      </span>
                    ) : user._id === member.member._id ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => onLeaveTask(task._id)}
                      >
                        Leave Task
                      </button>
                    ) : isOwner ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() =>
                          onDeleteMember(
                            member.member._id,
                            task._id,
                            member.member?.username
                          )
                        }
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                        disabled
                      >
                        Disabled
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {hasChanged && (
          <div className="mt-4 flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
