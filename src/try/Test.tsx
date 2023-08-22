import React, { useState } from "react";
import { create_UUID } from "../utils/UUID";

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

const QNAComponent: React.FC<{
  qna: any;
  onUpdate: (updatedQna: QNAItem[]) => void;
}> = ({ qna, onUpdate }) => {
  const createUUID = (): string => {
    return create_UUID();
  };

  const handleAddQuestion = () => {
    const updatedQna = [...qna];
    updatedQna.push({
      question: "",
      answers: "",
      index: createUUID(),
      followUp: [],
    });
    onUpdate(updatedQna);
  };

  //   const handleAddFollowUp = (questionIndex: number) => {
  //     const updatedQna = [...qna];
  //     const followUpUUID = createUUID();
  //     console.log("updatedQna", updatedQna[questionIndex]);

  //     updatedQna[questionIndex].followUp.length > 0 &&
  //       updatedQna[questionIndex].followUp.push({
  //         question: "",
  //         answers: "",
  //         index: followUpUUID,
  //         followup: [],
  //       });
  //     console.log("push test", updatedQna);

  //     onUpdate(updatedQna);
  //   };

  return (
    <div>
      {qna.map((item: any, questionIndex: any) => (
        <div key={item.index}>
          <input
            type="text"
            value={item.question}
            placeholder="Question"
            onChange={(e) => {
              const value = e.target.value;
              const updatedQna = [...qna];
              updatedQna[questionIndex].question = value;
              onUpdate(updatedQna);
            }}
          />
          <input
            type="text"
            value={item.answers}
            placeholder="Answers"
            onChange={(e) => {
              const value = e.target.value;
              const updatedQna = [...qna];
              updatedQna[questionIndex].answers = value;
              onUpdate(updatedQna);
            }}
          />
          {/* <button onClick={() => handleAddFollowUp(questionIndex)}>
            Add Follow-up
          </button> */}
          <QNAComponent
            qna={item.followUp}
            onUpdate={(updatedFollowUp) => {
              const updatedQna = [...qna];
              updatedQna[questionIndex].followUp = updatedFollowUp;
              onUpdate(updatedQna);
            }}
          />
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question </button>
    </div>
  );
};

const TryMain: React.FC = () => {
  const createUUID = (): string => {
    return create_UUID();
  };
  const [qna, setQna] = useState<QNAItem[]>([
    {
      question: "",
      answers: "",
      index: createUUID(),
      followUp: [],
    },
  ]);
  console.log("qnaa", qna);

  return (
    <div>
      <QNAComponent qna={qna} onUpdate={setQna} />
    </div>
  );
};

export default TryMain;
