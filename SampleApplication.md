# 📁 Simple AI-Assistant-Bot example App
To demonstrate the capability of models in Amazon Bedrock, Lets explore and learn API integration.

This is an example Simple AI-Assistant-Bot example app, It uses the Node.js framework with Socket.io. to interact with Bot. Follow the instructions below to get set up

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd ai-assistant-bot
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Open .env file and set value of the example environment variables in file

    ```
    BEDROCK_ENDPOINT=bedrock.us-east-1.amazonaws.com
    AWS_REGION=us-west-2
    ```
6. Run the app

   ```bash
   $ node index.js
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! 

Try different prompts to get answers from your Airline AI Assistant bot, feel free to change System instruction in prompt to experiment your business specific scenarios.

## Bonus
Postman can convert an API request into a code snippet, and you can choose the programming language or framework. You can use this generated code snippet in your front-end applications

Open the request prompt you want to use for a code snippet, then select the code icon Code icon in the right pane.

### Open code snippets
1. Select a language or framework from the dropdown list.

2. Select the copy icon Copy icon to copy the code snippet to your clipboard.

![Code](/static/image.png)

## LangChain with Javascript

Large language models (LLMs) are emerging as a transformative technology, enabling developers to build applications that they previously could not. But using these LLMs in isolation is often not enough to create a truly powerful app - the real power comes when you can combine them with other sources of computation or knowledge.

### [LangChain.js](https://github.com/langchain-ai/langchainjs)

This library is aimed at assisting in the development of javascript based applications.

LangChain allows you to access Bedrock once you pass session information to LangChain. LangChain tries to get session information from your environment.

You need to specify LLM for LangChain Bedrock class, and can pass arguments for inference.

## Conclusion

Congratulations! You have now experimented with using Postman which provides a exposure to Amazon Bedrock API. Using this API you have seen the use case of generating a summary, images, question and answers, perform sentiment analysis, classification, translation, content moderation and embeddings You have also learned to create a basic AI assistant. 

### Next Mission

- Adapt Postman to experiment with different models available through Amazon Bedrock such as Anthropic Claude and AI21 Labs Jurassic models.
- Change the prompts to your specific usecase and evaluate the output of different models.
- Play with the token length to understand the latency and responsiveness of the service.
- Apply different prompt engineering principles to get better outputs.
- Integrate Langchain.js with your application to orchestrate a series of prompts to achieve a desired outcome

## Thank You



