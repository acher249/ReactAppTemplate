import React from "react";
import { Tabs, Tab } from 'react-bootstrap';
import firebase from "../../Firebase";

const UploadForm = props => {

  //js
  // const { SendNewProjectToDB } = props;

  var SendNewProjectToDB = () => {

    // trying to get page to stop refreshing
    // alert("say something")
    // event.preventDefault();
    
    var projectName = document.getElementById("projectName").value;
    var clientName = document.getElementById("clientName").value;
  
    var inputAddress = document.getElementById("inputAddress").value;
    var inputSuite = document.getElementById("inputSuite").value;
    var inputCity = document.getElementById("inputCity").value;
    var inputState = document.getElementById("inputState").value;
    var inputZip = document.getElementById("inputZip").value;
  
    //not gettings the inputs
    // should get this from props
    var user = firebase.auth().currentUser;
  
    // This should come from props not fropm firebase
    console.log("upload url: " + user.uid + '/Projects/' + projectName);
    // console.log("upload url: " + props.userID + '/Projects/' + projectName);

    var database = firebase.database();
  
    // This should come from props not fropm firebase
    database.ref().child(user.uid + '/Projects/' + projectName).update({

  
  
      // use logged in user ID as the key to create new child in DB for projects
      //SCHEMA
      projectName: projectName,
      clientName: clientName,
  
      projectAddress: {
        inputAddress: inputAddress,
        inputSuite: inputSuite,
        inputCity: inputCity,
        inputState: inputState,
        inputZip: inputZip,
      }
  
    });

    SendBundleToStorage();
  };

  // Send the Asset Bundle file to Firebase Storage
  var SendBundleToStorage = () => {

    var user = firebase.auth().currentUser;
    var projectName = document.getElementById("projectName").value;

    console.log("Storage Ref Path: ");
    console.log(user.uid + '/Projects/' + projectName);

    // Get reference to the path in storage where we want to hold the Asset Bundles
    // var storageRef = firebase.storage().ref(LoggedInUserID + "/Projects/" + projectName);
    // var storageRef = firebase.storage().ref().child(user.uid + '/Projects/' + projectName);
    var storageRef = firebase.storage().ref();


    // Store the "file" that we just uploaded from the html input file below.
    var file = document.getElementById('inputFile').files[0];

    console.log("file: ");
    console.log(file);

    const metadata = { contentType: file.type };

    // Send it off to Firebase..
    // need to figure out multiple files per project..
    // name of file cannot be the project name...
    var task = storageRef.child(user.uid + '/Projects/' + projectName).put(file, metadata);

    var database = firebase.database();

    // send off file to storage and send url to db
    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => 
      
      // send off direct download link to db to be used in unity
      database.ref().child(user.uid + '/Projects/' + projectName).update({
  
        downloadURL: url,
    
      })
    )
  };

  return (
    <div>

    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Create Project">

        {/* CREATE PROJECT PAGE */}
        {/* MAKE THESE THEIR OWN COMPONENTS */}

        <form>
          <div className="createProject form-group">
          <br></br>
          <h4>Please Enter Project Information</h4>
          <br></br>
            <label htmlFor="projectName">Project Name:</label>
            <input type="projectname" className="form-control" id="projectName" placeholder="Project Name"></input>
          </div>
          <div className="form-group">
            <label htmlFor="clientName">Client Name:</label>
            <input type="clientname" className="form-control" id="clientName" placeholder="Client Name"></input>
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="inputAddress">Address:</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputSuite">Suite:</label>
            <input type="text" className="form-control" id="inputSuite" placeholder="Apartment, studio, or floor"></input>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City:</label>
              <input type="text" className="form-control" id="inputCity"></input>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State:</label>
              <select id="inputState" className="form-control">
                <option>Choose...</option> 
                <option>AK</option><option>AL</option><option>AZ</option><option>AR</option><option>CA</option>
                <option>CO</option><option>CT</option><option>DE</option><option>FL</option><option>GA</option><option>HI</option><option>ID</option>
                <option>IL</option><option>IN</option><option>IA</option><option>KS</option><option>LA</option><option>ME</option><option>MD</option>
                <option>MA</option><option>MI</option><option>MN</option><option>MS</option><option>MO</option><option>MT</option><option>NE</option>
                <option>NV</option><option>NH</option><option>NJ</option><option>NM</option><option>NY</option><option>NC</option><option>ND</option>
                <option>OH</option><option>OK</option><option>OR</option><option>PA</option><option>RI</option><option>SC</option><option>SD</option>
                <option>TN</option><option>TX</option><option>UT</option><option>VT</option><option>VA</option><option>WA</option><option>WV</option>
                <option>WI</option><option>WY</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip:</label>
              <input type="text" className="form-control" id="inputZip"></input>
            </div>
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="inputFile">File input:</label>
            <br></br>
            <input type="file" id="inputFile"></input>
          </div>
          {/* SEND PROJECT INFORMATION TO DB */}
          <button type="button" className="btn btn-primary" id="submitButton" onClick={SendNewProjectToDB}>Submit</button>
        </form>

      </Tab>
      <Tab eventKey={2} title="Edit Project">
        
        {/* EDIT PROJECT PAGE */}
        {/* MAKE THESE THEIR OWN COMPONENTS */}

        <form>
          <div className="editProject form-group">
          <br></br>
          <h4>Please Enter Updated Project Information</h4>
          <br></br>
            <label htmlFor="exampleInputEmail1">Project Name:</label>
            <input type="projectname" className="form-control" id="exampleInputEmail1" placeholder="Project Name"></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Client Name:</label>
            <input type="clientname" className="form-control" id="exampleInputPassword1" placeholder="Client Name"></input>
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="inputAddress">Address:</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Suite:</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City:</label>
              <input type="text" className="form-control" id="inputCity"></input>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State:</label>
              <select id="inputState" className="form-control">
                <option value>Choose...</option><option>AK</option><option>AL</option><option>AZ</option><option>AR</option><option>CA</option>
                <option>CO</option><option>CT</option><option>DE</option><option>FL</option><option>GA</option><option>HI</option><option>ID</option>
                <option>IL</option><option>IN</option><option>IA</option><option>KS</option><option>LA</option><option>ME</option><option>MD</option>
                <option>MA</option><option>MI</option><option>MN</option><option>MS</option><option>MO</option><option>MT</option><option>NE</option>
                <option>NV</option><option>NH</option><option>NJ</option><option>NM</option><option>NY</option><option>NC</option><option>ND</option>
                <option>OH</option><option>OK</option><option>OR</option><option>PA</option><option>RI</option><option>SC</option><option>SD</option>
                <option>TN</option><option>TX</option><option>UT</option><option>VT</option><option>VA</option><option>WA</option><option>WV</option>
                <option>WI</option><option>WY</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip:</label>
              <input type="text" className="form-control" id="inputZip"></input>
            </div>
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="exampleInputFile">File input:</label>
            <br></br>
            <input type="file" id="exampleInputFile"></input>
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>

      </Tab>
      <Tab eventKey={3} title="View Projects">
        <br></br>
        <h4>All Projects</h4>
        <br></br>
        <h6>Enter logic for viewing all projects from firebase DB</h6>

      </Tab>
    </Tabs>

  </div>
  );

}

export default UploadForm;
