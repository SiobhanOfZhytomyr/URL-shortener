import React, { useState, useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { UrlForm } from "./components/Form";
import { DataTable } from "./components/Table";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (input) => {
    const val = { url: input.urlData };
    const res = await fetch(`/api/new/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });

    // setInputVal("");
    window.location = "/";
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch(`/api/urls`);
      const r = await res.json();
      setData(r);
      setLoading(false);
    };

    getData();
  }, []);
  return (
    <Container fluid={true}>
      <UrlForm apiCall={handleSubmit} />
      <DataTable loading={loading} data={data} />
    </Container>
  );
}

export default App;
