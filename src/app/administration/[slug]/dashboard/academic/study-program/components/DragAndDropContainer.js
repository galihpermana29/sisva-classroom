import { Stack } from "@mui/material";
import update from "immutability-helper";
import { useCallback } from "react";

import { DragAndDropCard } from "./DragAndDropCard.js";
const style = {
  width: 400,
};
export const DragAndDropContainer = ({
  data,
  formik,
  cards,
  setCards,
  DeleteGrade,
}) => {
  {
    // let temp = [];
    // data.map((grade, index) => {
    //   let tempObject = {
    //     id: index,
    //     text: grade,
    //   };
    //   temp.push(tempObject);
    // });

    // const [cards, setCards] = useState(temp);
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    }, []);
    const renderCard = useCallback((card, DeleteGrade, index) => {
      return (
        <DragAndDropCard
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          DeleteGrade={DeleteGrade}
        />
      );
    }, []);

    return (
      <>
        <Stack
          sx={{
            backgroundColor: "base.base20",
            p: 1,
            pt: "12px",
            borderRadius: 2,
            height: 200,
            overflowY: "scroll",
          }}
        >
          {cards.map((card, i) => renderCard(card, DeleteGrade, i))}
        </Stack>
      </>
    );
  }
};
