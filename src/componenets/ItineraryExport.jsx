import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import { FaFileExport, FaFileDownload } from "react-icons/fa";

const ItineraryExport = () => {
  const { trip } = useContext(TripContext);
  const [exportFormat, setExportFormat] = useState("text");

  if (!trip) return null;

  const generateTextItinerary = () => {
    let text = `TRIP ITINERARY\n`;
    text += `${"=".repeat(50)}\n\n`;
    text += `Destination: ${trip.destination}\n`;
    text += `Start Date: ${new Date(trip.startDate).toLocaleDateString()}\n`;
    text += `End Date: ${new Date(trip.endDate).toLocaleDateString()}\n`;
    text += `Travelers: ${trip.travelers}\n\n`;

    if (trip.accommodation) {
      text += `ACCOMMODATION\n`;
      text += `${"-".repeat(50)}\n`;
      text += `Hotel: ${trip.accommodation.name}\n`;
      text += `Address: ${trip.accommodation.address}\n`;
      text += `Check-in: ${trip.accommodation.checkIn}\n`;
      text += `Check-out: ${trip.accommodation.checkOut}\n`;
      text += `Cost: $${trip.accommodation.cost}\n\n`;
    }

    if (trip.transportation.length > 0) {
      text += `TRANSPORTATION\n`;
      text += `${"-".repeat(50)}\n`;
      trip.transportation.forEach((transport, idx) => {
        text += `${idx + 1}. ${transport.type}\n`;
        text += `Details: ${transport.details}\n`;
        text += `Cost: $${transport.cost}\n\n`;
      });
    }

    text += `DAILY ITINERARY\n`;
    text += `${"-".repeat(50)}\n`;
    trip.days.forEach((day) => {
      const dayDate = new Date(trip.startDate);
      dayDate.setDate(dayDate.getDate() + day.day - 1);
      text += `\nDay ${day.day} - ${dayDate.toLocaleDateString()}\n`;
      
      if (day.activities.length === 0) {
        text += `No activities scheduled\n`;
      } else {
        day.activities.forEach((activity, idx) => {
          text += `${idx + 1}. ${activity.title}\n`;
          text += `   Time: ${activity.time} | Category: ${activity.category}\n`;
          if (activity.notes) text += `   Notes: ${activity.notes}\n`;
          text += `   Cost: $${activity.cost}\n`;
        });
      }
    });

    if (trip.packingList.length > 0) {
      text += `\n\nPACKING LIST\n`;
      text += `${"-".repeat(50)}\n`;
      trip.packingList.forEach((item, idx) => {
        const status = item.packed ? "[✓]" : "[ ]";
        text += `${status} ${item.name}\n`;
      });
    }

    return text;
  };

  const generateHTMLItinerary = () => {
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${trip.destination} - Trip Itinerary</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
    .container { max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
    h1 { color: #334155; border-bottom: 3px solid #334155; padding-bottom: 10px; }
    h2 { color: #475569; margin-top: 20px; }
    .info { background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 10px 0; }
    .activity { background: #f8fafc; padding: 12px; margin: 8px 0; border-left: 4px solid #334155; }
    .packing { columns: 2; }
    .item { padding: 5px 0; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
    th { background-color: #334155; color: white; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${trip.destination} - Trip Itinerary</h1>
    
    <div class="info">
      <strong>Start Date:</strong> ${new Date(trip.startDate).toLocaleDateString()}<br>
      <strong>End Date:</strong> ${new Date(trip.endDate).toLocaleDateString()}<br>
      <strong>Travelers:</strong> ${trip.travelers}
    </div>`;

    if (trip.accommodation) {
      html += `
    <h2>Accommodation</h2>
    <div class="info">
      <strong>${trip.accommodation.name}</strong><br>
      Address: ${trip.accommodation.address}<br>
      Check-in: ${trip.accommodation.checkIn} | Check-out: ${trip.accommodation.checkOut}<br>
      Cost: $${trip.accommodation.cost}
    </div>`;
    }

    if (trip.transportation.length > 0) {
      html += `<h2>Transportation</h2><table><tr><th>Type</th><th>Details</th><th>Cost</th></tr>`;
      trip.transportation.forEach((t) => {
        html += `<tr><td>${t.type}</td><td>${t.details}</td><td>$${t.cost}</td></tr>`;
      });
      html += `</table>`;
    }

    html += `<h2>Daily Itinerary</h2>`;
    trip.days.forEach((day) => {
      const dayDate = new Date(trip.startDate);
      dayDate.setDate(dayDate.getDate() + day.day - 1);
      html += `<h3>Day ${day.day} - ${dayDate.toLocaleDateString()}</h3>`;
      
      if (day.activities.length === 0) {
        html += `<p>No activities scheduled</p>`;
      } else {
        day.activities.forEach((activity) => {
          html += `<div class="activity">
            <strong>${activity.title}</strong><br>
            Time: ${activity.time} | Category: ${activity.category} | Cost: $${activity.cost}`;
          if (activity.notes) html += `<br>Notes: ${activity.notes}`;
          html += `</div>`;
        });
      }
    });

    if (trip.packingList.length > 0) {
      html += `<h2>Packing List</h2><div class="packing">`;
      trip.packingList.forEach((item) => {
        const status = item.packed ? "✓" : "○";
        html += `<div class="item">${status} ${item.name}</div>`;
      });
      html += `</div>`;
    }

    html += `</div></body></html>`;
    return html;
  };

  const handleExport = () => {
    let content, filename;

    if (exportFormat === "text") {
      content = generateTextItinerary();
      filename = `${trip.destination}-itinerary.txt`;
    } else {
      content = generateHTMLItinerary();
      filename = `${trip.destination}-itinerary.html`;
    }

    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <FaFileExport size={24} />
        Export Itinerary
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Export Format
          </label>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
          >
            <option value="text">Text (.txt)</option>
            <option value="html">HTML (.html)</option>
          </select>
        </div>

        <button
          onClick={handleExport}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3 rounded-lg hover:from-slate-800 hover:to-black transition font-bold flex items-center justify-center gap-2"
        >
          <FaFileDownload size={20} />
          Download Itinerary
        </button>
      </div>
    </div>
  );
};

export default ItineraryExport;
