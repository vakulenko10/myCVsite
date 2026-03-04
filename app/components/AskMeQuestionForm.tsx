'use client';

import React, { useEffect, useState } from 'react';
import type { AskMeQuestionType, SectionName } from '@/types';

interface AskMeQuestionFormProps {
  sectionName: SectionName;
  initialData?: AskMeQuestionType | null;
}

const DEFAULT_ORDER = 0;

const AskMeQuestionForm: React.FC<AskMeQuestionFormProps> = ({
  sectionName,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    enText: '',
    uaText: '',
    plText: '',
    autoSend: false,
    order: DEFAULT_ORDER,
  });
  const [autoSendWarning, setAutoSendWarning] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        enText: initialData.enText ?? '',
        uaText: initialData.uaText ?? '',
        plText: initialData.plText ?? '',
        autoSend: initialData.autoSend ?? false,
        order: initialData.order ?? DEFAULT_ORDER,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
    if (name === 'autoSend' && checked) {
      setAutoSendWarning(
        'Only one question should have "Auto-send" enabled (e.g. the contact one).'
      );
    } else if (name === 'autoSend') {
      setAutoSendWarning(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = initialData
        ? `/api/fetchContentFromDB/${sectionName}/${initialData._id}`
        : `/api/fetchContentFromDB/${sectionName}`;
      const method = initialData ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.href = `/section/${sectionName}`;
      } else {
        console.error(initialData ? 'Failed to update item' : 'Failed to create item');
      }
    } catch (error) {
      console.error(initialData ? 'Error updating item:' : 'Error creating item:', error);
    }
  };

  return (
    <div className="dynamicForm max-w-md relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
      <h2 className="text-2xl text-sky-900 font-bold mb-6">
        {initialData ? 'Edit' : 'Add'} predefined question
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="enText" className="block text-sm font-medium text-gray-600">
            enText (English)
          </label>
          <textarea
            id="enText"
            name="enText"
            required
            rows={2}
            value={formData.enText}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md resize-none"
          />
        </div>
        <div>
          <label htmlFor="uaText" className="block text-sm font-medium text-gray-600">
            uaText (Ukrainian)
          </label>
          <textarea
            id="uaText"
            name="uaText"
            required
            rows={2}
            value={formData.uaText}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md resize-none"
          />
        </div>
        <div>
          <label htmlFor="plText" className="block text-sm font-medium text-gray-600">
            plText (Polish)
          </label>
          <textarea
            id="plText"
            name="plText"
            required
            rows={2}
            value={formData.plText}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md resize-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoSend"
            name="autoSend"
            checked={formData.autoSend}
            onChange={handleChange}
            className="rounded"
          />
          <label htmlFor="autoSend" className="text-sm font-medium text-gray-600">
            Auto-send (open chat and send this message automatically)
          </label>
        </div>
        {autoSendWarning && (
          <p className="text-amber-600 text-sm">{autoSendWarning}</p>
        )}
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-600">
            order (lower = higher in list)
          </label>
          <input
            type="number"
            id="order"
            name="order"
            min={0}
            value={formData.order}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center text-center w-full [background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default AskMeQuestionForm;
