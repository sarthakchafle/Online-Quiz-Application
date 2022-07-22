import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Link, useLocation, Navigate } from "react-router-dom";
import "./homepage.css";
import Navbar from "./Navbar";
import AuthService from "../services/auth.service";
// import Loading from "components/Loading";
// import { getHomepage } from "services/staticdata";

const useStyles = makeStyles({
  rightImage: {
    position: "relative",
    backgroundImage: (props) => props.backgroundImageSmall,
    backgroundRepeat: "no-repeat",
    backgroundSize: "min(100%, 25.875rem)",
    backgroundPosition: "right center",
    minHeight: "18.75rem",
    marginLeft: "1rem",
    "@media (min-width: 567px)": {
      backgroundPosition: "right bottom",
      backgroundSize: "min(100%, 25.875rem)",
      minHeight: "20rem",
    },
    "@media (min-width: 1023.9px)": {
      backgroundImage: "none !important",
      flex: 1,
      order: 2,
      minHeight: "35rem",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundImage: (props) => props.backgroundImageBig,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      backgroundPosition: "center center",
      display: "none",
    },
    "@media (min-width: 1024px)": {
      "&::before": {
        display: "block",
        width: "132%",
      },
    },
  },
  leftImage: {
    position: "relative",
    backgroundImage: (props) => props.backgroundImageSmall,
    backgroundRepeat: "no-repeat",
    backgroundSize: "min(90%, 25rem)",
    backgroundPosition: "left center",
    width: "100%",
    minHeight: "18rem",
    "@media (min-width: 1023.9px)": {
      backgroundImage: "none !important",
      flex: 1,
      height: "30rem",
      transform: "translateX(-157px)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundImage: (props) => props.backgroundImageBig,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      backgroundPosition: "right center",
      display: "none",
    },
    "@media (min-width: 1024px)": {
      "&::after": {
        display: "block",
        width: "120%",
      },
    },
  },
});

const Homepage = () => {
  let location = useLocation();
  const faq = [
    {
      que: "what is the minimum requirement for using this app?",
      ans: "You need only a web browser with internet access.",
    },
    {
      que: "What type of quizzes are there?",
      ans: "You will find a wide variety of quizzes from many topics.",
    },
    {
      que: "is there any subscription to use?",
      ans: "No.",
    },
  ];
  const [hpdata, setHpdata] = useState({
    header: {
      title: "",
      navlinks: [],
      navbtn: [],
    },
    herosection: {
      title: "",
      description: "",
      btntext: "",
      btnlink: "",
      imgurlsmall: "",
      imgurlbig: "",
    },
    featuresection: {
      title: "",
      description: "",
      section1: {
        title: "",
        description: "",
        imgurlsmall: "",
        imgurlbig: "",
      },
      section2: {
        title: "",
        description: "",
        imgurlsmall: "",
        imgurlbig: "",
      },
      section3: {
        title: "",
        description: "",
        imgurlsmall: "",
        imgurlbig: "",
      },
    },
    subfeaturesection: {
      first: {
        title: "",
        description: "",
        imgurl: "https://k.top4top.io/p_1987t1s2g1.png",
      },
      second: {
        title: "",
        description: "",
        imgurl: "https://l.top4top.io/p_1987w0li62.png",
      },
      third: {
        title: "",
        description: "",
        imgurl: "https://a.top4top.io/p_19874339l3.png",
      },
    },
    faqsection: {
      title: "",
      description: "",
      queans: [],
    },
    footer: {
      firstline: "",
      secondline: "",
    },
  });

  // const heroClasses = useStyles({
  //   backgroundImageSmall: `url(${hpdata.herosection.imgurlsmall})`,
  //   backgroundImageBig: `url(${hpdata.herosection.imgurlbig})`,
  // });
  // const featureSection1Classes = useStyles({
  //   backgroundImageSmall: `url(${hpdata.featuresection.section1.imgurlsmall})`,
  //   backgroundImageBig: `url(${hpdata.featuresection.section1.imgurlbig})`,
  // });

  // const featuresSection2Classes = useStyles({
  //   backgroundImageSmall: `url(${hpdata.featuresection.section2.imgurlsmall})`,
  //   backgroundImageBig: `url(${hpdata.featuresection.section2.imgurlbig})`,
  // });

  // const featureSection3Classes = useStyles({
  //   backgroundImageSmall: `url(${hpdata.featuresection.section3.imgurlsmall})`,
  //   backgroundImageBig: `url(${hpdata.featuresection.section3.imgurlbig})`,
  // });

  const heroClasses = useStyles({
    backgroundImageSmall: `url(https://i.postimg.cc/zBVKqHw6/imgonline-com-ua-Replace-Color-exa-HNFda-QS8.jpg)`,
    // backgroundImageBig: `url(https://firebasestorage.googleapis.com/v0/b/thebettercodemachine.appspot.com/o/Images%2FHomepage%2Fherosectionimage.png?alt=media&token=ffd42a20-9871-4696-9c05-9961ba4e98a7)`,
    backgroundImageBig: `url(https://i.postimg.cc/HL0bSCYv/imgonline-com-ua-Replace-Color-gyz-Cm-Ioi1ex-E.png)`,
  });
  const featureSection1Classes = useStyles({
    backgroundImageSmall: `url(https://i.postimg.cc/m2fwbVcs/kisspng-question-mark-drawing-clip-art-question-5abc078fe18131-7140285515222721439237.png)`,
    backgroundImageBig: `url(https://i.postimg.cc/m2fwbVcs/kisspng-question-mark-drawing-clip-art-question-5abc078fe18131-7140285515222721439237.png)`,
  });

  const featuresSection2Classes = useStyles({
    backgroundImageSmall: `url(https://i.postimg.cc/zBVKqHw6/imgonline-com-ua-Replace-Color-exa-HNFda-QS8.jpg)`,
    backgroundImageBig: `url(https://i.postimg.cc/HL0bSCYv/imgonline-com-ua-Replace-Color-gyz-Cm-Ioi1ex-E.png)`,
  });

  const featureSection3Classes = useStyles({
    backgroundImageSmall: `url(https://i.postimg.cc/9X4TwT3Q/imgonline-com-ua-Replace-Color-Y7u-XZXf4y-P8m-R0.png)`,
    backgroundImageBig: `url(https://i.postimg.cc/fT23RRyh/imgonline-com-ua-Replace-Color-rss-Ye6-Clg4-FDAb-M.png)`,
  });

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   console.log("loading...");
  //   getHomepage(
  //     () => {
  //       //loading
  //       setIsLoading(true);
  //     },
  //     (response) => {
  //       if (response.success) {
  //         setHpdata(response.data);
  //         setIsLoading(false);
  //       }
  //     }
  //   );
  // }, []);

  if (!AuthService.isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  const logOut = () => {
    AuthService.logout();
    //setcreateQuiz(false);
  };
  return (
    <>
      {isLoading}
      <div className="homepage">
        <header className="header">
          <div className="overlay has-fade hide-for-desktop"></div>
          <nav className="flex flex-jc-sb flex-ai-c container container--pall">
            <Link to="/home" className="header__logo logo">
              <i className="bx bxs-bookmark"></i>
              <span>Quizerra</span>
            </Link>

            <a
              href="#menu"
              id="btnHamburger"
              className="header__hamburger hide-for-desktop"
              onClick={(e) => {
                e.preventDefault();
                showMobileMenu
                  ? setShowMobileMenu(false)
                  : setShowMobileMenu(true);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>

            <div className="header__links hide-for-mobile">
              <span className="header_btns">
                <Link to={"/allQuizzes"} className="btn-red">
                  Quizzes
                </Link>
                <Link to={"/profile"} className="btn-red">
                  Profile
                </Link>
                <Link to={"/"} className="btn-red" onClick={logOut}>
                  Logout
                </Link>
              </span>
            </div>
          </nav>
          {showMobileMenu && (
            <div className="header__menu container--px  hide-for-desktop">
              {hpdata.header.navlinks.map((data, key) => (
                <Link to={data.link} key={key}>
                  {data.text}
                </Link>
              ))}
              {hpdata.header.navbtn.map((data, key) => (
                <Link to={data.link} key={key}>
                  {data.text}
                </Link>
              ))}
            </div>
          )}

          {/* <div className="header__social-icons has-fade hide-for-desktop">
                    <Link to="/">
                        <i className='bx bxl-facebook-square'></i>
                    </Link>
                    <Link to="/">
                        <i className='bx bxl-twitter'></i>
                    </Link>
                </div> */}
        </header>

        <section className="hero">
          <div className="container">
            <div className={heroClasses.rightImage}></div>

            <div className="hero__text container--pall app-name">
              <h1>Quizerra</h1>
              <p>An Online Quiz Application that Makes quizzes look easy </p>
              <Link to="/allQuizzes" className="primary-btn btn-blue">
                Quizzes
              </Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <div className="features__text container--pall">
              <h2>Features</h2>
              <p>
                Our main aim is to make attempting the online quizzes and their
                evaluation easy and intersting, by providing an user friendly
                interface for attempting quizzes and automated evaluation beign
                enabled for all the quizzes are that are available, provided an
                easy way to generate new quizzes.
              </p>
            </div>

            {/* <div className="features__list container--pall">
                        <li className="featureTap active">Simple Bookmarking</li>
                        <li className="featureTap">Speedy Searching</li>
                        <li className="featureTap">Easy Sharing</li>
                    </div> */}

            <div className="features__feature featureTap active">
              <div className={featureSection1Classes.leftImage}></div>
              <div className="feature__text container--pall">
                <h3>Easy Quiz Creation</h3>
                <p>
                  Quizerra provides an easy way to add quizzes, the creator just
                  needs to added questions of the quiz and the quiz is created
                </p>
                <Link to="/createQuiz" className="primary-btn btn-blue">
                  Create Quiz
                </Link>
              </div>
            </div>

            <div className="features__feature featureTap active">
              <div className={featuresSection2Classes.rightImage}></div>
              <div className="feature__text container--pall">
                <h3>Attempt Quiz</h3>
                <p>
                  The quizzes can be attempted by just clicking on the available
                  quizzes in the page.Each quiz has a timer attached to it,
                  which specifies a time limit to attempt the quiz, if the timer
                  runs out the quiz is submitted automatically.
                </p>
                {/* <Link to="/" className="primary-btn btn-blue">More Info</Link> */}
              </div>
            </div>

            <div className="features__feature featureTap easy--sharing active">
              <div className={featureSection3Classes.leftImage}></div>

              <div className="feature__text container--pall">
                <h3>Easy Evaluation</h3>
                <p>
                  Quizerra eleminates the need of manual answer checking by
                  providing a fast evaluation system which evaluates the user
                  based on the correcness of the reponse of each question
                  contained in the quiz.
                </p>
                {/* <Link to="/" className="primary-btn btn-blue">More Info</Link> */}
              </div>
            </div>
          </div>
        </section>

        <section className="extension container--pall">
          <div className="container">
            {/* <div className="extension__info container--px">
                        <h1>Download the extension</h1>
                        <p>
                            We’ve got more browsers in the pipeline. 
                            Please do let us know if you’ve 
                            got a favourite you’d like us to prioritize.
                        </p>
                    </div> */}

            <div className="extension__browsers-cards">
              <div className="extension__card">
                <img
                  src={hpdata.subfeaturesection.first.imgurl}
                  alt={hpdata.subfeaturesection.first.title}
                />
                <div className="card__details">
                  <h3>Web Browser</h3>
                  <span>just a web browser is needed.</span>
                </div>
                {/* <div className="card__separate"></div>
                            <button type="button" className="card__add-btn">Add & Install Extension</button> */}
              </div>

              <div className="extension__card">
                <img
                  src={hpdata.subfeaturesection.second.imgurl}
                  alt={hpdata.subfeaturesection.second.title}
                />
                <div className="card__details">
                  <h3>Variety</h3>
                  <span>contains quizzes from a lot of topics</span>
                </div>
                {/* <div className="card__separate"></div>
                        <button type="button" className="card__add-btn">Add & Install Extension</button> */}
              </div>

              <div className="extension__card">
                <img
                  src={hpdata.subfeaturesection.third.imgurl}
                  alt={hpdata.subfeaturesection.third.title}
                />
                <div className="card__details">
                  <h3>Easy to use</h3>
                  <span>User Friendly!</span>
                </div>
                {/* <div className="card__separate"></div>
                        <button type="button" className="card__add-btn">Add & Install Extension</button> */}
              </div>
            </div>
          </div>
        </section>

        <section className="faqs">
          <div className="container container--pall">
            <div className="faqs__info">
              <h1>Frequently Asked Questions</h1>
              <p>
                Here are some of our FAQs. If you have any other questions you’d
                like answered please feel free to email us.
              </p>
            </div>

            <div className="faqs__questions">
              {faq.map((data, key) => {
                return (
                  <div className="questions__question" key={key}>
                    <input
                      type="radio"
                      name="InpRadio"
                      className="question__input-radio"
                      id={"faqsQuestion" + (key + 1)}
                    />

                    <label
                      htmlFor={"faqsQuestion" + (key + 1)}
                      className="question__info"
                    >
                      <h3>{data.que}</h3>
                      <span>
                        <i className="bx bx-chevron-down"></i>
                      </span>
                    </label>

                    <div className="question__text">
                      <p>{data.ans}</p>
                    </div>
                  </div>
                );
              })}

              {/* <Link to="/" className="faqs__cta">More Info</Link> */}
            </div>
          </div>
        </section>

        <section className="contact">
          <div className="container container--pall">
            <div className="contact__header">
              <span className="contact__header--subtitle">
                An Online Quiz App
              </span>
              <h1 className="contact__header--title">
                An Online Quiz Application that Makes quizzes look easy
              </h1>
            </div>

            {/* <form className="contact__form">
                        <div className="form__input--group form__input--group--email">
                            <input className="form__input form__input--email" type="text" name="email" placeholder="Enter your email address"/>
                            <span className="form__input--error--icon"><i className='bx bxs-error-circle'></i></span>
                            <span className="form__input--error--message"></span>
                        </div>

                        <div className="form__input--group form__input--group--submit">
                            <input className="form__input form__input--submit" type="submit" value="Contact Us"/>
                        </div>
                    </form> */}
          </div>
        </section>

        <footer className="footer">
          <div className="container container--px">
            <div className="footer__left">
              <Link to="/" className="footer__left--logo logo">
                <i className="bx bxs-bookmark"></i>
                <span className="app-name">Quizerra</span>
              </Link>

              <ul className="footer__left--links">
                <li>
                  <Link to={"/login"}>login</Link>
                </li>
                <li>
                  <Link to={"/register"}>register</Link>
                </li>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                )
              </ul>
            </div>

            {/* <div className="footer__right">
                        <div className="footer__right--icons">
                            <Link to="/"><i className='bx bxl-facebook-square'></i></Link>
                            <Link to="/"><i className='bx bxl-twitter'></i></Link>
                        </div>
                    </div> */}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
