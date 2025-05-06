document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    const scoreSection = document.getElementById('score-section');
    const scoreDisplay = document.getElementById('score');
    const scoreAnalysis = document.getElementById('score-analysis');

    // 正確答案
    const correctAnswers = {
        q1: 'b',
        q2: 'c',
        q3: 'b',
        q4: 'c',
        q5: 'b',
        q6: 'b',
        q7: 'b',
        q8: 'c',
        q9: 'b',
        q10: 'b'
    };

    // 問題解釋
    const explanations = {
        q1: {
            correct: '正確！日月光主要業務是半導體測試與封裝，是全球最大的半導體封裝測試大廠。',
            incorrect: '不正確。日月光主要業務是半導體測試與封裝，是全球最大的半導體封裝測試大廠。'
        },
        q2: {
            correct: '正確！日月光採用12小時一班的四班二輪制度，大約每2-3個月輪一次早晚班。',
            incorrect: '不正確。日月光採用12小時一班的四班二輪制度（做2休2），大約每2-3個月輪一次早晚班。'
        },
        q3: {
            correct: '正確！設備工程師主要負責半導體機台的維修、維護、保養與故障排除。',
            incorrect: '不正確。設備工程師主要負責半導體機台的維修、維護、保養與故障排除。'
        },
        q4: {
            correct: '正確！表達對公司專業領域的認同和興趣是最佳回答。',
            incorrect: '不正確。最好的回答是表達對日月光作為封裝測試大廠的認同，以及希望在專業領域發展的意願。'
        },
        q5: {
            correct: '正確！描述一個挫折經驗並說明如何克服和學習是最佳回答。',
            incorrect: '不正確。面試時應該描述一個真實的挫折經驗，並重點說明如何克服困難及從中學習成長。'
        },
        q6: {
            correct: '正確！日月光的工作環境需要穿無塵衣，且進公司禁止攜帶智慧型手機。',
            incorrect: '不正確。日月光的工作環境需要穿無塵衣，且進公司禁止攜帶智慧型手機。'
        },
        q7: {
            correct: '正確！自我介紹最好控制在1-2分鐘，並與應徵職位相關。',
            incorrect: '不正確。自我介紹最好控制在1-2分鐘，內容應與應徵職位相關，不要過長或過短。'
        },
        q8: {
            correct: '正確！說出曾有的缺點並強調如何改善，展現自我成長能力。',
            incorrect: '不正確。最佳回答是說出曾有的缺點，但重點放在如何改善和克服，展現自我成長能力。'
        },
        q9: {
            correct: '正確！日月光提供年盈餘分紅、三節獎金、健身房、員工餐飲等多項福利。',
            incorrect: '不正確。日月光提供年盈餘分紅(5%-7%)、三節獎金、健身房、員工餐飲等多項福利。'
        },
        q10: {
            correct: '正確！詢問工作的詳細目標與責任，或主管對這個職位的期望是最佳回答。',
            incorrect: '不正確。最佳回答是詢問工作的詳細目標與責任，或主管對這個職位的期望，展現對工作本身的興趣。'
        }
    };

    // 分類問題類型
    const questionCategories = {
        companyKnowledge: ['q1', 'q6', 'q9'],
        jobSpecific: ['q2', 'q3'],
        interviewSkills: ['q4', 'q5', 'q7', 'q8', 'q10']
    };

    // 提交表單處理
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let score = 0;
        let incorrectQuestions = {
            companyKnowledge: 0,
            jobSpecific: 0,
            interviewSkills: 0
        };

        // 檢查每個問題的答案
        for (let i = 1; i <= 10; i++) {
            const questionName = `q${i}`;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            const feedbackElement = document.getElementById(`${questionName}-feedback`);

            if (selectedOption) {
                const userAnswer = selectedOption.value;
                const isCorrect = userAnswer === correctAnswers[questionName];

                // 顯示反饋
                feedbackElement.innerHTML = `
                    <h4>${isCorrect ? '✓ 正確' : '✗ 錯誤'}</h4>
                    <p>${isCorrect ? explanations[questionName].correct : explanations[questionName].incorrect}</p>
                `;
                feedbackElement.classList.remove('hidden');
                feedbackElement.classList.add(isCorrect ? 'correct' : 'incorrect');

                // 更新分數
                if (isCorrect) {
                    score++;
                } else {
                    // 記錄錯誤類型
                    for (const category in questionCategories) {
                        if (questionCategories[category].includes(questionName)) {
                            incorrectQuestions[category]++;
                            break;
                        }
                    }
                }
            }
        }

        // 顯示分數
        scoreDisplay.textContent = score;
        scoreSection.classList.remove('hidden');

        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 生成分析報告
        generateAnalysis(incorrectQuestions, score);

        // 禁用提交按鈕
        submitBtn.disabled = true;
        submitBtn.textContent = '已提交';
    });

    // 生成分析報告
    function generateAnalysis(incorrectQuestions, score) {
        let analysisHTML = '';

        if (score === 10) {
            analysisHTML = '<p>恭喜！您完全掌握了日月光面試的所有知識點。您已經準備好參加面試了！</p>';
        } else {
            analysisHTML = '<p>您的測驗結果分析：</p><ul>';

            // 公司知識分析
            const companyKnowledgeTotal = questionCategories.companyKnowledge.length;
            const companyKnowledgeCorrect = companyKnowledgeTotal - incorrectQuestions.companyKnowledge;
            analysisHTML += `<li><strong>公司知識：</strong> ${companyKnowledgeCorrect}/${companyKnowledgeTotal} 正確`;
            if (incorrectQuestions.companyKnowledge > 0) {
                analysisHTML += ' - 建議加強對日月光公司背景、業務和福利的了解。';
            }
            analysisHTML += '</li>';

            // 工作特定知識分析
            const jobSpecificTotal = questionCategories.jobSpecific.length;
            const jobSpecificCorrect = jobSpecificTotal - incorrectQuestions.jobSpecific;
            analysisHTML += `<li><strong>工作知識：</strong> ${jobSpecificCorrect}/${jobSpecificTotal} 正確`;
            if (incorrectQuestions.jobSpecific > 0) {
                analysisHTML += ' - 建議更深入了解日月光的工作內容和輪班制度。';
            }
            analysisHTML += '</li>';

            // 面試技巧分析
            const interviewSkillsTotal = questionCategories.interviewSkills.length;
            const interviewSkillsCorrect = interviewSkillsTotal - incorrectQuestions.interviewSkills;
            analysisHTML += `<li><strong>面試技巧：</strong> ${interviewSkillsCorrect}/${interviewSkillsTotal} 正確`;
            if (incorrectQuestions.interviewSkills > 0) {
                analysisHTML += ' - 建議加強面試回答技巧，尤其是自我介紹和常見問題的回答方式。';
            }
            analysisHTML += '</li></ul>';

            // 總體建議
            if (score < 5) {
                analysisHTML += '<p><strong>總體建議：</strong> 您需要更多準備才能應對日月光面試。建議深入了解公司背景和面試技巧。</p>';
            } else if (score < 8) {
                analysisHTML += '<p><strong>總體建議：</strong> 您對日月光面試有基本了解，但仍需加強某些方面的知識。</p>';
            } else {
                analysisHTML += '<p><strong>總體建議：</strong> 您對日月光面試準備得很充分，只需小幅調整即可。</p>';
            }
        }

        scoreAnalysis.innerHTML = analysisHTML;
    }
});
