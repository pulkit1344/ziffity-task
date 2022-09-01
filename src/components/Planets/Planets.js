import "./Planets.css";
import PropTypes from "prop-types";

import Grid from "../Grid";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { dataLoadingState, dataState } from "./planetsSlice";
import PlanetsModal from "./PlanetsModal";

function Planets({ additionalColumns = [], setShowToast = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const planets = useSelector((state) => state.planets);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        dispatch(dataLoadingState(true));
        let response = await fetch("https://swapi.dev/api/planets/");
        response = await response.json();
        dispatch(dataState(response));
      } catch (err) {
      } finally {
        dispatch(dataLoadingState(false));
      }
    }

    fetchPlanets();
  }, []);

  const data = {
    customColumns: additionalColumns,
    header: [
      { label: "name", type: "string" },
      { label: "rotation_period", type: "number" },
      { label: "orbital_period", type: "number" },
      { label: "diameter", type: "number" },
      { label: "climate", type: "string" },
      { label: "gravity", type: "string" },
      { label: "terrain", type: "string" },
      { label: "surface_water", type: "number" },
      { label: "population", type: "number" },
    ],
    values: planets?.items.results || [],
    actions: [
      {
        label: "Go to Films",
        action: (row) => {
          history.push({
            pathname: `${row.name}/films`,
            state: { films: row.films },
          });
        },
        hideIfEmpty: "films",
      },
      {
        label: "Go to Residents",
        action: (row) => {
          history.push({
            pathname: `${row.name}/residents`,
            state: { residents: row.residents },
          });
        },
        hideIfEmpty: "residents",
      },
      {
        label: "Add Planet",
        action: (row) => {
          setShowModal(true);
        },
      },
      {
        label: "Planet Details",
        action: (row) => {
          history.push({
            pathname: `${row.name}/details`,
            state: { details: row },
          });
        },
      },
    ],
  };

  const toggleHandler = () => {
    setShowModal((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setShowToast(true);
  };

  return (
    <>
      <div className="App">
        {planets.loading ? (
          <div className="spinner-container">
            <Spinner>Loading...</Spinner>
          </div>
        ) : (
          <>
            <Grid data={data} />
            <PlanetsModal
              showModal={showModal}
              toggleHandler={toggleHandler}
              handleFormSubmit={handleFormSubmit}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Planets;

Planets.propTypes = {
  additionalColumns: PropTypes.array,
  setShowToast: PropTypes.func,
};
