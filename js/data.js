// ============================================
// TOÁN TIỂU HỌC THÔNG MINH — Question Bank
// ============================================

const QUESTION_BANK = {
  1: {
    label: "Lớp 1",
    emoji: "🌟",
    color: "#FF6B6B",
    topics: {
      addition: {
        label: "Phép Cộng",
        icon: "➕",
        questions: [
          { id:"g1a1", question:"\\(2 + 3 = ?\\)", options:["4","5","6","7"], correctAnswer:1, hint:"Đếm trên ngón tay nhé! ✋", explanation:"\\(2 + 3 = 5\\). Giơ 2 ngón, thêm 3 ngón = 5 ngón! ✋" },
          { id:"g1a2", question:"\\(1 + 4 = ?\\)", options:["3","4","5","6"], correctAnswer:2, hint:"Bắt đầu từ 1, đếm thêm 4 🐾", explanation:"\\(1 + 4 = 5\\)" },
          { id:"g1a3", question:"\\(5 + 2 = ?\\)", options:["6","7","8","5"], correctAnswer:1, hint:"5 quả táo 🍎 thêm 2 quả nữa", explanation:"\\(5 + 2 = 7\\)" },
          { id:"g1a4", question:"\\(3 + 3 = ?\\)", options:["5","6","7","4"], correctAnswer:1, hint:"Hai tay giơ 3 ngón ✌️", explanation:"\\(3 + 3 = 6\\)" },
          { id:"g1a5", question:"\\(4 + 1 = ?\\)", options:["4","3","5","6"], correctAnswer:2, hint:"Thêm 1 thôi nè 😊", explanation:"\\(4 + 1 = 5\\)" },
          { id:"g1a6", question:"\\(6 + 2 = ?\\)", options:["7","9","8","6"], correctAnswer:2, hint:"6 bông hoa 🌸 thêm 2 bông", explanation:"\\(6 + 2 = 8\\)" },
          { id:"g1a7", question:"\\(7 + 1 = ?\\)", options:["7","9","8","6"], correctAnswer:2, hint:"Chỉ thêm 1 thôi!", explanation:"\\(7 + 1 = 8\\)" },
          { id:"g1a8", question:"\\(5 + 3 = ?\\)", options:["7","9","8","6"], correctAnswer:2, hint:"5 con mèo 🐱 thêm 3 con", explanation:"\\(5 + 3 = 8\\)" }
        ]
      },
      subtraction: {
        label: "Phép Trừ",
        icon: "➖",
        questions: [
          { id:"g1s1", question:"\\(5 - 2 = ?\\)", options:["2","4","3","1"], correctAnswer:2, hint:"Có 5, bớt đi 2 🍬", explanation:"\\(5 - 2 = 3\\)" },
          { id:"g1s2", question:"\\(4 - 1 = ?\\)", options:["2","4","3","5"], correctAnswer:2, hint:"Chỉ bớt 1 thôi!", explanation:"\\(4 - 1 = 3\\)" },
          { id:"g1s3", question:"\\(6 - 3 = ?\\)", options:["2","4","3","1"], correctAnswer:2, hint:"6 chia đôi 🎂", explanation:"\\(6 - 3 = 3\\)" },
          { id:"g1s4", question:"\\(7 - 4 = ?\\)", options:["2","4","3","1"], correctAnswer:2, hint:"Đếm ngược từ 7 nhé!", explanation:"\\(7 - 4 = 3\\)" },
          { id:"g1s5", question:"\\(8 - 5 = ?\\)", options:["2","4","3","1"], correctAnswer:2, hint:"8 kẹo ăn mất 5 🍭", explanation:"\\(8 - 5 = 3\\)" },
          { id:"g1s6", question:"\\(9 - 6 = ?\\)", options:["2","4","3","1"], correctAnswer:2, hint:"Bớt nhiều rồi nè!", explanation:"\\(9 - 6 = 3\\)" },
          { id:"g1s7", question:"\\(3 - 1 = ?\\)", options:["3","1","2","0"], correctAnswer:2, hint:"3 bút chì ✏️ cho bạn 1 cái", explanation:"\\(3 - 1 = 2\\)" },
          { id:"g1s8", question:"\\(10 - 5 = ?\\)", options:["4","6","5","3"], correctAnswer:2, hint:"10 ngón tay, gập 5 ngón ✋", explanation:"\\(10 - 5 = 5\\)" }
        ]
      }
    }
  },

  2: {
    label: "Lớp 2",
    emoji: "🌈",
    color: "#F39C12",
    topics: {
      addition: {
        label: "Phép Cộng (đến 100)",
        icon: "➕",
        questions: [
          { id:"g2a1", question:"\\(15 + 23 = ?\\)", options:["36","38","37","40"], correctAnswer:1, explanation:"\\(15 + 23 = 38\\)" },
          { id:"g2a2", question:"\\(27 + 31 = ?\\)", options:["57","58","56","60"], correctAnswer:1, explanation:"\\(27 + 31 = 58\\)" },
          { id:"g2a3", question:"\\(44 + 25 = ?\\)", options:["68","70","69","67"], correctAnswer:2, explanation:"\\(44 + 25 = 69\\)" },
          { id:"g2a4", question:"\\(36 + 42 = ?\\)", options:["76","80","78","77"], correctAnswer:2, explanation:"\\(36 + 42 = 78\\)" },
          { id:"g2a5", question:"\\(18 + 19 = ?\\)", options:["36","38","37","35"], correctAnswer:2, explanation:"\\(18 + 19 = 37\\)" },
          { id:"g2a6", question:"\\(50 + 25 = ?\\)", options:["70","74","75","80"], correctAnswer:2, explanation:"\\(50 + 25 = 75\\)" },
          { id:"g2a7", question:"\\(33 + 44 = ?\\)", options:["76","78","77","75"], correctAnswer:2, explanation:"\\(33 + 44 = 77\\)" },
          { id:"g2a8", question:"\\(29 + 45 = ?\\)", options:["73","75","74","72"], correctAnswer:2, explanation:"\\(29 + 45 = 74\\)" }
        ]
      },
      subtraction: {
        label: "Phép Trừ (đến 100)",
        icon: "➖",
        questions: [
          { id:"g2s1", question:"\\(45 - 12 = ?\\)", options:["32","34","33","31"], correctAnswer:2, explanation:"\\(45 - 12 = 33\\)" },
          { id:"g2s2", question:"\\(67 - 25 = ?\\)", options:["41","43","42","40"], correctAnswer:2, explanation:"\\(67 - 25 = 42\\)" },
          { id:"g2s3", question:"\\(80 - 35 = ?\\)", options:["44","46","45","43"], correctAnswer:2, explanation:"\\(80 - 35 = 45\\)" },
          { id:"g2s4", question:"\\(53 - 28 = ?\\)", options:["24","26","25","23"], correctAnswer:2, explanation:"\\(53 - 28 = 25\\)" },
          { id:"g2s5", question:"\\(99 - 50 = ?\\)", options:["48","50","49","47"], correctAnswer:2, explanation:"\\(99 - 50 = 49\\)" },
          { id:"g2s6", question:"\\(71 - 36 = ?\\)", options:["34","36","35","33"], correctAnswer:2, explanation:"\\(71 - 36 = 35\\)" },
          { id:"g2s7", question:"\\(62 - 18 = ?\\)", options:["43","45","44","42"], correctAnswer:2, explanation:"\\(62 - 18 = 44\\)" },
          { id:"g2s8", question:"\\(88 - 39 = ?\\)", options:["48","50","49","47"], correctAnswer:2, explanation:"\\(88 - 39 = 49\\)" }
        ]
      }
    }
  },

  3: {
    label: "Lớp 3",
    emoji: "🚀",
    color: "#2ECC71",
    topics: {
      multiplication: {
        label: "Phép Nhân",
        icon: "✖️",
        questions: [
          { id:"g3m1", question:"\\(6 \\times 7 = ?\\)", options:["40","41","42","43"], correctAnswer:2, explanation:"\\(6 \\times 7 = 42\\)" },
          { id:"g3m2", question:"\\(8 \\times 5 = ?\\)", options:["35","40","45","50"], correctAnswer:1, explanation:"\\(8 \\times 5 = 40\\)" },
          { id:"g3m3", question:"\\(9 \\times 4 = ?\\)", options:["32","34","36","38"], correctAnswer:2, explanation:"\\(9 \\times 4 = 36\\)" },
          { id:"g3m4", question:"\\(7 \\times 8 = ?\\)", options:["54","56","58","48"], correctAnswer:1, explanation:"\\(7 \\times 8 = 56\\)" },
          { id:"g3m5", question:"\\(3 \\times 9 = ?\\)", options:["24","27","30","21"], correctAnswer:1, explanation:"\\(3 \\times 9 = 27\\)" },
          { id:"g3m6", question:"\\(5 \\times 6 = ?\\)", options:["25","28","30","35"], correctAnswer:2, explanation:"\\(5 \\times 6 = 30\\)" },
          { id:"g3m7", question:"\\(4 \\times 7 = ?\\)", options:["24","26","28","30"], correctAnswer:2, explanation:"\\(4 \\times 7 = 28\\)" },
          { id:"g3m8", question:"\\(9 \\times 9 = ?\\)", options:["72","81","90","99"], correctAnswer:1, explanation:"\\(9 \\times 9 = 81\\)" }
        ]
      },
      division: {
        label: "Phép Chia",
        icon: "➗",
        questions: [
          { id:"g3d1", question:"\\(36 \\div 6 = ?\\)", options:["5","6","7","8"], correctAnswer:1, explanation:"\\(36 \\div 6 = 6\\)" },
          { id:"g3d2", question:"\\(45 \\div 9 = ?\\)", options:["4","5","6","7"], correctAnswer:1, explanation:"\\(45 \\div 9 = 5\\)" },
          { id:"g3d3", question:"\\(56 \\div 7 = ?\\)", options:["6","7","8","9"], correctAnswer:2, explanation:"\\(56 \\div 7 = 8\\)" },
          { id:"g3d4", question:"\\(48 \\div 8 = ?\\)", options:["5","6","7","8"], correctAnswer:1, explanation:"\\(48 \\div 8 = 6\\)" },
          { id:"g3d5", question:"\\(72 \\div 9 = ?\\)", options:["7","8","9","6"], correctAnswer:1, explanation:"\\(72 \\div 9 = 8\\)" },
          { id:"g3d6", question:"\\(63 \\div 7 = ?\\)", options:["7","8","9","10"], correctAnswer:2, explanation:"\\(63 \\div 7 = 9\\)" },
          { id:"g3d7", question:"\\(40 \\div 5 = ?\\)", options:["6","7","8","9"], correctAnswer:2, explanation:"\\(40 \\div 5 = 8\\)" },
          { id:"g3d8", question:"\\(54 \\div 6 = ?\\)", options:["7","8","9","10"], correctAnswer:2, explanation:"\\(54 \\div 6 = 9\\)" }
        ]
      }
    }
  },

  4: {
    label: "Lớp 4",
    emoji: "🔬",
    color: "#4ECDC4",
    topics: {
      fractions: {
        label: "Phân Số",
        icon: "🔢",
        questions: [
          { id:"g4f1", question:"Tính: \\(\\dfrac{1}{3} + \\dfrac{1}{3} = ?\\)", options:["\\(\\dfrac{2}{3}\\)","\\(\\dfrac{1}{6}\\)","\\(\\dfrac{2}{6}\\)","\\(\\dfrac{1}{3}\\)"], correctAnswer:0, explanation:"Cùng mẫu: \\(\\dfrac{1+1}{3} = \\dfrac{2}{3}\\)" },
          { id:"g4f2", question:"Tính: \\(\\dfrac{3}{4} + \\dfrac{1}{4} = ?\\)", options:["\\(1\\)","\\(\\dfrac{4}{8}\\)","\\(\\dfrac{3}{4}\\)","\\(\\dfrac{1}{2}\\)"], correctAnswer:0, explanation:"\\(\\dfrac{3+1}{4} = \\dfrac{4}{4} = 1\\)" },
          { id:"g4f3", question:"Tính: \\(\\dfrac{5}{6} - \\dfrac{1}{6} = ?\\)", options:["\\(\\dfrac{4}{6}\\)","\\(\\dfrac{2}{3}\\)","\\(\\dfrac{5}{6}\\)","Cả A và B"], correctAnswer:3, explanation:"\\(\\dfrac{5-1}{6} = \\dfrac{4}{6} = \\dfrac{2}{3}\\). Cả hai đều đúng!" },
          { id:"g4f4", question:"So sánh: \\(\\dfrac{2}{5}\\) và \\(\\dfrac{3}{5}\\)", options:["\\(\\dfrac{2}{5} > \\dfrac{3}{5}\\)","\\(\\dfrac{2}{5} < \\dfrac{3}{5}\\)","Bằng nhau","Không so sánh được"], correctAnswer:1, explanation:"Cùng mẫu, tử lớn hơn thì phân số lớn hơn: \\(2 < 3\\)" },
          { id:"g4f5", question:"Rút gọn: \\(\\dfrac{6}{8} = ?\\)", options:["\\(\\dfrac{3}{4}\\)","\\(\\dfrac{2}{4}\\)","\\(\\dfrac{3}{8}\\)","\\(\\dfrac{6}{4}\\)"], correctAnswer:0, explanation:"Chia cả tử và mẫu cho 2: \\(\\dfrac{6÷2}{8÷2} = \\dfrac{3}{4}\\)" },
          { id:"g4f6", question:"Tính: \\(\\dfrac{1}{2} + \\dfrac{1}{4} = ?\\)", options:["\\(\\dfrac{2}{6}\\)","\\(\\dfrac{3}{4}\\)","\\(\\dfrac{1}{3}\\)","\\(\\dfrac{2}{4}\\)"], correctAnswer:1, explanation:"Quy đồng: \\(\\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4}\\)" },
          { id:"g4f7", question:"\\(\\dfrac{2}{3}\\) của 12 = ?", options:["6","8","4","10"], correctAnswer:1, explanation:"\\(\\dfrac{2}{3} \\times 12 = \\dfrac{24}{3} = 8\\)" },
          { id:"g4f8", question:"Tính: \\(\\dfrac{7}{10} - \\dfrac{3}{10} = ?\\)", options:["\\(\\dfrac{4}{10}\\)","\\(\\dfrac{2}{5}\\)","\\(\\dfrac{10}{10}\\)","Cả A và B"], correctAnswer:3, explanation:"\\(\\dfrac{7-3}{10} = \\dfrac{4}{10} = \\dfrac{2}{5}\\)" }
        ]
      },
      decimals: {
        label: "Số Thập Phân",
        icon: "🔣",
        questions: [
          { id:"g4d1", question:"\\(0{,}5 + 0{,}3 = ?\\)", options:["0,7","0,8","0,9","1,0"], correctAnswer:1, explanation:"\\(0{,}5 + 0{,}3 = 0{,}8\\)" },
          { id:"g4d2", question:"\\(1{,}2 + 0{,}8 = ?\\)", options:["1,8","1,0","2,0","2,2"], correctAnswer:2, explanation:"\\(1{,}2 + 0{,}8 = 2{,}0\\)" },
          { id:"g4d3", question:"\\(3{,}5 - 1{,}2 = ?\\)", options:["2,1","2,3","2,5","2,2"], correctAnswer:1, explanation:"\\(3{,}5 - 1{,}2 = 2{,}3\\)" },
          { id:"g4d4", question:"\\(0{,}25 + 0{,}75 = ?\\)", options:["0,9","1,0","0,1","1,0"], correctAnswer:1, explanation:"\\(0{,}25 + 0{,}75 = 1{,}0\\)" },
          { id:"g4d5", question:"So sánh: \\(0{,}6\\) và \\(0{,}45\\)", options:["\\(0{,}6 < 0{,}45\\)","\\(0{,}6 > 0{,}45\\)","Bằng nhau","Không biết"], correctAnswer:1, explanation:"\\(0{,}60 > 0{,}45\\) vì \\(60 > 45\\)" },
          { id:"g4d6", question:"\\(2{,}5 \\times 2 = ?\\)", options:["4,5","5,0","4,0","5,5"], correctAnswer:1, explanation:"\\(2{,}5 \\times 2 = 5{,}0\\)" },
          { id:"g4d7", question:"\\(6{,}4 - 3{,}9 = ?\\)", options:["2,3","2,5","3,5","2,4"], correctAnswer:1, explanation:"\\(6{,}4 - 3{,}9 = 2{,}5\\)" },
          { id:"g4d8", question:"Viết dưới dạng phân số: \\(0{,}75 = ?\\)", options:["\\(\\dfrac{3}{4}\\)","\\(\\dfrac{7}{5}\\)","\\(\\dfrac{7}{10}\\)","\\(\\dfrac{1}{4}\\)"], correctAnswer:0, explanation:"\\(0{,}75 = \\dfrac{75}{100} = \\dfrac{3}{4}\\)" }
        ]
      }
    }
  },

  5: {
    label: "Lớp 5",
    emoji: "🏆",
    color: "#6C63FF",
    topics: {
      advanced_fractions: {
        label: "Phân Số Nâng Cao",
        icon: "📐",
        questions: [
          { id:"g5f1", question:"Tính: \\(\\dfrac{2}{3} \\times \\dfrac{3}{4} = ?\\)", options:["\\(\\dfrac{6}{12}\\)","\\(\\dfrac{1}{2}\\)","\\(\\dfrac{5}{7}\\)","Cả A và B"], correctAnswer:3, explanation:"\\(\\dfrac{2 \\times 3}{3 \\times 4} = \\dfrac{6}{12} = \\dfrac{1}{2}\\)" },
          { id:"g5f2", question:"Tính: \\(\\dfrac{3}{5} \\div \\dfrac{1}{2} = ?\\)", options:["\\(\\dfrac{3}{10}\\)","\\(\\dfrac{6}{5}\\)","\\(\\dfrac{5}{6}\\)","\\(\\dfrac{1}{5}\\)"], correctAnswer:1, explanation:"\\(\\dfrac{3}{5} \\times \\dfrac{2}{1} = \\dfrac{6}{5}\\)" },
          { id:"g5f3", question:"Tính: \\(\\dfrac{5}{8} + \\dfrac{3}{4} = ?\\)", options:["\\(\\dfrac{8}{12}\\)","\\(\\dfrac{11}{8}\\)","\\(\\dfrac{8}{8}\\)","\\(\\dfrac{15}{32}\\)"], correctAnswer:1, explanation:"Quy đồng: \\(\\dfrac{5}{8} + \\dfrac{6}{8} = \\dfrac{11}{8}\\)" },
          { id:"g5f4", question:"Tính: \\(2\\dfrac{1}{3} + 1\\dfrac{2}{3} = ?\\)", options:["3","4","\\(3\\dfrac{1}{3}\\)","\\(4\\dfrac{1}{3}\\)"], correctAnswer:1, explanation:"\\(2 + 1 = 3\\); \\(\\dfrac{1}{3} + \\dfrac{2}{3} = 1\\); \\(3 + 1 = 4\\)" },
          { id:"g5f5", question:"Tính: \\(\\dfrac{4}{9} \\times 18 = ?\\)", options:["6","8","10","12"], correctAnswer:1, explanation:"\\(\\dfrac{4 \\times 18}{9} = \\dfrac{72}{9} = 8\\)" },
          { id:"g5f6", question:"Tính: \\(1 - \\dfrac{3}{7} = ?\\)", options:["\\(\\dfrac{3}{7}\\)","\\(\\dfrac{4}{7}\\)","\\(\\dfrac{7}{3}\\)","\\(\\dfrac{1}{7}\\)"], correctAnswer:1, explanation:"\\(\\dfrac{7}{7} - \\dfrac{3}{7} = \\dfrac{4}{7}\\)" }
        ]
      },
      word_problems: {
        label: "Toán Có Lời Văn",
        icon: "📝",
        questions: [
          { id:"g5w1", question:"An có 24 viên bi. An cho Bình \\(\\dfrac{1}{3}\\) số bi. Hỏi An còn bao nhiêu viên bi?", options:["8","12","16","20"], correctAnswer:2, explanation:"Cho: \\(24 \\times \\dfrac{1}{3} = 8\\). Còn: \\(24 - 8 = 16\\)" },
          { id:"g5w2", question:"Một hình chữ nhật có chiều dài \\(12{,}5\\) cm và chiều rộng \\(8\\) cm. Tính chu vi.", options:["41 cm","40 cm","20,5 cm","40,5 cm"], correctAnswer:0, explanation:"Chu vi = \\((12{,}5 + 8) \\times 2 = 20{,}5 \\times 2 = 41\\) cm" },
          { id:"g5w3", question:"Lớp 5A có 40 học sinh, trong đó \\(\\dfrac{3}{5}\\) là nữ. Hỏi lớp có bao nhiêu học sinh nữ?", options:["20","24","25","30"], correctAnswer:1, explanation:"Nữ = \\(40 \\times \\dfrac{3}{5} = \\dfrac{120}{5} = 24\\) học sinh" },
          { id:"g5w4", question:"Một cửa hàng bán \\(125{,}5\\) kg gạo buổi sáng và \\(98{,}7\\) kg buổi chiều. Hỏi cả ngày bán bao nhiêu kg?", options:["223,2 kg","224,2 kg","225,2 kg","222,2 kg"], correctAnswer:1, explanation:"\\(125{,}5 + 98{,}7 = 224{,}2\\) kg" },
          { id:"g5w5", question:"Diện tích hình tam giác có đáy \\(10\\) cm, chiều cao \\(6\\) cm là bao nhiêu?", options:["60 cm²","30 cm²","16 cm²","36 cm²"], correctAnswer:1, explanation:"\\(S = \\dfrac{10 \\times 6}{2} = 30\\) cm²" },
          { id:"g5w6", question:"Mẹ mua \\(2{,}5\\) kg thịt, giá \\(120\\,000\\) đồng/kg. Mẹ phải trả bao nhiêu?", options:["250 000đ","280 000đ","300 000đ","320 000đ"], correctAnswer:2, explanation:"\\(2{,}5 \\times 120\\,000 = 300\\,000\\) đồng" }
        ]
      }
    }
  }
};

// Topic icons mapping
const TOPIC_ICONS = {
  addition: "➕", subtraction: "➖", multiplication: "✖️",
  division: "➗", fractions: "🔢", decimals: "🔣",
  advanced_fractions: "📐", word_problems: "📝"
};
