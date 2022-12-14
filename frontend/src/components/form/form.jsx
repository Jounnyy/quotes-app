import React from "react";
import "./from.css";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import upload from "./img/upload.png";
import anime1 from "./img/anime.png";
import axios from "axios";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

function FormAndQuotes() {
  const [user, setUser] = useState({});
  const [nama, setNama] = useState("");
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const navigate = useNavigate();

  // menambahkan quotes
  async function addQuotes(e) {
    e.preventDefault();
    let date = new Date().getTime();
    let newData = {
      id: date,
      quote: text,
      user: nama,
    };
    setUser(newData);
    setNama("");
    setText("");
  }

  // add quotes new
  async function getPostUser() {
    let res = await axios.post("http://localhost:5000/quote", user);
    navigate("/");
    return res;
  }
 

  useEffect(() => {
    if (user.user && user.quote) {
      getPostUser();
    }
  }, [user]);
  // kontrol ukuran width

  return (
    <Fragment>
      <Navbar />
      <div className="containerForm">
        <div className="judulForm">
          <h2>Making Quotes</h2>
        </div>
        <form className="inputForm" onSubmit={addQuotes}>
          <div className="textAreaForm">
            <textarea
              name=""
              id="area"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setTyped(e.target.value);
              }}
            ></textarea>
            {typed !== "" ? (
              <></>
            ) : (
              <>
                <h2>Type Something...</h2>
              </>
            )}
          </div>
          <div className="buttonForm">
            <div className="inputNameForm">
              <input
                type="text"
                className="textInputForm"
                placeholder="Name"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
            </div>
            <div className="buttonSubmitForm">
              <button className="buttonsubmit">
                <div className="imageForm">
                  <img src={upload} alt="" />
                </div>
                <div className="uploadForm">
                  <p>Upload</p>{" "}
                </div>
              </button>
            </div>
          </div>
        </form>
        <div className="animeImageForm">
          <img src={anime1} alt="" />
        </div>
      </div>
    </Fragment>
  );
}

export default FormAndQuotes;
