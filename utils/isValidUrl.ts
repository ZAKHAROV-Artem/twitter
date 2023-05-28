export default function isValidUrl(urlString: string) {
  const inputElement = document.createElement("input");
  inputElement.type = "url";
  inputElement.value = urlString;

  return inputElement.checkValidity()
}
