let team = {GK: [], DF: [], MF: [], FW: []};
const MAX_SLOTS = {GK:1, DF:2, MF:1, FW:1};  // ← NEW STRUCTURE
const BUDGET = 30;

// ALL 50 PLAYERS + PERFECT CLASSES
const allPlayers = [
  // Goalkeepers (GK)
  {name:'Darren',position:'GK',price:5.5,class:'S',points:0},
  {name:'Neervan',position:'GK',price:5,class:'B',points:0},
  {name:'Zaigham',position:'GK',price:4,class:'M',points:0},
  {name:'Mathis',position:'GK',price:3.5,class:'M',points:0},
  {name:'Kaivalya',position:'GK',price:3,class:'I',points:0},
  
  // Defenders (DF)
  {name:'Tyler',position:'DF',price:8.5,class:'M',points:0},
  {name:'Vahin',position:'DF',price:7,class:'L',points:0},
  {name:'Adam',position:'DF',price:5.5,class:'M',points:0},
  {name:'Pallaven',position:'DF',price:5.5,class:'S',points:0},
  {name:'Lucas L',position:'DF',price:5,class:'S',points:0},
  {name:'Gavishen',position:'DF',price:5,class:'I',points:0},
  {name:'Derek',position:'DF',price:4.5,class:'M',points:0},
  {name:'Rushil',position:'DF',price:4.5,class:'S',points:0},
  {name:'Homesh',position:'DF',price:4.5,class:'B',points:0},
  {name:'Sacha',position:'DF',price:4.5,class:'B',points:0},
  {name:'Neel',position:'DF',price:4.5,class:'L',points:0},
  {name:'Tariq',position:'DF',price:4.5,class:'L',points:0},
  {name:'Sham',position:'DF',price:4,class:'B',points:0},
  {name:'Neil',position:'DF',price:4,class:'L',points:0},
  {name:'Bruce',position:'DF',price:4,class:'L',points:0},
  {name:'Kayne',position:'DF',price:4,class:'L',points:0},
  {name:'Louise',position:'DF',price:3.5,class:'S',points:0},
  {name:'Nikhil',position:'DF',price:3,class:'I',points:0},
  
  // Midfielders (MF) - CORRECTED
  {name:'Shayne',position:'MF',price:8.5,class:'L',points:0},
  {name:'Wayne',position:'MF',price:7.5,class:'S',points:0},
  {name:'Kiyan',position:'MF',price:7,class:'M',points:0},
  {name:'Dylan',position:'MF',price:6,class:'M',points:0},
  {name:'Yohann',position:'MF',price:5.5,class:'M',points:0},
  {name:'Jean-Lucas',position:'MF',price:5.5,class:'I',points:0},
  {name:'Emmanuel',position:'MF',price:5,class:'I',points:0},
  {name:'Aaryan',position:'MF',price:5,class:'I',points:0},
  {name:'Costa',position:'MF',price:4.5,class:'M',points:0},
  {name:'Aarush H',position:'MF',price:4.5,class:'S',points:0},
  {name:'Joshaan',position:'MF',price:4.5,class:'I',points:0},
  {name:'Jibran',position:'MF',price:4.5,class:'I',points:0},
  {name:'Joaquim',position:'MF',price:4.5,class:'B',points:0},
  {name:'Aatif',position:'MF',price:4.5,class:'B',points:0},
  {name:'Aarush G',position:'MF',price:3.5,class:'I',points:0},
  
  // Forwards (FW) - CORRECTED
  {name:'Zia',position:'FW',price:7.5,class:'L',points:0},
  {name:'Nirmal',position:'FW',price:7,class:'M',points:0},
  {name:'Rayyan',position:'FW',price:6,class:'I',points:0},
  {name:'Nevish',position:'FW',price:5,class:'B',points:0},
  {name:'Kaudy',position:'FW',price:4.5,class:'S',points:0}
];

function login() {
  const manager = document.getElementById('manager').value;
  if (!manager) return alert('Enter name');
  document.getElementById('login').style.display = 'none';
  document.getElementById('team').style.display = 'block';
  loadPlayers();
}

function loadPlayers() {
  const pos = document.getElementById('pos').value;
  const posPlayers = allPlayers.filter(p => p.position === pos);
  document.getElementById('players').innerHTML = posPlayers.map(p => {
    const isSelected = team[pos].some(t => t.name === p.name);
    return `<div class="player ${isSelected ? 'selected' : ''}" onclick="selectPlayer('${p.name.replace(/'/g,"\\\\'")}',${p.price})">
      ${p.name} (${p.class}) - £${p.price}m (${p.points}pts)
    </div>`;
  }).join('') || `<p>No ${pos} players</p>`;
}

function selectPlayer(name, price) {
  const pos = document.getElementById('pos').value;
  const currentCost = Object.values(team).flat().reduce((sum,p)=>sum+p.price, 0);
  const posIndex = team[pos].findIndex(p => p.name === name);  // ← FIXED BUG
  if (posIndex > -1) {
    team[pos].splice(posIndex, 1);
  } else if (team[pos].length < MAX_SLOTS[pos] && currentCost + price <= BUDGET) {
    team[pos].push({name, price});
  } else {
    return alert(`No ${pos} slots (${team[pos].length}/${MAX_SLOTS[pos]}) or over £30m!`);
  }
  updateDisplay();
}

function updateDisplay() {
  const cost = Object.values(team).flat().reduce((sum,p)=>sum+p.price, 0);
  document.getElementById('budget').textContent = (BUDGET - cost).toFixed(1);
  document.getElementById('myteam').innerHTML = 
    Object.entries(team).map(([pos,players]) => `<b>${pos}:</b> ${players.map(p=>p.name).join(', ') || 'Empty'}`).join('<br>');
  loadPlayers();
}

function saveTeam() {
  if (Object.values(team).flat().length !== 5) {
    return alert(`Pick all 5 players! (1GK-2DF-1MF-1FW) (${Object.values(team).flat().length}/5)`);
  }
  localStorage.setItem('fplTeam', JSON.stringify(team));
  alert('SQUAD SAVED! ' + Object.values(team).flat().map(p=>p.name).join(', '));
}

