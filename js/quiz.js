// ============================================
// TOÁN TIỂU HỌC THÔNG MINH — Quiz Engine
// ============================================

const QuizEngine = {
    state: null,

    start(grade, topicKey) {
        const gradeData = QUESTION_BANK[grade];
        const topicData = gradeData.topics[topicKey];
        const questions = this.shuffle([...topicData.questions]).slice(0, 8);
        this.state = {
            grade, topicKey,
            topicLabel: topicData.label,
            gradeLabel: gradeData.label,
            questions,
            current: 0,
            answers: [],
            score: 0,
            streak: 0,
            maxStreak: 0,
            startTime: Date.now(),
            questionStartTime: Date.now(),
            timePerQuestion: grade <= 2 ? 30 : grade <= 3 ? 25 : 20,
            timerInterval: null,
            timeLeft: 0,
            hadFastCorrect: false,
            finished: false
        };
        return this.state;
    },

    getCurrentQuestion() {
        if (!this.state || this.state.current >= this.state.questions.length) return null;
        return this.state.questions[this.state.current];
    },

    submitAnswer(selectedIndex) {
        const q = this.getCurrentQuestion();
        if (!q) return null;
        const elapsed = (Date.now() - this.state.questionStartTime) / 1000;
        const correct = selectedIndex === q.correctAnswer;
        if (correct) {
            this.state.score++;
            this.state.streak++;
            if (this.state.streak > this.state.maxStreak) this.state.maxStreak = this.state.streak;
            if (elapsed < 5) this.state.hadFastCorrect = true;
        } else {
            this.state.streak = 0;
        }
        const result = { questionId: q.id, selected: selectedIndex, correct, elapsed, explanation: q.explanation };
        this.state.answers.push(result);
        return result;
    },

    nextQuestion() {
        if (!this.state) return false;
        this.state.current++;
        this.state.questionStartTime = Date.now();
        return this.state.current < this.state.questions.length;
    },

    getProgress() {
        if (!this.state) return { current: 0, total: 0, percent: 0 };
        const total = this.state.questions.length;
        return { current: this.state.current + 1, total, percent: Math.round(((this.state.current) / total) * 100) };
    },

    finish() {
        if (!this.state) return null;
        this.state.finished = true;
        const totalTime = Math.round((Date.now() - this.state.startTime) / 1000);
        const result = {
            grade: this.state.grade,
            topic: this.state.topicKey,
            topicLabel: this.state.topicLabel,
            total: this.state.questions.length,
            correct: this.state.score,
            streak: this.state.maxStreak,
            totalTime,
            hadFastCorrect: this.state.hadFastCorrect,
            answers: this.state.answers,
            questions: this.state.questions
        };
        // Save result
        AccountManager.addQuizResult(result);
        // Check badges
        const stats = BadgeManager.getStats();
        const newBadges = BadgeManager.checkNewBadges(stats);
        result.newBadges = newBadges;
        return result;
    },

    startTimer(callback, onTimeout) {
        if (this.state.timerInterval) clearInterval(this.state.timerInterval);
        this.state.timeLeft = this.state.timePerQuestion;
        this.state.timerInterval = setInterval(() => {
            this.state.timeLeft--;
            callback(this.state.timeLeft);
            if (this.state.timeLeft <= 0) {
                clearInterval(this.state.timerInterval);
                onTimeout();
            }
        }, 1000);
    },

    stopTimer() {
        if (this.state && this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
};
