import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSuccess } from "../../API/stripe";

function Success(props) {
  const [data, setData] = useState(null);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  useEffect(() => {
    const id = query.get("id");
    async function getData() {
      const res = await getSuccess({ id });
      console.log("res", res);
      setData(res.data);
    }
    getData();
  }, []);
  return (
    <>
      <h1>Successful transaction!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default Success;
