/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']};
    }

    body{
        background: ${({ theme }) => theme['gray-900']};
        color: ${({ theme }) => theme['gray-300']};
        --webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button{
        font-family: 'Roboto', sans-serif;
    }

    *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme['gray-600']};
  }
      
    @media (max-width: 768px) {
      html {
        font-size: 87.5%;
      }
    }
`;
