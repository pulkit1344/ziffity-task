import "./Residents.css";

import Grid from "../Grid";
import { useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { dataLoadingState, dataState } from "./residentsSlice";

function Films() {
  const dispatch = useDispatch();
  const residents = useSelector(state => state.residents)

  const history = useHistory();

  useEffect(() => {
    async function fetchResidents() {
      try {
        dispatch( dataLoadingState(true))
        await Promise.all(
          history.location.state.residents.map((url) =>
            fetch(url).then((resp) => resp.json())
          )
        ).then((res) => dispatch(dataState(res)));
      } catch (err) {
      } finally {
        dispatch( dataLoadingState(false))
      }
    }

    fetchResidents();
  }, []);

  const data = {
    header: [
      { label: "name", type: "string" },
      { label: "height", type: "number" },
      { label: "mass", type: "number" },
      { label: "hair_color", type: "string" },
      { label: "skin_color", type: "string" },
      { label: "eye_color", type: "string" },
      { label: "birth_year", type: "string" },
      { label: "gender", type: "string" },
    ],
    values: residents.items,
    actions: [{
        label: "Go to Films",
        action: (row) => {
          history.push({
            pathname: `/${row.name}/films`,
            state: { films: row.films },
          });
        },
        hideIfEmpty: "films",
      },],
  };

  return (
    <div className="App">
      <h1>Residents</h1>
      {residents.loading ? <div className="spinner-container"> <Spinner>Loading...</Spinner></div> : <Grid data={data} />}
    </div>
  );
}

export default Films;