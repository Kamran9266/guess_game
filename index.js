#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => new Promise((res) => setTimeout(res, 2000));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(`Let's start the game!`);
    await sleep();
    rainbowTitle.stop();
}
// welcome();
let playerLife = 3;
async function askQuestion() {
    let randNumber = Math.floor(Math.random() * 10) + 1;
    do {
        console.log(`Player life left ${playerLife}`);
        playerLife--;
        var que = await inquirer.prompt([
            {
                type: "number",
                name: "usr_num",
                message: chalk.cyanBright("Select any number between 1 - 10: "),
            },
        ]);
        if (que.usr_num === randNumber) {
            console.log(chalk.green(`Congragulation! You guess the right number.`));
        }
        else if (que.usr_num < randNumber) {
            console.log(chalk.red(`Your number: ${que.usr_num} is less than guess number.`));
        }
        else if (que.usr_num > randNumber) {
            console.log(chalk.red(`Your number: ${que.usr_num} is greater than guess number.`));
        }
    } while (playerLife > 0 && randNumber !== que.usr_num);
    if (playerLife == 0 && randNumber !== que.usr_num) {
        console.log(chalk.redBright(`Game is over!!!`));
    }
}
async function startAgain() {
    do {
        console.clear();
        await welcome();
        playerLife = 3;
        await askQuestion();
        var restart = await inquirer.prompt([
            {
                type: "input",
                name: "start_again",
                message: chalk.bgBlueBright("Do you want to restart the game? press Y or N: "),
            },
        ]);
    } while (restart.start_again === "y" ||
        restart.start_again === "Y" ||
        restart.start_again === "yes" ||
        restart.start_again === "YES");
}
startAgain();
