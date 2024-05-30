import React, { useState, useEffect } from "react";
import axios from "axios";
import "./scrap.css";

const DisplayData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/delll/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="scrapcontain">
        <div className="scraprecord">
          <h2 className="scraph2">Scrap Data</h2>
          {data.length === 0 ? (
            <p>No scrap data found.</p>
          ) : (
            <table className="scraptab">
              <thead className="scraphead">
                <tr className="scraptr">
                  <th className="scrapth">Name</th>
                  <th className="scrapth">Model</th>
                  <th className="scrapth">Amount</th>
                  <th className="scrapth">Count</th>
                  <th className="scrapth">Place</th>
                  <th className="scrapth">Warranty Date</th>
                </tr>
              </thead>
              <tbody className="scrapbody">
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className="scraptd">{item.name}</td>
                    <td className="scraptd">{item.model}</td>
                    <td className="scraptd">{item.amount}</td>
                    <td className="scraptd">{item.count}</td>
                    <td className="scraptd">{item.place}</td>
                    <td className="scraptd">{item.warentty_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayData;
