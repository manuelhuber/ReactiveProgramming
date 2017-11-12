function render(data, containerId) {
  if (!containerId) containerId = 'content';
  const content = document.createElement('div');
  innerHtml = data;
  if (typeof data === 'object') innerHtml = JSON.stringify(data);
  content.innerHTML = innerHtml;
  document.getElementById(containerId).appendChild(content);
}

function renderHtml(html, containerId) {
  if (!containerId) containerId = 'content';
  document.getElementById(containerId).appendChild(html);
}

function createElement(containerId) {
  const ele = document.createElement('div');
  renderHtml(ele, containerId);
  return $(ele);
}