// components/FormCheckbox.jsx
function FormCheckbox({ name, labelText, defaultChecked }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        className="form-checkbox"
      />
    </div>
  );
}

export default FormCheckbox;
