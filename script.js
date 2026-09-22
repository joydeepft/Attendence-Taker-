document.addEventListener("DOMContentLoaded", function () {
  const sectionSelect = document.getElementById("section");
  const searchInput = document.getElementById("searchInput");
  const sendBtn = document.querySelector(".sendBtn");
  const subjectCheckboxes = document.querySelectorAll(".subject");
  const pageTitle = document.querySelector("h1");

  const sectionAList = document.querySelector(".sectionA");
  const sectionBList = document.querySelector(".sectionB");

  // -------- Create output box dynamically --------
  const outputBox = document.createElement("div");
  outputBox.className = "outputBox";
  outputBox.style.marginTop = "20px";
  outputBox.style.padding = "15px";
  outputBox.style.border = "1px solid #ddd";
  outputBox.style.borderRadius = "8px";
  outputBox.style.background = "#fff";
  outputBox.style.whiteSpace = "pre-line";
  outputBox.style.display = "none";
  document.querySelector(".container").appendChild(outputBox);

  // -------- Detect course from folder name --------
  let course = "UNKNOWN";
  const path = window.location.pathname.toLowerCase();

  if (path.includes("/diploma/")) {
    course = "DIPLOMA";
  } else if (path.includes("/btech/")) {
    course = "B.TECH";
  }

  // -------- Detect branch from page h1 --------
  const branch = pageTitle ? pageTitle.textContent.trim().toUpperCase() : "UNKNOWN";

  // -------- Get today's date --------
  function getFormattedDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  // -------- Show selected section students --------
  function updateSectionDisplay() {
    const selectedSection = sectionSelect.value;

    if (selectedSection === "A") {
      sectionAList.style.display = "block";
      sectionBList.style.display = "none";
    } else {
      sectionAList.style.display = "none";
      sectionBList.style.display = "block";
    }

    searchInput.value = "";
    filterStudents();
  }

  // -------- Get currently visible student list --------
  function getActiveStudentList() {
    return sectionSelect.value === "A" ? sectionAList : sectionBList;
  }

  // -------- Search/filter students --------
  function filterStudents() {
    const searchValue = searchInput.value.toLowerCase();
    const activeList = getActiveStudentList();
    const studentRows = activeList.querySelectorAll("div");

    studentRows.forEach((row) => {
      const name = row.textContent.toLowerCase();
      if (name.includes(searchValue)) {
        row.style.display = "block";
      } else {
        row.style.display = "none";
      }
    });
  }

  // -------- Only one subject can be selected --------
  subjectCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        subjectCheckboxes.forEach((cb) => {
          if (cb !== this) cb.checked = false;
        });
      }
    });
  });

  // -------- Get selected subject --------
  function getSelectedSubject() {
    let subjectName = "-----------";
    subjectCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        subjectName = checkbox.parentElement.textContent.trim();
      }
    });
    return subjectName;
  }

  // -------- Generate attendance output --------
  function generateAttendanceText() {
    const selectedSection = sectionSelect.value;
    const selectedSubject = getSelectedSubject();
    const activeList = getActiveStudentList();
    const studentCheckboxes = activeList.querySelectorAll(".student");

    let presentStudents = [];
    let totalStudents = 0;

    studentCheckboxes.forEach((checkbox) => {
      totalStudents++;
      if (checkbox.checked) {
        const studentName = checkbox.parentElement.textContent.trim();
        presentStudents.push(studentName);
      }
    });

    const presentCount = presentStudents.length;
    const absentCount = totalStudents - presentCount;

    let attendanceText = "";
    attendanceText += `COURSE: ${course}\n`;
    attendanceText += `BRANCH: ${branch}\n`;
    attendanceText += `DATE : ${getFormattedDate()}\n`;
    attendanceText += `SUBJECT : ${selectedSubject}\n`;
    attendanceText += `ATTENDANCE (SEC ${selectedSection})\n`;

    if (presentStudents.length === 0) {
      attendanceText += `No student marked present\n`;
    } else {
      presentStudents.forEach((name, index) => {
        attendanceText += `${index + 1}. ${name}\n`;
      });
    }

    attendanceText += `ABSENT: ${absentCount}\n`;
    attendanceText += `PRESENT: ${presentCount}`;

    return attendanceText;
  }

  // -------- Send attendance --------
  function sendAttendance() {
    const attendanceText = generateAttendanceText();

    // Show output on page
    outputBox.style.display = "block";
    outputBox.textContent = attendanceText;

    // Open WhatsApp with message
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(attendanceText)}`;
    window.open(whatsappURL, "_blank");
  }

  // -------- Events --------
  if (sectionSelect) {
    sectionSelect.addEventListener("change", updateSectionDisplay);
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterStudents);
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", sendAttendance);
  }

  // -------- Initial load --------
  updateSectionDisplay();
});
const infoSlides = document.querySelectorAll(".info-slide");
const infoDots = document.querySelectorAll(".info-dot");

let infoIndex = 0;

function showInfoSlide(index) {
  infoSlides.forEach(slide => slide.classList.remove("active"));
  infoDots.forEach(dot => dot.classList.remove("active-dot"));

  infoSlides[index].classList.add("active");
  infoDots[index].classList.add("active-dot");
}

if (infoSlides.length > 0) {
  setInterval(() => {
    infoIndex++;

    if (infoIndex >= infoSlides.length) {
      infoIndex = 0;
    }

    showInfoSlide(infoIndex);
  }, 2500);
}