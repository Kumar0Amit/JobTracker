import { useRef, useEffect } from 'react';

function AutoExpandTextarea({
  name,
  defaultValue = '',
  labelText = 'Notes',
  placeholder = '',
  initialHeight = '6rem', // 👈 Custom starting height
  ...props
}) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = initialHeight;
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [defaultValue, initialHeight]);

  const handleInput = () => {
    ref.current.style.height = initialHeight;
    ref.current.style.height = ref.current.scrollHeight + 'px';
  };

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">{labelText}</label>
      <textarea
        ref={ref}
        name={name}
        id={name}
        defaultValue={defaultValue}
        onInput={handleInput}
        className="form-input"
        placeholder={placeholder}
        style={{
          resize: 'vertical',
          minHeight: initialHeight,
          overflow: 'hidden',
        }}
        {...props}
      />
    </div>
  );
}

export default AutoExpandTextarea;


// import { useRef, useEffect } from 'react';

// function AutoExpandTextArea({ name, defaultValue = '', labelText = 'Notes', placeholder = '', ...props }) {
//   const ref = useRef();

//   useEffect(() => {
//     if (ref.current) {
//       ref.current.style.height = 'auto';
//       ref.current.style.height = ref.current.scrollHeight + 'px';
//     }
//   }, [defaultValue]);

//   const handleInput = () => {
//     ref.current.style.height = 'auto';
//     ref.current.style.height = ref.current.scrollHeight + 'px';
//   };

//   return (
//     <div className="form-row">
//       <label htmlFor={name} className="form-label">{labelText}</label>
//       <textarea
//         ref={ref}
//         name={name}
//         id={name}
//         defaultValue={defaultValue}
//         onInput={handleInput}
//         className="form-input"
//         rows={1}
//         placeholder={placeholder}
//         {...props}
//       />
//     </div>
//   );
// }

// export default AutoExpandTextArea;
