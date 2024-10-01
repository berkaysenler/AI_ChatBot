/* 
? Berkay 'Kaissu' Senler
 */

//  Initialize the chatgpt api, and then we are going to prompt a user for a message, and continue the conversation until the user ends the file

import OpenAI  from 'openai'
import { createRequire} from 'module'
const require = createRequire(import.meta.url)
const prompt = require('prompt-sync')()
require('dotenv').config()


// step 1 - initialize the chatgpt api

const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY

const openai = new OpenAI({
    apiKey: OPENAI_SECRET_KEY
})

// step 2 - create context for the api (give it some personality)

const context = 'You are my JavaScript mentor. I am a student who is learning JavaScript'
const model = 'gpt-3.5-turbo'
let messages = [
    {
        'role': 'user',
        "content": context
    }
]

// step 3 - define the function to retrieve the api message based on user input

async function sendPrompt(){
    const current_messages = [
        {
            "role": "system",
            "content": context
        },
        ...messages
    ]

    const completion = await openai.chat.completions.create({
        model,
        messages: current_messages
})

let response = completion.choices[0].message
messages.push(response)
console.log(response.content)
getUserInput()
}
//  step 4 - create a run function that requests a user input

async function run(){
    getUserInput()
}

function getUserInput(){
    let new_user_input = prompt('What you have to say mate: ')
    messages.push({
        'role': 'user',
        'content': new_user_input
    })
    sendPrompt()
}

run()