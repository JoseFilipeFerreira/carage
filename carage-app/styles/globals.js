import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
          --LEI1: #151417;
          --LEI1-1: rgba(21, 20, 23, 0.7);
          --LEI2: #1f1e21;
          --LEI2-1: #3e3c42;
          --LEI2-2: #262529;
          --LEI3: #ff5023;
          --LEI3-1: #ff7f5e;
          --LEI4: #4f73cf;
          --LEI4-1: #6188ed;
          --LEI5: #f0f0f1;
          --LEI6: #27AE60;
          --LEI6-1: #6FCF97;
          --LEI7: #9B51E0;
          --LEI7-1: #BB6BD9;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          background-color: var(--LEI1);
        }

        *,
        *::after,
        *::before {
          padding: 0;
          margin: 0;
          font-family: Gotham, "Inter", -apple-system, BlinkMacSystemFont,
            "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
            "Droid Sans", "Helvetica Neue", sans-serif;
          color: var(--LEI5);
        }

        a:hover,
        a:visited,
        a:link,
        a:active {
          text-decoration: none;
        }

        .text-title {
          /* font-weight: bold; */
          font-size: 24px;
          line-height: 26px;
        }

        .text-button {
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;
        }

        .text-subhead {
          font-weight: bold;
          font-size: 15px;
          line-height: 18px;
        }

        .text-body {
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
        }

        .text-footnote {
          font-weight: 500;
          font-size: 13px;
          line-height: 18px;
        }

        .text-headline {
          /* font-weight: bold; */
          font-size: 20px;
          line-height: 24px;
        }

        * {
          box-sizing: border-box;
        }
`;
