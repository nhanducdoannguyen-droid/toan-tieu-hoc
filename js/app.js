// ============================================
// TOÁN TIỂU HỌC THÔNG MINH — Main Application
// ============================================

const App = {
  currentPage: null,

  init() {
    AccountManager.load();
    this.updateNavbar();
    window.addEventListener("hashchange", () => { this.updateNavbar(); this.route(); });
    this.route();
  },

  route() {
    const hash = location.hash.slice(1) || "/";
    const parts = hash.split("/").filter(Boolean);

    if (parts[0] === "login") return this.showLogin();
    if (parts[0] === "register") return this.showRegister();
    if (parts[0] === "topics" && parts[1]) return this.showTopics(parseInt(parts[1]));
    if (parts[0] === "quiz" && parts[1] && parts[2]) return this.showQuiz(parseInt(parts[1]), parts[2]);
    if (parts[0] === "results") return this.showResults();
    if (parts[0] === "profile") return this.requireAuth() && this.showProfile();
    if (parts[0] === "parent") return this.requireAuth() && this.showParent();
    if (parts[0] === "badges") return this.showBadges();
    this.showHome();
  },

  requireAuth() {
    if (!AccountManager.isLoggedIn()) { location.hash = "#/login"; return false; }
    return true;
  },

  updateNavbar() {
    const nav = document.getElementById("navbar-right");
    if (!nav) return;
    const p = AccountManager.getCurrentProfile();
    if (p) {
      nav.innerHTML = `
        <button class="nav-btn" data-page="home" onclick="location.hash='#/'">
          <span class="nav-icon">🏠</span><span class="nav-text">Trang chủ</span>
        </button>
        <button class="nav-btn" data-page="profile" onclick="location.hash='#/profile'">
          <span class="nav-icon">👤</span><span class="nav-text">Hồ sơ</span>
        </button>
        <button class="nav-btn" data-page="badges" onclick="location.hash='#/badges'">
          <span class="nav-icon">🎖️</span><span class="nav-text">Huy hiệu</span>
        </button>
        ${p.role === 'parent' ? `<button class="nav-btn" data-page="parent" onclick="location.hash='#/parent'"><span class="nav-icon">📊</span><span class="nav-text">Thống kê</span></button>` : ''}
        <button class="nav-btn nav-user-btn" onclick="App.showUserMenu(this)">
          <span class="nav-icon">${p.avatar}</span><span class="nav-text">${p.name}</span><span style="font-size:0.6em">▼</span>
        </button>`;
    } else {
      nav.innerHTML = `
        <button class="nav-btn" data-page="home" onclick="location.hash='#/'">
          <span class="nav-icon">🏠</span><span class="nav-text">Trang chủ</span>
        </button>
        <button class="nav-btn btn-nav-login" onclick="location.hash='#/login'">
          <span class="nav-icon">🔑</span><span class="nav-text">Đăng nhập</span>
        </button>
        <button class="nav-btn btn-nav-register" onclick="location.hash='#/register'">
          <span class="nav-icon">📝</span><span class="nav-text">Đăng ký</span>
        </button>`;
    }
  },

  showUserMenu(btn) {
    const existing = document.getElementById("user-menu");
    if (existing) { existing.remove(); return; }
    const rect = btn.getBoundingClientRect();
    const menu = document.createElement("div");
    menu.id = "user-menu";
    menu.className = "user-dropdown";
    menu.style.top = (rect.bottom + 8) + "px";
    menu.style.right = (window.innerWidth - rect.right) + "px";
    menu.innerHTML = `
      <button onclick="location.hash='#/profile';document.getElementById('user-menu')?.remove()">👤 Hồ sơ của tôi</button>
      <button onclick="location.hash='#/badges';document.getElementById('user-menu')?.remove()">🎖️ Huy hiệu</button>
      <hr />
      <button onclick="App.doLogout()" class="logout-btn">🚪 Đăng xuất</button>`;
    document.body.appendChild(menu);
    setTimeout(() => document.addEventListener("click", function handler(e) {
      if (!menu.contains(e.target) && e.target !== btn) { menu.remove(); document.removeEventListener("click", handler); }
    }), 10);
  },

  doLogout() {
    document.getElementById("user-menu")?.remove();
    AccountManager.logout();
    this.updateNavbar();
    location.hash = "#/";
  },

  render(html) {
    document.getElementById("app").innerHTML = html;
    // Render KaTeX only inside question/explanation areas, not timer
    this._renderKaTeX(document.getElementById("app"));
  },

  _renderKaTeX(container) {
    if (!window.renderMathInElement || !container) return;
    renderMathInElement(container, {
      delimiters: [
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      throwOnError: false
    });
  },

  updateNav(active) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    const btn = document.querySelector(`.nav-btn[data-page="${active}"]`);
    if (btn) btn.classList.add("active");
  },

  // ─── HOME PAGE ───
  showHome() {
    this.updateNav("home");
    const profile = AccountManager.getCurrentProfile();
    const greeting = profile ? `Chào ${profile.avatar} ${profile.name}!` : "Hãy bắt đầu học nào!";

    let gradeCards = "";
    for (let g = 1; g <= 5; g++) {
      const d = QUESTION_BANK[g];
      gradeCards += `
        <div class="grade-card" data-grade="${g}" onclick="location.hash='#/topics/${g}'">
          <span class="grade-card-emoji">${d.emoji}</span>
          <div class="grade-card-title">${d.label}</div>
          <div class="grade-card-desc">${Object.keys(d.topics).length} chủ đề</div>
        </div>`;
    }

    this.render(`
      <div class="page active">
        <div class="hero">
          <div class="hero-mascot">🦉</div>
          <h1 class="hero-title">Toán Tiểu Học Thông Minh</h1>
          <p class="hero-subtitle">${greeting} Chọn lớp để bắt đầu luyện tập 🎯</p>
        </div>
        <div class="grade-grid stagger-children">${gradeCards}</div>
      </div>
    `);

  },

  // ─── TOPIC SELECTION ───
  showTopics(grade) {
    this.updateNav("home");
    const d = QUESTION_BANK[grade];
    if (!d) return this.showHome();

    let cards = "";
    Object.entries(d.topics).forEach(([key, topic]) => {
      cards += `
        <div class="topic-card" onclick="location.hash='#/quiz/${grade}/${key}'">
          <div class="topic-icon">${topic.icon}</div>
          <div class="topic-info">
            <div class="topic-name">${topic.label}</div>
            <div class="topic-count">${topic.questions.length} câu hỏi</div>
          </div>
        </div>`;
    });

    this.render(`
      <div class="page active">
        <div class="page-header">
          <button class="back-btn" onclick="location.hash='#/'">←</button>
          <h2 class="page-title">${d.emoji} ${d.label} — Chọn Chủ Đề</h2>
        </div>
        <div class="topic-grid stagger-children">${cards}</div>
      </div>
    `);
  },

  // ─── LOGIN PAGE ───
  showLogin() {
    this.updateNav("login");
    this.render(`
      <div class="page active">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <div class="auth-icon">🔑</div>
              <h2 class="auth-title">Đăng Nhập</h2>
              <p class="auth-subtitle">Chào mừng trở lại! Hãy đăng nhập để tiếp tục học nhé.</p>
            </div>
            <div id="auth-error" class="auth-error" style="display:none"></div>
            <div class="form-group">
              <label class="form-label">👤 Tên đăng nhập</label>
              <input class="form-input" id="login-username" placeholder="Nhập tên đăng nhập..." autocomplete="username" />
            </div>
            <div class="form-group">
              <label class="form-label">🔒 Mật khẩu</label>
              <input class="form-input" id="login-password" type="password" placeholder="Nhập mật khẩu..." autocomplete="current-password" />
            </div>
            <button class="btn btn-primary auth-submit" onclick="App.doLogin()">🚀 Đăng Nhập</button>
            <div class="auth-footer">
              Chưa có tài khoản? <a href="#/register" class="auth-link">Đăng ký ngay →</a>
            </div>
          </div>
        </div>
      </div>`);
    document.getElementById("login-username")?.focus();
    // Enter key support
    document.getElementById("login-password")?.addEventListener("keydown", e => { if (e.key === "Enter") App.doLogin(); });
  },

  doLogin() {
    const username = document.getElementById("login-username")?.value.trim();
    const password = document.getElementById("login-password")?.value;
    const errEl = document.getElementById("auth-error");
    if (!username || !password) {
      errEl.textContent = "Vui lòng nhập đầy đủ thông tin!"; errEl.style.display = "block"; return;
    }
    const result = AccountManager.login(username, password);
    if (!result.ok) {
      errEl.textContent = result.error; errEl.style.display = "block"; return;
    }
    this.updateNavbar();
    location.hash = "#/";
  },

  // ─── REGISTER PAGE ───
  showRegister() {
    this.updateNav("register");
    const avatarBtns = AVATARS.map((a, i) =>
      `<button type="button" class="avatar-option ${i === 0 ? 'selected' : ''}" data-avatar="${a}" onclick="App._selectAvatar(this)">${a}</button>`
    ).join("");
    const gradeBtns = [1, 2, 3, 4, 5].map(g =>
      `<button type="button" class="grade-option ${g === 1 ? 'selected' : ''}" data-grade="${g}" onclick="App._selectGrade(this)">Lớp ${g}</button>`
    ).join("");

    this.render(`
      <div class="page active">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <div class="auth-icon">📝</div>
              <h2 class="auth-title">Đăng Ký Tài Khoản</h2>
              <p class="auth-subtitle">Tạo tài khoản mới để bắt đầu hành trình học Toán!</p>
            </div>
            <div id="auth-error" class="auth-error" style="display:none"></div>
            <div class="auth-role-tabs">
              <button class="role-tab active" data-role="student" onclick="App._selectRole(this)">🧒 Học sinh</button>
              <button class="role-tab" data-role="parent" onclick="App._selectRole(this)">👨‍👩‍👧 Phụ huynh</button>
            </div>
            <div class="form-group">
              <label class="form-label">📛 Tên hiển thị</label>
              <input class="form-input" id="reg-name" placeholder="Tên của bạn..." maxlength="20" />
            </div>
            <div class="form-group">
              <label class="form-label">👤 Tên đăng nhập</label>
              <input class="form-input" id="reg-username" placeholder="Tạo tên đăng nhập (≥3 ký tự)" maxlength="20" autocomplete="username" />
            </div>
            <div class="form-group">
              <label class="form-label">🔒 Mật khẩu</label>
              <input class="form-input" id="reg-password" type="password" placeholder="Tạo mật khẩu (≥4 ký tự)" autocomplete="new-password" />
            </div>
            <div class="form-group">
              <label class="form-label">🔒 Xác nhận mật khẩu</label>
              <input class="form-input" id="reg-password2" type="password" placeholder="Nhập lại mật khẩu" autocomplete="new-password" />
            </div>
            <div class="form-group">
              <label class="form-label">😊 Chọn avatar</label>
              <div class="avatar-picker">${avatarBtns}</div>
            </div>
            <div class="form-group" id="grade-picker-group">
              <label class="form-label">📚 Lớp</label>
              <div class="grade-picker">${gradeBtns}</div>
            </div>
            <button class="btn btn-primary auth-submit" onclick="App.doRegister()">🎉 Tạo Tài Khoản</button>
            <div class="auth-footer">
              Đã có tài khoản? <a href="#/login" class="auth-link">Đăng nhập →</a>
            </div>
          </div>
        </div>
      </div>`);
    App._regAvatar = AVATARS[0];
    App._regGrade = 1;
    App._regRole = "student";
    document.getElementById("reg-name")?.focus();
  },

  _selectRole(el) {
    document.querySelectorAll(".role-tab").forEach(b => b.classList.remove("active"));
    el.classList.add("active");
    App._regRole = el.dataset.role;
    const gradeGroup = document.getElementById("grade-picker-group");
    if (gradeGroup) gradeGroup.style.display = App._regRole === "parent" ? "none" : "block";
  },

  doRegister() {
    const name = document.getElementById("reg-name")?.value.trim();
    const username = document.getElementById("reg-username")?.value.trim();
    const password = document.getElementById("reg-password")?.value;
    const password2 = document.getElementById("reg-password2")?.value;
    const errEl = document.getElementById("auth-error");

    if (password !== password2) {
      errEl.textContent = "Mật khẩu xác nhận không khớp!"; errEl.style.display = "block"; return;
    }
    const result = AccountManager.register(username, password, name, App._regAvatar, App._regGrade, App._regRole);
    if (!result.ok) {
      errEl.textContent = result.error; errEl.style.display = "block"; return;
    }
    this.updateNavbar();
    location.hash = "#/";
  },

  // ─── QUIZ ───
  showQuiz(grade, topicKey) {
    this.updateNav("home");
    if (!this.requireAuth()) return;

    QuizEngine.start(grade, topicKey);
    this.renderQuestion();
  },

  renderQuestion() {
    QuizEngine.stopTimer();
    const s = QuizEngine.state;
    const q = QuizEngine.getCurrentQuestion();
    if (!q) { this.finishQuiz(); return; }

    const prog = QuizEngine.getProgress();
    const labels = ["A", "B", "C", "D"];

    let optionsHTML = "";
    q.options.forEach((opt, i) => {
      optionsHTML += `
        <button class="option-btn" id="opt-${i}" onclick="App.selectAnswer(${i})">
          <span class="option-label">${labels[i]}</span>
          ${opt}
        </button>`;
    });

    // Build HTML — timer uses data-time attribute to avoid KaTeX interference
    document.getElementById("app").innerHTML = `
      <div class="page active">
        <div class="quiz-header">
          <div class="quiz-info">
            <button class="back-btn" onclick="App.quitQuiz()">←</button>
            <div class="quiz-timer" id="timer">
              <span class="quiz-timer-icon">⏱️</span>
              <span id="timer-text"></span><span>s</span>
            </div>
            <div class="quiz-score-display" id="score-display">⭐ <span id="score-value">${s.score}</span></div>
          </div>
          <div class="quiz-progress-wrap">
            <div class="quiz-progress-text">Câu ${prog.current} / ${prog.total}</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${prog.percent}%"></div>
            </div>
          </div>
          ${s.streak >= 3 ? `<div class="streak-display">🔥 Chuỗi ${s.streak}!</div>` : ""}
        </div>
        <div class="question-card">
          <div class="question-number">📝 Câu ${prog.current}</div>
          <div class="question-text" id="question-text">${q.question}</div>
          ${q.hint && s.grade <= 2 ? `<div class="question-hint">💡 ${q.hint}</div>` : ""}
          <div class="options-grid stagger-children" id="options-area">${optionsHTML}</div>
          <div id="explanation-area"></div>
        </div>
      </div>`;

    // Render KaTeX only in question and options areas (NOT in timer/score)
    const questionEl = document.getElementById("question-text");
    const optionsEl = document.getElementById("options-area");
    if (questionEl) this._renderKaTeX(questionEl);
    if (optionsEl) this._renderKaTeX(optionsEl);

    // Set timer text AFTER KaTeX rendering to prevent interference
    const timerTextEl = document.getElementById("timer-text");
    if (timerTextEl) timerTextEl.textContent = s.timePerQuestion;

    // Scroll to top so quiz header is visible
    window.scrollTo({ top: 0, behavior: "instant" });

    // Start countdown timer
    QuizEngine.startTimer(
      (timeLeft) => {
        const el = document.getElementById("timer-text");
        const timerEl = document.getElementById("timer");
        if (el) el.textContent = timeLeft;
        if (timerEl) {
          if (timeLeft <= 5) timerEl.classList.add("warning");
          else timerEl.classList.remove("warning");
        }
      },
      () => this.selectAnswer(-1) // timeout = wrong
    );
  },

  selectAnswer(idx) {
    QuizEngine.stopTimer();
    const q = QuizEngine.getCurrentQuestion();
    if (!q) return;

    // Mark answer
    const result = QuizEngine.submitAnswer(idx);
    const btns = document.querySelectorAll(".option-btn");
    btns.forEach((b, i) => {
      b.classList.add("disabled");
      if (i === q.correctAnswer) b.classList.add("correct");
      if (i === idx && !result.correct) b.classList.add("wrong");
    });

    // Update score display live
    const scoreEl = document.getElementById("score-value");
    if (scoreEl) scoreEl.textContent = QuizEngine.state.score;

    // Show explanation
    const area = document.getElementById("explanation-area");
    if (area) {
      area.innerHTML = `
        <div class="explanation-box">
          <div class="explanation-title">${result.correct ? "✅ Chính xác!" : "❌ Chưa đúng rồi!"}</div>
          <div class="explanation-text">${q.explanation}</div>
          <button class="next-btn" onclick="App.nextQuestion()">
            ${QuizEngine.state.current + 1 < QuizEngine.state.questions.length ? "Câu tiếp theo →" : "Xem kết quả 🏆"}
          </button>
        </div>`;
      this._renderKaTeX(area);
    }

    // Correct animation
    if (result.correct) this.spawnStars();
  },

  nextQuestion() {
    const hasMore = QuizEngine.nextQuestion();
    if (hasMore) this.renderQuestion();
    else this.finishQuiz();
  },

  finishQuiz() {
    const result = QuizEngine.finish();
    if (result) {
      App._lastResult = result;
      location.hash = "#/results";
    }
  },

  quitQuiz() {
    QuizEngine.stopTimer();
    location.hash = "#/";
  },

  // ─── RESULTS PAGE ───
  showResults() {
    this.updateNav("home");
    const r = App._lastResult;
    if (!r) return this.showHome();

    const pct = Math.round(r.correct / r.total * 100);
    let emoji = "🎉", title = "Xuất sắc!";
    if (pct < 50) { emoji = "💪"; title = "Cố gắng thêm nhé!"; }
    else if (pct < 80) { emoji = "👏"; title = "Tốt lắm!"; }
    else if (pct < 100) { emoji = "🌟"; title = "Giỏi quá!"; }

    const mins = Math.floor(r.totalTime / 60);
    const secs = r.totalTime % 60;

    let badgesHTML = "";
    if (r.newBadges && r.newBadges.length > 0) {
      badgesHTML = `
        <div class="results-badges">
          <div class="results-badges-title">🎖️ Huy hiệu mới!</div>
          <div class="badge-list">
            ${r.newBadges.map(b => `
              <div class="badge-item">
                <span class="badge-emoji">${b.emoji}</span>
                <span class="badge-name">${b.name}</span>
              </div>`).join("")}
          </div>
        </div>`;
    }

    this.render(`
      <div class="page active">
        <div class="results-card">
          <div class="results-emoji trophy-spin">${emoji}</div>
          <div class="results-title">${title}</div>
          <div class="results-score">${pct}%</div>
          <div class="results-stats">
            <div class="stat-item">
              <div class="stat-value correct-color">${r.correct}</div>
              <div class="stat-label">Đúng ✅</div>
            </div>
            <div class="stat-item">
              <div class="stat-value wrong-color">${r.total - r.correct}</div>
              <div class="stat-label">Sai ❌</div>
            </div>
            <div class="stat-item">
              <div class="stat-value time-color">${mins}:${secs.toString().padStart(2, "0")}</div>
              <div class="stat-label">Thời gian ⏱️</div>
            </div>
          </div>
          ${badgesHTML}
          <div class="results-actions">
            <button class="btn btn-primary" onclick="location.hash='#/quiz/${r.grade}/${r.topic}'">🔄 Làm lại</button>
            <button class="btn btn-secondary" onclick="location.hash='#/topics/${r.grade}'">📚 Chủ đề khác</button>
            <button class="btn btn-secondary" onclick="location.hash='#/'">🏠 Trang chủ</button>
          </div>
        </div>
      </div>
    `);

    if (pct >= 80) this.launchConfetti();
  },

  // ─── PROFILE PAGE ───
  showProfile() {
    this.updateNav("profile");
    const p = AccountManager.getCurrentProfile();
    if (!p) { location.hash = "#/login"; return; }
    const stats = AccountManager.getStatsSummary();
    const allBadges = BadgeManager.getAllBadges();

    let badgesHTML = allBadges.map(b => {
      const unlocked = p.badges && p.badges.includes(b.id);
      return `
        <div class="badge-card ${unlocked ? "unlocked" : "locked"}">
          <div class="badge-card-emoji">${b.emoji}</div>
          <div class="badge-card-name">${b.name}</div>
          <div class="badge-card-desc">${b.desc}</div>
        </div>`;
    }).join("");

    this.render(`
      <div class="page active">
        <div class="profile-header">
          <div class="profile-avatar">${p.avatar}</div>
          <div class="profile-name">${p.name}</div>
          <div class="profile-grade">${QUESTION_BANK[p.grade]?.label || "Lớp " + p.grade}</div>
        </div>
        <div class="profile-stats-grid stagger-children">
          <div class="profile-stat-card">
            <div class="profile-stat-value">${stats.quizzes}</div>
            <div class="profile-stat-label">Bài đã làm</div>
          </div>
          <div class="profile-stat-card">
            <div class="profile-stat-value">${stats.correct}</div>
            <div class="profile-stat-label">Câu đúng</div>
          </div>
          <div class="profile-stat-card">
            <div class="profile-stat-value">${stats.accuracy}%</div>
            <div class="profile-stat-label">Tỉ lệ đúng</div>
          </div>
          <div class="profile-stat-card">
            <div class="profile-stat-value">${p.badges?.length || 0}</div>
            <div class="profile-stat-label">Huy hiệu</div>
          </div>
        </div>
        <div class="badges-section">
          <h3 class="section-title">🎖️ Bộ Sưu Tập Huy Hiệu</h3>
          <div class="badges-grid stagger-children">${badgesHTML}</div>
        </div>
      </div>
    `);
  },

  // ─── PARENT DASHBOARD ───
  showParent() {
    this.updateNav("parent");
    const profiles = AccountManager.getProfiles();
    if (profiles.length === 0) {
      this.render(`
        <div class="page active">
          <div class="page-header">
            <h2 class="page-title">👨‍👩‍👧 Dashboard Phụ Huynh</h2>
          </div>
          <div class="results-card">
            <div class="results-emoji">📊</div>
            <div class="results-title">Chưa có hồ sơ học sinh</div>
            <p style="color:var(--text-secondary);margin-bottom:var(--space-lg)">Hãy tạo hồ sơ học sinh để theo dõi tiến trình học tập.</p>
            <button class="btn btn-primary" onclick="App.showSetupModal()">➕ Tạo hồ sơ</button>
          </div>
        </div>`);
      return;
    }

    const p = AccountManager.getCurrentProfile() || profiles[0];
    const stats = AccountManager.getStatsSummary();
    const history = (p.history || []).slice(-10).reverse();

    let historyRows = history.map(h => {
      const date = new Date(h.date).toLocaleDateString("vi-VN");
      const pct = Math.round(h.correct / h.total * 100);
      const cls = pct >= 80 ? "excellent" : pct >= 50 ? "good" : "needs-work";
      return `<tr>
        <td>${date}</td>
        <td>${h.topicLabel || h.topic}</td>
        <td><span class="score-badge ${cls}">${pct}%</span></td>
        <td>${h.correct}/${h.total}</td>
      </tr>`;
    }).join("");

    let profileOptions = profiles.map(pr =>
      `<option value="${pr.id}" ${pr.id === p.id ? "selected" : ""}>${pr.avatar} ${pr.name}</option>`
    ).join("");

    this.render(`
      <div class="page active">
        <div class="dashboard-header">
          <h2 class="page-title">👨‍👩‍👧 Dashboard Phụ Huynh</h2>
          <select class="child-selector" onchange="AccountManager.setActive(this.value);App.showParent()">
            ${profileOptions}
          </select>
        </div>
        <div class="dashboard-cards stagger-children">
          <div class="dashboard-card">
            <div class="dashboard-card-header">📝 Tổng bài làm</div>
            <div class="dashboard-card-value">${stats.quizzes}</div>
          </div>
          <div class="dashboard-card">
            <div class="dashboard-card-header">✅ Tỉ lệ đúng</div>
            <div class="dashboard-card-value" style="color:var(--green)">${stats.accuracy}%</div>
          </div>
          <div class="dashboard-card">
            <div class="dashboard-card-header">🎖️ Huy hiệu</div>
            <div class="dashboard-card-value" style="color:var(--amber)">${p.badges?.length || 0}</div>
          </div>
        </div>
        <div class="history-table">
          <h3 style="padding:var(--space-lg);font-weight:700;">📋 Lịch Sử Làm Bài</h3>
          <table>
            <thead><tr><th>Ngày</th><th>Chủ đề</th><th>Điểm</th><th>Kết quả</th></tr></thead>
            <tbody>${historyRows || '<tr><td colspan="4" style="text-align:center;color:var(--text-light)">Chưa có bài làm nào</td></tr>'}</tbody>
          </table>
        </div>
      </div>
    `);
  },

  // ─── BADGES PAGE ───
  showBadges() {
    this.updateNav("badges");
    const p = AccountManager.getCurrentProfile();
    const allBadges = BadgeManager.getAllBadges();

    let badgesHTML = allBadges.map(b => {
      const unlocked = p && p.badges && p.badges.includes(b.id);
      return `
        <div class="badge-card ${unlocked ? "unlocked" : "locked"}">
          <div class="badge-card-emoji">${b.emoji}</div>
          <div class="badge-card-name">${b.name}</div>
          <div class="badge-card-desc">${b.desc}</div>
        </div>`;
    }).join("");

    this.render(`
      <div class="page active">
        <div class="page-header">
          <h2 class="page-title">🎖️ Bộ Sưu Tập Huy Hiệu</h2>
        </div>
        <div class="badges-grid stagger-children">${badgesHTML}</div>
      </div>
    `);
  },

  // ─── HELPERS (Avatar/Grade selectors) ───
  _selectAvatar(el) {
    document.querySelectorAll(".avatar-option").forEach(b => b.classList.remove("selected"));
    el.classList.add("selected");
    App._regAvatar = el.dataset.avatar;
  },

  _selectGrade(el) {
    document.querySelectorAll(".grade-option").forEach(b => b.classList.remove("selected"));
    el.classList.add("selected");
    App._regGrade = parseInt(el.dataset.grade);
  },

  // ─── EFFECTS ───
  spawnStars() {
    const stars = ["⭐", "🌟", "✨", "💫"];
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;top:50%;left:50%;pointer-events:none;z-index:250;";
    document.body.appendChild(container);
    for (let i = 0; i < 8; i++) {
      const el = document.createElement("span");
      el.className = "star-particle";
      el.textContent = stars[Math.floor(Math.random() * stars.length)];
      const angle = (Math.PI * 2 / 8) * i;
      el.style.setProperty("--tx", Math.cos(angle) * 80 + "px");
      el.style.setProperty("--ty", Math.sin(angle) * 80 + "px");
      container.appendChild(el);
    }
    setTimeout(() => container.remove(), 1200);
  },

  launchConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = [];
    const colors = ["#6C63FF", "#FF6B6B", "#4ECDC4", "#F39C12", "#2ECC71", "#E84393"];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 3 + 2,
        vx: Math.random() * 2 - 1,
        rot: Math.random() * 360,
        vr: Math.random() * 10 - 5
      });
    }
    let frames = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.vr;
      });
      frames++;
      if (frames < 150) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }
};

// Initialize
document.addEventListener("DOMContentLoaded", () => App.init());
