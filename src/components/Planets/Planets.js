import "./Planets.css";
import PropTypes  from "prop-types";

import Grid from "../Grid";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import  {  dataLoadingState, dataState } from "./planetsSlice";

function Planets({ additionalColumns = [], setShowToast = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const planets = useSelector(state => state.planets)


  useEffect(() => {
    async function fetchPlanets() {
      try {
        dispatch( dataLoadingState(true) )
        let response = await fetch("https://swapi.dev/api/planets/");
        response = await response.json();
        dispatch(dataState(response))
      } catch (err) {
      } finally {
        dispatch( dataLoadingState(false) )
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
            <Modal isOpen={showModal} toggle={toggleHandler}>
              <ModalHeader toggle={toggleHandler}>Add Planet</ModalHeader>
              <ModalBody>
                <Form action="/" onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="rotation_period">rotation_period</Label>
                    <Input
                      type="number"
                      name="rotation_period"
                      id="rotation_period"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="orbital_period">orbital_period</Label>
                    <Input
                      type="number"
                      name="orbital_period"
                      id="orbital_period"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="diameter">diameter</Label>
                    <Input
                      type="number"
                      name="diameter"
                      id="diameter"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="climate">climate</Label>
                    <Input type="text" name="climate" id="climate" required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="gravity">gravity</Label>
                    <Input type="text" name="gravity" id="gravity" required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="terrain">terrain</Label>
                    <Input type="select" name="terrain" id="terrain" required>
                      <option>desert</option>
                      <option>grasslands</option>
                      <option>mountains</option>
                      <option>jungle</option>
                      <option>lakes</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="surface_water">surface_water</Label>
                    <Input
                      type="number"
                      name="surface_water"
                      id="surface_water"
                      required
                    />
                  </FormGroup>
                  <div className="modal-footer">
                    <Button color="primary" type="submit">
                      Submit
                    </Button>{" "}
                    <Button
                      color="secondary"
                      type="button"
                      onClick={toggleHandler}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}

export default Planets;

Planets.propTypes = {
  additionalColumns : PropTypes.array ,
  setShowToast: PropTypes.func
}