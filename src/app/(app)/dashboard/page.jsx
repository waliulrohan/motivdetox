// components/Dashboard.js
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">MotivDetox</div>
        <div className="flex items-center space-x-4">
          <img
            src="/user-avatar.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-gray-700">John Doe</div>
          <button className="text-blue-500">Settings</button>
        </div>
      </header>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Motivation */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daily Motivation</h2>
          <p className="italic">"Your quote of the day goes here."</p>
          <div className="mt-4">
            <span>How are you feeling today?</span>
            <div className="flex space-x-2 mt-2">
              <button className="p-2 rounded-full bg-yellow-100">😊</button>
              <button className="p-2 rounded-full bg-yellow-100">😐</button>
              <button className="p-2 rounded-full bg-yellow-100">😔</button>
            </div>
          </div>
        </section>

        {/* Goals Overview */}
        <section className="bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 className="text-xl font-semibold mb-4">Goals Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Goal 1</span>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span>70%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Goal 2</span>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <span>50%</span>
            </div>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded-lg">Set a New Goal</button>
          </div>
        </section>

        {/* Activity Summary */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
          <ul className="space-y-2">
            <li>Completed Goal 1</li>
            <li>Started a new streak</li>
            <li>Earned a reward</li>
          </ul>
        </section>

        {/* Gamification Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gamification</h2>
          <div>
            <p>Leaderboard</p>
            <p>Challenges</p>
            <p>Achievements</p>
          </div>
        </section>

        {/* AI Assistant */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
          <button className="p-2 bg-green-500 text-white rounded-lg">Chat with AI</button>
          <p className="mt-4">Suggested Activities: Complete a task today!</p>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-600">
        <div>Quick Links: Home | Support | About | Privacy Policy</div>
        <div>Version 1.0.0</div>
      </footer>
    </div>
  );
};

export default Dashboard;
