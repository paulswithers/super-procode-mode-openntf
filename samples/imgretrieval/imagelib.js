/**
 * Retrieves an image from the REST API and uses a data
 * URL to display it in the browser.
 *
 * @param parent DOM element to attach the image to
 * @param token JWT token used to authenticate the request
 * @param unid Document UNID of the document containing the image
 * @param imgName filename of the image to retrieve
 */
const tokenImage = (parent, token, unid, imgName) => {
  const img = document.createElement('img');
  const url = `/api/v1/attachments/${unid}/${imgName}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  fetch(url, options)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        img.src = reader.result;
        // Finally attach the image to the parent element
        parent.appendChild(img);
      };
      reader.readAsDataURL(blob);
    })
    .catch((err) => console.error(err));
};
