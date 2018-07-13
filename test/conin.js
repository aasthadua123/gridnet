var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then trim()
    let completed = false;
    let data = [];
    while(!completed) {
      for(let i = 0;i < 10;i++) {
        let input = d.toString().trim().split(" ");
        data.push(input);
      }
      completed = true;
    }
    console.log(data)
  });
