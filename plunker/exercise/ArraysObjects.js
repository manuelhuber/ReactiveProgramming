(() => {

    const aoOutputArray = document.createElement('input');
    aoOutputArray.disabled = true;
    renderHtml(aoOutputArray, 'arraysObjects');

    const hwBreakAO = document.createElement('br');
    renderHtml(hwBreakAO, 'arraysObjects');
    const aoOutputObject = document.createElement('textarea');




    /**************************************FIRST TASK*****************************************************/

    const myMixedArray = new Array("&", 1, 2, "n", 3, 4, 5, 12, 'u', 10, "r", 11, 6, 7, "Z", 8, "e", 9, "i", "c", "h", "e", "n");
    //TODO create Observable with source myMixedArray

    //TODO sort all characters of myMixedArray
    // use for output:  .subscribe(value => addValue(value));





    /**************************************SECOND TASK*****************************************************/
    //Second task - 

    const people = [{name: 'Anna', age: 25, city: 'Rosenheim'},{name: 'Johann', age: 34 , city: 'Bad Endorf'},
                    {name: 'Max', age: 26, city: 'Bad Aibling'}, {name: 'Sarah', age: 35, city: 'Rosenheim'},
                    {name: 'Klaus', age: 22, city: 'Bad Aibling'}, {name: 'Alfons', age: 21, city: 'Rosenheim'},
                    {name: 'Stefanie', age: 28, city: 'Bad Aibling'}, {name: 'Michael', age: 27, city: 'München'},
                    {name: 'Peter', age: 29, city: 'Traunstein'}, {name: 'Anna', age: 23, city: 'Rosenheim'}];

    //TODO create Observable with source myMixedArray

    //TODO group the following people by city and select those which are 25 or older


    // use for output:     .subscribe(val => outputObject( val));


    /********************************HELPER FUNCTION******************************************************************/
    function addValue(value) {
      aoOutputArray.setAttribute("value", (aoOutputArray.getAttribute("value") + " " + value));
    }

    function outputObject(value) {
      let data = aoOutputObject.getAttribute("value");

      function getData(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].length !== undefined && arr[i].length > 0) {
            getData(arr[i]);
          } else {
            if (arr[i] !== null && arr[i] != 0) {
              console.log(arr[i])
              $('<li>' + arr[i].name + " lives in " + arr[i].city + '</li>').appendTo(arraysObjects);
            }
          }
        }
      }
      getData(value);
    }

  }

)();