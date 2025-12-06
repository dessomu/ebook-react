import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./styles/SalesDshboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SalesDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/sales/overview").then((res) => setStats(res.data));
  }, []);

  console.log(stats);

  if (!stats) return <p>Loading...</p>;

  const pieData =
    stats.byProduct?.map((p) => ({
      name: p._id,
      value: p.sales,
    })) || [];

  const COLORS = ["#6E473B", "#A78D78", "#3E2723", "#BEB5A9", "#291C0E"];

  return (
    <div className="sales-container">
      <h2 className="sales-title"> Sales Dashboard</h2>

      <div className="stats-row">
        <div className="stat-card">
          <h3 className="stat-number">{stats.totalSales}</h3>
          <p className="stat-label">Total Sales</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-number">₹{stats.totalRevenue}</h3>
          <p className="stat-label">Total Revenue</p>
        </div>
      </div>

      <h3 className="chart-title">Sales by Product</h3>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={130}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
