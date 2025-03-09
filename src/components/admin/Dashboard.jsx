import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    user: null,
    admin: null,
    totalBookings: null,
    totalEarnings: null,
    activeUser: null,
    inactiveUser: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = [
          { key: 'user', url: 'http://localhost:3000/totalUser' },
          { key: 'admin', url: 'http://localhost:3000/totalAdmin' },
          { key: 'totalBookings', url: 'http://localhost:3000/totalBookings' },
          { key: 'totalEarnings', url: 'http://localhost:3000/totalEarnings' },
          { key: 'activeUser', url: 'http://localhost:3000/activeUsers' },
          { key: 'inactiveUser', url: 'http://localhost:3000/inactiveUsers' },
        ];

        const responses = await Promise.all(
          endpoints.map(({ url }) =>
            fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
          )
        );

        const results = await Promise.all(responses.map((res) => (res.ok ? res.json() : null)));

        setStats((prev) => ({
          user: results[0]?.[0]?.total || prev.user,
          admin: results[1]?.[0]?.totalAdmin || prev.admin,
          totalBookings: results[2]?.[0]?.totalBookings || prev.totalBookings,
          totalEarnings: results[3]?.[0]?.totalEarnings || prev.totalEarnings,
          activeUser: results[4]?.[0]?.active_user_count || prev.activeUser,
          inactiveUser: results[5]?.[0]?.inactive_user_count || prev.inactiveUser,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Users', value: stats.user, color: 'bg-blue-500', textColor: 'text-blue-100', icon: 'bxs-group' },
    { title: 'Active Users', value: stats.activeUser, color: 'bg-green-500', textColor: 'text-green-100', icon: 'bxs-user-check' },
    { title: 'Inactive Users', value: stats.inactiveUser || 0, color: 'bg-red-500', textColor: 'text-red-100', icon: 'bxs-user-x' },
    { title: 'Total Bookings', value: stats.totalBookings, color: 'bg-orange-500', textColor: 'text-orange-100', icon: 'bxs-bookmark' },
    { title: 'Total Earnings', value: `$${stats.totalEarnings}`, color: 'bg-yellow-500', textColor: 'text-yellow-100', icon: 'bxs-dollar-circle' },
    { title: 'Total Admins', value: stats.admin, color: 'bg-purple-500', textColor: 'text-purple-100', icon: 'bx bx-smile' },
  ];

  return (
    <div className="p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${card.color} ${card.textColor} border border-opacity-20 border-gray-200 min-h-[250px]`}
          >
            <div className="flex items-center gap-4">
              <i className={`bx ${card.icon} text-5xl`}></i>
              <h3 className="text-xl font-semibold">{card.title}</h3>
            </div>
            <p className="text-4xl font-bold mt-3">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
