import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import "./totalstock.css";

const Dis = () => {
  const [productData, setProductData] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/datas", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [user.token]);

  // Calculate total count and total amount for each product
  const getProductSummary = () => {
    const productSummary = {};
    productData.forEach((product) => {
      if (!productSummary[product.name]) {
        productSummary[product.name] = {
          totalCount: product.count,
          totalAmount: product.totamount,
        };
      } else {
        productSummary[product.name].totalCount += product.count;
        productSummary[product.name].totalAmount += product.totamount;
      }
    });
    return productSummary;
  };

  return (
    <>
      <div className="stockcontain">
        <div className="stockrecord">
          <h2 className="stockh2">Product Summary</h2>
          <table className="stocktab">
            <thead className="stockhead">
              <tr className="stocktr">
                <th className="stockth">Product Name</th>
                <th className="stockth">Total Count</th>
                <th className="stockth">Total Amount</th>
              </tr>
            </thead>
            <tbody className="stockbody">
              {Object.entries(getProductSummary()).map(
                ([productName, productSummary]) => (
                  <tr key={productName}>
                    <td className="stocktd">{productName}</td>
                    <td className="stocktd">{productSummary.totalCount}</td>
                    <td className="stocktd">{productSummary.totalAmount}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dis;
