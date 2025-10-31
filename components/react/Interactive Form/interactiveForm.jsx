import React, { useState, useEffect } from "react";
import "./interactiveForm.css";

/**
 * steps: [
 *  {
 *    id: 'personal',
 *    title: 'Personal',
 *    fields: [
 *      { name: 'firstName', label: 'First name', type: 'text', required: true },
 *      { name: 'age', label: 'Age', type: 'number', required: false, validator: (v) => v > 0 || "Age must be positive" }
 *    ]
 *  },
 *  ...
 * ]
 *
 * onSubmit receives the final formData object
 */

export default function MultiStepForm({ steps = [], initialData = {}, onSubmit }) {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [completed, setCompleted] = useState(() => steps.map(() => false));
  const [animKey, setAnimKey] = useState(0); // to trigger CSS reflow for animations

  useEffect(() => {
    // reset completed when steps change
    setCompleted(steps.map(() => false));
  }, [steps]);

  function validateStep(index) {
    const step = steps[index];
    if (!step) return true;
    const newErrors = {};
    step.fields?.forEach((field) => {
      const val = formData[field.name];
      if (field.required && (val === undefined || val === "")) {
        newErrors[field.name] = `${field.label || field.name} is required`;
        return;
      }
      if (field.validator) {
        const res = field.validator(val, formData);
        if (res !== true) {
          // validator returns true if ok, otherwise string message
          newErrors[field.name] = typeof res === "string" ? res : `${field.label || field.name} is invalid`;
        }
      }
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }

  function goToStep(index) {
    // allow jump to previous or completed steps
    if (index === current) return;
    if (index < 0 || index >= steps.length) return;
    // allow if index is completed or index < current (backwards) or index === current + 1 and current validated
    const allowed =
      completed[index] || index < current || (index === current + 1 && validateStep(current));

    if (allowed) {
      setCurrent(index);
      setAnimKey((k) => k + 1);
    }
  }

  function handleNext() {
    // validate current step
    const ok = validateStep(current);
    if (!ok) return;
    // mark this step completed
    setCompleted((prev) => {
      const cp = [...prev];
      cp[current] = true;
      return cp;
    });
    if (current < steps.length - 1) {
      setCurrent((c) => c + 1);
      setAnimKey((k) => k + 1);
    }
  }

  function handleBack() {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setAnimKey((k) => k + 1);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // validate current and all steps optionally
    const ok = validateStep(current);
    if (!ok) return;

    // mark last step completed
    setCompleted((prev) => {
      const cp = [...prev];
      cp[current] = true;
      return cp;
    });

    if (onSubmit) onSubmit(formData);
  }

  const step = steps[current];

  return (
    <form className="msf-container" onSubmit={handleSubmit} noValidate>
      <Progress
        steps={steps}
        current={current}
        completed={completed}
        onStepClick={(i) => {
          // clicking progress should only go to completed steps or earlier steps
          if (i < current || completed[i]) goToStep(i);
        }}
      />

      <div className="msf-step-wrapper">
        <div key={animKey} className="msf-step msf-fade">
          <h2 className="msf-step-title">{step?.title}</h2>

          <div className="msf-fields">
            {step?.fields?.map((field) => {
              const value = formData[field.name] ?? "";
              return (
                <div className="msf-field" key={field.name}>
                  <label htmlFor={field.name}>
                    {field.label}
                    {field.required ? <span className="msf-required"> *</span> : null}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder || ""}
                      aria-invalid={!!errors[field.name]}
                    />
                  ) : (
                    <input
                      id={field.name}
                      type={field.type || "text"}
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder || ""}
                      aria-invalid={!!errors[field.name]}
                    />
                  )}

                  {errors[field.name] ? <div className="msf-error">{errors[field.name]}</div> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="msf-footer">
        <div className="msf-buttons">
          <button
            type="button"
            onClick={handleBack}
            disabled={current === 0}
            className="msf-btn msf-btn-ghost"
            aria-disabled={current === 0}
          >
            Back
          </button>

          {current < steps.length - 1 ? (
            <button type="button" onClick={handleNext} className="msf-btn msf-btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" className="msf-btn msf-btn-submit">
              Submit
            </button>
          )}
        </div>

        <div className="msf-step-jump">
          {/*
            allow jumping to completed steps; show text with clickable step indices
          */}
          <small>
            Step {current + 1} of {steps.length}{" "}
            {completed.some(Boolean) ? (
              <>
                • Jump to:{" "}
                {steps.map((s, i) => (
                  <button
                    key={s.id || i}
                    type="button"
                    onClick={() => {
                      if (i < current || completed[i]) goToStep(i);
                    }}
                    className={`msf-step-pill ${i === current ? "active" : ""} ${
                      completed[i] ? "done" : ""
                    }`}
                    aria-pressed={i === current}
                    disabled={!(i < current || completed[i])}
                  >
                    {i + 1}
                  </button>
                ))}
              </>
            ) : null}
          </small>
        </div>
      </div>
    </form>
  );
}

/* Small Progress component */
function Progress({ steps = [], current = 0, completed = [], onStepClick }) {
  return (
    <ol className="msf-progress" role="navigation" aria-label="Steps">
      {steps.map((s, i) => {
        const isCurrent = i === current;
        const isDone = completed[i];
        return (
          <li
            key={s.id || i}
            className={`msf-progress-step ${isCurrent ? "current" : ""} ${isDone ? "done" : ""}`}
          >
            <button
              type="button"
              className="msf-progress-btn"
              onClick={() => onStepClick(i)}
              aria-current={isCurrent ? "step" : undefined}
              aria-disabled={!isDone && !isCurrent}
            >
              <span className="msf-progress-index">{i + 1}</span>
              <span className="msf-progress-label">{s.title}</span>
            </button>
            {i < steps.length - 1 && <div className="msf-progress-connector" />}
          </li>
        );
      })}
    </ol>
  );
}
