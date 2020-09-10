import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container} from "semantic-ui-react";
import { UrlForm } from "./components/Form";
import { DataTable } from "./components/Table";
const API = "http://localhost:5000/";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (input) => {
    const val = { url: input.urlData };
    const res = await fetch(`${API}new/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });
    console.log(res);

    // setInputVal("");
    window.location = "/";
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch(`${API}urls`);
      const r = await res.json();
      setData(r);
      setLoading(false);
      console.log(r);
    };

    getData();
  }, []);
  return (
    <Container fluid="true">
      <UrlForm apiCall={handleSubmit} />
      <DataTable loading={loading} data={data} />
    </Container>
  );
}

export default App;
