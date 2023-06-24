import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleHoliday from "./SingleHoliday";
const url = "https://react--course-api.herokuapp.com/api/v1/data/vacanze";

const Holiday = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);

  //funzione per scegleiere il prossimo valore di selected
  const nextHoliday = () => {
    setSelected((prevValue) => {
      if (prevValue + 1 === data.data.length) {
        return 0;
      } else {
        return prevValue + 1;
      }
    });
  };

  const backHoliday = () => {
    setSelected((backValue) => {
      if (backValue - 1 < 0) {
        return data.data.length - 1;
      } else {
        return backValue - 1;
      }
    });
  };

  //funzione per prendere i dati dall'api
  const getData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Return condizionale per risolvere la Promise
  if (data.success) {
    return (
      <>
        {
          //Ternary Operator per controllare il numero di vacanze
          data.data.length > 0 ? (
            <SingleHoliday
              {...data.data[selected]}
              next={nextHoliday}
              back={backHoliday}
            />
          ) : (
            <h4>No Vacanze</h4>
          )
        }
      </>
    );
  } else {
    return <h2>Loading...</h2>;
  }
};

export default Holiday;
