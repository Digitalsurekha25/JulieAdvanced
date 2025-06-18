// --- Global Constants for Roulette Definitions ---
const WHEEL_BASED_GROUPS = {
    voisins: { name: "Voisins (Neighbours of Zero)", numbers: [22, 18, 29, 7, 28, 19, 4, 21, 2, 25] },
    tiers: { name: "Tiers du Cylindre", numbers: [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33] },
    orphelins: { name: "Orphelins", numbers: [17, 34, 6, 1, 20, 14, 31, 9] },
    zeroSpiel: { name: "Zero Spiel", numbers: [12, 35, 3, 26, 0, 32, 15] }
};

const TABLE_BASED_GROUPS = {
    dozens: {
        name: "Dozens",
        firstDozen: { name: "1st Dozen", numbers: Array.from({ length: 12 }, (_, i) => i + 1) },
        secondDozen: { name: "2nd Dozen", numbers: Array.from({ length: 12 }, (_, i) => i + 13) },
        thirdDozen: { name: "3rd Dozen", numbers: Array.from({ length: 12 }, (_, i) => i + 25) }
    },
    columns: {
        name: "Columns",
        firstColumn: { name: "Column 1", numbers: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34] },
        secondColumn: { name: "Column 2", numbers: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35] },
        thirdColumn: { name: "Column 3", numbers: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36] }
    },
    rows: { name: "Rows (Horizontal)" }, // Populated dynamically
    diagonals: {
        name: "Diagonals",
        diag1_5_9: { name: "Diagonal 1-5-9", numbers: [1, 5, 9] },
        diag3_5_7: { name: "Diagonal 3-5-7", numbers: [3, 5, 7] },
        diag2_6_10: { name: "Diagonal 2-6-10", numbers: [2, 6, 10] }
    },
    quadrants: {
        name: "Quadrants (Table Zones)",
        q1: { name: "Quadrant 1 (1-9)", numbers: Array.from({ length: 9 }, (_, i) => i + 1) },
        q2: { name: "Quadrant 2 (10-18)", numbers: Array.from({ length: 9 }, (_, i) => i + 10) },
        q3: { name: "Quadrant 3 (19-27)", numbers: Array.from({ length: 9 }, (_, i) => i + 19) },
        q4: { name: "Quadrant 4 (28-36)", numbers: Array.from({ length: 9 }, (_, i) => i + 28) }
    }
};

// Dynamically populate rows
for (let i = 0; i < 12; i++) {
    const startNum = i * 3 + 1;
    TABLE_BASED_GROUPS.rows[`row\${startNum}_\${startNum + 1}_\${startNum + 2}`] = {
        name: `Row \${startNum}-\${startNum + 1}-\${startNum + 2}`,
        numbers: [startNum, startNum + 1, startNum + 2]
    };
}

const RACETRACK_BET_TYPES = {
    finalesEnPlein: { name: "Finales en Plein" }, // Populated dynamically
    finalesACheval: { name: "Finales à Cheval" } // Populated dynamically
};

for (let i = 0; i <= 9; i++) {
    const numbers = [];
    for (let j = 0; j <= 36; j++) {
        if (j % 10 === i) { numbers.push(j); }
    }
    RACETRACK_BET_TYPES.finalesEnPlein[`finale\${i}`] = { name: `Finale \${i}`, numbers: numbers };
}

const chevalPairs = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]];
chevalPairs.forEach(pair => {
    const numbers = [];
    for (let j = 0; j <= 36; j++) {
        if (j % 10 === pair[0] || j % 10 === pair[1]) { numbers.push(j); }
    }
    RACETRACK_BET_TYPES.finalesACheval[`finale\${pair[0]}_\${pair[1]}`] = {
        name: `Finale \${pair[0]}/\${pair[1]}`,
        numbers: numbers.sort((a, b) => a - b)
    };
});

const BASIC_TRENDS_DEFINITIONS = {
    redNumbers: { name: "Red", numbers: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36] },
    blackNumbers: { name: "Black", numbers: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35] },
    evenNumbers: { name: "Even", numbers: Array.from({ length: 18 }, (_, i) => (i + 1) * 2) }, // 2 to 36
    oddNumbers: { name: "Odd", numbers: Array.from({ length: 18 }, (_, i) => i * 2 + 1) }, // 1 to 35
    lowNumbers: { name: "Low (1-18)", numbers: Array.from({ length: 18 }, (_, i) => i + 1) },
    highNumbers: { name: "High (19-36)", numbers: Array.from({ length: 18 }, (_, i) => i + 19) }
};

const EURO_WHEEL_ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

const WHEEL_SEGMENTS = {
    segment1: { name: `Wheel Segment 1 (\${EURO_WHEEL_ORDER.slice(0,3).join(',')}...\${EURO_WHEEL_ORDER.slice(9,12).join(',')})`, numbers: EURO_WHEEL_ORDER.slice(0, 12) },
    segment2: { name: `Wheel Segment 2 (\${EURO_WHEEL_ORDER.slice(12,15).join(',')}...\${EURO_WHEEL_ORDER.slice(21,24).join(',')})`, numbers: EURO_WHEEL_ORDER.slice(12, 24) },
    segment3: { name: `Wheel Segment 3 (\${EURO_WHEEL_ORDER.slice(24,27).join(',')}...\${EURO_WHEEL_ORDER.slice(34,37).join(',')})`, numbers: EURO_WHEEL_ORDER.slice(24, 37) }
};
// --- End of Global Constants ---

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element references
    const resultInput = document.getElementById('result-input');
    const submitButton = document.getElementById('submit-result');
    const resetButton = document.getElementById('reset-results');
    const resultsList = document.getElementById('results-list');
    const filterSelect = document.getElementById('filter-select');
    const numberFrequencyDiv = document.getElementById('number-frequency');
    const groupAnalysisDiv = document.getElementById('group-analysis');
    const analysisOutputDiv = document.getElementById('analysis-output'); 
    const mainElement = document.querySelector('main');

    const customGroupNameInput = document.getElementById('custom-group-name');
    const customGroupNumbersInput = document.getElementById('custom-group-numbers');
    const saveCustomGroupButton = document.getElementById('save-custom-group');
    const customGroupsListUl = document.getElementById('custom-groups-list');

    const neighbourCenterNumberInput = document.getElementById('neighbour-center-number');
    const neighbourCountInput = document.getElementById('neighbour-count');
    const analyzeNeighbourBetButton = document.getElementById('analyze-neighbour-bet');
    const neighbourBetAnalysisResultDiv = document.getElementById('neighbour-bet-analysis-result');

    const currentDealerIdInput = document.getElementById('current-dealer-id');
    const setDealerIdButton = document.getElementById('set-dealer-id');
    const activeDealerDisplay = document.getElementById('active-dealer-display');
    const filterByDealerCheckbox = document.getElementById('filter-by-dealer-checkbox');
    const activeDealerFilterDisplay = document.getElementById('active-dealer-filter-display');

    // --- Global State Variables ---
    let results = []; 
    let customGroups = [];
    let currentDealerId = 'Default';
    let sessionStartTime = Date.now();
    let sessionIntervalId = null;
    let currentHotNumbers = [];

    // --- Storage Keys ---
    const RESULTS_STORAGE_KEY = 'rouletteResults';
    const CUSTOM_GROUPS_STORAGE_KEY = 'rouletteCustomGroups';
    const DEALER_ID_STORAGE_KEY = 'rouletteCurrentDealerId';
    const SESSION_START_TIME_KEY = 'rouletteSessionStartTime';

    // --- Bias Analysis Constants (Scoped to DOMContentLoaded) ---
    const EXPECTED_SECTOR_PERCENTAGES_BIAS = {};
    for (const key in WHEEL_BASED_GROUPS) { 
        if (WHEEL_BASED_GROUPS.hasOwnProperty(key)) {
            EXPECTED_SECTOR_PERCENTAGES_BIAS[WHEEL_BASED_GROUPS[key].name] = (WHEEL_BASED_GROUPS[key].numbers.length / 37) * 100;
        }
    }
    const EXPECTED_SEGMENT_PERCENTAGES = {
        [WHEEL_SEGMENTS.segment1.name]: (WHEEL_SEGMENTS.segment1.numbers.length / 37) * 100,
        [WHEEL_SEGMENTS.segment2.name]: (WHEEL_SEGMENTS.segment2.numbers.length / 37) * 100,
        [WHEEL_SEGMENTS.segment3.name]: (WHEEL_SEGMENTS.segment3.numbers.length / 37) * 100,
    };
    const HOT_THRESHOLD_MULTIPLIER = 1.5;
    const COLD_THRESHOLD_MULTIPLIER = 0.5;
    const MIN_HITS_FOR_HOT = 5;
    const MIN_TOTAL_SPINS_FOR_COLD = 20;

    // --- Helper Functions ---
    const countHitsInGroup = (groupNumbers, dataToAnalyze) => {
        if (!dataToAnalyze || !Array.isArray(dataToAnalyze)) return 0;
        return dataToAnalyze.filter(item => groupNumbers.includes(item.number)).length;
    };

    const appendAnalysisToDivGeneric = (groupName, groupNumbers, dataToAnalyze, targetDiv, biasIndicator = "", biasType = "") => {
        const count = countHitsInGroup(groupNumbers, dataToAnalyze);
        let percentage = 0;
        if (dataToAnalyze.length > 0) {
            percentage = (count / dataToAnalyze.length) * 100;
        }
        const p = document.createElement('p');
        p.textContent = `${groupName}: ${count} hit(s) (${percentage.toFixed(2)}%) ${biasIndicator}`;
        if (biasType === "Hot") { p.style.backgroundColor = 'rgba(255, 0, 0, 0.15)'; }
        else if (biasType === "Cold") { p.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'; }
        else if (biasType === "Average") { p.style.backgroundColor = 'rgba(211, 211, 211, 0.3)'; }
        targetDiv.appendChild(p);
    };

    const getWheelSector = (number) => {
        for (const key in WHEEL_BASED_GROUPS) {
            if (WHEEL_BASED_GROUPS[key].numbers.includes(number)) {
                return WHEEL_BASED_GROUPS[key].name;
            }
        }
        return null;
    };

    const getNumberColor = (number) => {
        if (number === 0) return 'Green';
        if (BASIC_TRENDS_DEFINITIONS.redNumbers.numbers.includes(number)) return 'Red';
        if (BASIC_TRENDS_DEFINITIONS.blackNumbers.numbers.includes(number)) return 'Black';
        return null;
    };

    const getDigitSum = (number) => {
        if (number < 0) return -1; 
        let sum = number;
        while (sum >= 10) {
            sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        }
        return sum;
    };

    const formatDuration = (ms) => {
        if (ms < 0) ms = 0;
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // --- Session Management ---
    const loadSessionStartTime = () => {
        const storedTime = localStorage.getItem(SESSION_START_TIME_KEY);
        if (storedTime) {
            sessionStartTime = parseInt(storedTime, 10);
        } else {
            sessionStartTime = Date.now();
            localStorage.setItem(SESSION_START_TIME_KEY, sessionStartTime.toString());
        }
    };

    const resetSession = () => {
        sessionStartTime = Date.now();
        localStorage.setItem(SESSION_START_TIME_KEY, sessionStartTime.toString());
    };

    const updateSessionTrackerDisplay = () => {
        let sessionTrackerPanel = document.getElementById('session-tracker-panel');
        if (!sessionTrackerPanel) {
            sessionTrackerPanel = document.createElement('div');
            sessionTrackerPanel.id = 'session-tracker-panel';
            sessionTrackerPanel.style.cssText = 'padding: 10px; background-color: #f9f9f9; border: 1px solid #eee; margin: 10px 0;';
            const alertPanel = document.getElementById('alert-panel');
            if (alertPanel && alertPanel.parentNode) {
                alertPanel.parentNode.insertBefore(sessionTrackerPanel, alertPanel.nextSibling);
            } else if (mainElement && mainElement.firstChild) {
                mainElement.insertBefore(sessionTrackerPanel, mainElement.firstChild);
            } else if (mainElement) {
                mainElement.appendChild(sessionTrackerPanel);
            } else {
                document.body.insertBefore(sessionTrackerPanel, document.body.firstChild);
            }
        }
        const startTimeFormatted = new Date(sessionStartTime).toLocaleString();
        const currentDuration = Date.now() - sessionStartTime;
        const durationFormatted = formatDuration(currentDuration);
        const spinCount = results.length;
        sessionTrackerPanel.innerHTML = `
            <h4>Session Information</h4>
            <p><strong>Session Started:</strong> ${startTimeFormatted}</p>
            <p><strong>Total Spins This Session:</strong> ${spinCount}</p>
            <p id="session-duration-display"><strong>Session Duration:</strong> ${durationFormatted}</p>
        `;
    };

    const updateLiveDuration = () => {
        const durationDisplay = document.getElementById('session-duration-display');
        if (durationDisplay) {
            const strongNode = durationDisplay.querySelector('strong');
            if (strongNode && strongNode.nextSibling && strongNode.nextSibling.nodeType === Node.TEXT_NODE) {
                strongNode.nextSibling.textContent = ` ${formatDuration(Date.now() - sessionStartTime)}`;
            } else { 
                 durationDisplay.innerHTML = `<strong>Session Duration:</strong> ${formatDuration(Date.now() - sessionStartTime)}`;
            }
        }
    };

    // --- Dealer ID Management ---
    const updateActiveDealerFilterDisplay = () => {
        if (activeDealerFilterDisplay) { 
            activeDealerFilterDisplay.textContent = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? currentDealerId : "N/A - Showing All";
        }
    };
    
    const loadCurrentDealerId = () => {
        const storedDealerId = localStorage.getItem(DEALER_ID_STORAGE_KEY);
        if (storedDealerId) {
            currentDealerId = storedDealerId;
        } else {
            currentDealerId = 'Default';
        }
        if(currentDealerIdInput) currentDealerIdInput.value = currentDealerId;
        if(activeDealerDisplay) activeDealerDisplay.textContent = currentDealerId;
        updateActiveDealerFilterDisplay();
    };

    const saveCurrentDealerId = () => {
        localStorage.setItem(DEALER_ID_STORAGE_KEY, currentDealerId);
    };

    if(setDealerIdButton) {
        setDealerIdButton.addEventListener('click', () => {
            const newDealerId = currentDealerIdInput.value.trim();
            if (newDealerId) {
                currentDealerId = newDealerId;
                if(activeDealerDisplay) activeDealerDisplay.textContent = currentDealerId;
                updateActiveDealerFilterDisplay();
                saveCurrentDealerId();
                alert(`Dealer ID set to: ${currentDealerId}. Analysis will update if filter is active.`);
                renderResults();
            } else {
                alert('Dealer ID cannot be empty.');
            }
        });
    } else { console.warn("setDealerIdButton not found"); }

    if(filterByDealerCheckbox) {
        filterByDealerCheckbox.addEventListener('change', () => {
            renderResults();
        });
    } else { console.warn("filterByDealerCheckbox not found"); }

    // --- Results Management ---
    const loadResults = () => {
        const storedResults = localStorage.getItem(RESULTS_STORAGE_KEY);
        if (storedResults) {
            try {
                const parsedResults = JSON.parse(storedResults);
                if (Array.isArray(parsedResults) && (parsedResults.length === 0 || (typeof parsedResults[0] === 'object' && parsedResults[0] !== null && 'number' in parsedResults[0]))) {
                    results = parsedResults;
                } else {
                    console.warn('Old results format detected or invalid data. Discarding and starting fresh.');
                    results = []; 
                    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify([]));
                }
            } catch (e) {
                console.error('Error parsing results from localStorage:', e);
                results = []; 
                localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify([]));
            }
        }
    };

    const saveResults = () => {
        localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
    };

    const renderResultsListDisplay = () => {
        if (!resultsList) { console.warn("resultsList element not found"); return; }
        resultsList.innerHTML = '';
        let resultsToDisplayObjects = results;
        if (filterSelect && filterSelect.value !== 'all') {
            const count = parseInt(filterSelect.value, 10);
            const actualCount = Math.min(count, resultsToDisplayObjects.length);
            resultsToDisplayObjects = resultsToDisplayObjects.slice(-actualCount);
        }
        resultsToDisplayObjects.forEach(resultObj => {
            const listItem = document.createElement('li');
            listItem.textContent = `${resultObj.number} (Dealer: ${resultObj.dealerId || 'N/A'})`;
            resultsList.appendChild(listItem);
        });
    };

    if(submitButton) {
        submitButton.addEventListener('click', () => {
            const inputValue = resultInput.value.trim();
            if (inputValue === '') { alert('Please enter a number.'); return; }
            const number = parseInt(inputValue, 10);
            if (isNaN(number) || number < 0 || number > 36) {
                alert('Invalid input. Please enter a number between 0 and 36.');
                if(resultInput) resultInput.value = ''; return;
            }
            const newResultObject = { number: number, dealerId: currentDealerId, timestamp: Date.now() };
            results.push(newResultObject);
            saveResults();
            renderResults();
            if(resultInput) resultInput.value = '';
        });
    } else { console.warn("submitButton not found"); }

    if(resetButton) {
        resetButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all results and start a new session?')) {
                results = [];
                saveResults();
                resetSession();
                renderResults();
            }
        });
    } else { console.warn("resetButton not found"); }
    
    if(filterSelect) {
        filterSelect.addEventListener('change', renderResultsListDisplay);
    } else { console.warn("filterSelect not found"); }

    // --- Custom Groups Management ---
    const loadCustomGroups = () => {
        const storedGroups = localStorage.getItem(CUSTOM_GROUPS_STORAGE_KEY);
        if (storedGroups) {
            try {
                customGroups = JSON.parse(storedGroups);
                 if (!Array.isArray(customGroups)) customGroups = [];
            } catch (e) {
                console.error("Error parsing custom groups:", e);
                customGroups = [];
            }
        }
        renderCustomGroupsList();
    };

    const saveCustomGroupsToStorage = () => {
        localStorage.setItem(CUSTOM_GROUPS_STORAGE_KEY, JSON.stringify(customGroups));
    };

    const renderCustomGroupsList = () => {
        if (!customGroupsListUl) { console.warn("customGroupsListUl not found"); return; }
        customGroupsListUl.innerHTML = '';
        if (customGroups.length === 0) {
            customGroupsListUl.innerHTML = '<li>No custom groups saved yet.</li>'; return;
        }
        customGroups.forEach(group => {
            const listItem = document.createElement('li');
            listItem.textContent = `${group.name}: ${group.numbers.join(', ')} `;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-custom-group-btn');
            deleteButton.setAttribute('data-group-id', group.id);
            listItem.appendChild(deleteButton);
            customGroupsListUl.appendChild(listItem);
        });
    };

    if(saveCustomGroupButton) {
        saveCustomGroupButton.addEventListener('click', () => {
            if(!customGroupNameInput || !customGroupNumbersInput) return;
            const name = customGroupNameInput.value.trim();
            const numbersStr = customGroupNumbersInput.value.trim();
            if (!name) { alert('Please enter a name for the custom group.'); return; }
            if (!numbersStr) { alert('Please enter numbers for the custom group.'); return; }
            const numbersArr = numbersStr.split(',').map(numStr => parseInt(numStr.trim(), 10)).filter(num => !isNaN(num) && num >= 0 && num <= 36);
            if (numbersArr.length === 0) { alert('No valid numbers (0-36) entered.'); return; }
            const uniqueNumbers = [...new Set(numbersArr)].sort((a, b) => a - b);
            const newGroup = { id: Date.now(), name: name, numbers: uniqueNumbers };
            customGroups.push(newGroup);
            saveCustomGroupsToStorage();
            renderCustomGroupsList();
            customGroupNameInput.value = ''; customGroupNumbersInput.value = '';
            renderResults();
        });
    } else { console.warn("saveCustomGroupButton not found"); }

    if(customGroupsListUl) {
        customGroupsListUl.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-custom-group-btn')) {
                const groupId = parseInt(event.target.getAttribute('data-group-id'), 10);
                customGroups = customGroups.filter(group => group.id !== groupId);
                saveCustomGroupsToStorage();
                renderCustomGroupsList();
                renderResults();
            }
        });
    } else { console.warn("customGroupsListUl not found"); }

    // --- Neighbour Bet Tool ---
    if(analyzeNeighbourBetButton) {
        analyzeNeighbourBetButton.addEventListener('click', () => {
            if(!neighbourCenterNumberInput || !neighbourCountInput || !neighbourBetAnalysisResultDiv) return;
            const centerNumber = parseInt(neighbourCenterNumberInput.value, 10);
            const neighbourCount = parseInt(neighbourCountInput.value, 10);
            if (isNaN(centerNumber) || centerNumber < 0 || centerNumber > 36) {
                neighbourBetAnalysisResultDiv.innerHTML = '<p style="color: red;">Invalid Center Number.</p>'; return;
            }
            if (isNaN(neighbourCount) || neighbourCount < 1 || neighbourCount > 5) {
                neighbourBetAnalysisResultDiv.innerHTML = '<p style="color: red;">Invalid Neighbour Count.</p>'; return;
            }
            const centerIndex = EURO_WHEEL_ORDER.indexOf(centerNumber);
            if (centerIndex === -1) {
                neighbourBetAnalysisResultDiv.innerHTML = '<p style="color: red;">Center Number not found in wheel order.</p>'; return;
            }
            const finalGroupForDisplay = [];
            for (let i = neighbourCount; i >= 1; i--) {
                finalGroupForDisplay.push(EURO_WHEEL_ORDER[(centerIndex - i + EURO_WHEEL_ORDER.length) % EURO_WHEEL_ORDER.length]);
            }
            finalGroupForDisplay.push(centerNumber);
            for (let i = 1; i <= neighbourCount; i++) {
                finalGroupForDisplay.push(EURO_WHEEL_ORDER[(centerIndex + i) % EURO_WHEEL_ORDER.length]);
            }
            const uniqueFinalGroup = [...new Set(finalGroupForDisplay)];

            let dataForNeighbourAnalysis = results;
            if (filterByDealerCheckbox && filterByDealerCheckbox.checked) {
                dataForNeighbourAnalysis = results.filter(r => r.dealerId === currentDealerId);
            }
            const hits = countHitsInGroup(uniqueFinalGroup, dataForNeighbourAnalysis);
            const percentage = dataForNeighbourAnalysis.length > 0 ? (hits / dataForNeighbourAnalysis.length) * 100 : 0;
            let filterSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';

            neighbourBetAnalysisResultDiv.innerHTML = `
                <p><strong>Neighbour Bet Analysis${filterSuffix}:</strong></p>
                <p>Center: ${centerNumber}, Neighbours: ${neighbourCount} each side</p>
                <p>Generated Group: [${uniqueFinalGroup.join(', ')}] (${uniqueFinalGroup.length} numbers)</p>
                <p>Hits in current view: ${hits}</p>
                <p>Percentage: ${percentage.toFixed(2)}% (of ${dataForNeighbourAnalysis.length} spins in view)</p>
            `;
        });
    } else { console.warn("analyzeNeighbourBetButton not found"); }
    
    // --- CSV Export ---
    const handleExportCSV = () => {
        if (results.length === 0) { alert('No results to export.'); return; }
        const header = ['Timestamp', 'DealerID', 'Number'];
        let csvContent = header.join(',') + '\n';
        results.forEach(resultObj => {
            const ts = new Date(resultObj.timestamp);
            const formattedTimestamp = `${ts.getFullYear()}-${String(ts.getMonth() + 1).padStart(2, '0')}-${String(ts.getDate()).padStart(2, '0')} ${String(ts.getHours()).padStart(2, '0')}:${String(ts.getMinutes()).padStart(2, '0')}:${String(ts.getSeconds()).padStart(2, '0')}`;
            const dealerId = `"${String(resultObj.dealerId || 'N/A').replace(/"/g, '""')}"`;
            const numberVal = resultObj.number;
            csvContent += `${formattedTimestamp},${dealerId},${numberVal}\n`;
        });
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'roulette_results_history.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
            alert('CSV export via direct download not fully supported. Please use a modern browser.');
        }
    };

    // --- Full History Panel ---
    const renderFullHistory = () => {
        let historyPanelSection = document.getElementById('history-panel-section');
        let exportButton = document.getElementById('export-csv-button'); 

        if (!historyPanelSection) {
            historyPanelSection = document.createElement('section');
            historyPanelSection.id = 'history-panel-section';
            const title = document.createElement('h2');
            title.textContent = 'Full Results History';
            historyPanelSection.appendChild(title);

            exportButton = document.createElement('button'); 
            exportButton.id = 'export-csv-button';
            exportButton.textContent = 'Export Results (CSV)';
            exportButton.style.marginLeft = '20px';
            exportButton.style.verticalAlign = 'middle';
            title.appendChild(exportButton); 

            const historyContentDiv = document.createElement('div');
            historyContentDiv.id = 'history-panel-content';
            historyContentDiv.style.cssText = 'max-height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; margin-top: 5px;';
            historyPanelSection.appendChild(historyContentDiv);

            if (mainElement) { mainElement.appendChild(historyPanelSection); }
            else { document.body.appendChild(historyPanelSection); } 
            
            if(exportButton) exportButton.addEventListener('click', handleExportCSV);
        } else if (!exportButton && historyPanelSection) { 
            exportButton = document.createElement('button');
            exportButton.id = 'export-csv-button';
            exportButton.textContent = 'Export Results (CSV)';
            exportButton.style.marginLeft = '20px';
            exportButton.style.verticalAlign = 'middle';
            const titleInHistoryPanel = historyPanelSection.querySelector('h2');
            if (titleInHistoryPanel) { titleInHistoryPanel.appendChild(exportButton); }
            else { historyPanelSection.insertBefore(exportButton, historyPanelSection.firstChild); }
            if(exportButton) exportButton.addEventListener('click', handleExportCSV);
        }

        const historyContentDiv = document.getElementById('history-panel-content');
        if(!historyContentDiv) { console.warn("history-panel-content not found"); return; }
        historyContentDiv.innerHTML = '';
        if (results.length === 0) {
            historyContentDiv.textContent = 'No results entered yet.'; return;
        }
        results.forEach((resultObj, index) => {
            const numberSpan = document.createElement('span');
            numberSpan.textContent = `${resultObj.number} (D: ${resultObj.dealerId || 'N/A'})`;
            numberSpan.title = `Spin ${index + 1} - Time: ${new Date(resultObj.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
            numberSpan.style.cssText = 'display: inline-block; padding: 3px 6px; border: 1px solid #eee; margin: 2px; border-radius: 3px; background-color: #f9f9f9;';
            historyContentDiv.appendChild(numberSpan);
        });
    };

    // --- Analysis Function Definitions ---
    const renderFrequencyAnalysis = (dataToAnalyze) => {
        if (!numberFrequencyDiv) { console.warn("numberFrequencyDiv not found"); return; }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        numberFrequencyDiv.innerHTML = `<h3>Number Frequency${titleSuffix}</h3>`;
        if (dataToAnalyze.length === 0) { numberFrequencyDiv.innerHTML += '<p>No results to analyze.</p>'; return; }
        const counts = {}; for (let k = 0; k <= 36; k++) { counts[k] = 0; }
        dataToAnalyze.forEach(item => { counts[item.number]++; });
        const totalResultsToAnalyze = dataToAnalyze.length;
        numberFrequencyDiv.appendChild(document.createElement('p')).textContent = `Total Results in current view: ${totalResultsToAnalyze}`;
        let maxFreq = 0; Object.values(counts).forEach(c => { if (c > maxFreq) maxFreq = c; });
        const MAX_BAR_WIDTH_PX = 150;
        for (let i = 0; i <= 36; i++) {
            const percentage = totalResultsToAnalyze > 0 ? (counts[i] / totalResultsToAnalyze) * 100 : 0;
            const statP = document.createElement('p');
            statP.style.cssText = 'display: flex; align-items: center; margin-bottom: 3px;';
            const textSpan = document.createElement('span');
            textSpan.textContent = `Number ${i}: ${counts[i]} hit(s) (${percentage.toFixed(2)}%)`;
            textSpan.style.minWidth = '210px';
            statP.appendChild(textSpan);
            const barContainer = document.createElement('div');
            barContainer.style.cssText = `height: 15px; width: ${MAX_BAR_WIDTH_PX}px; background-color: #e0e0e0; margin-left: 10px; border: 1px solid #ccc;`;
            const bar = document.createElement('div');
            const barWidth = maxFreq > 0 ? (counts[i] / maxFreq) * MAX_BAR_WIDTH_PX : 0;
            bar.style.cssText = `width: ${barWidth}px; height: 100%; background-color: ${counts[i] > 0 ? '#4CAF50' : '#e0e0e0'};`;
            barContainer.appendChild(bar);
            statP.appendChild(barContainer);
            numberFrequencyDiv.appendChild(statP);
        }
    };

    const analyzeAndRenderGroupHits = (dataToAnalyze) => {
        if (!groupAnalysisDiv) { console.warn("groupAnalysisDiv not found"); return; }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        groupAnalysisDiv.innerHTML = `<h3>Group Hit Frequency${titleSuffix}</h3>`;
        let hasAnyContentRendered = false;

        const renderCategory = (categoryTitle, groupsObject, isSubObject = false, applyBiasCheck = false) => {
            if (!groupsObject && !Array.isArray(groupsObject)) {  return; }
            let itemsToIterate = [];
            if (isSubObject) { 
                itemsToIterate = Object.keys(groupsObject).filter(k => k !== 'name' && typeof groupsObject[k] === 'object' && groupsObject[k] !== null && 'numbers' in groupsObject[k]).map(k => groupsObject[k]);
            } else if (Array.isArray(groupsObject)) { 
                itemsToIterate = groupsObject;
            } else { 
                 itemsToIterate = Object.values(groupsObject).filter(g => typeof g === 'object' && g !== null && 'numbers' in g && 'name' in g);
            }
            if (itemsToIterate.length === 0 && categoryTitle !== "Custom Groups" && !(categoryTitle === RACETRACK_BET_TYPES.finalesEnPlein.name && Object.keys(RACETRACK_BET_TYPES.finalesEnPlein).length >1 ) && !(categoryTitle === RACETRACK_BET_TYPES.finalesACheval.name && Object.keys(RACETRACK_BET_TYPES.finalesACheval).length > 1 )) {
                return;
            }
            if (hasAnyContentRendered && itemsToIterate.length > 0 && categoryTitle) groupAnalysisDiv.appendChild(document.createElement('hr'));
            
            const titleEl = document.createElement('h4'); titleEl.textContent = categoryTitle;
            if(categoryTitle) groupAnalysisDiv.appendChild(titleEl);
            
            if (itemsToIterate.length === 0 && categoryTitle === "Custom Groups") {
                groupAnalysisDiv.appendChild(document.createElement('p')).textContent = "No custom groups defined."; hasAnyContentRendered = true; return;
            }
            if (itemsToIterate.length === 0) {
                groupAnalysisDiv.appendChild(document.createElement('p')).textContent = "No groups to display in this category."; hasAnyContentRendered = true; return;
            }
            let categoryContentRendered = false;
            itemsToIterate.forEach(group => {
                if (group && group.name && Array.isArray(group.numbers)) {
                    let biasText = ""; let biasTypeForColor = "";
                    if (applyBiasCheck && group.name && EXPECTED_SECTOR_PERCENTAGES_BIAS[group.name] !== undefined && dataToAnalyze.length > 0) {
                        const count = countHitsInGroup(group.numbers, dataToAnalyze);
                        const percentage = (count / dataToAnalyze.length) * 100;
                        const expectedPercent = EXPECTED_SECTOR_PERCENTAGES_BIAS[group.name];
                        if (percentage > (expectedPercent * HOT_THRESHOLD_MULTIPLIER) && count >= MIN_HITS_FOR_HOT) { biasText = " (Hot)"; biasTypeForColor = "Hot"; }
                        else if (percentage < (expectedPercent * COLD_THRESHOLD_MULTIPLIER) && dataToAnalyze.length >= MIN_TOTAL_SPINS_FOR_COLD) { biasText = " (Cold)"; biasTypeForColor = "Cold"; }
                        else if (dataToAnalyze.length >= MIN_TOTAL_SPINS_FOR_COLD) { /* biasTypeForColor = "Average"; */ }
                    }
                    appendAnalysisToDivGeneric(group.name, group.numbers, dataToAnalyze, groupAnalysisDiv, biasText, biasTypeForColor);
                    categoryContentRendered = true;
                }
            });
            if (categoryContentRendered) hasAnyContentRendered = true;
        };
        
        if (dataToAnalyze.length === 0 && (!customGroups || customGroups.length === 0)) {
            groupAnalysisDiv.innerHTML += '<p>No results or custom groups for analysis.</p>'; return;
        }
        if (dataToAnalyze.length === 0 && customGroups && customGroups.length > 0) {
            groupAnalysisDiv.innerHTML += '<p>No results entered yet. Custom groups defined (will show 0 hits).</p>';
        }

        renderCategory('Wheel Sectors', WHEEL_BASED_GROUPS, false, true);
        renderCategory('Dozens', TABLE_BASED_GROUPS.dozens, true);
        renderCategory('Columns', TABLE_BASED_GROUPS.columns, true);
        renderCategory(TABLE_BASED_GROUPS.rows.name, TABLE_BASED_GROUPS.rows, true);
        renderCategory(TABLE_BASED_GROUPS.diagonals.name, TABLE_BASED_GROUPS.diagonals, true);
        renderCategory(TABLE_BASED_GROUPS.quadrants.name, TABLE_BASED_GROUPS.quadrants, true);
        renderCategory(RACETRACK_BET_TYPES.finalesEnPlein.name, RACETRACK_BET_TYPES.finalesEnPlein, true);
        renderCategory(RACETRACK_BET_TYPES.finalesACheval.name, RACETRACK_BET_TYPES.finalesACheval, true);
        if (customGroups) renderCategory("Custom Groups", customGroups, false); 
        
        if (hasAnyContentRendered) groupAnalysisDiv.appendChild(document.createElement('hr'));
        const digitSumTitle = document.createElement('h4'); digitSumTitle.textContent = 'Digit Sum Group Frequency'; groupAnalysisDiv.appendChild(digitSumTitle);
        if (dataToAnalyze.length === 0) { groupAnalysisDiv.appendChild(document.createElement('p')).textContent = 'No results for Digit Sum (shows 0 hits).'; }
        const digitSumCounts = {}; for (let i = 0; i <= 9; i++) { digitSumCounts[i] = 0; }
        dataToAnalyze.forEach(item => { const sum = getDigitSum(item.number); if (sum >= 0 && sum <= 9) { digitSumCounts[sum]++; } });
        for (let i = 0; i <= 9; i++) {
            const groupName = `Digit Sum Group ${i}`; const count = digitSumCounts[i];
            let percentage = 0; if (dataToAnalyze.length > 0) { percentage = (count / dataToAnalyze.length) * 100; }
            const p = document.createElement('p'); p.textContent = `${groupName}: ${count} hit(s) (${percentage.toFixed(2)}%)`; groupAnalysisDiv.appendChild(p);
        }
    };

    const analyzeAndRenderBasicTrends = (dataToAnalyze) => {
        let basicTrendsDiv = document.getElementById('basic-trends-analysis');
        if (!basicTrendsDiv) { basicTrendsDiv = document.createElement('div'); basicTrendsDiv.id = 'basic-trends-analysis'; if(analysisOutputDiv) analysisOutputDiv.appendChild(basicTrendsDiv); }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        basicTrendsDiv.innerHTML = `<h3>Basic Trends${titleSuffix}</h3>`;
        if (dataToAnalyze.length === 0) { basicTrendsDiv.innerHTML += '<p>No results to analyze.</p>'; return; }
        const appendTrendToDiv = (trendName, trendNumbers, allDataObjects, targetDiv) => {
            const relevantResultsNumbers = allDataObjects.map(item => item.number).filter(num => num !== 0);
            if (relevantResultsNumbers.length === 0) { targetDiv.appendChild(document.createElement('p')).textContent = `${trendName}: No non-zero results.`; return; }
            const count = relevantResultsNumbers.filter(num => trendNumbers.includes(num)).length;
            const percentage = (count / relevantResultsNumbers.length) * 100;
            targetDiv.appendChild(document.createElement('p')).textContent = `${trendName}: ${count} hit(s) (${percentage.toFixed(2)}%) of ${relevantResultsNumbers.length} non-zero results`;
        };
        appendTrendToDiv(BASIC_TRENDS_DEFINITIONS.redNumbers.name, BASIC_TRENDS_DEFINITIONS.redNumbers.numbers, dataToAnalyze, basicTrendsDiv);
        appendTrendToDiv(BASIC_TRENDS_DEFINITIONS.blackNumbers.name, BASIC_TRENDS_DEFINITIONS.blackNumbers.numbers, dataToAnalyze, basicTrendsDiv);
        basicTrendsDiv.appendChild(document.createElement('hr'));
        appendTrendToDiv(BASIC_TRENDS_DEFINITIONS.evenNumbers.name, BASIC_TRENDS_DEFINITIONS.evenNumbers.numbers, dataToAnalyze, basicTrendsDiv);
        appendTrendToDiv(BASIC_TRENDS_DEFINITIONS.oddNumbers.name, BASIC_TRENDS_DEFINITIONS.oddNumbers.numbers, dataToAnalyze, basicTrendsDiv);
        basicTrendsDiv.appendChild(document.createElement('hr'));
        appendTrendToDiv(BASIC_TRENDS_DEFINITIONS.lowNumbers.name, BASIC_TRENDS_DEFINITIONS.lowNumbers.numbers, dataToAnalyze, basicTrendsDiv);
        appendTrendToDiv(BASIC_TRENDS_DEFINITIONS.highNumbers.name, BASIC_TRENDS_DEFINITIONS.highNumbers.numbers, dataToAnalyze, basicTrendsDiv);
    };

    const analyzeAndRenderHotColdNumbers = (dataToAnalyze) => {
        let hotColdDiv = document.getElementById('hot-cold-analysis');
        if (!hotColdDiv) { hotColdDiv = document.createElement('div'); hotColdDiv.id = 'hot-cold-analysis'; if(analysisOutputDiv) analysisOutputDiv.appendChild(hotColdDiv); }
        const filterValue = filterSelect ? filterSelect.value : 'all';
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        let currentRangeResultObjects = dataToAnalyze;
        let titleRangeText = "All Available in View";
        if (filterValue !== 'all' && dataToAnalyze.length > 0) {
            const count = parseInt(filterValue, 10);
            const actualCount = Math.min(count, dataToAnalyze.length);
            currentRangeResultObjects = dataToAnalyze.slice(-actualCount); 
            titleRangeText = `Last ${actualCount}`;
        }
        hotColdDiv.innerHTML = `<h3>Hot & Cold Numbers (${titleRangeText})${titleSuffix}</h3>`;
        if (currentRangeResultObjects.length === 0) { hotColdDiv.innerHTML += '<p>No results in selected range/view.</p>'; currentHotNumbers = []; return; }
        const frequencies = {}; for (let i = 0; i <= 36; i++) { frequencies[i] = { number: i, count: 0 }; }
        currentRangeResultObjects.forEach(item => { frequencies[item.number].count++; });
        currentHotNumbers = [];
        const allNumbersByFreq = Object.values(frequencies).sort((a, b) => (b.count === a.count) ? a.number - b.number : b.count - a.count);
        const hotNumbersData = allNumbersByFreq.filter(item => item.count > 0).slice(0, 5);
        hotNumbersData.forEach(item => currentHotNumbers.push(item.number));
        const hotP = document.createElement('p'); hotP.innerHTML = '<strong>Hot Numbers:</strong> ';
        if (hotNumbersData.length === 0) { hotP.innerHTML += 'N/A'; } 
        else { hotNumbersData.forEach((item, idx) => hotP.innerHTML += `${item.number} (${item.count}x)${idx < hotNumbersData.length - 1 ? ', ' : ''}`); }
        hotColdDiv.appendChild(hotP);
        const coldCandidates = Object.values(frequencies).sort((a, b) => (a.count === b.count) ? a.number - b.number : a.count - b.count);
        const coldNumbersData = coldCandidates.slice(0, 5);
        const coldP = document.createElement('p'); coldP.innerHTML = '<strong>Cold Numbers:</strong> ';
        coldNumbersData.forEach((item, idx) => coldP.innerHTML += `${item.number} (${item.count}x)${idx < coldNumbersData.length - 1 ? ', ' : ''}`);
        hotColdDiv.appendChild(coldP);
    };

    const analyzeAndRenderRepeatPatterns = (dataToAnalyze) => {
        let patternWatchDiv = document.getElementById('pattern-watch-analysis');
        if (!patternWatchDiv) { patternWatchDiv = document.createElement('div'); patternWatchDiv.id = 'pattern-watch-analysis'; if(analysisOutputDiv) analysisOutputDiv.appendChild(patternWatchDiv); }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        patternWatchDiv.innerHTML = `<h3>Pattern Watch${titleSuffix}</h3>`; 
        if (dataToAnalyze.length < 2) { patternWatchDiv.appendChild(document.createElement('p')).textContent = 'Not enough results for repeat patterns.'; return; }
        
        const repeatTitleP = document.createElement('p'); repeatTitleP.innerHTML = "<strong>Repeats:</strong>"; patternWatchDiv.appendChild(repeatTitleP);
        let totalSameNumberRepeats = 0; const specificNumberRepeatCounts = {};
        for (let i = 1; i < dataToAnalyze.length; i++) {
            if (dataToAnalyze[i].number === dataToAnalyze[i-1].number) {
                totalSameNumberRepeats++;
                specificNumberRepeatCounts[dataToAnalyze[i].number] = (specificNumberRepeatCounts[dataToAnalyze[i].number] || 0) + 1;
            }
        }
        const sameNumP = document.createElement('p');
        sameNumP.innerHTML = `Immediate Same Number Repeats: ${totalSameNumberRepeats} total.`;
        if (Object.keys(specificNumberRepeatCounts).length > 0) { sameNumP.innerHTML += '<br>Details: ' + Object.entries(specificNumberRepeatCounts).map(([num, count]) => `${num} (${count}x)`).join(', ');}
        patternWatchDiv.appendChild(sameNumP);
        
        let totalSectorRepeats = 0; const specificSectorRepeatCounts = {};
        for (let i = 1; i < dataToAnalyze.length; i++) {
            const currentSector = getWheelSector(dataToAnalyze[i].number);
            const previousSector = getWheelSector(dataToAnalyze[i-1].number);
            if (currentSector && previousSector && currentSector === previousSector) {
                totalSectorRepeats++;
                specificSectorRepeatCounts[currentSector] = (specificSectorRepeatCounts[currentSector] || 0) + 1;
            }
        }
        const sectorP = document.createElement('p');
        sectorP.innerHTML = `Immediate Sector Repeats: ${totalSectorRepeats} total.`;
        if (Object.keys(specificSectorRepeatCounts).length > 0) { sectorP.innerHTML += '<br>Details: ' + Object.entries(specificSectorRepeatCounts).map(([name, count]) => `${name} (${count}x)`).join(', ');}
        patternWatchDiv.appendChild(sectorP);
    };

    const analyzeAndRenderStreakFlip = (dataToAnalyze) => {
        let patternWatchDiv = document.getElementById('pattern-watch-analysis');
        if (!patternWatchDiv) { console.warn("pattern-watch-analysis div not found for streaks/flips"); return; } 
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        if (patternWatchDiv.querySelector('p')) patternWatchDiv.appendChild(document.createElement('hr'));
        const titleP = document.createElement('p'); titleP.innerHTML = `<strong>Red/Black Streaks & Flips${titleSuffix}:</strong>`;
        patternWatchDiv.appendChild(titleP);
        const colorsSequence = dataToAnalyze.map(item => getNumberColor(item.number)).filter(color => color === 'Red' || color === 'Black');
        if (colorsSequence.length < 1) { patternWatchDiv.appendChild(document.createElement('p')).textContent = 'No Red/Black results for streaks/flips.'; return; }
        let currentStreakColor = null, currentStreakLength = 0, longestRedStreak = 0, longestBlackStreak = 0;
        let tempCurrentStreak = 0, tempStreakColor = null;
        colorsSequence.forEach(color => {
            if (color === tempStreakColor) { tempCurrentStreak++; } 
            else { tempStreakColor = color; tempCurrentStreak = 1; }
            if (tempStreakColor === 'Red' && tempCurrentStreak > longestRedStreak) longestRedStreak = tempCurrentStreak;
            if (tempStreakColor === 'Black' && tempCurrentStreak > longestBlackStreak) longestBlackStreak = tempCurrentStreak;
        });
        if (colorsSequence.length > 0) {
            currentStreakColor = colorsSequence[colorsSequence.length - 1]; currentStreakLength = 1;
            for (let i = colorsSequence.length - 2; i >= 0; i--) { if (colorsSequence[i] === currentStreakColor) currentStreakLength++; else break; }
        }
        const streaksP = document.createElement('p');
        streaksP.innerHTML = `Current Streak: ${currentStreakColor ? `${currentStreakColor} x ${currentStreakLength}` : 'N/A'}<br>Longest Red: ${longestRedStreak}, Longest Black: ${longestBlackStreak}`;
        patternWatchDiv.appendChild(streaksP);
        let r_r = 0, r_b = 0, b_r = 0, b_b = 0;
        if (colorsSequence.length >= 2) {
            for (let i = 1; i < colorsSequence.length; i++) {
                const prev = colorsSequence[i-1], curr = colorsSequence[i];
                if (prev === 'Red' && curr === 'Red') r_r++; else if (prev === 'Red' && curr === 'Black') r_b++;
                else if (prev === 'Black' && curr === 'Red') b_r++; else if (prev === 'Black' && curr === 'Black') b_b++;
            }
        }
        patternWatchDiv.appendChild(document.createElement('p')).innerHTML = `Transitions: R-R: ${r_r}, R-B: ${r_b}, B-R: ${b_r}, B-B: ${b_b}`;
    };
    
    const analyzeAndRenderSpiralPatterns = (dataToAnalyze) => {
        let patternWatchDiv = document.getElementById('pattern-watch-analysis');
        if (!patternWatchDiv) { console.warn("pattern-watch-analysis div not found for spirals"); return; } 
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        if (patternWatchDiv.querySelector('p')) patternWatchDiv.appendChild(document.createElement('hr'));
        const titleP = document.createElement('p'); titleP.innerHTML = `<strong>Spiral Patterns (Min 3 Gaps/4 Numbers)${titleSuffix}:</strong>`;
        patternWatchDiv.appendChild(titleP);
        if (dataToAnalyze.length < 4) { patternWatchDiv.appendChild(document.createElement('p')).textContent = 'Not enough results for spirals.'; return; }
        const calculatedGaps = [];
        for (let i = 1; i < dataToAnalyze.length; i++) {
            const fromNumber = dataToAnalyze[i-1].number, toNumber = dataToAnalyze[i].number;
            const fromIndex = EURO_WHEEL_ORDER.indexOf(fromNumber), toIndex = EURO_WHEEL_ORDER.indexOf(toNumber);
            if (fromIndex === -1 || toIndex === -1) continue;
            calculatedGaps.push({ endingNumber: toNumber, actualGap: (toIndex - fromIndex + EURO_WHEEL_ORDER.length) % EURO_WHEEL_ORDER.length, prevNumber: fromNumber });
        }
        if (calculatedGaps.length < 3) { patternWatchDiv.appendChild(document.createElement('p')).textContent = 'Not enough transitions for spirals.'; return; }
        let spiralsFoundTexts = [];
        for (let i = 0; i <= calculatedGaps.length - 3; i++) {
            const g1o = calculatedGaps[i], g2o = calculatedGaps[i+1], g3o = calculatedGaps[i+2];
            if (g1o.actualGap === 0 || g2o.actualGap === 0 || g3o.actualGap === 0) continue;
            const n0 = g1o.prevNumber, n1 = g1o.endingNumber, n2 = g2o.endingNumber, n3 = g3o.endingNumber;
            const g1 = g1o.actualGap, g2 = g2o.actualGap, g3 = g3o.actualGap;
            let spiralType = null;
            if (g1 < g2 && g2 < g3) spiralType = "Outward CW"; else if (g1 > g2 && g2 > g3) spiralType = "Inward CW";
            if (spiralType) spiralsFoundTexts.push(`${spiralType}: [${n0},${n1},${n2},${n3}] Gaps[+${g1},+${g2},+${g3}]`);
        }
        if (spiralsFoundTexts.length > 0) { spiralsFoundTexts.slice(-3).forEach(text => patternWatchDiv.appendChild(document.createElement('p')).textContent = text + titleSuffix); }
        else { patternWatchDiv.appendChild(document.createElement('p')).textContent = 'No distinct spiral patterns detected.' + titleSuffix; }
    };

    const analyzeAndRenderBallLandingGaps = (dataToAnalyze) => {
        let gapAnalysisDiv = document.getElementById('gap-analysis');
        if (!gapAnalysisDiv) { gapAnalysisDiv = document.createElement('div'); gapAnalysisDiv.id = 'gap-analysis'; if(analysisOutputDiv) analysisOutputDiv.appendChild(gapAnalysisDiv); }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        gapAnalysisDiv.innerHTML = `<h3>Ball Landing Gap Frequency (CW)${titleSuffix}</h3>`;
        if (dataToAnalyze.length < 2) { gapAnalysisDiv.innerHTML += '<p>Not enough results for gaps.</p>'; return; }
        const gapCounts = {}; for (let i = 0; i <= 36; i++) { gapCounts[i] = 0; } let totalValidGaps = 0;
        for (let i = 1; i < dataToAnalyze.length; i++) {
            const fromN = dataToAnalyze[i-1].number, toN = dataToAnalyze[i].number;
            const fromI = EURO_WHEEL_ORDER.indexOf(fromN), toI = EURO_WHEEL_ORDER.indexOf(toN);
            if (fromI === -1 || toI === -1) continue;
            gapCounts[(toI - fromI + EURO_WHEEL_ORDER.length) % EURO_WHEEL_ORDER.length]++; totalValidGaps++;
        }
        if (totalValidGaps === 0) { gapAnalysisDiv.innerHTML += '<p>No valid gaps to analyze.</p>'; return; }
        const sortedGaps = Object.entries(gapCounts).filter(([, count]) => count > 0).sort(([,a],[,b]) => b-a);
        if (sortedGaps.length === 0) { gapAnalysisDiv.innerHTML += '<p>No gaps recorded.</p>'; return; }
        sortedGaps.slice(0, 10).forEach(([gap, count]) => {
            gapAnalysisDiv.appendChild(document.createElement('p')).textContent = `Gap of +${gap}: ${count}x (${(count/totalValidGaps*100).toFixed(2)}%)`;
        });
        if (sortedGaps.length > 10) gapAnalysisDiv.appendChild(document.createElement('p')).textContent = `(...and ${sortedGaps.length - 10} other gaps)`;
    };

    const analyzeAndRenderWheelClusters = (dataToAnalyze) => {
        let clusterDiv = document.getElementById('wheel-clustering-analysis');
        if(!clusterDiv) { clusterDiv = document.createElement('div'); clusterDiv.id = 'wheel-clustering-analysis'; if(analysisOutputDiv) analysisOutputDiv.appendChild(clusterDiv); }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        clusterDiv.innerHTML = `<h3>Wheel Clustering (3 Segments)${titleSuffix}</h3>`;
        if (dataToAnalyze.length === 0) { 
            clusterDiv.innerHTML += '<p>No results for clustering.</p>'; 
            Object.values(WHEEL_SEGMENTS).forEach(seg => clusterDiv.appendChild(document.createElement('p')).textContent = `${seg.name}: 0 hits (0.00%)`); 
            return; 
        }
        Object.values(WHEEL_SEGMENTS).forEach(segment => {
            let biasText = "", biasType = "";
            const count = countHitsInGroup(segment.numbers, dataToAnalyze);
            const percentage = dataToAnalyze.length > 0 ? (count / dataToAnalyze.length) * 100 : 0;
            const expected = EXPECTED_SEGMENT_PERCENTAGES[segment.name]; 
            if (expected !== undefined) {
                if (percentage > (expected * HOT_THRESHOLD_MULTIPLIER) && count >= MIN_HITS_FOR_HOT) { biasText = " (Hot Cluster)"; biasType="Hot";}
                else if (percentage < (expected * COLD_THRESHOLD_MULTIPLIER) && dataToAnalyze.length >= MIN_TOTAL_SPINS_FOR_COLD) { biasText = " (Cold Cluster)"; biasType="Cold";}
                else if (dataToAnalyze.length >= MIN_TOTAL_SPINS_FOR_COLD) { /* biasType="Average"; */ }
            }
            appendAnalysisToDivGeneric(segment.name, segment.numbers, dataToAnalyze, clusterDiv, biasText, biasType);
        });
    };
    
    const analyzeAndRenderDirectionPattern = (dataToAnalyze) => {
        let dirDiv = document.getElementById('direction-pattern-analysis');
        if(!dirDiv) { dirDiv = document.createElement('div'); dirDiv.id = 'direction-pattern-analysis'; if(analysisOutputDiv) analysisOutputDiv.appendChild(dirDiv); }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        dirDiv.innerHTML = `<h3>Hit Direction Pattern${titleSuffix}</h3>`;
        if (dataToAnalyze.length < 2) { dirDiv.innerHTML += '<p>Not enough results for direction.</p>'; return; }
        let cw = 0, ccw = 0, repeat = 0; const totalTrans = dataToAnalyze.length - 1;
        for (let i = 1; i < dataToAnalyze.length; i++) {
            const fromN = dataToAnalyze[i-1].number, toN = dataToAnalyze[i].number;
            const fromI = EURO_WHEEL_ORDER.indexOf(fromN), toI = EURO_WHEEL_ORDER.indexOf(toN);
            if (fromI === -1 || toI === -1) continue;
            const gap = (toI - fromI + EURO_WHEEL_ORDER.length) % EURO_WHEEL_ORDER.length;
            if (gap === 0) repeat++; else if (gap > 0 && gap <= 18) cw++; else ccw++;
        }
        const stat = (lbl,c,t) => `${lbl}: ${c}x (${t>0?(c/t*100).toFixed(2):0.00}%)${t>0?'':' of 0 transitions'}`;
        dirDiv.appendChild(document.createElement('p')).textContent = stat('Clockwise Transitions', cw, totalTrans);
        dirDiv.appendChild(document.createElement('p')).textContent = stat('Counter-Clockwise Transitions', ccw, totalTrans);
        dirDiv.appendChild(document.createElement('p')).textContent = stat('Same Number Repeats (0 Gap)', repeat, totalTrans);
    };

    const analyzeAndRenderLeftRightSplit = (dataToAnalyze) => {
        let lrDiv = document.getElementById('left-right-split-analysis');
        if(!lrDiv) { lrDiv = document.createElement('div'); lrDiv.id = 'left-right-split-analysis'; if(analysisOutputDiv) analysisOutputDiv.appendChild(lrDiv); }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        lrDiv.innerHTML = `<h3>Left vs Right Half Split${titleSuffix}</h3>`;
        if (dataToAnalyze.length < 2) { lrDiv.innerHTML += '<p>Not enough results for L/R split.</p>'; return; }
        let leftH = 0, rightH = 0, relTrans = 0;
        for (let i = 1; i < dataToAnalyze.length; i++) {
            const fromN = dataToAnalyze[i-1].number, toN = dataToAnalyze[i].number;
            if (fromN === toN) continue;
            const fromI = EURO_WHEEL_ORDER.indexOf(fromN), toI = EURO_WHEEL_ORDER.indexOf(toN);
            if (fromI === -1 || toI === -1) continue;
            relTrans++; const gap = (toI - fromI + EURO_WHEEL_ORDER.length) % EURO_WHEEL_ORDER.length;
            if (gap > 0 && gap <= 18) rightH++; else if (gap > 18) leftH++; 
        }
        if (relTrans === 0) { lrDiv.innerHTML += '<p>No valid non-repeat transitions.</p>'; return; }
        const stat = (lbl,c,t) => `${lbl}: ${c}x (${t>0?(c/t*100).toFixed(2):0.00}%)${t>0?'':' of 0 relevant transitions'}`;
        lrDiv.appendChild(document.createElement('p')).textContent = stat('Hits on Right Half (CW)', rightH, relTrans);
        lrDiv.appendChild(document.createElement('p')).textContent = stat('Hits on Left Half (CCW)', leftH, relTrans);
    };
    
    const checkAndDisplayGroupPatternAlerts = (dataToAnalyze) => {
        let alertPanel = document.getElementById('alert-panel');
        if (!alertPanel) { alertPanel = document.createElement('div'); alertPanel.id = 'alert-panel'; alertPanel.style.cssText='border:2px solid red;padding:10px;margin:10px 0;'; if(mainElement && mainElement.firstChild) mainElement.insertBefore(alertPanel, mainElement.firstChild); else if(mainElement) mainElement.appendChild(alertPanel); else document.body.insertBefore(alertPanel, document.body.firstChild); }
        let titleSuffix = (filterByDealerCheckbox && filterByDealerCheckbox.checked) ? ` (Dealer: ${currentDealerId})` : ' (All Results)';
        let currentAlertPanelContent = []; let groupPatternsFound = false, influenceAlertsFound = false, newAlertsFound = false;
        const Y_SPINS_PATTERN = 5; const X_HITS_PATTERN = 3;
        if (dataToAnalyze.length >= Y_SPINS_PATTERN) {
            const recentResultObjects = dataToAnalyze.slice(-Y_SPINS_PATTERN);
            const recentResultsNumbers = recentResultObjects.map(item => item.number);
            const checkGrpAlert = (gN,gNums) => { let hC=0; recentResultsNumbers.forEach(n=>{if(gNums.includes(n))hC++;}); if(hC>=X_HITS_PATTERN){currentAlertPanelContent.push({text:`ALERT: ${gN} hit ${hC}x in last ${Y_SPINS_PATTERN} spins!${titleSuffix}`,type:'pattern'});groupPatternsFound=true;}};
            Object.values(WHEEL_BASED_GROUPS).forEach(g => { if(g.name && g.numbers) checkGrpAlert(g.name,g.numbers);});
            Object.values(TABLE_BASED_GROUPS.dozens).filter(g=> typeof g === 'object' && g.name && g.numbers).forEach(g=>checkGrpAlert(g.name,g.numbers));
            Object.values(TABLE_BASED_GROUPS.columns).filter(g=> typeof g === 'object' && g.name && g.numbers).forEach(g=>checkGrpAlert(g.name,g.numbers));
            if(customGroups) customGroups.forEach(g => {if(g.name && g.numbers) checkGrpAlert(g.name,g.numbers);});
        }
        if (dataToAnalyze.length > 0) {
            const latestRN = dataToAnalyze[dataToAnalyze.length - 1].number;
            ['zeroSpiel', 'orphelins'].forEach(key => { const sec = WHEEL_BASED_GROUPS[key]; if(sec && sec.numbers.includes(latestRN)){currentAlertPanelContent.push({text:`INFO: ${latestRN} from ${sec.name} hit! Sector [${sec.numbers.join(',')}] may be influenced.${titleSuffix}`,type:'info'});influenceAlertsFound=true;}});
            if (currentHotNumbers.includes(latestRN)) { currentAlertPanelContent.push({text:`HOT HIT: ${latestRN} (Hot Number!) landed!${titleSuffix}`,type:'hot_hit'}); newAlertsFound=true;}
            if (dataToAnalyze.length >= 3) { const last3 = dataToAnalyze.slice(-3).map(i=>i.number); if(last3[0]===last3[1]&&last3[1]===last3[2]){currentAlertPanelContent.push({text:`TRIPLE REPEAT: ${last3[0]} hit 3x in a row!${titleSuffix}`,type:'triple_repeat'});newAlertsFound=true;}}}
        }
        const SLEEPING_THRESHOLD = 15;
        if (dataToAnalyze.length >= SLEEPING_THRESHOLD) {
            const recentSleepCheck = dataToAnalyze.slice(-SLEEPING_THRESHOLD).map(item => item.number);
            const checkSleep = (gN,gNums) => { if(!gNums.some(n=>recentSleepCheck.includes(n))){currentAlertPanelContent.push({text:`SLEEPING: ${gN} not hit in last ${SLEEPING_THRESHOLD} spins!${titleSuffix}`,type:'sleeping_group'});newAlertsFound=true;}};
            Object.values(TABLE_BASED_GROUPS.dozens).filter(g=> typeof g === 'object' && g.name && g.numbers).forEach(g=>checkSleep(g.name,g.numbers));
            Object.values(TABLE_BASED_GROUPS.columns).filter(g=> typeof g === 'object' && g.name && g.numbers).forEach(g=>checkSleep(g.name,g.numbers));
        }
        alertPanel.innerHTML = `<h4>Alerts & Infos${titleSuffix}</h4>`;
        if (!groupPatternsFound && !influenceAlertsFound && !newAlertsFound) { let msg = `No specific alerts currently${titleSuffix}.`; if(dataToAnalyze.length < Y_SPINS_PATTERN && dataToAnalyze.length < SLEEPING_THRESHOLD && dataToAnalyze.length > 0) msg = `Monitoring... (more data needed for some alerts)${titleSuffix}.`; if(dataToAnalyze.length === 0) msg = `No results yet${titleSuffix}.`; alertPanel.innerHTML += `<p><em>${msg}</em></p>`;}
        else { currentAlertPanelContent.forEach(al=>{const p=document.createElement('p'); p.textContent=al.text; if(al.type==='pattern'){p.style.color='red';p.style.fontWeight='bold';} else if(al.type==='info'){p.style.color='blue';} else if(al.type==='hot_hit'){p.style.color='orange';p.style.fontWeight='bold';} else if(al.type==='triple_repeat'){p.style.color='purple';p.style.fontWeight='bold';} else if(al.type==='sleeping_group'){p.style.color='#555';p.style.fontStyle='italic';} alertPanel.appendChild(p);});}
    };

    // --- Main renderResults Orchestrator ---
    const renderResults = () => {
        renderResultsListDisplay(); 
        let dataForAnalysis = results;
        if (filterByDealerCheckbox && filterByDealerCheckbox.checked) {
            dataForAnalysis = results.filter(r => r.dealerId === currentDealerId);
        }
        updateActiveDealerFilterDisplay(); 
        updateSessionTrackerDisplay();    
        
        analyzeAndRenderHotColdNumbers(dataForAnalysis); 
        checkAndDisplayGroupPatternAlerts(dataForAnalysis); 
        renderFrequencyAnalysis(dataForAnalysis);
        analyzeAndRenderGroupHits(dataForAnalysis);
        analyzeAndRenderBasicTrends(dataForAnalysis);
        analyzeAndRenderRepeatPatterns(dataForAnalysis); 
        analyzeAndRenderStreakFlip(dataForAnalysis);    
        analyzeAndRenderSpiralPatterns(dataForAnalysis);  
        analyzeAndRenderBallLandingGaps(dataForAnalysis);
        analyzeAndRenderWheelClusters(dataForAnalysis);
        analyzeAndRenderDirectionPattern(dataForAnalysis);
        analyzeAndRenderLeftRightSplit(dataForAnalysis);
        renderFullHistory(); 
    };

    // --- Initial Page Load Sequence ---
    loadCurrentDealerId();    
    loadResults();            
    loadCustomGroups();       
    loadSessionStartTime();   
    renderResults();          

    if (sessionIntervalId) clearInterval(sessionIntervalId);
    sessionIntervalId = setInterval(updateLiveDuration, 1000);
});
