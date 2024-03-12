import { Link } from "react-router-dom";
import "./about.css";

const About = () => {
  return (
    <div className="aboutPageWrapper">
      <div className="aboutPageContainer">
        <p className="aboutHeader">About Page</p>
        <p className="aboutMain">
          This project was developed by Rui Duram and Kosta Kallias.
        </p>
        <p className="aboutMain">You can find them on LinkedIn</p>
        <ul>
          <li>
            <Link to="https://www.linkedin.com/fakeprofile">
              Rui's LinkedIn
            </Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/fakeprofile">
              Kostas LinkedIn
            </Link>
          </li>
        </ul>
        <p className="aboutMain">
          The projects GitHub repository can be found here
        </p>
        <ul>
          <li>
            <Link to="insert github repository">Project Repository</Link>
          </li>
        </ul>
        <p className="aboutMain">
          Additionally, the API used in this project can be found here
        </p>
        <ul>
          <li>
            <Link to="api thing">Project API</Link>
          </li>
        </ul>

        <p className="aboutMain">Here`s a brief description of the project</p>
        <div className="aboutPageDescription">
          <p>
            "Imagine having your own personal assistant right in your pocket,
            always ready to help you stay on top of your schedule. That's
            exactly what our calendar app does! It's like having a trusty
            planner that's tailored just for you. You can easily add, edit, or
            delete events with a few taps, making it a breeze to keep track of
            everything from important meetings to coffee catch-ups with friends.
            And the best part? It's all securely locked behind your own login,
            so you can trust that your personal stuff stays personal. No more
            scrambling to find that crumpled-up piece of paper with your to-do
            list or forgetting about that dentist appointment next week. Our
            app's intuitive design makes it easy to see what's coming up and
            make changes on the fly. Whether you're a busy professional juggling
            work and life or just someone who likes to stay organized, our
            calendar app is here to make your days a little bit smoother."
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
