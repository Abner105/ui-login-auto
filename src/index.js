import { Builder, By } from "selenium-webdriver"
import inquirer from "inquirer"
import fs from "fs"
import path from "path"
// // require("chromedriver") chromedriver库会自动引入浏览器驱动，本项目已经下载有驱动，所以不需要引入chromedriver
// const { Builder, By } = require("selenium-webdriver")
// const inquirer = require("inquirer")
// const fs = require("fs")
// const path = require("path")

// 动态引入config配置
const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), "./config.json")))

async function startLogin(config) {
  let driver = await new Builder().forBrowser("chrome").build()
  await driver.get(config.url)
  // 需要等待渲染完成，才能获取dom
  setTimeout(async () => {
    await driver.findElement(By.css(config.elements.userInput)).sendKeys(config.account.username)
    await driver.findElement(By.css(config.elements.pwInput)).sendKeys(config.account.password)
    await driver.findElement(By.css(config.elements.submit)).click()
  }, 500)
}

function getConfig() {
  // 获取用户输入
  inquirer
    .prompt([
      {
        type: "list",
        message: "请选择环境",
        name: "env",
        choices: ["test", "production"],
      },
      {
        type: "list",
        message: "请选择项目",
        name: "project",
        choices: ["project01", "project02", "project03"],
      },
    ])
    .then(res => {
      startLogin(config[res.env][res.project])
    })
}

getConfig()
