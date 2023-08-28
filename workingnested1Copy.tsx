import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface FollowUpQuestion {
  question: string;
  answers: string;
  index: string;
  followup: FollowUpQuestion[];
}

interface QNAItem {
  question: string;
  answers: string;
  index: string;
  followUp: FollowUpQuestion[];
}

const App: React.FC = () => {
  const createUUID = (): string => {
    return uuidv4();
  };

  const [qna, setQna] = useState<QNAItem[]>([
    {
      question: "",
      answers: "",
      index: createUUID(),
      followUp: [],
    },
  ]);

  const handleAddQuestion = () => {
    setQna((prevQna) => [
      ...prevQna,
      {
        question: "",
        answers: "",
        index: createUUID(),
        followUp: [],
      },
    ]);
  };

  const handleAddFollowUp = (questionIndex: number) => {
    setQna((prevQna) => {
      const updatedQna = [...prevQna];
      const followUpUUID = createUUID();
      updatedQna[questionIndex].followUp.push({
        question: "",
        answers: "",
        index: followUpUUID,
        followup: [],
      });
      return updatedQna;
    });
  };

  return (
    <div>
      {qna.length > 0 &&
        qna?.map((item, questionIndex) => (
          <div key={item.index}>
            <input
              type="text"
              value={item.question}
              placeholder="Question"
              onChange={(e) => {
                const value = e.target.value;
                setQna((prevQna) => {
                  const updatedQna = [...prevQna];
                  updatedQna[questionIndex].question = value;
                  return updatedQna;
                });
              }}
            />
            <input
              type="text"
              value={item.answers}
              placeholder="Answers"
              onChange={(e) => {
                const value = e.target.value;
                setQna((prevQna) => {
                  const updatedQna = [...prevQna];
                  updatedQna[questionIndex].answers = value;
                  return updatedQna;
                });
              }}
            />
            <button onClick={() => handleAddFollowUp(questionIndex)}>
              Add Follow-up
            </button>
            <div>
              {item?.followUp.length > 0 &&
                item?.followUp?.map((followUp, followUpIndex) => (
                  <div key={followUp.index}>
                    <input
                      type="text"
                      value={followUp.question}
                      placeholder="Follow-up Question"
                      onChange={(e) => {
                        const value = e.target.value;
                        setQna((prevQna) => {
                          const updatedQna = [...prevQna];
                          updatedQna[questionIndex].followUp[
                            followUpIndex
                          ].question = value;
                          return updatedQna;
                        });
                      }}
                    />
                    <input
                      type="text"
                      value={followUp.answers}
                      placeholder="Follow-up Answers"
                      onChange={(e) => {
                        const value = e.target.value;
                        setQna((prevQna) => {
                          const updatedQna = [...prevQna];
                          updatedQna[questionIndex].followUp[
                            followUpIndex
                          ].answers = value;
                          return updatedQna;
                        });
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default App;
