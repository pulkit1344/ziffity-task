import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import PropTypes from "prop-types";

const PlanetsModal = ({ showModal, toggleHandler, handleFormSubmit }) => {
  return (
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
            <Input type="number" name="diameter" id="diameter" required />
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
            <Button color="secondary" type="button" onClick={toggleHandler}>
              Cancel
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default PlanetsModal;

PlanetsModal.propTypes = {
  showModal: PropTypes.bool,
  toggleHandler: PropTypes.func,
  handleFormSubmit: PropTypes.func,
};
