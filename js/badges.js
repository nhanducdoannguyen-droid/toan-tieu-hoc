// ============================================
// TOÁN TIỂU HỌC THÔNG MINH — Badge System
// ============================================

const BADGE_DEFINITIONS = [
    { id: "first_star", emoji: "⭐", name: "Ngôi Sao Đầu Tiên", desc: "Hoàn thành bài kiểm tra đầu tiên", condition: s => s.totalQuizzes >= 1 },
    { id: "fire_streak", emoji: "🔥", name: "Chuỗi Lửa", desc: "5 câu đúng liên tiếp", condition: s => s.maxStreak >= 5 },
    { id: "topic_champion", emoji: "🏅", name: "Vô Địch Chủ Đề", desc: "100% đúng trong 1 chủ đề", condition: s => s.perfectTopics >= 1 },
    { id: "diamond", emoji: "💎", name: "Kim Cương", desc: "Hoàn thành tất cả chủ đề 1 lớp", condition: s => s.completedGrades >= 1 },
    { id: "lightning", emoji: "⚡", name: "Tia Chớp", desc: "Trả lời đúng trong < 5 giây", condition: s => s.fastCorrect >= 1 },
    { id: "sharpshooter", emoji: "🎯", name: "Thiện Xạ", desc: "10 câu đúng liên tiếp", condition: s => s.maxStreak >= 10 },
    { id: "math_wizard", emoji: "🧙", name: "Phù Thủy Toán Học", desc: "Đạt 50 câu đúng tổng cộng", condition: s => s.totalCorrect >= 50 },
    { id: "explorer", emoji: "🗺️", name: "Nhà Thám Hiểm", desc: "Thử tất cả các lớp", condition: s => s.triedGrades >= 5 },
    { id: "persistent", emoji: "💪", name: "Kiên Trì", desc: "Hoàn thành 10 bài kiểm tra", condition: s => s.totalQuizzes >= 10 },
    { id: "speed_demon", emoji: "🏎️", name: "Tốc Độ", desc: "Hoàn thành bài trong < 60 giây", condition: s => s.fastQuiz >= 1 },
    { id: "perfect_10", emoji: "🌟", name: "Hoàn Hảo 10/10", desc: "Đạt 10/10 câu đúng", condition: s => s.perfect10 >= 1 },
    { id: "scholar", emoji: "🎓", name: "Học Giả", desc: "Đạt 100 câu đúng tổng cộng", condition: s => s.totalCorrect >= 100 }
];

const BadgeManager = {
    checkNewBadges(stats) {
        const profile = AccountManager.getCurrentProfile();
        if (!profile) return [];
        const unlocked = profile.badges || [];
        const newBadges = [];
        BADGE_DEFINITIONS.forEach(badge => {
            if (!unlocked.includes(badge.id) && badge.condition(stats)) {
                newBadges.push(badge);
                unlocked.push(badge.id);
            }
        });
        if (newBadges.length > 0) {
            profile.badges = unlocked;
            AccountManager.saveProfile(profile);
        }
        return newBadges;
    },

    getAllBadges() { return BADGE_DEFINITIONS; },

    isUnlocked(badgeId) {
        const profile = AccountManager.getCurrentProfile();
        return profile && profile.badges && profile.badges.includes(badgeId);
    },

    getStats() {
        const profile = AccountManager.getCurrentProfile();
        if (!profile) return {};
        const history = profile.history || [];
        const triedGradesSet = new Set(history.map(h => h.grade));
        const completedGradesSet = new Set();
        // Check completed grades
        for (let g = 1; g <= 5; g++) {
            const gradeData = QUESTION_BANK[g];
            if (!gradeData) continue;
            const topics = Object.keys(gradeData.topics);
            const doneTops = topics.filter(t => history.some(h => h.grade === g && h.topic === t));
            if (doneTops.length === topics.length) completedGradesSet.add(g);
        }
        return {
            totalQuizzes: history.length,
            totalCorrect: history.reduce((s, h) => s + h.correct, 0),
            maxStreak: profile.maxStreak || 0,
            perfectTopics: history.filter(h => h.correct === h.total).length,
            completedGrades: completedGradesSet.size,
            fastCorrect: profile.fastCorrect || 0,
            triedGrades: triedGradesSet.size,
            fastQuiz: profile.fastQuiz || 0,
            perfect10: history.filter(h => h.correct >= 10 && h.correct === h.total).length
        };
    }
};
