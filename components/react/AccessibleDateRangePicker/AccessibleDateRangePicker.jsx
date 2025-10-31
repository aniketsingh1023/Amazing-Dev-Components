import React, { useState } from "react";

const AccessibleDateRangePicker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleStartChange = (e) => {
    const value = e.target.value;
    setStartDate(value);

    if (endDate && new Date(value) > new Date(endDate)) {
      setError("Start date cannot be after end date.");
    } else {
      setError("");
    }
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    setEndDate(value);

    if (startDate && new Date(value) < new Date(startDate)) {
      setError("End date cannot be before start date.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && startDate && endDate) {
      alert(`Date Range Selected:\nFrom: ${startDate}\nTo: ${endDate}`);
    } else {
      setError("Please select a valid date range.");
    }
  };

  return (
    <div
      className="max-w-md mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md"
      role="group"
      aria-labelledby="date-range-label"
    >
      <h2
        id="date-range-label"
        className="text-2xl font-semibold text-gray-800 mb-4"
      >
        Accessible Date Range Picker
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Start Date */}
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-invalid={!!error}
          />
        </div>

        {/* End Date */}
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={handleEndChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-invalid={!!error}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p
            role="alert"
            className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded-md"
          >
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AccessibleDateRangePicker;
