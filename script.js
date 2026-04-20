/* ═══════════════════════════════════════════════════
   LINKED LIST IMPLEMENTATION
═══════════════════════════════════════════════════ */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this._size = 0;
  }

  get size() { return this._size; }

  append(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      let c = this.head;
      while (c.next) c = c.next;
      c.next = node;
    }
    this._size++;
  }

  prepend(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    this._size++;
  }

  removeById(id) {
    if (!this.head) return;
    if (this.head.data.id === id) { this.head = this.head.next; this._size--; return; }
    let c = this.head;
    while (c.next && c.next.data.id !== id) c = c.next;
    if (c.next) { c.next = c.next.next; this._size--; }
  }

  findById(id) {
    let c = this.head;
    while (c) { if (c.data.id === id) return c.data; c = c.next; }
    return null;
  }

  updateById(id, updates) {
    const item = this.findById(id);
    if (item) Object.assign(item, updates);
  }

  toArray() {
    const arr = []; let c = this.head;
    while (c) { arr.push(c.data); c = c.next; }
    return arr;
  }

  filter(fn) {
    const result = new LinkedList();
    let c = this.head;
    while (c) { if (fn(c.data)) result.append(c.data); c = c.next; }
    return result;
  }

  sortedArray(fn) { return this.toArray().sort(fn); }

  forEach(fn) { let c = this.head; while (c) { fn(c.data); c = c.next; } }

  reduce(fn, init) {
    let acc = init, c = this.head;
    while (c) { acc = fn(acc, c.data); c = c.next; }
    return acc;
  }

  some(fn) { let c = this.head; while (c) { if (fn(c.data)) return true; c = c.next; } return false; }
  every(fn) { let c = this.head; while (c) { if (!fn(c.data)) return false; c = c.next; } return true; }
}

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
const AVATAR_COLORS = ['#B5D4F4','#9FE1CB','#F5C4B3','#C0DD97','#F4C0D1','#CECBF6','#FAC775','#D3D1C7'];
const AVATAR_BG     = ['#185FA5','#0F6E56','#993C1D','#3B6D11','#993556','#534AB7','#854F0B','#5F5E5A'];

const DIFF_COLOR   = { easy: '#34c77b', medium: '#f5a623', hard: '#e85454' };
const DIFF_CLASS   = { easy: 'badge-easy', medium: 'badge-med', hard: 'badge-hard' };
const STATUS_CLASS = { active: 'status-active', offline: 'status-offline' };
const DOT_CLASS    = { active: 'dot-active', offline: 'dot-offline' };

/* ═══════════════════════════════════════════════════
   STATE — ALL COLLECTIONS ARE LINKED LISTS
═══════════════════════════════════════════════════ */
const state = {
  students: new LinkedList(),
  topics:   new LinkedList(),
  activities: new LinkedList(),
  curriculumTasks: new LinkedList(),
  modalMode: '',
  modalData: {},
  searchQuery: '',
  topicFilter: 'all',
  activityFilter: 'all',
  calendarDate: new Date(),
};

/* Seed data */
const SEED_STUDENTS = [
  {id:1,name:'Aanya Singh',  avatar:'AS',color:0,score:920,streak:12,status:'active',  topics:['Arrays','Linked Lists','Stacks','Trees','BST','Heaps','Sorting','Searching','Graphs','BFS','DFS','DP Basics','Recursion','Hashing'], loginHistory:[]},
  {id:2,name:'Rahul Mehta',  avatar:'RM',color:1,score:845,streak:8, status:'active',  topics:['Arrays','Linked Lists','Stacks','Trees','BST','Sorting','Searching','Graphs','BFS','Recursion','Hashing'], loginHistory:[]},
  {id:3,name:'Priya Patel',  avatar:'PP',color:2,score:710,streak:5, status:'offline', topics:['Arrays','Linked Lists','Stacks','Trees','BST','Sorting','Searching','Recursion','Hashing'], loginHistory:[]},
  {id:4,name:'Dev Sharma',   avatar:'DS',color:3,score:980,streak:21,status:'active',  topics:['Arrays','Linked Lists','Stacks','Trees','BST','Heaps','Sorting','Searching','Graphs','BFS','DFS','DP Basics','DP Advanced','Recursion','Hashing','Tries'], loginHistory:[]},
  {id:5,name:'Kavya Reddy',  avatar:'KR',color:4,score:540,streak:2, status:'offline', topics:['Arrays','Linked Lists','Stacks','Trees','BST','Sorting','Recursion'], loginHistory:[]},
  {id:6,name:'Arjun Nair',   avatar:'AN',color:5,score:210,streak:0, status:'offline',topics:['Arrays','Linked Lists','Stacks'], loginHistory:[]},
  {id:7,name:'Sneha Iyer',   avatar:'SI',color:6,score:870,streak:9, status:'active',  topics:['Arrays','Linked Lists','Stacks','Trees','BST','Heaps','Sorting','Searching','Graphs','BFS','Recursion','Hashing'], loginHistory:[]},
  {id:8,name:'Vikram Das',   avatar:'VD',color:7,score:120,streak:0, status:'offline',topics:['Arrays','Linked Lists'], loginHistory:[]},
  {id:9,name:'Meera Joshi',  avatar:'MJ',color:0,score:380,streak:1, status:'offline', topics:['Arrays','Linked Lists','Stacks','Trees','Sorting'], loginHistory:[]},
  {id:10,name:'Rohan Gupta', avatar:'RG',color:1,score:895,streak:15,status:'active',  topics:['Arrays','Linked Lists','Stacks','Trees','BST','Heaps','Sorting','Searching','Graphs','BFS','Recursion','Hashing','DP Basics'], loginHistory:[]},
];

const SEED_TOPICS = [
  {id:1, name:'Arrays',      cat:'Linear',       diff:'easy',   problems:25},
  {id:2, name:'Linked Lists',cat:'Linear',       diff:'easy',   problems:20},
  {id:3, name:'Stacks',      cat:'Linear',       diff:'easy',   problems:15},
  {id:4, name:'Trees',       cat:'Non-Linear',   diff:'medium', problems:30},
  {id:5, name:'BST',         cat:'Non-Linear',   diff:'medium', problems:22},
  {id:6, name:'Heaps',       cat:'Non-Linear',   diff:'medium', problems:18},
  {id:7, name:'Sorting',     cat:'Algorithms',   diff:'easy',   problems:20},
  {id:8, name:'Searching',   cat:'Algorithms',   diff:'easy',   problems:12},
  {id:9, name:'Graphs',      cat:'Non-Linear',   diff:'hard',   problems:35},
  {id:10,name:'BFS',         cat:'Graph Algo',   diff:'hard',   problems:15},
  {id:11,name:'DFS',         cat:'Graph Algo',   diff:'hard',   problems:15},
  {id:12,name:'DP Basics',   cat:'Dynamic Prog', diff:'hard',   problems:28},
  {id:13,name:'DP Advanced', cat:'Dynamic Prog', diff:'hard',   problems:20},
  {id:14,name:'Recursion',   cat:'Fundamentals', diff:'medium', problems:18},
  {id:15,name:'Hashing',     cat:'Data Struct',  diff:'medium', problems:16},
  {id:16,name:'Tries',       cat:'Data Struct',  diff:'hard',   problems:10},
];

const SEED_TASKS = [
  {id:1, topic:'Arrays', description:'Reverse an array in-place'},
  {id:2, topic:'Arrays', description:'Find the maximum subarray sum (Kadane)'},
  {id:3, topic:'Linked Lists', description:'Detect a cycle in a linked list'}
];

/* ═══════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════ */
const STORAGE = {
  auth: 'dsaLoggedIn',
  role: 'dsaUserRole',
  username: 'dsaUserName',
  users: 'dsaUsers',
  students: 'dsaStudents',
  topics: 'dsaTopics',
  curriculumTasks: 'dsaCurriculumTasks',
  activities: 'dsaActivities', // Added for persistent activity log
};
let isLoginMode = true;
let loginRole = 'admin';
let currentRole = null;
let currentUsername = null;

const SEED_USERS = [
  { username: 'admin', password: '123456', role: 'admin' },
  { username: 'aanya', password: 'student123', role: 'student', studentId: 1 },
  { username: 'rahul', password: 'student123', role: 'student', studentId: 2 },
  { username: 'priya', password: 'student123', role: 'student', studentId: 3 },
];

function checkAuth() {
  const isLoggedIn = localStorage.getItem(STORAGE.auth) === 'true';
  if (!isLoggedIn) return;
  currentRole = localStorage.getItem(STORAGE.role) || 'admin';
  currentUsername = localStorage.getItem(STORAGE.username) || '';
  showApp();
}

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  document.getElementById('auth-toggle').textContent   = isLoginMode ? ' Create Account' : ' Back to Login';
  document.getElementById('toggle-text').textContent   = isLoginMode ? "Don't have an account?" : 'Already have an account?';
  document.getElementById('login-error').style.display = 'none';
  if (!isLoginMode) selectRole('student');
  updateRoleButtons();
  updateAuthText();
}

function selectRole(role) {
  if (!isLoginMode && role === 'admin') return;
  loginRole = role;
  updateRoleButtons();
  updateAuthText();
}

function updateRoleButtons() {
  document.querySelectorAll('.role-btn').forEach(button => {
    const role = button.getAttribute('data-role');
    button.classList.toggle('active', role === loginRole);
    button.disabled = !isLoginMode && role === 'admin';
  });
}

function updateAuthText() {
  const title = document.getElementById('auth-title');
  const roleDesc = document.getElementById('role-desc');
  const loginText = isLoginMode ? 'Login' : 'Sign Up';
  const authBtn = document.getElementById('auth-btn');

  authBtn.textContent = loginText;

  if (loginRole === 'admin') {
    title.textContent = isLoginMode ? 'Instructor Portal' : 'Instructor Sign Up';
    roleDesc.textContent = 'Admins can manage students, topics, and analytics.';
    document.getElementById('login-ID').placeholder = 'admin';
    document.getElementById('name-row').style.display = 'none';
  } else {
    title.textContent = isLoginMode ? 'Student Portal' : 'Create Student Account';
    roleDesc.textContent = isLoginMode
      ? 'Student access gives you a personalized dashboard and progress tracking.'
      : 'Create a student account to track your progress and view your activity.';
    document.getElementById('login-ID').placeholder = 'student username';
    document.getElementById('name-row').style.display = isLoginMode ? 'none' : 'block';
  }
}

class UserNode {
  constructor(username, password, role = 'student', studentId = null) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.studentId = studentId;
    this.next = null;
  }
}

class UserList {
  constructor() {
    this.head = null;
  }

  addUser(username, password, role = 'student', studentId = null) {
    const newNode = new UserNode(username, password, role, studentId);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  findUser(username, password, role) {
    let current = this.head;
    while (current) {
      if (current.username === username && current.password === password && current.role === role) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  findByUsername(username) {
    let current = this.head;
    while (current) {
      if (current.username === username) return current;
      current = current.next;
    }
    return null;
  }

  findByStudentId(studentId) {
    let current = this.head;
    while (current) {
      if (current.studentId === studentId) return current;
      current = current.next;
    }
    return null;
  }
}

function handleAuth() { isLoginMode ? handleLogin() : handleSignUp(); }

const user = new UserList();
loadData();
loadUsers();

function normalizeStudentUsername(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function generateStudentUsersFromList() {
  let created = false;
  let dirtyStudents = false;
  let current = state.students.head;
  while (current) {
    const student = current.data;
    const existingUser = user.findByStudentId(student.id);
    if (!student.username) {
      const baseUsername = normalizeStudentUsername(student.name);
      let username = baseUsername;
      let suffix = 1;
      while (user.findByUsername(username) || state.students.some(s => s.username === username)) {
        username = `${baseUsername}${suffix}`;
        suffix += 1;
      }
      student.username = username;
      dirtyStudents = true;
    }
    if (existingUser) {
      if (!student.password) {
        student.password = existingUser.password;
        dirtyStudents = true;
      }
    } else {
      student.password = student.password || 'student123';
      user.addUser(student.username, student.password, 'student', student.id);
      created = true;
      dirtyStudents = true;
    }
    current = current.next;
  }
  if (dirtyStudents) saveData();
  return created;
}

function updateStudentStreak(student) {
  if (!student.loginHistory) student.loginHistory = [];
  
  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();
  
  // Get yesterday's date at midnight
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayTime = yesterday.getTime();
  
  // Check if student already logged in today
  const loggedInToday = student.loginHistory.some(timestamp => {
    const loginDate = new Date(timestamp);
    loginDate.setHours(0, 0, 0, 0);
    return loginDate.getTime() === todayTime;
  });
  
  // If already logged in today, don't update streak
  if (loggedInToday) return;
  
  // Check if student logged in yesterday
  const loggedInYesterday = student.loginHistory.some(timestamp => {
    const loginDate = new Date(timestamp);
    loginDate.setHours(0, 0, 0, 0);
    return loginDate.getTime() === yesterdayTime;
  });
  
  // Update streak
  if (loggedInYesterday) {
    // Continue the streak
    student.streak += 1;
  } else {
    // Reset streak to 1 (first login in this new streak)
    student.streak = 1;
  }
}

function recalculateStreakFromHistory(student) {
  if (!student.loginHistory || student.loginHistory.length === 0) {
    student.streak = 0;
    return;
  }
  
  // Sort login history in descending order (most recent first)
  const sortedLogins = [...student.loginHistory].sort((a, b) => b - a);
  
  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();
  
  // Check if student has logged in today
  const loggedInToday = sortedLogins.some(timestamp => {
    const loginDate = new Date(timestamp);
    loginDate.setHours(0, 0, 0, 0);
    return loginDate.getTime() === todayTime;
  });
  
  // Start from today or yesterday
  let currentDate = loggedInToday ? new Date(today) : new Date(today.getTime() - 86400000);
  let streak = 0;
  
  // Walk backwards through dates checking for logins
  while (true) {
    currentDate.setHours(0, 0, 0, 0);
    const currentTime = currentDate.getTime();
    
    const loginExists = sortedLogins.some(timestamp => {
      const loginDate = new Date(timestamp);
      loginDate.setHours(0, 0, 0, 0);
      return loginDate.getTime() === currentTime;
    });
    
    if (loginExists) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  student.streak = streak;
  return streak;
}

function syncAllStudentStreaks() {
  // Recalculate all student streaks based on their login history
  state.students.forEach(student => {
    recalculateStreakFromHistory(student);
  });
  saveData();
}

function handleLogin() {
  const username = document.getElementById('login-ID').value.trim();
  const pass = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');
  const found = user.findUser(username, pass, loginRole);

  if (found) {
    currentRole = found.role;
    currentUsername = found.username;
    localStorage.setItem(STORAGE.auth, 'true');
    localStorage.setItem(STORAGE.role, currentRole);
    localStorage.setItem(STORAGE.username, currentUsername);
    if (currentRole === 'student') {
      const student = state.students.findById(found.studentId);
      if (student) {
        if (!student.loginHistory) student.loginHistory = [];
        student.loginHistory.push(Date.now());
        updateStudentStreak(student);
        student.status = 'active';
        saveData();
      }
    }
    showApp();
  } else {
    err.textContent = 'Invalid username or password.';
    err.style.display = 'block';
    const card = document.getElementById('login-card');
    card.style.animation = 'none';
    requestAnimationFrame(() => { card.style.animation = 'shake 0.3s ease'; });
  }
}

function handleSignUp() {
  const name = document.getElementById('login-name').value.trim();
  const username = document.getElementById('login-ID').value.trim();
  const pass = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');

  if (!name || !username || !pass) {
    err.textContent = 'All fields are required.';
    err.style.display = 'block'; return;
  }
  if (pass.length < 6) {
    err.textContent = 'Password must be at least 6 characters.';
    err.style.display = 'block'; return;
  }
  if (user.findByUsername(username)) {
    err.textContent = 'That username is already taken.';
    err.style.display = 'block'; return;
  }

  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const studentId = Date.now();
  state.students.append({
    id: studentId,
    name,
    avatar: initials,
    color: Math.floor(Math.random() * AVATAR_COLORS.length),
    streak: 0,
    status: 'active',
    topics: [],
    completedTaskIds: [],
    loginHistory: []
  });

  user.addUser(username, pass, 'student', studentId);
  saveUsers();
  saveData();

  currentRole = 'student';
  currentUsername = username;
  localStorage.setItem(STORAGE.auth, 'true');
  localStorage.setItem(STORAGE.role, currentRole);
  localStorage.setItem(STORAGE.username, currentUsername);
  showApp();
}

function handleLogout() {
  const student = getLoggedInStudent();
  if (student) {
    student.status = 'offline';
    saveData();
  }
  localStorage.removeItem(STORAGE.auth);
  localStorage.removeItem(STORAGE.role);
  localStorage.removeItem(STORAGE.username);
  location.reload();
}

function saveUsers() {
  const users = [];
  let current = user.head;
  while (current) {
    users.push({ username: current.username, password: current.password, role: current.role, studentId: current.studentId });
    current = current.next;
  }
  localStorage.setItem(STORAGE.users, JSON.stringify(users));
}

function loadUsers() {
  const raw = localStorage.getItem(STORAGE.users);
  const users = raw ? JSON.parse(raw) : SEED_USERS;
  users.forEach(u => user.addUser(u.username, u.password, u.role, u.studentId || null));
  const newStudentsCreated = generateStudentUsersFromList();
  if (newStudentsCreated) saveUsers();
}

function saveData() {
  localStorage.setItem(STORAGE.students, JSON.stringify(state.students.toArray()));
  localStorage.setItem(STORAGE.topics, JSON.stringify(state.topics.toArray()));
  localStorage.setItem(STORAGE.curriculumTasks, JSON.stringify(state.curriculumTasks.toArray()));
  localStorage.setItem(STORAGE.activities, JSON.stringify(state.activities.toArray())); // Save activities
}

function loadData() {
  const storedStudents = localStorage.getItem(STORAGE.students);
  const storedTopics = localStorage.getItem(STORAGE.topics);
  const storedCurriculumTasks = localStorage.getItem(STORAGE.curriculumTasks);

  state.students = new LinkedList();
  state.topics = new LinkedList();
  state.curriculumTasks = new LinkedList();

  if (storedStudents) {
    JSON.parse(storedStudents).forEach(s => state.students.append(s));
  } else {
    SEED_STUDENTS.forEach(s => state.students.append(s));
  }

  if (storedTopics) {
    JSON.parse(storedTopics).forEach(t => state.topics.append(t));
  } else {
    SEED_TOPICS.forEach(t => state.topics.append(t));
  }

  if (storedCurriculumTasks) {
    JSON.parse(storedCurriculumTasks).forEach(tk => state.curriculumTasks.append(tk));
  } else {
    SEED_TASKS.forEach(tk => state.curriculumTasks.append(tk));
  }

  // Load activities or generate if none exist
  const storedActivities = localStorage.getItem(STORAGE.activities);
  state.activities = new LinkedList(); // Initialize activities LinkedList
  if (storedActivities) {
    JSON.parse(storedActivities).forEach(a => state.activities.append(a));
  } else {
    generateActivities(); // Generate initial activities if none are stored
    saveData(); // Save the newly generated activities
  }
}

function getLoggedInStudent() {
  const userEntry = user.findByUsername(currentUsername);
  if (!userEntry || userEntry.role !== 'student') return null;
  return state.students.findById(userEntry.studentId);
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  loadData();
  syncAllStudentStreaks();  // Sync streaks with login history

  if (currentRole === 'student') {
    showStudentApp();
  } else {
    showAdminApp();
  }
}

function showAdminApp() {
  document.getElementById('student-app').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  renderAdminViews();
}

function showStudentApp() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('student-app').style.display = 'block';
  renderStudentDashboard();
}

function renderAdminViews() {
  renderDashboard();
  renderStudents();
  renderTopics();
  renderActivity();
  renderAlerts();
  renderHeatmap();
}

function renderStudentDashboard() {
  const student = getLoggedInStudent();
  if (!student) return;
  document.getElementById('student-welcome').textContent = `Welcome back, ${student.name}`;
  
  const { count, total, pct, validTopics, score } = getStudentProgress(student);
  
  const studentActivities = state.activities.toArray().filter(a => a.student === student.name).slice(0, 8);
  const activityHtml = studentActivities.length
    ? studentActivities.map(a => {
        const displayTime = formatActivityTime(a.time, a.isTimestamp);
        return `<div class="activity-item">
          ${avatarEl(a, 28)}
          <div class="activity-info"><strong>${a.type}</strong> <span style="color:var(--text2);">on</span> <strong>${a.topic}</strong></div>
          <span class="activity-time">${displayTime}</span>
        </div>`;
      }).join('')
    : '<p style="color:var(--text3);font-size:13px;">No recent activity yet.</p>';

    document.getElementById('student-metrics').innerHTML = `
    <div class="metric-card">
      <div class="metric-label">Topics Done</div>
      <div class="metric-value metric-accent">${count}</div>
      <div class="metric-sub">of ${total}</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Score</div>
      <div class="metric-value metric-green">${score}</div>
      <div class="metric-sub">Current rating</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Streak</div>
      <div class="metric-value metric-orange">${student.streak}d</div>
      <div class="metric-sub">Active learning streak</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Completion</div>
      <div class="metric-value metric-accent">${pct}%</div>
      <div class="metric-sub">Curriculum progress</div>
    </div>
  `;
  document.getElementById('student-activity').innerHTML = activityHtml;

  const topics = validTopics.slice(0, 8).map(topic => `
    <div class="topic-row">
      <span class="topic-name">${topic}</span>
      <span class="topic-cat">Completed</span>
      <div class="prog-bar"><div class="prog-fill" style="width:100%;background:var(--accent);"></div></div>
      <span class="prog-pct" style="color:var(--accent)">100%</span>
    </div>`).join('');
  document.getElementById('student-topics').innerHTML = topics || '<p style="color:var(--text3);font-size:13px;">No completed topics yet.</p>';

  renderStudentCourses();
  renderStudentTasks();
  renderStudentHeatmap();
}

function renderStudentCourses() {
  const student = getLoggedInStudent();
  if (!student) return;
  const coursesHtml = state.topics.toArray().map(topic => {
    const isCompleted = student.topics.includes(topic.name);
    const isStarted = student.startedTopics && student.startedTopics.includes(topic.name);
    
    let btnHtml = '';
    if (isCompleted) {
      btnHtml = `<button class="btn-success" disabled>Completed</button>`;
    } else if (isStarted) {
      // If started, show a button to complete the course
      btnHtml = `<button class="btn-primary" onclick="completeTopic('${topic.name}')" style="background:var(--orange)">Complete</button>`;
    } else {
      btnHtml = `<button class="btn-primary" onclick="startTopic('${topic.name}')">Start</button>`;
    }

    return `
      <div class="course-item">
        <div class="course-info">
          <span class="course-name">${topic.name}</span>
          <span class="course-cat">${topic.cat} • ${topic.diff}</span>
        </div>
        ${btnHtml}
      </div>`;
  }).join('');
  document.getElementById('student-courses').innerHTML = coursesHtml;
}

function renderStudentTasks() {
  const student = getLoggedInStudent();
  if (!student) return;
  
  const tasksHtml = state.curriculumTasks.toArray().map(task => {
    const isCompleted = (student.completedTaskIds || []).includes(task.id);
    const btnHtml = isCompleted 
      ? `<button class="btn-success" disabled>Done ✓</button>`
      : `<button class="btn-primary" onclick="completeTask(${task.id})">Complete</button>`;

    return `
      <div class="task-item ${isCompleted ? 'completed' : ''}">
        <div class="task-main">
          <span class="task-desc">${task.description}</span>
          <span class="task-topic">${task.topic}</span>
        </div>
        ${btnHtml}
      </div>`;
  }).join('');
  document.getElementById('student-tasks').innerHTML = tasksHtml || '<p style="color:var(--text3);padding:20px;">No tasks assigned yet.</p>';
}

function startTopic(topicName) {
  const student = getLoggedInStudent();
  if (!student) return;
  if (!student.startedTopics) student.startedTopics = [];
  if (!student.startedTopics.includes(topicName) && !student.topics.includes(topicName)) {
    student.startedTopics.push(topicName);
    
    // Log activity
    state.activities.prepend({
      student: student.name,
      avatar:  student.avatar,
      color:   student.color,
      type:    'started',
      topic:   topicName,
      time:    Date.now(),
      isTimestamp: true,
    });

    saveData();
    renderStudentCourses();
    renderStudentDashboard();
  }
}

function completeTopic(topicName) {
  const student = getLoggedInStudent();
  if (!student) return;
  
  // Move from started to completed
  if (student.startedTopics) {
    student.startedTopics = student.startedTopics.filter(t => t !== topicName);
  }
  
  if (!student.topics.includes(topicName)) {
    student.topics.push(topicName);
    
    // Log activity
    state.activities.prepend({
      student: student.name,
      avatar:  student.avatar,
      color:   student.color,
      type:    'completed',
      topic:   topicName,
      time:    Date.now(),
      isTimestamp: true,
    });
  }
  
  saveData();
  renderStudentCourses();
  renderStudentDashboard();
}

function completeTask(taskId) {
  const student = getLoggedInStudent();
  if (!student) return;
  if (!student.completedTaskIds) student.completedTaskIds = [];
  
  if (!student.completedTaskIds.includes(taskId)) {
    const task = state.curriculumTasks.findById(taskId);
    student.completedTaskIds.push(taskId);
    
    state.activities.prepend({
      student: student.name,
      avatar:  student.avatar,
      color:   student.color,
      type:    'completed',
      topic:   task ? task.description : 'Task',
      time:    Date.now(),
      isTimestamp: true,
    });

    saveData();
    renderStudentTasks();
    renderStudentDashboard(); // Re-render to update metrics
  }
}

let studentCalendarDate = new Date();

function renderStudentHeatmap() {
  const student = getLoggedInStudent();
  if (!student) return;
  
  const year = studentCalendarDate.getFullYear();
  const month = studentCalendarDate.getMonth();
  
  // Update calendar month header
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('student-calendar-month').textContent = `${monthNames[month]} ${year}`;
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Count logins for each day (student's own logins only)
  const dailyLoginCounts = {};
  if (student.loginHistory) {
    student.loginHistory.forEach(timestamp => {
      const loginDate = new Date(timestamp);
      if (loginDate.getFullYear() === year && loginDate.getMonth() === month) {
        const day = loginDate.getDate();
        dailyLoginCounts[day] = (dailyLoginCounts[day] || 0) + 1;
      }
    });
  }
  
  let html = '';
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="heat-cell empty"></div>';
  }
  
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const count = dailyLoginCounts[day] || 0;
    let v = 0;
    if (count >= 11) v = 4;
    else if (count >= 6) v = 3;
    else if (count >= 3) v = 2;
    else if (count >= 1) v = 1;
    else v = 0;
    html += `<div class="heat-cell heat-${v}" title="${day} ${monthNames[month]}: ${count} logins">${day}</div>`;
  }
  
  document.getElementById('student-heatmap').innerHTML = html;
}

function prevStudentMonth() {
  studentCalendarDate.setMonth(studentCalendarDate.getMonth() - 1);
  renderStudentHeatmap();
}

function nextStudentMonth() {
  studentCalendarDate.setMonth(studentCalendarDate.getMonth() + 1);
  renderStudentHeatmap();
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
function init() {
  updateRoleButtons();
  renderAdminViews();
}

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */
function topicCompletion(topicName) {
  const total  = state.students.size;
  if (!total) return 0;
  let count = 0;
  state.students.forEach(s => { if (s.topics.includes(topicName)) count++; });
  return Math.round((count / total) * 100);
}

function getStudentProgress(student) {
  const total = state.topics.size;
  const validTopics = (student.topics || []).filter(topicName => 
    state.topics.some(t => t.name === topicName)
  );
  const count = validTopics.length;
  const pct = total > 0 ? Math.min(100, Math.round((count / total) * 100)) : 0;

  // Calculate score derived from valid curriculum
  let score = validTopics.length * 50; // 50 pts per completed topic
  
  (student.completedTaskIds || []).forEach(taskId => {
    const task = state.curriculumTasks.findById(taskId);
    if (task && state.topics.some(t => t.name === task.topic)) {
      score += 10;
    }
  });

  return { count, total, pct, validTopics, score };
}

function avatarEl(s, size = 32) {
  const fs = size <= 28 ? 10 : 12;
  return `<div class="avatar" style="width:${size}px;height:${size}px;font-size:${fs}px;background:${AVATAR_COLORS[s.color]};color:${AVATAR_BG[s.color]};">${s.avatar}</div>`;
}

function formatActivityTime(timeValue, isTimestamp) {
  let minutesAgo;
  if (isTimestamp) {
    minutesAgo = Math.round((Date.now() - timeValue) / (1000 * 60));
  } else {
    minutesAgo = timeValue; // Already in minutes
  }

  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  } else {
    return `${Math.round(minutesAgo / 60)}h ago`;
  }
}
/* ═══════════════════════════════════════════════════
   GENERATE ACTIVITIES (stored in linked list)
═══════════════════════════════════════════════════ */
function generateActivities() {
  const types = ['solved','solved','solved','completed','started'];
  const topicsArr = state.topics.toArray();
  state.students.forEach(s => {
    const count = Math.floor(Math.random() * 5 + 2);
    for (let i = 0; i < count; i++) {
      state.activities.append({
        student: s.name,
        avatar:  s.avatar,
        color:   s.color,
        type:    types[Math.floor(Math.random() * types.length)],
        topic:   topicsArr[Math.floor(Math.random() * topicsArr.length)].name,
        isTimestamp: false,
        time:    Math.floor(Math.random() * 1440),
      });
    }
  });
}

/* ═══════════════════════════════════════════════════
   HEATMAP
═══════════════════════════════════════════════════ */
function renderHeatmap() {
  const year = state.calendarDate.getFullYear();
  const month = state.calendarDate.getMonth();
  
  // Update calendar month header
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('calendar-month').textContent = `${monthNames[month]} ${year}`;
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Count logins for each day
  const dailyLoginCounts = {};
  state.students.forEach(student => {
    if (student.loginHistory) {
      student.loginHistory.forEach(timestamp => {
        const loginDate = new Date(timestamp);
        if (loginDate.getFullYear() === year && loginDate.getMonth() === month) {
          const day = loginDate.getDate();
          dailyLoginCounts[day] = (dailyLoginCounts[day] || 0) + 1;
        }
      });
    }
  });
  
  let html = '';
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="heat-cell empty"></div>';
  }
  
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const count = dailyLoginCounts[day] || 0;
    let v = 0;
    if (count >= 11) v = 4;
    else if (count >= 6) v = 3;
    else if (count >= 3) v = 2;
    else if (count >= 1) v = 1;
    else v = 0;
    html += `<div class="heat-cell heat-${v}" title="${day} ${monthNames[month]}: ${count} logins">${day}</div>`;
  }
  
  document.getElementById('heatmap').innerHTML = html;
}

function prevMonth() {
  state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
  renderHeatmap();
}

function nextMonth() {
  state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
  renderHeatmap();
}

/* ═══════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════ */
function renderDashboard() {
  const students = state.students;
  document.getElementById('m-students').textContent = students.size;
  document.getElementById('m-topics').textContent   = state.topics.size;

  const totalComp = students.reduce((acc, s) => {
    return acc + getStudentProgress(s).pct;
  }, 0);
  const avgComp = students.size ? Math.round(totalComp / students.size) : 0;
  document.getElementById('m-completion').textContent = avgComp + '%';

  const atRisk = students.filter(s => {
    const p = getStudentProgress(s);
    return s.streak === 0 || p.count < 4;
  });
  document.getElementById('m-risk').textContent = atRisk.size;

  // Topic coverage list
  const filter = state.topicFilter;
  const topicsArr = state.topics.toArray().filter(t =>
    filter === 'all' || t.cat.includes(filter)
  ).slice(0, 8);

  document.getElementById('topic-list').innerHTML = topicsArr.map(t => {
    const pct = topicCompletion(t.name);
    return `<div class="topic-row">
      <span class="topic-name">${t.name}</span>
      <span class="topic-cat">${t.cat}</span>
      <div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:${DIFF_COLOR[t.diff]};"></div></div>
      <span class="prog-pct" style="color:${DIFF_COLOR[t.diff]}">${pct}%</span>
    </div>`;
  }).join('');

  // Leaderboard — top 6 by score using sorted linked list traversal
  const top6 = students.toArray()
    .map(s => ({ ...s, derivedScore: getStudentProgress(s).score }))
    .sort((a, b) => b.derivedScore - a.derivedScore)
    .slice(0, 6);

  document.getElementById('student-list').innerHTML = top6.map(s =>
    `<div class="student-row" onclick="viewStudent(${s.id})">
      ${avatarEl(s)}
      <span class="student-name">${s.name}</span>
      <div style="display:flex;gap:8px;align-items:center;font-size:12px;">
        <span class="student-score">${s.derivedScore}</span>
        <span style="color:var(--orange);">${s.streak}🔥</span>
      </div>
      <div class="status-dot ${DOT_CLASS[s.status]}"></div>
    </div>`
  ).join('');
}

/* ═══════════════════════════════════════════════════
   STUDENTS TABLE
═══════════════════════════════════════════════════ */
function renderStudents() {
  const q = state.searchQuery.toLowerCase();
  const filtered = q
    ? state.students.filter(s => s.name.toLowerCase().includes(q)).toArray()
    : state.students.toArray();

  document.getElementById('students-tbody').innerHTML = filtered.map(s => {
    const { count, total, pct, score } = getStudentProgress(s);
    const bars = Array.from({ length: 10 }, (_, i) => {
      const filled = i < Math.round(pct / 10);
      return `<div class="mini-block" style="background:${filled ? 'var(--accent)' : 'var(--bg4)'}"></div>`;
    }).join('');
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:10px;">${avatarEl(s)}<span>${s.name}</span></div></td>
      <td style="font-family:var(--mono);">${count} / ${total}</td>
      <td style="font-family:var(--mono);font-weight:600;color:var(--accent);">${score}</td>
      <td>${s.streak} 🔥</td>
      <td><span class="status-badge ${STATUS_CLASS[s.status]}">${s.status === 'active' ? 'Online' : 'Offline'}</span></td>
      <td><div style="display:flex;align-items:center;gap:8px;"><div class="mini-bar">${bars}</div><span style="font-size:11px;font-family:var(--mono);">${pct}%</span></div></td>
      <td>
        <button class="btn-sm" onclick="editStudent(${s.id})">Edit</button>
        <button class="btn-sm danger" onclick="deleteStudent(${s.id})" style="margin-left:4px;">Remove</button>
      </td>
    </tr>`;
  }).join('');
}

function renderAdminTasks() {
  document.getElementById('admin-tasks-tbody').innerHTML = state.curriculumTasks.toArray().map(tk => `
    <tr>
      <td style="font-weight:600;">${tk.description}</td>
      <td style="color:var(--text2);">${tk.topic}</td>
      <td>
        <button class="btn-sm danger" onclick="deleteCurriculumTask(${tk.id})">Remove</button>
      </td>
    </tr>
  `).join('');
}

/* ═══════════════════════════════════════════════════
   TOPICS TABLE
═══════════════════════════════════════════════════ */
function renderTopics() {
  document.getElementById('topics-tbody').innerHTML = state.topics.toArray().map(t => {
    const pct = topicCompletion(t.name);
    let doneCount = 0;
    let startedCount = 0;
    // Calculate counts for both started and completed statuses
    state.students.forEach(s => { 
      if (s.topics.includes(t.name)) doneCount++; 
      else if (s.startedTopics && s.startedTopics.includes(t.name)) startedCount++;
    });
    return `<tr>
      <td style="font-weight:600;">${t.name}</td>
      <td style="color:var(--text2);">${t.cat}</td>
      <td><span class="badge ${DIFF_CLASS[t.diff]}">${t.diff}</span></td>
      <td style="font-family:var(--mono);">${t.problems}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="prog-bar" style="width:80px;"><div class="prog-fill" style="width:${pct}%;background:var(--accent);"></div></div>
          <span style="font-size:12px;font-family:var(--mono);">${pct}%</span>
        </div>
      </td>
      <td>
        <div style="font-size:11px; line-height:1.4;">
          <div style="color:var(--green)">Done: ${doneCount}</div>
          <div style="color:var(--orange)">Started: ${startedCount}</div>
        </div>
      </td>
      <td>
        <button class="btn-sm danger" onclick="deleteTopic(${t.id})">Remove</button>
      </td>
    </tr>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════
   ACTIVITY LOG
═══════════════════════════════════════════════════ */
function renderActivity() {
  const TYPE_COLOR = { solved:'var(--accent)', completed:'var(--green)', started:'var(--orange)' };
  const filter = state.activityFilter;

  const items = (filter === 'all'
    ? state.activities.toArray()
    : state.activities.filter(a => a.type === filter).toArray()).slice(0, 30);

  document.getElementById('activity-log').innerHTML = items.map(a => {
    const displayTime = formatActivityTime(a.time, a.isTimestamp);
    return `<div class="activity-item">
      ${avatarEl(a)}
      <div class="activity-info">
        <strong>${a.student}</strong>
        <span style="color:var(--text2);"> ${a.type} a problem in </span>
        <strong>${a.topic}</strong>
      </div>
      <span class="activity-type" style="background:${TYPE_COLOR[a.type]}18;color:${TYPE_COLOR[a.type]};">${a.type}</span>
      <span class="activity-time">${displayTime}</span>
    </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════
   ALERTS
═══════════════════════════════════════════════════ */
function renderAlerts() {
  const atRisk = state.students.filter(s => { const p = getStudentProgress(s); return s.streak === 0 || p.count < 4; }).toArray();
  const topPerf = state.students.filter(s => getStudentProgress(s).score > 850).toArray();

  document.getElementById('alerts-risk').innerHTML = atRisk.length
    ? atRisk.map(s => `<div class="alert-row">
        ${avatarEl(s, 30)}
        <div>
          <div class="alert-title">${s.name}</div>
          <div class="alert-sub">${s.streak === 0 ? 'No activity streak. ' : ''}${getStudentProgress(s).count < 4 ? `Only ${getStudentProgress(s).count} topics completed.` : ''}</div>
        </div>
      </div>`).join('')
    : '<p style="color:var(--text3);font-size:13px;">No at-risk students 🎉</p>';

  document.getElementById('alerts-top').innerHTML = topPerf.length
    ? topPerf.map(s => `<div class="alert-row">
        ${avatarEl(s, 30)}
        <div>
          <div class="alert-title">${s.name}</div>
          <div class="alert-sub">Score: ${getStudentProgress(s).score} · ${getStudentProgress(s).count} topics · ${s.streak}d streak</div>
        </div>
      </div>`).join('')
    : '<p style="color:var(--text3);font-size:13px;">No top performers yet.</p>';
}

function renderPasswords() {
  const passwordsHtml = state.students.toArray().map(s => {
    const userEntry = user.findByStudentId(s.id);
    const username = userEntry ? userEntry.username : 'N/A';
    const password = userEntry ? userEntry.password : 'N/A';
    return `<tr>
      <td>${s.name}</td>
      <td style="font-family:var(--mono);">${username}</td>
      <td style="font-family:var(--mono);">${password}</td>
    </tr>`;
  }).join('');
  document.getElementById('passwords-tbody').innerHTML = passwordsHtml;
}

/* ═══════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════ */
function navigate(page, el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  const titles = { dashboard:'Dashboard', students:'Students', topics:'DSA Topics', activity:'Activity Log', alerts:'Alerts', passwords:'Student Passwords' };
  document.getElementById('page-title').textContent = titles[page];

  const addBtn = document.getElementById('add-btn');
  const searchWrap = document.getElementById('search-wrap');

  if (page === 'students') {
    addBtn.textContent = '+ Add Student'; addBtn.onclick = openAddModal;
    searchWrap.style.display = 'block';
    renderStudents();
  } else if (page === 'topics') {
    addBtn.textContent = '+ Add Topic'; addBtn.onclick = openAddTopicModal;
    searchWrap.style.display = 'none';
    renderTopics();
  } else if (page === 'admin-tasks') {
    addBtn.textContent = '+ Add Task'; addBtn.onclick = openAddTaskModal;
    searchWrap.style.display = 'none';
    renderAdminTasks();
  } else if (page === 'passwords') {
    addBtn.textContent = ''; addBtn.onclick = null;
    searchWrap.style.display = 'none';
    renderPasswords();
  } else {
    addBtn.textContent = ''; addBtn.onclick = null;
    searchWrap.style.display = 'none';
  }
}

/* ═══════════════════════════════════════════════════
   FILTERS
═══════════════════════════════════════════════════ */
function filterTopics(v, btn) {
  state.topicFilter = v;
  document.querySelectorAll('#page-dashboard .tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderDashboard();
}

function filterActivity(v, btn) {
  state.activityFilter = v;
  document.querySelectorAll('#page-activity .tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderActivity();
}

function handleSearch(q) { state.searchQuery = q; renderStudents(); }

/* ═══════════════════════════════════════════════════
   STUDENT NAVIGATION
═══════════════════════════════════════════════════ */
function navigateStudent(page, el) {
  document.querySelectorAll('#student-app .nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('#student-app .page').forEach(p => p.classList.remove('active'));
  document.getElementById('student-page-' + page).classList.add('active');

  const titles = { dashboard:'Dashboard', courses:'Courses', tasks:'Tasks', activity:'Activity Log' };
  document.getElementById('student-topbar-title').textContent = titles[page];

  if (page === 'dashboard') {
    renderStudentDashboard();
  } else if (page === 'courses') {
    renderStudentCourses();
  } else if (page === 'tasks') {
    renderStudentTasks();
  } else if (page === 'activity') {
    renderStudentFullActivity();
  }
}

function renderStudentFullActivity() {
  const student = getLoggedInStudent();
  if (!student) return;
  const studentActivities = state.activities.toArray().filter(a => a.student === student.name);
  document.getElementById('student-full-activity').innerHTML = studentActivities.length
    ? studentActivities.map(a => {
        const displayTime = formatActivityTime(a.time, a.isTimestamp);
        return `<div class="activity-item">
          ${avatarEl(a, 28)}
          <div class="activity-info"><strong>${a.type}</strong> <span style="color:var(--text2);">on</span> <strong>${a.topic}</strong></div>
          <span class="activity-time">${displayTime}</span>
        </div>`;
      }).join('')
    : '<p style="color:var(--text3);font-size:13px;">No activity yet.</p>';
}

/* ═══════════════════════════════════════════════════
   MODALS
═══════════════════════════════════════════════════ */
function openAddModal() {
  state.modalMode = 'add-student';
  document.getElementById('modal-title').textContent = 'Add Student';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><label class="form-label">Full Name</label><input class="form-input" id="f-name" placeholder="e.g. Ananya Kumar"></div>
    <div class="form-row"><label class="form-label">Student Password</label><input class="form-input" id="f-password" type="password" placeholder="Set login password"></div>
    <div class="form-row"><label class="form-label">Status</label> 
      <select class="form-input" id="f-status">
        <option value="active">Online</option>
        <option value="offline">Offline</option>
      </select>
    </div>`;
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('f-name').focus();
}

function openAddTopicModal() {
  state.modalMode = 'add-topic';
  document.getElementById('modal-title').textContent = 'Add Topic';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><label class="form-label">Topic Name</label><input class="form-input" id="f-tname" placeholder="e.g. Segment Trees"></div>
    <div class="form-row"><label class="form-label">Category</label><input class="form-input" id="f-tcat" placeholder="e.g. Advanced DS"></div>
    <div class="form-row"><label class="form-label">Difficulty</label>
      <select class="form-input" id="f-tdiff">
        <option>easy</option><option>medium</option><option>hard</option>
      </select>
    </div>
    <div class="form-row"><label class="form-label">Number of Problems</label><input class="form-input" id="f-tprob" type="number" value="10" min="1"></div>`;
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('f-tname').focus();
}

function openAddTaskModal() {
  state.modalMode = 'add-task';
  const topicOptions = state.topics.toArray().map(t => `<option>${t.name}</option>`).join('');
  document.getElementById('modal-title').textContent = 'Add Global Task';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><label class="form-label">Task Description</label><input class="form-input" id="f-tkdesc" placeholder="e.g. Implement a Binary Search"></div>
    <div class="form-row"><label class="form-label">Related Topic</label>
      <select class="form-input" id="f-tktopic">
        ${topicOptions}
      </select>
    </div>
  `;
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('f-tkdesc').focus();
}

function editStudent(id) {
  const s = state.students.findById(id);
  if (!s) return;
  state.modalMode = 'edit-student';
  state.modalData = { id };
  document.getElementById('modal-title').textContent = 'Edit Student';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><label class="form-label">Full Name</label><input class="form-input" id="f-name" value="${s.name}"></div>
    <div class="form-row"><label class="form-label">Password (leave blank to keep current)</label><input class="form-input" id="f-password" type="password" placeholder="Enter new password or leave blank"></div>
    <div class="form-row"><label class="form-label">Score (Auto-calculated)</label><input class="form-input" id="f-score" type="number" value="${getStudentProgress(s).score}" disabled style="opacity:0.6"></div>
    <div class="form-row"><label class="form-label">Streak (days)</label><input class="form-input" id="f-streak" type="number" value="${s.streak}" min="0"></div>
    <div class="form-row"><label class="form-label">Status</label>
      <select class="form-input" id="f-status">
        <option value="active" ${s.status==='active'?'selected':''}>Online</option> 
        <option value="offline" ${s.status==='offline'?'selected':''}>Offline</option>
      </select>
    </div>`;
  document.getElementById('modal').style.display = 'flex';
}

function deleteTopic(id) {
  if (!confirm('Are you sure you want to remove this topic? It will be removed from all student dashboards.')) return;
  
  const topicToRemove = state.topics.findById(id);
  if (!topicToRemove) return;
  const topicName = topicToRemove.name;

  // Remove tasks associated with this topic globally
  const tasksToRemove = state.curriculumTasks.toArray().filter(tk => tk.topic === topicName);
  tasksToRemove.forEach(tk => state.curriculumTasks.removeById(tk.id));

  state.students.forEach(student => {
    // Remove the topic from the student's completed topics
    student.topics = student.topics.filter(t => t !== topicName);

    // Remove the topic from the student's started topics
    if (student.startedTopics) {
      student.startedTopics = student.startedTopics.filter(t => t !== topicName);
    }

    // Filter completed tasks to remove IDs that are no longer in the curriculum
    student.completedTaskIds = (student.completedTaskIds || []).filter(id => 
      state.curriculumTasks.findById(id)
    );
  });
  state.topics.removeById(id);
  saveData();
  renderTopics();
  renderDashboard();
  renderStudents(); // Re-render students to update their progress bars
  renderAlerts(); // Alerts might change if topic count changes
}

function deleteCurriculumTask(id) {
  if (!confirm('Remove this task from the curriculum?')) return;
  state.curriculumTasks.removeById(id);
  
  // Clean up student completion lists
  state.students.forEach(s => {
    s.completedTaskIds = (s.completedTaskIds || []).filter(tid => tid !== id);
  });

  saveData();
  renderAdminTasks();
  renderDashboard();
}

function deleteStudent(id) {
  if (!confirm('Remove this student from the roster?')) return;
  state.students.removeById(id);
  saveData();
  renderStudents();
  renderDashboard();
  renderAlerts();
}

function saveModal() {
  if (state.modalMode === 'add-student') {
    const name = document.getElementById('f-name').value.trim();
    const password = document.getElementById('f-password').value.trim();
    
    // Validation
    if (!name) { 
      alert('Student name is required.');
      document.getElementById('f-name').focus(); 
      return; 
    }
    if (!password) {
      alert('Student password is required.');
      document.getElementById('f-password').focus();
      return;
    }
    if (password.length < 6) {
      alert('Student password must be at least 6 characters.');
      document.getElementById('f-password').focus();
      return;
    }
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const studentId = Date.now();
    const baseUsername = normalizeStudentUsername(name);
    let username = baseUsername;
    let suffix = 1;
    while (user.findByUsername(username)) {
      username = `${baseUsername}${suffix}`;
      suffix += 1;
    }
    state.students.append({
      id: studentId,
      name,
      username,
      password,
      avatar: initials,
      color: Math.floor(Math.random() * AVATAR_COLORS.length),
      streak: 0,
      status: document.getElementById('f-status').value,
      topics: [],
      completedTaskIds: [],
      loginHistory: []
    });
    user.addUser(username, password, 'student', studentId);
    saveUsers();
  } else if (state.modalMode === 'edit-student') {
    const s = state.students.findById(state.modalData.id);
    if (!s) return;
    const name = document.getElementById('f-name').value.trim();
    const password = document.getElementById('f-password').value.trim();
    const streak = parseInt(document.getElementById('f-streak').value) || 0;
    
    if (!name) {
      alert('Student name is required.');
      return;
    }
    if (streak < 0) {
      alert('Streak cannot be negative.');
      return;
    }
    
    s.name   = name;
    s.avatar = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    if (password) {
      if (password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
      s.password = password;
      const userEntry = user.findByStudentId(s.id);
      if (userEntry) userEntry.password = password;
      saveUsers();
    }
    s.streak = streak;
    s.status = document.getElementById('f-status').value;
  } else if (state.modalMode === 'add-topic') {
    const name = document.getElementById('f-tname').value.trim();
    if (!name) { 
      alert('Topic name is required.');
      document.getElementById('f-tname').focus(); 
      return; 
    }
    // Check for duplicate topic names
    const isDuplicate = state.topics.some(t => t.name.toLowerCase() === name.toLowerCase());
    if (isDuplicate) {
      alert('A topic with this name already exists.');
      document.getElementById('f-tname').focus();
      return;
    }
    const cat = document.getElementById('f-tcat').value.trim() || 'General';
    const problems = parseInt(document.getElementById('f-tprob').value) || 10;
    if (problems < 1) {
      alert('Number of problems must be at least 1.');
      document.getElementById('f-tprob').focus();
      return;
    }
    state.topics.append({
      id: Date.now(), name,
      cat: cat,
      diff: document.getElementById('f-tdiff').value,
      problems: problems,
    });
    renderTopics();
  } else if (state.modalMode === 'add-task') {
    const desc = document.getElementById('f-tkdesc').value.trim();
    const topic = document.getElementById('f-tktopic').value;
    if (!desc) {
      alert('Task description is required.');
      return;
    }
    state.curriculumTasks.append({
      id: Date.now(),
      description: desc,
      topic: topic
    });
    renderAdminTasks();
  }
  saveData();
  closeModal();
  renderStudents();
  renderDashboard();
  renderAlerts();
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal'))
    document.getElementById('modal').style.display = 'none';
}

function viewStudent(id) {
  navigate('students', document.querySelectorAll('.nav-item')[1]);
  setTimeout(() => editStudent(id), 80);
}

/* ── Boot ── */
window.onload = () => {
  updateRoleButtons();
  updateAuthText();
  checkAuth();
};