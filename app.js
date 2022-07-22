function init() {
  const gridWrapper = document.querySelector('.grid-wrapper')

  const grid = document.querySelector('.grid')

  const width = 20
  const cellCount = width * width
  const cells = []
  const aliensStartingPosition = 9
  let aliensCurrentPosition = aliensStartingPosition
  let currentPosition = 390
  const charClass = 'shooter'
  const charAliClass = 'alien'
  const charLaserClass = 'laser'
  const charExplosionClass = 'explosion'
  const charMissileClass = 'enemyMissile'
  let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 61, 62, 63, 64, 65, 66, 67, 68, 82, 87]
  let direction = 1
  let scoreDisplay = document.querySelector('.results')
  let score = 0
  let deadAliens = []
  let level = document.querySelector('.levelNum')
  const startButton = document.querySelector('.start')
  let aliensTimer
  let laserTimer
  let randomFireTimer
  let fireDown
  let missileTimer
  let missileCurrentPosition
  const startPage = document.querySelector('.start-page')
  const audio = document.querySelector('audio')



  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = cells.push(cell)
      grid.appendChild(cell)
    }
  }

  // function pageLoad() {
  //   gridWrapper.hide()
  //   clearInterval(aliensTimer)
  // }

  function start(event) {
    event.target.blur()
    clearInterval(aliensTimer)
    clearInterval(missileTimer)
    console.log('start')
    scoreDisplay.innerHTML = 0
    addShooter(currentPosition)
    addAliens(aliensStartingPosition)
    aliensTimer = setInterval(moveAliens, 100)
    fireMissiles()
    randomFire()
    hideStartPage()
  }

  function hideStartPage() {
    startPage.style.display = 'none'
  }

  // function gameOverEnd() {
  //   if (scoreDisplay = 'GAME OVER') {
  //     gridWrapper.classList.add(gameOverPage)
  //     gridWrapper.classList.remove(startPage)
  //     removeAliens()
  //     removeShooter()
  //   }

  //   gameOverEnd()
  // }

  function gameOver() {
    scoreDisplay.innerHTML = 'GAME OVER'
    // startPage.style.display = 'inherit'
    // startPage.style.margin = '0px 0px 0px 0px'
    // startPage.style.fontSize = '20px'
    clearInterval(aliensTimer)
    clearInterval(fireDown)
    clearInterval(missileTimer)
    removeAliens()
    removeMissile()
    clearInterval(laserTimer)
    removeShooter(currentPosition)


    // removeShooterEventListener(moveShooter)
    // removeEventListener('keydown', shootLaser)
    // removeEventListener('keydown', moveShooter)
  }



  // add Aliens array to the cells 

  function addAliens() {

    //re-add aliens only if not included in array

    for (let i = 0; i < aliens.length; i++) {
      if (!deadAliens.includes(i)) {
        cells[aliens[i]].classList.add(charAliClass)
      }
    }
  }
  // remove Aliens from the cells
  function removeAliens() {

    for (let i = 0; i < aliens.length; i++) {
      const element = aliens[i]
      cells[element].classList.remove(charAliClass)
    }
  }



  // move and remove to create movement add and remove (left is -1, right is 1)

  function moveAliens() {
    const leftLimit = aliens[0] % width === 0
    const rightLimit = aliens[aliens.length - 11] % width === width - 1
    removeAliens()

    if (rightLimit) {
      for (let i = 0; i < aliens.length; i++) {
        aliens[i] += width
        direction = -1
      }
    }

    if (leftLimit) {
      for (let i = 0; i < aliens.length; i++) {
        aliens[i] += width
        direction = 1
      }
    }

    for (let i = 0; i < aliens.length; i++) {
      aliens[i] += direction
      console.log('moving?')
    }

    addAliens()

    if (cells[currentPosition].classList.contains(charAliClass, charClass)) {
      cells[currentPosition].classList.remove(charAliClass, charClass)
      cells[currentPosition].classList.add(charExplosionClass)
      gameOver()

      // console.log('game over')
      // scoreDisplay.innerHTML = 'GAME OVER'
      // clearInterval(aliensTimer)
      // clearInterval(laserTimer)
      // clearInterval(fireDown)
      // clearInterval(missileTimer)

    }

    for (let i = 0; i < aliens.length; i++) {
      if (aliens[i] > (cells.length)) {
        cells[currentPosition].classList.add(charExplosionClass)
        gameOver()
        // scoreDisplay.innerHTML = 'GAME OVER'
        // clearInterval(aliensTimer)
        // clearInterval(fireDown)
        // clearInterval(missileTimer)
        // clearInterval(laserTimer)
      }
    }
  }




  function addShooter(position) {
    cells[position].classList.add(charClass)

  }

  function removeShooter(position) {
    cells[position].classList.remove(charClass)
  }

  function moveShooter(event) {
    const keyCode = event.keyCode
    const left = 37
    const right = 39

    removeShooter(currentPosition)

    if (left === keyCode && currentPosition % width !== 0) {
      currentPosition -= 1
    } else if (right === keyCode && currentPosition % width !== width - 1) {
      currentPosition += 1
    }

    addShooter(currentPosition)
  }

  function randomFire() {
    const missileStartPosition = Math.floor(Math.random() * 20)
    console.log(missileStartPosition)
    let missileCurrentPosition = missileStartPosition




    function randomDown() {
      cells[missileCurrentPosition].classList.remove(charMissileClass)
      missileCurrentPosition += width
      cells[missileCurrentPosition].classList.add(charMissileClass)

      if (cells[missileCurrentPosition].classList.contains(charClass)) {
        cells[missileCurrentPosition].classList.remove(charClass, charMissileClass)
        cells[missileCurrentPosition].classList.add(charExplosionClass)
        gameOver()
        // clearInterval(fireDown)
        // clearInterval(laserTimer)
        // clearInterval(aliensTimer)
        // clearInterval(missileTimer)
        // scoreDisplay.innerHTML = 'GAME OVER'


      }

    }

    fireDown = setInterval(randomDown, 100)
  }

  function fireMissiles() {
    missileTimer = setInterval(randomFire, 4000)
  }

  function removeMissile() {
    missileCurrentPosition.classList.remove(charMissileClass)
  }










  // function addLaser() {
  //   cells[laserCurrentPosition].classList.add(charLaserClass)
  // }

  // function removeLaser() {
  //   cells[laserCurrentPosition].classList.remove(charLaserClass)
  // }

  function shootLaser(event) {
    let laserCurrentPosition = currentPosition
    let laserTimer
    function moveLaserUp() {
      cells[laserCurrentPosition].classList.remove(charLaserClass)
      laserCurrentPosition -= width
      cells[laserCurrentPosition].classList.add(charLaserClass)

      if (cells[laserCurrentPosition].classList.contains(charAliClass)) {
        cells[laserCurrentPosition].classList.remove(charLaserClass)
        cells[laserCurrentPosition].classList.remove(charAliClass)
        cells[laserCurrentPosition].classList.add(charExplosionClass)

        setTimeout(() => cells[laserCurrentPosition].classList.remove('explosion'), 200)
        clearInterval(laserTimer)

        const deadAlien = aliens.indexOf(laserCurrentPosition)
        deadAliens.push(deadAlien)
        score += 10
        scoreDisplay.innerHTML = score


        console.log(deadAliens)
      }
      // const keyCode = event.keyCode
      // const spaceBar = 32


      // alienHit()
    }

    if (event.keyCode === 38) {
      // console.log('spacebar')
      laserTimer = setInterval(moveLaserUp, 100)
      shootFx()
    }

    function levelComplete() {

      if (score === 400) {
        level.innerHTML = ' Complete!'
        clearInterval(aliensTimer)
        clearInterval(laserTimer)
        clearInterval(fireDown)
        clearInterval(missileTimer)
      }

    }

    levelComplete()

    // function alienHit() {
    //   const laserCurrentPosition = currentPosition

  }

  function shootFx() {
    audio.src = '.sounds/shoot.wav'
    audio.play()
  }

  // function disableStartButton(startButton) {
  //   startButton.disabled = true
  // }





  // function gameOver() {
  //   
  // }



  //   const keyCode = event.keyCode
  //   const spaceBar = 49
  //   if (spaceBar === keyCode) {
  //     moveLaser()
  //   }
  //   function moveLaser() {
  //     removeLaser()
  //     laserCurrentPosition -= width
  //     addLaser()
  //   }

  //   laser = setInterval(moveLaser, 200)

  // }

  // laserTimer = setInterval(shootLaser, 130)


  document.addEventListener('keydown', shootLaser, shootFx)

  document.addEventListener('keydown', moveShooter)

  startButton.addEventListener('click', start)

  // function removeShooterEventListener(moveShooter) {
  //   document.removeEventListener('keydown', moveShooter)
  // }


  createGrid()
  // pageLoad()
  // start()
}

window.addEventListener('DOMContentLoaded', init)