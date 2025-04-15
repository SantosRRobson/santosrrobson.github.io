const board = document.getElementById("board");
const totalRows = 4;
const totalCols = 4;
let selected = [];

function createPieces() {
  board.innerHTML = "";

  let pieces = [];

  for (let r = 1; r <= totalRows; r++) {
    for (let c = 1; c <= totalCols; c++) {
      const piece = document.createElement("div");
      piece.classList.add("piece");
      piece.style.setProperty("--r", r);
      piece.style.setProperty("--c", c);
      piece.dataset.row = r;
      piece.dataset.col = c;
      pieces.push(piece);
    }
  }

  shuffleArray(pieces);

  pieces.forEach(piece => {
    board.appendChild(piece);
    piece.addEventListener("click", () => handleSelect(piece));
  });
}

function handleSelect(piece) {
  if (selected.length === 0) {
    selected.push(piece);
    piece.classList.add("selected");
  } else if (selected.length === 1 && piece !== selected[0]) {
    selected.push(piece);
    swapPieces(selected[0], selected[1]);
    selected.forEach(p => p.classList.remove("selected"));
    selected = [];
  }
}

function swapPieces(p1, p2) {
  const tempR = p1.style.getPropertyValue("--r");
  const tempC = p1.style.getPropertyValue("--c");

  p1.style.setProperty("--r", p2.style.getPropertyValue("--r"));
  p1.style.setProperty("--c", p2.style.getPropertyValue("--c"));

  p2.style.setProperty("--r", tempR);
  p2.style.setProperty("--c", tempC);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function handleStartGame() {
  document.querySelector(".overlay").style.display = "none";
  createPieces();
}