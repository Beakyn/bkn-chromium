const extractItems = () => {
  const extractedElements = document.querySelectorAll(
    "[id*='surfaceCardImage']"
  );
  const items = [];
  for (let element of extractedElements) {
    items.push(element.innerText);
  }
  return items;
};

module.exports = { extractItems };
