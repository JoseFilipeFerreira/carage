import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
          --LEI1: #151417;
          --LEI2: #1f1e21;
          --LEI3: #ff5023;
          --LEI3-1: #ff7f5e;
          --LEI4: #4f73cf;
          --LEI5: #f0f0f1;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Gotham, "Inter", -apple-system, BlinkMacSystemFont,
            "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
            "Droid Sans", "Helvetica Neue", sans-serif;
          background-color: var(--LEI1);
          color: var(--LEI5);
        }
        a:hover,
        a:visited,
        a:link,
        a:active {
          text-decoration: none;
        }

        .text-title {
          font-family: Gotham;
          font-style: normal;
          font-weight: 500;
          font-size: 24px;
          line-height: 26px;
          color: #f0f0f1;
        }

        .text-button {
          font-family: Gotham;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;

          color: #f0f0f1;
        }

        .text-subhead {
          font-family: Gotham;
          font-style: normal;
          font-weight: bold;
          font-size: 15px;
          line-height: 18px;
          color: #f0f0f1;
        }

        .text-body {
          font-family: Gotham;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
        }

        .text-footnote {
          font-family: Gotham;
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 18px;
        }

        * {
          box-sizing: border-box;
        }
`;
