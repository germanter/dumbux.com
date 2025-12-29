export function renderGames(containerId, limit = null){
  const grid = document.getElementById(containerId);
  
  if (!grid) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  grid.innerHTML = "";

  let processedGames;

  if (limit) {
    processedGames = shuffleArray([...games]).slice(0, limit);
  } else {
    processedGames = games;
  }

  const shuffledColors = shuffleArray([...colorPalette]);

  
  processedGames.forEach((game,index) => {
    const color = shuffledColors[index % shuffledColors.length];
    const card = document.createElement("div");
    card.className = `
      game-card   bg-gradient-to-br from-${color}-50 to-${color}-50
      rounded-2xl p-2 md:p-8 border-2 border-${color}-200 hover:border-${color}-400
    `;

    const holderUrl = "/" + game.slug;

    card.innerHTML = `
      <h3 class="text-xl font-semibold text-slate-800 mb-6 text-center">
        ${game.title}
      </h3>

      <div class="relative w-full h-40 mb-6 overflow-hidden rounded-xl border border-${color}-200">
        <img 
          src="${game.imgLink}" 
          alt="${game.title}" 
          class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          onerror="this.src='https://via.placeholder.com/300x200?text=Game+Image'"
        />
      </div>

      <button 
        class="w-full bg-${color}-600 hover:bg-${color}-700 text-white font-semibold py-3 rounded-xl transition-colors"
        onclick="safeNavigate('${holderUrl}')">
        Play Now
      </button>
    `;

    grid.appendChild(card);
  });
}
