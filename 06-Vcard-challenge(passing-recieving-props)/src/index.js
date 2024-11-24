import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillSet />
      </div>
    </div>
  );
}

function Avatar() {
  return <img src="image.jpg" alt="Salman" className="avatar"></img>;
}
function Intro() {
  return (
    <div>
      <h1>Salman</h1>
      <p>
        An adventurous soul who loves exploring nature, cooking in the jungle,
        and capturing breathtaking photos of forests and high mountains. You're
        also a budding React developer, documenting your learning journey and
        sharing it with the world, complemented by inspiring short quotes for
        social media reels.
      </p>
    </div>
  );
}

function SkillSet() {
  return (
    <div className="skill-list">
      <SkillList skill="HTML" emoji="💪" color="#123456" />
      <SkillList skill="CSS" emoji="💪" color="orange" />
      <SkillList skill="Javascript" emoji="❤️" color="blue" />
      <SkillList skill="React" emoji="❤️" color="blue" />
    </div>
  );
}
function SkillList(prop) {
  return (
    <div className="skill" style={{ backgroundColor: prop.color }}>
      <span>{prop.skill}</span>
      <span>{prop.emoji}</span>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
