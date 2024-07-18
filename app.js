const colorSchemeBtn = document.getElementById("color-scheme-btn");
const renderedColorsContainer = document.getElementById(
  "rendered-colors-container"
);

colorSchemeBtn.addEventListener("click", function (e) {
  // preventing the default form submission
  e.preventDefault();

  // grabbing id values for chosen color and scheme
  const colorSelection = document
    .getElementById("color-selection")
    .value.slice(1);
  const schemesSelector = document.getElementById("schemes-selector").value;

  // creating a const for the api for cleaner code
  const colorApiUrl = `https://www.thecolorapi.com/scheme?hex=${colorSelection}&mode=${schemesSelector}&count=5`;

  // Sending a HTTP GET request to the Color API endpoint
  fetch(colorApiUrl)
    .then((res) => res.json())
    .then((data) => {
      let renderColorsHtml = "";

      // iterate over the data, creating a new array which I can then iterate over to grab    each hex value in a cleaner more understanable way
      const colorHexValues = data.colors.map(
        (colorValues) => colorValues.hex.value
      );
      colorHexValues.forEach((hexColors) => {
        // call the empty string above, create the html elements with the iterated data, and insert the data into the empty string.
        renderColorsHtml += `
                <div class="rendered-colors" data-hex="${hexColors}" 
                style="background-color: ${hexColors};">
                    <span id="rendered-hex-numbers">${hexColors}</span>
                </div>`;
      });
      // set the empty container to the newly created html
      renderedColorsContainer.innerHTML = renderColorsHtml;

      // selecting all of the rendered colors in order to grab one color at a time
      const renderedColors = document.querySelectorAll(".rendered-colors");

      // iterating over the array to grab a single hex color
      renderedColors.forEach((renderedColor) => {
        renderedColor.addEventListener("click", () => {
          const hexCode = renderedColor.getAttribute("data-hex");

          // copying the hex code to clipboard on "click"
          navigator.clipboard
            .writeText(hexCode)

            // call the .then method which will handle the fulfilled promises
            .then(() => {
              // creating a popUp indicating the hex code was copied
              const popUp = document.createElement("div");
              popUp.classList.add("pop-up");
              popUp.textContent = `Copied!`;

              // append the popUp element to the document body
              document.body.appendChild(popUp);

              // remove popUp after a delay
              setTimeout(() => {
                popUp.remove();
              }, 2000);
            })
            // call the .catch method which handle failed promises, so it is called if anything goes wrong
            .catch((err) => {
              // creating a popUp indicating an error occured
              const popUp = document.createElement("div");
              popUp.classList.add("pop-up");
              popUp.textContent = `Error!, ${err}`;

              // append the popUp element to the document body
              document.body.appendChild(popUp);

              // remove popUp after a delay
              setTimeout(() => {
                popUp.remove();
              }, 5000);
            });
        });
      });
    });
});
