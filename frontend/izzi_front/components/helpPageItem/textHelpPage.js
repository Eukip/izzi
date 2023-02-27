import React, { useState } from "react";

const TextHelpPage = ({id,question,answer}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenText, setIsOpenText] = useState(false);
  const changePosition = () => {
    setIsOpen(!isOpen);
    setIsOpenText(!isOpenText);
  };

  const [helpDescription, setHelpDescription] = useState([
      {
          id: id,
          question: question,
          answer: answer
      },
  ]);

  return (
    <div className="about-us__accordion" onClick={changePosition}>
      <div className={
          isOpen
            ? "accordion-but accordion-but-js"
            : "accordion-but accordion-but-js active "
        }
      >
          {helpDescription.map((question) => (
              <>
                  <div >{question.question}</div>
              </>
          ))}
      </div>
      <div
        className="accordion-content accordion-con-js"
        style={{ display: isOpenText ? "block" : "none" }}
      >
          {helpDescription.map((answer) => (
              <>
                  <div >{answer.answer}</div>
              </>
          ))}
      </div>
    </div>
  );
};

export default TextHelpPage;
