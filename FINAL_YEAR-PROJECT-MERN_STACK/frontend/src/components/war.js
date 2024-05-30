import "./war.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";

const Warenty = () => {
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/datas", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log("Response:", response.data.warentty_date); // Log the response data

        const data = response.data;
        const today = new Date();

        const expiring = data.filter((item) => {
          const warenttyDateParts = item.warentty_date.split("-");
          const warenttyDate = new Date(
            warenttyDateParts[2],
            warenttyDateParts[1] - 1,
            warenttyDateParts[0]
          );
          console.log("Warranty Date:", warenttyDate); // Log the warranty date
          const daysUntilExpiry = formatDistanceToNow(warenttyDate, {
            addSuffix: false,
            unit: "day",
          });
          const numericExpiryDays = parseInt(daysUntilExpiry, 10);
          return (
            !isNaN(numericExpiryDays) &&
            numericExpiryDays <= 5 &&
            warenttyDate > today
          );
        });

        const expired = data.filter((item) => {
          const warenttyDateParts = item.warentty_date.split("-");
          const warenttyDate = new Date(
            warenttyDateParts[2],
            warenttyDateParts[1] - 1,
            warenttyDateParts[0]
          );
          console.log("Warranty Date:", warenttyDate); // Log the warranty date
          return warenttyDate < today;
        });

        setExpiringProducts(expiring);
        setExpiredProducts(expired);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [user.token]);

  const renderTable = (products, title) => {
    return (
      <>
        <div className="warcontain">
          <div className="warrecord">
            <div>
              <h2 className="warh2">{title}</h2>
              <table className="wartab">
                <thead className="warhead">
                  <tr className="wartr">
                    <th className="warth">Serial Number</th>
                    <th className="warth">Name</th>
                    <th className="warth">Model</th>
                    <th className="warth">Warranty Date</th>
                  </tr>
                </thead>
                <tbody className="warbody">
                  {products.map((product, index) => (
                    <tr key={product._id} className="wartr">
                      <td className="wartd">{index + 1}</td>
                      <td className="wartd">{product.name}</td>
                      <td className="wartd">{product.model}</td>
                      <td className="wartd">{product.warentty_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };
  // Calculate the number of expiring products for the badge
  const numExpiringProducts = expiringProducts.length;
  return (
    <div>
      <div className="badge-container">
        {numExpiringProducts > 0 && (
          <div className="notification-badge">{numExpiringProducts}</div>
        )}
      </div>
      {renderTable(expiringProducts, "Expiring Products in 5 Days")}
      {renderTable(expiredProducts, "Expired Products")}
    </div>
  );
};

export default Warenty;
