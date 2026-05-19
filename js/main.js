const interestsArray = ["branding","brand identity","logo","typography","photography","design","poster design","research","social networks","illustration"];
const container = document.getElementById('interestsList');
interestsArray.forEach(item => {
    let span = document.createElement('span');
    span.className = 'interestTag';
    span.setAttribute('contenteditable', 'true');
    span.innerText = item;
    container.appendChild(span);
});

function createRipple(event) {
    const element = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - radius;
    const y = event.clientY - rect.top - radius;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.classList.add("ripple");

    const existingRipple = element.getElementsByClassName("ripple")[0];
    if (existingRipple) {
        existingRipple.remove();
    }

    element.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 600);
}

document.addEventListener('DOMContentLoaded', () => {
    const rippleElements = document.querySelectorAll('.nameBox, .languagesBox, .educationBox, .extraBox, .toolsBox, .experienceBox, .jobItem, .lastJobItem, .interestTag, .toolIcon, .profileImg, .card-title, .tag, .contact-text, .progressFill, .toolGroup');
    rippleElements.forEach(el => {
        el.addEventListener('click', createRipple);
    });
});

function saveAllEditable() {
    document.querySelectorAll('[contenteditable="true"]').forEach((el, idx) => {
        const key = el.getAttribute('data-key') || `editable_${idx}_${el.innerText.slice(0,20)}`;
        if (!el.getAttribute('data-key')) el.setAttribute('data-key', key);
        localStorage.setItem(key, el.innerHTML);
    });
}

function loadAllEditable() {
    document.querySelectorAll('[contenteditable="true"]').forEach((el, idx) => {
        const key = el.getAttribute('data-key');
        if(key && localStorage.getItem(key)) {
            el.innerHTML = localStorage.getItem(key);
        } else if(!key) {
            const newKey = `editable_${idx}_${el.innerText.slice(0,20)}`;
            el.setAttribute('data-key', newKey);
            if(localStorage.getItem(newKey)) el.innerHTML = localStorage.getItem(newKey);
        }
    });
}

let originalContents = [];

function saveOriginalContents() {
    originalContents = [];
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
        originalContents.push({
            element: el,
            content: el.innerHTML
        });
    });
}

function resetToOriginal() {
    originalContents.forEach(item => {
        item.element.innerHTML = item.content;
    });
    localStorage.clear();
}

document.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.addEventListener('input', saveAllEditable);
    el.addEventListener('blur', saveAllEditable);
});

window.addEventListener('load', () => {
    saveOriginalContents();
    loadAllEditable();
    saveAllEditable();
});

document.getElementById('downloadPDF').addEventListener('click', function() {
    window.print();
});

document.getElementById('resetBtn').addEventListener('click', function() {
    resetToOriginal();
});
