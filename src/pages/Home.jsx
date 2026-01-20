import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { FaMapMarkerAlt, FaHotel, FaPlane, FaCalendarAlt, FaWallet, FaCheck, FaChevronDown, FaChevronUp, FaFileAlt, FaChartBar, FaStickyNote, FaCloudRain, FaThermometerHalf, FaMoneyBill, FaUsers, FaGlobe, FaDownload, FaShieldAlt, FaLightbulb, FaBoxes } from "react-icons/fa";
import { MdBackpack } from "react-icons/md";
import DestinationForm from "../componenets/DestinationForm";

function Home() {
  const { trip } = useContext(TripContext);
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  // If no trip exists, show the form instead of landing page
  const faqItems = [
    {
      id: 1,
      question: "What can I do with Travel Planner?",
      answer: "Travel Planner is an all-in-one platform for organizing every aspect of your trip. Track accommodations, transportation, activities, budgets, packing lists, important documents, travel notes, view destination insights, and analyze your spending with detailed analytics."
    },
    {
      id: 2,
      question: "How do I start planning a trip?",
      answer: "Click 'Start Planning Now' and enter your destination, departure date, return date, and number of travelers. The app will calculate your trip duration and take you to the comprehensive planning dashboard where you can add all details."
    },
    {
      id: 3,
      question: "Can I track my daily activities?",
      answer: "Yes! For each day, you can add unlimited activities with specific times, categories (sightseeing, dining, shopping), costs, and detailed notes. Activities are organized in collapsible daily sections for easy navigation."
    },
    {
      id: 4,
      question: "How does budget tracking work?",
      answer: "Enter costs for accommodations, transportation, activities, and dining. The app calculates daily totals and overall trip expenses in real-time. Set budget limits and receive alerts when approaching limits. View detailed cost breakdowns in Analytics."
    },
    {
      id: 5,
      question: "What destination information is available?",
      answer: "The sidebar displays live weather, timezone differences, currency exchange rates, destination details (region, capital, languages, population), emergency contact numbers, and prayer times based on your destination."
    },
    {
      id: 6,
      question: "How can I keep track of important items?",
      answer: "Use the Packing List to add items you need to pack, Documents & Prep to track passports/visas/insurance, and Notes to organize travel confirmations, tips, and reminders in categorized sections."
    },
    {
      id: 7,
      question: "Can I export my itinerary?",
      answer: "Yes! Use the Export Itinerary feature to download your complete trip plan as a text file or HTML document. Perfect for sharing with travel companions or creating backups before starting a new trip."
    },
    {
      id: 8,
      question: "What can I see in Analytics?",
      answer: "View cost breakdowns by category, daily spending patterns, activity distribution, advanced trip statistics, and gain valuable insights about your travel spending and planning."
    }
  ];

  // Landing page content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={28} className="text-slate-700" />
            <h1 className="text-2xl font-bold text-slate-800">Travel Planner</h1>
          </div>
          {trip && (
            <button
              onClick={() => navigate("/planner")}
              className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition font-semibold"
            >
              Go to Planner
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">Plan Your Perfect Trip</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive, all-in-one travel planning platform that brings together everything you need: accommodation management, transportation tracking, daily itineraries, budget control, packing lists, important documents, travel notes, destination insights, and detailed analytics—all in one powerful dashboard.
          </p>
        </div>
        <button
          onClick={() => navigate("/planner")}
          className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-slate-800 hover:to-black transition shadow-lg"
        >
          Start Planning Now
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
            Comprehensive Planning Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Accommodation */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl shadow-md border-l-4 border-indigo-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaHotel size={32} className="text-indigo-600" />
                <h3 className="text-xl font-bold text-slate-800">Accommodation Tracker</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Record hotel names, addresses, check-in/check-out times, contact information, booking references, and accommodation costs all in one place.
              </p>
            </div>

            {/* Feature 2 - Transportation */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-md border-l-4 border-orange-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaPlane size={32} className="text-orange-600" />
                <h3 className="text-xl font-bold text-slate-800">Transportation Management</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Manage flights, trains, car rentals, and buses with departure/arrival times, routes, confirmation numbers, and transportation costs.
              </p>
            </div>

            {/* Feature 3 - Packing List */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-md border-l-4 border-purple-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <MdBackpack size={32} className="text-purple-600" />
                <h3 className="text-xl font-bold text-slate-800">Packing List</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Create a comprehensive checklist of items to pack. Check off items as you pack them and ensure nothing is forgotten.
              </p>
            </div>

            {/* Feature 4 - Daily Activities */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt size={32} className="text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">Daily Itinerary Planning</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Plan activities for each day with times, categories (sightseeing, dining, shopping), costs, and detailed notes. Organize your entire schedule in collapsible day sections.
              </p>
            </div>

            {/* Feature 5 - Budget Tracking */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaWallet size={32} className="text-green-600" />
                <h3 className="text-xl font-bold text-slate-800">Budget Tracking & Alerts</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Monitor expenses in real-time across all categories. Calculate daily totals, overall trip costs, set budget limits, and receive alerts when approaching spending limits.
              </p>
            </div>

            {/* Feature 6 - Trip Notes */}
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-8 rounded-xl shadow-md border-l-4 border-rose-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaStickyNote size={32} className="text-rose-600" />
                <h3 className="text-xl font-bold text-slate-800">Categorized Trip Notes</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Organize important information with 6 color-coded categories: confirmations, dining tips, shopping recommendations, general notes, reminders, and special requests.
              </p>
            </div>

            {/* Feature 7 - Documents */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-xl shadow-md border-l-4 border-cyan-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaFileAlt size={32} className="text-cyan-600" />
                <h3 className="text-xl font-bold text-slate-800">Documents & Prep Tracker</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Track important documents (passports, visas, travel insurance, vaccination records) and monitor preparation progress with a completion percentage tracker.
              </p>
            </div>

            {/* Feature 8 - Analytics */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-md border-l-4 border-yellow-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaChartBar size={32} className="text-yellow-600" />
                <h3 className="text-xl font-bold text-slate-800">Trip Analytics</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                View detailed cost breakdowns by category, daily spending patterns, activity distribution charts, and comprehensive trip statistics and insights.
              </p>
            </div>

            {/* Feature 9 - Live Widgets */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-xl shadow-md border-l-4 border-teal-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaCloudRain size={32} className="text-teal-600" />
                <h3 className="text-xl font-bold text-slate-800">Destination Insights</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Access real-time weather, timezone differences, currency exchange rates, destination info (capital, languages, population), emergency numbers, and prayer times.
              </p>
            </div>

            {/* Feature 10 - Export */}
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-8 rounded-xl shadow-md border-l-4 border-violet-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaDownload size={32} className="text-violet-600" />
                <h3 className="text-xl font-bold text-slate-800">Itinerary Export</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Download your complete trip plan as text or HTML. Perfect for sharing with travel companions, printing, or backing up before creating a new trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
            How to Use Travel Planner
          </h2>

          <div className="space-y-8">
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Create Your Trip</h3>
                <p className="text-slate-700 text-lg">
                  Enter your destination, departure date, return date, and number of travelers. The app automatically calculates your trip duration and takes you to the planning dashboard.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Add Accommodation & Transportation</h3>
                <p className="text-slate-700 text-lg">
                  Fill in hotel details (name, address, check-in/out times) and transportation information (flights, trains, car rentals). Include booking references and costs for budget tracking.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Build Your Packing List</h3>
                <p className="text-slate-700 text-lg">
                  Add items you need to pack. Check them off as you pack. The progress bar shows how much you've prepared, ensuring nothing is forgotten.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Plan Daily Activities</h3>
                <p className="text-slate-700 text-lg">
                  For each day, add activities with times, categories, costs, and notes. Expand/collapse days as needed. Activities are organized by day for easy reference and management.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Monitor Your Budget</h3>
                <p className="text-slate-700 text-lg">
                  Watch your spending in real-time. The budget summary calculates daily totals and trip-wide expenses. Set alerts to notify you when approaching spending limits.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  6
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Track Documents & Prep</h3>
                <p className="text-slate-700 text-lg">
                  Visit the Documents & Prep page to track passports, visas, travel insurance, vaccination records, and other documents. Check off items as you prepare and monitor completion progress.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  7
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Organize Trip Notes</h3>
                <p className="text-slate-700 text-lg">
                  Use the Notes page to organize important information in 6 color-coded categories: confirmations, dining tips, shopping recommendations, general notes, reminders, and special requests.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  8
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">View Analytics & Insights</h3>
                <p className="text-slate-700 text-lg">
                  Visit the Analytics page to see cost breakdowns by category, daily spending patterns, activity distribution charts, and comprehensive trip statistics to understand your travel spending.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  9
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Check Live Destination Info</h3>
                <p className="text-slate-700 text-lg">
                  The right sidebar displays real-time weather, timezone differences from your location, currency exchange rates, destination details, emergency contacts, and prayer times based on your destination.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700 text-white font-bold text-lg">
                  10
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Export Your Itinerary</h3>
                <p className="text-slate-700 text-lg">
                  Use the Export Itinerary feature to download your complete trip plan as a text file or HTML document. Share with travel companions or back up before creating a new trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose Travel Planner?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-700 bg-opacity-50 p-8 rounded-lg border border-slate-600 hover:border-slate-500 transition text-center">
              <div className="flex justify-center mb-4">
                <FaMoneyBill size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Free Forever</h3>
              <p className="text-slate-200">
                No subscriptions, no premium features, no hidden charges. Everything is completely free and always will be.
              </p>
            </div>

            <div className="bg-slate-700 bg-opacity-50 p-8 rounded-lg border border-slate-600 hover:border-slate-500 transition text-center">
              <div className="flex justify-center mb-4">
                <FaLightbulb size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intuitive & Easy to Use</h3>
              <p className="text-slate-200">
                No learning curve. Start planning immediately with a clean, user-friendly interface anyone can navigate.
              </p>
            </div>

            <div className="bg-slate-700 bg-opacity-50 p-8 rounded-lg border border-slate-600 hover:border-slate-500 transition text-center">
              <div className="flex justify-center mb-4">
                <FaWallet size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Complete Budget Control</h3>
              <p className="text-slate-200">
                Real-time spending tracking, alerts, and analytics. Know exactly where your money is going every step of the way.
              </p>
            </div>

            <div className="bg-slate-700 bg-opacity-50 p-8 rounded-lg border border-slate-600 hover:border-slate-500 transition text-center">
              <div className="flex justify-center mb-4">
                <FaBoxes size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">All-in-One Platform</h3>
              <p className="text-slate-200">
                Accommodation, transportation, activities, budget, documents, notes—everything you need in one place.
              </p>
            </div>

            <div className="bg-slate-700 bg-opacity-50 p-8 rounded-lg border border-slate-600 hover:border-slate-500 transition text-center">
              <div className="flex justify-center mb-4">
                <FaCalendarAlt size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Day-by-Day Planning</h3>
              <p className="text-slate-200">
                Plan each day individually with specific times, activities, and costs. Stay organized and never miss anything.
              </p>
            </div>

            <div className="bg-slate-700 bg-opacity-50 p-8 rounded-lg border border-slate-600 hover:border-slate-500 transition text-center">
              <div className="flex justify-center mb-4">
                <FaGlobe size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Destination Info</h3>
              <p className="text-slate-200">
                Real-time weather, currency rates, timezone differences, emergency contacts, and prayer times at your fingertips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">
          Ready to Plan Your Next Adventure?
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Start planning your perfect trip today. No signup required, completely free, and all your data is saved locally on your device.
        </p>
        <button
          onClick={() => navigate("/planner")}
          className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
        >
          Start Planning Now
        </button>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md border border-slate-200">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                  className="w-full flex justify-between items-center p-6 hover:bg-slate-50 transition"
                >
                  <h3 className="text-lg font-bold text-slate-800 text-left">{item.question}</h3>
                  {expandedFaq === item.id ? (
                    <FaChevronUp className="text-slate-600 flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-slate-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === item.id && (
                  <div className="px-6 pb-6 border-t border-slate-200">
                    <p className="text-slate-700 text-lg">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold mb-2">10+</h3>
              <p className="text-xl text-slate-300">Major Features</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">100%</h3>
              <p className="text-xl text-slate-300">Free Forever</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">6</h3>
              <p className="text-xl text-slate-300">Live Widgets</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">24/7</h3>
              <p className="text-xl text-slate-300">Available Always</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Start Your Travel Journey Today</h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of travelers who are already planning smarter trips with Travel Planner.
          </p>
          <button
            onClick={() => navigate("/planner")}
            className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-10 py-5 rounded-lg font-bold text-lg hover:from-slate-800 hover:to-black transition shadow-lg"
          >
            Create Your First Trip Now
          </button>
          <p className="text-slate-600 mt-6">No sign-up required. Start planning immediately.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2026 Travel Planner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
