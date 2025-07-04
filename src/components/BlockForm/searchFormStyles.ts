import styled from "styled-components"
// BlockTitle styles
export const Titulo = styled.h1`
  font-size: 1.5em;
  text-align: center;
`
export const Wrapper = styled.section`
  margin: 0;
`
export const SubTitle = styled.h2`
  font-size: 1em;
  text-align: center;
`

// /searchForm Styles
export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;


export const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
`;


export const FormSection = styled.div`
  max-width: 900px;
  margin: 2rem auto 1rem auto;
  padding: 0 1rem;
`;


export const InputsRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const LabelGroup = styled.div`
  margin: 1rem 0rem;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 250px;

  select,
  input {
    height: 35px;
    padding: 0 0.75rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
  }
`;


export const ErrorText = styled.p`
  color: red;
  font-size: 0.75rem;
  position: absolute;
  top: 3.5rem;
  bottom: 0;
  left: 3rem;
  margin: 0;
  white-space: nowrap;
`;

export const Button = styled.button`
  background-color: #007bff;
  margin: 1rem 0rem;
  color: white;
  border: none;
  height: 35px;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1.6rem;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;


// Resultados.tsx styles


export const ResultWrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 2rem;

  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);

  .p-datatable {
    border: none;
  }

  .p-datatable-thead > tr > th {
    background-color: #007acc;
    color: white;
    font-weight: 600;
    padding: 1rem 1.2rem;
    border-bottom: 2px solid #005999;
  }

  .p-datatable-tbody > tr > td {
    padding: 0.8rem 1.2rem;
    border-bottom: 1px solid #eee;
    color: #333;
  }

  .p-datatable-tbody > tr:hover {
    background-color: #e6f2ff;
    cursor: pointer;
  }
`;
export const Texto = styled.p`
  margin-bottom: 1rem;
  color: #666;
  font-size: 1.1rem;
  text-align: center;
  padding: 1rem 0;
`;

export const DialogContent = styled.div`
  p {
    margin: 0.5rem 0;
  }
  b {
    color: #222;
  }
`;

// Modal styles

export const ModalOverlay = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  padding: 2rem;
  width: 450px;
  max-width: 95vw;
  max-height: 80vh;
  overflow-y: auto;
  color: #222;
`;







