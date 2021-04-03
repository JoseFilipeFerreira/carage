import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Carage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <navbar>
        <div className="text-title logo">CARAGE</div>
        <div className="navbar-options">
          <div>
            <a href="#" className="text-subhead navbar-option-hover">Home</a>
          </div>
          <div>
            <a href="#" className="text-subhead navbar-option-hover">About</a>
          </div>
          <div>
            <a href="#" className="text-subhead navbar-option-hover">Contact</a>
          </div>
        </div>
        <div className="sign">
          <div className="signin">
            <a href="#" className="text-button navbar-option-hover">Sign In</a>
          </div>
          <div className="signup">
            <a href="#" className="text-button">Sign Up</a>
          </div>
        </div>
      </navbar>

      <main>
        <img src="assets/homepage_image.svg" height="50%"></img>
        <div className="homepage-text">
          <div className="text-title">LoremWhat is Lorem Ipsum?</div>
          <div className="text-body homepage-body">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </div>
      </main>

      <footer>
        <div className="text-footnote direitos">
          2021 © Todos os direitos reservados
        </div>
        <div className="social">
          <a href="#">
            <img src="assets/facebook.svg" height="40%"></img>
          </a>
          <a href="#">
            <img src="assets/instagram.svg" height="40%"></img>
          </a>
          <a href="#">
            <img src="assets/twitter.svg" height="40%"></img>
          </a>
        </div>
        <div className="text-footnote made-with">
          Made with <span>❤️</span> by Group 7
        </div>
      </footer>

      <style jsx>{`
        .container {
          display: grid;
          grid-template-rows: 88px auto 100px;
          justify-items: center;
          align-content: stretch;
          height: 100vh;
        }

        navbar {
          justify-self: stretch;
          left: 0px;
          right: 0px;
          top: 0px;
          bottom: 0px;
          background: #151417;
          border: 1px solid #151417;
          color: #f0f0f1;
          display: grid;
          grid-template-columns: 20% 12% auto 12% 20%;
          justify-items: center;
          align-items: center;
        }

        main {
          display: flex;
          flex-direction: row;
          justify-items: center;
          align-items: center;
          padding-right: 20%;
          padding-left: 20%;
        }

        footer {
          justify-self: stretch;
          left: 0px;
          right: 0px;
          top: 0px;
          bottom: 0px;
          background: #151417;
          border: 1px solid #151417;
          color: #f0f0f1;
          display: grid;
          grid-template-columns: 20% 15% auto 15% 20%;
          justify-items: center;
          align-items: center;
        }

        .navbar-options {
          display: flex;
          flex-direction: row;
        }

        .navbar-options div {
          padding: 16px;
          align-self: center;
          flex-grow: 2;
        }

        .navbar-option-hover {
          transition: 0.2s ease;
        }

        .navbar-option-hover:hover {
          color: var(--LEI3);
          transition: 0.2s ease;
        }

        .logo {
          grid-column-start: 2;
          grid-column-end: 3;
          justify-self: start;
          color: #ff5023;
        }

        .sign {
          justify-self: end;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .signup {
          display: flex;
          background-color: var(--LEI3);
          height: 46px;
          width: 94px;
          justify-content: center;
          align-items: center;
          margin-left: 32px;
        }
        
        .signup a:hover {
          background-color: var(--LEI3);
        }

        .homepage-text {
          margin-left: 5%;
          text-align: center;
        }

        .homepage-body {
          margin-top: 5%;
        }

        .direitos {
          justify-self: start;
          grid-column-start: 2;
          grid-column-end: 3;
        }

        .made-with {
          justify-self: end;
        }

        .social a + a {
          margin-left: 25px;
        }
      `}</style>

      <style jsx global>{`
        :root {
          --LEI1: #151417;
          --LEI2: #1f1e21;
          --LEI3: #ff5023;
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
        a:hover, a:visited, a:link, a:active {
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
      `}</style>
    </div>
  );
}
