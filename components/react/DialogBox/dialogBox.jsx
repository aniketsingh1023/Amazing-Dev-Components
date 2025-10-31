import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer,
  className = ''
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className} animate-fadeIn`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        )}

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const ModalDemo = () => {
  const [infoModal, setInfoModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = () => {
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}`);
    setFormModal(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleConfirm = () => {
    alert('Action confirmed!');
    setConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Modal Dialog Component</h1>
        <p className="text-gray-600 mb-8">Click the buttons below to see different modal examples</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setInfoModal(true)}
            className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            📄 Information Modal
          </button>

          <button
            onClick={() => setFormModal(true)}
            className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
          >
            📝 Form Modal
          </button>

          <button
            onClick={() => setConfirmModal(true)}
            className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg"
          >
            ⚠️ Confirmation Modal
          </button>
        </div>

        <Modal
          isOpen={infoModal}
          onClose={() => setInfoModal(false)}
          title="Welcome to Our Platform"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              This is an information modal that displays important content to users. 
              It can contain text, images, or any other React components.
            </p>
            <p className="text-gray-700">
              You can close this modal by clicking the X button, pressing Escape, 
              or clicking outside the modal area.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-800 font-medium">💡 Pro Tip</p>
              <p className="text-blue-700 text-sm mt-1">
                Modals are great for displaying important information without navigating away from the current page.
              </p>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={formModal}
          onClose={() => setFormModal(false)}
          title="Contact Us"
          size="lg"
          footer={
            <>
              <button
                onClick={() => setFormModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
                placeholder="Your message..."
              />
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
          title="Confirm Action"
          size="sm"
          closeOnOverlayClick={false}
          footer={
            <>
              <button
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-center text-gray-700">
              Are you sure you want to proceed with this action? This cannot be undone.
            </p>
          </div>
        </Modal>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ModalDemo;