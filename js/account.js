// ============================================
// TOÁN TIỂU HỌC THÔNG MINH — Account Manager
// ============================================

const AVATARS = ["🧒", "👦", "👧", "🐱", "🐶", "🦊", "🐰", "🐼", "🦁", "🐸"];
const STORAGE_KEY = "toan_tieu_hoc";

const AccountManager = {
    _data: null,

    // Simple hash for password (NOT for production — localStorage only)
    _hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const ch = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash |= 0;
        }
        return "h_" + Math.abs(hash).toString(36);
    },

    load() {
        try {
            this._data = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!this._data || !this._data.profiles) {
                this._data = { profiles: [], activeId: null };
            }
        } catch {
            this._data = { profiles: [], activeId: null };
        }
        return this._data;
    },

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
    },

    getProfiles() {
        if (!this._data) this.load();
        return this._data.profiles;
    },

    getCurrentProfile() {
        if (!this._data) this.load();
        return this._data.profiles.find(p => p.id === this._data.activeId) || null;
    },

    isLoggedIn() {
        return this.getCurrentProfile() !== null;
    },

    setActive(id) {
        if (!this._data) this.load();
        this._data.activeId = id;
        this.save();
    },

    // ─── REGISTRATION ───
    register(username, password, name, avatar, grade, role) {
        if (!this._data) this.load();

        // Validate
        if (!username || username.length < 3) return { ok: false, error: "Tên đăng nhập cần ít nhất 3 ký tự" };
        if (!password || password.length < 4) return { ok: false, error: "Mật khẩu cần ít nhất 4 ký tự" };
        if (!name) return { ok: false, error: "Vui lòng nhập tên hiển thị" };

        // Check duplicate username
        const exists = this._data.profiles.find(
            p => p.username.toLowerCase() === username.toLowerCase()
        );
        if (exists) return { ok: false, error: "Tên đăng nhập đã tồn tại!" };

        const profile = {
            id: "p_" + Date.now(),
            username: username.toLowerCase(),
            passwordHash: this._hash(password),
            name,
            avatar: avatar || "🧒",
            grade: grade || 1,
            role: role || "student", // "student" or "parent"
            badges: [],
            history: [],
            maxStreak: 0,
            fastCorrect: 0,
            fastQuiz: 0,
            createdAt: new Date().toISOString()
        };

        this._data.profiles.push(profile);
        this._data.activeId = profile.id;
        this.save();
        return { ok: true, profile };
    },

    // ─── LOGIN ───
    login(username, password) {
        if (!this._data) this.load();
        const profile = this._data.profiles.find(
            p => p.username.toLowerCase() === username.toLowerCase()
        );
        if (!profile) return { ok: false, error: "Tài khoản không tồn tại!" };
        if (profile.passwordHash !== this._hash(password)) {
            return { ok: false, error: "Mật khẩu không đúng!" };
        }
        this._data.activeId = profile.id;
        this.save();
        return { ok: true, profile };
    },

    // ─── LOGOUT ───
    logout() {
        if (!this._data) this.load();
        this._data.activeId = null;
        this.save();
    },

    // Legacy: create profile without auth (kept for compatibility)
    createProfile(name, avatar, grade) {
        return this.register(
            "user_" + Date.now(),
            "1234",
            name, avatar, grade, "student"
        );
    },

    saveProfile(profile) {
        if (!this._data) this.load();
        const idx = this._data.profiles.findIndex(p => p.id === profile.id);
        if (idx !== -1) this._data.profiles[idx] = profile;
        this.save();
    },

    addQuizResult(result) {
        const profile = this.getCurrentProfile();
        if (!profile) return;
        profile.history.push({
            ...result,
            date: new Date().toISOString()
        });
        if (result.streak > (profile.maxStreak || 0)) profile.maxStreak = result.streak;
        if (result.hadFastCorrect) profile.fastCorrect = (profile.fastCorrect || 0) + 1;
        if (result.totalTime < 60) profile.fastQuiz = (profile.fastQuiz || 0) + 1;
        this.saveProfile(profile);
    },

    deleteProfile(id) {
        if (!this._data) this.load();
        this._data.profiles = this._data.profiles.filter(p => p.id !== id);
        if (this._data.activeId === id) {
            this._data.activeId = this._data.profiles.length > 0 ? this._data.profiles[0].id : null;
        }
        this.save();
    },

    getStatsSummary() {
        const profile = this.getCurrentProfile();
        if (!profile) return { total: 0, correct: 0, accuracy: 0, time: 0, quizzes: 0 };
        const history = profile.history || [];
        const total = history.reduce((s, h) => s + h.total, 0);
        const correct = history.reduce((s, h) => s + h.correct, 0);
        return {
            quizzes: history.length,
            total,
            correct,
            accuracy: total > 0 ? Math.round(correct / total * 100) : 0,
            time: history.reduce((s, h) => s + (h.totalTime || 0), 0)
        };
    }
};
