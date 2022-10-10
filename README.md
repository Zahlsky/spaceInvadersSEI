
![Logo](https://res.cloudinary.com/dqcowm72f/image/upload/v1665414163/Readme%20projects/maxresdefault-460696913_nkxkxw.jpg)


# Space Invaders

This was my very first coding project and project 1 of  the General Assembly Software Engineering course. Having spent the previous 3 weeks learning the basic fundamentals of HTML, CSS and JavaScript, it was now time for us to embark upon the individual challenge of creating a game using only these languages within the choice of briefs assigned. Each game was required to be a grid based game, rendered in the browser.

I decided to create a Space Invaders game based upon the arcade classic with a retro feel and graphics sampled from the original. Utilising my newly developed skills in JS, HTML/CSS and DOM I wanted to create a fun, fast paced game nostalgic for the 80s.



## Demo

https://zahlsky.github.io/spaceInvadersSEI/ 👾


## Timeframe & Working Team
This project was a solo project. We had 1 week to plan, execute and deploy.

## Tech Stack

**Tech:** JavaScript(ES6), HTML, CSS

**Dev Tools:** VS Code

**Other:** Google Fonts, Excalidraw


## Brief

- Render a game in the browser.

- Design logic for winning & visually display which player won.

- Include separate HTML / CSS / JavaScript files.

- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles.
- Use Javascript for DOM manipulation.
- Deploy your game online, where the rest of the world can access it.
- Use semantic markup for HTML and CSS (adhere to best practices).

## Planning
The planning was done using an online design tool, Exclidraw, which is a great way to begin wire-framing a project. Here I created a rough sketch of the basic layout with some initial ideas on how to structure HTML objects for the game and how this ought to look on the page:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665415103/Readme%20projects/Screenshot_2022-10-10_at_16.18.13_sdzg5a.png)

This sketch helped me visualise the framework and understand which parts of the game would require hard coding and which would require dynamic updates during game-play. This led me to think about the elements that would require JS DOM manipulation and certain aspects of code. My initial list for target elements these looked like this: 

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665415254/Readme%20projects/Screenshot_2022-10-10_at_16.20.46_gropdn.png)

Even though this was not a comprehensive list, it was certainly enough to get me started. I later updated my plan to include other elements for audio, a start-page feature and levels. 
Next, I bagan some pseudo coding to help me formulate the initial logic and understand the functionality  that may be required to make the game work. Here is an excerpt:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665415352/Readme%20projects/Screenshot_2022-10-10_at_16.22.23_rzteiw.png)

The planning above was inspired by the GA lessons on how to build a whack a mole game and grid movement. From this I knew that  in order to make my shooter character move from user input, I would need to utilise event keys and event listeners. I also knew that objects that require automated movement would need timers and mathematical operators to direct them. 

What began to formulate from the above was the necessity of specific functions for each moving part of the game and which functions would need to be nested inside another function in order for it to work in the way intended. 

## Build/Code Process

**It started with a GRID!**

The grid is the gameplay area and sits as the building block of the game as a 20  x 20 square, created using JavaScript and HTML. 
Using a for loop; HTML divs are created and appended as children of the grid and stored in the variable cell and each cell stored as an index value within the cells array.

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665415577/Readme%20projects/Screenshot_2022-10-10_at_16.26.07_s2iinm.png)

**Movement**

Essentially, the movement in this game is all about:

- removing a class which contains a background image 
- adding that class back to the next cell indice (which ever this may be) 
- setting this to a timer or event listener
  
The player movement was created using an if/else statement within the moveShooter function. This function is linked to an event listener and called when the ASCII key codes 37 and 39 were pressed down by the user (i.e. arrows left and right). The shooter image is essentially removed (classList.remove) from the square, moved + or - one space and re-added (classList.add). The modulus calculation prevents the shooter from being placed off the grid.  

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665416212/Readme%20projects/Screenshot_2022-10-10_at_16.36.44_p3twlq.png)

The aliens are essentially numbers stored  in an array. The addAliens function uses a for loop to loop through each indice adding the alien image class dynamically to the cell. The removeAliens does the same but removes the image. 

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665416327/Readme%20projects/Screenshot_2022-10-10_at_16.38.41_ffcbhl.png)

The moveAliens function then combines the above and adds the logic to determine their next grid position based on the parameters established below. If the first alien (alien[0]  in the array) is at the leftLimit then move the aliens down the grid (+=width) and their direction is 1 (1 is to the right). However, the last alien on the right edge is at the rightLimit then move the aliens (+=width) and their direction is now -1 (left).  

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665416398/Readme%20projects/Screenshot_2022-10-10_at_16.39.52_ak3hbh.png)

This is then set to a timer, setInterval which creates the automated movement we see when the game is started. Magic!

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665417187/Readme%20projects/Screenshot_2022-10-10_at_16.53.01_ttdnrj.png)

This timer function is used on everything that requires automated movement i.e. the laser movement, enemy missile movement and also the timing for the release of enemy missiles which fall randomly from the top of the grid every 4000 milliseconds. For this I created 2 functions: 

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665417285/Readme%20projects/Screenshot_2022-10-10_at_16.54.39_brijcy.png)

The first function randomly selects a number, this value is used to generate a cell indice from which a missile will appear to be released from. The Math.random function randomly generates a number (here between 0 and 19) which is rounded down by the Math.floor function. This returns a whole number and this value is stored in the let variable missileCurrentPosition. 
The second function then takes care of the movement down the grid by adding and removing the missile image and each time adding it to the next cell below. Now this gets linked to another setInterval  and this gives the illusion that the missiles are falling down the grid towards the player’s character. But what happens if the player gets hit?

**Collisions!**

So the game would be pretty boring without any collisions so, how to make the big bangs happen? This part was reasonably straightforward and utilised very similar logic for all types of collisions in the game. Essentially, I used an if statement within a function where the action takes place…  The below is what happens if a missile hits the shooter:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665417395/Readme%20projects/Screenshot_2022-10-10_at_16.56.29_whrzud.png)

From the above I used the logic that if a cell contains the missile AND the shooter, we then remove their respective images and replace them with an explosion image. This was repeated for collision between the laser and an alien and similarly a direct hit between an alien and our shooter. Next, some game over functions for when our shooter gets hit.

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665418895/Readme%20projects/Screenshot_2022-10-10_at_17.18.57_fsnubh.png)

**Game Over**

So the below are the conditions when the player loses the game:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665417707/Readme%20projects/Screenshot_2022-10-10_at_17.01.39_a1hid6.png)

In order to visually let the player know that it’s game over, the score display is updated with the string ‘GAME OVER’ and the various timers are stopped using the clearInterval function to prevent further movement. This function is then called at various points in the code when certain conditions are met i.e. when the shooter has been hit or when the aliens reach the bottom of the grid: 

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665417800/Readme%20projects/Screenshot_2022-10-10_at_17.03.11_ijppw3.png)

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665418559/Readme%20projects/Screenshot_2022-10-10_at_17.15.51_edp4yr.png)
## Challenges

As the first project of the course, I found this project quite challenging as it required combining a number of skills learnt so far, combining them and putting them into practice on a blank canvas. The previous lessons in the course gave clues on how this could be achieved but didn’t entirely cover all the functionality needed to complete this game. 
So one major challenge for me was how to remove the aliens from the array once they had been shot, and to prevent them from being re added to the grid. This took a long time to work out as there was initially no mechanism for this data to be stored. I needed to find a way of tracking the aliens [i] that had been shot by the laser and comparing it to the original array and using this information to re-add ‘only the aliens [i] that had not been shot. This was something I put on the back burner until the latter half of the project as I didn’t have all the answers yet. 
When I had my collision conditions built, I saw that the tracking of positions for everything had been established. I saw that I could create a condition in my shootLaser function to add any ‘deadAlien’ to an empty array. Using the indexOf method, I stored this value to the deadAlien variable and using the .push method, I could add these values to the ‘deadAliens’ array. I did a lot of console logging to work out if this was working and I could see that the dead aliens  were being added to the array but were not visually being removed from the grid. They were in fact being replaced/re-added to the grid on the next interval, which was frustrating! 
The challenge next was how to stop this from happening. So I broke down exactly what needed to happen in simple pseudo code:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665418079/Readme%20projects/Screenshot_2022-10-10_at_17.07.53_ert4sv.png)

Which led me to add a simple if statement to the addAliens function: 

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665418196/Readme%20projects/Screenshot_2022-10-10_at_17.09.50_pfy4qx.png)

The method of breaking things down and pseudo coding is a very basic but extremely effective way of eventually working things out, even though it can be frustrating when things don’t work right away. Also, as this was the first project I didn’t really know which parts to focus on deeply to begin with and I found that the more established the game became the easier it was to work out how to structure the functions. 
## Wins

What did you learn while building this project? What challenges did you face and how did you overcome them?

- I really enjoyed styling this game as an arcade classic. It was great to see other enthusiasts had created online repositories for original graphics and game features. 
- I gained confidence using the DOM and event listeners. I realised how much I learned regarding this and how it’s relatively straight forward even though the syntax is quite cumbersome.
- A much better understanding of interval timers. 

## Key Learnings

Building my first project was daunting but a great first experience as there were so many hurdles to overcome and I’m proud of the game I created. I literally had no idea how complex building a simple game from the 80s could be. 

This project has taught me the importance of planning and putting as much detail as possible into the wireframing as this is such a valuable resource when it comes to decide how to structure your code.

I learned about timing events, which I knew little about previously. Turns out it’s  important to store timers to a variable so you are able to clear them! 

I gained confidence in the fundamentals of JavaScript and realised how functions are blocks of action and reaction in a game and that they drive everything needed for gameplay. 

## Bugs

- After the game is over, the shooter can be re-added to the grid by hitting the left and right arrows and laser can be reactivated
- Number of console.logs require deleting
- Console errors regarding missiles in unreachable cell spaces off the grid (setTimeout fix for these items needs to be implemented)

## Future Improvements

- Additional levels
- A scoreboard that persists, showing top 10 players with best scores
- Different types of aliens with different speeds/behaviours
- Personalise shooter by choosing colour on the welcome page
- Choose your fight arena (maybe 3 different backgrounds to choose from)
- Bug fixes

