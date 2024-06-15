export function anchorFunction(url, externalLink = true) {
  if (externalLink) window.open(url, '_blank').focus();
  else window.open(url, '_self').focus();
}