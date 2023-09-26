import React, { useState } from "react";
import ReactDragListView from "react-drag-listview";

interface Item {
  title: string;
}

const Demo: React.FC = () => {
  const [data, setData] = useState<Item[]>(() => {
    const initialData: Item[] = [];
    for (let i = 1; i < 21; i++) {
      initialData.push({
        title: `rows${i}`,
      });
    }
    console.log("initialData", initialData);
    return initialData;
  });

  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    console.log("drag ", fromIndex, toIndex);

    const updatedData = [...data];

    const [movedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedItem);
    setData(updatedData);
  };

  const dragProps = {
    onDragEnd: handleDragEnd,
    nodeSelector: "li",
    handleSelector: "a",
  };

  return (
    <div className="simple simple1">
      <h2>Dragging handle</h2>
      <div className="simple-inner">
        <ReactDragListView {...dragProps}>
          <ol>
            {data.map((item, index) => (
              <li key={index}>
                {item.title}
                <a>Start Drag</a>
              </li>
            ))}
          </ol>
        </ReactDragListView>
      </div>
    </div>
  );
};

export default Demo;
