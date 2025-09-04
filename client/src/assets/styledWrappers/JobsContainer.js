import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  .followup-details {
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.followup-actions .btn {
  font-size: 0.75rem;
  padding: 0.4rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
export default Wrapper;