import React, { useState, useEffect } from "react";
import firebase from "../Firebase";

function Booking() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [genre, setGenre] = useState();
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [uploading, setUploading] = useState(false);
  //uploading file to FirebaseStorage

  const db = firebase.firestore();

  function book(e) {
    e.preventDefault();
    const sendBooking = firebase.storage().ref("files/" + file.name);
    const uploadFile = sendBooking.put(file);

    uploadFile.on(
      "state_changed",
      (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploading(true);
        if (percentage == 100) {
          setUploading(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    var storage = firebase.storage().ref("files/" + file.name);
    //get file url
    storage.getDownloadURL().then(async (url) => {
      const docRef = db.collection("Production").doc("Guest");

      //Uploading data intpo fireStore dbs
      await docRef.collection("Details").add({
        url: url,
        Genre: genre,
        Name: name,
        Phone: phone,
        Email: email,
        File_Name: file.name,
        Price: price,
        Status: false,
      });
    });
    document.querySelector("form").reset();
  }

  return (
    <>
      <div className="container pt-5 mt-5 text-white">
        <div className="row">
          <form onSubmit={book}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Name</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="inputEmail4" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Email</label>
                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="inputPassword4" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Phone #</label>
                <input type="tel" className="form-control" onChange={(e) => setPhone(e.target.value)} id="inputAddress" placeholder="000-020-0000" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputState">Genre</label>
                <select id="inputState" className="form-control" defaultValue={"DEFAULT"} onChange={(e) => setGenre(e.target.value)}>
                  <option value="DEFAULT">Choose...</option>
                  <option>Pop</option>
                  <option>Gospel</option>
                  <option>AfroBeats</option>
                  <option>Hip-Pop</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="custom-file mt-5">
                  <input type="file" className="custom-file-input" id="validatedInputGroupCustomFile" accept=".jpg,.mp4,.mp3" required onChange={(e) => setFile(e.target.files[0])} />
                  <label className="custom-file-label" htmlFor="validatedInputGroupCustomFile">
                    {file.name ? file.name : "Choose file..."}
                  </label>
                </div>
              </div>

              <div className="form-group col-md-6 mt-3">
                <label htmlFor="inputState">Package</label>
                <select id="inputState" className="form-control" defaultValue={"DEFAULT"} onChange={(e) => setPrice(e.target.value)}>
                  <option value="DEFAULT">Choose...</option>
                  <option>Personal</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>
            </div>

            <button type="submit" className={uploading ? "d-none" : "btn btn-primary btn-lg offset-4 my-3"}>
              submit
            </button>

            <button className={uploading ? "btn btn-primary  offset-4 my-3" : "d-none"} type="button" disabled>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Uploading Please wait...
            </button>
          </form>

          <div className="col-12 col-md-6 px-5">
            <h3 className="font-weight-bolder">Why Work With Us</h3>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu tincidunt ligula. Fusce dictum ullamcorper purus, at elementum sem sollicit udin non. Sed id tristique lacus. Fusce pellentesque dignissim arcu, id hendrerit urna feugiat vitae. Pellentesque viverra aliquet arcu, aliquet est commodo quis. Nam tempus, nisl eu maximus viverra, magna quam porta nibh.</p>
          </div>
        </div>
      </div>

      <div className="container my-3 my-sm-4 text-dark pb-5">
        <h1 className="mb-5 text-center text-white">Pricing</h1>
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <div className="card card-outline-success text-center">
              <div className="card-header bg-success text-white">
                <h2>Personal</h2>
                <h4>$9.99 / year</h4>
              </div>
              <div className="card-block text-center">
                <p className="card-text">Perfect if you are an artist.</p>
              </div>
              <ul className="list-group small text-center">
                <li className="list-group-item">3 Airplays per day</li>
                <li className="list-group-item">3 Days Airplay </li>
                <li className="list-group-item">3 Shoutout Per day</li>
              </ul>
              <div className="card-footer">
                <button type="button" className="btn btn-success btn-lg">
                  Select
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="card card-outline-warning text-center">
              <div className="card-header bg-warning text-white">
                <h2>Personal</h2>
                <h4>$15.99 / year</h4>
              </div>
              <div className="card-block text-center">
                <p className="card-text">Perfect if you are an artist.</p>
              </div>
              <ul className="list-group small text-center">
                <li className="list-group-item">5 Airplays per day</li>
                <li className="list-group-item">7 Days Airplay </li>
                <li className="list-group-item">5 Shoutout Per day</li>
                <li className="list-group-item">Social Media Hype</li>
              </ul>
              <div className="card-footer">
                <button type="button" className="btn btn-warning btn-lg">
                  Select
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="card card-outline-danger text-center">
              <div className="card-header bg-danger text-white">
                <h2>Personal</h2>
                <h4>$19.99 / year</h4>
              </div>
              <div className="card-block text-center">
                <p className="card-text">Perfect if you are an artist.</p>
              </div>
              <ul className="list-group small text-center">
                <li className="list-group-item">Unlimited Airplays per day</li>
                <li className="list-group-item">14 Days Airplay </li>
                <li className="list-group-item">unlimited Shoutout Per day(14days)</li>
                <li className="list-group-item">Social Media Hype</li>
                <li className="list-group-item">Interview</li>
              </ul>
              <div className="card-footer">
                <button type="button" className="btn btn-danger btn-lg">
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-warning" />
    </>
  );
}

export default Booking;
