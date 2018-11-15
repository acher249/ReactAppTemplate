import React, { Component } from "react";
import UploadForm from "../../components/UploadForm";
// import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";

// import Login from "../../pages/Login";

class ProjectManager extends Component {


  render() {

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <br></br>
          <h4 style={{textAlign: "center"}} >Manage Your Projects</h4>
          <br></br>

            {/* LOGIC FOR UPLOADING NEW PROJECT GOES HERE.. NEED A FORM COMPONENET */}

            <UploadForm>

            </UploadForm>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProjectManager;
