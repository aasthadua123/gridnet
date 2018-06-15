const rand = module.exports = (type) => {
  let text = [];
  let possible;
  let limit;

  if (type === "phone") {
    possible = "0123456789";
    limit = 6;
  }
  else if (type === "email") {
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    limit = 14;
  }

  for (var i = 0; i < limit; i++) {
    text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
  }
  return text.join("");
}
