import { init } from "./database"

(async function(){
await init()
console.log('Initialized DB')
}())