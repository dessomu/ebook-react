import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function SalesDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/sales/overview").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto" }}>
      <h2>📊 Sales Dashboard</h2>

      <h3>Total Sales: {stats.totalSales}</h3>
      <h3>Total Revenue: ₹{stats.totalRevenue}</h3>

      <h3>Sales By Product</h3>
      {stats.byProduct.map((p) => (
        <div key={p._id}>
          <strong>{p._id}</strong>: {p.sales} sales
        </div>
      ))}
    </div>
  );
}
