import { useState, useEffect } from "react";

export default function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  // Post Data
  const postData = (sendData) => {
    setOptions({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
  };
  // Fetching data
  const fetchingData = async (options, url, controller) => {
    setIsPending(true);
    try {
      const data = await fetch(url, { ...options, signal: controller.signal });
      if (!data.ok) return new Error(data.statusText);
      const json = await data.json();
      setError(null);
      setData(json);
      setIsPending(false);
    } catch (e) {
      if (e.name === "AbortError") {
        setError("Error Happened and aborted!!! ");
      } else {
        setData(null);
        setError("Error Happend");
        setIsPending(false);
      }
    }
  };
  // useEffect
  useEffect(() => {
    const controller = new AbortController();

    if (method === "GET") {
      fetchingData({}, url, controller);
    }
    if (method === "POST" && options) {
      fetchingData(options, url, controller);
    }
    return () => {
      controller.abort();
    };
  }, [url, options]);
  return {
    data,
    isPending,
    error,
    postData,
  };
}
