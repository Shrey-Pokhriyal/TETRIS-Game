document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const w = 20;
    let timerId;
    let next=true;
    let nextRandom = 0;
    let score = 0;
    const color=["red","green","blue","white","yellow"];
    let randomcolor=Math.floor(Math.random()*5);
    const lTet = [
        [1, w+1, w*2+1, 2],
        [w, w+1, w+2, w*2+2],
        [1, w+1, w*2+1, w*2],
        [w, w*2, w*2+1, w*2+2]
      ];
    
      const zTet = [
        [0,w,w+1,w*2+1],
        [w+1, w+2,w*2,w*2+1],
        [0,w,w+1,w*2+1],
        [w+1, w+2,w*2,w*2+1]
      ];
    
      const tTet = [
        [1,w,w+1,w+2],
        [1,w+1,w+2,w*2+1],
        [w,w+1,w+2,w*2+1],
        [1,w,w+1,w*2+1]
      ];
      
      const oTet = [
        [0,1,w,w+1],
        [0,1,w,w+1],
        [0,1,w,w+1],
        [0,1,w,w+1]
      ];
      
      const iTet = [
        [1,w+1,w*2+1,w*3+1],
        [w,w+1,w+2,w+3],
        [1,w+1,w*2+1,w*3+1],
        [w,w+1,w+2,w+3]
      ];
      const tet=[lTet, zTet, tTet, oTet, iTet];
      console.log(tet);
      let rotationpresent=Math.floor(Math.random()*4);
      let currentPosition=9;
      let random = Math.floor(Math.random()*tet.length)
      let current = tet[random][rotationpresent];
      function draw()
      {
        current.forEach(element => {
          squares[currentPosition + element].classList.add('tet');
        });
      }
      function undraw()
      {
        current.forEach(element => {
          squares[currentPosition + element].classList.remove('tet');
        });
      }
      document.addEventListener("keyup",function(e){
        if(next)
        {
        if(e.keyCode === 37)
        {
          console.log("left click");
          moveleft();
        }
        else if(e.keyCode === 39)
        {
          moveright();
        }
        else if (e.keyCode === 32) {
          rotate();
        }
      }
      });
      document.addEventListener("keydown",function(e){
        if(next)
        {
        if(e.keyCode==40)
        {
          movedown();
        }
      }
      });
      function movedown()
      {
        undraw();
        currentPosition+=w;
        draw();
        freeze();
      }
      function freeze()
      {
        if(current.some(index => squares[currentPosition+index+w].classList.contains('taken')))
        {
          current.forEach(index => squares[currentPosition + index].classList.add('taken'));
          random = nextRandom;
          nextRandom = Math.floor(Math.random() * tet.length);
          current = tet[random][rotationpresent];
          currentPosition = 9;
          draw();
          displayShape();
          addScore();
          gameOver();
        }
      }
      function moveleft()
      {
        undraw();
        const atleftedge= current.some(index => (currentPosition+index) % w===0)
        if(!atleftedge)
        {
          currentPosition-=1;
        }
        if(current.some(index=> squares[currentPosition+index].classList.contains('taken')))
        {
          currentPosition+=1;
        }
        draw();
      }
      function moveright()
      {
        undraw();
        const atrightedge= current.some(index => (currentPosition+index+1) % w===0)
        if(!atrightedge)
        {
          currentPosition+=1;
        }
        if(current.some(index=> squares[currentPosition+index].classList.contains('taken')))
        {
          currentPosition-=1;
        }
        draw();
      }
      function isAtRight() {
        return current.some(index=> (currentPosition + index + 1) % w === 0)  
      }
      
      function isAtLeft() {
        return current.some(index=> (currentPosition + index) % w === 0)
      }
      
      function checkRotatedPosition(P){
        P = P || currentPosition    
        if ((P+1) % w < 4) {       
          if (isAtRight()){            
            currentPosition += 1    
            checkRotatedPosition(P) 
          }
        }
        else if (P % w > 5) {
          if (isAtLeft()){
            currentPosition -= 1
            checkRotatedPosition(P)
          }
        }
      }
      
      //rotate the tetromino
      function rotate() {
        undraw()
        rotationpresent++
        if(rotationpresent=== current.length) {
          rotationpresent= 0;
        }
        current = tet[random][rotationpresent]
        checkRotatedPosition()
        draw();
      }
      
      const minisq=Array.from(document.querySelectorAll('.re'));
      console.log(minisq);
      const widthsmalldisp=4;
      let dispindex =1;
      const newtet= [
        [1, widthsmalldisp+1, widthsmalldisp*2+1, 2], 
        [0, widthsmalldisp, widthsmalldisp+1, widthsmalldisp*2+1], 
        [1, widthsmalldisp, widthsmalldisp+1, widthsmalldisp+2], 
        [0, 1, widthsmalldisp, widthsmalldisp+1],
        [1, widthsmalldisp+1, widthsmalldisp*2+1, widthsmalldisp*3+1] 
      ];
      function displayShape() {
        minisq.forEach(square => {
          square.classList.remove('tet');
        })
        newtet[nextRandom].forEach( index => {
          minisq[dispindex + index].classList.add('tet');
        })
      }
      document.getElementById('start').addEventListener('click',()=>{
        if(timerId){
          clearInterval(timerID);
          timerId=null;
        }
        else
        {
          draw();
          timerId=setInterval(movedown,1000);
          nextRandom = Math.floor(Math.random() * tet.length);
          displayShape();
        }
      })
      function addScore() {
        for (let i = 0; i < 299; i +=w) {
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9,i+10,i+11,i+12,i+13,i+14,i+15,i+16,i+17,i+18,i+19]
    
          if(row.every(index => squares[index].classList.contains('taken'))) {
            score +=10
            scoreDisplay.innerHTML = score;
            row.forEach(index => {
              squares[index].classList.remove('taken')
              squares[index].classList.remove('tet')
            })
            const squaresRemoved = squares.splice(i, w)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
          }
        }
      }
      function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          scoreDisplay.innerHTML = 'GAME OVER';
          clearInterval(timerId);
          next=false;
        }
      }
      document.getElementById('pause').addEventListener('click',()=>{
        clearInterval(timerId);
        next=false;
        let tct=`${score} (GAME ENDED)`;
        scoreDisplay.innerHTML=tct;
        });
    });