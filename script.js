let completed = 0;
let total = 0;

function addActivity() {
  const name = document.getElementById("activityName").value.trim();
  const desc = document.getElementById("activityDesc").value.trim();
  const type = document.getElementById("activityType").value;

  if (!name || !desc) {
    alert("Please fill out both fields.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${name}</strong> (${type})<br>
    <small>${desc}</small><br>
    <span style="color: green;">✔ Completed</span>
    <button onclick="deleteCompleted(this)" style="margin-left: 10px; background: none; border: none; cursor: pointer; color: red;">🗑️</button>
  `;

  document.getElementById("completedList").appendChild(li);
  completed++;
  total++;
  updateProgress();

  document.getElementById("activityName").value = "";
  document.getElementById("activityDesc").value = "";
}

function markDone(button) {
  const li = button.parentElement;
  li.removeChild(button);
  li.innerHTML += " ✅ Completed";
  document.getElementById('completedList').appendChild(li);
  completed++;
  updateProgress();

  // Remove from pending list
  if (document.getElementById('pendingList').children.length === 0) {
    document.getElementById('pendingList').innerHTML = "<li>No pending activities. Great job!</li>";
  }
}

function updateProgress() {
  const text = `${completed} of ${total} activities completed`;
  const percent = total === 0 ? 0 : (completed / total) * 100;

  document.getElementById('progressText').textContent = text;
  document.getElementById('progressFill').style.width = percent + "%";
}
// Daily Time Bar Animation
function updateTimeBar() {
  const now = new Date();
  const secondsPassedToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const totalSeconds = 24 * 3600;
  const percentage = (secondsPassedToday / totalSeconds) * 100;
  document.getElementById("timeFill").style.width = percentage + "%";
}

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-GB'); // 24-hr format
  document.getElementById('clock').textContent = `Time: ${timeString}`;

  // Clear activities at midnight
  if (timeString === "00:00:00") {
    document.getElementById('pendingList').innerHTML = "<li>No pending activities. Great job!</li>";
    document.getElementById('completedList').innerHTML = "";
    completed = 0;
    total = 0;
    updateProgress();
  }
}

setInterval(updateClock, 1000); // Update every second

function deleteCompleted(btn) {
  const li = btn.parentElement;
  li.remove();
  completed--;
  total--;
  updateProgress();
}