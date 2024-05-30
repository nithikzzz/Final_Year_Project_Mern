import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns-tz";
import "./loginfo.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const LogTable = () => {
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/log/get");
        setLogData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const convertUTCtoIST = (utcDateTime) => {
    const ISTTime = format(new Date(utcDateTime), "hh:mm:ss a", {
      timeZone: "Asia/Kolkata",
    });
    return ISTTime;
  };
  return (
    <>
      <div className="record">
        <h2 className="t">Login and Logout Log</h2>
        <div>
          <table className="tab">
            <thead className="head">
              <tr className="logintr">
                <th className="loginth">Email</th>
                <th className="loginth">Date</th>
                <th className="loginth">Login Time</th>
                <th className="loginth">Logout Time</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {logData.map((log, index) => {
                const nextLog = logData[index + 1];

                // Check if the next log entry has the same email and is a logout entry
                const isNextLogoutEntry =
                  nextLog &&
                  nextLog.email === log.email &&
                  nextLog.action === "logout";

                // Check if the current log entry is a logout entry
                const isLogoutEntry = log.action === "logout";

                // Check if it's the last entry or the next entry has a different email or date
                const isLastEntry =
                  index === logData.length - 1 ||
                  (nextLog &&
                    (nextLog.email !== log.email ||
                      nextLog.timestamp !== log.timestamp));

                return (
                  <tr key={log._id} className="logintr">
                    <td className="logintd">{log.email}</td>
                    <td className="logintd">
                      {format(new Date(log.timestamp), "yyyy-MM-dd")}
                    </td>
                    <td className="logintd">
                      {!isLogoutEntry && convertUTCtoIST(log.timestamp)}
                    </td>
                    <td className="logintd">
                      {isNextLogoutEntry && convertUTCtoIST(nextLog.timestamp)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LogTable;
