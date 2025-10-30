# 🌳 JSON Tree Visualizer

A simple and interactive web app built with **React + SCSS** to visualize complex JSON data as a clean hierarchical tree structure.  
You can paste any JSON, click “Generate Tree,” and instantly explore it in an organized node-based layout.

---

## ✨ Features

- 🧩 Converts any valid JSON into a **tree-like structure**  
- 🌈 Clean color-coded nodes for keys and values  
- 🌓 **Dark/Light mode** toggle for better visibility  
- 🔍 Search bar to quickly find nested keys (like `user.address.city`)  
- ⚡ Built using **React**, **React Flow**, and **SCSS**  
- 🎨 Slightly “imperfect” student-style UI (not overly polished)

---

## 📸 Preview
<img width="1911" height="905" alt="Screenshot 2025-10-30 175001" src="https://github.com/user-attachments/assets/ca0c6238-0efd-4b98-9027-af68fb51da08" />

---

## 🏗️ Project Structure

├── src/
│ ├── components/
│ │ ├── JsonInput.jsx
│ │ ├── TreeVisualizer.jsx
│ │ └── SearchBar.jsx
│ ├── styles/
│ │ ├── colors.scss
│ │ ├── App.scss
│ │ └── Tree.scss
│ ├── utils/
│ │ └── jsonToFlowNodes.js
│ ├── App.jsx
│ ├── index.js
│ └── theme.js
├── public/
│ └── index.html
└── package.json


---

## 🧠 How It Works

1. You paste JSON data into the input box.  
2. On clicking **“Generate Tree”**, it runs a recursive parser (`jsonToFlowNodes.js`)  
3. This converts nested JSON into nodes + edges for **React Flow**.  
4. Each node represents a **key-value pair**, styled via SCSS.  
5. You can search the nodes with thier respective labels.

---

## ⚙️ Installation & Setup

```bash
# Clone this repository
git clone https://github.com/<your-username>/json-tree-visualizer.git

# Move into the project directory
cd json-tree-visualizer

# Install dependencies
npm install

# Start the development server
npm start
