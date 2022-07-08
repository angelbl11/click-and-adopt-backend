const date = new Date();

date.setHours(0, 0, 0, 0);

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

module.exports = {
  formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-");
  },
};
