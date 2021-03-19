!function(hate, width, maze, walls, currentPosition) {
    start = [0, 0];
    hate = hate % 2 == 0 ? hate+1 : hate; // в статье было объяснено, почему числа должны быть нечетными
    width = width % 2 == 0 ? width + 1 : width; // добавил еще 2 строчки, чтобы люди не страдали и вводили любые числа
  document.getElementById('maze').setAttribute('style','height:'+hate*10+'px; width:'+width*10+'px');
  for (var y=0; y<hate; y++) {
    maze[y] = [];
    for (var x = 0; x<width; maze[y][x++] = 'wall') {
      var el = document.getElementById('maze').appendChild(document.createElement("div"));
      el.className = 'block wall';
      el.setAttribute('id', y+'-'+x);
    }
  }
  function amaze(y,x,addBlockWalls) {
    maze[y][x] = 'maze';
    document.getElementById(y+'-'+x).className = 'block';
      if (addBlockWalls && valid(y+1,x) && (maze[y+1][x] == 'wall')) walls.push([y+1,  x , [y,x]]);
      if (addBlockWalls && valid(y-1,x) && (maze[y-1][x] == 'wall')) walls.push([y-1,  x , [y,x]]);
      if (addBlockWalls && valid(y,x+1) && (maze[y][x+1] == 'wall')) walls.push([ y , x+1, [y,x]]);
      if (addBlockWalls && valid(y,x-1) && (maze[y][x-1] == 'wall')) walls.push([ y , x-1, [y,x]]);
  }
  function valid(a,b) { return (a<hate && a>=0 && b<width && b>=0) ? true : false; };
  amaze(currentPosition[0],currentPosition[1], true);
  while(walls.length != 0) {
    var randomWall = walls[Math.floor(Math.random() * walls.length)], host = randomWall[2], opposite = [(host[0] + (randomWall[0]-host[0])*2), (host[1] + (randomWall[1]-host[1])*2)];
    if (valid(opposite[0],opposite[1])) {
      if (maze[opposite[0]][opposite[1]] == 'maze') walls.splice(walls.indexOf(randomWall),1);
      else amaze(randomWall[0],randomWall[1],false), amaze(opposite[0],opposite[1],true);
    }
    else walls.splice(walls.indexOf(randomWall),1);
  }
  find_path();
  console.log(maze);

  function find_path(){
    console.log(maze[0][0]);
    maze[start[0]][start[1]] = "1";
    console.log(maze[0][0]);
    queue = start;
    while (queue.length != 0) {
   
   var y = queue.shift();
   var x = queue.shift();
   var cur_val = parseInt(maze[y][x]);

   // check each of the neighbours
   for (var ny = -1; ny <= 1; ny++) {
       for (var nx = -1; nx <= 1; nx++) {
           if (Math.abs(ny) == Math.abs(nx) || y+ny < 0 || y+ny >= hate || x+nx < 0 || x+nx >= width) 
               continue;

           if (maze[y+ny][x+nx] == 'maze') {
               maze[y+ny][x+nx] = (cur_val+1).toString();
               queue.push(y+ny);
               queue.push(x+nx);
           }

       }
   }
}

}

}(parseInt(prompt('Введите высоту лабиринта:')), parseInt(prompt('Введите ширину лабиринта:')), [], [], [0,0])