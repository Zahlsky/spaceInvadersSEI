function init() {

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
  let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 61, 62, 63, 64, 65, 66, 67, 68, 82, 87]
  let aliensTimer
  let direction = 1
  let score = document.querySelector('.score')



  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      cell.dataset.index = cells.push(cell)
      grid.appendChild(cell)
    }

    addShooter(currentPosition)
    addAliens(aliensStartingPosition)
  }

  // add Aliens array to the cells 

  function addAliens() {

    for (let i = 0; i < aliens.length; i++) {
      const element = aliens[i]
      cells[element].classList.add(charAliClass)
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
      cells[currentPosition].classList.add(charExplosionClass)
      cells[currentPosition].classList.remove(charAliClass, charClass)

      console.log('game over')
      score.innerHTML = 'GAME OVER'
      clearInterval(aliensTimer)


    }
  }

  aliensTimer = setInterval(moveAliens, 800)




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
    }

    // const keyCode = event.keyCode
    // const spaceBar = 32
    if (event.keyCode === 32) {
      console.log('spacebar')
      laserTimer = setInterval(moveLaserUp, 100)
    }

    alienHit()
  }

  function alienHit() {
    const laserCurrentPosition = currentPosition
    if (cells[laserCurrentPosition].classlist.contains(charAliClass, charLaserClass)) {
      cells[laserCurrentPosition].classList.remove(charAliClass)
      cells[laserCurrentPosition].classList.remove(charLaserClass)
      cells[laserCurrentPosition].classList.add(charExplosionClass)
      return score.innerHTML += 10
    }



  }





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


  document.addEventListener('keydown', shootLaser)

  document.addEventListener('keydown', moveShooter)


  createGrid()
}

window.addEventListener('DOMContentLoaded', init)