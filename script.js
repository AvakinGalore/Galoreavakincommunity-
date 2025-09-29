/* === GAC App Script === */

// App state stored in localStorage
const App = {
  user: null,
  data: {
    users: [],
    posts: [],
    businesses: [],
    properties: [],
    courses: [],
    stocks: [
      { name: "GAC Corp", price: 100 },
      { name: "Avakin Media", price: 75 },
      { name: "Virtual Realty", price: 120 }
    ]
  },

  // Initialize
  init() {
    this.load();
    this.bindNav();
    this.bindForms();
    this.updateUI();
    console.log("✅ GAC App Initialized");
  },

  // Load data from localStorage
  load() {
    const saved = localStorage.getItem("gac-data");
    if (saved) this.data = JSON.parse(saved);
    const currentUser = localStorage.getItem("gac-user");
    if (currentUser) this.user = JSON.parse(currentUser);
  },

  // Save data
  save() {
    localStorage.setItem("gac-data", JSON.stringify(this.data));
    if (this.user) localStorage.setItem("gac-user", JSON.stringify(this.user));
  },

  // Update UI
  updateUI() {
    // Update user info
    document.getElementById("username").textContent = this.user ? this.user.name : "Guest";
    document.getElementById("logout-btn").style.display = this.user ? "inline-block" : "none";

    // Wallet
    if (this.user) {
      document.getElementById("wallet").innerHTML =
        `<h3>Wallet Balance: $${this.user.balance || 0}</h3>`;
    }

    // Stocks
    const stocksDiv = document.getElementById("stocks");
    if (stocksDiv) {
      stocksDiv.innerHTML = "<h3>Stock Market</h3>";
      this.data.stocks.forEach((s, i) => {
        stocksDiv.innerHTML += `<p>${s.name}: $${s.price} <button onclick="App.buyStock(${i})">Buy</button></p>`;
      });
    }

    // Businesses
    const bizList = document.getElementById("business-list");
    if (bizList) {
      bizList.innerHTML = this.data.businesses
        .filter(b => b.owner === (this.user ? this.user.name : ""))
        .map(b => `<li>${b.name} — Revenue: $${b.revenue}</li>`)
        .join("");
    }

    // Properties
    const propList = document.getElementById("property-list");
    if (propList) {
      propList.innerHTML = this.data.properties
        .filter(p => p.owner === (this.user ? this.user.name : ""))
        .map(p => `<li>${p.name} (${p.type}) — Value: $${p.value}</li>`)
        .join("");
    }

    // Courses
    const courseList = document.getElementById("course-list");
    if (courseList) {
      courseList.innerHTML = this.data.courses
        .map(c => `<li>${c.name} (by ${c.creator})</li>`)
        .join("");
    }

    // Posts
    const feed = document.getElementById("post-feed");
    if (feed) {
      feed.innerHTML = this.data.posts
        .map(p => `<li><strong>${p.author}:</strong> ${p.content}</li>`)
        .join("");
    }

    // Admin report
    const report = document.getElementById("report");
    if (report) {
      report.textContent = JSON.stringify(this.data, null, 2);
    }
  },

  // Navigation
  bindNav() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
        document.getElementById(btn.dataset.section).classList.add("active");
        document.getElementById("section-title").textContent = btn.textContent;
      });
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
      this.user = null;
      localStorage.removeItem("gac-user");
      this.updateUI();
    });

    document.getElementById("signup-btn").addEventListener("click", () => {
      const name = prompt("Enter your username:");
      if (!name) return;
      let user = this.data.users.find(u => u.name === name);
      if (!user) {
        user = { name, balance: 1000 };
        this.data.users.push(user);
        this.save();
      }
      this.user = user;
      this.save();
      this.updateUI();
    });
  },

  // Forms
  bindForms() {
    // Economy
    document.getElementById("deposit-btn").addEventListener("click", () => {
      const amount = parseInt(document.getElementById("amount").value);
      if (this.user && amount > 0) {
        this.user.balance += amount;
        this.save(); this.updateUI();
      }
    });

    document.getElementById("withdraw-btn").addEventListener("click", () => {
      const amount = parseInt(document.getElementById("amount").value);
      if (this.user && amount > 0 && this.user.balance >= amount) {
        this.user.balance -= amount;
        this.save(); this.updateUI();
      }
    });

    // Businesses
    document.getElementById("add-business-btn").addEventListener("click", () => {
      const name = document.getElementById("business-name").value;
      if (this.user && name) {
        this.data.businesses.push({ owner: this.user.name, name, revenue: 100 });
        this.save(); this.updateUI();
      }
    });

    // Properties
    document.getElementById("add-property-btn").addEventListener("click", () => {
      const name = document.getElementById("property-name").value;
      const type = document.getElementById("property-type").value;
      if (this.user && name && type) {
        this.data.properties.push({ owner: this.user.name, name, type, value: 500 });
        this.save(); this.updateUI();
      }
    });

    // Courses
    document.getElementById("add-course-btn").addEventListener("click", () => {
      const name = document.getElementById("course-name").value;
      if (this.user && name) {
        this.data.courses.push({ creator: this.user.name, name });
        this.save(); this.updateUI();
      }
    });

    // Posts
    document.getElementById("add-post-btn").addEventListener("click", () => {
      const content = document.getElementById("post-content").value;
      if (this.user && content) {
        this.data.posts.push({ author: this.user.name, content });
        this.save(); this.updateUI();
      }
    });

    // Admin
    document.getElementById("seed-data-btn").addEventListener("click", () => {
      this.data.posts.push({ author: "System", content: "Welcome to GAC!" });
      this.data.businesses.push({ owner: "System", name: "Demo Corp", revenue: 500 });
      this.data.properties.push({ owner: "System", name: "HQ", type: "Commercial", value: 5000 });
      this.save(); this.updateUI();
    });

    document.getElementById("clear-data-btn").addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all data?")) {
        this.data = { users: [], posts: [], businesses: [], properties: [], courses: [], stocks: this.data.stocks };
        this.user = null;
        this.save(); this.updateUI();
      }
    });
  },

  // Buy stock simulation
  buyStock(index) {
    if (!this.user) return;
    const stock = this.data.stocks[index];
    if (this.user.balance >= stock.price) {
      this.user.balance -= stock.price;
      alert(`You bought 1 share of ${stock.name} for $${stock.price}`);
      // Simulate price change
      stock.price = Math.max(10, stock.price + (Math.random() * 20 - 10));
      this.save(); this.updateUI();
    } else {
      alert("Not enough balance!");
    }
  }
};

window.onload = () => App.init();
