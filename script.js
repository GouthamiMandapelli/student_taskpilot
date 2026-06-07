/* ==========================================
   STUDENT TASKPILOT
   SCRIPT.JS - PART 1
   Initialization + UI Core
========================================== */

/* ==========================================
   DOM ELEMENTS
========================================== */

const welcomeScreen = document.getElementById("welcome-screen");
const appContainer = document.getElementById("app-container");
const getStartedBtn = document.getElementById("getStartedBtn");

const bottomNav = document.getElementById("bottomNav");
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

const greetingEl = document.getElementById("greeting");
const currentDateEl = document.getElementById("currentDate");

const themeToggle = document.getElementById("themeToggle");

const quoteEl = document.getElementById("dailyQuote");
const toast = document.getElementById("toast");

/* ==========================================
   LOCAL STORAGE HELPERS
========================================== */

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue) {
    const data = localStorage.getItem(key);

    if (!data) {
        return defaultValue;
    }

    try {
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

/* ==========================================
   TOAST NOTIFICATIONS
========================================== */

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* ==========================================
   WELCOME SCREEN
========================================== */

function launchApp() {

    welcomeScreen.classList.add("hidden");

    appContainer.classList.remove("hidden");

    bottomNav.classList.remove("hidden");

    localStorage.setItem("studentTaskPilotStarted", "true");

    showToast("Welcome to Student TaskPilot 🚀");
}

getStartedBtn?.addEventListener("click", launchApp);

function restoreAppState() {

    const started =
        localStorage.getItem("studentTaskPilotStarted");

    if (started === "true") {

        welcomeScreen.classList.add("hidden");

        appContainer.classList.remove("hidden");

        bottomNav.classList.remove("hidden");
    }
}

/* ==========================================
   GREETING SYSTEM
========================================== */

function updateGreeting() {

    const hour = new Date().getHours();

    let greeting = "Hello";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning ☀️";
    }
    else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon 🌤️";
    }
    else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening 🌙";
    }
    else {
        greeting = "Good Night 🌌";
    }

    greetingEl.textContent = greeting;
}

/* ==========================================
   CURRENT DATE
========================================== */

function updateCurrentDate() {

    const today = new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    currentDateEl.textContent = formattedDate;
}

/* ==========================================
   DAILY QUOTES
========================================== */

const quotes = [

    "Success is the sum of small efforts repeated daily.",

    "Discipline beats motivation when motivation fades.",

    "Every expert was once a beginner.",

    "Stay focused. Stay consistent.",

    "One task at a time, one goal at a time.",

    "Learning never exhausts the mind.",

    "Progress is better than perfection.",

    "Dream big. Start small. Act now.",

    "Your future is created by what you do today.",

    "The best investment is in yourself."
];

function loadDailyQuote() {

    const today = new Date().getDate();

    const quoteIndex = today % quotes.length;

    quoteEl.textContent = quotes[quoteIndex];
}

/* ==========================================
   DARK MODE
========================================== */

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

        themeToggle.innerHTML =
            `<i class="fa-solid fa-sun"></i>`;
    }
    else {

        document.body.classList.remove("dark");

        themeToggle.innerHTML =
            `<i class="fa-solid fa-moon"></i>`;
    }
}

function initializeTheme() {

    const savedTheme =
        localStorage.getItem("theme") || "light";

    applyTheme(savedTheme);
}

themeToggle?.addEventListener("click", () => {

    const isDark =
        document.body.classList.contains("dark");

    const newTheme =
        isDark ? "light" : "dark";

    localStorage.setItem("theme", newTheme);

    applyTheme(newTheme);

    showToast(
        newTheme === "dark"
            ? "Dark Mode Enabled 🌙"
            : "Light Mode Enabled ☀️"
    );
});

/* ==========================================
   BOTTOM NAVIGATION
========================================== */

function openSection(sectionId) {

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    navButtons.forEach(btn => {
        btn.classList.remove("active");
    });

    const target =
        document.getElementById(sectionId);

    if (target) {
        target.classList.add("active-section");
    }

    const activeButton =
        document.querySelector(
            `[data-target="${sectionId}"]`
        );

    if (activeButton) {
        activeButton.classList.add("active");
    }
}

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target =
            button.dataset.target;

        openSection(target);
    });
});

/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "1") {
        openSection("home-section");
    }

    if (e.key === "2") {
        openSection("tasks-section");
    }

    if (e.key === "3") {
        openSection("goals-section");
    }

    if (e.key === "4") {
        openSection("focus-section");
    }

    if (e.key === "5") {
        openSection("notes-section");
    }
});

/* ==========================================
   PLACEHOLDER FUNCTIONS
   (Implemented in Parts 2 & 3)
========================================== */

function updateDashboard() {}

function updateAchievements() {}

function loadTasks() {}

function loadGoals() {}

function initializePomodoro() {}

function initializeNotes() {}

/* ==========================================
   INITIALIZATION
========================================== */

function initializeApp() {

    restoreAppState();

    updateGreeting();

    updateCurrentDate();

    loadDailyQuote();

    initializeTheme();

    openSection("home-section");

    loadTasks();

    loadGoals();

    initializePomodoro();

    initializeNotes();

    updateDashboard();

    updateAchievements();
}

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
/* ==========================================
   SCRIPT.JS - PART 2
   TASKS + DASHBOARD + ACHIEVEMENTS
========================================== */

/* ==========================================
   TASK ELEMENTS
========================================== */

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskSearch = document.getElementById("taskSearch");

/* ==========================================
   DASHBOARD ELEMENTS
========================================== */

const productivityScoreEl =
    document.getElementById("productivityScore");

const totalTasksEl =
    document.getElementById("totalTasks");

const completedTasksEl =
    document.getElementById("completedTasks");

const studyStreakEl =
    document.getElementById("studyStreak");

const ringProgress =
    document.getElementById("ringProgress");

const ringText =
    document.getElementById("ringText");

/* ==========================================
   ACHIEVEMENTS
========================================== */

const achievementContainer =
    document.getElementById("achievementContainer");

/* ==========================================
   TASK STORAGE
========================================== */

let tasks =
    getFromStorage("studentTasks", []);

/* ==========================================
   ADD TASK
========================================== */

function addTask() {

    const text =
        taskInput.value.trim();

    const priority =
        prioritySelect.value;

    if (!text) {

        showToast("Enter a task first ✍️");
        return;
    }

    const task = {

        id: Date.now(),

        text,

        priority,

        completed: false,

        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();

    updateDashboard();

    updateAchievements();

    showToast("Task Added ✅");
}

/* ==========================================
   SAVE TASKS
========================================== */

function saveTasks() {

    saveToStorage(
        "studentTasks",
        tasks
    );
}

/* ==========================================
   DELETE TASK
========================================== */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );

    saveTasks();

    renderTasks();

    updateDashboard();

    updateAchievements();

    showToast("Task Deleted 🗑️");
}

/* ==========================================
   TOGGLE COMPLETE
========================================== */

function toggleTask(id) {

    tasks =
        tasks.map(task => {

            if (task.id === id) {

                task.completed =
                    !task.completed;
            }

            return task;
        });

    saveTasks();

    renderTasks();

    updateDashboard();

    updateAchievements();
}

/* ==========================================
   RENDER TASKS
========================================== */

function renderTasks(filteredTasks = tasks) {

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
        <li class="task-item">
            No tasks available.
        </li>
        `;

        return;
    }

    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");

        li.className =
            "task-item";

        li.innerHTML = `

        <div class="task-left">

            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
            >

            <div class="task-content">

                <span class="
                    task-text
                    ${task.completed
                        ? "task-completed"
                        : ""}
                ">
                    ${task.text}
                </span>

                <span class="
                    priority
                    ${task.priority.toLowerCase()}
                ">
                    ${task.priority}
                </span>

            </div>

        </div>

        <div class="task-actions">

            <button
                class="delete-btn">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>
        `;

        const checkbox =
            li.querySelector(
                ".task-checkbox"
            );

        checkbox.addEventListener(
            "change",
            () => toggleTask(task.id)
        );

        const deleteBtn =
            li.querySelector(
                ".delete-btn"
            );

        deleteBtn.addEventListener(
            "click",
            () => deleteTask(task.id)
        );

        taskList.appendChild(li);
    });
}

/* ==========================================
   SEARCH TASKS
========================================== */

taskSearch?.addEventListener(
    "input",
    e => {

        const query =
            e.target.value
                .toLowerCase()
                .trim();

        const filtered =
            tasks.filter(task =>
                task.text
                    .toLowerCase()
                    .includes(query)
            );

        renderTasks(filtered);
    }
);

/* ==========================================
   PRODUCTIVITY SCORE
========================================== */

function calculateProductivityScore() {

    if (tasks.length === 0) {
        return 0;
    }

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    return Math.round(
        (completed / tasks.length) * 100
    );
}

/* ==========================================
   PROGRESS RING
========================================== */

function updateProgressRing(score) {

    const radius = 75;

    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (score / 100) *
        circumference;

    ringProgress.style.strokeDashoffset =
        offset;

    ringText.textContent =
        `${score}%`;
}

/* ==========================================
   STUDY STREAK
========================================== */

function updateStudyStreak() {

    const today =
        new Date()
        .toDateString();

    const lastVisit =
        localStorage.getItem(
            "lastVisit"
        );

    let streak =
        Number(
            localStorage.getItem(
                "studyStreak"
            )
        ) || 0;

    if (!lastVisit) {

        streak = 1;
    }
    else {

        const yesterday =
            new Date();

        yesterday.setDate(
            yesterday.getDate() - 1
        );

        const yesterdayString =
            yesterday.toDateString();

        if (lastVisit === today) {

            // keep streak
        }
        else if (
            lastVisit === yesterdayString
        ) {

            streak++;
        }
        else {

            streak = 1;
        }
    }

    localStorage.setItem(
        "studyStreak",
        streak
    );

    localStorage.setItem(
        "lastVisit",
        today
    );

    studyStreakEl.textContent =
        streak;
}

/* ==========================================
   DASHBOARD UPDATE
========================================== */

function updateDashboard() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const score =
        calculateProductivityScore();

    productivityScoreEl.textContent =
        `${score}%`;

    totalTasksEl.textContent =
        total;

    completedTasksEl.textContent =
        completed;

    updateProgressRing(score);

    updateStudyStreak();
}

/* ==========================================
   ACHIEVEMENTS
========================================== */

function updateAchievements() {

    achievementContainer.innerHTML = "";

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const streak =
        Number(
            localStorage.getItem(
                "studyStreak"
            )
        ) || 1;

    const badges = [];

    badges.push("🚀 Beginner");

    if (completed >= 5) {
        badges.push("✅ Task Master");
    }

    if (completed >= 10) {
        badges.push("🏆 Productivity Pro");
    }

    if (completed >= 25) {
        badges.push("🔥 Consistency Hero");
    }

    if (streak >= 3) {
        badges.push("📚 Study Streak");
    }

    if (streak >= 7) {
        badges.push("⚡ Focus Champion");
    }

    badges.forEach(badge => {

        const span =
            document.createElement("span");

        span.className = "badge";

        span.textContent = badge;

        achievementContainer
            .appendChild(span);
    });
}

/* ==========================================
   LOAD TASKS
========================================== */

function loadTasks() {

    tasks =
        getFromStorage(
            "studentTasks",
            []
        );

    renderTasks();

    updateDashboard();

    updateAchievements();
}

/* ==========================================
   EVENT LISTENERS
========================================== */

addTaskBtn?.addEventListener(
    "click",
    addTask
);

taskInput?.addEventListener(
    "keypress",
    e => {

        if (e.key === "Enter") {
            addTask();
        }
    }
);
/* ==========================================
   SCRIPT.JS - PART 3
   GOALS + POMODORO + NOTES
========================================== */

/* ==========================================
   GOAL TRACKER
========================================== */

const dailyGoalInput =
    document.getElementById("dailyGoal");

const weeklyGoalInput =
    document.getElementById("weeklyGoal");

const saveGoalsBtn =
    document.getElementById("saveGoalsBtn");

const dailyBar =
    document.getElementById("dailyBar");

const weeklyBar =
    document.getElementById("weeklyBar");

const dailyPercent =
    document.getElementById("dailyPercent");

const weeklyPercent =
    document.getElementById("weeklyPercent");

/* ==========================================
   GOAL STORAGE
========================================== */

let goals =
    getFromStorage(
        "studentGoals",
        {
            dailyGoal: 4,
            weeklyGoal: 25,
            dailyProgress: 0,
            weeklyProgress: 0
        }
    );

/* ==========================================
   SAVE GOALS
========================================== */

function saveGoals() {

    goals.dailyGoal =
        Number(dailyGoalInput.value) || 0;

    goals.weeklyGoal =
        Number(weeklyGoalInput.value) || 0;

    saveToStorage(
        "studentGoals",
        goals
    );

    updateGoalProgress();

    showToast(
        "Goals Saved 🎯"
    );
}

function loadGoals() {

    dailyGoalInput.value =
        goals.dailyGoal;

    weeklyGoalInput.value =
        goals.weeklyGoal;

    updateGoalProgress();
}

function updateGoalProgress() {

    const sessions =
        Number(
            localStorage.getItem(
                "pomodoroSessions"
            )
        ) || 0;

    goals.dailyProgress =
        Math.min(
            sessions,
            goals.dailyGoal
        );

    goals.weeklyProgress =
        Math.min(
            sessions,
            goals.weeklyGoal
        );

    const dailyValue =
        goals.dailyGoal === 0
        ? 0
        : Math.round(
            (goals.dailyProgress /
             goals.dailyGoal) * 100
        );

    const weeklyValue =
        goals.weeklyGoal === 0
        ? 0
        : Math.round(
            (goals.weeklyProgress /
             goals.weeklyGoal) * 100
        );

    dailyBar.style.width =
        `${dailyValue}%`;

    weeklyBar.style.width =
        `${weeklyValue}%`;

    dailyPercent.textContent =
        `${dailyValue}%`;

    weeklyPercent.textContent =
        `${weeklyValue}%`;
}

/* ==========================================
   GOAL EVENTS
========================================== */

saveGoalsBtn?.addEventListener(
    "click",
    saveGoals
);

/* ==========================================
   POMODORO TIMER
========================================== */

const timerDisplay =
    document.getElementById("timerDisplay");

const startTimerBtn =
    document.getElementById("startTimer");

const pauseTimerBtn =
    document.getElementById("pauseTimer");

const resetTimerBtn =
    document.getElementById("resetTimer");

const sessionCountEl =
    document.getElementById("sessionCount");

let timer;
let isRunning = false;

let timeLeft = 25 * 60;

let sessions =
    Number(
        localStorage.getItem(
            "pomodoroSessions"
        )
    ) || 0;

function updateTimerDisplay() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

function startPomodoro() {

    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

            clearInterval(timer);

            isRunning = false;

            sessions++;

            localStorage.setItem(
                "pomodoroSessions",
                sessions
            );

            sessionCountEl.textContent =
                sessions;

            updateGoalProgress();

            showToast(
                "Pomodoro Completed 🎉"
            );

            timeLeft = 25 * 60;

            updateTimerDisplay();
        }

    }, 1000);
}

function pausePomodoro() {

    clearInterval(timer);

    isRunning = false;

    showToast(
        "Timer Paused ⏸️"
    );
}

function resetPomodoro() {

    clearInterval(timer);

    isRunning = false;

    timeLeft = 25 * 60;

    updateTimerDisplay();

    showToast(
        "Timer Reset 🔄"
    );
}

function initializePomodoro() {

    sessionCountEl.textContent =
        sessions;

    updateTimerDisplay();
}

/* ==========================================
   TIMER EVENTS
========================================== */

startTimerBtn?.addEventListener(
    "click",
    startPomodoro
);

pauseTimerBtn?.addEventListener(
    "click",
    pausePomodoro
);

resetTimerBtn?.addEventListener(
    "click",
    resetPomodoro
);

/* ==========================================
   NOTES
========================================== */

const notesArea =
    document.getElementById("notesArea");

const exportNotesBtn =
    document.getElementById("exportNotes");

function initializeNotes() {

    notesArea.value =
        localStorage.getItem(
            "studentNotes"
        ) || "";
}

notesArea?.addEventListener(
    "input",
    () => {

        localStorage.setItem(
            "studentNotes",
            notesArea.value
        );
    }
);

/* ==========================================
   EXPORT NOTES
========================================== */

function exportNotes() {

    const content =
        notesArea.value.trim();

    if (!content) {

        showToast(
            "No Notes To Export"
        );

        return;
    }

    const blob =
        new Blob(
            [content],
            { type:"text/plain" }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "StudentTaskPilotNotes.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast(
        "Notes Exported 📄"
    );
}

exportNotesBtn?.addEventListener(
    "click",
    exportNotes
);

/* ==========================================
   BONUS: CONFETTI EFFECT
========================================== */

function celebrateAchievement() {

    const score =
        calculateProductivityScore();

    if (score === 100 && tasks.length > 0) {

        showToast(
            "🎉 All Tasks Completed!"
        );
    }
}

/* ==========================================
   ENHANCED DASHBOARD
========================================== */

const originalDashboardUpdate =
    updateDashboard;

updateDashboard = function() {

    originalDashboardUpdate();

    celebrateAchievement();
};

/* ==========================================
   APP READY
========================================== */

console.log(
    "Student TaskPilot Loaded Successfully 🚀"
);