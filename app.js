// Initial Unified Course Dataset (Paid & Unpaid on Equal Footing)
const INITIAL_COURSES = [
  {
    id: 1,
    title: "Complete C++ Data Structures & Algorithms (A2Z Sheet)",
    provider: "TakeUForward / YouTube",
    domain: "DSA & Programming",
    type: "Free",
    price: "₹0 (100% Free)",
    rating: 4.9,
    reviews: "45k",
    duration: "90 Hours",
    certificate: false,
    partner: true,
    promoCode: "STRIVERFREE",
    confidence: 98,
    syllabus: ["Arrays & Pointers", "Linked Lists & Stacks", "Trees & Graphs", "Dynamic Programming"],
    verdict: "Outperforms most ₹5,000+ paid bootcamps for coding interviews and placement prep."
  },
  {
    id: 2,
    title: "Mastering Data Structures & Algorithms using C and C++",
    provider: "Udemy (Abdul Bari)",
    domain: "DSA & Programming",
    type: "Paid",
    price: "₹499",
    rating: 4.8,
    reviews: "98k",
    duration: "58 Hours",
    certificate: true,
    partner: false,
    promoCode: "EDUBRIDGE20",
    confidence: 94,
    syllabus: ["Memory Allocation", "Recursion Deep Dive", "Sorting & Trees", "Visual Dry Runs"],
    verdict: "Unbeatable visual whiteboard explanations for university exams and core C/C++ intuition."
  },
  {
    id: 3,
    title: "Machine Learning & Applied AI Specialization",
    provider: "Coursera / DeepLearning.AI",
    domain: "AI & Machine Learning",
    type: "Paid",
    price: "₹2,499 (Fin-Aid Available)",
    rating: 4.9,
    reviews: "125k",
    duration: "80 Hours",
    certificate: true,
    partner: true,
    promoCode: "AISCHOLAR50",
    confidence: 97,
    syllabus: ["Supervised Learning", "Neural Networks", "Recommender Systems", "Scikit-Learn & TensorFlow"],
    verdict: "Industry gold-standard certification with balanced mathematical intuition and coding labs."
  },
  {
    id: 4,
    title: "Introduction to Machine Learning (IIT Madras)",
    provider: "NPTEL / Swayam Portal",
    domain: "AI & Machine Learning",
    type: "Free",
    price: "₹0 (Free Learning)",
    rating: 4.7,
    reviews: "22k",
    duration: "12 Weeks",
    certificate: true,
    partner: false,
    promoCode: "GOVT-OPEN",
    confidence: 92,
    syllabus: ["Linear Regression", "Decision Trees & SVM", "Clustering", "Probabilistic Models"],
    verdict: "Rigorous IIT-level academic depth at zero learning cost; ideal for GATE and research foundations."
  },
  {
    id: 5,
    title: "Full-Stack Web Development Cohort (React, Node.js, MongoDB)",
    provider: "Indie Creator Cohort",
    domain: "Full-Stack Web Dev",
    type: "Paid",
    price: "₹999",
    rating: 4.8,
    reviews: "4.2k",
    duration: "48 Hours",
    certificate: true,
    partner: true,
    promoCode: "COLLAB30",
    confidence: 95,
    syllabus: ["React.js & Tailwind", "Node.js & Express", "MongoDB Atlas", "AI Tool Integration"],
    verdict: "Hands-on creator cohort with 30% discount unlocked via EduBridge mutual cross-promotion."
  },
  {
    id: 6,
    title: "Full Stack Open: Modern Web Application Development",
    provider: "University of Helsinki",
    domain: "Full-Stack Web Dev",
    type: "Free",
    price: "₹0 (Free + Official Cert)",
    rating: 4.9,
    reviews: "31k",
    duration: "65 Hours",
    certificate: true,
    partner: true,
    promoCode: "UNIFREE",
    confidence: 96,
    syllabus: ["React & State Management", "Node.js & Express APIs", "TypeScript", "MongoDB & Testing"],
    verdict: "Rare gem offering both modern full-stack project depth and a free university certificate."
  }
];

let courses = JSON.parse(localStorage.getItem('edubridge_courses')) || INITIAL_COURSES;
let currentPriceFilter = 'All';
let compareList = [1, 2];
let totalAffiliateClicks = 3412;

function saveCourses() {
  localStorage.setItem('edubridge_courses', JSON.stringify(courses));
}

function switchTab(tabName) {
  ['explore', 'roadmap', 'creators', 'metrics'].forEach(t => {
    document.getElementById(`view-${t}`).classList.add('hidden');
    document.getElementById(`tab-${t}`).classList.remove('active-tab');
  });
  document.getElementById(`view-${tabName}`).classList.remove('hidden');
  document.getElementById(`tab-${tabName}`).classList.add('active-tab');

  if (tabName === 'roadmap') generateAIRoadmap();
}

function setPriceFilter(filter) {
  currentPriceFilter = filter;
  ['All', 'Free', 'Paid'].forEach(f => {
    const btn = document.getElementById(`filter-${f}`);
    if (f === filter) {
      btn.className = "price-pill bg-amber-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-extrabold transition";
    } else {
      btn.className = "price-pill bg-white/15 text-white hover:bg-white/25 px-4 py-2 rounded-lg text-xs font-bold transition";
    }
  });
  renderCourses();
}

function renderCourses() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const certOnly = document.getElementById('cert-filter').checked;
  const partnerOnly = document.getElementById('partner-filter').checked;
  const domain = document.getElementById('domain-filter').value;

  const filtered = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(query) ||
                          c.provider.toLowerCase().includes(query) ||
                          c.syllabus.join(' ').toLowerCase().includes(query);
    const matchesPrice = currentPriceFilter === 'All' || c.type === currentPriceFilter;
    const matchesCert = !certOnly || c.certificate;
    const matchesPartner = !partnerOnly || c.partner;
    const matchesDomain = domain === 'All' || c.domain === domain;
    return matchesSearch && matchesPrice && matchesCert && matchesPartner && matchesDomain;
  });

  document.getElementById('course-counter').innerText = `Showing ${filtered.length} unbiased courses (Paid & Free at equal level)`;
  document.getElementById('compare-count').innerText = `${compareList.length}/3`;

  const grid = document.getElementById('course-grid');
  grid.innerHTML = filtered.map(c => {
    const inCompare = compareList.includes(c.id);
    return `
      <div class="course-card bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start gap-2 mb-3">
            <span class="text-xs font-extrabold px-2.5 py-1 rounded-full ${
              c.type === 'Free' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
            }">
              ${c.price}
            </span>
            <div class="flex items-center gap-1.5">
              ${c.partner ? `<span class="text-[11px] bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full">★ Partner Spotlight</span>` : ''}
              <span class="text-[11px] bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded-full">
                AI Fit: ${c.confidence}%
              </span>
            </div>
          </div>

          <p class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">${c.provider}</p>
          <h3 class="font-extrabold text-base text-slate-900 mb-2 leading-snug">${c.title}</h3>

          <div class="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-3">
            <span class="font-bold text-amber-600">★ ${c.rating} (${c.reviews})</span>
            <span>• ${c.duration}</span>
            <span>• ${c.certificate ? '<strong class="text-emerald-700">✓ Certificate</strong>' : 'No Cert'}</span>
          </div>

          <div class="flex flex-wrap gap-1.5 mb-4">
            ${c.syllabus.map(topic => `<span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">${topic}</span>`).join('')}
          </div>

          <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
            <p class="text-xs text-slate-700">
              <strong class="text-indigo-950">AI Verdict:</strong> "${c.verdict}"
            </p>
            <p class="text-[11px] text-amber-800 font-bold mt-1.5">
              Mutual Promo Code: <code class="bg-amber-100 px-1.5 py-0.5 rounded">${c.promoCode}</code>
            </p>
          </div>
        </div>

        <div class="flex gap-2 pt-3 border-t border-slate-100">
          <button onclick="toggleCompare(${c.id})" class="flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition ${
            inCompare ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
          }">
            ${inCompare ? '✓ In Compare Tray' : '+ Add to Compare'}
          </button>
          <button onclick="trackEnrollment('${c.title}')" class="bg-slate-900 hover:bg-indigo-600 text-white py-2 px-3.5 rounded-xl text-xs font-bold transition">
            Enroll ↗
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function toggleCompare(id) {
  if (compareList.includes(id)) {
    compareList = compareList.filter(item => item !== id);
  } else {
    if (compareList.length >= 3) {
      alert("You can compare up to 3 courses side-by-side. Remove one to add another.");
      return;
    }
    compareList.push(id);
  }
  renderCourses();
}

function openCompareModal() {
  const modal = document.getElementById('compare-modal');
  const container = document.getElementById('compare-Modal-content');
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  const selected = courses.filter(c => compareList.includes(c.id));
  if (selected.length === 0) {
    container.innerHTML = `<p class="col-span-3 text-center py-8 text-slate-500">Select up to 3 courses from the catalog to compare side-by-side.</p>`;
    return;
  }

  container.innerHTML = selected.map(c => `
    <div class="border border-slate-200 rounded-xl p-5 bg-slate-50 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-xs font-extrabold px-2.5 py-1 rounded-full ${c.type === 'Free' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'}">
            ${c.price}
          </span>
          <span class="text-xs font-bold text-indigo-700">AI Match: ${c.confidence}%</span>
        </div>
        <h4 class="font-extrabold text-base text-slate-900 mb-1">${c.title}</h4>
        <p class="text-xs font-bold text-indigo-600 mb-4">${c.provider}</p>

        <div class="text-xs space-y-2.5 border-t border-slate-200 pt-3">
          <p><strong>Rating:</strong> ★ ${c.rating} (${c.reviews} learners)</p>
          <p><strong>Time Commitment:</strong> ${c.duration}</p>
          <p><strong>Certificate:</strong> ${c.certificate ? '✅ Included' : '❌ Not Included'}</p>
          <p><strong>Partner Promo Code:</strong> <code class="bg-amber-100 px-1.5 py-0.5 rounded font-bold text-amber-900">${c.promoCode}</code></p>
          <div>
            <strong>Syllabus Covered:</strong>
            <ul class="list-disc list-inside mt-1 text-slate-600 space-y-0.5">
              ${c.syllabus.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
          <p class="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 mt-2">
            <strong>AI Verdict:</strong> ${c.verdict}
          </p>
        </div>
      </div>
      <button onclick="removeFromCompare(${c.id})" class="mt-4 w-full border border-rose-200 text-rose-600 hover:bg-rose-50 py-1.5 rounded-lg text-xs font-bold">
        Remove from Comparison
      </button>
    </div>
  `).join('');
}

function closeCompareModal() {
  const modal = document.getElementById('compare-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function removeFromCompare(id) {
  compareList = compareList.filter(item => item !== id);
  openCompareModal();
  renderCourses();
}

function generateAIRoadmap() {
  const goal = document.getElementById('ai-goal').value;
  const budget = document.getElementById('ai-budget').value;

  const matched = courses.filter(c => {
    const domainMatch = c.domain === goal;
    const budgetMatch = budget === 'All' || c.type === 'Free';
    return domainMatch && budgetMatch;
  }).sort((a, b) => b.confidence - a.confidence);

  const output = document.getElementById('ai-roadmap-output');
  output.innerHTML = matched.map((c, index) => `
    <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-extrabold bg-indigo-600 text-white px-2.5 py-0.5 rounded">STEP ${index + 1}</span>
          <span class="text-xs font-extrabold ${c.type === 'Free' ? 'text-emerald-700 bg-emerald-100' : 'text-indigo-700 bg-indigo-100'} px-2.5 py-0.5 rounded">
            ${c.price}
          </span>
          <span class="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
            AI Confidence Score: ${c.confidence}%
          </span>
        </div>
        <h4 class="font-extrabold text-base text-slate-900 mt-1">${c.title} <span class="text-xs font-semibold text-indigo-600">(${c.provider})</span></h4>
        <p class="text-xs text-slate-600 mt-1">${c.verdict}</p>
      </div>
      <button onclick="toggleCompare(${c.id}); switchTab('explore');" class="bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold shrink-0">
        View in Catalog
      </button>
    </div>
  `).join('');
}

function submitCreatorCourse(e) {
  e.preventDefault();
  const newCourse = {
    id: Date.now(),
    title: document.getElementById('c-title').value,
    provider: document.getElementById('c-provider').value,
    domain: document.getElementById('c-domain').value,
    type: document.getElementById('c-type').value,
    price: document.getElementById('c-price').value,
    rating: 4.9,
    reviews: "New Partner",
    duration: "Self-Paced",
    certificate: true,
    partner: true,
    promoCode: document.getElementById('c-promo').value.toUpperCase(),
    confidence: 96,
    syllabus: document.getElementById('c-syllabus').value.split(',').map(s => s.trim()),
    verdict: "Verified Creator Partner course with mutual promotion discount unlocked."
  };

  courses.unshift(newCourse);
  saveCourses();
  e.target.reset();
  alert("Course published! Your mutual promotion 'Partner Spotlight' badge is now live on the Unified Catalog.");
  switchTab('explore');
  renderCourses();
}

function copySnippet() {
  const snippet = document.getElementById('partner-snippet').innerText;
  navigator.clipboard.writeText(snippet);
  const btn = document.getElementById('copy-btn');
  btn.innerText = "✓ Copied Mutual Promotion Link!";
  setTimeout(() => btn.innerText = "Copy Mutual Promotion Link", 2500);
}

function trackEnrollment(title) {
  totalAffiliateClicks++;
  document.getElementById('metric-clicks').innerText = totalAffiliateClicks.toLocaleString();
  alert(`Redirecting to "${title}" with EduBridge Referral Tracking active!`);
}

// Initialize on load
window.onload = () => {
  renderCourses();
  lucide.createIcons();
};