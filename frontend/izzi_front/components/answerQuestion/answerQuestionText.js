import React, { useState } from "react";

const AnswerQuestionText = ({title,description}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [isOpenText, setIsOpenText] = useState(false);
  const changePosition = () => {
    setIsOpenDescription(!isOpenDescription);
    setIsOpenText(!isOpenText);
  };

  const [helpDescriptionText, setHelpDescriptionText] = useState([
      {
          title: title,
          description:description
      },
  ]);

  return (
    <div className="about-us__accordion" onClick={changePosition}>
      <div className={
          isOpenDescription
            ? "accordion-but accordion-but-js"
            : "accordion-but accordion-but-js active "
        }
      >
          {helpDescriptionText.map((item) => (
              <>
                  <div key={item.id}>{item.title}</div>
              </>
          ))}
      </div>
      <div
        className="accordion-content accordion-con-js"
        style={{ display: isOpenText ? "block" : "none" }}
      >
          {helpDescriptionText.map((description) => (
              <>
                  <div key={description.id}>{description.description}</div>
              </>
          ))}
      </div>
    </div>
  );
};

export default AnswerQuestionText;
