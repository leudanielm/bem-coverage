module.exports = {getStats, updateTotal, updateBem, updateNonBem};

var stats = {
  TOTAL: 0,
  NON_BEM: 0,
  BEM: 0
};

function updateTotal(value) {
  stats.TOTAL += value;
}

function updateBem(value) {
  stats.BEM += value;
}

function updateNonBem(value) {
  stats.NON_BEM += value;
}

function getStats() {
  return stats;
}