(function () {
  const body = document.getElementById("terminal-body");
  const input = document.getElementById("term-input");
  if (!body || !input) return;

  const inputLine = input.closest(".term-input-line");
  let history = [];
  let historyPos = -1;

  const commands = {
    help: () => [
      "Available commands:",
      "  whoami        - who am I",
      "  about         - short bio",
      "  skills        - technical skills",
      "  projects      - list of projects",
      "  publications  - dissertation / arXiv preprint",
      "  education     - education background",
      "  experience    - work experience",
      "  blog          - notes & writing",
      "  contact       - how to reach me",
      "  clear         - clear the terminal",
      "",
      "Psst... try 'sudo hire-me', 'coffee', or 'joke'.",
    ],
    whoami: () => ["ali-mert-karaoglu", "role: AI Researcher / NLP & Explainable AI"],
    about: () => [
      "First-Class Honours graduate, Computer Science with AI, University of Nottingham.",
      "Focused on LLMs, NLP, Explainable AI, AI Safety, and trustworthy machine learning.",
      "Starting an MSc in Cognitive Science at the University of Edinburgh in Sep 2026.",
    ],
    skills: () => [
      "Languages     : Python (Advanced), SQL, C, Java, Lean 3/4 (Intermediate)",
      "AI / ML       : Machine Learning (Advanced), NLP, Zero-shot Learning, LLMs (Intermediate)",
      "Other         : Haskell, Assembler, HTML/CSS, JavaScript (Beginner)",
    ],
    projects: () => [
      "1. Agent-Based Fire Evacuation Simulation",
      "2. Breast Cancer Treatment Outcome Prediction",
      "3. NLP-Based Chatbot",
      "4. My Robot Avatar (ROS 2 + LLM multimodal interface)",
      "5. Learning-Based Hyper-Heuristic for the Sight-Seeing Problem",
      "",
      "Scroll to the Projects section above for details (click each card to expand).",
    ],
    education: () => [
      "MSc Cognitive Science - University of Edinburgh (Sep 2026, incoming)",
      "BSc Computer Science with AI - University of Nottingham (Sep 2023-Jul 2026, First-Class Honours)",
    ],
    experience: () => [
      "AI and Data Science Assistant Expert (Intern) - BNP Paribas (Jul-Aug 2025)",
      "Team Admin, My Robot Avatar Group Project - Univ. of Nottingham (Sep 2024-Jun 2025)",
    ],
    blog: () => [
      "No posts yet — coming soon.",
      "Scroll up to the Blog section to check back later.",
    ],
    contact: () => [
      "email    : alimert.karaoglu@hotmail.com",
      "linkedin : linkedin.com/in/ali-mert-karaoglu",
      "location : Edinburgh, United Kingdom",
    ],
    publications: () => [
      "Dissertation: Zero-Shot Learning & Explainability for Stock Market Movement Prediction.",
      "Preprint: https://arxiv.org/abs/2606.12210",
      "Manuscript under peer review at Springer Nature's SN Computer Science.",
    ],
    "sudo hire-me": () => [
      "[sudo] password for recruiter: ********",
      "Access granted.",
      "Initiating hiring sequence... 100%",
      "Result: excellent decision. Reach out via the contact section ✔",
    ],
    coffee: () => ["☕ brewing... here you go. Fuel for late-night model training."],
    joke: () => [
      pickJoke(),
    ],
    clear: () => {
      Array.from(body.children).forEach((child) => {
        if (child !== inputLine) child.remove();
      });
      return null;
    },
  };

  const jokes = [
    "Why did the neural network go to therapy? Too many hidden layers of trauma.",
    "I trained a model to predict jokes. It overfit to dad jokes.",
    "There are 10 types of people: those who understand binary, and those who don't.",
    "My code doesn't have bugs. It has undocumented features.",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "I asked my LLM for a joke. It hallucinated a punchline that never lands.",
    "Gradient descent walks into a bar. Keeps taking smaller steps until it can't find the door.",
    "Why was the AI Safety researcher always calm? Because they aligned their expectations.",
    "My model's confidence is inversely proportional to its accuracy.",
    "Explainable AI: because 'trust me bro' isn't a valid feature importance score.",
    "I told a joke about overfitting. It only made sense to my training data.",
    "Why did the transformer break up with the RNN? It couldn't stop attending to everyone else.",
    "99 little bugs in the code, 99 little bugs. Take one down, patch it around, 127 little bugs in the code.",
    "I'm not saying my thesis was rushed, but even my p-values were nervous.",
    "Why do neural nets make bad comedians? Their timing is off by one epoch.",
  ];

  let jokeBag = [];

  function pickJoke() {
    if (jokeBag.length === 0) {
      jokeBag = [...jokes];
    }
    const idx = Math.floor(Math.random() * jokeBag.length);
    return jokeBag.splice(idx, 1)[0];
  }

  function appendLine(text, cls) {
    const line = document.createElement("div");
    line.className = "term-line " + (cls || "term-output");
    line.textContent = text;
    body.insertBefore(line, inputLine);
  }

  function appendPromptEcho(cmd) {
    const line = document.createElement("div");
    line.className = "term-line";
    line.innerHTML = `<span class="term-prompt">ali@portfolio:~$</span> ${escapeHtml(cmd)}`;
    body.insertBefore(line, inputLine);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function runCommand(raw) {
    const cmd = raw.trim();
    if (cmd.length === 0) return;

    appendPromptEcho(cmd);
    history.push(cmd);
    historyPos = history.length;

    const key = cmd.toLowerCase();
    const handler = commands[key];

    if (!handler) {
      appendLine(`command not found: ${cmd} (type 'help' for a list of commands)`, "term-error");
      scrollToBottom();
      return;
    }

    const output = handler();
    if (output) {
      output.forEach((line) => appendLine(line));
    }
    scrollToBottom();
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runCommand(input.value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyPos > 0) {
        historyPos--;
        input.value = history[historyPos] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPos < history.length - 1) {
        historyPos++;
        input.value = history[historyPos] || "";
      } else {
        historyPos = history.length;
        input.value = "";
      }
    }
  });

  body.addEventListener("click", () => input.focus());
})();
