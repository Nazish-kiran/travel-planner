import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { FaMapMarkerAlt, FaHotel, FaPlane,  FaCalendarAlt, FaWallet, FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdBackpack } from "react-icons/md";
import DestinationForm from "../componenets/DestinationForm";

function Home() {
  const { trip } = useContext(TripContext);
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  // If no trip exists, show the form instead of landing page
  if (!trip) {
    return <DestinationForm />;
  }

  const faqItems = [
    {
      id: 1,
      question: "Is Travel Planner really free?",
      answer: "Yes! Travel Planner is completely free to use. No hidden fees, no premium plans - just pure travel planning functionality."
    },
    {
      id: 2,
      question: "Can I access my trips from different devices?",
      answer: "Your trips are saved locally in your browser's storage, so you can access them on the same device. For syncing across devices, we recommend keeping your browser data."
    },
    {
      id: 3,
      question: "Can I edit my trip after creating it?",
      answer: "Absolutely! You can edit any aspect of your trip - dates, accommodations, activities, costs, and more. All changes are saved automatically."
    },
    {
      id: 4,
      question: "How do I delete a trip?",
      answer: "On the planner page, click the 'New Trip' button in the header. You'll be asked to confirm before deletion."
    },
    {
      id: 5,
      question: "Can I plan multiple trips?",
      answer: "Currently, you can create one trip at a time. When you start a new trip, the previous one is replaced. Make sure to document important trips!"
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
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Organize every aspect of your travel adventure with our comprehensive trip planning tool. From accommodations to daily activities, we've got you covered.
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
            Powerful Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl shadow-md border-l-4 border-indigo-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaHotel size={32} className="text-indigo-600" />
                <h3 className="text-xl font-bold text-slate-800">Accommodation</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Track your hotel bookings, addresses, check-in/check-out times, and accommodation costs all in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-md border-l-4 border-orange-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaPlane size={32} className="text-orange-600" />
                <h3 className="text-xl font-bold text-slate-800">Transportation</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Manage flights, trains, car rentals, and buses. Keep track of departure times, routes, and transportation costs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-md border-l-4 border-purple-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <MdBackpack size={32} className="text-purple-600" />
                <h3 className="text-xl font-bold text-slate-800">Packing List</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Never forget an essential item again. Create a checklist, mark items as packed, and stay organized.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt size={32} className="text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">Daily Schedule</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Plan your activities day by day. Add sightseeing, dining, shopping, and other activities with times and notes.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaWallet size={32} className="text-green-600" />
                <h3 className="text-xl font-bold text-slate-800">Budget Tracking</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Keep your finances in check. Monitor expenses across activities, accommodation, and transportation categories.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-8 rounded-xl shadow-md border-l-4 border-rose-600 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FaMapMarkerAlt size={32} className="text-rose-600" />
                <h3 className="text-xl font-bold text-slate-800">Multi-Destination</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Customize trips for any destination. Track travel dates, number of travelers, and plan accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
          How It Works
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
                Enter your destination, travel dates, and number of travelers. Our app instantly calculates the duration of your trip.
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">Add Your Details</h3>
              <p className="text-slate-700 text-lg">
                Fill in accommodation information, transportation details, and create a packing list. Everything is optional so you can customize as needed.
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">Plan Daily Activities</h3>
              <p className="text-slate-700 text-lg">
                For each day of your trip, add activities with times, categories, costs, and notes. Keep track of everything from sightseeing to dining.
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">Monitor Your Budget</h3>
              <p className="text-slate-700 text-lg">
                Watch your spending in real-time. See daily totals and overall trip costs, helping you stay within budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Adventure?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Start organizing your next trip today. It's free and takes just minutes to get started.
          </p>
          <button
            onClick={() => navigate("/planner")}
            className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition shadow-lg"
          >
            Begin Planning Now
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
            Why Choose Travel Planner?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaCheck size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">100% Free</h3>
              <p className="text-slate-600">No subscriptions, no ads, no hidden costs. Use all features completely free.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaPlane size={48} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Easy to Use</h3>
              <p className="text-slate-600">Intuitive interface designed for travelers. No learning curve - start planning immediately.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaWallet size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Budget Control</h3>
              <p className="text-slate-600">Track every expense and stay within your travel budget with real-time calculations.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaHotel size={48} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">All-in-One Tool</h3>
              <p className="text-slate-600">Accommodation, transportation, activities, packing - everything in one place.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaCalendarAlt size={48} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Daily Planning</h3>
              <p className="text-slate-600">Organize activities for each day with times, categories, costs, and detailed notes.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MdBackpack size={48} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Never Forget</h3>
              <p className="text-slate-600">Comprehensive packing list to ensure you don't forget any essential items.</p>
            </div>
          </div>
        </div>
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
              <h3 className="text-5xl font-bold mb-2">∞</h3>
              <p className="text-xl text-slate-300">Unlimited Trips</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">100%</h3>
              <p className="text-xl text-slate-300">Free Forever</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">6+</h3>
              <p className="text-xl text-slate-300">Key Features</p>
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
