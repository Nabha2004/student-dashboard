import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LayoutDashboard, GraduationCap, Calendar, User, CheckCircle, Target, BookOpen, Clock, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

// NOTE: Chart.js and Tailwind CSS are loaded via CDN in index.html for simplicity.

// --- STATIC DATA ---
const studentData = {
  name: "Nabha",
  branch: "Information Technology",
  college: "Ramdeobaba College of Engineering and Management (RCOEM)",
  email: "nabha.it22@rknec.edu",
  rollNo: "8",
  currentSem: 7, // UPDATED: Reflecting 7th semester
  cgpa: 9.5, // Updated average CGPA
  creditsEarned: 135,
  creditsTotal: 160,
  attendancePercentage: 90.5,
  pendingExams: 3,
  academics: [ // UPDATED: Expanded academic history
    { sem: 1, cgpa: 8.8, status: 'Good' },
    { sem: 2, cgpa: 9.1, status: 'Good' },
    { sem: 3, cgpa: 9.5, status: 'Excellent' },
    { sem: 4, cgpa: 9.3, status: 'Excellent' },
    { sem: 5, cgpa: 9.2, status: 'Excellent' },
    { sem: 6, cgpa: 9.4, status: 'Excellent' },
    { sem: 7, cgpa: 9.4, status: 'Excellent' }, // Latest semester CGPA
  ],
  subjects: [ // UPDATED: 7th semester subjects
    { name: "Cloud Computing", code: "IT701", faculty: "Purushottam J. Assudani", attendance: 95, internalMarks: 48, status: 'Excellent' },
    { name: "Frontend Technology", code: "IT702", faculty: "Prof. G. Reddy", attendance: 85, internalMarks: 40, status: 'Good' },
    { name: "Project Management", code: "IT703", faculty: "Dr. M. Kulkarni", attendance: 90, internalMarks: 45, status: 'Excellent' },
    { name: "Elective: Cybersecurity", code: "IT704", faculty: "Prof. N. Raut", attendance: 82, internalMarks: 35, status: 'Needs Focus' },
    { name: "Major Project Phase I", code: "IT705", faculty: "Dr. J. Singh", attendance: 98, internalMarks: 50, status: 'Excellent' },
  ],
  events: [
    { type: 'Exam', title: 'ML Final Theory Exam', date: '2025-11-20', time: '10:00 AM', detail: 'Room No. 302, Be on time.', color: 'bg-red-500/10 text-red-700' },
    { type: 'Event', title: 'Tech Interview Prep Workshop', date: '2025-11-22', time: '5:00 PM', detail: 'Compulsory registration for all 7th-year students.', color: 'bg-blue-500/10 text-blue-700' },
    { type: 'Notice', title: 'Placement Drive Schedule Published', date: '2025-11-15', time: '9:00 AM', detail: 'Check the academic portal for company slots.', color: 'bg-yellow-500/10 text-yellow-700' },
    { type: 'Exam', title: 'Cloud Practical Viva', date: '2025-11-25', time: '2:00 PM', detail: 'Lab 4. Prepare containerization and deployment concepts.', color: 'bg-red-500/10 text-red-700' },
    { type: 'Event', title: 'Technovation Club Meeting', date: '2025-11-28', time: '4:30 PM', detail: 'Discussion on upcoming hackathon and project ideas.', color: 'bg-blue-500/10 text-blue-700' },
    { type: 'Notice', title: 'Major Project Submission Deadline', date: '2025-12-05', time: '4:00 PM', detail: 'Phase I final report submission to department head.', color: 'bg-yellow-500/10 text-yellow-700' },
  ]
};

// --- START: USER-PROVIDED SCHEDULE LOGIC (Adapted for dark theme) ---

// Mock data for Tasks/Shifts
const mockTeamScheduleData = [
    { id: 'task-a1', type: 'T', name: 'ML Assignment Due', time: '9:00 AM', duration: '1 hr' },
    { id: 'shift-b2', type: 'S', name: 'Project Group Call', time: '10:00 AM', duration: '4 hr' },
    { id: 'task-c3', type: 'T', name: 'Client Call Mock', time: '2:00 PM', duration: '30 min' },
    { id: 'shift-d4', type: 'S', name: 'Job Search Focus', time: '6:00 PM', duration: '4 hr' },
];

// Helper to determine the style based on item type (Adapted for dark theme)
const getTeamScheduleStyle = (type) => {
    return type === 'T'
        ? 'bg-blue-900/50 text-blue-300 border-blue-600' // Task
        : 'bg-emerald-900/50 text-emerald-300 border-emerald-600'; // Shift
};

const TeamScheduleItem = ({ item }) => (
    <div
        className={`p-4 rounded-lg shadow-md mb-3 border-l-4 transition duration-200 hover:shadow-xl ${getTeamScheduleStyle(item.type)}`}
    >
        <div className="font-semibold text-lg">{item.name}</div>
        <div className="text-sm">
            {item.time} ({item.duration})
        </div>
        <div className="text-xs text-gray-400 mt-1">ID: {item.id} | Type: {item.type}</div>
    </div>
);

// Team Schedule Component (Logic from user's input, renamed to avoid conflict)
const TeamScheduleViewer = ({ scheduleData }) => {
    // Grouping items by type
    const groupedData = scheduleData.reduce((acc, item) => {
        const key = item.type === 'T' ? 'Tasks' : 'Shifts';
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-l-4 border-blue-500/50">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-blue-400" /> Personal/Team Schedule
            </h2>
            <div className="space-y-6">
                {Object.keys(groupedData).map((groupKey) => (
                    <div key={groupKey} className="pt-4 border-t border-gray-700 first:border-t-0 first:pt-0">
                        <h3 className="text-xl font-bold mb-4 text-white">{groupKey}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {groupedData[groupKey].map((item) => (
                                <TeamScheduleItem 
                                    key={item.id} // Keys are now guaranteed unique based on mock data IDs
                                    item={item} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
// --- END: USER-PROVIDED SCHEDULE LOGIC ---


// Utility function to get status color based on percentage
const getStatusColor = (value, goodThreshold = 85, criticalThreshold = 75) => {
  if (value >= goodThreshold) return 'text-orange-500'; // Changed from emerald to orange
  if (value >= criticalThreshold) return 'text-amber-500';
  return 'text-red-500';
};

// --- CHART COMPONENT ---
const AttendanceChart = ({ attendance, target }) => {
  const chartId = "attendance-chart";

  useEffect(() => {
    let chartInstance = null;

    const initializeChart = () => {
      // Check for Chart object now that it is globally loaded in index.html
      if (typeof window.Chart === 'undefined') {
        setTimeout(initializeChart, 100);
        return;
      }
      
      const ctx = document.getElementById(chartId);
      // Destroy existing chart instance before creating a new one
      if (chartInstance) {
          chartInstance.destroy();
      }
      if (!ctx) return;

      const data = {
        labels: ['Actual Attendance', 'Target'],
        datasets: [{
          label: 'Attendance Comparison',
          data: [attendance, target],
          backgroundColor: [
            'rgba(249, 115, 22, 0.7)', // Orange-500
            'rgba(59, 130, 246, 0.7)',  // Blue-500
          ],
          borderColor: [
            'rgb(249, 115, 22)',
            'rgb(59, 130, 246)',
          ],
          borderWidth: 1.5,
          borderRadius: 4,
        }]
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Overall Attendance Analysis',
            color: '#9ca3af', // Gray-400
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#e5e7eb' },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#e5e7eb' },
          }
        }
      };

      chartInstance = new window.Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
      });
    };

    initializeChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [attendance, target]);

  return (
    <div className="h-64 lg:h-80 bg-gray-800 p-4 rounded-xl shadow-xl">
      <canvas id={chartId}></canvas>
    </div>
  );
};

// --- CORE COMPONENTS ---

// 1. Dashboard Page
const Dashboard = ({ navigate }) => {
  const { cgpa, attendancePercentage, creditsEarned, creditsTotal, pendingExams, events } = studentData;

  const cardData = [
    { title: "Current CGPA", value: cgpa.toFixed(2), icon: GraduationCap, color: getStatusColor(cgpa * 10, 9.0, 7.5), link: '/academics' },
    { title: "Overall Attendance", value: `${attendancePercentage.toFixed(1)}%`, icon: Target, color: getStatusColor(attendancePercentage), link: '/academics' },
    { title: "Credits Earned", value: `${creditsEarned} / ${creditsTotal}`, icon: BookOpen, color: getStatusColor((creditsEarned / creditsTotal) * 100, 80, 50), link: '/academics' },
    { title: "Pending Exams", value: pendingExams, icon: Clock, color: pendingExams > 1 ? 'text-red-500' : 'text-amber-500', link: '/schedule' },
  ];

  return (
    <div className="space-y-8 p-4">
      {/* Welcome Section */}
      <h1 className="text-3xl font-extrabold text-white">
        Welcome Back, <span className="text-orange-400">{studentData.name}</span>
      </h1>
      
      {/* Unique Layout: Chart Above Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content: Attendance Chart (Span 2 columns on desktop) */}
        <div className="xl:col-span-2">
          <AttendanceChart attendance={attendancePercentage} target={75} />
        </div>

        {/* Side Panel: Core Metrics Cards (Span 1 column on desktop) */}
        <div className="xl:col-span-1 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.03] cursor-pointer border-t-2 border-orange-500/50"
              onClick={() => navigate(card.link)}
            >
              <card.icon className={`w-8 h-8 mb-2 ${card.color}`} />
              <p className="text-sm font-medium text-gray-400">{card.title}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Upcoming Events (Actionable List) */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-l-4 border-blue-500">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-400" /> Upcoming Events & Notices
        </h2>
        <div className="space-y-3">
          {events.slice(0, 5).map((event, index) => (
            <div
              key={index}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-200 ${event.color} hover:bg-gray-700/50 border border-gray-700`}
              onClick={() => navigate('/schedule')} // All events lead to the schedule page
            >
              <div className="flex-shrink-0 mr-4">
                {event.type === 'Exam' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                {event.type === 'Event' && <CheckCircle className="w-5 h-5 text-blue-500" />}
                {event.type === 'Notice' && <Target className="w-5 h-5 text-yellow-500" />}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-white truncate">{event.title}</p>
                <p className="text-xs text-gray-400">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
              </div>
              <ChevronUp className="w-4 h-4 ml-4 text-gray-400 rotate-90" />
            </div>
          ))}
        </div>
        <button
          className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition duration-200"
          onClick={() => navigate('/schedule')}
        >
          View Full Schedule &rarr;
        </button>
      </div>
    </div>
  );
};

// 2. Academics Page
const Academics = () => {
  const [expandedSubject, setExpandedSubject] = useState(null);

  useEffect(() => {
    let chartInstance = null;
    const initializeChart = () => {
      if (typeof window.Chart === 'undefined') {
        setTimeout(initializeChart, 100);
        return;
      }
      const ctx = document.getElementById('cgpa-chart');
      // Destroy existing chart instance before creating a new one
      if (chartInstance) {
          chartInstance.destroy();
      }
      if (!ctx) return;

      const labels = studentData.academics.map(a => `Sem ${a.sem}`);
      const dataPoints = studentData.academics.map(a => a.cgpa);

      const data = {
        labels: labels,
        datasets: [{
          label: 'CGPA by Semester',
          data: dataPoints,
          borderColor: '#f97316', // Orange-500
          backgroundColor: 'rgba(249, 115, 22, 0.3)', // Orange-500/30
          tension: 0.3,
          fill: true,
        }]
      };
      
      chartInstance = new window.Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              min: 8.0, // Adjusted min to better visualize 7 semesters of high CGPA data
              max: 10.0,
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#e5e7eb' },
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#e5e7eb' },
            }
          }
        }
      });
    };

    initializeChart();

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, []); // Depend on studentData.academics implicit change

  const getSubjectStatus = (status) => {
    switch (status) {
      case 'Excellent': return 'bg-orange-500/20 text-orange-300';
      case 'Good': return 'bg-blue-500/20 text-blue-300';
      case 'Needs Focus': return 'bg-amber-500/20 text-amber-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  }

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-extrabold text-white border-b border-gray-700 pb-3">
        Academic Performance: Detailed View (Sem {studentData.currentSem})
      </h1>
      
      {/* CGPA History Chart */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h2 className="text-xl font-semibold text-white mb-4">CGPA Trend Over Semesters (1 to {studentData.currentSem})</h2>
        <div className="h-72">
          <canvas id="cgpa-chart"></canvas>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Credit Breakdown */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-2xl border-r-4 border-orange-500">
          <h2 className="text-xl font-semibold text-white mb-4">Credit Status</h2>
          <div className="space-y-4">
            {['Core IT', 'Electives', 'Humanities'].map((category, index) => {
              // Mock data based on 7th sem progression
              const earned = index === 0 ? 90 : index === 1 ? 30 : 15;
              const required = index === 0 ? 100 : index === 1 ? 30 : 20;
              const progress = Math.round((earned / required) * 100);
              const color = getStatusColor(progress, 90, 60).replace('text-', 'bg-');
              
              return (
                <div key={category}>
                  <p className="text-sm font-medium text-gray-400 mb-1 flex justify-between">
                    {category}
                    <span className="font-bold text-white">{earned}/{required}</span>
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${Math.min(100, progress)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Subject Performance Accordion */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-2xl border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-white mb-4">Subject Performance (Sem {studentData.currentSem})</h2>
          <div className="space-y-2">
            {studentData.subjects.map((subject) => (
              <div key={subject.code} className="border border-gray-700 rounded-lg">
                <button
                  className="flex justify-between items-center w-full p-4 text-left text-white hover:bg-gray-700/50 transition duration-200"
                  onClick={() => setExpandedSubject(expandedSubject === subject.code ? null : subject.code)}
                >
                  <span className="font-medium text-lg">{subject.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getSubjectStatus(subject.status)} hidden sm:inline`}>{subject.status}</span>
                    {expandedSubject === subject.code ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>
                {expandedSubject === subject.code && (
                  <div className="p-4 pt-2 bg-gray-700/30 border-t border-gray-700 space-y-2">
                    <p className="text-sm text-gray-300"><span className="font-semibold text-white">Course Code:</span> {subject.code}</p>
                    <p className="text-sm text-gray-300"><span className="font-semibold text-white">Faculty:</span> {subject.faculty}</p>
                    <p className="text-sm text-gray-300"><span className="font-semibold text-white">Attendance:</span> <span className={getStatusColor(subject.attendance)}>{subject.attendance}%</span></p>
                    <p className="text-sm text-gray-300"><span className="font-semibold text-white">Internal Marks:</span> <span className={getStatusColor(subject.internalMarks * 2)}>{subject.internalMarks} / 50</span></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Schedule Page (Now including TeamScheduleViewer)
const Schedule = () => {
  const [activeTab, setActiveTab] = useState('Exams');
  const [expandedNotice, setExpandedNotice] = useState(null);

  const notices = studentData.events.filter(e => e.type === 'Notice');
  const exams = studentData.events.filter(e => e.type === 'Exam');
  const events = studentData.events.filter(e => e.type === 'Event');

  const EventCard = ({ event, index }) => (
    <div key={index} className={`p-4 rounded-lg shadow-md border-l-4 ${event.type === 'Exam' ? 'border-red-500 bg-gray-700/30' : event.type === 'Event' ? 'border-blue-500 bg-gray-700/30' : 'border-yellow-500 bg-gray-700/30'}`}>
      <p className="text-sm font-bold text-white mb-1">{event.title}</p>
      <p className="text-xs text-gray-400 flex items-center mb-1">
        <Calendar className="w-3 h-3 mr-1 text-gray-500" />
        {new Date(event.date).toDateString()}, {event.time}
      </p>
      <p className="text-xs text-gray-400 flex items-center">
        <Clock className="w-3 h-3 mr-1 text-gray-500" />
        {event.detail}
      </p>
    </div>
  );

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-extrabold text-white border-b border-gray-700 pb-3">
        Campus Schedule & Circulars
      </h1>

      {/* Academic Schedule Section */}
      <div className="flex space-x-2 border-b border-gray-700">
        {['Exams', 'Events', 'Notices'].map(tab => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium transition duration-200 ${
              activeTab === tab
                ? 'border-b-2 border-orange-400 text-orange-400'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View (Placeholder for visual uniqueness) */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">Interactive Calendar View (Nov 2025)</h2>
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-400">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-orange-400">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm text-white mt-1">
            {/* Start offset for Nov 2025 (Nov 1 is Saturday) */}
            {[...Array(6)].map((_, i) => <div key={`offset-${i}`}></div>)}
            {[...Array(30).keys()].map(day => {
              const date = day + 1;
              const isExamDay = date === 20 || date === 25;
              const isEventDay = date === 22 || date === 28;
              const isNoticeDay = date === 15;

              let dotClass = '';
              if (isExamDay) dotClass = 'bg-red-500';
              else if (isEventDay) dotClass = 'bg-blue-500';
              else if (isNoticeDay) dotClass = 'bg-yellow-500';
              
              return (
                <div key={date} className={`p-1 rounded-full ${date === new Date().getDate() ? 'bg-orange-500/20 text-orange-300' : 'hover:bg-gray-700/50 transition cursor-default'}`}>
                  {date}
                  {dotClass && <div className={`w-1 h-1 ${dotClass} rounded-full mx-auto mt-0.5`}></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content List (Span 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              {activeTab === 'Exams' && <><AlertTriangle className="w-5 h-5 mr-2 inline text-red-400" /> Pending Examinations</>}
              {activeTab === 'Events' && <><CheckCircle className="w-5 h-5 mr-2 inline text-blue-400" /> Co-curricular Activities</>}
              {activeTab === 'Notices' && <><Target className="w-5 h-5 mr-2 inline text-yellow-400" /> Official Circulars</>}
            </h2>
            <div className="space-y-3">
              {(activeTab === 'Exams' ? exams : activeTab === 'Events' ? events : notices).map((item, index) => (
                <EventCard key={index} event={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* --- INTEGRATED TEAM SCHEDULE VIEWER --- */}
      <div className="pt-8">
        <TeamScheduleViewer scheduleData={mockTeamScheduleData} />
      </div>
    </div>
  );
};


// 4. Profile Page
const Profile = () => {
  const profileDetails = [
    { label: "Full Name", value: studentData.name, icon: User },
    { label: "Roll Number", value: studentData.rollNo, icon: BookOpen },
    { label: "Branch", value: studentData.branch, icon: GraduationCap },
    { label: "Email ID", value: studentData.email, icon: Target },
    { label: "College", value: studentData.college, icon: LayoutDashboard },
    { label: "Current Semester", value: studentData.currentSem, icon: Clock },
  ];

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-extrabold text-white border-b border-gray-700 pb-3">
        Student Profile & Information
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 p-8 bg-gray-800 rounded-xl shadow-2xl flex flex-col items-center border-t-4 border-orange-500">
          <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-4xl font-bold text-gray-900 mb-4">
            N
          </div>
          <h2 className="text-2xl font-bold text-white">{studentData.name}</h2>
          <p className="text-md text-gray-400">{studentData.branch}</p>
          <div className="mt-6 w-full text-center">
            <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-blue-500/20 text-blue-300">
              Active Enrollment (Final Year)
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profileDetails.map((item, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
              <item.icon className="w-5 h-5 text-orange-400 mb-1" />
              <p className="text-xs font-medium text-gray-400">{item.label}</p>
              <p className="text-lg font-semibold text-white truncate">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Settings Placeholder */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">Portal Preferences</h2>
          <p className="text-gray-400 text-sm">Dark Theme: <span className="text-orange-400">Enabled</span> (Default)</p>
          <p className="text-gray-400 text-sm">Notification Emails: <span className="text-blue-400">Weekly Summary</span></p>
          <button className="mt-4 px-4 py-2 text-sm bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition duration-200">
            Edit Settings
          </button>
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---
const App = () => {
  // Simple client-side routing using state and window hash for persistence
  const [currentPage, setCurrentPage] = useState(window.location.hash.substring(1) || '/');

  const navigate = useCallback((path) => {
    window.location.hash = path;
    setCurrentPage(path);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash.substring(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = useMemo(() => {
    switch (currentPage) {
      case '/':
      case 'dashboard':
        return <Dashboard navigate={navigate} />;
      case 'academics':
        return <Academics />;
      case 'schedule':
        return <Schedule />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  }, [currentPage, navigate]);


  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: 'academics', label: 'Academics', icon: GraduationCap },
    { path: 'schedule', label: 'Schedule', icon: Calendar },
    { path: 'profile', label: 'Profile', icon: User },
  ];

  const Header = () => (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo/Title */}
        <h1 className="text-2xl font-extrabold text-orange-400 tracking-wider">
          RCOEM
        </h1>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <a
              key={item.path}
              href={`#${item.path}`}
              onClick={(e) => { e.preventDefault(); navigate(item.path); }}
              className={`flex items-center text-sm font-medium p-2 rounded-lg transition duration-200 ${
                currentPage === item.path || (currentPage === '' && item.path === '/')
                  ? 'bg-orange-600/30 text-orange-400'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Student Profile (Header Right) */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white">{studentData.name}</p>
            <p className="text-xs text-gray-400">{studentData.branch}</p>
          </div>
          <a
            href="#profile"
            onClick={(e) => { e.preventDefault(); navigate('profile'); }}
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-md font-bold cursor-pointer transition duration-200 hover:ring-2 ring-orange-400"
          >
            N
          </a>
        </div>
      </div>
      
      {/* Navigation - Mobile (Bottom Menu Bar) */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-900 border-t border-gray-700 p-2 shadow-2xl z-20 flex justify-around">
          {navItems.map(item => (
            <a
              key={item.path}
              href={`#${item.path}`}
              onClick={(e) => { e.preventDefault(); navigate(item.path); }}
              className={`flex flex-col items-center text-xs p-1 rounded-lg transition duration-200 ${
                currentPage === item.path || (currentPage === '' && item.path === '/')
                  ? 'text-orange-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className="w-6 h-6" />
              {item.label}
            </a>
          ))}
      </nav>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto pb-12 pt-4">
        {renderPage}
      </main>
    </div>
  );
};

export default App;
