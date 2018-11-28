/********************************************************************************
 * @author Steve Lucas
 * @version 11/27/18
 * Sets page background to a random image from the imgUrlArray, which is manually
 * populated with relative image urls.
 *******************************************************************************/

/** Represents total number of background images */
const numImages = 8;
/** Image URLs are manually assigned to an array. Could be automated */
var imgUrlArray = [];
/** random number determining the index of the image that will be displayed */
var ranNum = -1;
/** Represents the previous ranNum, or is undefined if this is the first load */
var storedNum = sessionStorage.getItem("ranNum");

//initialize imgArray with using this naming convention: 'background#.jpg'
for (var i = 0; i < numImages; i++) {
  imgUrlArray.push(`url('assets/images/background${i}.jpg')`);
}

// Generate a new random number
ranNum = Math.floor(Math.random() * Math.floor(numImages));
// If a random number is already saved,
if (storedNum !== undefined && storedNum !== "") {
  if (parseInt(storedNum) === ranNum) {
    var failSafe = 0;
    while (parseInt(storedNum) === ranNum && failSafe < 5) {
      ranNum = Math.floor(Math.random() * Math.floor(numImages));
      failSafe++;
    }
  } else {
    sessionStorage.setItem("ranNum", ranNum);
  }
}

//set background to chosen image url
$("body").css("background-image", imgUrlArray[ranNum]);
