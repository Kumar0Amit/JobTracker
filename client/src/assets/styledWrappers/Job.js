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
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: center;
  }

  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    padding: 0.5rem 1rem;
    font-weight: 500;
  }

  .status.followup {
    background-color: #facc15;
    color: #000;
  }

  .status.job-link {
    background-color: var(--primary-100);
    color: var(--primary-700);
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .followup-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .edit-btn,
  .delete-btn,
  .btn-snooze,
  .btn-done,
  .btn-email {
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    height: 30px;
    padding: 0 0.75rem;
  }
`;

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
//     grid-template-columns: 1fr;
//     row-gap: 1.5rem;
//     align-items: center;
//     @media (min-width: 576px) {
//       grid-template-columns: 1fr 1fr;
//     }
//   }
//   .status {
//     border-radius: var(--border-radius);
//     text-transform: capitalize;
//     letter-spacing: var(--letter-spacing);
//     text-align: center;
//     width: 100px;
//     height: 30px;
//     display: grid;
//     align-items: center;
//   }

//   .status.followup {
//       background-color: #facc15;
//       color: #000;
//       font-weight: 500;
//       width:150px;
//     }

//     .status.job-link {
//       background-color: var(--primary-100);
//       color: var(--primary-700);
//       font-weight: 500;
//       width:170px;
      
//     }
//   .actions {
//     margin-top: 1rem;
//     display: flex;
//     align-items: center;
//   }
//   .edit-btn,
//   .delete-btn {
//     height: 30px;
//     font-size: 0.85rem;
//     display: flex;
//     align-items: center;
//   }
//   .edit-btn {
//     margin-right: 0.5rem;
//   }
// `;


export default Wrapper;