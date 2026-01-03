import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

// WAJIB register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Januari", "Februari", "Maret",
    "April", "Mei", "Juni",
    "Juli", "Agustus", "September",
    "Oktober", "November", "Desember"
  ],
  datasets: [
    {
      label: "2024",
      data: [0, 0, 0, 9000, 12000, 10000, 11500, 12000, 10000, 7500, 4500, 4200],
      borderColor: "#22c1dc",
      backgroundColor: "#22c1dc",
      tension: 0.4,
      pointRadius: 5,
    },
    {
      label: "2025",
      data: [0, 0, 0, 10200, 11500, 12000, 8500, 8800, 9000, 7000, 3500, 3000],
      borderColor: "#2a2ae6",
      backgroundColor: "#2a2ae6",
      tension: 0.4,
      pointRadius: 5,
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: "#ffffff" },
    },
    tooltip: {
      backgroundColor: "rgba(0,0,0,0.85)",
      titleColor: "#FFD166",
      bodyColor: "#ffffff",
      borderColor: "#FFD166",
      borderWidth: 1,
      padding: 12,
      callbacks: {
        title: (items) => `📅 Bulan: ${items[0].label}`,
        label: (item) =>
          `👥 Jumlah Pendaki: ${item.formattedValue} orang`,
        afterLabel: (item) =>
          `📊 Tahun: ${item.dataset.label}`,
      },
    },
  },
};

export default function PendakiChart() {
  return <Line data={data} options={options} />;
}
