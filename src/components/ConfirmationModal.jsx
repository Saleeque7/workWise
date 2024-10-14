import React from 'react';


const ConfirmationModal = ({ isOpen, onClose, onConfirm ,title ,message }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2">{message}</p>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          confirm
        </button>
      </div>
    </div>
  </div>
  );
};

export default ConfirmationModal;
