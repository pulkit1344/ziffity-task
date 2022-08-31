import "./Films.css";

import Grid from "../Grid";
import { useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import { dataLoadingState, dataState } from "./filmsSlice";
import { useDispatch, useSelector } from "react-redux";

function Films() {
  const history = useHistory();
  const dispatch = useDispatch();
  const films = useSelector(state => state.films)
  const mappedFilms =
    films?.items?.results?.filter((item) =>
      history.location.state.films.includes(item.url)
    ) || [];

  useEffect(() => {
    async function fetchFilms() {
      try {
        dispatch( dataLoadingState(true) )
        let response = await fetch("https://swapi.dev/api/films/");
        response = await response.json();
        dispatch(dataState(response))
      } catch (err) {
      } finally {
        dispatch( dataLoadingState(false) )
      }
    }

    fetchFilms();
  }, []);

  const data = {
    header: [
      { label: "title", type: "string" },
      { label: "episode_id", type: "number" },
      { label: "opening_crawl", type: "string" },
      { label: "director", type: "string" },
      { label: "producer", type: "string" },
      { label: "release_date", type: "string" },
    ],
    values: mappedFilms,
    actions: [
      {
        label: "Go to Residents",
        action: (row) => {
          history.push({
            pathname: `/${row.title}/residents`,
            state: { residents: row.characters },
          });
        },
      },
    ],
  };

  return (
    <div className="App">
      <h1>Films</h1>
      {films?.loading ? <div className="spinner-container"><Spinner>Loading...</Spinner> </div> : <Grid data={data} />}
    </div>
  );
}

export default Films;