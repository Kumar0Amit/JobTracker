// src/assets/styledWrappers/Job.js

import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1.5rem;
    column-gap: 1rem;
    align-items: center;
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    padding: 0.5rem 0;
    width: 100%;
    margin: 0;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .status.followup {
    background-color: #facc15;
    color: #000;
  }
  .status.job-link {
    background-color: var(--primary-100);
    color: var(--primary-700);
    text-decoration: none;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;

  }

  .centered-action {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items:center;
    /* Removed redundant justify-items property */
  }

  .edit-btn,
  .delete-btn {
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width:100px;
    height: 35px;
    padding: 0 0.75rem;
    justify-content: center; /* Changed from space-between */
  } /* <-- Removed comma here */

  .btn-snooze,
  .btn-done {
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width:100px;
    height: 35px;
    padding: 0 0.75rem;
    justify-content: center; /* Changed from space-between */
  } /* <-- Removed comma here */

  .btn-email {
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    height: 35px;
    padding: 0 0.75rem;
  }
`;
export default Wrapper;
// // src/assets/styledWrappers/Job.js

// import styled from 'styled-components';

// const Wrapper = styled.article`
//   background: var(--background-secondary-color);
//   border-radius: var(--border-radius);
//   display: grid;
//   grid-template-rows: 1fr auto;
//   box-shadow: var(--shadow-2);

//   header {
//     padding: 1rem 1.5rem;
//     border-bottom: 1px solid var(--grey-100);
//     display: grid;
//     grid-template-columns: auto 1fr;
//     align-items: center;
//   }
//   .main-icon {
//     width: 60px;
//     height: 60px;
//     display: grid;
//     place-items: center;
//     background: var(--primary-500);
//     border-radius: var(--border-radius);
//     font-size: 1.5rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     color: var(--white);
//     margin-right: 2rem;
//   }
//   .info {
//     h5 {
//       margin-bottom: 0.5rem;
//     }
//     p {
//       margin: 0;
//       text-transform: capitalize;
//       letter-spacing: var(--letter-spacing);
//       color: var(--text-secondary-color);
//     }
//   }
//   .content {
//     padding: 1rem 1.5rem;
//   }
//   .content-center {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     row-gap: 1.5rem;
//     column-gap: 1rem;
//     align-items: center;
//   }
//   .status {
//     border-radius: var(--border-radius);
//     text-transform: capitalize;
//     letter-spacing: var(--letter-spacing);
//     text-align: center;
//     padding: 0.5rem 0;
//     width: 100%;
//     margin: 0;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .status.followup {
//     background-color: #facc15;
//     color: #000;
//   }
//   .status.job-link {
//     background-color: var(--primary-100);
//     color: var(--primary-700);
//     text-decoration: none;
//   }
//   .actions,
//   .followup-actions {
//     display: flex;
//     gap: 0.5rem;
//     align-items: center;
//   }

//   /* ✅ NEW STYLE FOR THE CENTERED EMAIL BUTTON */
//   .centered-action {
//     margin-top: 1rem;
//     display: flex;
//     justify-content: center;
//   }

//   .edit-btn,
//   .delete-btn,
//   .btn-snooze,
//   .btn-done,
//   .btn-email {
//     font-size: 0.85rem;
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//     height: 35px;
//     padding: 0 0.75rem;
//   }
// `;
// export default Wrapper;
// // src/assets/styledWrappers/Job.js

// import styled from 'styled-components';

// const Wrapper = styled.article`
//   background: var(--background-secondary-color);
//   border-radius: var(--border-radius);
//   display: grid;
//   grid-template-rows: 1fr auto;
//   box-shadow: var(--shadow-2);

//   header {
//     padding: 1rem 1.5rem;
//     border-bottom: 1px solid var(--grey-100);
//     display: grid;
//     grid-template-columns: auto 1fr;
//     align-items: center;
//   }
//   .main-icon {
//     width: 60px;
//     height: 60px;
//     display: grid;
//     place-items: center;
//     background: var(--primary-500);
//     border-radius: var(--border-radius);
//     font-size: 1.5rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     color: var(--white);
//     margin-right: 2rem;
//   }
//   .info {
//     h5 {
//       margin-bottom: 0.5rem;
//     }
//     p {
//       margin: 0;
//       text-transform: capitalize;
//       letter-spacing: var(--letter-spacing);
//       color: var(--text-secondary-color);
//     }
//   }
//   .content {
//     padding: 1rem 1.5rem;
//   }
//   .content-center {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     row-gap: 1.5rem;
//     column-gap: 1rem;
//     align-items: center;
//   }
//   .status {
//     border-radius: var(--border-radius);
//     text-transform: capitalize;
//     letter-spacing: var(--letter-spacing);
//     text-align: center;
//     padding: 0.5rem 0;
//     width: 100%;
//     margin: 0;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .status.followup {
//     background-color: #facc15;
//     color: #000;
//   }
//   .status.job-link {
//     background-color: var(--primary-100);
//     color: var(--primary-700);
//     text-decoration: none;
//   }
//   .actions {
//     display: flex;
//     gap: 0.5rem;
//     align-items: center;
//   }

//   /* ✅ ADJUSTED TO PREVENT WRAPPING */
//   .followup-actions {
//     display: flex;
//     gap: 0.35rem; /* Reduced gap */
//     align-items: center;
//     width: 100%; /* Ensure it uses the full cell width */
//     justify-content: flex-start;
//   }

//   .edit-btn,
//   .delete-btn,
//   .btn-snooze,
//   .btn-done,
//   .btn-email {
//     font-size: 0.85rem;
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//     height: 35px;
//     padding: 0 0.6rem; /* Reduced padding */
//     flex-shrink: 0; /* Prevent buttons from shrinking */
//   }
// `;
// export default Wrapper;

// // src/assets/styledWrappers/Job.js

// import styled from 'styled-components';

// const Wrapper = styled.article`
//   background: var(--background-secondary-color);
//   border-radius: var(--border-radius);
//   display: grid;
//   grid-template-rows: 1fr auto;
//   box-shadow: var(--shadow-2);

//   header {
//     padding: 1rem 1.5rem;
//     border-bottom: 1px solid var(--grey-100);
//     display: grid;
//     grid-template-columns: auto 1fr;
//     align-items: center;
//   }
//   .main-icon {
//     width: 60px;
//     height: 60px;
//     display: grid;
//     place-items: center;
//     background: var(--primary-500);
//     border-radius: var(--border-radius);
//     font-size: 1.5rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     color: var(--white);
//     margin-right: 2rem;
//   }
//   .info {
//     h5 {
//       margin-bottom: 0.5rem;
//     }
//     p {
//       margin: 0;
//       text-transform: capitalize;
//       letter-spacing: var(--letter-spacing);
//       color: var(--text-secondary-color);
//     }
//   }
//   .content {
//     padding: 1rem 1.5rem;
//   }
//   .content-center {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     row-gap: 1.5rem; /* Vertical gap between rows */
//     column-gap: 1rem; /* Horizontal gap between columns */
//     align-items: center; /* ✅ Vertically center items in each row */
//   }

//   .status {
//     border-radius: var(--border-radius);
//     text-transform: capitalize;
//     letter-spacing: var(--letter-spacing);
//     text-align: center;
//     padding: 0.5rem;
//     width: 100%;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .status.followup {
//     background-color: #facc15;
//     color: #000;
//   }
//   .status.job-link {
//     background-color: var(--primary-100);
//     color: var(--primary-700);
//     text-decoration: none;
//     gap: 0.5rem;
//   }
//   .actions,
//   .followup-actions {
//     display: flex;
//     gap: 0.5rem;
//     align-items: center;
//   }
//   /* Ensure followup-actions buttons are on the right */
//   .followup-actions {
//     justify-content: flex-start;
//   }

//   .edit-btn,
//   .delete-btn,
//   .btn-snooze,
//   .btn-done,
//   .btn-email {
//     font-size: 0.85rem;
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//     height: 35px;
//     padding: 0 0.75rem;
//   }
// `;

// export default Wrapper;

// // src/assets/styledWrappers/Job.js

// import styled from 'styled-components';

// const Wrapper = styled.article`
//   background: var(--background-secondary-color);
//   border-radius: var(--border-radius);
//   display: grid;
//   grid-template-rows: 1fr auto;
//   box-shadow: var(--shadow-2);

//   header {
//     padding: 1rem 1.5rem;
//     border-bottom: 1px solid var(--grey-100);
//     display: grid;
//     grid-template-columns: auto 1fr;
//     align-items: center;
//   }

//   .main-icon {
//     width: 60px;
//     height: 60px;
//     display: grid;
//     place-items: center;
//     background: var(--primary-500);
//     border-radius: var(--border-radius);
//     font-size: 1.5rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     color: var(--white);
//     margin-right: 2rem;
//   }

//   .info {
//     h5 {
//       margin-bottom: 0.5rem;
//     }
//     p {
//       margin: 0;
//       text-transform: capitalize;
//       letter-spacing: var(--letter-spacing);
//       color: var(--text-secondary-color);
//     }
//   }

//   .content {
//     padding: 1rem 1.5rem;
//   }

//   .content-center {
//     display: grid;
//     margin-top: 1rem;
//     margin-bottom: 1.5rem;
//     grid-template-columns: 1fr 1fr;
//     gap: 2rem; /* Increased gap for better spacing between columns */
//     align-items: start; /* Align items to the top of each column */
//   }

//   /* ✅ NEW STYLE TO FIX ALIGNMENT */
//   .content-col {
//     display: flex;
//     flex-direction: column;
//     gap: 1rem; /* This adds vertical spacing between items in a column */
//   }

//   .status {
//     border-radius: var(--border-radius);
//     text-transform: capitalize;
//     letter-spacing: var(--letter-spacing);
//     text-align: center;
//     padding: 0.5rem 1rem;
//     font-weight: 500;
//     display: flex; /* Helps align icon and text */
//     align-items: center;
//     justify-content: center;
//   }

//   .status.followup {
//     background-color: #facc15; /* yellow-400 */
//     color: #000;
//   }

//   .status.job-link {
//     background-color: var(--primary-100);
//     color: var(--primary-700);
//     text-decoration: none; /* Remove underline from links styled as buttons */
//   }

//   .actions {
//     display: flex;
//     gap: 0.5rem;
//     align-items: center;
//   }

//   .followup-actions {
//     display: flex;
//     flex-direction: column; /* Stack the followup buttons vertically */
//     gap: 0.75rem;
//   }

//   .edit-btn,
//   .delete-btn,
//   .btn-snooze,
//   .btn-done,
//   .btn-email {
//     font-size: 0.85rem;
//     display: flex;
//     align-items: center;
//     justify-content: center; /* Center content in buttons */
//     gap: 0.5rem;
//     height: 35px; /* Slightly increased height */
//     padding: 0 0.75rem;
//     width: 100%; /* Make buttons full width of the column */
//   }
// `;

// export default Wrapper;