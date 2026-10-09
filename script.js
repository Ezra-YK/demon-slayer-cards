document.addEventListener("DOMContentLoaded", () => {
    
    const upgradeBtns = document.querySelectorAll('.upgrade-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resetBtn = document.getElementById('reset-btn');
    const cards = document.querySelectorAll('.card');
    const trainBtn = document.getElementById('train-btn');
    const currencyDisplay = document.getElementById('currency-display');

    let slayerMarks = 0;
    const upgradeCost = 50;

    // Create and inject the custom toast notification UI
    const toast = document.createElement('div');
    toast.className = 'toast hidden';
    document.body.appendChild(toast);

    const showToast = (message) => {
        toast.innerText = message;
        toast.classList.remove('hidden');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    };

    const updateCurrencyDisplay = () => {
        currencyDisplay.innerText = `Slayer Marks: ${slayerMarks}`;
    };

    trainBtn.addEventListener('click', () => {
        slayerMarks += 25;
        updateCurrencyDisplay();
    });

    upgradeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (slayerMarks >= upgradeCost) {
                slayerMarks -= upgradeCost;
                updateCurrencyDisplay();

                const card = e.target.closest('.card');
                const stats = card.querySelector('.stats');
                
                stats.innerText = stats.dataset.upgradeText;
                
                card.classList.add('leveled-up');
                
                e.target.innerText = "Fully Awakened";
                e.target.style.backgroundColor = "gold"; 
                e.target.style.color = "black";
                e.target.disabled = true; 
            } else {
                // Trigger the custom UI instead of the native alert
                showToast(`Not enough Slayer Marks! You need 50. You have ${slayerMarks}.`);
            }
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.dataset.filter;

            cards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    resetBtn.addEventListener('click', () => {
        cards.forEach(card => {
            const stats = card.querySelector('.stats');
            const btn = card.querySelector('.upgrade-btn');
            
            stats.innerText = stats.dataset.originalText;
            card.classList.remove('leveled-up');
            
            btn.innerText = "Level Up";
            btn.style.backgroundColor = ""; 
            btn.style.color = "";
            btn.disabled = false;
        });

        slayerMarks = 0;
        updateCurrencyDisplay();
    });
});