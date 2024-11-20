import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "./button";

function MainContent() {

  const navigate = useNavigate(); 

  const goToOperations = () => {
    navigate("/stats");  
  };
  return (
    <div id="overlay">
      <div id="main">
        <section id="content">
          <h1>Our Mission:</h1>
          <p>
            Embarking on the drone project for gas sensing in mining
            environments is a pioneering leap toward ensuring safety and
            sustainability in one of the world's most hazardous industries.
            Mining operations are often plagued by the presence of toxic gases
            that pose significant risks to miners' health and safety.
            Integrating drone technology with advanced gas sensing capabilities
            offers a transformative solution, enabling real-time monitoring and
            early detection of harmful gases, which traditional methods might
            miss. This initiative not only enhances safety measures by providing
            timely alerts and reducing the need for human entry into dangerous
            zones but also streamlines operations, making them more efficient
            and cost-effective. By leveraging cutting-edge technology, this
            project underscores a commitment to innovation and demonstrates how
            technological advancements can drive substantial improvements in
            worker safety and environmental management in mining environments.
          </p>
          <p id="gasList">
            The Gas Scout can sense the following gasses:
            <ul>
              <li>Carbon Monoxide (CO)</li>
              <li>Methane (CH4)</li>
              <li>Butane (C4H10)</li>
              <li>Liquefied Petroleum Gas - Propane (C3H8)</li>
            </ul>
          </p>
          <p id="teamList">
            Meet The Team:
            <ul className="team">
              <li>
                <img src="/images/xander.png" />
                <h4>Xander Glanninger</h4>
              </li>
              <li>
                <img src="/images/willem.png" />
                <h4>Willem Paton</h4>
              </li>
              <li>
                <img src="/images/wianN.png" />
                <h4>Wian van Niekerk</h4>
              </li>
            </ul>
            <ul className="team">
              <li>
                <img src="/images/wianJ.png" />
                <h4>Wian Joubert</h4>
              </li>
              <li>
                <img src="/images/werner.png" />
                <h4>Werner Janse van Rensburg</h4>
              </li>
              <li>
                <img src="/images/zeldene.png" />
                <h4>Zeldene van Vüren</h4>
              </li>
            </ul>
          </p>
          <CustomButton onClick={goToOperations}>Let's go!</CustomButton>
        </section>
      </div>
    </div>
  );
}

export default MainContent;
