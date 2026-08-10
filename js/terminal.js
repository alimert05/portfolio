(function () {
  const body = document.getElementById("terminal-body");
  const input = document.getElementById("term-input");
  if (!body || !input) return;

  const inputLine = input.closest(".term-input-line");
  let history = [];
  let historyPos = -1;

  const PUBLICATION_URL = "https://arxiv.org/abs/2606.12210";

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
      "  play          - market sentiment challenge (beat the AI)",
      "  contact       - how to reach me",
      "  clear         - clear the terminal",
      "",
      "Psst... a couple of easter eggs are hiding in here too.",
    ],
    whoami: () => ["ali-mert-karaoglu", "role: AI Researcher / NLP & Explainable AI"],
    about: () => [
      "First-Class Honours graduate, Computer Science with AI, University of Nottingham.",
      "Focused on LLMs, NLP, Explainable AI, AI Safety, and trustworthy machine learning.",
      "Starting an MSc in Cognitive Science at the University of Edinburgh in Sep 2026.",
    ],
    skills: () => [
      "AI / ML       : Machine Learning (Advanced), Deep Learning, NLP, LLMs, Zero-shot Learning, XAI (Intermediate)",
      "Frameworks    : PyTorch, Transformers, scikit-learn, Pandas, NumPy, SHAP",
      "Research      : Experimental Design, Statistical Analysis, Data Analysis, Git, Linux",
      "Languages     : Python (Advanced), SQL, C, Java, Lean 3/4 (Intermediate)",
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
    blog: () => {
      window.open("blog.html", "_blank");
      return ["Opening blog.html in a new tab...", "No posts yet — check back soon."];
    },
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
    publication: () => {
      window.open(PUBLICATION_URL, "_blank");
      return ["Opening publication...", PUBLICATION_URL];
    },
    play: () => {
      startGame();
      return null;
    },
    replay: () => {
      startGame();
      return null;
    },
    "sudo hire-me": () => {
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
      }, 700);
      return [
        "Permission granted.",
        "Opening contact information...",
      ];
    },
    coffee: () => ["Error: researcher already caffeinated."],
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

  // ===== Market Sentiment Challenge =====
  const HEADLINES = [
    {
      text: "\"Company X reports record quarterly revenue, beating analyst expectations.\"",
      answer: 1,
      ai: 1,
    },
    {
      text: "\"Regulators launch investigation into Company Y's accounting practices.\"",
      answer: 2,
      ai: 2,
    },
    {
      text: "\"Central bank holds interest rates steady, in line with market expectations.\"",
      answer: 3,
      ai: 3,
    },
    {
      text: "\"Company Z announces mass layoffs amid falling consumer demand.\"",
      answer: 2,
      ai: 2,
    },
    {
      text: "\"Tech firm unveils breakthrough AI chip, shares surge in pre-market trading.\"",
      answer: 1,
      ai: 1,
    },
  ];

  const gameState = {
    active: false,
    index: 0,
    userScore: 0,
    aiScore: 0,
  };

  function startGame() {
    gameState.active = true;
    gameState.index = 0;
    gameState.userScore = 0;
    gameState.aiScore = 0;

    appendLine("");
    appendLine("INITIALIZING MARKET SENTIMENT CHALLENGE...", "term-accent");
    appendLine("");
    appendLine("Can you beat a zero-shot AI model?");
    showHeadline();
  }

  function showHeadline() {
    const h = HEADLINES[gameState.index];
    appendLine("");
    appendLine("Headline:");
    appendLine(h.text);
    appendLine("");
    appendLine("[1] BULLISH");
    appendLine("[2] BEARISH");
    appendLine("[3] NEUTRAL");
    appendLine("");
    appendLine("Your prediction (1/2/3):");
  }

  function handleGameInput(raw) {
    const cmd = raw.trim();
    const choice = parseInt(cmd, 10);

    if (![1, 2, 3].includes(choice)) {
      appendLine("Please enter 1, 2, or 3.", "term-error");
      return;
    }

    const h = HEADLINES[gameState.index];
    if (choice === h.answer) gameState.userScore++;
    if (h.ai === h.answer) gameState.aiScore++;

    gameState.index++;

    if (gameState.index < HEADLINES.length) {
      showHeadline();
    } else {
      endGame();
    }
  }

  function endGame() {
    gameState.active = false;
    appendLine("");
    appendLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    appendLine("");
    appendLine(`YOU        ${gameState.userScore}/${HEADLINES.length}`);
    appendLine(`AI MODEL   ${gameState.aiScore}/${HEADLINES.length}`);
    appendLine("");
    if (gameState.userScore > gameState.aiScore) {
      appendLine("YOU WIN! 🎉", "term-accent");
    } else if (gameState.userScore < gameState.aiScore) {
      appendLine("AI WINS.", "term-accent");
    } else {
      appendLine("IT'S A TIE.", "term-accent");
    }
    appendLine("");
    appendLine("Think you can do better? Type 'replay' to try again.");
    appendLine("");
    appendLine("Based on my research in zero-shot financial sentiment analysis.");
    appendLine("Type 'publication' to read the paper.");
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

    if (gameState.active) {
      handleGameInput(cmd);
      scrollToBottom();
      return;
    }

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
